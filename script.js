// Global state
let mouseIsDown = false;
let rainbowMode = false;

// UI
const root = document.querySelector('html');
const container = document.querySelector('.grid-container');
const clearBtn = document.querySelector('#btnClear');
const createBtn = document.querySelector('#btnCreate');
const rainbowBtn = document.querySelector('#btnRainbow');

// Event Listeners
root.addEventListener('mousedown', () => {mouseIsDown = true;})
root.addEventListener('mouseup', () => {mouseIsDown = false;})
container.addEventListener('mouseover', fillSquare);
clearBtn.onclick = clearGrid;
createBtn.onclick = renderCustomGrid;
rainbowBtn.onclick = toggleRainbow;

// Grid Rendering
function createSquare(row) {
    let square = document.createElement('div');
    square.classList.add('square');
    row.appendChild(square);
}

function clearGrid(){
    for (row of container.children){
        for (square of row.children){
           square.style.backgroundColor = 'white';
        }
    }
}

// create n row divs and n squares inside the divs to render the grid
function renderGrid(dim) {
    resetCanvas();
    for (let i = 0; i < dim; i++){
        let row = createRow();
        for (let j = 0; j < dim; j++){
            createSquare(row);
        }
        container.appendChild(row);
    }
}

// USER CONTROLS
function resetCanvas() {container.innerHTML = '';}

// row to contain squares in a flex container that will ensure even space distribution
function createRow() {
    let row = document.createElement('div');
    row.classList.add('row');
    return row;
}


// adds 'fill' class to fill a square with black background
function fillSquare(event) {
    if (event.target.classList.contains('square') && mouseIsDown === true) {
        if (rainbowMode){
            event.target.style.backgroundColor = randomHexColor();
        } else {
            event.target.style.backgroundColor = 'black';
        }
    }
}

// accept user input in order to render a custom dimension grid
function renderCustomGrid() {
    let dim = prompt("Enter a grid size: ");
    while (!Number.isInteger(parseInt(dim)) || (dim % 1) != 0){
        dim = prompt("Invalid Input! Enter a grid size again (whole number): ");
    }
    renderGrid(parseInt(dim));
}

function randomVal(max) {return Math.floor(Math.random() * max) + 1;}

// Get Random Colors
function getRandomColor() {return [randomVal(255), randomVal(255), randomVal(255)];}

function randomHexColor() {
    let [r, g, b] = getRandomColor();
    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');
    return "#" + hr + hg + hb;
}

function toggleRainbow() {
    if (rainbowMode) {rainbowMode = false;}
    else {rainbowMode = true;}
}



renderGrid(20);