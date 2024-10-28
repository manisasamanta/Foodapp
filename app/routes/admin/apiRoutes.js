const express = require("express");
const userController = require("../../controller/admin/apiController/userAuthController");
const router = express.Router();
router.post("/login", userController.login);
router.get("/logout", userController.logout);
module.exports = router 