const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");


router.get("/", async function(req, res) {

    res.locals.title = "GSHK Project!";
    res.locals.message = req.query.message;
    //res.locals.allTestData = await testDao.retrieveAllTestData();
    //await articleDao.addPredefinedArticle();
    const getPredefinedArticles = await articlesDao.getPredefinedArticle();
    
    //console.log(getPredefinedArticles);
    const context = {
        predefinedArticles : getPredefinedArticles,
        layout: "homeLayout"
    }

    res.render("home",context);
}); 


module.exports = router;