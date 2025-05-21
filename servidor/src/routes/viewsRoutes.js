

import { Router } from 'express';
import { getAllProducts } from '../servicios/productService.js';

const router = Router();

// Ruta principal con todos los productos
router.get('/', (req, res) => {
  const products = getAllProducts();
  res.render('home', { title: 'Lista de productos', products });
});

// Vista en tiempo real
router.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts', { title: 'Productos en tiempo real' });
});

export default router;
