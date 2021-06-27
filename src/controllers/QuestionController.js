const Database = require('../db/config')
const { use } = require('../route')

module.exports = {
    async index(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password
        const userId = req.params.user

        // Verificar se a senha está correta
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        let question = await db.get(`SELECT * FROM answers WHERE answerId = ${questionId}`)

        let userPassword = await db.get(`SELECT * FROM user WHERE id = ${question.user}`)

        console.log(password)
        console.log(userPassword.pass)
        
        if(verifyRoom.pass == password || password == userPassword.pass){
            if(action == "delete"){

                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

            }else if(action == "check"){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
                console.log("Funcionou o update")
            
            }else if(action == "answerDelete"){
                await db.run(`DELETE FROM answers WHERE answerId = ${questionId}`)
                console.log("Funcionou")
            }

            res.redirect(`/room/${roomId}/${userId}`)
            
        } else{
            res.render('pass-incorrect', {roomId: roomId, userId:userId})
        }
    },
    async create(req, res){
        const db = await Database()

        const question = req.body.question
        const roomId = req.params.room
        const userId = req.params.user

        db.run(`INSERT INTO questions (
                title,
                room,
                read
            ) VALUES (
                '${question}',
                ${roomId},
                0
            )
        `)

        res.redirect(`/room/${roomId}/${userId}`)
    },
    async createAnswer(req, res){
        const db = await Database()

        const answer = req.body.answer
        const questionId = req.params.question
        const roomId = req.params.room
        const userId = req.params.user

        db.run(`INSERT INTO answers (
                questionId,
                room,
                user,
                text
            ) VALUES (
                ${questionId},
                ${roomId},
                ${userId},
                '${answer}'
            )`)

        res.redirect(`/room/${roomId}/${userId}`)
    }
}