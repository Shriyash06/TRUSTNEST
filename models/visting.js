const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const vistingSchema = new Schema({
    tittle : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        set : (v) => v === " " ? "default img": v,
        
    },
    price : {
        type : Number,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    country :{
        type : String,
        required : true,
    }
})
const Visting = mongoose.model("Visting" , vistingSchema);
module.exports = Visting;