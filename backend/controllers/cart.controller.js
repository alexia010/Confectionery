// import CartItem from '../models/cart.model.js';
// import Product from '../models/product.model.js';

// // Obține toate produsele din coșul utilizatorului
// export const getCartItems = async (req, res) => {
//   try {
//     let query;
    
//     if (!req.user) {
//       // Pentru utilizatori anonimi, folosim guestId
//       query = { guestId: req.guestId };
//     } else {
//       // Pentru utilizatori autentificați, folosim ID-ul utilizatorului
//       query = { user: req.user._id };
//     }
    
//     const cartItems = await CartItem.find(query).populate('product');
    
//     res.status(200).json(cartItems);
//   } catch (err) {
//     res.status(500).json({ 
//       message: 'Eroare la obținerea coșului', 
//       error: err.message 
//     });
//   }
// };

// // Adaugă un produs în coș
// export const addToCart = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const quantity = parseInt(req.body.quantity) || 1;
    
//     // Verifică dacă produsul există
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Produsul nu a fost găsit' });
//     }
    
//     // Construiește query-ul în funcție de tipul utilizatorului
//     let query;
//     let update;
    
//     if (!req.user) {
//       // Pentru utilizatori anonimi
//       query = { guestId: req.guestId, product: productId };
//       update = { guestId: req.guestId };
//     } else {
//       // Pentru utilizatori autentificați
//       query = { user: req.user._id, product: productId };
//       update = { user: req.user._id };
//     }
    
//     // Încearcă să găsească produsul în coș
//     let cartItem = await CartItem.findOne(query);
    
//     if (cartItem) {
//       // Actualizează cantitatea dacă produsul există deja
//       cartItem.quantity += quantity;
//       cartItem.updatedAt = Date.now();
//       await cartItem.save();
//     } else {
//       // Adaugă un nou item în coș
//       cartItem = new CartItem({
//         ...update,
//         product: productId,
//         quantity
//       });
//       await cartItem.save();
//     }
    
//     // Populează detaliile produsului pentru răspuns
//     await cartItem.populate('product');
    
//     res.status(200).json({ 
//       message: 'Produs adăugat în coș', 
//       cartItem 
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: 'Eroare la adăugarea în coș', 
//       error: err.message 
//     });
//   }
// };

// // Actualizează cantitatea unui produs din coș
// export const updateCartItem = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const quantity = parseInt(req.body.quantity);
    
//     if (!quantity || quantity < 1) {
//       return res.status(400).json({ 
//         message: 'Cantitatea trebuie să fie un număr pozitiv' 
//       });
//     }
    
//     let query;
    
//     if (!req.user) {
//       // Pentru utilizatori anonimi
//       query = { guestId: req.guestId, product: productId };
//     } else {
//       // Pentru utilizatori autentificați
//       query = { user: req.user._id, product: productId };
//     }
    
//     const cartItem = await CartItem.findOne(query);
    
//     if (!cartItem) {
//       return res.status(404).json({ message: 'Produsul nu există în coș' });
//     }
    
//     cartItem.quantity = quantity;
//     cartItem.updatedAt = Date.now();
//     await cartItem.save();
    
//     // Populează detaliile produsului pentru răspuns
//     await cartItem.populate('product');
    
//     res.status(200).json({ 
//       message: 'Cantitate actualizată', 
//       cartItem 
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: 'Eroare la actualizarea coșului', 
//       error: err.message 
//     });
//   }
// };

// // Elimină un produs din coș
// export const removeFromCart = async (req, res) => {
//   try {
//     const productId = req.params.productId;
    
//     let query;
    
//     if (!req.user) {
//       // Pentru utilizatori anonimi
//       query = { guestId: req.guestId, product: productId };
//     } else {
//       // Pentru utilizatori autentificați
//       query = { user: req.user._id, product: productId };
//     }
    
//     const result = await CartItem.findOneAndDelete(query);
    
//     if (!result) {
//       return res.status(404).json({ message: 'Produsul nu există în coș' });
//     }
    
//     res.status(200).json({ message: 'Produs eliminat din coș' });
//   } catch (err) {
//     res.status(500).json({ 
//       message: 'Eroare la eliminarea din coș', 
//       error: err.message 
//     });
//   }
// };

// // Combină coșul unui utilizator anonim cu cel al unui utilizator autentificat
// export const mergeGuestCart = async (req, res) => {
//   try {
//     const { guestId } = req.body;
    
//     if (!guestId) {
//       return res.status(400).json({ message: 'ID-ul utilizatorului anonim este necesar' });
//     }
    
//     // Găsește toate produsele din coșul utilizatorului anonim
//     const guestCartItems = await CartItem.find({ guestId });
    
//     if (guestCartItems.length === 0) {
//       return res.status(200).json({ message: 'Nu există produse în coșul utilizatorului anonim' });
//     }
    
//     // Pentru fiecare produs din coșul anonim
//     for (const guestItem of guestCartItems) {
//       // Verifică dacă produsul există deja în coșul utilizatorului autentificat
//       const existingItem = await CartItem.findOne({
//         user: req.user._id,
//         product: guestItem.product
//       });
      
//       if (existingItem) {
//         // Dacă produsul există, actualizează cantitatea
//         existingItem.quantity += guestItem.quantity;
//         existingItem.updatedAt = Date.now();
//         await existingItem.save();
        
//         // Șterge produsul din coșul anonim
//         await CartItem.findByIdAndDelete(guestItem._id);
//       } else {
//         // Dacă produsul nu există, transferă-l în coșul utilizatorului autentificat
//         guestItem.user = req.user._id;
//         guestItem.guestId = undefined; // Șterge guestId
//         await guestItem.save();
//       }
//     }
    
//     // Obține coșul actualizat
//     const updatedCart = await CartItem.find({ user: req.user._id }).populate('product');
    
//     res.status(200).json({
//       message: 'Coș combinat cu succes',
//       cartItems: updatedCart
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: 'Eroare la combinarea coșurilor', 
//       error: err.message 
//     });
//   }
// };

// controllers/cart.controller.js
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

// Obține coșul utilizatorului (autentificat sau anonim)
export const getCart = async (req, res) => {
  try {
    let cart;
    
    if (req.userId) {
      // Utilizator autentificat - caută după userId
      cart = await Cart.findOne({ user: req.userId }).populate({
        path: 'items.product',
        model: 'Product'
      });
    } else if (req.guestId) {
      // Utilizator anonim - caută după guestId
      cart = await Cart.findOne({ guestId: req.guestId }).populate({
        path: 'items.product',
        model: 'Product'
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Nu s-a putut identifica utilizatorul" 
      });
    }
    
    if (!cart) {
      // Dacă nu există un coș, returnează un array gol
      return res.status(200).json([]);
    }
    
    // Returnează elementele din coș
    return res.status(200).json(cart.items);
  } catch (error) {
    console.error("Eroare la obținerea coșului:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Eroare la obținerea coșului",
      error: error.message 
    });
  }
};

// Adaugă un produs în coș
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: "ID-ul produsului este obligatoriu" 
      });
    }
    
    // Verifică dacă produsul există
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Produsul nu a fost găsit" 
      });
    }
    
    let cart;
    
    if (req.userId) {
      // Utilizator autentificat - caută după userId
      cart = await Cart.findOne({ user: req.userId });
      
      if (!cart) {
        // Dacă nu există un coș, creează unul nou
        cart = new Cart({
          user: req.userId,
          items: []
        });
      }
    } else if (req.guestId) {
      // Utilizator anonim - caută după guestId
      cart = await Cart.findOne({ guestId: req.guestId });
      
      if (!cart) {
        // Dacă nu există un coș, creează unul nou
        cart = new Cart({
          guestId: req.guestId,
          items: []
        });
      }
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Nu s-a putut identifica utilizatorul" 
      });
    }
    
    // Verifică dacă produsul există deja în coș
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    if (itemIndex > -1) {
      // Dacă produsul există deja, actualizează cantitatea
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      // Dacă produsul nu există, adaugă-l
      cart.items.push({
        product: productId,
        quantity: quantity || 1
      });
    }
    
    await cart.save();
    
    // Populează produsele pentru a returna detalii complete
    const populatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      model: 'Product'
    });
    
    return res.status(200).json({
      success: true,
      message: "Produs adăugat în coș",
      items: populatedCart.items
    });
  } catch (error) {
    console.error("Eroare la adăugarea în coș:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Eroare la adăugarea în coș",
      error: error.message 
    });
  }
};

// Actualizează cantitatea unui produs din coș
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || quantity === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "ID-ul produsului și cantitatea sunt obligatorii" 
      });
    }
    
    let cart;
    
    if (req.userId) {
      // Utilizator autentificat - caută după userId
      cart = await Cart.findOne({ user: req.userId });
    } else if (req.guestId) {
      // Utilizator anonim - caută după guestId
      cart = await Cart.findOne({ guestId: req.guestId });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Nu s-a putut identifica utilizatorul" 
      });
    }
    
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: "Coșul nu a fost găsit" 
      });
    }
    
    // Caută produsul în coș
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: "Produsul nu a fost găsit în coș" 
      });
    }
    
    // Actualizează cantitatea
    if (quantity <= 0) {
      // Dacă cantitatea este 0 sau mai mică, elimină produsul din coș
      cart.items.splice(itemIndex, 1);
    } else {
      // Altfel, actualizează cantitatea
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    
    // Populează produsele pentru a returna detalii complete
    const populatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      model: 'Product'
    });
    
    return res.status(200).json({
      success: true,
      message: "Cantitate actualizată",
      items: populatedCart.items
    });
  } catch (error) {
    console.error("Eroare la actualizarea cantității:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Eroare la actualizarea cantității",
      error: error.message 
    });
  }
};

// Elimină un produs din coș
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.query;
    
    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: "ID-ul produsului este obligatoriu" 
      });
    }
    
    let cart;
    
    if (req.userId) {
      // Utilizator autentificat - caută după userId
      cart = await Cart.findOne({ user: req.userId });
    } else if (req.guestId) {
      // Utilizator anonim - caută după guestId
      cart = await Cart.findOne({ guestId: req.guestId });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Nu s-a putut identifica utilizatorul" 
      });
    }
    
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: "Coșul nu a fost găsit" 
      });
    }
    
    // Caută produsul în coș
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: "Produsul nu a fost găsit în coș" 
      });
    }
    
    // Elimină produsul din coș
    cart.items.splice(itemIndex, 1);
    
    await cart.save();
    
    // Populează produsele pentru a returna detalii complete
    const populatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      model: 'Product'
    });
    
    return res.status(200).json({
      success: true,
      message: "Produs eliminat din coș",
      items: populatedCart.items
    });
  } catch (error) {
    console.error("Eroare la eliminarea din coș:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Eroare la eliminarea din coș",
      error: error.message 
    });
  }
};

// Golește coșul
export const clearCart = async (req, res) => {
  try {
    let cart;
    
    if (req.userId) {
      // Utilizator autentificat - caută după userId
      cart = await Cart.findOne({ user: req.userId });
    } else if (req.guestId) {
      // Utilizator anonim - caută după guestId
      cart = await Cart.findOne({ guestId: req.guestId });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Nu s-a putut identifica utilizatorul" 
      });
    }
    
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: "Coșul nu a fost găsit" 
      });
    }
    
    // Golește coșul
    cart.items = [];
    
    await cart.save();
    
    return res.status(200).json({
      success: true,
      message: "Coșul a fost golit"
    });
  } catch (error) {
    console.error("Eroare la golirea coșului:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Eroare la golirea coșului",
      error: error.message 
    });
  }
};

// ELIMINAT mergeCart - nu mai combinăm coșurile pentru a le menține separat