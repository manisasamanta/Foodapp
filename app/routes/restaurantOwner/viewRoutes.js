const express = require("express");
const restaurantOwnerViewController = require("../../controller/restaurantOwner/restaurantOwnerViewController");
const { verifyToken, checkRoleRestaurantOwner } = require("../../middleware/auth");
const orderStatusController = require("../../controller/restaurantOwner/apiController/orderStatusController");
const router = express.Router();
router.get('/', restaurantOwnerViewController.login)
router.get('/dashboard', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.dashboard)
router.get('/restaurant/add', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.addRestaurant)

//category
router.get('/category', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.getCategories)
router.get('/category/delete/:id', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.deleteCategory)
router.get('/category/add', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.addCategory)

<<<<<<< HEAD
//menu
=======
//menu 
>>>>>>> a6ee1e6602b4b1c205712ab0f16ca5593ea389ce
router.get('/menu/add', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.addMenu)
router.get('/menu', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.menu)

//review
router.get('/review', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.review)

//booking
router.get('/booking', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.booking)
router.get('/booking/update', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.updateBooking)

<<<<<<< HEAD
=======
//order
>>>>>>> a6ee1e6602b4b1c205712ab0f16ca5593ea389ce
router.get('/order', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.order)
router.get('/order/update', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.updateOrder)

router.get('/order/:orderStatus/:id/:email',orderStatusController.updateOrderStatus);

//blog
router.get('/blog', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.blog)
router.get('/blog/add', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.blogAdd)
// router.get('/order', restaurantOwnerViewController.order)

module.exports = router