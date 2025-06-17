
import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  renderPaginatedProducts,
  getPaginatedProductsJson 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/products/view', renderPaginatedProducts);
router.get('/paginated', getPaginatedProductsJson);

// Rutas API 
router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;



