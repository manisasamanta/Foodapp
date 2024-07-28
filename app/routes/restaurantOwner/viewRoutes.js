const express = require("express");
const restaurantOwnerViewController = require("../../controller/restaurantOwner/restaurantOwnerViewController");
const { verifyToken, checkRoleRestaurantOwner } = require("../../middleware/auth");
const router = express.Router();
router.get('/', restaurantOwnerViewController.login)
router.get('/dashboard', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.dashboard)
router.get('/restaurant/add', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.addRestaurant)
router.get('/category', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.getCategories)
router.get('/menu/add', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.addMenu)
router.get('/menu', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.menu)
router.get('/review', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.review)
router.get('/booking', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.booking)
router.get('/booking/update', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.updateBooking)
router.get('/order', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.order)
router.get('/order/update', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.updateOrder)
router.get('/blog', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.blog)
router.get('/blog/add', verifyToken, checkRoleRestaurantOwner, restaurantOwnerViewController.blogAdd)
// router.get('/order', restaurantOwnerViewController.order)
module.exports = router