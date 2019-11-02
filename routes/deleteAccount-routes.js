const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");

router.get("/deleteAccount", async function (req, res) {
    res.locals.message = req.query.message;
    res.render("deleteAccount");
})

router.post("/deleteAccount", async function (req, res) {

    const context = {
        username: req.body.username,
    }
    console.log(context);
    try {
        if (context.username) {
            const deleteUser = await userDao.deleteUser(context.username);
            console.log(deleteUser);
            res.redirect(`./deleteAccount?message=The user, "${context.username}" has been successfully deleted!`);
        }
        else {
            res.redirect("./deleteAccount?message=the username does not exist!");
        }

    } catch (err) {
        console.log(err);
    }

});

module.exports = router;