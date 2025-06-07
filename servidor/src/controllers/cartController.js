
import {
  createNewCart,
  findCartById,
  addToCart,
  removeProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  deleteAllProductsFromCart
} from '../servicios/cartService.js';

export const createCart = async (req, res) => {
  const cart = await createNewCart();
  res.status(201).json(cart);
};

export const getCartById = async (req, res) => {
  const cart = await findCartById(req.params.cid);
  if (cart) res.json(cart);
  else res.status(404).send('Carrito no encontrado');
};

export const addProductToCart = async (req, res) => {
  const updatedCart = await addToCart(req.params.cid, req.params.pid);
  if (updatedCart) res.json(updatedCart);
  else res.status(404).send('Carrito o producto no encontrado');
};

export const deleteProductFromCart = async (req, res) => {
  const updatedCart = await removeProductFromCart(req.params.cid, req.params.pid);
  if (updatedCart) res.json(updatedCart);
  else res.status(404).send('Carrito o producto no encontrado');
};

export const updateCart = async (req, res) => {
  const updatedCart = await updateCartProducts(req.params.cid, req.body.products);
  if (updatedCart) res.json(updatedCart);
  else res.status(404).send('Carrito no encontrado');
};

export const updateProductQty = async (req, res) => {
  const { quantity } = req.body;
  const updatedCart = await updateProductQuantity(req.params.cid, req.params.pid, quantity);
  if (updatedCart) res.json(updatedCart);
  else res.status(404).send('Carrito o producto no encontrado');
};

export const deleteAllProducts = async (req, res) => {
  const updatedCart = await deleteAllProductsFromCart(req.params.cid);
  if (updatedCart) res.json(updatedCart);
  else res.status(404).send('Carrito no encontrado');
};
