

const bcrypt = require("bcrypt")


const JWT = require("jsonwebtoken");
const user = require("../models/user");
const sig = require("../models/sig");
const club = require("../models/club");





const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const User = await user.findOne({ email });
        if (User) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);


if(email==="NITK@admin.in"){
  const check=await user.find({role:"Admin"})
  if(check){
      return res.status(400).json({
          message: "Admin is already there",
          success: false
      })
  }
  else{
      await user.create({
          name,
          email,
          password: hashedPassword,
          role: "Admin"

      });
  }
    
}
else{
    await user.create({
        name,
        email,
        password: hashedPassword,

    });
}
        
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const User = await user.findOne({ email });
        if (!User) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, User.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };


        const token = await JWT.sign({ _id: User._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
 
        return res.status(200).json({
            user: {
                _id: User._id,
                name: User.name,
                email: User.email,
                role: User.role,
                club: User.club,
                register:User.registered,
                clubPreference: User.clubPreference,
                sigPreference: User.sigPreference
            },

            token,



        });

    } catch (error) {
        console.log(error);
    }
}
const get = async (req, res) => {
    try {

        const User = await user.findById(req.user)
    
        return res.status(200).json({
            user: {
                _id: User._id,
                name: User.name,
                email: User.email,
                role: User.role,
                club:User.club,
                register: User.registered,
                clubPreference: User.clubPreference,
                sigPreference: User.sigPreference
            },
        })
    } catch (error) {

    }
}
const getStudent=async(req,res)=>{

const User=await user.findById(req.params.id)
    return res.status(200).json({
        user: {
            _id: User._id,
            name: User.name,
            email: User.email,
            role: User.role,
            club: User.club,
            register: User.registered,
            clubPreference: User.clubPreference,
            sigPreference:User.sigPreference
            
        },
    })
}
const clubPreference=async(req,res)=>{
try {
    
    await user.findByIdAndUpdate(req.user,{clubPreference:req.body.clubs},{new:true})
  
    return res.status(200).json({success:true})
} catch (error) {
    
}
}
const sigPreference=async(req,res)=>{
try {
    console.log(req)
    const User=await user.findById(req.user)
    let arr=User.sigPreference
   
arr.push({
    club:req.body.id,
    preference:req.body.sigs
})

await user.findByIdAndUpdate(req.user,{sigPreference:arr},{new:true})
        return res.status(200).json({ success: true })
} catch (error) {
    
}
}
const allot=async(req,res)=>{
    try {
        const sigs = await sig.find({});

        const allottedStudentsMap = new Map();

        for (const SIG of sigs) {
            for (const studentId of SIG.waitlist) {
                const student = await user.findById(studentId);
                let allottedClubId = null
                let allottedClub = null;

                for (const clubId of student.clubPreference) {
                    const Club = await club.findById(clubId._id);

                    if (Club) {
                        allottedClubId=clubId._id
                        allottedClub = clubId.name;
                        Club.members.push(student._id);
                        await Club.save();
                        break; 
                    }
                }
               
                if (!allottedClub) continue;

                student.club = allottedClubId;
                await student.save();

                let allottedSIG = null;

                for (let i = 0; i < student.sigPreference.length; i++) {
                    
                    if (student.sigPreference[i].club == allottedClubId) {
                        for (const sigId of student.sigPreference[i].preference) {
                            const Sig = await sig.findById(sigId._id);

                            if (Sig) {
                                allottedSIG = sigId.name;
                                Sig.member.push(student._id);
                                await Sig.save();
                                break;
                            }
                        }
                    }
                }

                if (allottedSIG) {
                    student.sig = allottedSIG;
                    await student.save();
                }

                
                allottedStudentsMap.set(student._id.toString(), {
                    studentId: student.name,
                    allottedClub,
                    allottedSIG
                });
            }
        }

       
        const allottedStudents = Array.from(allottedStudentsMap.values());

        console.log(allottedStudents);
       
       
        res.status(200).json(allottedStudents);
    } catch (error) {
        
    }
}
module.exports = { register, login, get, getStudent ,clubPreference,sigPreference,allot}