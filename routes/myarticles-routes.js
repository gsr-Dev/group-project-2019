const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
//const articlesDao = require("../modules/articles-dao.js");

router.get("/myArticles", async function (req, res) {

    if (req.session.user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

    // const article = req.body.editordata;
    // const user = req.session.unser;
    // console.log(article);
  
    // const file = await blogDao.createArticle(article,user);
    // const createArticle = await blogDao.retrieveArticle(file.lastID);
    
    //const getPredefinedArticles = await articlesDao.getPredefinedArticle();

    const context = {
        //predefinedArticles : getPredefinedArticles,
        layout: "blogLayout"
    }
    
    res.render("myarticles", context);
}
})

module.exports = router;