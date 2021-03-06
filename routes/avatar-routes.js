const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const userDao = require("../modules/users-dao.js");

// Setup fs
const fs = require("fs");

// Setup jimp
const jimp = require("jimp");

// Setup multer (files will temporarily be saved in the "temp" folder).
const path = require("path");
const multer = require("multer");
const upload = multer({
    dest: path.join(__dirname, "temp")
});

router.get("/avatar", function (req, res) {

    let fileNames = fs.readdirSync("public/images");
    const allowedFileTypes = [".bmp", ".jpg", ".jpeg", ".png", ".gif"];
    fileNames = fileNames.filter(function (fileName) {
        const extension = fileName.toLowerCase().substring(fileName.lastIndexOf("."));
        return allowedFileTypes.includes(extension);
    });

    const context = {
        images: fileNames,
        action: req.query.action
    };

    res.render("avatar", context);
});

router.post("/avatar", upload.single("imageFile"), async function (req, res) {

    let selectedProfile;

    //Check if user has uploaded a photo, if so save and resize the file to the image folder
    const fileInfo = req.file;

    if (req.file != undefined) {
        // Move the image into the images folder
        const oldFileName = fileInfo.path;
        const newFileName = `./public/images/${fileInfo.originalname}`;
        fs.renameSync(oldFileName, newFileName);

        selectedProfile = fileInfo.originalname;

    } else {
        selectedProfile = req.body.radioImage;
    }


    if (selectedProfile == null) {
        res.redirect("/avatar?message=You must have a profile!");
    } else {
        // Create and save thumbnail
        const image = await jimp.read(`./public/images/${selectedProfile}`);
        image.resize(320, jimp.AUTO);
        await image.write(`./public/images/thumbnails/${selectedProfile}`);

        const user = await userDao.retrieveLastUser();

        await userDao.saveAvatar(user.username, selectedProfile);
        res.redirect("/blog?message=You have successfully created an account!");
    }
});


router.post("/updateAvatar", upload.single("imageFile"), async function (req, res) {

    let selectedProfile;

    //Check if user has uploaded a photo, if so save and resize the file to the image folder
    const fileInfo = req.file;

    if (req.file != undefined) {
        // Move the image into the images folder
        const oldFileName = fileInfo.path;
        const newFileName = `./public/images/${fileInfo.originalname}`;
        fs.renameSync(oldFileName, newFileName);

        selectedProfile = fileInfo.originalname;

    } else {
        selectedProfile = req.body.radioImage;
    }


    if (selectedProfile == null) {
        res.redirect("/avatar?message=You must have a profile!");
    } else {

        // Create and save thumbnail
        const image = await jimp.read(`./public/images/${selectedProfile}`);
        image.resize(320, jimp.AUTO);
        await image.write(`./public/images/thumbnails/${selectedProfile}`);

        const username = req.session.user.username;

        await userDao.updateAvatar(username, selectedProfile);
        res.redirect("/account?message=You have successfully updated your avatar");
    }
});


module.exports = router;