const Token = require("../../models/tokenModel");
const User = require("../../models/userModel");
const Category = require("../../models/categoryModel");
const Menu = require("../../models/menuItemModel");
const Blog = require("../../models/blogModel");
const Review = require("../../models/reviewModel");
const BlogComment = require("../../models/blogCommentModel");
const Restaurant = require("../../models/restaurantModel");
const Order = require("../../models/orderModel");
const Cart = require("../../models/addToCartModel");
const userModel = require("../../models/userModel");
const Carousal = require("../../models/carousalModel");
// const carousalModel = require("../../models/carousalModel");
const orderModel = require("../../models/orderModel");
const mongoose = require("mongoose");
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
      const menus = await Menu.find().populate("restaurant").limit(3);
      const carousal = await Carousal.find()
    
     
      const reviews = await Review.aggregate([
        {
          $lookup:{
            from: "menus",
            localField: "menu",
            foreignField: "_id",
            as: "menu",
          }
        },
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurant",
            foreignField: "_id",
            as: "restaurant",
          }
        },
        {
          $unwind: "$user"
        },
        {
          $unwind: "$restaurant"
        },
        {
          $unwind: "$menu"
        },

      ])
      res.render("user/layouts/home", {
        title: "home",
        logUser: req.user,
        menuData: menus,
        reviewData: reviews,
        carDataActive: carousal[0],
        carDataInactive: carousal.slice(1),
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
      const categories = await Category.find()
      if(req.query.category){
        // const menus = await Menu.find({category: req.query.category});
        const menus = await Menu.find({category: req.query.category}).populate("restaurant")
        return res.render("user/layouts/menu", {
          title: "menu",
          logUser: req.user,
          menuData: menus,
          categories
        });
      }
      if(req.query.restaurant){
        const menus = await Menu.find({restaurant: req.query.restaurant}).populate("restaurant")
        return res.render("user/layouts/menu", {
          title: "menu",
          logUser: req.user,
          menuData: menus,
          categories
        });
      }
      if(req.query.query){
        const menus = await Menu.aggregate([
          {
            $lookup:{
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "categoryData"
            }
          },
          {
            $lookup:{
              from: "restaurants",
              localField: "restaurant",
              foreignField: "_id",
              as: "restaurantData"
            }
          },
          {
            $match:{
              $or:[
                {name: {$regex: req.query.query, $options: "i"}},
                {description: {$regex: req.query.query, $options: "i"}},
                {'categoryData.name':{$regex: req.query.query, $options: "i"}},
                {'restaurantData.name':{$regex: req.query.query, $options: "i"}},
              ]
            }
          }
        ])
        // return res.json(menus)
        return res.render("user/layouts/menu", {
          title: "menu",
          logUser: req.user,
          menuData: menus,
          categories
        });
      }
      const menus = await Menu.find().populate("restaurant")
      res.render("user/layouts/menu", {
        title: "menu",
        logUser: req.user,
        menuData: menus,
        categories
      });
    } catch (error) {
      console.log(error);
    }
  };

  // cart view

  cart = async (req, res) => {
    try {
      const cart = await Cart.findOne({user: req.user.id}).populate({
        path: "cart.menu",
        populate: {
          path: "restaurant",
        }
      });
      // console.log(cart)
      res.render("user/layouts/cart", {
        title: "cart",
        logUser: req.user,
        cartData: cart
      });
    } catch (error) {
      console.log(error);
    }
  };

  // blog view

  blog = async (req, res) => {
    try {
      const blogsAll = await Blog.find().sort({createdAt: -1});
      const blogsSort = await Blog.find().sort({createdAt: -1}).limit(3);
      if(req.query.query){
        const blogsSearch = await Blog.find({$or:[{name:{$regex: req.query.query, $options: "i"}},{content:{$regex: req.query.query, $options: "i"}}]}).sort({createdAt: -1});
        return res.render("user/layouts/blog", {
          title: "blog",
          logUser: req.user,
          recent: blogsSort,
          allBlogs: blogsSearch
        });
      }
      res.render("user/layouts/blog", {
        title: "blog",
        logUser: req.user,
        recent: blogsSort,
        allBlogs: blogsAll
      });
    } catch (error) {
      console.log(error);
    }
  };
  blogDetail = async (req, res) => {
    try {
      const {_id}= req.params
      const blog = await Blog.findOne({_id})
      const blogsSort = await Blog.find().sort({createdAt: -1}).limit(3);
      const comments = await BlogComment.find({blog: _id}).populate("user")
      res.render("user/layouts/blogDetails", {
        title: "blog",
        logUser: req.user,
        recent: blogsSort,
        blog,
        comments
      });
    } catch (error) {
      console.log(error);
    }
  };
  restaurant = async (req, res) => {
    try {
      const restaurants = await Restaurant.find().populate("reviews")
      res.render("user/layouts/restaurant", {
        title: "restaurant",
        logUser: req.user,
        restaurants
      });
    } catch (error) {
      console.log(error);
    }
  };
  profile= async (req, res) => {
    try {
      const data=await userModel.findById(req.user.id)
      const order = await Order.find({ user: req.user.id }).populate("menu");
      console.log(order)
      const cart = await Cart.find({ user: req.user.id });
      res.render("user/layouts/profile", {
        title: "profile",
        logUser: req.user,
        data:data,
        orderdata:order,
        pending:order.filter((order) => order.orderStatus === "Pending"),
        confirmed:order.filter((order) => order.orderStatus === "Confirmed"),
        canceled:order.filter((order) => order.orderStatus === "Cancelled"),
        cartdata:cart,
        totalSpendings: order.reduce((acc, order) => acc + (order.menu.price * order.quantity), 0),
      });
    } catch (error) {
      console.log(error);
    }
  };
  orders = async (req, res) => {
    try {
      const orders = await Order.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(req.user.id), 
            }
        },
        
        {
          $lookup: {
            from: "menus",
            localField: "menu",
            foreignField: "_id",
            as: "menuData",
          },
        },
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurant",
            foreignField: "_id",
            as: "restaurantData",
          },
        },
      ]); 
      console.log(orders)
      // return res.json({orders})
      res.render("user/layouts/order", {
        title: "orders",
        logUser: req.user,
        orderData: orders
      });
    } catch (error) {
      console.log(error);
    }
  };
  editProfile = async (req, res) => {
    try {
      const data=await userModel.findById(req.user.id)
      res.render("user/layouts/EditProfile", {
        title: "editProfile",
        logUser: req.user,
        data
      });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = new UserViewController();
