const mongoose= require("mongoose");

const carousalSchema = new mongoose.Schema({
    title: {
        type: String    
    },
    description: {
        type: String
    },
})
module.exports = mongoose.model("carousal", carousalSchema)