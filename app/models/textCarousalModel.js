const mongoose = require("mongoose");
const textCarousalSchema = new mongoose.Schema({
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
module.exports = mongoose.model("TextCarousal", textCarousalSchema)