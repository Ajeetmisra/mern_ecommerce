const express = require("express");
const router = express.Router();

const {
  getUserById,
  getuser,
  getAllUsers,
  updateUser,
  getUserPurchaseList,
} = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");

router.param("userId", getUserById);

// whenever a :userId found in params the router.params middleware will execcute
router.get("/user/:userId", isSignedIn, isAuthenticated, getuser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  getUserPurchaseList
);

router.get("/users", getAllUsers);

module.exports = router;
