const express = require('express')
const QuestionController = require("./controllers/QuestionController")
const RoomController = require("./controllers/RoomController")

const route = express.Router()

route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

route.post('/create-room', RoomController.create)
route.get('/room/:room/:user', RoomController.open)
route.post('/enterroom', RoomController.enter)

route.post('/question/create/:room/:user', QuestionController.create)
route.post('/question/create/:room/:user/:question', QuestionController.createAnswer)
route.post('/question/:room/:user/:question/:action', QuestionController.index)


module.exports = route