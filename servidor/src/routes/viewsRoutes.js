

import { Router } from 'express';
import { getAllProducts } from '../servicios/productService.js';

const router = Router();

// Ruta principal con todos los productos
router.get('/', async (req, res) => {
  const { page, limit, sort, query } = req.query;

  const {
    docs: products,
    totalPages,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage,
    page: currentPage,
  } = await getAllProducts({ page, limit, sort, query });

  res.render('home', {
    title: 'Lista de productos',
    products,
    totalPages,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage,
    currentPage
  });
});

// Vista en tiempo real
router.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts', { title: 'Productos en tiempo real' });
});

export default router;
