const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");


router.get("/myArticles", async function (req, res) {
    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const getUserArticle = await articlesDao.getUserArticles(user);

        const context = {
            userArticle : getUserArticle,
            layout: "blogLayout"
        }

        res.render("myArticles", context);
    }
})



module.exports = router;