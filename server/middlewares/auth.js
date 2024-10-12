
const JWT = require("jsonwebtoken");
const user = require("../models/user");

const requireSignIn = async (req, res, next) => {
    try {
        
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};

const Admin = async (req, res, next) => {
    try {

        const User = await user.findById(req.user._id);
       
        if (User.role !== 'Admin') {
            return res.status(400).json({

                error: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};

module.exports = { requireSignIn,Admin }
