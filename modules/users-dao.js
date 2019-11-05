const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const passwordHash = require("password-hash");



/**
 * Inserts the given user into the database. Then, reads the ID which the database auto-assigned, and adds it
 * to the user.
 * 
 * @param user the user to insert
 * @param password 
 */
async function createUser(user) {
    const db = await dbPromise;

    // The users password is turned into a hashed password and sent to the project database  
    let hashedPassword = passwordHash.generate(`${user.password}`)
    console.log(`created hashedpassword ${hashedPassword} for ${user.password}`);

    const result = await db.run(SQL`
    insert into users (username, password, salthashpassword, email, dob, realName, description) values(${user.username}, ${user.password}, ${hashedPassword}, ${user.email}, ${user.dob}, ${user.realName}, ${user.description})`
    );

    return result.lastID;
    //Get the auto-generated ID value, and assign it back to the user object.
    //user.id = result.lastID;

    //return result for testing
    // return result;
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

// seperate out passwordHash from retrieveUserCredentials. password currently = boolean value
async function verifyCredentials(username, password) {
    const db = await dbPromise;

    try {
        const user = await retrieveUserByUserName(username);
        const hashedPassword = await db.get(SQL`
        select salthashpassword from users 
        where username = ${username}`);
        //Object.values returns the hash string as an array
        const hashOnly = Object.values(hashedPassword);

        const hashArray = hashOnly[0];

        const stringifiedHashedPassword = JSON.stringify(hashArray);

        //This removes the quotations from the hash string in order for verify() to compare it to the password input by the user 
        string = stringifiedHashedPassword.slice(1, -1);
        console.log(string);
        console.log(password);
        //Verifies that the password the user input matches the hashed password in the database
        if (passwordHash.verify(password, string)) {
            return user;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}


/**
     * 
     * @param newPassword  
     * @param sessionData
     *  
     */

async function updatePassword(newPassword, sessionData) {
    const db = await dbPromise;
    let hashedPassword = passwordHash.generate(newPassword);
    console.log(hashedPassword);
    await db.run(SQL` 
        update users 
        set salthashpassword = ${hashedPassword}
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




// Export functions.
module.exports = {
    createUser,
    retrieveUserById,
    retrieveUserByUserName,
    retrieveLastUser,
    retrieveAllUsers,
    retrieverUserEmail,
    updatePassword,
    updateUser,
    deleteUser,
    saveAvatar,
    verifyCredentials


};