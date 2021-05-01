const express = require("express");
const router = express.Router();
const {
  getProductById,
  createProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params
router.param("productId", getProductById);
router.param("userId", getUserById);
// actual route
// create route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// read route
router.get("/product/photo/:productId", photo);

// lsiting all the products

router.get("/products", getAllProducts);

router.get("/products/catehories", getAllUniqueCategories);

module.exports = router;
