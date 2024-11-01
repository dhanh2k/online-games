const io = require('socket.io')(3000, {
    cors: {
        origin: ["*"]
    },
})

io.on("connection", socket => {
    console.log(socket.id)
    socket.on("send-message", (message, room) => {
        if(room === ''){
            socket.broadcast.emit('receive-message', message)
        }else{
            socket.to(room).emit('receive-message', message)
        }
    })
    socket.on("join-room", room => {
        socket.join(room)
    })
})

