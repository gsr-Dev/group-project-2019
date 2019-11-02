const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");

router.get("/blog", async function (req, res) {

    // const article = req.body.editordata;
    // const user = req.session.unser;
    // console.log(article);
  
    // const file = await blogDao.createArticle(article,user);
    // const createArticle = await blogDao.retrieveArticle(file.lastID);
    
    const getPredefinedArticles = await articlesDao.getPredefinedArticle();

    const context = {
        predefinedArticles : getPredefinedArticles,
        layout: "blogLayout"
    }
    
    res.render("blog", context);
})

module.exports = router;