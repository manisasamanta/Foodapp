const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    time: { 
        type: String,
    },
    persons: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    bookingStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending"
    },
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model("Booking", bookingSchema)