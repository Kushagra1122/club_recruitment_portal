const express = require('express');
const { send, add, prefer, Sigprefer, checkAllot } = require('../controllers/announcements');
const { requireSignIn, Admin } = require('../middlewares/Auth');




const router = express.Router();
router.get("/send", requireSignIn, send)
router.post("/add",requireSignIn,add)
router.get("/prefer",requireSignIn,Admin,prefer)
router.get("/sigprefer/:id", requireSignIn, Sigprefer)
router.get("/checkAllot", requireSignIn, checkAllot)
module.exports = router;