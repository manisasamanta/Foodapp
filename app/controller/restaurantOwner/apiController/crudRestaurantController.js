const restaurantModel = require("../../../models/restaurantModel")
// const User = require("../../../models/userModel");
const fs = require("fs")
class CRUDRestaurantController {
    createRestaurant = async (req, res) => {
        try{
            console.log(req.body)
            const {name, address, description, email, phone, openingTime, closingTime, cuisine} = req.body
            if(!name || !address || !description || !email || !phone || !openingTime || !closingTime || !cuisine){
                // console.log("here")
                req.flash("error", "Please fill all the fields")
                if(req.file){
                    fs.unlinkSync(`uploads/${req.file.filename}`)
                }
                return res.redirect("/restaurantOwner/restaurant/add")
            }
            if(!req.file){
                console.log("here")
                req.flash("error", "Please upload image")
                return res.redirect("/restaurantOwner/restaurant/add")
            }
            const image = req.file?.filename
            const restaurant = new restaurantModel({
                name,
                address,
                phone,
                email,
                description,
                openingTime,
                closingTime,
                cuisine,
                image: `${req.protocol}://${req.get('host')}/uploads/${image}`,
                owner: req.user.id
            })
            await restaurant.save()
            return res.redirect("/restaurantOwner/dashboard")
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

module.exports = new CRUDRestaurantController()