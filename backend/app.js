const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/userSchema');
const Login = require('./models/loginSchema');

const mongoose = require('mongoose');
const { default: Swal } = require('sweetalert2');

const app = express();
const AuthCheck = require("../backend/check-auth");

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

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
}
);

// Add a User with hash password
app.post("/api/addUser",
    (req, res, next) => {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    imageName: req.body.imageName,
                    imageBase64: req.body.imageBase64,
                    password: hash
                });
                user.save().then(result => {
                    message: "User Created"
                    res.status(201).json({
                        message: "User Created",
                        result: result
                    });
                })
                    .catch(err => {
                        res.status(500).json({ error: err });
                    })
            });
    });


// Get all users
app.get('/api/users',
    (req, res, next) => {
        // res.send('Response sent! ');
        User.find()
            .then(
                userList => {
                    res.status(200).json(
                        {
                            message: 'Users Fetched!',
                            users: userList
                        });
                    // console.log("userList ", userList);
                });

    });


// Get user by Id
app.get('/api/user/:id', AuthCheck,
    (req, res, next) => {
        // res.send('Response sent! ');
        console.log(req.params.id);

        User.findOne((id) => req.params.id === id)
            .then(
                userList => {
                    res.status(200).json(
                        {
                            message: 'User Fetched!',
                            users: userList
                        });
                    // console.log("userList ", userList);
                });

    });






module.exports = app;