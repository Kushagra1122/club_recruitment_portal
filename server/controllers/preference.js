
const preference = require("../models/preference")

const released=async(req,res)=>{
    try {
    
             await preference.create({
                released: true,
                type:'Club'
            
            })
            return res.status(200).json({
                success:true
            }
                
            )
    } catch (error) {
        
    }
}
const checkClub = async (req, res) => {
    try {

      const prefer=await preference.find()
  
      for (let i = 0; i < prefer.length; i++) {
       
          if ((prefer[i].type === "Club") && (prefer[i].released)) {
              return res.status(200).json({ released: true })
          }
          else{
              return res.status(400).json({ released: false })
          }
      }
    
   
    } catch (error) {

    }
}
module.exports = {released,checkClub}