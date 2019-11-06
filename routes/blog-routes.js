const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");

router.get("/blog", async function (req, res) {

    res.locals.message = req.query.message;
    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const allArticles = await articlesDao.getAllArticles();
 
        const context = {
            articles: allArticles,
            layout: "blogLayout"
        }


        res.render("blog", context);
    }
});


module.exports = router;
