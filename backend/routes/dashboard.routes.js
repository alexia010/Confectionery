// routes/dashboardRoutes.js
import express from 'express';
import { getStats,
         getSalesData, 
         getSalesDistribution, 
         getRecentOrders, 
        } from '../controllers/dashboard.controller.js';

import  verifyToken from '../middleware/verifyToken.js';


const router = express.Router();

// Toate rutele necesită autentificare ca admin
router.get('/stats', verifyToken, getStats);
router.get('/sales', verifyToken, getSalesData);
router.get('/distribution', verifyToken, getSalesDistribution);
router.get('/orders/recent', verifyToken, getRecentOrders);
// router.get('/products/top', VerifyTokken, getTopProducts);

export default router;