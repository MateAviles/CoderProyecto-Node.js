
import Product from '../models/productModel.js'; // modelo mongoose

export async function getAllProducts({ page = 1, limit = 5, sort, query }) {
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    lean: true,
  };

  if (sort) {
    options.sort = { price: sort === 'asc' ? 1 : -1 };
  }

  const filter = query ? { title: new RegExp(query, 'i') } : {};

  const result = await Product.paginate(filter, options);
  return result;
}
