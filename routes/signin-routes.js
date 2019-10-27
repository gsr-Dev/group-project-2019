const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");
const messageDao = require("../modules/messages-dao.js");

const verifyAuthenticated = require("../modules/verify-auth.js");

// Make the "user" session object available to the Handlebars engine by adding it to res.locals.
router.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// Whenever we navigate to /signin, if we're already logged in, redirect to "/blog".
// Otherwise, render the "signin" view, supplying the given "message" query parameter
// to the view engine, if any.
router.get("/signin", function(req, res) {

    
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

router.post("/signin", async function(req, res) {

    // Get the username and password submitted in the form
    const username = req.body.username;
    const password = req.body.password;

    

    // // if there is a matching user...
    // if (user) {
    //     // Auth success - add the user to the session, and redirect to the homepage.
    //     req.session.user = user;
    //     res.redirect("./blog");
    // }

    // // Otherwise, if there's no matching user...
    // else {
    //     // Auth fail

        try {
            // Find a matching user in the database
            const user = await userDao.retrieveUserWithCredentials(username, password);
            req.session.user = user;
            res.redirect("./blog");
        } catch (err) {
            res.redirect("./signin?message=Incorrect username or password");
        }
        
        
    //}
});



// Whenever we navigate to /logout, delete any user object from the session. Then,
// redirect to "/signin", supplying a "logged out successfully" message.
router.get("/logout", function(req, res) {
    const user = req.session.user;
    if (user) {
        delete req.session.user;
    }
    res.redirect("./?message=Successfully logged out!");
});






//May create a new route.js for below route handler
router.get("/blog", function(req, res) {

    res.render("blog");
});

module.exports = router;