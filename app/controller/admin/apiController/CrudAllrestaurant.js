const { default: mongoose } = require("mongoose");
const restaurantModel = require("../../../models/restaurantModel")


class crudrestaurantController{

    updateRestaurant=async(req,res)=>{
        try {
            const { ObjectId } = req.params;
    
            // Validate if id is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(ObjectId)) {
                console.log('Invalid ID format:', ObjectId);
                req.flash("error", "Invalid restaurant ID format");
                return res.redirect('/admin/restaurant');
            }
    
            console.log("Request Params:", req.params);
    
            // Destructure request body
            const { name, description, address, openingTime, closingTime } = req.body;
    
            // Find and update the restaurant
            const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
                ObjectId,
                { name, description, address, openingTime, closingTime },
                { new: true, runValidators: true } // Return the updated document and run validators
            );
    
            // If the restaurant was not found
            if (!updatedRestaurant) {
                console.log('Restaurant not found for ID:', id);
                req.flash("error", "Restaurant not found");
                return res.redirect('/admin/restaurant');
            }
    
            // Redirect to the admin restaurant page after a successful update
            res.redirect('/admin/restaurant');
        } catch (err) {
            // Log the error and flash an error message
            console.error('Error updating restaurant:', err);
            req.flash("error", "An error occurred while updating the restaurant");
            res.status(500).send(err.message);
        }
    }    

}

module.exports=new crudrestaurantController()
