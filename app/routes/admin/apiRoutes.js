const express = require("express");
const upload=require('../../helper/multer')
const userController = require("../../controller/admin/apiController/userAuthController");
const CrudAllrestaurant = require("../../controller/admin/apiController/CrudAllrestaurant");
const carousalController = require("../../controller/admin/apiController/carousalController");

const router = express.Router();
router.post("/login", userController.login);
router.get("/logout", userController.logout);
<<<<<<< HEAD
module.exports = router 
=======

// update all restaurant
// Correct route configuration

router.post('/restaurant/edit/:_id',upload.single('image'),CrudAllrestaurant.updateRestaurant);
// add Carousal

router.post('/add/carousal',carousalController.addCarousal)

// delete carousal

router.get('/delete/carousal/:id',carousalController.deleteCarousal)

// edit carousal

router.post('/update/carousal/:id',carousalController.updateCarousal)
module.exports = router
>>>>>>> a6ee1e6602b4b1c205712ab0f16ca5593ea389ce
