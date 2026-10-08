import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Please enter product name'],
      trim: true 
    },
    image: { 
      type: String, 
      required: [true, 'Please enter product image URL'] 
    },
    description: { 
      type: String, 
      required: [true, 'Please enter product description'] 
    },
    category: { 
      type: String, 
      required: [true, 'Please enter product category'] 
    },
    price: { 
      type: Number, 
      required: [true, 'Please enter product price'], 
      default: 0 
    },
    countInStock: { 
      type: Number, 
      required: [true, 'Please enter product stock count'], 
      default: 0 
    },
  },
  { 
    timestamps: true 
  }
);

// Models rebuild hone par duplicate compile error se bachne ke liye
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;