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

📅 Day 4 & 5 – Styling with Bootstrap
In the last two days, I focused on improving the UI/UX of my Airbnb-inspired web application using Bootstrap 5. The goal was to make the website look clean, responsive, and professional.

✅ What I Did:
✅ Added a Navbar

Implemented a responsive Bootstrap navbar with branding and navigation links.

Included collapse feature for smaller screens.

✅ Created a Page Header and Footer

Built reusable header.ejs and footer.ejs partials.

Footer contains site info and links (responsive design ensured).

✅ Styled All Major Pages

✔️ Home page (listings grid with cards)

✔️ Show page (detailed property view with image and info)

✔️ New listing form page (form grouped and spaced properly)

✔️ Edit page (styled form with pre-filled values)

✅ Image Handling

Resized listing images using Bootstrap’s img-fluid and object-fit properties.

Ensured all images scale well across devices.

✅ General Styling

Used Bootstrap classes for margins, padding, and spacing.

Applied consistent buttons, fonts, and layout grid system.
# Airbnb Clone – Day 7 to 15 Progress

## 📌 Day 7 – Data Handling
- Implemented **CRUD operations** for listings (Create, Read, Update, Delete).
- Added proper **form validation** on both client & server side.
- Handled request and response objects with **Express** to manage listings data.

---

## 📌 Day 8 – Custom Middleware
- Created **custom middleware** for:
  - Logging request method & URL.
  - Validating user input before saving to DB.
  - Handling errors gracefully with a central error handler.
- Learned the concept of `next()` in Express for chaining middleware.

---

## 📌 Day 9 – Authentication & Security (Basic)
- Added middleware for **authentication check** (dummy session logic).
- Restricted access to **protected routes** (like add/edit/delete listings).
- Sanitized user input to prevent **XSS/SQL injection**.

---

## 📌 Day 10 – Reviews System Setup
- Introduced **Review Schema** in MongoDB.
- Created form to allow users to submit reviews for a listing.
- Added backend route for handling reviews (`POST /visting/:id/reviews`).

---

## 📌 Day 11 – Establish One-to-Many Relationship
- Connected **Listings ↔ Reviews** with **Mongoose references**:
  - One listing can have multiple reviews.
  - Each review belongs to one listing.
- Used `populate()` to fetch reviews along with listing data.

---

## 📌 Day 12 – Review Display
- Displayed reviews on **Show Page** of each listing.
- Styled reviews section with **Bootstrap**.
- Added user-friendly messages for "No reviews yet."

---

## 📌 Day 13 – Review Deletion
- Implemented **Delete Review** route.
- Used `$pull` operator to remove reference of deleted review from listing.
- Ensured **cascade delete** (when review is deleted, listing reference updates).

---

## 📌 Day 14 – Middleware for Reviews
- Added middleware to:
  - Validate review text & rating.
  - Ensure only **authenticated users** can post/delete reviews.
- Applied DRY principle by reusing validation middleware.

---

## 📌 Day 15 – Finalizing Reviews System
- Completed **One-to-Many Reviews System**:
  - Listings can hold multiple reviews.
  - Reviews reference back to their listing.
- Added **flash messages** for success/failure.
- Improved **error handling** for invalid review submissions.

---

## ✅ Key Learnings (Day 7–15)
- Middleware creation & usage in Express.
- Data validation & error handling.
- Establishing **One-to-Many relationships** in MongoDB.
- Building a fully functional **Reviews System**.

---
### after long 
# Express.js Session, Cookies & Flash Message Practice

A small Express.js practice project focused on understanding cookies, sessions, session IDs, flash messages, middleware, and EJS.

## 📚 What I Learned

Today I implemented and practiced the following concepts:

### 1. Cookies 🍪

- Understanding browser cookies
- Creating cookies using Express
- Understanding how cookies are stored on the client side
- Understanding the purpose of `httpOnly`
- Setting cookie expiration using `maxAge` and `expires`

### 2. Sessions 🔐

- Setting up sessions using `express-session`
- Understanding `req.session`
- Storing user information inside a session
- Reading session data across different routes
- Understanding session IDs and session cookies
- Understanding session expiration

Example:

```js
req.session.name = name;
req.session.name
const sessionOption = {
    secret: "this is a secretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};
Learned the purpose of:

secret
resave
saveUninitialized
httpOnly
maxAge
expires
4. Flash Messages 💬

Implemented flash messages using express-flash.

Used flash messages for temporary notifications such as:

Registration successful
Registration failed

Example:

req.flash("success", "Registration Successful!");

Retrieved the message using:

req.flash("success");
5. res.locals

Learned how to make flash messages available to EJS templates using middleware:

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    next();
});

The message can then be displayed in EJS:

<%= success %>
6. Middleware

Practiced Express middleware and understood the role of:

next();

Middleware was used to process requests before passing them to the next middleware or route.

🔄 Request Flow
Browser
   ↓
Express Server
   ↓
Middleware
   ↓
Session / Flash
   ↓
Route
   ↓
EJS Template
   ↓
Response
🧠 Key Concepts
Session vs Cookie

Cookie:
Small piece of data stored on the client/browser.

Session:
Server-side mechanism used to maintain user-specific state across requests.

The browser generally stores a session identifier in a cookie, which allows the server to associate subsequent requests with the corresponding session.

⏳ Session Expiration

Practiced setting a 7-day cookie lifetime:

maxAge: 7 * 24 * 60 * 60 * 1000

Also learned that:

maxAge represents a duration in milliseconds.
expires represents the expiration date/time.
🛠️ Technologies Used
Node.js
Express.js
express-session
express-flash
cookie-parser
EJS
JavaScript
# Authentication Setup — Daily Progress

## 📅 Date

21 August 2026

## 🚀 Today's Work

Today I worked on setting up authentication using **Passport.js** with **MongoDB and Mongoose**.

### 1. Installed Authentication Packages

Installed:

* `passport`
* `passport-local`
* `passport-local-mongoose`

### 2. Created User Schema

Created a Mongoose `User` schema with:

* Email
* Username
* Authentication-related fields

### 3. Integrated Passport Local Mongoose

Integrated `passport-local-mongoose` with the User schema using:

```js
userSchema.plugin(passportLocalMongoose);
```

### 4. Debugging

Solved multiple issues during setup:

* npm `ETIMEDOUT` network error
* `Cannot find module 'passport-local'`
* `schema.plugin()` received an object instead of a function
* Fixed the package import/export issue

### 5. Successful User Creation

Successfully created a user in MongoDB.

Passport Local Mongoose generated:

* `username`
* `salt`
* `hash`

The password is stored as a **hash + salt**, rather than plain text.

## 🧠 What I Learned

* How npm package installation works
* How to read and debug Node.js errors
* How Passport.js works with Express
* How `passport-local` handles username/password authentication
* How `passport-local-mongoose` integrates authentication with Mongoose
* How password hashing and salting work
* How to debug instead of ignoring errors

## ✅ Current Progress

```text
MongoDB                  ✅
Mongoose                  ✅
Passport                  ✅
Passport Local            ✅
Passport Local Mongoose   ✅
User Schema               ✅
User Creation             ✅
Password Hashing          ✅
```

## 🔜 Next Step

* Configure `passport.serializeUser()`
* Configure `passport.deserializeUser()`
* Configure `LocalStrategy`
* Build login functionality
* Build logout functionality
* Test authenticated sessions

---

> **Today's lesson:** Don't ignore the error. Read the error, understand the error, and debug it.
# Authentication – Login & Signup

## Features
- User Signup
- User Login
- Passport Local Authentication
- Session Management
- Success Flash Message
- Failed Login Handling

## Login Flow

User enters credentials
        ↓
POST /login
        ↓
Passport.authenticate("local")
        ↓
   ┌────┴────┐
   ↓         ↓
SUCCESS     FAILURE
   ↓         ↓
Success     failureFlash
Flash       ↓
   ↓       /login
/visting

## Problem I Faced

### Problem 1: Authentication was failing
What happened:
...

What I checked:
...

What I changed:
...

Result:
...

### Problem 2: Success flash was not showing
...

### Problem 3: Failed-login flash
...

## Important Code

### POST /login
...

### GET /login
...

## Debugging Notes
- Check whether POST /login is triggered
- Check Passport authentication result
- Check session configuration
- Check flash messages
- Check redirect
- Check EJS rendering

## Lessons Learned

- `failureRedirect` handles failed authentication.
- `failureFlash` creates a flash message for authentication failure.
- The success callback runs only after successful authentication.
- `try/catch` does not replace Passport's authentication failure handling.