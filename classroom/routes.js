const express = require("express");
const app = express();
const port = 8080;
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require('express-flash');
const path = require("path");
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));
app.listen(port , ()=>{
    console.log("server is running on" , port);
});
const sessionOption = {
    secret : "this is the secret",
    resave : false,
    saveUninitialized : true,
}
         app.use(expressSession(sessionOption));
           app.use(flash());
           app.use((req,res,next)=>{
            res.locals.message = req.flash("sucess")
             res.locals.error = req.flash("error")
             next();

           })
app.get("/testing" ,(req,res)=>{
    res.send("testing is working");
});
app.get("/register" , (req,res) =>{
    let{name = "nameste"} = req.query;
    req.session.name = name;
    if(name==="nameste"){
         req.flash("error", "Registration Failed 😔");

    }else{
         req.flash("sucess" , "🎉 Registration Successful! ✅");

    }
    
    
    res.redirect("/hello");
   
    // res.send(`welcome to the register page => <b>${name}</b>`);
});
          app.get("/hello", (req, res) => {
            
  res.render("page.ejs", {name: req.session.name,
   
  });
    
});
app.get("/reqcount" , (req,res) =>{
    if(req.session.count){
        req.session.count++;

    }else{
        req.session.count = 1;
    }
   res.send(`you have visited this page ${req.session.count} times`);
});
// app.get("/getcookies" , (req,res)=>{
//     res.cookie("greet", "hello");
// res.cookie("madeIn", "india");
//     res.send("send some cookies")
// });
// app.get("/" ,(req,res) =>{
//     console.dir(req.cookies);
   
    
//     res.send("cookies are displayed");
// })