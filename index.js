const express = require("express");
const app = express();
const port = 8080;
const Visting = require("./models/visting.js");
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
app.get("/visting" , async(req,res) =>{
    let sampleVisting = new Visting({
        tittle : "my new villa",
        description : "this is your pocket friendly",
        location : "goa , calangute",
        country : "india",
        price : 10000
    })
    await sample.save();
    res.send("visting model is working");
    console.log("sample are saved" , sampleVisting);
})