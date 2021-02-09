const socket = new WebSocket('ws://toende.herokuapp.com:8080');

socket.addEventListener('message', function (event) {
    console.log(event.data);
    if (event.data.startsWith("id:")) {
        var message = event.data.split(": ");
        console.log(message[1]);
        document.location.href = `toende.html?id=${message[1]}`;
    }
});

function submit() {
    if (!document.getElementById('username').value == "") {
        socket.send(`user: ${document.getElementById('username').value}`);
    }
}