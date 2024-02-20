const express = require('express')
const app = express()
const socketIo = require('socket.io')
const corts = require('cors')
const { createServer } = require('http')


const PORT = 4000

const server = createServer(app)
const io = socketIo(server, { cors: { origin: '*' } })

io.on('connection', (socket) => {
    socket.emit('connected', socket.id)

    socket.on('message', (messages) => {
        console.log(messages);
        io.emit('messageReceived', messages)
    })
})



server.listen(PORT, () => console.log(`Server is running on ${PORT}`))