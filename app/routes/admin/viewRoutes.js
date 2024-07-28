const express = require("express");
const adminViewController = require("../../controller/admin/adminViewController");
const { verifyToken, checkRoleAdmin } = require("../../middleware/auth");
const router = express.Router();
router.get('/', adminViewController.login)
router.get('/dashboard', verifyToken, checkRoleAdmin, adminViewController.admindashboard)
router.get('/review', verifyToken, checkRoleAdmin, adminViewController.allReviews)
router.get('/restaurant', verifyToken, checkRoleAdmin, adminViewController.allRestaurant)
module.exports = router