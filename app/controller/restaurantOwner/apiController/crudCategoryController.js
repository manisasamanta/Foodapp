const categoryModel = require("../../../models/categoryModel")
const restaurantModel = require("../../../models/restaurantModel")
class CRUDCategoryController {
    createCategory = async (req, res) => {
        try{
            const restaurant = await restaurantModel.findOne({owner: req.user.id})
            if(!restaurant){
                req.flash("error", "Please create restaurant first") 
                return res.redirect("/restaurantOwner/restaurant/add")
            }
            const {name} = req.body
            if(!name){
                req.flash("error", "Category Name is required")
                return res.redirect("/restaurantOwner/category/add")
            }
            const existingcategory = await categoryModel.findOne({name})
            if(existingcategory){
                req.flash("error", "Category already exists")
                return res.redirect("/restaurantOwner/category/add")
            }
            const category = new categoryModel({
                name,
                restaurant: restaurant._id
            })
            await category.save()
            return res.redirect("/restaurantOwner/category")
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    } 

    

    
}

module.exports = new CRUDCategoryController()