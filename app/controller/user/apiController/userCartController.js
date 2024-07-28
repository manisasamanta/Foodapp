const AddToCart = require("../../../models/addToCartModel");
const Menu = require("../../../models/menuItemModel");
class CartController {
    addCart = async (req, res) => {
        try {
            if(!req.user) {
                return res.redirect('/login');
            }
            const {id} = req.user
            const {menu} = req.query
            const cart = await AddToCart.findOne({user: id});
            const existedMenu = await Menu.findOne({_id: menu});
            if(!existedMenu) {
                return res.status(404).json({
                    success: false,
                    message: 'Menu not found',
                });
            }
            if(cart) {
                const index = cart.cart.findIndex((item) => item.menu == menu);
                if(index > -1) {
                    cart.cart[index].count = cart.cart[index].count + 1
                } else {
                    cart.cart.push({menu, count: 1});
                }
                await cart.save();
            }else{
                const newCart = new AddToCart({
                    user: id,
                    cart: [{menu, count: 1}],
                });
                await newCart.save();
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
}

module.exports = new CartController()