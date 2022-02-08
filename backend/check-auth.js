const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/userSchema');
const Login = require('./models/loginSchema');

const router = express.Router();
const { default: Swal } = require('sweetalert2');

// Login 
router.post('/identity/login',
    (req, res, next) => {
        let userDetails;
        console.log(req.body.email);
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: "Authentication Failed!"
                    });
                }
                userDetails = user;
                return bcrypt.compare(req.body.password, user.password)
            }).then(result => {

                if (!result) {
                    return res.status(401).json({
                        message: "Authentication Failed!"
                    });
                }

                const token = jwt.sign({ email: userDetails.email, userId: userDetails._id }, "bootcamp-ten-thousand-coffee-Harmanjit-SINGH", { expiresIn: "1h" });
                res.status(200).json({
                    token: token
                })

            }).catch(err => {
                return res.status(401).json({
                    message: "Authentication Failed!"
                });
            })
    });



module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "bootcamp-ten-thousand-coffee-Harmanjit-SINGH");
    } catch (error) {
        res.status(401).json({ message: "Unauthorized!" });
    }

};