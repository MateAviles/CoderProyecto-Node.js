import fs from 'fs';
const path = './src/data/products.json';

const readProducts = () => {
  if (!fs.existsSync(path)) return [];
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(path, JSON.stringify(products, null, 2));
};

export const getAllProducts = () => readProducts();

export const getProductById = (id) => {
  const products = readProducts();
  return products.find(p => p.id === id);
};

export const createProduct = (productData) => {
  const products = readProducts();
  const newProduct = {
    id: Date.now().toString(),  
    status: true,
    thumbnails: [],
    ...productData
  };
  products.push(newProduct);
  writeProducts(products);
  return newProduct;
};

export const updateProduct = (id, updatedData) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  // No actualizar el ID
  products[index] = { ...products[index], ...updatedData, id: products[index].id };
  writeProducts(products);
  return products[index];
};

export const deleteProduct = (id) => {
  const products = readProducts();
  const newProducts = products.filter(p => p.id !== id);
  if (products.length === newProducts.length) return false;
  writeProducts(newProducts);
  return true;
};
