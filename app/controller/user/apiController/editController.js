const userModel = require("../../../models/userModel")


class editProfileController{

    editprofile=async(req,res)=>{
        try{
          
           const {name,phone}=req.body

           const updatedata=await userModel.findByIdAndUpdate(req.user.id,{
            name,
            phone
           },{new:true})

           console.log(updatedata);
      
           res.redirect('/profile')
        //   return res.status(200).send({
        //     status:true,
        //     message:'successfully updated',
        //     updatedata
        //  })
        
    }catch(err){
    return res.status(500).send({
        status:false,
        message:'error occured'
     })
    }

}

}

module.exports=new editProfileController()