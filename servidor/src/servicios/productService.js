
import Product from '../models/productModel.js'; // modelo mongoose

export async function getAllProducts({ page = 1, limit = 10, sort, category, status }) {
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    lean: true
  };

  if (sort) {
    options.sort = { price: sort === 'asc' ? 1 : -1 };
  }

  const filter = {};
  if (category) filter.category = category;
  if (status !== undefined) {
    if (status === 'true' || status === 'false') {
      filter.status = status === 'true';
    }
  }

  return await Product.paginate(filter, options);
}
