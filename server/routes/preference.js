const express = require('express');
const { released, checkClub } = require('../controllers/preference');
const { requireSignIn, Admin } = require('../middlewares/Auth');


const router = express.Router();
router.get("/release",requireSignIn,Admin,released )
router.get("/checkClub",requireSignIn, checkClub)
module.exports = router;