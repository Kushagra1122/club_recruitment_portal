const announcements = require("../models/announcements");
const club = require("../models/club");
const round = require("../models/round");
const sig = require("../models/sig");
const user = require("../models/user");

const create=async(req,res)=>{
    const{email,desc,name,exclusive}=req.body
   
    const User = await user.findOne({ email });
    if(!User){
        res.status(400).json({
message:"Email doesn't exist"
        })
    }
    else{
     await club.create({
            name,
            contact:email,
            description: desc,
            convenor:req.params.id,
            exclusive:exclusive==="yes"?true:false,
            

        });
       
    }
    return res.status(200).json({
        message:"Request sent"
    })
}
const req=async(req,res)=>{
    try {
        let arr=[]
        const clubs=await club.find()
      for (let i = 0; i < clubs.length; i++) {
  
          if (clubs[i].accepted !== true) {

              arr.push(clubs[i])

          }

      }
       
            return res.status(200).json({
                arr
           
        
            })
       
    } catch (error) {
        
    }
}
const accept=async(req,res)=>{
    try {
        const Club = await club.findById(req.params.id)
        let arr=Club.members
        arr.push(Club.convenor)
     await club.findByIdAndUpdate(
        req.params.id,
        {accepted:true,members:arr}, 
        {new:true}
    )
        
     await user.findByIdAndUpdate(Club.convenor.toHexString(), { role: 'Convenor',club:Club._id},{new:true})

  
return res.status(200).json({
    success:true,
    Club,
    })
    } catch (error) {
        
    }
}
const reject = async (req, res) => {
    try {

        const Club = await club.findByIdAndDelete(req.params.id)
       
        return res.status(200).json({
            success: true
        })
    } catch (error) {

    }
}
const dlt=async(req,res)=>{
    try {
        const Club = await club.findByIdAndDelete(req.params.id)
        console.log(Club.convenor)
       const User= await user.findByIdAndUpdate(Club.convenor, { role: 'Sudent' ,club:null}, { new: true })
       console.log(User)
        let arr =Club.sig
        for (let i = 0; i < arr.length; i++) {
           const Sig=await sig.findById(arr[i])
           const arr2= Sig.rounds
            const a = await announcements.find({ sig: Sig })

            for (let i = 0; i < a.length; i++) {
                await announcements.findByIdAndDelete(a[i]._id)

            }
           for (let i = 0; i < arr2.length; i++) {
            await round.findByIdAndDelete(arr2[i])
            
           }
            await sig.findByIdAndDelete(arr[i])
            
        }
        return res.status(200).json({
            message: "Deleted successfully"
        })
    } catch (error) {
        
    }
}
const get=async(req,res)=>{
    try {
        let arr = []
        const clubs = await club.find()
        for (let i = 0; i < clubs.length; i++) {

            if (clubs[i].accepted === true) {

                arr.push(clubs[i])

            }

        }

        return res.status(200).json({
            arr


        })

    } catch (error) {

    }
}
const getClub=async(req,res)=>{
    try {
        const Club=await club.find({convenor:req.params.id})
        res.status(200).json(
            Club
        )
    } catch (error) {
        
    }
}


const startdate=async(req,res)=>{
    try {
        
        const {startDate}=req.body

     await club.findByIdAndUpdate(req.params.id, { Start:startDate },{new:true})
       
        return res.status(200).json({
            success:true
        })
    } catch (error) {
        
    }
}
const send = async (req, res) => {
    try {
   let arr=[]

      
      const Clubs=await club.find()

        for (let i = 0; i <Clubs.length; i++) {
            if (Clubs[i].exclusive) {
                arr.push(Clubs[i])

            }
            else {

            }
            
        }

       
       
    
      
       console.log(arr)
        return res.status(200).json(
            arr
        )

    } catch (error) {

    }
}
const sendsig = async (req, res) => {
    try {
        let arr = []

        const User = await user.findById(req.params.id)
    
        for (let i = 0; i < User.registered.length; i++) {

            const Sigs = await sig.findById(User.registered[i].sig)
         
            if(Sigs.club==req.body.id){
              
                arr.push(Sigs)
            }
              
          
        }
    


        return res.status(200).json(
            arr
        )

    } catch (error) {

    }
}
module.exports={create,req,accept,reject,get,getClub,startdate,dlt,send,sendsig}