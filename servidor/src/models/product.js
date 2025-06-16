
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  status: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
