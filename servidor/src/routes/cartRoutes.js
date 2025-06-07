
import express from 'express';
import {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  updateCart,
  updateProductQty,
  deleteAllProducts
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQty);
router.delete('/:cid', deleteAllProducts);

export default router;
