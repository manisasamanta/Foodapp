const categoryModel = require("../../../models/categoryModel")
const restaurantModel = require("../../../models/restaurantModel")
class CRUDCategoryController {
    createCategory = async (req, res) => {
        try{
            const restaurant = await restaurantModel.findOne({owner: req.user.id})
            if(!restaurant){
                req.flash("error", "Please create restaurant first")
                return res.redirect("/restaurant/create")
            }
            const {name} = req.body
            if(!name){
                req.flash("error", "Category Name is required")
                return res.redirect("/category/create")
            }
            const category = new categoryModel({
                name,
                restaurant: restaurant._id
            })
            await category.save()
            return res.status(200).json({
                success: true,
                message: "Category created successfully"
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = new CRUDCategoryController()