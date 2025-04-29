import * as productService from '../services/productService.js';

export const getProducts = (req, res) => {
  const products = productService.getAllProducts();
  res.json(products);
};

export const getProductById = (req, res) => {
  const { pid } = req.params;
  const product = productService.getProductById(pid);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
};

export const createProduct = (req, res) => {
  const productData = req.body;
  const newProduct = productService.createProduct(productData);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const { pid } = req.params;
  const updatedData = req.body;
  const updatedProduct = productService.updateProduct(pid, updatedData);
  if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(updatedProduct);
};

export const deleteProduct = (req, res) => {
  const { pid } = req.params;
  const deleted = productService.deleteProduct(pid);
  if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
};
