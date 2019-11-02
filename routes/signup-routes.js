const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");

router.get("/signup", async function (req, res) {
    res.locals.message = req.query.message;
    res.render("signup");
});

router.get("/signup.json", async function (req, res) {
    const allUsers = await userDao.retrieveAllUsers();
    res.json(allUsers);
});


function makeArray(input) {
    if (input === undefined) {
        return [];
    }
    else if (Array.isArray(input)) {
        return input;
    }
    else {
        return [input];
    }
}




router.post("/signup", async function (req, res) {
    const password = req.body.password;
    const rePassword = req.body.rePassword;

    console.log(password);
    console.log(rePassword);

    if (password !=  rePassword.toString()) {
        console.log("password not the same");
        res.redirect("./signup?message=Password doesn't match, please try again. ");
    } else {

        try {
            const sqlInfo = await userDao.createUser(req.body);
            const createUser = await userDao.retrieveUserById(sqlInfo.lastID);
            req.session.user = createUser;
            res.redirect("./avatar");//     res.redirect("./avatar");
         } catch (err) { 
             console.log(err); 
             res.redirect("./signup?message=Username already exist!Please use another username.");
         }
    }


});

module.exports = router;