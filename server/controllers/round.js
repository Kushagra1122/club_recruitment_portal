const club = require("../models/club");
const round = require("../models/round");
const sig = require("../models/sig");

const add = async (req, res) => {
    try {


        const { name, desc, type, test, roundStart, roundEnd } = req.body
   
        if (!name || !desc || !type || !roundStart || !roundEnd) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const Round = await round.create({
            name,
            desc,
            type,
            test,
            roundStart,
            roundEnd,
            sig: req.params.id


        });

        const Sig = await sig.findById(req.params.id)
        arr = Sig.rounds
        arr.push(Round._id)
        await sig.findByIdAndUpdate(req.params.id, { rounds: arr }, { new: true })
        return res.status(201).json({
            message: "Round created successfully.",
            success: true
        })
    }


    catch (error) {

    }
}
const view = async (req, res) => {
    try {
        const Club = await club.findById(req.params.id)
        if (Club) {
            return res.status(200).json(
                Club.rounds)
        }


    } catch (error) {

    }
}
const getRound = async (req, res) => {
    try {
        const Round = await round.findById(req.params.id)
        if (Round) {
            return res.status(200).json(
                Round)
        }

    } catch (error) {

    }
}
const edit = async (req, res) => {
    try {
        await club.findByIdAndUpdate(req.params.id)
        return res.status(200).json({
            message: "updated successfully"
        })
    } catch (error) {

    }
}
const dlt = async (req, res) => {
    try {
        const Round=await round.findByIdAndDelete(req.params.id)
  
          const Sig = await sig.findById( Round.sig)

        let arr = Sig.rounds

       

   const i=arr.indexOf(req.params.id)
   arr.splice(i,1)
       

  await sig.findByIdAndUpdate(Sig._id, { rounds: arr }, { new: true })

        return res.status(200).json({
            message: "Deleted successfully"
        })
    } catch (error) {

    }
}
const reject = async (req,res) => {
    try {
   
      
    } catch (error) {

    }
}
const select = async (req, res) => {
    try {

        const Sig = await sig.findById(req.body.sigId)

        let arr2 = Sig.rounds
        let i = arr2.indexOf(req.params.id)
        const Round = await round.findById(req.params.id)
        let arr = Round.cleared
        arr.push(req.body.userId)
        await round.findByIdAndUpdate(req.params.id, { cleared: arr }, { new: true })
        if (i + 1 >= arr2.length) {
            let arr3 = Sig.waitlist
            arr3.push(req.body.userId)
            await sig.findByIdAndUpdate(req.body.sigId, { waitlist: arr3 }, { new: true })
            return res.status(200).json({
                success: true
            })

        }
        else {

            const nextRound = await round.findById(arr2[i + 1])

            let arr4 = nextRound.students
            arr4.push(req.body.userId)
           

            await round.findByIdAndUpdate(arr2[i + 1], { students: arr4 }, { new: true })

            return res.status(200).json({
                success: true
            })
        }

    } catch (error) {

    }
}
module.exports = { add, view, getRound, edit, dlt ,select}