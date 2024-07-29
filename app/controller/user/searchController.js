const menu= require("../../models/menuItemModel")
class SearchController{
    menuSearch = async (req, res) => {
        try {
            const search = req.query.query
            return res.redirect('/menu?query=' + search)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}
module.exports = new SearchController()