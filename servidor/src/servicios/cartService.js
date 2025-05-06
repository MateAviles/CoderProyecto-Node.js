import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getProduct } from './productService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/carts.json');

const readCarts = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeCarts = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export const createNewCart = () => {
  const carts = readCarts();
  const newCart = { id: Date.now().toString(), products: [] };
  carts.push(newCart);
  writeCarts(carts);
  return newCart;
};

export const findCartById = (id) => readCarts().find(c => c.id == id);

export const addToCart = (cartId, productId) => {
  const carts = readCarts();
  const cart = carts.find(c => c.id == cartId);
  if (!cart) return null;

  const product = getProduct(productId);
  if (!product) return null;

  const item = cart.products.find(p => p.product === productId);
  if (item) {
    item.quantity++;
  } else {
    cart.products.push({ product: productId, quantity: 1 });
  }

  writeCarts(carts);
  return cart;
};
