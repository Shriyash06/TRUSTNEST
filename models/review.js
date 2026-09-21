const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
   comment : {
    type : String,
    default : Date.now(),
   },
   rating :{
    type : Number,
    min : 1,
    max : 7,
   },
   createdAt :{
    type : Date,
    default : Date.now()

   },
   author : {
     type : Schema.Types.ObjectId,
      ref : "User"

   }
});
module.exports = mongoose.model("Review" , reviewSchema);