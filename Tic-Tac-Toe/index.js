const boxes = document.querySelectorAll('.box');
const currPlayer = document.querySelector('.current-player');
const newGameBtn = document.querySelector('.btn');

const ticTacToe = document.querySelector('.tic-tac-toe');
const menu = document.querySelector('.menu');
const vsHumanBtn = document.getElementById('vsHuman');
const vsCompBtn = document.getElementById('vsComp');

let currentPlayer = "X";
let gameGrid;
let gameEnded = false;
let totalMoves = 0;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6]
];

function setPlayer(){
    currPlayer.textContent = `Current Player : ${currentPlayer}`;
}

function swapTurn(){
    if(currentPlayer === "X") currentPlayer = "O";
    else currentPlayer = "X";
}

function startGame(){
    currPlayer.classList.add('active');
    currentPlayer = "X";
    gameEnded = false;
    totalMoves = 0;
    setPlayer();
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => {
        box.textContent = "";
        box.classList.remove('win');
        box.classList.remove('no-pointer');
    });
    newGameBtn.classList.remove('active');
}

function showWin(pos){
    gameEnded = true;
    
    currPlayer.textContent = `Winner : ${currentPlayer}`;

    boxes[pos[0]].classList.add('win');
    boxes[pos[1]].classList.add('win');
    boxes[pos[2]].classList.add('win');
        
    boxes.forEach((box) => {
        box.classList.add('no-pointer');
    })
    
}

function checkGameOver(){
    
    winningPositions.every(pos => {
        if(gameGrid[pos[0]] != "" && gameGrid[pos[0]] === gameGrid[pos[1]] && gameGrid[pos[1]] === gameGrid[pos[2]]){
            showWin(pos);
            return false;
        }
        
        return true;
    });
    
}


function placeMove(index){
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].classList.add('no-pointer');
}

function handleMove(index){
    if(totalMoves == 0)
        newGameBtn.classList.add('active');
    
    if(gameGrid[index] === "" && gameEnded == false){
        placeMove(index);
        totalMoves++;
        checkGameOver();
        
        if(totalMoves == 9 && !gameEnded){
            alert("GAME TIED");
            currPlayer.textContent = "GAME TIED (Start A New Game)";
            gameEnded = true;
        }
        else if(!gameEnded){
            swapTurn();    
            setPlayer();
        }
        
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleMove(index);
    });
});

newGameBtn.addEventListener('click',() => {
    currPlayer.classList.remove('active');
    ticTacToe.classList.remove('active');
    menu.classList.remove('active');
});

vsCompBtn.addEventListener('click', () => {
    alert('iska code likha nhi h bhai...Human wala hi khel le');
});

vsHumanBtn.addEventListener('click', () => {
    menu.classList.add('active');
    ticTacToe.classList.add('active');
    startGame();
});

