const express = require("express");
const userAuthController = require("../../controller/user/apiController/userAuthController");
const userCartController = require("../../controller/user/apiController/userCartController");
const { verifyToken } = require("../../middleware/auth");
const searchController = require("../../controller/user/searchController");
const router = express.Router();
router.post("/signup", userAuthController.signUp);
router.post("/login", userAuthController.login);
router.post("/verify", userAuthController.verifyEmail);
router.post("/partner/signUp", userAuthController.restaurantOwnerSignup);
router.get("/search", searchController.menuSearch);
router.get("/logout", verifyToken, userAuthController.logout);
router.get("/cart/add/:_id", verifyToken, userCartController.addCart)
module.exports = router