const express = require('express');
const { Socket } = require('socket.io');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 9000;

app.use(express.static(__dirname + '/public'));

http.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/index.html');
});

//socket

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("connected");

    socket.on('a', (msg) => {
        console.log(msg);
        socket.broadcast.emit('a',msg);
    });
});
