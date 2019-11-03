const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const articles = require("./articles-json.js");


async function addPredefinedArticle() {

    const db = await dbPromise;

    for (let i = 0; i < articles.length; i++) {

        const art = articles[i];
        console.log("in addPredefinedArticle");

        await db.run(SQL`
            insert into articles (username, title, date, content)
            values (${art.username}, ${art.title}, ${art.date}, ${art.content})`);
    }   

}

async function getPredefinedArticle() {
    const db = await dbPromise;

    const articles = await db.all(SQL`
        select * from articles`);

    return articles;

}

 
async function createArticle(user, title, content) {
   const db = await dbPromise;
 
   const result = await db.run(SQL`
       insert into articles (username, title, date, content) values(${user.username}, ${title},datetime('now'),${content})`
   );
 
   // Get the auto-generated ID value, and assign it back to the user object.
   user.id = result.lastID;
 
   // return result for testing
   return result;
};

async function getUserArticles(user){
   const db = await dbPromise;
 
   const result = await db.all(SQL`
       select title, date, content from articles
       where username = ${user.username}`);
 
   return result;
};
 
async function deleteArticle (){
   const db = await dbPromise;
 
   const result= await db.get(SQL`
       delete from article
       where id = ${id}`);
 
   return result;
};
 
module.exports = { createArticle, 
    getUserArticles, 
    deleteArticle,
    addPredefinedArticle,
    getPredefinedArticle }
