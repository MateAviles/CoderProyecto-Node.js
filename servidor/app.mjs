
// Módulos principales
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log('MONGO_URI desde .env:', process.env.MONGO_URI);

console.log('Intentando conectar a MongoDB...'); //Para saber si no me conecta por un error que no veo

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectarse a la base de datos:', err);
  });


import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import viewsRoutes from './src/routes/viewsRoutes.js';
import { getAllProducts } from './src/servicios/productService.js';

// Para obtener la ruta actual con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
export { io };

app.get('/realtimeproducts', async (req, res) => {
  const products = await Product.find().lean();
  res.render('realTimeProducts', { products });
});



// Aquí configuro las rutas para views y layouts fuera de servidor
const viewsPath = path.resolve(__dirname, '../views');
const layoutsPath = path.resolve(viewsPath, 'layouts');

app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: layoutsPath
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRoutes);

// WebSockets
io.on('connection', socket => {
  console.log('Cliente conectado por WebSocket');
  socket.emit('update-products', getAllProducts());
});


const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


 