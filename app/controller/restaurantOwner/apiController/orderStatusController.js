const orderModel = require("../../../models/orderModel");
const mailer = require("../../../helper/mailer")



class orderStatusController{

    updateOrderStatus = async (req, res) => {
        try {
            const { orderStatus, id , email} = req.params;
            console.log(email)
            if (orderStatus !== 'Confirmed' && orderStatus !== 'Cancelled') {
                return res.status(400).send('Invalid status');
            }
    
            // Update the order status
            await orderModel.findByIdAndUpdate(
                id,
                { orderStatus: orderStatus }, // Update status to 'Confirmed' or 'Cancelled'
                { new: true } // Return the updated document
            );
            const order=await orderModel.findById(id).populate(['user','menu'])
            if (orderStatus === 'Confirmed'){
                mailer({email:email, subject:"Order Confirmed", text:`Hello ${order.user.name}, your order of ${order.menu.name} with quantity ${order.quantity} has been confirmed and will be delivered soon`})
            }

            if (orderStatus === 'Cancelled'){
                mailer({email:email, subject:"Order Cancelled", text:`Hello ${order.user.name}, We regret to inform you that your order of ${order.menu.name} with quantity ${order.quantity} has been cancelled and will not be delivered. We will refund you the amount paid for this order within next 48 hr.`})
            }

            res.redirect('/restaurantOwner/order');
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).send('Internal Server Error');
        }
    };

}

module.exports = new orderStatusController()
