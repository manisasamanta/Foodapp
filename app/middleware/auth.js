const JWT = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const hashPassword = async (password) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        return error
    }
}
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcryptjs.compare(password, hashedPassword);
    } catch (error) {
        return error
    }
};
const generateJWTToken = (id, name, email, role) => {
  try {
    return JWT.sign({ id, name, email, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("X-ACCESS-TOKEN") || req.cookies["X-ACCESS-TOKEN"];
    if (!token) {
      // req.alert = "Please login first";
      return next();
      // res.status(400).json({
      //   success: false,
      //   message: "Token not found",
      // });
    }
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const checkRoleAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return res.render("error/forbidden403", { message: "Only admin can access this page." });
    }
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
const checkRoleRestaurantOwner = async (req, res, next) => {
    try {
      const { role } = req.user;
      if (role !== "restaurantOwner") {
        return res.status(400).json({
          success: false,
          message: "Access denied",
        });
      }
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  };
const checkRoleUser = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "user") {
      return res.status(400).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
module.exports = {
  hashPassword,
  comparePassword,
  generateJWTToken,
  verifyToken,
  checkRoleAdmin,
  checkRoleRestaurantOwner,
  checkRoleUser
}