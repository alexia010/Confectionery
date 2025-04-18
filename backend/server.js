import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Adaugă această linie
import connectDB from './config/db.config.js';
import initGuestId from './middleware/initGuestId.js';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';
import cartRoutes from './routes/cart.routes.js';
import homepageRoutes from './routes/homePage.routes.js'
import ordersRoutes from './routes/order.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

import path from "path";
import {fileURLToPath} from 'url';
import  constants from './utils/constants.js'


dotenv.config({ path: '../.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Configurare CORS înainte de alte middleware-uri
app.use(cors({
  origin: 'http://localhost:5173', // URL-ul aplicației React
  credentials: true, // Important pentru cookie-uri
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Parse incoming request with JSON payloads
app.use(cookieParser()); // Parse cookies attached to the client request object

app.use("/auth", authRoutes);
app.use(initGuestId);

app.use(`/${constants.UPLOADS_DIR}`, express.static(constants.IMAGE_UPLOADS_DIR));
app.use("/product", productRoutes);

app.use('/favorites', favoriteRoutes);
app.use('/cart', cartRoutes);

app.use('/homepage', homepageRoutes);
app.use('/orders',ordersRoutes);

app.use('/dashboard',dashboardRoutes)

app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});

