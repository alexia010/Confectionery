// import mongoose from 'mongoose';

// const cartItemSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//     default: 1
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// }, { timestamps: true });

// // Index compus pentru a asigura că un utilizator nu poate adăuga același produs de mai multe ori
// cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

// export const CartItem = mongoose.model('CartItem', cartItemSchema);
// export default CartItem;

// models/cart.model.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, { timestamps: true });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    sparse: true // Permite valori null/undefined, dar trebuie să fie unic dacă există
  },
  guestId: {
    type: String,
    sparse: true // Permite valori null/undefined, dar trebuie să fie unic dacă există
  },
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Un coș trebuie să aibă fie un user, fie un guestId
cartSchema.pre('save', function(next) {
  if (!this.user && !this.guestId) {
    return next(new Error('Un coș trebuie să aibă fie un user, fie un guestId'));
  }
  next();
});

// Adaugă indecși pentru căutări eficiente
cartSchema.index({ user: 1 });
cartSchema.index({ guestId: 1 });

export const Cart = mongoose.model('Cart', cartSchema);
export default Cart;