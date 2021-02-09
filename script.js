const socket = new WebSocket('wss://toende.herokuapp.com:44760');

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