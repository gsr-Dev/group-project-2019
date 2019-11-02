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








 
async function createArticle(content, user) {
   const db = await dbPromise;
 
   const result = await db.run(SQL`
       insert into article (dtm, content, username) values(date('now'),${content},${user.usernmae})`
   );
 
   console.log();
   // Get the auto-generated ID value, and assign it back to the user object.
   article.id = result.lastID;
 
   // return result for testing
   return result;
};
async function retrieveArticle (){
   const db = await dbPromise;
 
   const result = await db.run(SQL`
       select * from article
       where id = ${id}`);
 
   return result;
};
 
async function deleteArticle (){
   const db = await dbPromise;
 
   const result= await db.get(SQL`
       delete from article
       where id = ${id}`);
 
   return result;
};
 
module.exports = { createArticle, retrieveArticle, deleteArticle,
    addPredefinedArticle,
    getPredefinedArticle }
