
const orderModel = require("../../models/orderModel");
const restaurantModel = require("../../models/restaurantModel");
const reviewModel = require("../../models/reviewModel");
const userModel = require("../../models/userModel");
const carousalModel = require('../../models/carousalModel');

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

      const totalUser = await userModel.find({ role: { $nin: ['admin', 'restaurantOwner'] } });
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
    try{

      const data=await userModel.find({role:{$eq:'user'}})
      const resownerdata=await userModel.find({role:{$eq:'restaurantOwner'}})
      res.render("admin/layouts/Alluser", {
        title: "All User",
        logUser: req.user,
        data:data,
        resdata:resownerdata,
        i:1,
        j:1
  
      });
    }catch(err){
      req.flash("error", "Error Occured")
    }

  };

   editrestaurantForm=async(req,res)=>{
    const id=req.params.id
    const eduser=await restaurantModel.findById(id)
    console.log();

    if(eduser){
      res.render('admin/layouts/editRestaurant',{
        title:'restaurant edit',
        logUser: req.user,
        e:eduser
  
      })
    }
 
   }

   carousaldata=async(req,res)=>{
    try{
      const data=await carousalModel.find()
      console.log(data);

      res.render('admin/layouts/AllCarousal',{
        title:'home page',
        data:data,
        logUser: req.user
        
      })

    }catch(err){
console.log(err);
    }
   }


   carousalForm=async(req,res)=>{
    res.render('admin/layouts/Addcarousal',{
      title:'add carousal page',
      logUser: req.user
    })
   }


   editCarousalForm=async(req,res)=>{
    const id=req.params.id
    const eduser=await carousalModel.findById(id)
   

    if(eduser){
      res.render('admin/layouts/EditCarousal',{
        title:'restaurant edit',
        logUser: req.user,
        e:eduser
  
      })
    }
 
   }


}

module.exports = new AdminViewController();
