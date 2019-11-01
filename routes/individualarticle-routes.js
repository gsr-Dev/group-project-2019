const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
const articlesDao = require("../modules/articles-dao.js");
const commentsDao = require('../modules/comment-dao.js');

router.get("/individualArticle", async function (req, res) {
    const articleID = req.query.message;

    const user = req.session.user;

    if (user == undefined) {
        res.redirect("./?message=You have signed out, please sign in again!");
    } else {

        const getArticleByID = await articlesDao.getArticleById(articleID);
        console.log(getArticleByID);

        const context = {
            article: getArticleByID,
            layout: "blogLayout"
        }

        res.render("individualArticle", context);
    }
});

router.post('./individualArticle', async function(req, res){
  
      const  user = req.session.user;
       const image = await commentsDao.getCommentIamge(user.username);
       const content = req.body.comment;
   
    
    console.log(`user ${user} ${image} and content ${content}`);
    await commentsDao.createComments(user, image, content);
   
});



module.exports = router;