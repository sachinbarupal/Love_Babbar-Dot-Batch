const container = document.getElementById('container');
const regBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

regBtn.addEventListener('click', () => {
    container.classList.add('sign-up-active');
});
loginBtn.addEventListener('click', () => {
    container.classList.remove('sign-up-active');
});

const email = document.getElementById('email')
const email_error = document.getElementById('email-error');

email.addEventListener('input', verifyEmail);

function verifyEmail(e) {
    // console.log("typed " + e.target.value);
    if(checkEmail(e) == true){
        email.style.border = "1px solid silver";
        email_error.style.display = "none";
    }
    else{
        email.style.border = "1px solid red";
    }
}

const password = document.getElementById('password')
const password_error = document.getElementById('password-error');

password.addEventListener('input', verifyPassword);

function verifyPassword(e) {
    // console.log("typed " + e.target.value);
    if(e.target.value.length >= 8){
        password.style.border = "1px solid silver";
        password_error.style.display = "none";
    }
    else{
        password.style.border = "1px solid red";
    }
}

function checkEmail(e){
    // let idx = e.target.value.search("@");
    let idx = 1;
    let dot = e.target.value.search(".");
    console.log(idx + " " + dot);
    let len = e.target.value.length;
    if(idx == -1 || dot == -1) return false;
    // if(idx >= len-2) return false;

    else return true;
}