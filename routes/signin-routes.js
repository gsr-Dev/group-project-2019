const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");

// The setup for the mailer functionality
const nodemailer = require('nodemailer');  


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
            res.redirect("/blog");
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


router.get("/forgotpsw", async function(req, res) { 
       
    //const context = {message: "Please enter your Email Address below"}
    res.locals.message = req.query.message;
    
    
    res.render("forgotpsw"); 
}); 

// router.get("/forgotpsw/sent", async function(req, res) {  
//     const context = {
//         Header: "Password Reset", 
//         Message: "A message has been sent to you by email with instructions on how to reset your password."
//     }; 
//     res.render('sentpsw', context)
// }); 

router.post("/forgotpsw", async function(req, res) { 
    const email = req.body.email_address;  
    
     
    try { 
        const sendEmail = await userDao.retrieverUserEmail(email);  
        
        if (sendEmail) { 
          
        
            let transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: { 
                    user: 'gshkblogsecure@gmail.com', 
                    pass: 'gshkm4il3r'
                },                   
            });  
        
            let mailOptions = {
                from: 'gshkblogsecure@gmail.com', 
                to: `${email}`, 
                subject: 'Reset your password!',  
                // create username variable
                html: `Hi <strong>${sendEmail.username}</strong>,<br><br> 
                We recieved a request to reset your password.<br> 
                Click the link below:<br><br> 
                <p><a href='http://localhost:3000/resetpsw'>Reset your password!</a></p>`
            };  

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });  
              

             req.session.email = email; 
             console.log(req.session.email);  
             res.redirect("/forgotpsw?message=A message has been sent to you by email with instructions on how to reset your password. (Please check your Junk Box too!)");    
//&#9989; 
        } else { 
            
            res.redirect("/forgotpsw"); 
            
        }
    } catch (err) {
        console.log(err);
    };
   
}); 

module.exports = router;