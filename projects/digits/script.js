let isDragging = false;
let action = 'draw';


function handleDrawContinue(cell){
    if (action === 'draw') {
        cell.classList.add('active');
    } else {
        cell.classList.remove('active');
    }
    predict();
}

function handleMouseDown(e) {
    isDragging = true;
    handleDrawContinue(e.target);
}

function handleMouseEnter(e) {
    if (isDragging) {
        handleDrawContinue(e.target);
    }
}

function handleMouseUp() {
    isDragging = false;
}

function handleTouchMove(e) {
    if (isDragging) {
        const currentCell = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (currentCell && currentCell.classList.contains('cell')) {
            handleDrawContinue(currentCell);
        }
    }
}

cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('mousedown', handleMouseDown);
    cell.addEventListener('mouseenter', handleMouseEnter);
    cell.addEventListener('mouseup', handleMouseUp);
    cell.addEventListener('touchstart', handleMouseDown);
    cell.addEventListener('touchmove', handleTouchMove);
    cell.addEventListener('touchend', handleMouseUp);
});

body = document.querySelector('body');
body.addEventListener('mouseup', handleMouseUp);
body.addEventListener('touchend', handleMouseUp);

pencil = document.querySelector('#pencil');
eraser = document.querySelector('#eraser');
clear = document.querySelector('#clear');

pencil.addEventListener('click', () => {
    action = 'draw';
    pencil.classList.add('active');
    eraser.classList.remove('active');
});

eraser.addEventListener('click', () => {
    action = 'erase';
    pencil.classList.remove('active');
    eraser.classList.add('active');
});

clear.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.classList.remove('active');
    });
});

// prediction model
// when any cell's classlist is changed state, call the predict() method
// and update the prediction

function predict(){
    console.log('predicting');
    prediction = document.querySelector('.prediction');

    inputs = []
    cells.forEach(cell => {
        if (cell.classList.contains('active')) {
            inputs.push(1);
        } else {
            inputs.push(0);
        }
    });

    console.log(inputs);

    output = Math.floor(Math.random() * 10);
    // wait for 200ms
    setTimeout(() => {
        prediction.innerHTML = output;
    }, 500);
}
