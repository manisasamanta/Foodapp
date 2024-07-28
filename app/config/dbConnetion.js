const mongoose = require("mongoose");
const connectDb= async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error", error.message);
  }
};
module.exports=connectDb