const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


async function createMessage(senderId, receiverId, content) {
    const db = await dbPromise;

    const result = await db.run(SQL `
       insert into messages (dtm, content, sentId, receivedId) values(datetime('now'), ${content},${senderId},${receiverId})`);

    return result;

    // Get the auto-generated ID value, and assign it back to the user object.
    //messages.id = result.lastID;
}

async function retrieveMessage(id) {
    const db = await dbPromise;

    const result = await db.get(SQL `
        select m.*, u.username
        from messages m, users u
        where m.sentId = u.id
        order by m.dtm desc  
        `)

    return result;

    // Get the auto-generated ID value, and assign it back to the user object.
    //messages.id = result.lastID;
}
async function deleteMessage(id) {
    const db = await dbPromise;

    const result = await db.run(SQL `
    delete from messages
    where id = ${id}
        `);
    console.log(`${result.changes} row(s) were deleted.`);


    // Get the auto-generated ID value, and assign it back to the user object.
    //messages.id = result.lastID;
}

module.exports = { createMessage, retrieveMessage, deleteMessage };