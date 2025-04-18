import mongoose from 'mongoose';

const favoriteItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index compus pentru a asigura că un utilizator nu poate adăuga același produs de mai multe ori
favoriteItemSchema.index({ user: 1, product: 1 }, { unique: true });

export const FavoriteItem = mongoose.model('FavoriteItem', favoriteItemSchema);
export default FavoriteItem;
