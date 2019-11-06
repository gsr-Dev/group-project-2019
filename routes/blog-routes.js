const express = require("express");
const router = express.Router();
const commentsDao = require('../modules/comment-dao.js');
// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");

router.get("/blog", async function (req, res) {

    res.locals.message = req.query.message;
    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const allArticles = await articlesDao.getAllArticles();
        console.log(allArticles);


        // //----------------------------------
        // let commentsByArticlesId = [];
        // //Get all comments for all articles
        // for (let counter = 0; counter < allArticles.length; counter++) {
        //     //console.log(allArticles[counter]);
        //     const contentJSON = await commentsDao.getCommentsByArticlesId(res.session.articlesId);
        //     let contentString;
        //     if (!contentJSON[0]) {
        //         contentString = "";
        //     } else {
        //         contentString = (Object.values(contentJSON[0]))[0];
        //     }
        //     //console.log(contentString);

        //     const temp = {
        //         id: res.session.articlesId,
        //         comments: contentString
        //     }

        //     //console.log(temp.comments[0]);

        //     commentsByArticlesId.push(temp);
        // }
        // console.log(commentsByArticlesId);




        //-----------------------------------
            let commentsByArticlesId = [];
                //Get all comments for all articles
                for(let counter = 0; counter <allArticles.length;counter++) {
                    //console.log(allArticles[counter]);
                    const contentJSON = await commentsDao.getCommentsByArticlesId(allArticles[counter].id);
                    let contentString;
                    if (contentJSON[0] == undefined) {
                        contentString = "";
                    } else {
                        contentString = (Object.values(contentJSON[0]))[0];
                    }
                    //console.log(contentString);

                 const temp = {
                     id: allArticles[counter].id,
                    comments: contentString
                }

                //console.log(temp.comments[0]);

                commentsByArticlesId.push(temp);
            }
            console.log(commentsByArticlesId);

        //-----------------------------------
        const context = {
            comments : commentsByArticlesId,
            articles: allArticles,
            layout: "blogLayout"
        }


        res.render("blog", context);
    }
});


// router.post("/blog", async function (req, res) {
//     const articlesId = req.body.articlesId;

//     //----------------------------------
//     //let commentsByArticlesId = [];
//     //Get all comments for all articles
//     //for (let counter = 0; counter < allArticles.length; counter++) {
//         //console.log(allArticles[counter]);
//         const contentJSON = await commentsDao.getCommentsByArticlesId(articlesId);
//         console.log(contentJSON);
//         // let contentString;
//         // if (!contentJSON[0]) {
//         //     contentString = "";
//         // } else {
//         //    contentString = (Object.values(contentJSON[0]))[0];
//         //}
//         //console.log(contentString);

//         // const temp = {
//         //     id: articlesId,
//         //     comments: contentString
//         // }

//         //console.log(temp.comments[0]);

//         //commentsByArticlesId.push(temp);
//     //}
//     // console.log(commentsByArticlesId);
//      res.session.comments = contentJSON;
//      console.log(res.session.comments);


// });

router.post("/blog", async function (req, res) {

    const user = req.session.user;
    const image = await commentsDao.getCommentImage(user.username);
    const content = req.body.comment;
    const articlesId = req.body.articlesId;


    console.log(`user ${user} ${JSON.stringify(image)} and content ${content}`);
    await commentsDao.createComments(user, content, articlesId);
    res.redirect("./blog");
});

module.exports = router;
