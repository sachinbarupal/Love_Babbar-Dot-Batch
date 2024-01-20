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

output_pass.value = "";
slider.value = 10;
let checkCnt = 1;

handleCheckCnt();
setLength();
setStrength('#ccc');

function setLength(){
    length.innerText = slider.value;

    const min = slider.min;
    const max = slider.max;

    slider.style.backgroundSize = (  (slider.value - min)*100/(max - min) ) + "% 100%";
}

function setStrength(color){
    strength.style.backgroundColor = color;
    strength.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandomInt(min, max){
   return Math.floor(Math.random()*(max - min)) + min;
}

function getRandomDigit(){
    return getRandomInt(0, 10);
}

function getRandomLowerCase(){
    return String.fromCharCode(getRandomInt(97, 123));
}

function getRandomUpperCase(){
    return String.fromCharCode(getRandomInt(65,91));
}

function getRandomSymbol(){
    return symbols[getRandomInt(0, symbols.length)];
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


    if(hasUpper && hasLower && (hasNumbers || hasSymbols) && parseInt(slider.value) >= 8){
        setStrength("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNumbers || hasSymbols) && parseInt(slider.value) >= 8){
        setStrength("#ff0");
    }
    else{
        setStrength("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(output_pass.value);
        copy_msg.innerText = "copied";
    }
    catch(e){
        copy_msg.innerText = "failed";
    }

    copy_msg.classList.add('msg-active');
    setTimeout(()=>{
        copy_msg.classList.remove('msg-active');
    }, 200);
}


function handleCheckCnt(){
    checkCnt = 0;
    allCheck.forEach( (checkbox) => {
        if(checkbox.checked) checkCnt++;
    });

    if(slider.value < checkCnt){
        slider.value = checkCnt;
        setLength();
    }
}


allCheck.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckCnt);
});

slider.addEventListener('input', setLength);

copy_btn.addEventListener('click', () => {
    if(output_pass.value != "") copyContent();
});

function suffle(password){
    for(let i=password.length-1; i>0; i--){
        let j = getRandomInt(0, i+1);
        let tmp = password[i];
        password[i] = password[j];
        password[j] = tmp;
    }
    let str = "";
    password.forEach((el) => {
        str += el;
    });
    return str;
}

gen_btn.addEventListener('click', () => {
    if(checkCnt == 0){
        alert("Please Check at least 1 check-box");
    }

    if(parseInt(slider.value) < checkCnt){
        slider.value = checkCnt;
        setLength();
    }

    let password = "";

    let funArr = [];

    if(upperCaseCheck.checked) funArr.push(getRandomUpperCase);
    if(lowerCaseCheck.checked) funArr.push(getRandomLowerCase);
    if(numbersCheck.checked) funArr.push(getRandomDigit);
    if(symbolsCheck.checked) funArr.push(getRandomSymbol);

    for(let i=0; i<funArr.length; i++){
        password += funArr[i]();
    }

    for(let i=0; i<slider.value - funArr.length; i++){
        let idx = getRandomInt(0,funArr.length);
        password += funArr[idx]();
    }

    password = suffle(Array.from(password));

    output_pass.value = password;
    calcStrength();
});