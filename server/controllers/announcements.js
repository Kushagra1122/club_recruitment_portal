const announcements = require("../models/announcements")
const club = require("../models/club")
const sig = require("../models/sig")


const add=async(req,res)=>{
    try {
      
       
        const{name,role,announcement,id,date,prefer,club}=req.body
        console.log(name, role, announcement, id, date, prefer, club)
      
     if(prefer==="Recruitment"){
            await announcements.create({
                announcement: null,
                sig: id,
                name,
                role,
                date,
                type: "Recruitment",
                club:null


            })
         await sig.findByIdAndUpdate(id, { recruiting: true }, { new: true })
         return res.status(200).json({
             success: true
         })


        }
     else if (prefer === "Allot") {
         const a = await announcements.create({
             announcement,
             sig: null,
             name,
             role,
             date: null,
             type: "Allot",
             club: null



         })
         return res.status(200).json({
             success: true
         })
     }
        else if (prefer==="Club"){
            const a = await announcements.create({
                announcement,
                sig: null ,
                name,
                role,
                date: null,
                type:  "Club" ,
                club:null



            })
         return res.status(200).json({
             success: true
         })
        }
        else if(prefer==="Sig"){
            const a=await announcements.create({
                announcement,
                sig:null,
                name,
                role,
                date:null,
               type:"Sig",
               club
          


            })
         return res.status(200).json({
             success: true
         })
        }
     else {
         const a = await announcements.create({
             announcement,
             sig: id === "" ? null : id,
             name,
             role,
             date: null,
             type: "Message",
             club: null



         })
         return res.status(200).json({
             success: true
         })
     }
           
    } catch (error) {
        
    }
}
const send = async (req, res) => {
    try {
        let arr=[]
       
        const announcement = await announcements.find().sort({ createdAt: -1 }).limit(10)
    

for (let i = 0; i< announcement.length; i++) {
    if (announcement[i].type === "Club"){
        const arr2 = {
            msg: announcement[i].announcement,
            sig: "",
            name: announcement[i].name,
            role: announcement[i].role,
            type: announcement[i].type,
        }
        arr.push(arr2)
    }
    else if(announcement[i].type==="Sig"){
        const Club = await club.findById(announcement[i].club)
        const arr2 = {
            msg: announcement[i].announcement,
            sig: "",
            name: announcement[i].name,
            role: announcement[i].role,
            type: announcement[i].type,
            clubid:announcement[i].club,
            club:Club.name
        }
        arr.push(arr2)
    }
    else if (announcement[i].type === "Recruitment"){
        const Sig = await sig.findById(announcement[i].sig)
  
        const Club = await club.findById(Sig.club)
      
       
       
        const arr2 = {
            msg: announcement[i].announcement,
            sig: Sig.name,
            club: Club.name,
            name: announcement[i].name,
            role: announcement[i].role,
            type:announcement[i].type,
            date:announcement[i].date,
            
        }
        arr.push(arr2)
    }
    else if (announcement[i].type === "Allot") {
     


        const arr2 = {
            msg: announcement[i].announcement,
            name: announcement[i].name,
            role: announcement[i].role,
            type: announcement[i].type,
          

        }
        arr.push(arr2)
    }
    else{if(announcement[i].role==="Admin"){
        const arr2 = {
            msg: announcement[i].announcement,
            sig:"",
            club: "",
            name: announcement[i].name,
            role: announcement[i].role,
            type: announcement[i].type,
        }
        arr.push(arr2)
    }
    else{
        const Sig = await sig.findById(announcement[i].sig)
        const Club = await club.findById(Sig.club)
        const arr2 = {
            msg: announcement[i].announcement,
            sig: Sig.name,
            club: Club.name,
            name: announcement[i].name,
            role: announcement[i].role,
            type: announcement[i].type,
        }
        arr.push(arr2)
    }
}
   
  
    }

        return res.status(200).json(
            arr
        )
    } catch (error) {

    }
}
const prefer=async(req,res)=>{
    try {
        const prefer=await announcements.find({type:"Club"})
        if (prefer.length!==0){
            return res.status(200).json(
                true
            )
        }
        else{
            return res.status(200).json(
                false
            ) 
        }
    } catch (error) {
        
    }
}
const Sigprefer = async (req, res) => {
    try {
        const prefer = await announcements.find({ type: "Sig" })
console.log(prefer)
for (let i = 0; i <prefer.length; i++) {
    if (prefer[i].club == req.params.id) {
        return res.status(200).json(
            true
        )
    }
   
    
}

    return res.status(200).json(
        false
    )

       
    } catch (error) {

    }
}
const checkAllot = async (req, res) => {
    try {
        const prefer = await announcements.find({ type: "Allot" })
        if (prefer.length !== 0) {
            return res.status(200).json(
                true
            )
        }
        else {
            return res.status(200).json(
                false
            )
        }
    } catch (error) {

    }
}

module.exports = {add,send,prefer,Sigprefer,checkAllot}