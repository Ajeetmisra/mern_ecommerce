const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, signout, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 chars long"),
    check("email").isEmail().withMessage("enter a valid email"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("enter a valid email"),
    check("password").isLength({ min: 3 }).withMessage("password is required "),
  ],
  signin
);

router.get("/Signout", signout);
router.get("/testroute", isSignedIn, (req, res) => {
  return res.json({
    message: req.auth,
  });
});
module.exports = router;
