const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messagesInput=document.getElementById('messagesInput');
const messageContainer=document.querySelector(".container");
var audio=new Audio ('ting.mp3');

const append=(message,position)=>{

    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

const Name = prompt("Enter your Name to join");

socket.emit('new_user_joined', Name);


socket.on('user-joined',Name=>{
    append(`${Name} joined the chat`, 'right')
})

socket.on('recieve',data=>{
    append(`${data.Name} : ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'right')
})

// if form gets submitted,send message to server

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messagesInput.Value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messagesInput.value='';

})



