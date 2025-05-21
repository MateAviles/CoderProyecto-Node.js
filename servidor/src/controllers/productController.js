
import {
  getAllProducts,
  getProduct,
  saveProduct,
  modifyProduct,
  removeProduct
} from '../servicios/productService.js';
import { io } from '../../app.mjs';

export const getProducts = (req, res) => {
  const products = getAllProducts();
  res.json(products);
};

export const getProductById = (req, res) => {
  const product = getProduct(req.params.pid);
  if (product) res.json(product);
  else res.status(404).send('Producto no encontrado');
};

export const createProduct = (req, res) => {
  const newProduct = saveProduct(req.body);
  io.emit('update-products', getAllProducts()); // Emitir actualización
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const updated = modifyProduct(req.params.pid, req.body);
  if (updated) res.json(updated);
  else res.status(404).send('Producto no encontrado');
};

export const deleteProduct = (req, res) => {
  const deleted = removeProduct(req.params.pid);
  if (deleted) {
    io.emit('update-products', getAllProducts()); // Emitir actualización
    res.sendStatus(204);
  } else {
    res.status(404).send('Producto no encontrado');
  }
};
