const express = require('express');
const { create, req, accept, reject, get, getClub, startdate, dlt, send, sendsig } = require('../controllers/club');
const { requireSignIn, Admin } = require('../middlewares/Auth');
const router = express.Router();

router.post("/create/:id",requireSignIn, create)
router.get("/req",requireSignIn, Admin, req)
router.patch("/accept/:id", requireSignIn, Admin, accept)
router.patch("/reject/:id", requireSignIn, Admin, reject)
router.get("/get", requireSignIn,get)
router.get("/getClub/:id", requireSignIn, getClub)
router.delete("/dlt/:id", requireSignIn, dlt)
router.patch("/startdate/:id", requireSignIn, startdate)
router.get("/send/:id",requireSignIn,send)
router.post("/sendsig/:id", requireSignIn, sendsig)
module.exports = router;