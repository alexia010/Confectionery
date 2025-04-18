
import mongoose from 'mongoose';

const homepageSchema = new mongoose.Schema({
  produse: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
    validate: {
      validator: (val) => val.length <= 4,
      message: 'Nu pot exista mai mult de 4 produse pentru homepage.'
    }
  },
  reviewuri: {
    type: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }],
    validate: {
      validator: (val) => val.length <= 3,
      message: 'Nu pot exista mai mult de 3 review-uri pentru homepage.'
    }
  }
}, { timestamps: true });

export const Homepage = mongoose.model('Homepage', homepageSchema);
export default Homepage;