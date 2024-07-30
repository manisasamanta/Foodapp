const carousalModel = require('../../../models/carousalModel');
const carousalSchema=require('../../../models/carousalModel')

class CarousalController {
    addCarousal = async (req, res) => {
        try {
            const { title, description } = req.body;
            console.log(req.body);
            const { error } = carousalSchema.validate(req.body);
            if (error) {
                req.flash("error", error.details[0].message);
                return res.redirect("/admin");
            }
            const carousal = new carousalModel({
                title,
                description
            });
            await carousal.save();
            res.redirect('/admin/all/acrousal')

            console.log("ghs",carousal);
        } catch (error) {
            return res.status(500).json({
                success: false, 
                message: error.message
            });
        }
    }


    deleteCarousal=async(req,res)=>{
        try{

            const id=req.params.id

            const delcar=await carousalModel.findByIdAndDelete(id)

            if(!delcar){
                console.log('cant delete carousal ');
            }

            res.redirect('/admin/all/acrousal')

        }catch(err){
            console.log(err);
        }
    }

    updateCarousal=async(req,res)=>{
        try{
            const id=req.params.id
               const {title,description}=req.body
            const updatedata=await carousalModel.findByIdAndUpdate(id,{
                 title,
                 description
            },{new:true})

            res.redirect('/admin/all/acrousal')

        }catch(err){
            console.log(err);
        }
    }
}


module.exports = new CarousalController()