const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const articles = require("./articles-json.js");


async function addPredefinedArticle() {

    const db = await dbPromise;

    for (let i = 0; i < articles.length; i++) {

        const art = articles[i];

        await db.run(SQL`
            insert into articles (username, title, date, content)
            values (${art.username}, ${art.title}, ${art.date}, ${art.content})`);
    }

}

async function getAllArticles() {
    const db = await dbPromise;

    const articles = await db.all(SQL`
        select * from articles
        order by date desc`);

    return articles;

}


async function createArticle(user, title, content) {
    const db = await dbPromise;

    const result = await db.run(SQL`
       insert into articles (username, title, date, content) values(${user.username}, ${title},datetime('now'),${content})`
    );

    // Get the auto-generated ID value, and assign it back to the user object.
    user.id = result.lastID;

    return result;
};

async function getUserArticles(user) {
    const db = await dbPromise;

    const result = await db.all(SQL`
       select * from articles
       where username = ${user.username}
       order by date desc`);

    return result;
};

async function countUserArticles(user) {
    const db = await dbPromise;

    const result = await db.all(SQL`
        select count(id) as counter from articles
        where username = ${user.username}`
    );

    return result;
};


//Delete individual article
async function deleteArticle(id) {
    const db = await dbPromise;

    const result = await db.run(SQL`
       delete from articles
       where id = ${id}`);

    return result;
};

/**
 * Deletes all articles by username from the database.
 * 
 * @param {number} username the user's username
 */
async function deleteArticlesByUsername(username) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from articles
        where username = ${username}`);
}

async function getArticleById(id) {
    const db = await dbPromise;

    const result = await db.get(SQL`
        select * from articles
        where id = ${id}`);

    return result;
};

async function editArticle(articleID, title, content) {
    const db = await dbPromise;

    await db.run(SQL`
        update articles
        set title = ${title}, content = ${content}
        where id = ${articleID}`
    );
}

module.exports = {
    createArticle,
    getUserArticles,
    countUserArticles,
    deleteArticle,
    deleteArticlesByUsername,
    addPredefinedArticle,
    getAllArticles,
    getArticleById,
    editArticle
}
