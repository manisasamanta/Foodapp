const Token = require("../../models/tokenModel");
const User = require("../../models/userModel");
const Category = require("../../models/categoryModel");
const Menu = require("../../models/menuItemModel");
const Blog = require("../../models/blogModel");
const Review = require("../../models/reviewModel");
class UserViewController {
  verify = async (req, res) => {
    try {
      const token = req.query.token;
      // const existedToken = await Token.findOne({ token: token });
      return res.render("verifyEmail", { token: token });
    } catch (error) {
      return res.status(500).json({ 
        success: false,
        message: error.message,
      });
    }
  };
  login = async (req, res) => {
    try {
      return res.render("user/layouts/userLogin", {
        title: "login",
        logUser: req.user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  signup = async (req, res) => {
    try {
      return res.render("user/layouts/userSignup", {
        title: "signup",
        logUser: req.user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  restaurantOwnerSignup = async (req, res) => {
    try {
      return res.render("user/layouts/restaurantOwnerSignup", {
        title: "partner-signup",
        logUser: req.user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  // Manisha......................................................................................................
  // home view

  home = async (req, res) => {
    try {
      const menus = await Menu.find();
      res.render("user/layouts/home", {
        title: "home",
        logUser: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // about view

  about = async (req, res) => {
    try {
      res.render("user/layouts/about", {
        title: "about",
        logUser: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // book view

  book = async (req, res) => {
    try {
      res.render("user/layouts/book", {
        title: "book",
        logUser: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // menu view

  menu = async (req, res) => {
    try {
      res.render("user/layouts/menu", {
        title: "menu",
        logUser: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // cart view

  cart = async (req, res) => {
    try {
      res.render("user/layouts/cart", {
        title: "cart",
        logUser: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // blog view

  blog = async (req, res) => {
    try {
      res.render("user/layouts/blog", {
        title: "blog",
        logUser: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };
  blogDetail = async (req, res) => {
    try {
      res.render("user/layouts/blogDetails", {
        title: "blog",
        logUser: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };
  restaurant = async (req, res) => {
    try {
      res.render("user/layouts/restaurant", {
        title: "restaurant",
        logUser: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };
  profile= async (req, res) => {
    try {
      res.render("user/layouts/profile", {
        title: "profile",
        logUser: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = new UserViewController();
