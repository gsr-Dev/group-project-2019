const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");

router.get("/resetpsw", function (req, res) {
    res.locals.message = req.query.message;
    res.render("resetpsw");
});

router.post("/resetpsw", async function (req, res) {
    const newPassword = req.body.newPassword;
    const reNewPassword = req.body.confirmPass;
    const sessionData = req.session.email;

    if (newPassword != reNewPassword.toString()) {
        console.log("password not the same");
        res.redirect("./resetpsw?message=Password doesn't match, please try again. ");
    } else {
        try {
            const resetPassword = await userDao.updatePassword(newPassword, sessionData);
            console.log(resetPassword);
            if (resetPassword) {
                res.redirect('/redirect');
                delete sessionData;
            } else {
                res.redirect('/resetpsw');

            }

        } catch (err) {
            console.log(err);
        }
    }

});

router.get('/redirect', function (req, res) {
    res.render('redirect');
})
module.exports = router;
