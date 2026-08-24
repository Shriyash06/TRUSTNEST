const express = require("express");
const app = express();
const port = 8080;
const Visting = require("./models/visting.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const sessionOption = {
    secret: "this is a secretcode",
    resave: false,
    saveUninitialized: true,
    cookie :{
        httpOnly: true,
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,

    }
};
app.use(cookieParser());
app.use(expressSession(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.sucess = req.flash("sucess");
    res.locals.err = req.flash("err");
    next();
})
app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride ('_method'));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname, "/views/public")));
app.listen(port , () =>{
    console.log("server is running on " , port);
});
const mongoose = require('mongoose');

main().then(()=>{
    console.log("connected to database sucessfully")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/banderlust');

  
}
app.get("/" , (req,res)=>{
    res.send("root is working" +"  "  + port)
});
// app.get("/visting" , async(req,res) =>{
//     let sampleVisting = new Visting({
//         title : "my new villa",
//         description : "this is your pocket friendly",
//         location : "goa , calangute",
//         country : "india",
//         price : 10000
//     })
//     await sampleVisting.save();
//     res.send("visting model is working");
//     console.log("sample are saved" , sampleVisting);
// })
// index route
// app.get("/demouser" , async(req,res)=>{
//     let sampleUser = new User({
//         email : "yshrivastava194@gmail.com",
//        username : "yash shrivastava"
//     });
//      let registeredUser =await User.register(sampleUser, "yash1234");
//      res.send(registeredUser);
//      console.log(registeredUser);

// });
app.get("/signup" , (req,res)=>{
    res.render("users/signup.ejs")
    console.log("signup route is working");
});
app.post("/signup", wrapAsync(async (req, res) => {
    try{let { username, email, password } = req.body;

    const newUser = new User({
        username,
        email
    });

    const registeredUser = await User.register(newUser, password);

    console.log(registeredUser);

    req.flash("sucess", "🎉 Welcome to Wanderlust! ✅");

    res.redirect("/visting");
}catch(err){
    req.flash("err" , "❌ Invalid username or password. Please try again. ❌");
    res.redirect("/signup");

    
}}));
app.get("/login" , (req,res)=>{
    res.render("users/login.ejs");
    // res.flash("err" , "❌ Invalid username or password. Please try again. ❌");
    console.log("login route is working");
});
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  async (req, res) => {
   
      req.flash("sucess", "🎉 Welcome back! ✅");
      console.log("login is working");
      
      res.redirect("/visting");
    
  }
);
app.get("/visting", async (req, res) => {
    const allvistings = await Visting.find();
    res.render("index.ejs", { allvistings }); // <-- fixed
});
app.get("/visting/new" , (req,res) =>{
    res.render("new.ejs");
});
// create
app.post("/visting", wrapAsync(async (req, res, next) => {
    const newVisting = new Visting(req.body.visting);
    req.flash("sucess" , "🎉 New Visting Added! ✅");
    await newVisting.save();
    res.redirect("/visting");
}));

// show route
// SHOW Route
app.get("/visting/:id", async (req, res) => {
    let { id } = req.params;

    const visting = await Visting.findById(id).populate("reviews");

    if (!visting) {
        req.flash("err", "This listing does not exist.");
        return res.redirect("/visting");   // return is important
    }

    res.render("show.ejs", { visting });
});


// EDIT Route
app.get("/visting/:id/edit", async (req, res) => {
    let { id } = req.params;

    const visting = await Visting.findById(id);

    if (!visting) {
        req.flash("err", "This listing does not exist.");
        return res.redirect("/visting");
    }

    res.render("edit.ejs", { visting });
});


// UPDATE Route
app.put("/visting/:id", async (req, res) => {
    let { id } = req.params;

    const visting = await Visting.findById(id);

    if (!visting) {
        req.flash("err", "This listing does not exist.");
        return res.redirect("/visting");
    }

    await Visting.findByIdAndUpdate(id, { ...req.body.visting });

    req.flash("sucess", "🎉 Visting Updated! ✅");

    res.redirect(`/visting/${id}`);
});
// delete route
app.delete("/visting/:id" , async(req,res)=>{
    let{id} = req.params;
    await Visting.findByIdAndDelete(id);
    req.flash("sucess" , "🎉 Visting Deleted! ✅");
    res.redirect("/visting");
})
// post route for review
app.post("/visting/:id/review" , async(req,res) =>{
  let visting =  await Visting.findById(req.params.id);
  let NewReview = new Review(req.body.review);
  visting.reviews.push(NewReview);
  req.flash("sucess" , "🎉 Review Added! ✅");
      await NewReview.save();
      await visting.save();
    
      res.redirect(`/visting/${visting.id}`)

});
app.delete("/visting/:id/review/:reviewId" , async(req,res)=> {
    let{id,reviewId} = req.params;
    await Visting.findByIdAndUpdate(id , {$pull: {reviews : reviewId}});
    req.flash("sucess" , "🎉 Review Deleted! ✅");
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/visting/${id}`)
    
})
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
   res.render("error.ejs" , {err});
});
app.get("/getcookies" , (req,res) =>{
    res.cookie("greeting" , "hello world");
    res.cookie("made in" , ("india"));
    res.send("hi , cookie are set")
});
app.get("/" , () =>{
    console.dir(req.cookies);
    res.send("cookies are displayed");
})
// app.all("*" ,(req,res,next) => {
//     next(newExpressError(404 , "page not found"))
// });
