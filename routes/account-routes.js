const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");

router.get("/account", async function (req, res) {
    res.locals.message = req.query.message;

    retrievedAvatar = await userDao.retrieveAvatar(req.session.user.username);

    const context = {
        avatar: retrievedAvatar.image,
        layout: "blogLayout"
    }
    res.render("account", context);
})

router.post("/account", async function (req, res) {

    const retrievedAvatar = userDao.retrieveAvatar(req.session.user.username);
    const context = {
        id: req.session.user.id,
        username: req.body.username,
        password: req.body.password,
        realName: req.body.realName,
        email: req.body.email,
        dob: req.body.dob,
        description: req.body.description,
        avatar: retrievedAvatar.image
    }

    try {

        await userDao.updateUser(context);

        const retreivedUser = await userDao.retrieveUserByUserName(context.username);
        console.log(retreivedUser);
        req.session.user = retreivedUser;

        //tell the client-side to reload the page
        res.redirect(`./account?message=Information for the user, ${context.username}, has been successfully updated!`);

    } catch (err) {

        res.redirect("./account?message=cannot update the user information!");
    }
});

module.exports = router;
