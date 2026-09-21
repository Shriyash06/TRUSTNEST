const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");

const vistingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  description : {
    type: String,
    required: true
  },
  image: {
    url : String,
    filename : String,
  },
    
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type : Schema.Types.ObjectId,
      ref : "Review"
    }
  ],
  owner :{
    type : Schema.Types.ObjectId,
    ref : "User"


  },
  geometry: {
  type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }

  
});
// VistingSchema.post("findOneAndDelete" , async (visting) =>{
//   if(visting){
//     await review.deleteMany({
//       _id : {
//         $in : visting.reviews
//       }
//     })
//   }
// })

const Visting = mongoose.model("Visting", vistingSchema);
module.exports = Visting;
