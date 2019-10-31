const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const passwordHash = require("password-hash");

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
        insert into users (username, password, salthashpassword) values(${user.username}, ${user.password}, ${hashedPassword})`
    );

    console.log(`${user.username} and ${user.password} and ${hashedPassword}`);
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
 * Gets the user with the given username and password from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 * @param {string} password the user's password
 */
// seperate out passwordHash from retrieveUserCredentials. password currently = boolean value
async function retrieveUserWithCredentials(username, password) {
    const db = await dbPromise;

        const user = await db.get(SQL`
        select * from users
        where username = ${username}`); 

    return user 


} 

async function createHashedPassword(username, password) {
    const db = await dbPromise;

    try {
        const user = await db.get(SQL`
        select * from users
        where username = ${username}`);

        const hashedPassword = await db.get(SQL`
        select salthashpassword from users 
        where username = ${username}`);

        const hashOnly = Object.values(hashedPassword);
        console.log(hashOnly);

        const hashArray = hashOnly[0]

        const stringifiedHashedPassword = JSON.stringify(hashArray);
        console.log(stringifiedHashedPassword);

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
        set username = ${user.username}, password = ${user.password}, name = ${user.name}
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

// Export functions.
module.exports = {
    createUser,
    retrieveUserById,
    retrieveUserWithCredentials,
    retrieveAllUsers,
    updateUser,
    deleteUser, 
    createHashedPassword
};