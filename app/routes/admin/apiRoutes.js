const express = require("express");
const userController = require("../../controller/admin/apiController/userAuthController");
const CrudAllrestaurant = require("../../controller/admin/apiController/CrudAllrestaurant");

const router = express.Router();
router.post("/login", userController.login);
router.get("/logout", userController.logout);

// update all restaurant
// Correct route configuration
router.post('/restaurant/edit/:ObjectId',CrudAllrestaurant.updateRestaurant);


module.exports = router