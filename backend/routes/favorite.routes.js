import express from 'express';
import { 
  getFavorites, 
  addFavorite, 
  removeFavorite 
} from '../controllers/favorite.controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Toate rutele necesită autentificare
router.use(verifyToken);

// Rute pentru favorite
router.get('/', getFavorites);
router.post('/:productId', addFavorite);
router.delete('/:productId', removeFavorite);

export default router;