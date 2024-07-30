const restaurantModel = require("../../models/restaurantModel");
const categoryModel = require("../../models/categoryModel");
const menuItemModel = require("../../models/menuItemModel");
const blogModel = require("../../models/blogModel");
const reviewModel = require("../../models/reviewModel");
const orderModel = require("../../models/orderModel");
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
//categories --------------

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
            categories_all: othersCategories ,// all categories by other restaurants. // 2nd table show this data
            i:0,
            j:0
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

 deleteCategory = async (req, res) => {
  try {
      const id = req.params.id;

      // Find and delete the category
      const category = await categoryModel.findById({_id:id});
      console.log('kk',category);
      // Check if the category is associated with the restaurant
      const restaurant = await restaurantModel.findOne({ owner: req.user.id });

      // Remove the category
      await category.remove();

      req.flash("success", "Category deleted successfully.");
      return res.redirect("/restaurantOwner/category");
  } catch (err) {
      return res.status(500).json({
          success: false,
          message: err.message
      });
  }
};



addCategory = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    res.render("restaurantOwner/layouts/AddCategory", {
      title: "Add restaurant Form",
      logUser: req.user,

    });
}

//menu-----------------------------------

  menu = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")

      const menu = await menuItemModel.find().populate('category')

    res.render("restaurantOwner/layouts/Menu", {
      title: "Restaurant dashboard",
      logUser: req.user,
      mdata : menu,
      i:0
    });
  };

  addMenu = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")
    const categories = await categoryModel.find()
    if(categories.length == 0){ 
      req.flash("error_msg", "Please add category first")
      return res.redirect("/restaurantOwner/category/add")
    }
    res.render("restaurantOwner/layouts/AddMenu", {
      title: "Add restaurant Form",
      logUser: req.user
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

  //order ---------------------------------

  
  order = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")

    const order = await orderModel.find().populate('user','menu')
    res.render("restaurantOwner/layouts/Order", {
      title: "Order",
      logUser: req.user,
      odata : order,
      i:0
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

  // blog --------------------------------------------------------

  blog = async (req, res) => {
    const restaurant = await restaurantModel.findOne({owner: req.user.id})
    if(!restaurant) return res.redirect("/restaurantOwner/restaurant/add")

      const Blog = await blogModel.find()
    res.render("restaurantOwner/layouts/Blog", {
      title: "Restaurant dashboard",
      logUser: req.user,
      bdata:Blog
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
