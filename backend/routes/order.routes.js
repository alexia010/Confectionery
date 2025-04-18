import express from 'express';
import { 
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updateOrder
} from '../controllers/order.controller.js';
import verifyToken, { optionalAuth, authorizeAdmin } from '../middleware/verifyToken.js';
import initGuestId from '../middleware/initGuestId.js';

const router = express.Router();

// Creare comandă nouă 
router.post(
  '/', 
  optionalAuth, 
  initGuestId,
  createOrder
);

// Preluare comenzi pentru utilizatorul autentificat
router.get(
  '/user/orders', 
  optionalAuth, 
  initGuestId,
  getUserOrders
);

// Preluare comandă specifică după ID
router.get(
  '/:id', 
  optionalAuth,
  initGuestId,
  getOrderById
);

// Preluare toate comenzile (doar admin)
router.get(
  '/', 
  verifyToken,
  // authorizeAdmin,
  getAllOrders
);

// Actualizare status comandă (doar admin)
router.patch(
  '/:id/status', 
  authorizeAdmin,
  updateOrderStatus
);

router.patch('/:orderId', verifyToken, updateOrder);

export default router;