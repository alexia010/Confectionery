// import express from 'express';
// import {
//   getHomepageData,
//   addProductToHomepage,
//   addReviewToHomepage,
//   deleteProductFromHomepage,
//   deleteReviewFromHomepage,
//   updateProductInHomepage,
//   updateReviewInHomepage
// } from '../controllers/homepage.controller.js';

// const router = express.Router();

// // Ruta pentru a obține datele de pe homepage
// router.get("/", getHomepageData);

// // Rute pentru administrarea produselor pe homepage
// router.post("/add-product", addProductToHomepage);
// router.delete("/delete-product", deleteProductFromHomepage);
// router.patch("/update-product", updateProductInHomepage);

// // Rute pentru administrarea review-urilor pe homepage
// router.post("/add-review", addReviewToHomepage);
// router.delete("/delete-review", deleteReviewFromHomepage);
// router.patch("/update-review", updateReviewInHomepage);

// export default router;

// import express from 'express';
// import {
//   getHomepageData,
//   addProductToHomepage,
//   addReviewToHomepage,
//   deleteProductFromHomepage,
//   deleteReviewFromHomepage,
//   updateProductInHomepage,
//   updateReviewInHomepage
// } from '../controllers/homepage.controller.js';

// const router = express.Router();

// // Ruta pentru a obține datele de pe homepage
// router.get("/", getHomepageData);

// // Rute pentru administrarea produselor pe homepage
// router.post("/add-product", addProductToHomepage);
// router.delete("/delete-product", deleteProductFromHomepage);
// router.patch("/update-product", updateProductInHomepage);

// // Rute pentru administrarea review-urilor pe homepage
// router.post("/add-review", addReviewToHomepage);
// router.delete("/delete-review", deleteReviewFromHomepage);
// router.patch("/update-review", updateReviewInHomepage);

// export default router;


import express from 'express';
import {
  getHomepageData,
  getProducts,
  getReviews,
  addProductToHomepage,
  addReviewToHomepage,
  deleteProductFromHomepage,
  deleteReviewFromHomepage,
  updateProductInHomepage,
  updateReviewInHomepage
} from '../controllers/homepage.controller.js';

const router = express.Router();

// Ruta pentru a obține datele de pe homepage
router.get("/", getHomepageData);

// Rute pentru produse si recenzii formatate pentru frontend
router.get("/products", getProducts);
router.get("/reviews", getReviews);

// Rute pentru administrarea produselor pe homepage
router.post("/add-product", addProductToHomepage);
router.delete("/delete-product", deleteProductFromHomepage);
router.patch("/update-product", updateProductInHomepage);

// Rute pentru administrarea review-urilor pe homepage
router.post("/add-review", addReviewToHomepage);
router.delete("/delete-review", deleteReviewFromHomepage);
router.patch("/update-review", updateReviewInHomepage);

export default router;