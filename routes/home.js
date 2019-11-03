const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");


router.get("/", async function(req, res) {

    res.locals.title = "GSHK Project!";
    res.locals.message = req.query.message;

    //Add dummy articles
    //await articlesDao.addPredefinedArticle();
    const getPredefinedArticles = await articlesDao.getPredefinedArticle();
    
    const context = {
        predefinedArticles : getPredefinedArticles,
        layout: "homeLayout"
    }

    res.render("home",context);
}); 


module.exports = router;