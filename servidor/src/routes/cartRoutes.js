
import express from 'express';
import {
  createCart,
  getCartById,
  addProductToCart,
  removeProduct,
  updateCart,
  updateProductQty,
  clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', removeProduct);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQty);
router.delete('/:cid', clearCart);

export default router;

