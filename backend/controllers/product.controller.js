import Product from '../models/product.model.js';
import fs from 'fs/promises';
import path from 'path';
import constants from '../utils/constants.js';

export const createProduct = async (req, res) => {   
  console.log('req.files în createProduct:', req.files);
  console.log('req.body în createProduct:', req.body);
  try {     
    let images = [];
    if (req.files && req.files.length > 0) {       
      images = req.files.map(file => `/${constants.UPLOADS_DIR}${file.filename}`);     
    }      

    // Parse ingredients if provided as a JSON string
    let ingredients = req.body.ingredients;
    if (typeof ingredients === 'string') {       
      ingredients = JSON.parse(ingredients);     
    }

    // Parse characteristics
    let characteristics = req.body.characteristics;
    if (characteristics === null || characteristics === undefined) {
      characteristics = []; // Setează ca array gol dacă e null sau undefined
    } else if (typeof characteristics === 'string') {
      try {
        // Încearcă parsing JSON
        characteristics = JSON.parse(characteristics);
      } catch (error) {
        // Dacă nu e JSON valid, încearcă să-l transformi într-un array
        characteristics = characteristics.split(',').map(char => char.trim()).filter(char => char);
      }
    }

    // Asigură-te că characteristics este un array, altfel transformă-l
    if (!Array.isArray(characteristics)) {
      characteristics = [characteristics].filter(Boolean);
    }
    
    // Creează obiectul produsului, combinând datele din req.body cu imaginile
    const productData = {       
      ...req.body,
      category: req.body.category, // Păstrează categoria ca string
      characteristics: characteristics, // Acum ar trebui să fie un array sau gol 
      ingredients: ingredients || [], // Array de obiecte       
      images: images, // Adaugă URL-urile imaginilor       
      visible: req.body.visible !== undefined ? req.body.visible : true, // Setează vizibilitatea     
    };      

    const product = new Product(productData);     
    await product.save();     
    res.status(201).json(product);   
  } catch (err) {     
    res.status(400).json({ 
      message: 'Eroare la crearea produsului.', 
      error: err.message,
      debugData: {
        characteristics: req.body.characteristics,
        characteristicsType: typeof req.body.characteristics
      }
    });   
  } 
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name'); // Schimbat de la 'username' la 'name'
    if (!product) return res.status(404).json({ message: 'Produsul nu a fost găsit.' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Eroare la căutarea produsului.', error: err.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produsul nu a fost găsit.' });
    
    console.log('Request body:', req.body);
    console.log('Request files:', req.files ? req.files.length : 0);
    
    const updatableFields = [
      'name', 'description', 'price', 'allergensText',
      'category', 'characteristics', 'ingredients', 'visible'
    ];
    
    // Actualizează câmpurile de bază (fără imagini)
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if ((field === 'ingredients' || field === 'characteristics') && typeof req.body[field] === 'string') {
          try {
            product[field] = JSON.parse(req.body[field]);
          } catch (error) {
            console.error(`Eroare la parsarea JSON pentru câmpul ${field}:`, error);
          }
        } else {
          product[field] = req.body[field];
        }
      }
    });
    
    // Gestionarea imaginilor
    let finalImages = [...product.images]; // Păstrăm imaginile existente inițial
    
    // Verificăm dacă avem existingImages în request
    if (req.body.existingImages) {
      try {
        // Parsăm lista de imagini existente din request
        const existingImages = JSON.parse(req.body.existingImages);
        console.log('Imagini existente din client:', existingImages);
        
        // Identificăm imaginile care trebuie șterse (cele care nu mai sunt în lista existingImages)
        const imagesToDelete = product.images.filter(img => !existingImages.includes(img));
        
        if (imagesToDelete.length > 0) {
          console.log('Imagini de șters:', imagesToDelete);
          
          // Ștergem fizic fișierele care nu mai sunt necesare
          const deletePromises = imagesToDelete.map(async (imageUrl) => {
            const fileName = path.basename(imageUrl);
            const filePath = path.join(constants.UPLOADS_DIR, fileName);
            try {
              await fs.unlink(filePath);
              console.log(`Fișier șters cu succes: ${filePath}`);
            } catch (err) {
              console.error(`Eroare la ștergerea fișierului ${filePath}:`, err);
            }
          });
          await Promise.all(deletePromises);
        }
        
        // Actualizăm lista de imagini păstrate
        finalImages = existingImages;
      } catch (error) {
        console.error('Eroare la parsarea imaginilor existente:', error);
      }
    }
    
    // Adăugăm imaginile noi la lista finală (dacă există)
    if (req.files && req.files.length > 0) {
      console.log(`Adăugăm ${req.files.length} imagini noi`);
      const newImages = req.files.map(file => `/${constants.UPLOADS_DIR}${file.filename}`);
      finalImages = [...finalImages, ...newImages];
    }
    
    // Actualizăm produsul cu lista finală de imagini
    product.images = finalImages;
    console.log('Lista finală de imagini:', finalImages);
    
    product.updatedAt = new Date();
    await product.save();
    
    res.json(product);
  } catch (err) {
    console.error('Eroare completă la actualizarea produsului:', err);
    res.status(400).json({ message: 'Eroare la actualizarea produsului.', error: err.message });
  }
};

// Delete
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produsul nu a fost găsit.' });

    // Șterge imaginile asociate de pe server
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map(async (imageUrl) => {
        const fileName = path.basename(imageUrl);
        const filePath = path.join(constants.UPLOADS_DIR, fileName);
        try {
          await fs.unlink(filePath);
        } catch (err) {
          console.error(`Eroare la ștergerea fișierului ${filePath}:`, err);
        }
      });
      await Promise.all(deletePromises);
    }

    res.json({ message: 'Produs șters cu succes.' });
  } catch (err) {
    res.status(400).json({ message: 'Eroare la ștergere.', error: err.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    // Verifică dacă există un parametru de query pentru a include produsele ascunse
    const includeHidden = req.query.includeHidden === 'true';
    
    // Construiește query-ul în funcție de parametru
    let query = {};
    if (!includeHidden) {
      query.visible = true;
    }
    
    // Caută produsele cu query-ul construit
    const products = await Product.find(query).populate('reviews.user', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Eroare la obținerea produselor.', error: err.message });
  }
};

// Get products with minimal data (name, description, price, and first image)
// export const getProductsMinimal = async (req, res) => {
//   try {
//     const products = await Product.find({ visible: true }).select('name description price images');
    
//     // Procesăm rezultatul pentru a returna doar prima imagine
//     const minimalProducts = products.map(product => ({
//       _id: product._id,
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       image: product.images && product.images.length > 0 ? product.images[0] : null, // Returnăm doar prima imagine
//     }));

//     res.json(minimalProducts);
//   } catch (err) {
//     res.status(500).json({ message: 'Eroare la obținerea produselor minime.', error: err.message });
//   }
// };

export const getProductsMinimal = async (req, res) => {
  try {
    const products = await Product.find({ visible: true }).select('name description price images category characteristics');
    
    // Procesăm rezultatul pentru a returna doar prima imagine
    const minimalProducts = products.map(product => ({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category:product.category,
      characteristics: product.characteristics,
      image: product.images && product.images.length > 0 ? product.images[0] : null, // Returnăm doar prima imagine
    }));

    res.json(minimalProducts);
  } catch (err) {
    res.status(500).json({ message: 'Eroare la obținerea produselor minime.', error: err.message });
  }
};


// Get product enums
export const getProductEnums = async(req, res) => {
  try {
    const categories = Product.schema.path('category').enumValues; // Access enum values for category
    const characteristics = Product.schema.path('characteristics.0').enumValues; // Access enum values for characteristics
    res.json({ categories, characteristics });
  } catch (err) {
    res.status(500).json({ message: 'Eroare la obținerea valorilor enum.', error: err.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Produsul nu a fost găsit.' });
    }

    if (!req.userId) {
      return res.status(401).json({ message: 'Trebuie să fii autentificat.' });
    }


    const newReview = {
      user: req.userId,
      comment: comment || '',
      rating: Number(rating),
      createdAt: new Date(),
    };

    product.reviews.push(newReview);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.numReviews;
    product.updatedAt = new Date();

    await product.save();

    res.status(201).json({ message: 'Recenzia a fost adăugată cu succes.', review: newReview });
  } catch (err) {
    res.status(400).json({ message: 'Eroare la adăugarea recenziei.', error: err.message });
  }

  
};

export const toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { visible } = req.body;

    // Verifică dacă parametrul visible este boolean
    if (typeof visible !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Vizibilitatea trebuie să fie o valoare boolean (true/false)'
      });
    }

    // Caută produsul și actualizează-l
    const product = await Product.findByIdAndUpdate(
      id, 
      { visible }, 
      { new: true } // Returnează documentul actualizat
    );

    // Verifică dacă produsul există
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produsul nu a fost găsit'
      });
    }

    // Returnează produsul actualizat
    return res.status(200).json({
      success: true,
      data: product,
      message: `Produsul este acum ${visible ? 'vizibil' : 'ascuns'}`
    });
  } catch (error) {
    console.error('Eroare la actualizarea vizibilității:', error);
    return res.status(500).json({
      success: false,
      message: 'Eroare la actualizarea vizibilității produsului',
      error: error.message
    });
  }
};

// export const deleteReview = async (req, res) => {
//   try {
//     const { id: productId, reviewId } = req.params;
//     const userId = req.user?._id; // From verifyToken middleware
//     console.log('revw bck dele');
//     // Find the product
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Produsul nu a fost găsit' });
//     }

//     // Find the review
//     const review = product.reviews.find(
//       (r) => r._id.toString() === reviewId // Use _id for MongoDB
//     );
//     if (!review) {
//       return res.status(404).json({ success: false, message: 'Recenzia nu a fost găsită' });
//     }


//     product.numReviews = product.reviews.length;

//     if (product.reviews.length > 0) {
//       const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
//       product.rating = Number((totalRating / product.reviews.length).toFixed(1));
//     } else {
//       product.rating = 0;
//     }

//     console.log(product);
//     await product.save();

//     res.status(200).json({
//       success: true,
//       message: 'Recenzia a fost ștearsă cu succes',
//     });
//   } catch (error) {
//     console.error('Eroare la ștergerea recenziei:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Eroare server la ștergerea recenziei',
//     });
//   }
// };

export const deleteReview = async (req, res) => {
  try {
    const { id: productId, reviewId } = req.params;
    const userId = req.user?._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produsul nu a fost găsit' });
    }

    const review = product.reviews.find(
      (r) => r._id.toString() === reviewId
    );
    if (!review) {
      return res.status(404).json({ success: false, message: 'Recenzia nu a fost găsită' });
    }

    // 🔥 Ștergem recenzia
    product.reviews = product.reviews.filter((r) => r._id.toString() !== reviewId);

    // Recalculăm ratingul și numărul de review-uri
    product.numReviews = product.reviews.length;

    if (product.reviews.length > 0) {
      const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
      product.rating = Number((totalRating / product.reviews.length).toFixed(1));
    } else {
      product.rating = 0;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Recenzia a fost ștearsă cu succes',
    });
  } catch (error) {
    console.error('Eroare la ștergerea recenziei:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare server la ștergerea recenziei',
    });
  }
};
