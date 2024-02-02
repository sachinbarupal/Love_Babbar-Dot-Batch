const boxes = document.querySelectorAll('.box');
const currPlayer = document.querySelector('.current-player');
const newGameBtn = document.querySelector('.btn');

const ticTacToe = document.querySelector('.tic-tac-toe');
const menu = document.querySelector('.menu');
const vsHumanBtn = document.getElementById('vsHuman');
const vsCompBtn = document.getElementById('vsComp');

const selectLvl = document.querySelector('.select-lvl');
const lvlBtns = document.querySelectorAll('.lvl-btn');


let currentPlayer = "X";
let gameGrid;
let totalMoves = 0;
let playingAi = false;
let maxDepth = -1;


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
    totalMoves = 0;
    setPlayer();
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => {
        box.textContent = "";
        box.classList.remove('win');
        box.classList.remove('no-pointer');
    });
    newGameBtn.classList.add('active');
}

function showWin(pos){    
    currPlayer.textContent = `Winner : ${currentPlayer}`;

    boxes[pos[0]].classList.add('win');
    boxes[pos[1]].classList.add('win');
    boxes[pos[2]].classList.add('win');
        
    boxes.forEach((box) => {
        box.classList.add('no-pointer');
    })
    
}

function checkGameOver(){
    let winPos;
    winningPositions.every(pos => {
        if(gameGrid[pos[0]] != "" && gameGrid[pos[0]] === gameGrid[pos[1]] && gameGrid[pos[1]] === gameGrid[pos[2]]){
            winPos = pos;
            return false;
        }
        return true;
    });
    return winPos;
}

function placeMove(index){
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].classList.add('no-pointer');
}

function handleMove(index){
    let result = checkGameOver();
    if(result != undefined) return;
    
    if(gameGrid[index] === ''){
        placeMove(index);
        totalMoves++;
        let winPos = checkGameOver();
        if(winPos != undefined){
            showWin(winPos);
        }
        else if(totalMoves == 9){
            alert("GAME TIED");
            currPlayer.textContent = "GAME TIED (Start A New Game)";
            gameEnded = true;
        }
        else if(playingAi){
            swapTurn();
            setPlayer();

            highlight();
        
            setTimeout(() => {
                bestMove();
                let winPos = checkGameOver();
                if(winPos != undefined){
                    showWin(winPos);
                }
                else if(totalMoves == 9){
                    alert("GAME TIED");
                    currPlayer.textContent = "GAME TIED (Start A New Game)";
                    gameEnded = true;
                }
                else{
                    swapTurn();
                    setPlayer();    
                }
            }, 700);
        }
        else{
            swapTurn();    
            setPlayer();
        }
    }
}

function bestMove(){
    let bestScore = -Infinity;
    let bestMove;
    for(let i=0; i<9; i++){
        if(gameGrid[i] === ''){

            gameGrid[i] = 'O';
            totalMoves++;
            let score = miniMax(0, true);
            totalMoves--;
            gameGrid[i] = '';
            if(score > bestScore){
                bestScore = score;
                bestMove = i;
            }
        }
    }
    totalMoves++;
    placeMove(bestMove);
}



function miniMax(depth, player){
    if(maxDepth == 0) return 1;
    if(maxDepth == 1 && depth > maxDepth) return 0;
    let result = checkGameOver();
    if(result != undefined){
        return gameGrid[result[0]] === 'X' ? -1 : 1;
    }
    else if(totalMoves == 9){
        return 0;
    }
    
    if(player){
        let bestScore = Infinity;
        for(let i=0; i<9; i++){
            if(gameGrid[i] === ''){

                gameGrid[i] = 'X';
                totalMoves++;
                let score = miniMax(depth+1, false);
                totalMoves--;
                gameGrid[i] = '';

                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }

    let bestScore = -Infinity;
    for(let i=0; i<9; i++){
        if(gameGrid[i] === ''){

            gameGrid[i] = 'O';
            totalMoves++;
            let score = miniMax(depth+1, true);
            totalMoves--;
            gameGrid[i] = '';

            bestScore = Math.max(score, bestScore);
        }
    }
    return bestScore;
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
    newGameBtn.classList.remove('active');
    selectLvl.classList.remove('active');
});

vsCompBtn.addEventListener('click', () => {
    if(!selectLvl.classList.contains('active')){
        selectLvl.classList.add('active');
        playingAi = true;
    }else{
        selectLvl.classList.remove('active');
        playingAi = false;
    }
});

vsHumanBtn.addEventListener('click', () => {
    menu.classList.add('active');
    ticTacToe.classList.add('active');
    playingAi = false;
    startGame();
});

function levelSelection(index){
    menu.classList.add('active');
    ticTacToe.classList.add('active');
    maxDepth = index;
    startGame();
}

lvlBtns.forEach((btn, index) => {
    btn.addEventListener('click', () =>{
        levelSelection(index);
    });
})

function highlight(){
    let idx = [];
    boxes.forEach((box, index) => {
        if(box.textContent === '') idx.push(index);
    });
    
    let blinks = 5;
    blink(blinks, idx);
}
function blink(blinks, idx) {
    if(blinks >= 0){
        setTimeout(() => { blink(blinks - 1, idx); }, 100);
        const i = Math.floor(Math.random() * idx.length);
        boxes[idx[i]].classList.add('highlight');
        setTimeout(() => {
            boxes[idx[i]].classList.remove('highlight');
        }, 100);
    }
}