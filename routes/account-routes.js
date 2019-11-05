const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js"); 

router.get("/account", async function (req, res) {
    res.render("account");
})

module.exports = router;
