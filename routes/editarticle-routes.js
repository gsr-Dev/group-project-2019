const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const usersDao = require("../modules/users-dao.js");
const articlesDao = require("../modules/articles-dao.js");


router.get("/editArticle", async function (req, res) {
    const articleID = req.query.message;

    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const articleDetails = await articlesDao.getArticleById(articleID);
        const avatar = await usersDao.retrieveAvatar(user.username);

        const context = {
            profile:avatar,
            article: articleDetails,
            layout: "blogLayout"
        }
        res.render("editArticles", context);
    }
})

router.post("/editArticle", async function (req, res) {

    const articleID = req.body.articleID;
    const title = req.body.title;
    const content = req.body.editordata;
    //console.log(`user ${user} and title ${title} and content ${content}`);
    await articlesDao.editArticle(articleID, title, content);
    //res.redirect("./myArticles");
});



module.exports = router;