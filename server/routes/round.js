const express = require('express');
const { requireSignIn } = require('../middlewares/Auth');
const { add, view, getRound, dlt, select } = require('../controllers/round');

const router = express.Router();
router.post("/add/:id", requireSignIn,add)
router.get("/view/:id", requireSignIn, view)
router.get("/getRound/:id", requireSignIn, getRound)
router.delete("/dlt/:id", requireSignIn, dlt)
router.post("/select/:id",requireSignIn,select)
module.exports = router;