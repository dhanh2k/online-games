// import { io } from "socket.io-client"

const joinRoomButton = document.getElementById("join-room-button")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")
const messages = document.getElementById('messages');

const socket = io('http://localhost:3000')
socket.on("connect", () => {
    displayMessage(`You connected with id: ${socket.id}`)
})

socket.on('receive-message', (message) => {
    displayMessage(message)
})

form.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value
    const room = roomInput.value

    if(message === "") return
    displayMessage(message)
    socket.emit('send-message', message, room)
    messageInput.value = ""
})

joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value
    socket.emit('join-room', room)
})

function displayMessage(msg){
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}
