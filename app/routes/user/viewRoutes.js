const express = require("express");
const userViewController = require("../../controller/user/userViewController");
const { verifyToken } = require("../../middleware/auth");
const router = express.Router();
router.get('/verify', userViewController.verify)
router.get('/login', userViewController.login)
router.get('/signup', userViewController.signup)
router.get('/partner/signup', userViewController.restaurantOwnerSignup)


router.get('/', verifyToken, userViewController.home)
router.get('/about', verifyToken, userViewController.about)
router.get('/book', verifyToken,userViewController.book)
router.get('/menu', verifyToken, userViewController.menu)
router.get('/cart', verifyToken, userViewController.cart)
router.get('/blog', verifyToken, userViewController.blog)
router.get('/blog/:_id', verifyToken, userViewController.blogDetail)
router.get('/profile', verifyToken, userViewController.profile)
router.get('/restaurant', verifyToken, userViewController.restaurant)
router.get('/orders', verifyToken, userViewController.orders)
router.get('/profile/edit', verifyToken, userViewController.editProfile)
module.exports = router