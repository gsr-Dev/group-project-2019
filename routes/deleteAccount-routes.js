const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");
const articleDao = require("../modules/articles-dao.js");
const commentDao = require("../modules/comment-dao.js");

router.get("/deleteAccount", async function (req, res) {
    res.locals.message = req.query.message;
    const context = {
        layout: "blogLayout"
    }
    res.render("deleteAccount",context);
})

router.post("/deleteAccount", async function (req, res) {

    const context = {
        username: req.body.username,
    }
 
    try {
        if (context.username) {
            
            await commentDao.deleteCommentsByUsername(context.username);
            await articleDao.deleteArticlesByUsername(context.username);
            await userDao.deleteProfile(context.username);
            await userDao.deleteUser(context.username);

            delete req.session.user;
            res.redirect(`./?message=The user, "${context.username}" has been successfully deleted!`);
        }
        else {
            res.redirect("./deleteAccount?message=the username does not exist!");
        }

    } catch (err) {
        console.log(err);
    }

});

module.exports = router;