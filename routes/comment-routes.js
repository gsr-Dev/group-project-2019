const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const usersDao = require("../modules/users-dao.js");
const articlesDao = require("../modules/articles-dao.js");
const commentsDao = require('../modules/comment-dao.js');


router.get("/comments", async function (req, res) {
    const articleID = req.query.message;

    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const getArticleByID = await articlesDao.getArticleById(articleID);

        const commentsByArticlesId = await commentsDao.getCommentsByArticlesId(articleID);

        const avatar = await usersDao.retrieveAvatar(user.username);
    

        const context = {
            profile:avatar,
            article: getArticleByID,
            comments:commentsByArticlesId,
            layout: "blogLayout"
        }

        res.render("comments", context);
    }
});

router.post("/comments", async function (req, res) {

    const user = req.session.user;
    //const image = await commentsDao.getCommentImage(user.username);
    const content = req.body.comment;
    const articlesId = req.body.articlesId;



    console.log(`user ${user} and articlesId ${articlesId} and content ${content}`);
    await commentsDao.createComments(user, content, articlesId);
    res.redirect(`./comments?message=${articlesId}`);
});

router.post("/comments.delete", async function(req, res) {

    const commentID = req.body.commentID;
    console.log(`commentID is ${commentID}`);
    const articlesID = await commentsDao.getArticleByCommentId(commentID);
    console.log(articlesID);

    await commentsDao.deleteComments(commentID);
    
    res.redirect(`./comments?message=${articlesID.articleID}`);
});


module.exports = router;