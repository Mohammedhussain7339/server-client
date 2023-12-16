const express = require('express');
require('./database/connection');
require('./models/user')
require('./models/product')
var path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
// const multer = require('multer');
// const upload = multer({dest:'uploads/'})

const app = express();
const userRouter = require('./routes/userAuth')
const userRouter1 = require('./routes/product')
//use cors for work for client and server simantaniuosly
const cors = require('cors');

// use body parser code this is used for client request accept for server
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//this is middleware
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'yourSecretKey', // Change this to a strong, random string
    resave: false,
    saveUninitialized: true,
  }));


app.use('/', userRouter)
app.use("/userAuth", userRouter);
app.use('/login', userRouter)
app.use('/product', userRouter)

app.listen(8000, () => {
    console.log("server is start");
})


