
import express from 'express';
import {
  createCart,
  getCartById,
  addProductToCart,
  removeProduct,
  updateCart,
  updateProductQty,
} from '../controllers/cartController.js';
import { deleteAllProductsFromCart } from '../servicios/cartService.js';

const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', removeProduct);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQty);
router.delete('/:cid', deleteAllProductsFromCart);

export default router;
