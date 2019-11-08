const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");

// The setup for the mailer functionality
const nodemailer = require('nodemailer');


router.get("/forgotpsw", async function (req, res) {

    //const context = {message: "Please enter your Email Address below"}
    res.locals.message = req.query.message;


    res.render("forgotpsw");
});


router.post("/forgotpsw", async function (req, res) {
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
                Please click the link below to <br><br> 
                <p><a href='http://localhost:3000/resetpsw'>Reset your password!</a></p>`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            req.session.username = sendEmail.username;
            req.session.email = email;
          
            res.redirect("/forgotpsw?message=A message has been sent to you by email with instructions on how to reset your password. (Please check your Junk Box too!)");
            //&#9989; 
        } else {

            res.redirect("/forgotpsw");

        }
    } catch (err) {
        console.log(err);
    };

});


router.get("/resetpsw", function (req, res) {
    res.locals.message = req.query.message;
    res.render("resetpsw");
});

router.post("/resetpsw", async function (req, res) {
    const newPassword = req.body.newPassword;
    const reNewPassword = req.body.confirmPass;
    const sessionData = req.session.username;

    if (newPassword != reNewPassword.toString()) {
        console.log("password not the same");
        res.redirect("./resetpsw?message=Password doesn't match, please try again. ");
    } else {
        try {
            const resetPassword = await userDao.updatePassword(newPassword, sessionData);
            console.log(resetPassword);
            if (resetPassword) {
                res.redirect('/signin?message=You have reset your password, please sign in again with your new password.');
                delete sessionData;
            } else {
                res.redirect('/resetpsw');

            }

        } catch (err) {
            console.log(err);
        }
    }

});

router.get('/redirect', function (req, res) {
    res.render('redirect');
})
module.exports = router;
