import { Router } from 'express';
import { createCategoryService } from '../../services/category.service';

const router = Router();

router.post('/', async (req, res) => {
  const categoryService = await createCategoryService();
  const { name, slug } = req.body;
  const category = await categoryService.createCategory({ name, slug });
  res.json(category);
});

router.get('/:categoryId', async (req, res) => {
  const categoryService = await createCategoryService();
  const category = await categoryService.getCategoryById(
    parseInt(req.query.id as string),
  );
  res.json(category);
});

router.patch('/:categoryId', async (req, res) => {
  const categoryService = await createCategoryService();
  const { name, slug } = req.body;
  const category = await categoryService.updateCategory({
    id: parseInt(req.params.categoryId),
    name,
    slug,
  });
  res.json(category);
});

router.delete('/:categoryId', async (req, res) => {
  const categoryService = await createCategoryService();
  await categoryService.deleteCategory(parseInt(req.params.categoryId));
  res.json({ message: 'Category deleted' });
});

router.get('/', async (req, res) => {
  const categoryService = await createCategoryService();
  const { page = 1, limit = 10, name } = req.query;
  const { categories, total } = await categoryService.listCategories({
    page: parseInt(page as string),
    limit: parseInt(limit as string),
    filter: { name: name as string },
  });
  res.json({ categories, total });
});

export default router;
