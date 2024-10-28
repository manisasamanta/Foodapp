const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectDb = require("./app/config/dbConnetion");
const truncateHtml = require("truncate-html");
const moment = require("moment");
// import routes
const userApiRoutes = require("./app/routes/user/apiRoutes");
const userViewRoutes = require("./app/routes/user/viewRoutes");
const adminApiRoutes = require("./app/routes/admin/apiRoutes");
const adminViewRoutes = require("./app/routes/admin/viewRoutes");
const restaurantOwnerApiRoutes = require("./app/routes/restaurantOwner/apiRoutes");
const restaurantOwnerViewRoutes = require("./app/routes/restaurantOwner/viewRoutes");
app.use(
  cors({
    origin: "http://localhost:3500",
    credentials: true,
  })
);
dotenv.config();
// connect database
connectDb();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname,'public/user')))
app.use(express.static(path.join(__dirname,'public/admin')))
app.use("/uploads",express.static(path.join(__dirname,'uploads')))
// routes user
app.use("/", userApiRoutes);
app.use("/", userViewRoutes);
// routes admin
app.use("/admin", adminApiRoutes);
app.use("/admin", adminViewRoutes);
// routes restaurant owner
app.use("/partner", restaurantOwnerApiRoutes);
app.use("/restaurantOwner", restaurantOwnerViewRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server started on port " + `http://localhost:${PORT}`);
});
truncateHtml.setup({
  stripTags: true, 
  length: 300
})
app.locals.truncateHtml = truncateHtml
app.locals.moment = moment