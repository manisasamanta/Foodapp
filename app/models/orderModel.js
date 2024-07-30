const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    }, 
    menu : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
    },
    quantity: {
        type: Number,
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending"  // default value
        }   
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model("Order", orderSchema)