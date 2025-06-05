

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/productModel.js';

dotenv.config(); 

const products = [
  {
    title: 'Zapatillas Nike Air Max',
    description: 'Zapatillas deportivas de alta gama',
    price: 120,
    category: 'calzado',
    stock: 20
  },
  {
    title: 'Remera Adidas',
    description: 'Remera deportiva',
    price: 35,
    category: 'ropa',
    stock: 50
  },
  {
    title: 'Gorra Puma',
    description: 'Gorra clásica con visera',
    price: 25,
    category: 'accesorios',
    stock: 100
  },
  {
    title: 'Campera North Face',
    description: 'Campera impermeable de montaña',
    price: 200,
    category: 'ropa',
    stock: 15
  },
  {
    title: 'Mochila Reebok',
    description: 'Mochila ideal para gym o escuela',
    price: 60,
    category: 'accesorios',
    stock: 40
  },
  {
    title: 'Zapatillas Converse',
    description: 'Clásico modelo Chuck Taylor',
    price: 75,
    category: 'calzado',
    stock: 25
  },
  {
    title: 'Pantalón Jogger',
    description: 'Cómodo y versátil',
    price: 50,
    category: 'ropa',
    stock: 30
  },
  {
    title: 'Buzo Oversize',
    description: 'Buzo unisex oversize',
    price: 65,
    category: 'ropa',
    stock: 22
  },
  {
    title: 'Reloj Deportivo Casio',
    description: 'Reloj resistente al agua',
    price: 90,
    category: 'accesorios',
    stock: 12
  },
  {
    title: 'Botines Adidas Predator',
    description: 'Botines para fútbol profesional',
    price: 150,
    category: 'calzado',
    stock: 10
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Productos insertados correctamente.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error al insertar productos:', error);
  }
};

seed();
