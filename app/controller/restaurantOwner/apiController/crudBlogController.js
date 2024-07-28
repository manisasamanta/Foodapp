const blogModel = require("../../../models/blogModel")

class CRUDBlogController {
    createBlog = async (req, res) => {
        try{
            console.log(req.body)
            const {name, content} = req.body
            if(!req.file){
              return res.status(400).json({
                success: false,
                message: "Please upload image"
              }) 
            }
            const image = req.file?.filename
            const blog = new blogModel({
                name,
                content,
                image: `${req.protocol}://${req.get('host')}/uploads/${image}`
            })
            await blog.save()
            return res.status(200).json({
                success: true,
                message: "Blog created successfully"
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
}
}
module.exports = new CRUDBlogController()