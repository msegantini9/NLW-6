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

                await db.run(`INSERT INTO user(
                    room, 
                    pass
                    ) VALUES (
                    ${parseInt(roomId)},
                    "${pass}")
                `)

                userId = await db.get(`SELECT id FROM user WHERE room = ${roomId} and pass = "${pass}"`)
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}/${userId.id}`)
    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        const answers = await db.all(`SELECT * FROM answers WHERE room = ${roomId}`)
        let isNoQuestions = true
        const userId = req.params.user

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }else{
            isNoQuestions = false
        }


        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions, answers:answers, userId: userId})
    },

    async enter(req, res){
        const db = await Database()
        const roomId = req.body.roomId
        const pass = req.body.passId
        let userId

        const passExists = await db.all(`SELECT * FROM user`)
        isPass = passExists.some(passExist => passExist.pass == pass)

        console.log(passExists)
        console.log(isPass)

        if(!isPass){
            await db.run(`INSERT INTO user(
                room, 
                pass
            ) VALUES (
                ${parseInt(roomId)}, 
                "${pass}"
            )`)
        } 

        userId = await db.get(`SELECT id FROM user WHERE room = ${roomId} and pass = "${pass}"`)
        
        res.redirect(`/room/${roomId}/${userId.id}`)
    }
}