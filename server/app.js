const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var cors = require('cors');

const DB = "mongodb+srv://AnandKumar:INSTACLONE@cluster0.crzff.mongodb.net/instaclone?retryWrites=true&w=majority";

SECRET = "RESTAPI"

const loginRoutes = require("./routes/login")
const userRoutes = require("./routes/users")
const postRoutes = require("./routes/posts")

const app = express(); // create a new express application
app.use(cors())

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("connection successful");
}).catch((err)=>console.log(err));

app.use("/posts",(req,res,next)=>{
    // var token = req.headers.authorization.split("test ")[1];
    var token = req.headers.authorization.split("Bearer ")[1];
    if(!token){
        return res.status(401).json({
            status:"failed",
            message:"token is missing"
        })
    }
    jwt.verify(token,SECRET,function(err,decoded){
        if(err){
            return res.status(401).json({
                status:"failed",
                message:"invalid token"
            })
        }
        else{
            req.user = decoded.data
            next();
        }
    })
})


app.use("/",loginRoutes)
app.use("/users",userRoutes)
app.use("/",postRoutes)

var port = process.env.PORT || 5000;

app.listen(port);