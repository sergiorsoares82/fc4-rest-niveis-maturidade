import { DataSource, Repository } from 'typeorm';
import { Cart, CartItem } from '../entities/Cart';
import { Customer } from '../entities/Customer';
import { Product } from '../entities/Product';
import { createDatabaseConnection } from '../database';

export class CartService {
  constructor(
    private cartRepository: Repository<Cart>,
    private cartItemRepository: Repository<CartItem>,
    private productRepository: Repository<Product>,
    private customerRepository: Repository<Customer>,
  ) {}

  async getCart(cartUuid: string): Promise<Cart | null> {
    return await this.cartRepository.findOne({
      where: { uuid: cartUuid },
      relations: ['items', 'items.product'],
    });
  }

  async createCart(customerId?: number): Promise<Cart> {
    let customer = null;
    console.log(customerId);
    if (customerId) {
      customer = await this.customerRepository.findOne({
        where: { id: customerId },
      });
      if (!customer) {
        throw new Error('Customer not found');
      }
    }

    const cart = new Cart();
    cart.customer = customer;
    cart.items = [];

    return await this.cartRepository.save(cart);
  }

  async addItemToCart(data: {
    uuid: string;
    productId: number;
    quantity: number;
    id?: number;
    customerId?: number;
  }): Promise<Cart> {
    const { uuid, productId, quantity, customerId } = data;
    const where = {} as any;

    if (uuid) {
      where.uuid = uuid;
    }

    if (customerId) {
      where.customer = { id: customerId };
    }

    let cart = Object.keys(where).length
      ? await this.cartRepository.findOne({
          where,
          relations: ['items', 'items.product'],
        })
      : null;

    if (!cart) {
      throw new Error('Cart not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    let cartItem = cart.items.find((item) => item.product.id === productId);
    cart = await this.cartRepository.save(cart);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = quantity;
      cartItem.cart = cart;
      cart.items.push(cartItem);
    }

    await this.cartItemRepository.save(cartItem);
    return cart;
  }

  async removeItemFromCart(data: {
    cartUuid: string;
    cartItemId: number;
  }): Promise<void> {
    const { cartUuid, cartItemId } = data;

    const cartItem = await this.cartItemRepository.findOne({
      where: { cart: { uuid: cartUuid }, id: cartItemId },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);
  }

  async clearCart(id: number): Promise<Cart | null> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      return null;
    }

    await this.cartItemRepository.remove(cart.items);
    cart.items = [];

    return await this.cartRepository.save(cart);
  }
}

export async function createCartService() {
  const {
    cartRepository,
    cartItemRepository,
    productRepository,
    customerRepository,
  } = await createDatabaseConnection();
  return new CartService(
    cartRepository,
    cartItemRepository,
    productRepository,
    customerRepository,
  );
}
