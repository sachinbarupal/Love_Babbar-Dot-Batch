const boxes = document.querySelectorAll('.box');
const currPlayer = document.querySelector('.current-player');
const newGameBtn = document.querySelector('.btn');

let currentPlayer = "X";
let gameGrid;
let gameEnded = false;

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
    currentPlayer = "X";
    gameEnded = false;
    setPlayer();
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => {
        box.textContent = "";
        box.classList.remove('win');
        box.classList.remove('no-pointer');
    });
    newGameBtn.classList.remove('active');
}
startGame();

function showWin(pos){
    gameEnded = true;
    
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
    if(!newGameBtn.classList.contains('active'))
        newGameBtn.classList.add('active');

    if(gameGrid[index] === "" && gameEnded == false){
        placeMove(index);
        swapTurn();    
        setPlayer();
        
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleMove(index);
    });
});

newGameBtn.addEventListener('click', startGame);