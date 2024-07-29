const express = require("express");
const adminViewController = require("../../controller/admin/adminViewController");
const { verifyToken, checkRoleAdmin } = require("../../middleware/auth");
const CrudAllrestaurant = require("../../controller/admin/apiController/CrudAllrestaurant");
const router = express.Router();
router.get('/', adminViewController.login)
router.get('/dashboard', verifyToken, checkRoleAdmin, adminViewController.admindashboard)
router.get('/review', verifyToken, checkRoleAdmin, adminViewController.allReviews)
router.get('/restaurant', verifyToken, checkRoleAdmin, adminViewController.allRestaurant)
router.get('/user', verifyToken, checkRoleAdmin, adminViewController.Alluser)
router.get('/editform/restaurant/:id',verifyToken,adminViewController.editrestaurantForm)




module.exports = router