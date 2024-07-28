const express = require("express");
const userController = require("../../controller/restaurantOwner/apiController/userAuthController");
const blogController = require("../../controller/restaurantOwner/apiController/crudBlogController");
const restaurantControlller = require("../../controller/restaurantOwner/apiController/crudRestaurantController");
const upload = require("../../helper/multer");
const { verifyToken } = require("../../middleware/auth");
const router = express.Router();
// auth
router.post("/login", userController.login);
router.get("/logout", userController.logout);
// other functions
// add restaurant
router.post("/restaurant/add", verifyToken, upload.single("image"), restaurantControlller.createRestaurant);
// add category
// router.post("/category/add", userController.createCategory);
// add menu
// router.post("/menu/add", upload.single("image"), userController.createMenuItem);
// add blog
router.post("/blog/add", upload.single("image"), blogController.createBlog);
module.exports = router