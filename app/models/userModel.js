const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: Number,
    },
    email: {    
        type: String,   
    },
    password:{
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "restaurantOwner", "user"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},{
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model("User", userSchema)