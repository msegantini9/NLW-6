const Database = require("./config")

const initDb = {
    async init(){
        const db = await Database()

        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            pass TEXT
        )`);

        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT, 
            room INT
        )`);

        await db.exec(`CREATE TABLE answers (
            questionId INT,
            answerId INTEGER PRIMARY KEY AUTOINCREMENT,
            room INT, 
            user INT,
            text TEXT
        )`);

        await db.exec(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room INT,
            pass TEXT
        )`);

        await db.close()
    }
}

initDb.init();

