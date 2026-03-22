const io = require('socket.io')(3000);
const players = {}; // 접속된 플레이어들 정보

io.on('connection', (socket) => {
    console.log('새로운 유저 접속:', socket.id);
    
    // 새 유저 생성
    players[socket.id] = { x: 0, y: 0, z: 0 };
    
    // 모든 유저에게 새 유저 알림
    io.emit('currentPlayers', players);

    // 유저가 움직일 때 위치 업데이트
    socket.on('playerMovement', (movementData) => {
        players[socket.id].x = movementData.x;
        players[socket.id].z = movementData.z;
        socket.broadcast.emit('playerMoved', { id: socket.id, x: movementData.x, z: movementData.z });
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});
