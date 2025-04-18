
import Homepage from '../models/homePage.model.js';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

// Obține datele pentru pagina principală
export const getHomepageData = async (req, res) => {
  try {
    // Caută homepage și populează produsele și reviewurile
    let homepage = await Homepage.findOne().populate('produse reviewuri');
    
    if (!homepage) {
      // Dacă nu există homepage, creează unul nou cu array-uri goale
      homepage = new Homepage({
        produse: [],
        reviewuri: []
      });
      await homepage.save();
    }
    
    return res.status(200).json({
      success: true,
      homepage: homepage
    });
  } catch (error) {
    console.error('Eroare la obținerea datelor pentru pagina de start:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Eroare la obținerea datelor pentru pagina de start',
      error: error.message
    });
  }
};

// Obține produsele formatate pentru frontend
export const getProducts = async (req, res) => {
  try {
    // Caută homepage și populează produsele
    let homepage = await Homepage.findOne().populate('produse');
    
    if (!homepage || !homepage.produse) {
      return res.status(404).json({ 
        success: false, 
        message: 'Produsele nu au fost găsite' 
      });
    }
    
    // Formatăm produsele direct pentru ProductCard
    const formattedProducts = homepage.produse.map(product => ({
      _id: product._id,
      name: product.name,
      description: product.description,
      image: product.images && product.images.length > 0 ? product.images[0] : null,
      price: product.price,
      badge: product.characteristics && product.characteristics.length > 0 ? product.characteristics[0] : null
    }));
    
    return res.status(200).json({
      success: true,
      products: formattedProducts
    });
  } catch (error) {
    console.error('Eroare la obținerea produselor:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Eroare la obținerea produselor',
      error: error.message
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    // Găsim homepage și populăm produsele
    let homepage = await Homepage.findOne().populate('reviewuri.product', 'name');

    if (!homepage || !homepage.reviewuri || homepage.reviewuri.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Recenziile nu au fost găsite'
      });
    }

    const formattedReviews = [];
    for (let item of homepage.reviewuri) {
      // Verificăm dacă produsul există
      if (!item.product) {
        console.log(`Produsul cu ID ${item.product} nu a fost găsit`);
        continue; // Trecem peste această recenzie dacă produsul nu există
      }

      // Găsim produsul și recenziile asociate
      const product = await Product.findById(item.product).populate({
        path: 'reviews.user',
        select: 'name' // Schimbă cu 'username' sau alt câmp dacă 'name' nu există
      });

      if (!product) {
        console.log(`Produsul cu ID ${item.product} nu a fost găsit în a doua interogare`);
        continue;
      }

      // Găsim recenzia specifică
      const review = product.reviews.find(r => r._id.toString() === item.reviewId.toString());

      if (!review) {
        console.log(`Recenzia cu ID ${item.reviewId} nu a fost găsită în produsul ${product.name}`);
        continue;
      }

      // Verificăm dacă user există și are un câmp name
      if (!review.user) {
        console.log(`Utilizatorul pentru recenzia ${review._id} nu a fost găsit`);
      } else if (!review.user.name) {
        console.log(`Utilizatorul pentru recenzia ${review._id} nu are câmpul name:`, review.user);
      }

  
      formattedReviews.push({
        id: review._id,
        name: review.user?.name || 'Anonim',
        role: product.name || 'Produs necunoscut',
        review: review.comment || 'Fără comentariu',
        rating: review.rating || 5
      });
    }

    if (formattedReviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Recenziile nu au fost găsite'
      });
    }

    // Logăm rezultatul final pentru depanare
    console.log('Recenzii formatate:', formattedReviews);

    return res.status(200).json({
      success: true,
      reviews: formattedReviews
    });
  } catch (error) {
    console.error('Eroare la obținerea recenziilor:', error);
    return res.status(500).json({
      success: false,
      message: 'Eroare la obținerea recenziilor',
      error: error.message
    });
  }
};

// Adaugă un produs la homepage
export const addProductToHomepage = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID-ul produsului este necesar' 
      });
    }
    
    // Verifică dacă produsul există
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Produsul nu a fost găsit' 
      });
    }
    
    // Caută homepage
    let homepage = await Homepage.findOne();
    if (!homepage) {
      homepage = new Homepage({
        produse: [],
        reviewuri: []
      });
    }
    
    // Verifică dacă produsul există deja în homepage
    if (homepage.produse.includes(productId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Produsul există deja pe homepage' 
      });
    }
    
    // Adaugă produsul la lista de produse
    homepage.produse.push(productId);
    await homepage.save();
    
    return res.status(200).json({
      success: true,
      message: 'Produs adăugat pe homepage cu succes',
      homepage: homepage
    });
  } catch (error) {
    console.error('Eroare la adăugarea produsului pe homepage:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Eroare la adăugarea produsului pe homepage',
      error: error.message
    });
  }
};

// Șterge un produs de pe homepage
export const deleteProductFromHomepage = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID-ul produsului este necesar' 
      });
    }
    
    // Caută homepage
    let homepage = await Homepage.findOne();
    if (!homepage) {
      return res.status(404).json({ 
        success: false, 
        message: 'Homepage-ul nu a fost găsit' 
      });
    }
    
    // Verifică dacă produsul există pe homepage
    if (!homepage.produse.includes(productId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Produsul nu există pe homepage' 
      });
    }
    
    // Elimină produsul din lista de produse
    homepage.produse = homepage.produse.filter(id => id.toString() !== productId);
    await homepage.save();
    
    return res.status(200).json({
      success: true,
      message: 'Produs eliminat de pe homepage cu succes',
      homepage: homepage
    });
  } catch (error) {
    console.error('Eroare la eliminarea produsului de pe homepage:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Eroare la eliminarea produsului de pe homepage',
      error: error.message
    });
  }
};

// Actualizează ordinea produselor pe homepage
export const updateProductInHomepage = async (req, res) => {
  try {
    const { produseOrdinea } = req.body;
    
    if (!produseOrdinea || !Array.isArray(produseOrdinea)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Lista de produse este necesară și trebuie să fie un array' 
      });
    }
    
    // Caută homepage
    let homepage = await Homepage.findOne();
    if (!homepage) {
      return res.status(404).json({ 
        success: false, 
        message: 'Homepage-ul nu a fost găsit' 
      });
    }
    
    // Actualizează lista de produse
    homepage.produse = produseOrdinea;
    await homepage.save();
    
    return res.status(200).json({
      success: true,
      message: 'Ordinea produselor pe homepage a fost actualizată cu succes',
      homepage: homepage
    });
  } catch (error) {
    console.error('Eroare la actualizarea produselor pe homepage:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Eroare la actualizarea produselor pe homepage',
      error: error.message
    });
  }
};

// Adaugă un review la homepage
export const addReviewToHomepage = async (req, res) => {
  try {
    const { reviewId } = req.body;
    
    if (!reviewId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID-ul review-ului este necesar' 
      });
    }
    
    // Caută homepage
    let homepage = await Homepage.findOne();
    if (!homepage) {
      homepage = new Homepage({
        produse: [],
        reviewuri: []
      });
    }
    
    // Verifică dacă review-ul există deja în homepage
    if (homepage.reviewuri.includes(reviewId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Review-ul există deja pe homepage' 
      });
    }
    
    // Adaugă review-ul la lista de reviewuri
    homepage.reviewuri.push(reviewId);
    await homepage.save();
    
    return res.status(200).json({
      success: true,
      message: 'Review adăugat pe homepage cu succes',
      homepage: homepage
    });
  } catch (error) {
    console.error('Eroare la adăugarea review-ului pe homepage:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Eroare la adăugarea review-ului pe homepage',
      error: error.message
    });
  }
};

// Șterge un review de pe homepage
export const deleteReviewFromHomepage = async (req, res) => {
  try {
    const { reviewId } = req.body;
    
    if (!reviewId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID-ul review-ului este necesar' 
      });
    }
    
    // Caută homepage
    let homepage = await Homepage.findOne();
    if (!homepage) {
      return res.status(404).json({ 
        success: false, 
        message: 'Homepage-ul nu a fost găsit' 
      });
    }
    
    // Verifică dacă review-ul există pe homepage
    if (!homepage.reviewuri.includes(reviewId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Review-ul nu există pe homepage' 
      });
    }
    
    // Elimină review-ul din lista de reviewuri
    homepage.reviewuri = homepage.reviewuri.filter(id => id.toString() !== reviewId);
    await homepage.save();
    
    return res.status(200).json({
      success: true,
      message: 'Review eliminat de pe homepage cu succes',
      homepage: homepage
    });
  } catch (error) {
    console.error('Eroare la eliminarea review-ului de pe homepage:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Eroare la eliminarea review-ului de pe homepage',
      error: error.message
    });
  }
};

// Actualizează ordinea review-urilor pe homepage
export const updateReviewInHomepage = async (req, res) => {
  try {
    const { reviewuriOrdinea } = req.body;
    
    if (!reviewuriOrdinea || !Array.isArray(reviewuriOrdinea)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Lista de reviewuri este necesară și trebuie să fie un array' 
      });
    }
    
    // Caută homepage
    let homepage = await Homepage.findOne();
    if (!homepage) {
      return res.status(404).json({ 
        success: false, 
        message: 'Homepage-ul nu a fost găsit' 
      });
    }
    
    // Actualizează lista de reviewuri
    homepage.reviewuri = reviewuriOrdinea;
    await homepage.save();
    
    return res.status(200).json({
      success: true,
      message: 'Ordinea reviewurilor pe homepage a fost actualizată cu succes',
      homepage: homepage
    });
  } catch (error) {
    console.error('Eroare la actualizarea reviewurilor pe homepage:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Eroare la actualizarea reviewurilor pe homepage',
      error: error.message
    });
  }
};