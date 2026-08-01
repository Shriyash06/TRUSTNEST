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
app.use(cookieParser());
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
    await newVisting.save();
    res.redirect("/visting");
}));

// show route
app.get("/visting/:id" , async(req,res)=>{
    let{id} = req.params;
    const visting = await Visting.findById(id).populate("reviews");
    res.render("show.ejs" , {visting});
})
// edit route
app.get("/visting/:id/edit", async(req, res)=>{
    let{id} = req.params;
    const visting = await Visting.findById(id);
    res.render("edit.ejs", {visting}); // <-- fixed
});
// uodate route
app.put("/visting/:id" , async(req,res) =>{
    let {id} = req.params;
    await Visting.findByIdAndUpdate(id, {... req.body.visting });
    res.redirect(`/visting/${id}`);
});
// delete route
app.delete("/visting/:id" , async(req,res)=>{
    let{id} = req.params;
    await Visting.findByIdAndDelete(id);
    res.redirect("/visting");
})
// post route for review
app.post("/visting/:id/review" , async(req,res) =>{
  let visting =  await Visting.findById(req.params.id);
  let NewReview = new Review(req.body.review);
  visting.reviews.push(NewReview);
      await NewReview.save();
      await visting.save();
    
      res.redirect(`/visting/${visting.id}`)

});
app.delete("/visting/:id/review/:reviewId" , async(req,res)=> {
    let{id,reviewId} = req.params;
    await Visting.findByIdAndUpdate(id , {$pull: {reviews : reviewId}});
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
