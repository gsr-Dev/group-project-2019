const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");


router.get("/addArticles", function (req, res) {
    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const context = {
            layout: "blogLayout"
        }
        res.render("addArticles", context);
    }
})

router.post("/myArticles", async function (req, res) {

    const user = req.session.user;
    const title = req.body.title;
    const content = req.body.editordata;
    //console.log(`user ${user} and title ${title} and content ${content}`);
    await articlesDao.createArticle(user, title, content);
});



module.exports = router;