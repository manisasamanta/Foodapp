const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    openingTime: {
        type: String
    },
    closingTime: {
        type: String
    },
    cuisine: {
        type: String, //eg: "Italian", "Indian"
    },
    image: {
        type: String
    },
    menu:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
        }
    ],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model("Restaurant", restaurantSchema)