
 import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/products.json');

const readProducts = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeProducts = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export const getAllProducts = () => readProducts();
export const getProduct = (id) => readProducts().find(p => p.id == id);

export const saveProduct = (data) => {
  const products = readProducts();
  const newProduct = { ...data, id: Date.now().toString() };
  products.push(newProduct);
  writeProducts(products);
  return newProduct;
};

export const modifyProduct = (id, changes) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id == id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...changes, id }; 
  writeProducts(products);
  return products[index];
};

export const removeProduct = (id) => {
  const products = readProducts();
  const filtered = products.filter(p => p.id != id);
  if (products.length === filtered.length) return false;
  writeProducts(filtered);
  return true;
};

