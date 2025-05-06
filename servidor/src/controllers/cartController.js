import {
  findCartById,
  createNewCart,
  addToCart
} from '../servicios/cartService.js';
  
  export const createCart = (req, res) => {
    const cart = createNewCart();
    res.status(201).json(cart);
  };
  
  export const getCartById = (req, res) => {
    const cart = findCartById(req.params.cid);
    if (cart) res.json(cart);
    else res.status(404).send('Carrito no encontrado');
  };
  
  export const addProductToCart = (req, res) => {
    const updatedCart = addToCart(req.params.cid, req.params.pid);
    if (updatedCart) res.json(updatedCart);
    else res.status(404).send('Carrito o producto no encontrado');
  };
  