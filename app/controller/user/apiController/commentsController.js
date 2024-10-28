const blogModel = require("../../../models/blogModel");
const blogCommentModel = require("../../../models/blogCommentModel");
class BlogController {
    addComment = async (req, res) => {
        try {
            const { blogId } = req.query;
            const { comment } = req.body;
            if (!comment) {
                return res.status(400).json({
                    success: false,
                    message: "Comment is required",
                });
            }
            const blog = await blogModel.findOne({ _id: blogId });
            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: "Blog not found",
                });
            }
            const newComment = new blogCommentModel({
                comment,
                user: req.user.id,
                blog: blogId,
            });
            await newComment.save();
            return res.redirect(`/blog/${blogId}`);
            // return res.status(200).json({
            //     success: true,
            //     message: "Comment added successfully",
            // });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    };
}

module.exports = new BlogController();