const Database = require('../db/config')

module.exports = {
    async index(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password
        let content = "empty-questions"
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)


        // Verificar se a senha está correta
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if(verifyRoom.pass == password){
            if(action == "delete"){

                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

            }else if(action == "check"){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            
            }
            
            if(questions.length == 0){
                if(questionsRead.length == 0){
                    content = "empty-questions"
                }
            }
            else{
                content = "questions"
            }

            res.redirect(`/room/${roomId}/${content}`)
        } else{
            if(questions.length == 0){
                if(questionsRead.length == 0){
                    content = "empty-questions"
                }
            }
            else{
                content = "questions"
            }

            res.render('pass-incorrect', {roomId: roomId, content: content})
        }
    },
    async create(req, res){
        const db = await Database()

        const question = req.body.question
        const roomId = req.params.room

        db.run(`
            INSERT INTO questions (
                title,
                room,
                read
            ) VALUES (
                '${question}',
                ${roomId},
                0
            )
        `)

        res.redirect(`/room/${roomId}/questions`)
    }
}