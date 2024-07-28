const restaurantModel = require("../../models/restaurantModel");
const categoryModel = require("../../models/categoryModel");
const menuItemModel = require("../../models/menuItemModel");
const blogModel = require("../../models/blogModel");
const reviewModel = require("../../models/reviewModel");
class RestaurantOwnerViewController {
  login = async (req, res) => {
    try {
      return res.render("restaurantOwner/layouts/userLogin", {
        title: "login",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  dashboard = async (req, res) => {
    res.render("restaurantOwner/layouts/RestaurantDashboard", {
      title: "Restaurant dashboard",
      logUser: req.user,
    });
  };
  addRestaurant = async (req, res) => {
    res.render("restaurantOwner/layouts/AddRestaurant", {
      title: "Add restaurant Form",
      logUser: req.user,
    });
  };

  getCategories = async (req, res) => {
    try{
        const restaurant = await restaurantModel.findOne({owner: req.user.id})
        if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
        const thisCategories = await categoryModel.find({restaurant: restaurant._id})
        const othersCategories = await categoryModel.find({restaurant: {$ne: restaurant._id}})
        return res.render("restaurantOwner/layouts/Category", {
            title: "Restaurant Category",
            logUser: req.user,
            categories_this: thisCategories, // categories created by this restaurant. // 1st table show this data
            categories_all: othersCategories // all categories by other restaurants. // 2nd table show this data
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
  menu = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("restaurantOwner/layouts/Menu", {
      title: "Restaurant dashboard",
      logUser: req.user
    });
  };

  addMenu = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("admin/layouts/AddMenu", {
      title: "Add restaurant Form",
      logUser: req.user,
    });
  };
  
  review = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("restaurantOwner/layouts/Reviews", {
      title: "Restaurant dashboard",
      logUser: req.user
    });
  };

  booking = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("restaurantOwner/layouts/Booking", {
      title: "Booking",
      logUser: req.user
    });
  };
  updateBooking = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("restaurantOwner/layouts/UpdateBooking", {
      title: "Update Booking",
      logUser: req.user
    });
  }
  order = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("restaurantOwner/layouts/Order", {
      title: "Order",
      logUser: req.user
    });
  }
  updateOrder = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("restaurantOwner/layouts/UpdateOrder", {
      title: "Update Order",
      logUser: req.user
    });
  }
  blog = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("restaurantOwner/layouts/Blog", {
      title: "Restaurant dashboard",
      logUser: req.user
    });
  };
  blogAdd = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("restaurantOwner/layouts/BlogAdd", {
      title: "Restaurant dashboard",
      logUser: req.user
    });
  };

}

module.exports = new RestaurantOwnerViewController();
