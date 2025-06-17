
// Modulos principales
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import viewsRoutes from './src/routes/viewsRoutes.js';
import { getAllProducts } from './src/servicios/productService.js';
import Product from './src/models/product.js'; 

// Configuración de entorno
dotenv.config();
console.log('MONGO_URI desde .env:', process.env.MONGO_URI);
console.log('Intentando conectar a MongoDB...');

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectarse a la base de datos:', err));

// Para obtener la ruta actual con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
export { io };

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars config (con views adentro del servidor)
const viewsPath = path.resolve(__dirname, './views');
const layoutsPath = path.resolve(viewsPath, 'layouts');

app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: layoutsPath
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRoutes);

// Vista de productos en tiempo real
app.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('realtimeproducts', { title: 'Productos en tiempo real', products });
  } catch (error) {
    console.error('Error al renderizar productos en tiempo real:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// WebSockets
io.on('connection', async socket => {
  console.log('Cliente conectado por WebSocket');

  try {
    const result = await getAllProducts({});
    socket.emit('update-products', result.docs);
  } catch (error) {
    console.error('Error al obtener productos para WebSocket:', error);
  }
});

// Server
const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
