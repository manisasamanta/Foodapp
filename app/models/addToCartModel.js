const mongoose = require("mongoose");
const addToCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    cart: [
        {
            menu:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Menu",
            },
            count: Number
        }
    ],
},{timestamps: true, versionKey: false});
module.exports = mongoose.model("AddToCart", addToCartSchema)