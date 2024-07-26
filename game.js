const playerOne = 'X';
const playerTwo = 'O';

let turn = 1; 
let cell_rows = 1;
let row, col = 0;

const game_tracker = document.querySelector('.tracker');

const cells = document.querySelectorAll('.left,.middle,.right');
cells.forEach( (cell, index)=> {
    if(index <= 2){
        // row 1
        col = 1
    }else if(index <= 5){
        // row 2
        col = 2
    }else{
        // row 3
        col = 3
    }

    row = cell_rows;
    
    cell.setAttribute('data-row', row);
    cell.setAttribute('data-col', col);
    
    cell_rows++;
    
    if (cell_rows == 4){
        cell_rows = 1;
    }

    console.log(cell);
    cell.addEventListener('click', boxClick);
});

const Oneboard = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

const Twoboard = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

function boxClick(event){
    const cell = event.target;

    const position = `Row ${cell.getAttribute('data-row')}, Column ${cell.getAttribute('data-col')}`;
    
    if(cell.textContent.trim() === ''){
        if(turn == 1){
            const item_list = document.createElement('li');
            item_list.textContent = 'Player One : Inserted into ' + position; 
            game_tracker.appendChild(item_list);
            
            cell.textContent = playerOne;
            Oneboard[cell.getAttribute('data-row')-1][cell.getAttribute('data-col')-1] = 1;
            print2DArray(Oneboard);
            turn = 0;
        }else{
            cell.textContent = playerTwo;
            turn = 1;
        }
    }

    isGameOver();
    
}

const button_reset = document.querySelector('.button_reset');
button_reset.addEventListener('click', (event) => {
    cells.forEach( cell => {
        cell.textContent = '';
    });

    game_tracker.innerHTML = '';
});

function isGameOver() {
    const winConditions = [
        [[1,1,1],
        [0,0,0],
        [0,0,0]],

        [[0,0,0],
        [1,1,1],
        [0,0,0]],

        [[0,0,0],
        [0,0,0],
        [1,1,1]],

        [[1,0,0],
        [1,0,0],
        [1,0,0]],

        [[0,1,0],
        [0,1,0],
        [0,1,0]],

        [[0,0,1],
        [0,0,1],
        [0,0,1]],

        [[1,0,0],
        [0,1,0],
        [0,0,1]],

        [[0,0,1],
        [0,1,0],
        [1,0,0]]
    ];

    winConditions.forEach( condition => {
        if (arrays2DEqual(condition, Oneboard)){
            console.log("player one wins");
        }
    });
    
}


function makeBoard(player){
    const board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    cells.forEach(cell => {
        if(cell.textContent == player){
            const row = cell.getAttribute('data-row');
            const col = cell.getAttribute('data-col'); 
            board[row-1][col-1] = 1;
        }
    });

    print2DArray(board);
    return board;
}

function print2DArray(array) {

    let text = "";

    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            text += array[r][c] + "|";
        }
        text+='\n';
    }

    console.log(text);
}


function arrays2DEqual(arr1, arr2) {
    // Check if both arrays are the same reference
    if (arr1 === arr2) return true;

    // Check if either is not an array or have different lengths
    if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) return false;

    // Check if each row is an array and has the same length
    for (let i = 0; i < arr1.length; i++) {
        if (!Array.isArray(arr1[i]) || !Array.isArray(arr2[i]) || arr1[i].length !== arr2[i].length) return false;

        // Compare each element in the row
        for (let j = 0; j < arr1[i].length; j++) {
            if (arr1[i][j] !== arr2[i][j]) return false;
        }
    }

    return true;
}