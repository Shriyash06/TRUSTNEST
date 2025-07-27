 Day 1 – Project Setup
Today, I began developing a web platform inspired by Airbnb. Here's what I completed:

✅ Basic project setup (Node.js, Express, folder structure)

✅ MongoDB connection using Mongoose

✅ Created Mongoose schema/model for property listings (Visiting)

✅ Designed and connected a new Express server

✅ Prepared sample data for initial listings

✅ Wrote seed script to initialize the database with sample data

✅ Tested MongoDB insertions and connections successfully
# Day 2: Completed CRUD Operations with MongoDB and Express.js

## ✅ What I Accomplished
Today, I successfully implemented full **CRUD (Create, Read, Update, Delete)** operations in a Node.js application using:

- **Express.js** for server routing
- **MongoDB** as the database
- **Mongoose** for object modeling
- **EJS** as the view engine

---

## 📂 Features Built
### 🔹 Create
- Used a `/visting` route to insert new documents into the MongoDB collection using Mongoose.

### 🔹 Read
- Fetched all listings from the database and displayed them dynamically on a webpage using EJS templating.

### 🔹 Update *(Planned or Coming Soon)*
- [ ] Add a route with form to edit listings using Mongoose's `findByIdAndUpdate()`.

### 🔹 Delete *(Planned or Coming Soon)*
- [ ] Implement deletion via `findByIdAndDelete()` using a button or link.

---

## 📦 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (local instance)
- **ODM**: Mongoose
- **Templating**: EJS

---

## 🧠 Learnings
- How to structure Express routes for different CRUD operations
- How to connect and interact with MongoDB using Mongoose
- How to render dynamic data on the frontend using EJS
- Importance of passing objects (not arrays) to `res.render()`

---

