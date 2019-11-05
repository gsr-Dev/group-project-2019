const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");


router.get("/editArticle", async function (req, res) {
    const articleID = req.query.message;
    console.log(articleID);


    const articleDetails = await articlesDao.getArticleById(articleID);

    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const context = {
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