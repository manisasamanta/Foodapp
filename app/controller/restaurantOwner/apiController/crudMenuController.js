const menuModel = require("../../../models/menuItemModel");
const categoryModel = require("../../../models/categoryModel");
const fs = require("fs")
class CRUDMenuController {
    createMenu = async (req, res) => {
        try{
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
                image: `${req.protocol}://${req.get('host')}/uploads/${image}`,
            })
            await menu.save()
            return res.status(200).json({
                success: true,
                message: "Menu created successfully"
            })  
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