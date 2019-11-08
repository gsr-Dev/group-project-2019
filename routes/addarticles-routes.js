const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const usersDao = require("../modules/users-dao.js");
const articlesDao = require("../modules/articles-dao.js");


router.get("/addArticles", async function (req, res) {
    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const avatar = await usersDao.retrieveAvatar(user.username);

        const context = {
            profile: avatar,
            layout: "blogLayout"
        }
        res.render("addArticles", context);
    }
})

router.post("/addArticles", async function (req, res) {

    const user = req.session.user;
    const title = req.body.title;
    const content = req.body.editordata;

    await articlesDao.createArticle(user, title, content);

});



module.exports = router;