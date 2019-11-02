const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const passwordHash = require("password-hash");
const articles = require("./articles.js");

/**
 * Inserts the given user into the database. Then, reads the ID which the database auto-assigned, and adds it
 * to the user.
 * 
 * @param user the user to insert
 */
async function createUser(user) {
    const db = await dbPromise;
    console.log("in createUser");

    // The users password is turned into a hashed password and sent to the project database  
    let hashedPassword = passwordHash.generate(`${user.password}`)

    const result = await db.run(SQL`
        insert into users (username, password, salthashpassword, email, dob, realName, description) values(${user.username}, ${user.password}, ${hashedPassword}, ${user.email}, ${user.dob}, ${user.realName}, ${user.description})`
    );

    console.log(`${user.username} and ${user.password} and ${hashedPassword} and ${user.dob} and ${user.realName} and ${user.description}`);
    // Get the auto-generated ID value, and assign it back to the user object.
    user.id = result.lastID;

    // return result for testing
    return result;
}

/**
 * Gets the user with the given id from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {number} id the id of the user to get.
 */
async function retrieveUserById(id) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where id = ${id}`);

    return user;
}

/**
 * Gets the user with the given username from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 */
async function retrieveUserByUserName(username) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where username = ${username}`);

    return user;
}
/**
 * 
 * Gets the user with the given username and password from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 * @param {string} password the user's password
 */

 // seperate out passwordHash from retrieveUserCredentials. password currently = boolean value
async function verifyCredentials(username, password) {
    const db = await dbPromise;

    try {
        const user = await retrieveUserByUserName(username);

        const hashedPassword = await db.get(SQL`
        select salthashpassword from users 
        where username = ${username}`);

        //Object.values returns an array
        const hashOnly = Object.values(hashedPassword);
        console.log(hashOnly);

        const hashArray = hashOnly[0];

        const stringifiedHashedPassword = JSON.stringify(hashArray);
        console.log(stringifiedHashedPassword);

        //get rid of quotation marks
        str = stringifiedHashedPassword.slice(1, -1);
        console.log(str);

        if (passwordHash.verify(password, str)) {
            return user;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

/**
 * Gets an array of all users from the database.
 */
async function retrieveAllUsers() {
    const db = await dbPromise;

    const users = await db.all(SQL`select * from users`);

    return users;
}

/**
 * Updates the given user in the database.
 * 
 * @param user the user to update
 */
async function updateUser(user) {
    const db = await dbPromise;

    await db.run(SQL`
        update users
        set username = ${user.username}, password = ${user.password}, realName = ${user.realName}
        where id = ${user.id}`);
}

/**
 * Deletes the user with the given id from the database.
 * 
 * @param {number} id the user's id
 */
async function deleteUser(id) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from users
        where id = ${id}`);
}

async function retrieveLastUser() {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        order by id desc limit 1`);

    return user;
}

async function saveAvatar(username, imgName) {
    const db = await dbPromise;

    await db.run(SQL`
    insert into profile (username, image) values(${username}, ${imgName})`);
}


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

// Export functions.
module.exports = {
    createUser,
    retrieveUserById,
    retrieveUserByUserName,
    retrieveAllUsers,
    updateUser,
    deleteUser,
    retrieveLastUser,
    saveAvatar,
    verifyCredentials,
    addPredefinedArticle,
    getPredefinedArticle
};