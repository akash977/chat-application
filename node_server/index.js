
const io=require('socket.io')(8000);

const users={};
//console.log("new user");
io.on('connection',socket=>{
  
    socket.on('new_user_joined',Name=>{
        console.log("New user", Name);
        users[socket.id]=Name;
        socket.broadcast.emit('user-joined',Name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,Name:users[socket.id]});
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});


