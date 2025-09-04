let gridData;
let playerRow;
let playerCol;
let moves;
let gameOver;
let treasureRow;
let treasureCol;

const grid = document.getElementById('grid');
const message = document.getElementById('message');
const balloon = document.getElementById('balloon');

// Initialize game
function initGame() {
    gridData = [
        [0, 0, 0, 0],
        [0, 7, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Treasure
    treasureRow = 2;
    treasureCol = 2;
    gridData[treasureRow][treasureCol] = 10;

    // Mines
    let mines = [
        [1,2],
        [3,1]
    ];
    for (let [r,c] of mines) gridData[r][c] = -1;

    playerRow = 1;
    playerCol = 1;
    moves = 5;
    gameOver = false;

    // Reset balloon
    balloon.style.opacity = '1';
    balloon.style.transform = 'scale(1)';

    renderGrid();
}

// Render grid
function renderGrid() {
    grid.innerHTML = '';
    for (let i=0;i<4;i++){
        for (let j=0;j<4;j++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (gridData[i][j]===7) cell.classList.add('player');
            if (gridData[i][j]===10) cell.classList.add('treasure');
            if (gridData[i][j]===-1) cell.classList.add('mine'); // hidden
            cell.textContent = (gridData[i][j]===0 || gridData[i][j]===-1) ? '' : gridData[i][j];
            grid.appendChild(cell);
        }
    }
    if (!gameOver) message.textContent = `Moves left: ${moves}`;
}

// Move player
function move(direction) {
    if (gameOver) return;

    let newRow = playerRow;
    let newCol = playerCol;

    switch(direction){
        case 'U': newRow--; break;
        case 'D': newRow++; break;
        case 'L': newCol--; break;
        case 'R': newCol++; break;
    }

    if (newRow<0 || newRow>=4 || newCol<0 || newCol>=4){
        message.textContent = "😭 You moved outside! Game Over.";
        gameOver = true;
        return;
    }

    if (gridData[newRow][newCol]===-1){
        message.textContent = "💥😭 Stepped on a mine! Game Over.";
        gameOver = true;
        renderGrid();
        return;
    }

    if (gridData[newRow][newCol]===10){
        message.textContent = "🎉🥳🎊 Congratulations! Treasure found!";
        gameOver = true;
        gridData[playerRow][playerCol] = 0;
        gridData[newRow][newCol] = 7;
        renderGrid();
        burstBalloon();
        return;
    }

    // Move player
    gridData[playerRow][playerCol]=0;
    gridData[newRow][newCol]=7;
    playerRow=newRow;
    playerCol=newCol;

    moves--;

    // Hot/Cold hint
    let hint='';
    if (!gameOver){
        let currentDist = Math.abs(playerRow-treasureRow)+Math.abs(playerCol-treasureCol);
        let prevDist = Math.abs(playerRow-treasureRow+1)+Math.abs(playerCol-treasureCol+1);
        hint = currentDist<prevDist ? '🔥 Getting Hotter!' : '❄️ Getting Colder!';
    }

    renderGrid();
    if (!gameOver) message.textContent += ' ' + hint;

    if (moves===0 && !gameOver){
        message.textContent="😭 Out of moves! You lost.";
        gameOver=true;
    }
}

// Balloon burst + confetti
function burstBalloon(){
    balloon.style.transform='scale(0)';
    balloon.style.opacity='0';
    confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
    });
}

// Restart
function restartGame(){
    initGame();
}

// Start game
initGame();