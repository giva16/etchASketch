// Min Objectives:
// 1) Render Grids
// 2) Draw on the rendered grids

// Sub Problems from 1)
// draw a 16 x 16 grid


// select container for grid rows
const root = document.querySelector('html');
const container = document.querySelector('.grid-container');

function createSquare(row) {
    let square = document.createElement('div');
    square.classList.add('square');
    row.appendChild(square);
}

// row to contain squares in a flex container that will ensure even space distribution
function createRow() {
    let row = document.createElement('div');
    row.classList.add('row');
    return row;
}

// draw 16 row of 16 squares
// create n row divs and n squares inside the divs to render the grid
function renderGrid(dim) {
    for (let i = 0; i < dim; i++){
        let row = createRow();
        for (let j = 0; j < dim; j++){
            createSquare(row);
        }
        container.appendChild(row);
    }
}

// draw function keeps track of mouseUp and mouseDown events from the root of the document
// so that the squres are only filled when the mouse left button is held
function draw() {
    let mouseIsDown = false;
    root.addEventListener('mousedown', function(){mouseIsDown = true});
    root.addEventListener('mouseup', function() {mouseIsDown = false});
    container.addEventListener('mouseover', function(e){
        if (e.target.classList.contains('square') && mouseIsDown === true) {
            e.target.classList.add('fill');
        }
    });
}

renderGrid(64);
draw();