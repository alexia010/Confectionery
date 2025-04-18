import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.01
  },
  unit: {
    type: String,
    required: true,
    enum: ['g', 'kg', 'ml', 'l', 'buc', 'linguri', 'lingurițe', 'cești'],
    default: 'g'
  }
}, { _id: false }); // Nu generăm _id automat pentru subdocumente, sunt gestionate prin id ul

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.01
  },
  category: {
    type: String,
    required: true,
    enum: ['Torturi Artizanale', 'Patiserie Fină', 'Deserturi Vegane', 'Ciocolaterie'],
    trim: true
  },
  visible: {
    type: Boolean,
    default: true,
  },
  characteristics: [{
    type: String,
    enum: ["Ciocolată", "Premium", "Caramel", "Bestseller", "Fără gluten", "Vegan","Fără lactoză", "Fructe", "Sezonier"],
    trim: true
  }],
  allergensText: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: [ingredientSchema],
  images: [{
    type: String, // Stocăm URL-urile imaginilor
    required: true
  }],
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0 // media ratingurilor
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Product = mongoose.model('Product', productSchema);
export default Product;