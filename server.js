"use strict"

const app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var fs = require('fs')
let express = require('express')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('pages/editor')
})

io.sockets.on('connection', function(socket) {
	socket.emit('message', 'Vous êtes bien connecté')

	socket.on('saveJSON', function(data) {
		data = JSON.stringify(data)
		fs.writeFileSync("/js/editor/maps/" + data.title + ".json", data, "UTF-8")
	})
})

server.listen(8080)