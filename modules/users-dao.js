const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const passwordHash = require("password-hash");


async function createUser(user) {
    const db = await dbPromise;

    // The users password is turned into a hashed password and sent to the project database  
    let hashedPassword = passwordHash.generate(`${user.password}`);

    const result = await db.run(SQL`
    insert into users (username, password, salthashpassword, email, dob, realName, description) values(${user.username}, ${user.password}, ${hashedPassword}, ${user.email}, ${user.dob}, ${user.realName}, ${user.description})`
    );

    return result.lastID;
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
 * Gets the users email from the database

 * @param {string} email  
 */

async function retrieverUserEmail(email) {
    const db = await dbPromise;

    const userEmail = await db.get(SQL`
    select email, username from users 
    where email = ${email}`);

    return userEmail;
}


/**
 * 
 * Gets the user with the given username and password from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 * @param {string} password the user's password
 */

// Seperate out passwordHash from retrieveUserCredentials.
async function verifyCredentials(username, password) {

    try {
        const user = await retrieveUserByUserName(username);
        const isAuthenticated = passwordHash.verify(password, user.salthashpassword);

        if (isAuthenticated) {
            return user;
        }
        else {
            return null;
        }

    } catch (err) {

        return null;
    }
}



/**
* Create a new password and generate hashed password, for the user stored in the session
* @param newPassword  the new password provided by user
* @param sessionData  the user stored on session
*  
*/
async function updatePassword(newPassword, sessionData) {
    const db = await dbPromise;
    //generate new hashed pasword
    let hashedPassword = passwordHash.generate(newPassword);

    await db.run(SQL` 
        update users 
        set password = ${newPassword},salthashpassword = ${hashedPassword}
        where username = ${sessionData} `
    );

    return hashedPassword;
};



/**
 * Gets an array of all users from the database.
 */
async function retrieveAllUsers() {
    const db = await dbPromise;

    const users = await db.all(SQL`select * from users`);

    return users;
}

/**
 * Updates the given user in the database and display updated data in the /account page.
 * 
 * @param user the user to update
 */
async function updateUser(user) {
    const db = await dbPromise;

    let hashedPassword = passwordHash.generate(user.password);

    const selectedUser = await db.get(SQL`
    select username from users
    where id = ${user.id}`);

    await db.run(SQL`
        update users
        set username = ${user.username}, realName = ${user.realName}, password = ${user.password}, dob = ${user.dob}, 
        email = ${user.email}, description = ${user.description}, salthashpassword = ${hashedPassword}
        where id = ${user.id}`);

    //also update the 'profile' table which contains the avatar, as the 'users' table doesn't possess this info.
    await db.run(SQL`
        update profile
        set username = ${user.username}
        where username = ${selectedUser.username}`);
}

/**
 * Deletes the user with the given username from the database.
 * 
 * @param {number} username the user's username
 */
async function deleteUser(username) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from users
        where username = ${username}`);
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

async function updateAvatar(username, imgName) {
    const db = await dbPromise;

    await db.run(SQL`
        update profile
        set image = ${imgName} 
        where username = ${username}`);
}

async function retrieveAvatar(username) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select image from profile
        where username = ${username}`);

    return user;
}

/**
 * Deletes the profile with the given username from the database.
 * 
 * @param {number} username the user's username
 */
async function deleteProfile(username) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from profile
        where username = ${username}`);
}

// Export functions.
module.exports = {
    createUser,
    retrieveUserById,
    retrieveUserByUserName,
    retrieveLastUser,
    retrieveAllUsers,
    retrieverUserEmail,
    retrieveAvatar,
    updatePassword,
    updateUser,
    deleteUser,
    saveAvatar,
    verifyCredentials,
    updateAvatar,
    deleteProfile


};