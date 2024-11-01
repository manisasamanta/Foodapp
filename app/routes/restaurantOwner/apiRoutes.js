const express = require("express");
const userController = require("../../controller/restaurantOwner/apiController/userAuthController");
const blogController = require("../../controller/restaurantOwner/apiController/crudBlogController");
const restaurantControlller = require("../../controller/restaurantOwner/apiController/crudRestaurantController");
const categoryController = require("../../controller/restaurantOwner/apiController/crudCategoryController");
const menuController = require("../../controller/restaurantOwner/apiController/crudMenuController");
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
router.post("/category/add", verifyToken, categoryController.createCategory);
// add menu
router.post("/menu/add", upload.single("image"), verifyToken, menuController.createMenu);
// add blog
router.post("/blog/add", upload.single("image"), blogController.createBlog);
<<<<<<< HEAD
module.exports = router 
=======




module.exports = router
>>>>>>> a6ee1e6602b4b1c205712ab0f16ca5593ea389ce
