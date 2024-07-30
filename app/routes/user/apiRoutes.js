const express = require("express");
const userAuthController = require("../../controller/user/apiController/userAuthController");
const userCartController = require("../../controller/user/apiController/userCartController");
const { verifyToken } = require("../../middleware/auth");
const searchController = require("../../controller/user/searchController");
const commentController = require("../../controller/user/apiController/commentsController");
<<<<<<< HEAD
const editController = require("../../controller/user/apiController/editController");

=======
const orderController = require("../../controller/user/apiController/orderController");
>>>>>>> 08bf8eeb5cd2fb432a2eb85a0f6e8f413bca2d86
const router = express.Router();
router.post("/signup", userAuthController.signUp);
router.post("/login", userAuthController.login);
router.post("/verify", userAuthController.verifyEmail);
router.post("/partner/signUp", userAuthController.restaurantOwnerSignup);
router.get("/search", searchController.menuSearch);
router.get("/logout", verifyToken, userAuthController.logout);
router.get("/cart/add/:_id", verifyToken, userCartController.addCart)
router.get("/cart/remove/:_id", verifyToken, userCartController.removeCart)
router.post("/blog/comment/add", verifyToken, commentController.addComment)
<<<<<<< HEAD

// edit profile

router.post('/update/profile',verifyToken,editController.editprofile)
=======
router.get("/order", verifyToken, orderController.addOrder)
>>>>>>> 08bf8eeb5cd2fb432a2eb85a0f6e8f413bca2d86
module.exports = router