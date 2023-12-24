const socket = io();
let name;
let textarea = document.querySelector('#textArea');
let messageArea = document.querySelector('.message_area');
do {
    name = prompt('Please enter your name:');
} while (!name);

textarea.addEventListener('keyup',(event)=>{
    if (event.key === 'Enter') {
        sendMessage(event.target.value);
    }

});
function sendMessage(message){
    let msg = {
        user : name,
        message :message.trim()

    }

    //Append

    appendMessage (msg,'outgoing')
    textarea.value = ''
    scrollTobottom()

    //Send to Server

    socket.emit('a',msg)

}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)

}

//Recieve Messages
socket.on('a', (msg) => {
    appendMessage(msg,'incoming')
    scrollTobottom()
});

function scrollTobottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
    