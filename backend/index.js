const express = require('express');
const app = express();

const cors = require('cors');

const PORT = 5000;
const socket = require('socket.io').listen(PORT)
app.use(cors({origin : 'http://localhost:3000'}));
app.get('/test', (req, res) => res.send('yes ok '))

const server = app.listen(PORT,() => {
    console.log(`server start at ${PORT}`)
})



const io = socket(server, {
    cors : {
        origin : '*',
    }
});

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('join', (data) => {
        console.log("Join Room", data)
        socket.join(data)
    })
    socket.on('sent_message', (data) => {
        console.log("Message Send", data)
        socket.to(data.room).emit('receive', data)
    })
    socket.on('disconnect', (data) => {
       console.log('user disconnect')
    })
})