import Product from '../models/productModel.js';
import { io } from '../../app.mjs';

// Obtener productos con paginación, filtrado y ordenamiento
import { getAllProducts } from '../servicios/productService.js';

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, query } = req.query;

    const {
      docs: payload,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
    } = await getAllProducts({ page, limit, sort, query });

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    res.json({
      status: 'success',
      payload,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `${baseUrl}?page=${prevPage}` : null,                                                           
      nextLink: hasNextPage ? `${baseUrl}?page=${nextPage}` : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener los productos paginados',
    });
  }
};


// Obtener un solo producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    const allProducts = await Product.find().lean();
    io.emit('update-products', allProducts); //productos actualizados por WebSocket
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// Actualizar un producto por ID
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true }).lean();
    if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
    if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    const allProducts = await Product.find().lean();
    io.emit('update-products', allProducts); // productos actualizados
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};


// vista con productos paginados
export const renderPaginatedProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = {};

    if (query) {
      if (query === 'true' || query === 'false') {
        filter.status = query === 'true';
      } else {
        filter.category = query;
      }
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined,
      lean: true,
    };

    const result = await Product.paginate(filter, options);

    res.render('products', {
      products: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage
    });
  } catch (error) {
    res.status(500).send('Error al cargar los productos');
  }
};

export const getPaginatedProductsJson = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = {};

    if (query) {
      if (query === 'true' || query === 'false') {
        filter.status = query === 'true';
      } else {
        filter.category = query;
      }
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined,
      lean: true,
    };

    const result = await Product.paginate(filter, options);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    const queryParams = new URLSearchParams(req.query);

    const buildLink = (newPage) => {
      queryParams.set('page', newPage);
      return `${baseUrl}?${queryParams.toString()}`;
    };

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
    });
  } catch (error) {
    console.error('Error en paginación:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener los productos paginados' });
  }
};

