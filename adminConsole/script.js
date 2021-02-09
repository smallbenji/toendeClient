var passwordField;

window.onload = function () {
    passwordField = document.getElementById('passwordField');

    passwordField.addEventListener('keyup', ()=>{
        onChange();
    });
}

function onChange(){
    if(passwordField.value == "lærer"){
        document.location.href = './console.html?paswd=exodust'
    }
}