const mongoose = require('mongoose');
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
      default: "default.jpg",
      required: true
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149?q=80&w=2070&auto=format&fit=crop",
      required: true
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
  }
});

const Visting = mongoose.model("Visting", vistingSchema);
module.exports = Visting;
