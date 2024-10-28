const mongoose = require("mongoose");
const blogCommentSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model("BlogComment", blogCommentSchema)