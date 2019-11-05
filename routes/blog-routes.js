const express = require("express");
const router = express.Router();
const commentsDao = require('../modules/comment-dao.js');
// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");

router.get("/blog", async function(req, res) {

    res.locals.message = req.query.message;

    if (req.session.user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const getallArticles = await articlesDao.getAllArticles();


        const context = {
            allArticles : getallArticles,
            layout: "blogLayout"
        }

        res.render("blog", context);
    }
});

router.post("/blog", async function(req, res) {

    const user = req.session.user;
    const image = await commentsDao.getCommentImage(user.username);
    const content = req.body.comment;


    console.log(`user ${user} ${JSON.stringify(image)} and content ${content}`);
    await commentsDao.createComments(user,content, articlesID);
    res.redirect("./blog");
});

module.exports = router;