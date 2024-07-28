const orderModel = require("../../models/orderModel");
const restaurantModel = require("../../models/restaurantModel");
const userModel = require("../../models/userModel");

class AdminViewController {
  login = async (req, res) => {
    try {
      return res.render("admin/layouts/userLogin", {
        title: "login",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  admindashboard = async (req, res) => {
    try{    

      const totalUser=await userModel.find({role:{$ne:'admin'}})
      const totalOrder=await orderModel.find()
      const totalrestaurant=await restaurantModel.find()

      if(!(totalUser && totalOrder && totalrestaurant)){
        req.flash("error", "user && order not Found")
      }

      res.render("admin/layouts/dashboard", {
        title: "Dashboard",
        logUser: req.user,
        Users:totalUser.length,
        orders:totalOrder.length,
        restaurants:totalrestaurant.length

      });

    }catch(err){
      req.flash("error", "Error Occured")
    }

  };

  allReviews = async (req, res) => {
    res.render("admin/layouts/AllReview", {
      title: "All reviews",
      logUser: req.user
    });
  };

  allRestaurant = async (req, res) => {
    res.render("admin/layouts/AllRestaurant", {
      title: "All Restaurant",
      logUser: req.user,
    });
  };




}

module.exports = new AdminViewController();
