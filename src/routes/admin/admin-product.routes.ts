import { Router } from 'express';
import { createProductService } from '../../services/product.service';
import { Resource, ResourceCollection } from '../../http/resource';

const router = Router();

router.post('/', async (req, res, next) => {
  const productService = await createProductService();
  const { name, slug, description, price, categoryIds } = req.body;
  try {
    const product = await productService.createProduct(
      name,
      slug,
      description,
      price,
      categoryIds,
    );
    res.location(`/admin/products/${product.id}`).status(201);
    const resource = new Resource(product);
    next(resource);
  } catch (e) {
    next(e);
  }
});

router.get('/:productId', async (req, res, next) => {
  const productService = await createProductService();
  const product = await productService.getProductById(
    parseInt(req.params.productId as string),
  );

  if (!product) {
    res.status(404).json({
      title: 'Product not found',
      status: 404,
      detail: `The product with id ${req.params.productId} does not exist`,
    });
    return;
  }
  const resource = new Resource(product);
  next(resource);
});

router.patch('/:productId', async (req, res) => {
  const productService = await createProductService();
  const { name, slug, description, price, categoryIds } = req.body;
  const product = await productService.updateProduct({
    id: parseInt(req.params.productId),
    name,
    slug,
    description,
    price,
    categoryIds,
  });
  const resource = new Resource(product);
  res.json(resource);
});

router.delete('/:productId', async (req, res) => {
  const productService = await createProductService();
  await productService.deleteProduct(parseInt(req.params.productId));
  res.status(204).send();
});

router.get('/', async (req, res, next) => {
  const productService = await createProductService();
  const {
    page = 1,
    limit = 10,
    name,
    categories_slug: categoriesSlugStr,
  } = req.query;
  const categories_slug = categoriesSlugStr
    ? categoriesSlugStr.toString().split(',')
    : [];
  const { products, total } = await productService.listProducts({
    page: parseInt(page as string),
    limit: parseInt(limit as string),
    filter: {
      name: name as string,
      categories_slug,
    },
  });
  console.log('products in the route', products);
  const collection = new ResourceCollection(products, {
    paginationData: {
      total,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
    },
  });
  next(collection);
});

router.get('/listProducts.csv', async (req, res) => {
  const productService = await createProductService();
  const {
    page = 1,
    limit = 10,
    name,
    categories_slug: categoriesSlugStr,
  } = req.query;
  const categories_slug = categoriesSlugStr
    ? categoriesSlugStr.toString().split(',')
    : [];
  const { products } = await productService.listProducts({
    page: parseInt(page as string),
    limit: parseInt(limit as string),
    filter: {
      name: name as string,
      categories_slug,
    },
  });
  const csv = products
    .map((product) => {
      return `${product.name},${product.slug},${product.description},${product.price}`;
    })
    .join('\n');
  res.send(csv);
});

export default router;
