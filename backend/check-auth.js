const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/userSchema');
const Login = require('./models/loginSchema');

const mongoose = require('mongoose');
const { default: Swal } = require('sweetalert2');

const app = express();

mongoose.connect("mongodb+srv://erharmanjit:VjuL5IvfCvhFD7gM@bootcamp10kcdb.mxawn.mongodb.net/bootcampDb?retryWrites=true&w=majority")
    .then(
        () => {
            console.log('Connected to Database! ')
        }
    ).catch(
        () => {
            console.log("Connection not established to Database!")
        }
    )

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
}
);

// Login 
app.post("/api/login",
    (req, res, next) => {

        let userDetails;
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