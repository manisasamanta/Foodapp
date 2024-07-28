const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
    },
    rewiew: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model("Review", reviewSchema)