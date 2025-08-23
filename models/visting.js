const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const vistingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
       
      set : (v) => v==="" ? "https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149?q=80&w=2070&auto=format&fit=crop" :v ,
     
      
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149?q=80&w=2070&auto=format&fit=crop",
      
     
    }
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
  ]
});

const Visting = mongoose.model("Visting", vistingSchema);
module.exports = Visting;
