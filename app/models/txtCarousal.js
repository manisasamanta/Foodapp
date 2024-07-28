const mongoose = require("mongoose");
const txtCarousalSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model("TxtCarousal", txtCarousalSchema)

// carousal can only be added by admin