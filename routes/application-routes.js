const express = require("express");
const router = express.Router();


router.get("/", async function(req, res) {

    res.locals.title = "GSHK Project!";
    res.locals.message = req.query.message;
    //res.locals.allTestData = await testDao.retrieveAllTestData();

    const context = {
        layout: "homeLayout"
    }
    res.render("home",context);
}); 


module.exports = router;