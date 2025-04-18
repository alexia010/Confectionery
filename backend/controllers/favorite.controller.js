import FavoriteItem from '../models/favorite.model.js';
import Product from '../models/product.model.js';

// Obține toate favoritele unui utilizator
export const getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteItem.find({ user: req.userId})
      .populate('product');
    
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ 
      message: 'Eroare la obținerea favoritelor', 
      error: err.message 
    });
  }
};

// Adaugă un produs la favorite
export const addFavorite = async (req, res) => {
  try {
    const productId = req.params.productId;
    
    // Verifică dacă produsul există
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produsul nu a fost găsit' });
    }
    
    // Verifică dacă produsul este deja favorit
    const existingFavorite = await FavoriteItem.findOne({ 
      user:req.userId,
      product: productId 
    });
    
    if (existingFavorite) {
      return res.status(400).json({ message: 'Produsul este deja în favorite' });
    }
    
    // Adaugă produsul la favorite
    const favoriteItem = new FavoriteItem({
      user: req.userId,
      product: productId
    });
    
    await favoriteItem.save();
    res.status(201).json({ 
      message: 'Produs adăugat la favorite', 
      favoriteItem 
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Eroare la adăugarea favoritului', 
      error: err.message 
    });
  }
};

// Elimină un produs din favorite
export const removeFavorite = async (req, res) => {
  try {
    const productId = req.params.productId;
    
    const result = await FavoriteItem.findOneAndDelete({ 
      user: req.userId, 
      product: productId 
    });
    
    if (!result) {
      return res.status(404).json({ message: 'Favoritul nu a fost găsit' });
    }
    
    res.status(200).json({ message: 'Produs eliminat din favorite' });
  } catch (err) {
    res.status(500).json({ 
      message: 'Eroare la eliminarea favoritului', 
      error: err.message 
    });
  }
};