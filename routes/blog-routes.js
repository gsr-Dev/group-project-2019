const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");

router.get("/blog", async function (req, res) {

    // console.log(`user session on blog page ${req.session.user}`);
    // console.log(req.session.user);
    if (req.session.user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {
        
        const getPredefinedArticles = await articlesDao.getPredefinedArticle();

        const context = {
            predefinedArticles: getPredefinedArticles,
            layout: "blogLayout"
        }

        res.render("blog", context);
    }
})

module.exports = router;