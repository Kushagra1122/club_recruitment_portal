const express = require('express');
const { register, login, get, getStudent, clubPreference, sigPreference, allot } = require('../controllers/auth');
const { requireSignIn, Admin } = require('../middlewares/Auth');
const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.get('/session', requireSignIn, get)
router.get('/getStudent/:id', requireSignIn, getStudent)
router.post('/clubPrefer',requireSignIn,clubPreference)
router.post('/sigPrefer', requireSignIn, sigPreference)
router.get('/allot',requireSignIn, allot)
module.exports = router;