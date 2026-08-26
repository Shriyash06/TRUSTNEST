const express = require("express");
const app = express();
const port = 8080;

const Visting = require("./models/visting.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("express-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose =
    require("passport-local-mongoose").default;

const ReviewModel = Review;


// ==============================
// SESSION CONFIGURATION
// ==============================

const sessionOption = {
    secret: "this is a secretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};


// ==============================
// MIDDLEWARE
// ==============================

app.use(cookieParser());

app.use(expressSession(sessionOption));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "/views/public")));


// ==============================
// PASSPORT CONFIGURATION
// ==============================

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ==============================
// FLASH VARIABLES
// ==============================

app.use((req, res, next) => {
    res.locals.sucess = req.flash("sucess");

    // IMPORTANT:
    // Passport failureFlash uses "error"
    res.locals.err = req.flash("error");
    res.locals.currentUser = req.user;

    next();
});


// ==============================
// EJS CONFIGURATION
// ==============================

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);


// ==============================
// SERVER
// ==============================

app.listen(port, () => {
    console.log("server is running on", port);
});


// ==============================
// DATABASE
// ==============================

const mongoose = require("mongoose");

main()
    .then(() => {
        console.log("connected to database successfully");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(
        "mongodb://127.0.0.1:27017/banderlust"
    );
}


// ==============================
// ROOT
// ==============================

app.get("/", (req, res) => {
    res.send("root is working " + port);
});


// ==============================
// AUTHENTICATION MIDDLEWARE
// ==============================

const isLoggedIn = (req, res, next) => {
    // console.log("req.user", req.user);
    // console.log(req.path , ".." , req.originalUrl);
    req.session.redirectTo = req.originalUrl;

    
    if (!req.isAuthenticated()) {


        req.flash(
            "err",
            "❌ You must be logged in first!"
        );

        return res.redirect("/login");
    }

    next();
};
const SavedUrl = (req,res,next)=>{
   if(req.session.redirectTo){
    res.locals.redirectTo = req.session.redirectTo;
   }
   next();
}



// ==============================
// SIGNUP
// ==============================

app.get("/signup", (req, res) => {

    res.render("users/signup.ejs");

    console.log("signup route is working");
});


app.post(
    "/signup",
    wrapAsync(async (req, res) => {

        try {

            const {
                username,
                email,
                password
            } = req.body;

            const newUser = new User({
                username,
                email
            });

            const registeredUser =
                await User.register(
                    newUser,
                    password
                );

            console.log(registeredUser);

            req.flash(
                "sucess",
                "🎉 Welcome to Wanderlust! ✅"
            );
           req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("sucess" , "🎉 Welcome to Wanderlust!✅");
                 res.redirect("/visting");

           })
        

   

        } catch (err) {

            req.flash(
                "err",
                "❌ Invalid username or password. Please try again. ❌"
            );

            res.redirect("/signup");
        }
    })
);


// ==============================
// LOGIN
// ==============================

app.get("/login", (req, res) => {

    res.render("users/login.ejs");

    console.log("login route is working");
});


app.post(
    "/login",
    SavedUrl,
   

    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),

    (req, res) => {

        req.flash(
            "sucess",
            "🎉 Welcome back! ✅"
        );

        console.log("login is working");
        const redirectUrl = res.locals.redirectTo || "/visting";
        res.redirect(redirectUrl);
        
    }
);


// ==============================
// LOGOUT
// ==============================

app.get("/logout", (req, res, next) => {

    req.logout((err) => {

        if (err) {
            return next(err);
        }

        req.flash(
            "sucess",
            "🎉 You have been logged out! ✅"
        );

        res.redirect("/visting");
    });
});


// ==============================
// INDEX / ALL LISTINGS
// ==============================

app.get(
    "/visting",
    wrapAsync(async (req, res) => {

        const allvistings =
            await Visting.find();

        res.render(
            "index.ejs",
            {
                allvistings
            }
        );
    })
);


// ==============================
// NEW LISTING
// ==============================

app.get(
    "/visting/new",
    isLoggedIn,
    (req, res) => {

        res.render("new.ejs");
    }
);


// ==============================
// CREATE LISTING
// ==============================

app.post(
    "/visting",
    isLoggedIn,

    wrapAsync(async (req, res) => {

        const newVisting =
            new Visting(req.body.visting);

        await newVisting.save();

        req.flash(
            "sucess",
            "🎉 New Visting Added! ✅"
        );

        res.redirect("/visting");
    })
);


// ==============================
// SHOW LISTING
// ==============================

app.get(
    "/visting/:id",

    wrapAsync(async (req, res) => {

        const { id } = req.params;

        const visting =
            await Visting
                .findById(id)
                .populate("reviews");

        if (!visting) {

            req.flash(
                "err",
                "This listing does not exist."
            );

            return res.redirect("/visting");
        }

        res.render(
            "show.ejs",
            {
                visting
            }
        );
    })
);


// ==============================
// EDIT LISTING
// ==============================

app.get(
    "/visting/:id/edit",
    isLoggedIn,

    wrapAsync(async (req, res) => {

        const { id } = req.params;

        const visting =
            await Visting.findById(id);

        if (!visting) {

            req.flash(
                "err",
                "This listing does not exist."
            );

            return res.redirect("/visting");
        }

        res.render(
            "edit.ejs",
            {
                visting
            }
        );
    })
);


// ==============================
// UPDATE LISTING
// ==============================

app.put(
    "/visting/:id",
    isLoggedIn,

    wrapAsync(async (req, res) => {

        const { id } = req.params;

        const visting =
            await Visting.findById(id);

        if (!visting) {

            req.flash(
                "err",
                "This listing does not exist."
            );

            return res.redirect("/visting");
        }

        await Visting.findByIdAndUpdate(
            id,
            {
                ...req.body.visting
            }
        );

        req.flash(
            "sucess",
            "🎉 Visting Updated! ✅"
        );

        res.redirect(`/visting/${id}`);
    })
);


// ==============================
// DELETE LISTING
// ==============================

app.delete(
    "/visting/:id",
    isLoggedIn,

    wrapAsync(async (req, res) => {

        const { id } = req.params;

        await Visting.findByIdAndDelete(id);

        req.flash(
            "sucess",
            "🎉 Visting Deleted! ✅"
        );

        res.redirect("/visting");
    })
);


// ==============================
// ADD REVIEW
// ==============================

app.post(
    "/visting/:id/review",
    isLoggedIn,

    wrapAsync(async (req, res) => {

        const visting =
            await Visting.findById(
                req.params.id
            );

        if (!visting) {

            req.flash(
                "err",
                "This listing does not exist."
            );

            return res.redirect("/visting");
        }

        const newReview =
            new ReviewModel(
                req.body.review
            );

        visting.reviews.push(
            newReview
        );

        await newReview.save();

        await visting.save();

        req.flash(
            "sucess",
            "🎉 Review Added! ✅"
        );

        res.redirect(
            `/visting/${visting.id}`
        );
    })
);


// ==============================
// DELETE REVIEW
// ==============================

app.delete(
    "/visting/:id/review/:reviewId",
    isLoggedIn,

    wrapAsync(async (req, res) => {

        const {
            id,
            reviewId
        } = req.params;

        await Visting.findByIdAndUpdate(
            id,
            {
                $pull: {
                    reviews: reviewId
                }
            }
        );

        await Review.findByIdAndDelete(
            reviewId
        );

        req.flash(
            "sucess",
            "🎉 Review Deleted! ✅"
        );

        res.redirect(
            `/visting/${id}`
        );
    })
);


// ==============================
// ERROR HANDLER
// ==============================

app.use(
    (err, req, res, next) => {

        const {
            statusCode = 500,
            message = "Something went wrong"
        } = err;

        res.status(statusCode);

        res.render(
            "error.ejs",
            {
                err
            }
        );
    }
);