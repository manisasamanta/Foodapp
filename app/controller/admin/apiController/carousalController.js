const carousalModel = require("../../../models/carousalModel");
const { carousalSchema } = require("../../../helper/validationSchema");
class CarousalController {
    addCarousal = async (req, res) => {
        try {
            const { title, description } = req.body;
            const { error } = carousalSchema.validate(req.body);
            if (error) {
                req.flash("error", error.details[0].message);
                return res.redirect("/admin");
            }
            const carousal = new carousalModel({
                title,
                description
            })
            await carousal.save()
            return res.redirect("/admin/carousal");
        } catch (error) {
            return res.status(500).json({
                success: false, 
                message: error.message
            })
        }
    }
}

module.exports = new CarousalController()