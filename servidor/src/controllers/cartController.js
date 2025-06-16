
import {
  createNewCart,
  findCartById,
  addToCart,
  removeProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  deleteAllProductsFromCart,
} from '../servicios/cartService.js';

export const createCart = async (req, res) => {
  try {
    const cart = await createNewCart();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error al crear carrito:', error);
    res.status(500).json({ message: 'Error interno al crear el carrito' });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await findCartById(req.params.cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ message: 'Error interno al obtener el carrito' });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const cart = await addToCart(req.params.cid, req.params.pid);
    if (!cart) return res.status(404).json({ message: 'Carrito o producto no encontrado' });
    res.json(cart);
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ message: 'Error interno al agregar producto' });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const cart = await removeProductFromCart(req.params.cid, req.params.pid);
    if (!cart) return res.status(404).json({ message: 'Carrito o producto no encontrado' });
    res.json(cart);
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ message: 'Error interno al eliminar producto' });
  }
};

export const updateCart = async (req, res) => {
  try {
    const cart = await updateCartProducts(req.params.cid, req.body.products);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    console.error('Error al actualizar carrito:', error);
    res.status(500).json({ message: 'Error interno al actualizar carrito' });
  }
};

export const updateProductQty = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await updateProductQuantity(req.params.cid, req.params.pid, quantity);
    if (!cart) return res.status(404).json({ message: 'Carrito o producto no encontrado' });
    res.json(cart);
  } catch (error) {
    console.error('Error al actualizar cantidad de producto:', error);
    res.status(500).json({ message: 'Error interno al actualizar cantidad' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await deleteAllProductsFromCart(req.params.cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    console.error('Error al vaciar carrito:', error);
    res.status(500).json({ message: 'Error interno al vaciar carrito' });
  }
};
