const express = require('express');
const { requireSignIn } = require('../middlewares/Auth');

const { getSig, add, view, Startrecruitement, event, register, getStudents, dlt } = require('../controllers/sig');

const router = express.Router();
router.post("/add/:id", requireSignIn, add)
router.get("/view/:id", requireSignIn, view)
router.get("/getSig/:id", requireSignIn, getSig)
router.patch("/startRecruitement/:id", requireSignIn, Startrecruitement)
router.get("/event", requireSignIn, event)
router.post("/register/:id", requireSignIn, register)
router.get("/getStudents/:id", requireSignIn, getStudents)
router.delete("/dlt/:id", requireSignIn, dlt)
module.exports = router;