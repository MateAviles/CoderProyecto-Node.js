
import mongoose from 'mongoose';
import Cart from '../models/cart.js';
import Product from '../models/product.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Crear un nuevo carrito vacío
export const createNewCart = async () => {
  const newCart = new Cart({ products: [] });
  await newCart.save();
  return newCart;
};

// Buscar un carrito por ID y hacer populate de productos
export const findCartById = async (cid) => {
  try {
    if (!isValidObjectId(cid)) {
      console.error('ID de carrito inválido:', cid);
      return null;
    }

    const cart = await Cart.findById(cid).populate('products.product');
    return cart;
  } catch (error) {
    console.error('Error al buscar carrito:', error);
    return null;
  }
};

// Agregar un producto al carrito (o aumentar cantidad si ya existe)
export const addToCart = async (cid, pid) => {
  try {
    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
      console.error('ID inválido en addToCart:', cid, pid);
      return null;
    }

    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const product = await Product.findById(pid);
    if (!product) return null;

    const existingProduct = cart.products.find(p => p.product.equals(pid));
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    return await Cart.findById(cart._id).populate('products.product');
  } catch (error) {
    console.error('Error al agregar producto:', error);
    return null;
  }
};

// Eliminar un producto del carrito
export const removeProductFromCart = async (cid, pid) => {
  try {
    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
      console.error('ID inválido en removeProductFromCart:', cid, pid);
      return null;
    }

    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter(p => !p.product.equals(pid));
    await cart.save();

    return await Cart.findById(cart._id).populate('products.product');
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    return null;
  }
};

// Reemplazar todos los productos del carrito
export const updateCartProducts = async (cid, newProducts) => {
  try {
    if (!isValidObjectId(cid)) {
      console.error('ID de carrito inválido en updateCartProducts:', cid);
      return null;
    }

    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = newProducts.map(p => ({
      product: p.product,
      quantity: p.quantity
    }));

    await cart.save();
    return await Cart.findById(cart._id).populate('products.product');
  } catch (error) {
    console.error('Error al actualizar productos del carrito:', error);
    return null;
  }
};

// Actualizar solo la cantidad de un producto específico
export const updateProductQuantity = async (cid, pid, quantity) => {
  try {
    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
      console.error('ID inválido en updateProductQuantity:', cid, pid);
      return null;
    }

    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const productInCart = cart.products.find(p => p.product.equals(pid));
    if (!productInCart) return null;

    productInCart.quantity = quantity;
    await cart.save();

    return await Cart.findById(cart._id).populate('products.product');
  } catch (error) {
    console.error('Error al actualizar cantidad:', error);
    return null;
  }
};

// Eliminar todos los productos del carrito
export const deleteAllProductsFromCart = async (cid) => {
  try {
    if (!isValidObjectId(cid)) {
      console.error('ID inválido en deleteAllProductsFromCart:', cid);
      return null;
    }

    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = [];
    await cart.save();

    return await Cart.findById(cart._id).populate('products.product');
  } catch (error) {
    console.error('Error al vaciar carrito:', error);
    return null;
  }
};
