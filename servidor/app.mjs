
// Módulos principales
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import viewsRouter from './src/routes/viewsRoutes.js';
import { getAllProducts } from './src/servicios/productService.js';

// Para obtener la ruta actual con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
export { io };

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
app.use('/', viewsRouter);

// WebSockets
io.on('connection', socket => {
  console.log('Cliente conectado por WebSocket');
  socket.emit('update-products', getAllProducts());
});


const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


 