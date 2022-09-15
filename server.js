//const io = require('socket.io')(3000);
const cors = require("cors")
const io = require("socket.io")(3000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const user = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        user[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: user[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', user[socket.id])
        delete user[socket.id]
    })
})