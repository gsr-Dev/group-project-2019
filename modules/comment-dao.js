const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");



async function addComments() {

    const db = await dbPromise;

    for (let i = 0; i < comments.length; i++) {

        const com = comments[i];

        await db.run(SQL`
            insert into articles (username, title, date, content)
            values (${com.username}, ${com.date}, ${com.content})`);
    }   

}
async function getCommentImage(username) {
    const db = await dbPromise;

    const image = await db.get(SQL`
        select image from profile 
        where username = ${username}`);

    return image;

}

async function getCommentsByArticlesId (id){
    const db = await dbPromise;

    const comments = await db.all(SQL`
	select p.image, c.content 
    from comments c, profile p
    where c.username = p.username AND c.articleID = ${id}
    order by date desc`);


    return comments;

}

 
async function createComments(user, content,articlesID) {
   const db = await dbPromise;
 
   const result = await db.run(SQL`
       insert into comments (username, date, content, articleID) values(${user.username},datetime('now'),${content}, ${articlesID})`
   );
 
   // Get the auto-generated ID value, and assign it back to the user object.
   user.id = result.lastID;
 
   // return result for testing
   return result;
};

async function getUserComments(user){
   const db = await dbPromise;
 
   const result = await db.all(SQL`
       select id, date, content from comments
       where username = ${user.username}`);
 
   return result;
};
 
async function deleteComments (){
   const db = await dbPromise;
 
   const result= await db.get(SQL`
       delete from comments
       where id = ${id}`);
 
   return result;
};

async function getCommentById(id){
    const db = await dbPromise;
  
    const result = await db.get(SQL`
        select date, content from comments
        where id = ${id}`);
  
    return result;
 };

 /**
 * Deletes all comments by username from the database.
 * 
 * @param {number} username the user's username
 */
async function deleteCommentsByUsername(username) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from comments
        where username = ${username}`);
}
 
module.exports = { 
    addComments,
    getCommentsByArticlesId,
    createComments,
    getUserComments,
    deleteComments,
    getCommentById,
    getCommentImage,
    deleteCommentsByUsername
 }