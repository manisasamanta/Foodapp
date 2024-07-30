const menuModel = require("../../../models/menuItemModel");
const categoryModel = require("../../../models/categoryModel");
const restaurantModel = require("../../../models/restaurantModel");
const fs = require("fs")
class CRUDMenuController {
    createMenu = async (req, res) => { 
        try{
            const restaurant = await restaurantModel.findOne({owner: req.user.id})
            if(!restaurant){
                req.flash("error", "Please create restaurant first")
                return res.redirect("/restaurantOwner/restaurant/add")
            }
            const {name, description, price, category} = req.body
            console.log(req.body)
            if(!name || !description || !price || !category){
                req.flash("error", "Please fill all the fields")
                if(req.file){
                    fs.unlinkSync(`uploads/${req.file.filename}`)
                }
                return res.redirect("/menu/create")
            }
            if(!req.file){
                req.flash("error", "Please upload image")
                return res.redirect("/menu/create")
            }
            const image = req.file?.filename
            const menu = new menuModel({
                name,
                description,
                price,
                category,
                restaurant: restaurant._id,
                image: `${req.protocol}://${req.get('host')}/uploads/${image}`,
            })
            await menu.save()
            restaurant.menu.push(menu._id)
            await restaurant.save()
            return res.redirect("/restaurantOwner/menu")
        }catch(err){
            if(req.file){
                fs.unlinkSync(`uploads/${req.file.filename}`)
            }
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = new CRUDMenuController()