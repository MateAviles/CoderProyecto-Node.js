
import fs from 'fs';
const cartPath = './src/data/carts.json';
const productPath = './src/data/products.json';

const readCarts = () => {
  if (!fs.existsSync(cartPath)) return [];
  const data = fs.readFileSync(cartPath, 'utf-8');
  return JSON.parse(data);
};

const writeCarts = (carts) => {
  fs.writeFileSync(cartPath, JSON.stringify(carts, null, 2));
};

const readProducts = () => {
  if (!fs.existsSync(productPath)) return [];
  const data = fs.readFileSync(productPath, 'utf-8');
  return JSON.parse(data);
};

export const createCart = () => {
  const carts = readCarts();
  const newCart = {
    id: Date.now().toString(),
    products: []
  };
  carts.push(newCart);
  writeCarts(carts);
  return newCart;
};

export const getCartById = (id) => {
  const carts = readCarts();
  return carts.find(c => c.id === id);
};

export const addProductToCart = (cid, pid) => {
  const carts = readCarts();
  const products = readProducts();

  const cart = carts.find(c => c.id === cid);
  if (!cart) return null;

  const product = products.find(p => p.id === pid);
  if (!product) return null;

  const productInCart = cart.products.find(p => p.product === pid);

  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  writeCarts(carts);
  return cart;
};
