// import express from 'express';
// import { 
//   getCartItems, 
//   addToCart, 
//   updateCartItem, 
//   removeFromCart,
//   mergeGuestCart 
// } from '../controllers/cart.controller.js';
// import { optionalAuth } from '../middleware/verifyToken.js';
// import verifyToken from '../middleware/verifyToken.js';
// import initGuestId from '../middleware/initGuestId.js';

// const router = express.Router();

// // Utilizăm middleware-ul initGuestId pentru a gestiona utilizatorii anonimi
// router.use(initGuestId);

// // Rute pentru coș accesibile tuturor (autentificați sau nu)
// router.get('/', optionalAuth,getCartItems);
// router.post('/:productId', optionalAuth,addToCart);
// router.put('/:productId', optionalAuth,updateCartItem);
// router.delete('/:productId', optionalAuth,removeFromCart);

// // Rută pentru a combina coșul unui utilizator anonim cu cel al unui utilizator autentificat
// // Aceasta necesită autentificare
// router.post('/merge', verifyToken, mergeGuestCart);

// export default router;


// routes/cart.routes.js
// routes/cart.routes.js
import express from 'express';
import { 
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
} from '../controllers/cart.controller.js';
import { optionalAuth } from '../middleware/verifyToken.js';
import initGuestId from '../middleware/initGuestId.js';

const router = express.Router();

// Aplică middleware-ul optionalAuth pentru a permite accesul atât utilizatorilor autentificați, cât și anonimi
// Aplică middleware-ul initGuestId pentru a genera un ID pentru utilizatorii anonimi

// Obține coșul
router.get("/", optionalAuth, initGuestId, getCart);

// Adaugă un produs în coș
router.post("/add", optionalAuth, initGuestId, addToCart);

// Actualizează cantitatea unui produs din coș
router.put("/update", optionalAuth, initGuestId, updateCartItemQuantity);

// Elimină un produs din coș
router.delete("/remove", optionalAuth, initGuestId, removeFromCart);

// Golește coșul
router.delete("/clear", optionalAuth, initGuestId, clearCart);

export default router;