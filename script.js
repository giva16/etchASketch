// Global state
let mouseIsDown = false;
let rainbowMode = false;

// UI
const root = document.querySelector('html');
const container = document.querySelector('.grid-container');
const clearBtn = document.querySelector('#btnClear');
const createBtn = document.querySelector('#btnCreate');
const rainbowBtn = document.querySelector('#btnRainbow');
const colorModeBtn = document.querySelector('#btnColor');
const colorSelector = document.querySelector("#color");
const sizeSlider = document.querySelector("#size")
const sizeIndicator = document.querySelector("#currSize");

// Event Listeners
root.addEventListener('mousedown', () => {mouseIsDown = true;});
root.addEventListener('mouseup', () => {mouseIsDown = false;});
container.addEventListener('mouseover', fillSquare);
clearBtn.onclick = clearGrid;
colorModeBtn.onclick = toggleColor;
rainbowBtn.onclick = toggleRainbow;
sizeSlider.onmousemove = (e) => updateSize(e.target.value);
sizeSlider.onchange = changeSize;


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
function renderGrid() {
    resetCanvas();
    for (let i = 0; i < sizeSlider.value; i++){
        let row = createRow();
        for (let j = 0; j < sizeSlider.value; j++){
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
            event.target.style.backgroundColor = colorSelector.value;
        }
    }
}

function toggleRainbow() {
        rainbowMode = true;
        rainbowBtn.classList.add('selected');
        colorModeBtn.classList.remove('selected');
}

function toggleColor() {
    rainbowMode = false;
    colorModeBtn.classList.add('selected');
    rainbowBtn.classList.remove('selected');
}

// Change size value on text
function updateSize(value) {
    sizeIndicator.innerHTML = `${value} x ${value}`;
}

// accept user input via slider to render a custom dimension grid
function changeSize() {
    clearGrid();
    renderGrid();
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


renderGrid();