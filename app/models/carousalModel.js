const mongoose = require("mongoose");
const CarousalSchema = new mongoose.Schema({
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
module.exports = mongoose.model("Carousal", CarousalSchema)