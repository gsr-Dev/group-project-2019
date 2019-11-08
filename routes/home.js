const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");


router.get("/", async function(req, res) {

    res.locals.title = "GSHK Project!";
    res.locals.message = req.query.message;

    const getallArticles = await articlesDao.getAllArticles();
    
    const context = {
        allArticles : getallArticles,
        layout: "homeLayout"
    }

    res.render("home",context);
}); 


module.exports = router;