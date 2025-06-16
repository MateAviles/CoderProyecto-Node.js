
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  status: { type: Boolean, default: true }
}, { timestamps: true });

productSchema.plugin(mongoosePaginate); // ⚠️ IMPORTANTE

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
