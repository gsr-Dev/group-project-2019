const express = require("express");
const router = express.Router();

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

    let fileNames = fs.readdirSync( "public/images"); 
    const allowedFileTypes = [".bmp", ".jpg", ".jpeg", ".png", ".gif"];
    fileNames = fileNames.filter(function(fileName) {
        const extension = fileName.toLowerCase().substring(fileName.lastIndexOf("."));
        return allowedFileTypes.includes(extension);
    });
    
    const context = {
        images: fileNames
    };

    res.render("avatar", context);
});

router.post("/uploadImage", upload.single("imageFile"), async function(req, res) {

    const fileInfo = req.file;

    // Move the image into the images folder
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);

    // Create and save thumbnail
    const image = await jimp.read(newFileName);
    image.resize(320,jimp.AUTO);
    await image.write(`./public/images/${fileInfo.originalname}`);
    res.redirect("/avatar");
});


module.exports = router;