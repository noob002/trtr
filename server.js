const io = require('socket.io')(3000, {
    cors: { origin: "*" }
});

let players = {};

io.on('connection', (socket) => {
    console.log('유저 접속:', socket.id);

    socket.on('newPlayer', (data) => {
        players[socket.id] = data;
        // 본인에게 기존 플레이어들 정보 전송
        socket.emit('currentPlayers', players);
        // 타인에게 본인 참가 알림
        socket.broadcast.emit('newPlayerJoined', { id: socket.id, ...data });
    });

    socket.on('move', (data) => {
        if (players[socket.id]) {
            players[socket.id].x = data.x;
            players[socket.id].z = data.z;
            socket.broadcast.emit('playerMoved', { id: socket.id, x: data.x, z: data.z });
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});
