const express = require("express");
const session = require("express-session");
const app = express();
const ExpressSession = require("express-session");
const port = 3000;
app.use(session({
    secret : "this is a love  secret"} , resave = flase , saveUninitialized = true));
    app.get("/" , (req,res) =>{
        res.send("root is working" + "  "  + port);
    });
    app.get("/viewcount" , (req,res) =>{
        if(req.session.viewcount){
            req.session.viewcount++;
        }else{
            req.session.viewcount = 1;
        };
        res.send(`you have views this page ${req.session.viewcount} times`)
    })
app.listen(port , () =>{
    console.log("server is running on " , port);
})