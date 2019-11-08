const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const usersDao = require("../modules/users-dao.js");
const articlesDao = require("../modules/articles-dao.js");


router.get("/myArticles", async function (req, res) {
    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const getUserArticle = await articlesDao.getUserArticles(user);
        const totalArticles = await articlesDao.countUserArticles(user);
        const avatar = await usersDao.retrieveAvatar(user.username);

        const context = {
            totalArticles: Object.values(totalArticles[0]),
            profile: avatar,
            userArticle: getUserArticle,
            layout: "blogLayout"
        }

        res.render("myArticles", context);
    }
})



module.exports = router;