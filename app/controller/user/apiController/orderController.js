const Order = require("../../../models/orderModel");
const Cart = require("../../../models/addToCartModel");
const mongoose = require("mongoose");
class OrderController {
    addOrder = async (req, res) => {
        try {
            if(!req.user || !req.query.menu || !req.query.count || !req.query.restaurant) {
                return res.redirect('/cart');
            }
            const order = new Order({
                user: req.user.id,
                menu: req.query.menu,
                restaurant: req.query.restaurant,
                quantity: req.query.count,
                orderStatus: "Pending"
            })
            await order.save()
            await Cart.updateOne(
                { user: (req.user.id) },
                { $pull: { cart: { menu: new mongoose.Types.ObjectId(req.query.menu) } } }
              );
              return res.redirect("/orders")
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}
module.exports = new OrderController()