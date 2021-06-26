const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password.toString()
        let roomId = ""
        let isRoom = true

        while(isRoom){
            roomId = ""
            for(var i = 0; i < 6; i++){
                roomId += Math.floor(Math.random() * 10).toString()
            }

            const roomExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomExistIds.some(roomExistId => roomExistId === roomId)
            
            if(!isRoom){
                await db.run(`INSERT INTO rooms (
                    id, 
                    pass
                ) VALUES (
                    ${parseInt(roomId)}, 
                    '${pass}'
                )`)
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}/empty-questions`)
    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room
        let content = req.params.content
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

        if(questions.length == 0){
            if(questionsRead.length == 0){
                content = "empty-questions"
            }
        }
        else{
            content = "questions"
        }

        res.render("room", {roomId: roomId, content: content, questions: questions, questionsRead: questionsRead})
    },

    async enter(req, res){
        const db = Database()
        const roomId = req.body.roomId
        const pasId = req.body.passId
        let content = "empty-questions"
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

        if(questions.length == 0){
            if(questionsRead.length == 0){
                content = "empty-questions"
            }
        }
        else{
            content = "questions"
        }

        res.redirect(`/room/${roomId}/${content}`)
    }
}