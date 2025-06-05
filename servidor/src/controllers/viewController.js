

import Product from '../models/productModel.js';

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
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/products?limit=${limit}&page=${result.prevPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`
        : null,
      nextLink: result.hasNextPage
        ? `/products?limit=${limit}&page=${result.nextPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`
        : null,
      page: result.page,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
