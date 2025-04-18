import express from 'express';
import upload from '../middleware/multer.js';
import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProductEnums,
  getProductsMinimal,
  toggleVisibility,
  addReview
} from '../controllers/product.controller.js';
import validateObjectId from '../middleware/validateObjectId.js';
import verifyToken from '../middleware/verifyToken.js'
import constants from '../utils/constants.js';

const router = express.Router();

router.get('/enums', getProductEnums);

router.post('/',upload.array('images',constants.MAX_IMAGES_PER_PRODUCT),createProduct);
router.get('/minimal', getProductsMinimal);

router.post('/:id/reviews', validateObjectId, verifyToken, addReview);

router.get('/:id', validateObjectId, getProductById);
router.patch('/:id', validateObjectId,upload.array('images',constants.MAX_IMAGES_PER_PRODUCT),updateProduct);

router.delete('/:id', validateObjectId, deleteProduct);
router.delete('/:id/reviews/:reviewId', validateObjectId, verifyToken, deleteReview);

router.patch('/:id/visibility',toggleVisibility);

router.get('/', getAllProducts);


export default router;