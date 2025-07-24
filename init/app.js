const mongoose = require("mongoose");
const Visting = require("../models/visting.js");
const initData = require("./data.js");
 // Renamed to avoid name clash with function

// Database connection
main()
  .then(() => {
    console.log("Connected to database successfully");
    // Ensure initData runs after DB is connected
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/banderlust");
}

// Initialize data
const initDb = async () => {
  await Visting.deleteMany({});
  await Visting.insertMany(initDataFile.data); // Using renamed `initDataFile`
  console.log("Data initialized successfully");
};
