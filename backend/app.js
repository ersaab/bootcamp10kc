const express = require('express');
const bodyParser = require('body-parser');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
}
);



app.post("/api/addUser",
    (req, res, next) => {
        const user = req.body;
        console.log(user);
        res.status(201).json({
            message: "Posted"
        });
    }
);




app.get('/api/users',
    (req, res, next) => {
        // res.send('Response sent! ');
        const users = [
            { id: 1, firstName: "abc", lastName: "def", email: "abc@sc.ca", phoneNumber: "+123456789456" },
            { id: 1, firstName: "abc", lastName: "def", email: "abc@sc.ca", phoneNumber: "+123456789456" },
            { id: 1, firstName: "abc", lastName: "def", email: "abc@sc.ca", phoneNumber: "+123456789456" },
            { id: 1, firstName: "abc", lastName: "def", email: "abc@sc.ca", phoneNumber: "+123456789456" },
            { id: 1, firstName: "abc", lastName: "def", email: "abc@sc.ca", phoneNumber: "+123456789456" }
        ];
        res.status(200).json(
            {
                message: 'Users Fetched!',
                users: users
            }
        );
    }
);





module.exports = app;