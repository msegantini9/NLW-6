const express = require('express')
const route = require('./route')
const path = require('path')

const server = express()

//seta a view engine como ejs
server.set('view engine', 'ejs')

server.use(express.static("public"))

//seta o caminho da pasta views, como a pasta src/views com o path.join()
server.set('views', path.join(__dirname, 'views'))

//Middleware
server.use(express.urlencoded({extended: true}))

//usa o route como arquivo das rotas
server.use(route)

//abre a porta 3000 para rodar o projeto
server.listen(3000, () => console.log('RODANDO'))