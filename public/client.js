const socket = io(); // connect to server

let name;

let textarea = document.querySelector('#textarea'); // get textarea
let messageArea = document.querySelector('.message__area'); // get message area

do {
  name = prompt('Please enter your name: ');
} while(!name); // if name is empty, prompt again

textarea.addEventListener('keyup', (e) => { 
  if(e.key === 'Enter') {
    sendMessage(e.target.value); // send message to server
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim() // trim removes whitespace
  }

  // Append
  appendMessage(msg, 'outgoing'); 
  textarea.value = ''; // clear textarea
  scrollToBottom();

  // Send to server
  socket.emit('message', msg); 
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div');
  let className = type;
  mainDiv.classList.add(className, 'message');

  let markup = `
    <h4>${msg.user}</h4> 
    <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv); 
}

// Receive messages
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming');
  scrollToBottom();
});

// Scroll to bottom
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}