import mongoose from 'mongoose';
import Counter from './counter.model.js';

const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const CustomerInfoSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

const ShippingInfoSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  postalCode: {
    type: String
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  deliveryTimeSlot: {
    type: String,
    required: true,
    enum: ['10-14', '14-18', '18-22']
  }
});

const OrderSchema = new Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  // Suportă atât utilizatori autentificați, cât și guest
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  // ID unic pentru comenzile de la guest
  guestId: {
    type: String,
    default: null
  },
  customerInfo: {
    type: CustomerInfoSchema,
    required: true
  },
  shippingInfo: {
    type: ShippingInfoSchema,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'ramburs', 'transfer'],
    default: 'card'
  },
  transactionId: {
    type: String
  },
  items: {
    type: [OrderItemSchema],
    required: true,
    validate: [arrayMinLength, 'Order must contain at least one item']
  },
  shipping: {
    type: Number,
    default: 0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: ['În procesare', 'Expediată', 'Livrată', 'Anulată'],
    default: 'În procesare'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


// Virtuale pentru calcule total
OrderSchema.virtual('subtotal').get(function() {
  return this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});

OrderSchema.virtual('total').get(function() {
  return this.subtotal + this.shipping - this.discount;
});

// Adăugăm virtuale pentru a fi incluse în conversiile la JSON și obiect
OrderSchema.set('toJSON', { virtuals: true });
OrderSchema.set('toObject', { virtuals: true });

// Validator pentru a asigura că items are cel puțin un element
function arrayMinLength(val) {
  return val.length > 0;
}

// Generare număr comandă secvențial înaintea salvării
OrderSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
   
  try {
    // Obține următoarea secvență pentru comenzi
    const seq = await Counter.getNextSequence('orders');
     
    // Formatează numărul comenzii cu zero în față (ex: ORD001, ORD999, ORD1000)
    this.orderNumber = `ORD${seq.toString().padStart(3, '0')}`;
     
    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;