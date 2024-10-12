const club = require("../models/club");
const round = require("../models/round");
const sig = require("../models/sig");
const user = require("../models/user");

const add = async (req, res) => {
    try {


        const { name, desc,Start, contact } = req.body
      
        if (!name || !desc || !Start || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const User=await user.find({email:contact})
      
        if (User && (User[0].club==req.params.id)){
            const Sig = await sig.create({
                name,
                description: desc,
                Start,
                contact,
                sigHead: User._id,
                club:req.params.id,
                students: [User._id]

            });
            const Club = await club.findById(req.params.id)

            arr = Club.sig

            arr.push(Sig._id)

            const CLUBS = await club.findByIdAndUpdate(req.params.id, { sig: arr }, { new: true })
            console.log(CLUBS)
            return res.status(201).json({
                message: "Sig created successfully.",
                success: true
            })
        }

        
        else{
    return res.status(404).json({
        message: "Enter a correct email",
        success: false
    })
        }
     

    }


    catch (error) {

    }
}
const view = async (req, res) => {
    try {
        const Club = await club.findById(req.params.id)
        
        if (Club) {
            return res.status(200).json(
                Club
            )
        }


    } catch (error) {

    }
}
const getSig = async (req, res) => {
    try {
        const Sig = await sig.findById(req.params.id)
        if (Sig) {
            return res.status(200).json(
                Sig
            )
        }

    } catch (error) {

    }
}
const Startrecruitement = async (req, res) => {
    try {

        await sig.findByIdAndUpdate(req.params.id, { recruiting: true }, { new: true })
        res.status(200).json({
            success: true
        }

        )
    } catch (error) {
        console.log(error)
    }
}
// const edit = async (req, res) => {
//     try {
//         await club.findByIdAndUpdate(req.params.id)
//         return res.status(200).json({
//             message: "updated successfully"
//         })
//     } catch (error) {

//     }
// }
const dlt = async (req, res) => {
    try {
       
        const Sig=await sig.findByIdAndDelete(req.params.id)
        const a = await announcements.find({ sig: req.params.id })
        await club.findByIdAndDelete(a._id)
        const Club = await club.findById(Sig.club)

      
        let arr = Club.sig



        const i = arr.indexOf(req.params.id)
        arr.splice(i, 1)
    
         await club.findByIdAndUpdate(Club._id, { sig: arr }, { new: true })
let arr2 =Sig.rounds

for (let i = 0; i < arr2.length; i++) {

 await round.findByIdAndDelete(arr2[i])
    
}
        return res.status(200).json({
            message: "Deleted successfully"
        })
    } catch (error) {

    }
}
const event = async (req, res) => {

    let arr = []
    const sigs = await sig.find()
    for (let i = 0; i < sigs.length; i++) {
        if (sigs[i].recruiting) {
            arr.push(sigs[i])
        }

    }
    return res.status(200).json({
        arr
    })

}
const register=async(req,res)=>{
    try {
      const Sig=await sig.findById(req.params.id)
      let arr=Sig.students
    
          arr.push(req.body.userId) 
      
     
        await sig.findByIdAndUpdate(req.params.id,{students:arr},{new:true})
    
        await round.findByIdAndUpdate(Sig.rounds[0], { students: arr }, { new: true })
        const User=await user.findById(req.body.userId)
        let arr2=User.registered
      
            arr2.push({ club: Sig.club, sig: Sig._id })
            console.log(arr2)
        
        
        await user.findByIdAndUpdate(req.body.userId,{registered:arr2},{new:true})
        res.status(200).json({
            success: true
        })
      
    } catch (error) {
        
    }
}
const getStudents=async(req,res)=>{
try {
    const Sig=await sig.findById(req.params.id)
    res.status(200).json(
       Sig
    )
} catch (error) {
    
}
}
module.exports = { add, view, getSig,Startrecruitement,event,register,getStudents,dlt}