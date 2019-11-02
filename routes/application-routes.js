const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");


router.get("/", async function(req, res) {

    res.locals.title = "GSHK Project!";
    res.locals.message = req.query.message;
    //res.locals.allTestData = await testDao.retrieveAllTestData();
    await userDao.addPredefinedArticle();
    const getPredefinedArticles = await userDao.getPredefinedArticle();
    
    console.log(getPredefinedArticles);
    const context = {
        articles : getPredefinedArticles,
        layout: "homeLayout"
    }

    res.render("home",context);
}); 


module.exports = router;