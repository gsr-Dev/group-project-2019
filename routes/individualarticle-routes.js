const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const usersDao = require("../modules/users-dao.js");
const articlesDao = require("../modules/articles-dao.js");


router.get("/individualArticle", async function(req, res) {
    const articleID = req.query.message;

    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const getArticleByID = await articlesDao.getArticleById(articleID);
        const avatar = await usersDao.retrieveAvatar(user.username);

        const context = {
            profile: avatar,
            article: getArticleByID,
            layout: "blogLayout"
        }

        res.render("individualArticle", context);
    }
});

router.post("/individualArticle", async function(req, res) {
    const articleID = req.body.articleID;
    await articlesDao.deleteArticle(articleID);
    res.redirect("./myArticles");
});

module.exports = router;