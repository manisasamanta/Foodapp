const {
  signUpSchema,
  loginSchema,
} = require("../../../Validation/userValidation");
const User = require("../../../models/userModel");
const Token = require("../../../models/tokenModel");
const Otp = require("../../../models/otpModel");
const {
  hashPassword,
  comparePassword,
  generateJWTToken,
} = require("../../../middleware/auth");
const cryptoTokenGen = require("../../../helper/cryptoTokenGen");
const otpGenerator = require("../../../helper/otpGen");
const sendEmail = require("../../../helper/mailer");
class UserController {
  signUp = async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;
      // console.log(req.body);
      const { error } = signUpSchema.validate(req.body, { abortEarly: false });
      if (error) {
        req.flash("error", error.message);
        return res.json("my error", error.message);
        // return res.redirect("/signup");
      }

      const user = await User.findOne({ email });
      if (user) {
        req.flash("error", "User already exists");
        return res.json("User already exists");
      }
      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        name,
        phone,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      // set manual token with crypto
      const token = cryptoTokenGen();
      await new Token({
        email,
        token,
        verifyLink: `${req.protocol}://${req.get(
          "host"
        )}/verify?token=${token}`,
      }).save();
      // generate OTP
      const otpGenerated = otpGenerator({ alphanumaric: false });
      await new Otp({
        email,
        otp: otpGenerated,
      }).save();
      // send OTP to email with nodemailer
      await sendEmail({
        email,
        subject: "Verify Email",
        text: `Your OTP is ${otpGenerated}`,
      });
      return res.redirect(`/verify?token=${token}`); // redirect to verifyEmail page with query params (token);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  verifyEmail = async (req, res) => {
    try {
      const { token } = req.query;
      const { otp } = req.body;
      // console.log(otp);
      if (!token) {
        req.flash("error", "No token provided");
        return res.json("No token provided");
      }
      if (!otp) {
        req.flash("error", "No OTP provided");
        return res.json("No OTP provided");
      }
      const userToken = await Token.findOne({ token });
      if (!userToken) {
        req.flash("error", "Invalid token");
        return res.json("Invalid token");
      }
      const user = await User.findOne({ email: userToken.email });
      if (!user) {
        req.flash("error", "User does not exist");
        return res.json("User does not exist");
      }

      const existedOtp = await Otp.findOne({otp});
      // console.log(existedOtp)
      // check if OTP is expired, if yes, generate new OTP and send it to user's email
      if (!existedOtp) {  
        const otpGenerated = otpGenerator({ alphanumaric: false });
        await new Otp({
          email: userToken.email,
          otp: otpGenerated,
        }).save();
        await sendEmail({
          email: userToken.email,
          subject: "Verify Email",
          text: `Your New OTP is ${otpGenerated}`,
        });
        req.flash("error", "Invalid OTP, New OTP has been sent");
        return res.json("Invalid OTP, New OTP has been sent");
      }
      user.isVerified = true;
      await user.save();
      await userToken.deleteOne({ token });
      await Otp.deleteMany({ email: userToken.email });
      if(user.role === "restaurantOwner"){
        return res.redirect("/restaurantOwner");
      }
      if(user.role === "admin"){
        return res.redirect("/admin");
      }
      return res.redirect("/login");
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { error } = loginSchema.validate(req.body, { abortEarly: false });
      if (error) {
        req.flash("error", error.details[0].message);
        return res.redirect("/login");
      }

      const user = await User.findOne({ email });
      if (!user) {
        req.flash("error", "User does not exist");
        return res.redirect("/login");
      }
      if(user.role==="admin" || user.role==="restaurantOwner"){
        req.flash("error", "Admins and Restaurant Owners are not allowed to login from this page");
        return res.redirect("/login");
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        req.flash("error", "Incorrect password");
        return res.redirect("/login");
      }

      // if user email is not verified send otp to email with nodemailer and redirect to verifyEmail page
      if(!user.isVerified){
        // generate OTP
        await Otp.findOneAndDelete({ email });
        const otpGenerated = otpGenerator({ alphanumaric: false });
        await new Otp({
        email,
        otp: otpGenerated,
      }).save();
      // send OTP to email with nodemailer
      await sendEmail({
        email,
        subject: "Verify Email",
        text: `Your New OTP is ${otpGenerated}`,
      });
      const token = await Token.findOne({ email });
        return res.redirect(`/verify?token=${token.token}`);
      }
    // else if user is verified with proper credentials generate jwt token and redirect to role specific dashboard
      const token = generateJWTToken(user._id, user.name, user.email, user.role);
      res.cookie("X-ACCESS-TOKEN", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
      })
      if(user.role === "restaurantOwner"){
        return res.redirect("/restaurantOwner/dashboard");
      }
      if(user.role === "admin"){
        return res.redirect("/admin/dashboard");
      }
      return res.redirect("/");
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  logout = async (req, res) => {
    try {
      res.clearCookie("X-ACCESS-TOKEN");
      return res.redirect("/");
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  restaurantOwnerSignup = async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;
      console.log(req.body);
      const { error } = signUpSchema.validate(req.body, { abortEarly: false });
      if (error) {
        req.flash("error", error.message);
        return res.json("my error", error.message);
        // return res.redirect("/signup");
      }

      const user = await User.findOne({ email });
      if (user) {
        req.flash("error", "User already exists");
        return res.json("User already exists");
      }
      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        name,
        phone,
        email,
        password: hashedPassword,
        role: "restaurantOwner",
      });
      await newUser.save();
      // set manual token with crypto
      const token = cryptoTokenGen();
      await new Token({
        email,
        token,
        verifyLink: `${req.protocol}://${req.get(
          "host"
        )}/verify?token=${token}`,
      }).save();
      // generate OTP
      const otpGenerated = otpGenerator({ alphanumaric: false });
      await new Otp({
        email,
        otp: otpGenerated,
      }).save();
      // send OTP to email with nodemailer
      await sendEmail({
        email,
        subject: "Verify Email",
        text: `Your OTP is ${otpGenerated}`,
      });
      return res.redirect(`/verify?token=${token}`); // redirect to verifyEmail page with query params (token);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = new UserController();
