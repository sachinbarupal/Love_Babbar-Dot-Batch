const slider = document.getElementById('slider');
const length = document.getElementById('length');
const gen_btn = document.getElementById('gen-btn');
const output_pass = document.querySelector('[data-passwordDisplay]');

const copy_msg = document.querySelector('[data-copyMsg');
const copy_btn = document.getElementById('data-copy');


const upperCaseCheck = document.querySelector('#uppercase');
const lowerCaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const allCheck = document.querySelectorAll('input[type = checkbox]');


const strength = document.querySelector('[data-strength]');
const symbols = "!@$%^&*()_*?/[\]+=-<>,~";

output_pass.value = "15";



slider.oninput = function setLength(){
    length.innerText = slider.value;
}

function setStrength(color){
    strength.style.backgroundColor = color;
}

function getRandomInt(min, max){
   return Math.floor(Math.random()*(max - min)) + min;
}

function getRandomDigit(){
    return getRandomInt(0, 9);
}

function getRandomLowerCase(){
    return String.fromCharCode(getRandomInt(97, 123));
}

function getRandomUpperCase(){
    return String.fromCharCode(getRandomInt(65,91));
}

function getRandomSymbol(){
    return syms[getRandomInt(0, syms.length)];
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumbers = false;
    let hasSymbols = false;

    if(upperCaseCheck.checked) hasUpper = true;
    if(lowerCaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNumbers = true;
    if(symbolsCheck.checked) hasSymbols = true;


    if(hasUpper && hasLower && (hasNumbers || hasSymbols) && pass_len >= 8){
        setStrength("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNumbers || hasSymbols) && pass_len >= 8){
        setStrength("#ff0");
    }
    else{
        setStrength("f00");
    }
}

copy_btn.addEventListener('click', copyToClipboard);

function copyToClipboard(){
    navigator.clipboard.writeText(output_pass.value);
    copy_msg.style.display = 'block';
}
