const orderModel = require("../../models/orderModel");
const restaurantModel = require("../../models/restaurantModel");
const reviewModel = require("../../models/reviewModel");
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
    try{
        const user=req.params.user
      const allreview=await reviewModel.findById(user)

      res.render("admin/layouts/AllReview", {
        title: "All reviews",
        logUser: req.user,
       reviews:allreview
      });

    }catch(err){
      req.flash("error", "Error Occured")
    }
  
  };

  allRestaurant = async (req, res) => {
    try{   

      const allrest=await restaurantModel.find()

      res.render("admin/layouts/AllRestaurant", {
        title: "All Restaurant",
        logUser: req.user,
        data:allrest
       
      });

    }catch(err){
      req.flash("error", "Error Occured")
    }

  };
   

  Alluser = async (req, res) => {
    res.render("admin/layouts/AllRestaurant", {
      title: "All Restaurant",
      logUser: req.user,
    });
  };
  



}

module.exports = new AdminViewController();
