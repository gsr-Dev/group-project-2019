const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");

router.get("/signup", async function (req, res) {
    const newMessage = await userDao.retrieveAllUsers();
    console.log(newMessage);
    res.locals.message = req.query.message;
    res.render("signup");
});

router.post("/signup", async function (req, res) {


    const context = {

        username: req.body.username,
        password: req.body.password,
    }

    const rePassword = req.body.rePassword;

    console.log(context.password);
    console.log(rePassword);

    if (context.password !=  rePassword.toString()) {
        console.log("password not the same");
        res.redirect("./signup?message=Password doesn't match, please try again. ");
    } else {

        try {
            const createUser = await userDao.createUser(context);
            console.log(createUser);
            res.redirect("./blog");//     res.redirect("./avatar");
         } catch (err) { 
             console.log(err); 
             res.redirect("./signup?message=Username already exist!Please use another username.");
         }
    }


});

module.exports = router;