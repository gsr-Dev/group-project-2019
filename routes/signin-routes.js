const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");




// Make the "user" session object available to the Handlebars engine by adding it to res.locals.
router.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// Whenever we navigate to /signin, if we're already logged in, redirect to "/blog".
// Otherwise, render the "signin" view, supplying the given "message" query parameter
// to the view engine, if any.
router.get("/signin", function (req, res) {
    if (req.session.user) {
        res.redirect("/blog");
    } else {
        res.locals.message = req.query.message;
        res.render("signin");
    }

});

// Whenever we POST to /signin, check the username and password submitted by the user.
// If they match a user in the database, add that user to the session and redirect to "/blog".
// Otherwise, redirect to "/signin", with a "signin failed" message.

router.post("/signin", async function (req, res) {

    // Get the username and password submitted in the form
    const username = req.body.username;
    const password = req.body.password; 

    // seperate out passwordHash from retrieveUserCredentials. password currently = boolean value

    try {
        const user = await userDao.verifyCredentials(username, password);
        console.log(user);
        if (user) {
            req.session.user = user;
            res.redirect("./blog");
        } else {
            res.redirect("./signin?message=Incorrect username or password");
        }

    } catch (err) {

        console.log(err);
    };
});



// Whenever we navigate to /logout, delete any user object from the session. Then,
// redirect to "/signin", supplying a "logged out successfully" message.
router.get("/signout", function (req, res) {
    const user = req.session.user;
    if (user) {
        delete req.session.user;
    }
    res.redirect("./?message=You have successfully signed out!");
});



module.exports = router;