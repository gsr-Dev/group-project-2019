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
        //console.log(getUserArticle);

        const context = {
            userArticle : getUserArticle,
            layout: "blogLayout"
        }

        res.render("myarticles", context);
    }
})

router.post("/myArticles", async function (req, res) {

    const user = req.session.user;
    const title = req.body.title;
    const content = req.body.editordata;
    //console.log(`user ${user} and title ${title} and content ${content}`);
    const file = await articlesDao.createArticle(user, title, content);
});



module.exports = router;