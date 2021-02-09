const socket = new WebSocket('ws://localhost:8080');

//things...
var range;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
if(id==null){
    document.location.href = './index.html';
}
console.log(`ID: ${id}`);
socket.addEventListener('open', function (event) {
    socket.send(`login: ${id}`);
});
window.onload = function () {
    range = document.getElementById('range');
    range.disabled = true;
}

var loop;
running = true;
window.addEventListener('keypress', keyDown, true);

function keyDown() {
    var e = window.event;
    switch (e.keyCode) {
        case 32:
            if (running == true) {
                stop();
            }
            break;
    }
}

function start() {
    stop();
    loop = setInterval(pushUp, 50);
}

function stop() {
    if (loop != null) {
        clearInterval(loop);
        console.log(range.value);
        sendToServer("damage: " + range.value + " id: " + id);
        loop = null;
    }
}

let value = 5;
let direction = 0; // 0 = forward, 1 = backwards

function pushUp() {
    range.value = value;
    if (direction == 0) {
        value++;
        if (value >= 10) {
            direction = 1;
        }
    } else if (direction == 1) {
        value--;
        if (value <= 0) {
            direction = 0;
        }
    }
}

function sendToServer(message) {
    socket.send(message);
}

socket.addEventListener('message', (event) => {
    console.log(event.data);
});

window.onclose = function() {
    sendToServer(id + " is closing.");
}