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
    res.render("admin/layouts/dashboard", {
      title: "Dashboard",
      logUser: req.user,
    });
  };

  allReviews = async (req, res) => {
    res.render("admin/layouts/AllReview", {
      title: "All reviews",
      logUser: req.user,
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
