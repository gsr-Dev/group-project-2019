const express = require("express");
const router = express.Router();

router.get("/blog", async function (req, res) {
    res.render("blog");
})

module.exports = router;