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
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { error } = loginSchema.validate(req.body);
      if (error) {
        req.flash("error", error.details[0].message);
        return res.redirect("/admin");
      }

      const user = await User.findOne({ email });
      if (!user) {
        req.flash("error", "User does not exist");
        return res.redirect("/admin");
      }
      console.log(user.role);
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        req.flash("error", "Incorrect password");
        return res.redirect("/admin");
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
    //   if user is verified with proper credentials generate jwt token and redirect to role specific dashboard
      const token = generateJWTToken(user._id, user.name, user.email, user.role);
      res.cookie("X-ACCESS-TOKEN", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
      })
      if(user.role === "admin"){
        return res.redirect("/admin/dashboard");
      }
      else return res.render("error/forbidden403", { message: "Only admin can access this page." });
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
      return res.redirect("/admin");
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
