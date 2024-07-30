const orderModel = require("../../../models/orderModel");
const mailer = require("../../../helper/mailer")



class orderStatusController{

    updateOrderStatus = async (req, res) => {
        try {
            const { orderStatus, id ,email} = req.params;
    
            if (orderStatus !== 'Confirmed' && orderStatus !== 'Cancelled') {
                return res.status(400).send('Invalid status');
            }
    
            // Update the order status
            const updatedOrder = await orderModel.findByIdAndUpdate(
                id,
                { orderStatus: orderStatus }, // Update status to 'Confirmed' or 'Cancelled'
                { new: true } // Return the updated document
            );
    
            if (orderStatus === 'Confirmed'){
                mailer(email,"order confirmed","order has been confirmed")
            }

            if (orderStatus === 'Canceled'){
                mailer(email,"order canceled","order has been canceled")
            }

            res.redirect('/restaurantOwner/order');
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).send('Internal Server Error');
        }
    };

}

module.exports = new orderStatusController()
