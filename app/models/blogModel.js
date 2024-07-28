const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
});
module.exports = mongoose.model("Blog", blogSchema)