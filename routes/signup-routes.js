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


router.post("/signup", async function (req, res) {
    const password = req.body.password;
    const rePassword = req.body.rePassword;

    if (password != rePassword.toString()) {
        res.redirect("./signup?message=Password doesn't match, please try again. ");
    } else {

        try {
            const userID = await userDao.createUser(req.body);
            const createdUser = await userDao.retrieveUserById(userID);
            req.session.user = createdUser;
            res.redirect("./avatar?action=avatar");

        } catch (err) {
            res.redirect("./signup?message=Username already exist!Please use another username.");
        }
    }


});

module.exports = router;