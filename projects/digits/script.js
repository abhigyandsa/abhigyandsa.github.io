let isDragging = false;
let action = 'draw';


function handleDrawContinue(cell) {
    if (action === 'draw') {
        cell.classList.add('active');
    } else if (action === 'erase') {
        cell.classList.remove('active');
    }
    output = document.querySelector('.output');
    output.style.opacity = 1;
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
    numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    createBars();
    output = document.querySelector('.output');
    output.style.opacity = 0;
});

// prediction model
// when any cell's classlist is changed state, call the predict() method
// and update the prediction

let numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function createBars() {
    const histogramContainer = document.getElementById('histogram-container');

    let num_sum = numbers.reduce((a, b) => a + b, 0);

    // Clear existing bars
    histogramContainer.innerHTML = '';
    if (num_sum !== 0) {
        numbers.forEach((number, index) => {
            const bigbar = document.createElement('div');
            bigbar.className = 'bigbar';
            histogramContainer.appendChild(bigbar);
            const pp = document.createElement('p');
            pp.style.fontSize = '16px';
            pp.style.margin = '0';
            pp.style.padding = '0';
            pp.innerHTML = Math.round((number * 100) / num_sum) + '%';
            bigbar.appendChild(pp);
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = (number / num_sum) * 1024 + 'px';
            bigbar.appendChild(bar);
            const p = document.createElement('p');
            p.innerHTML = index;
            p.style.fontSize = '16px';
            p.style.margin = '0 0 0 8px';
            bigbar.appendChild(p);
        });
    }
    else {
        const bigbar = document.createElement('div');
        bigbar.className = 'bigbar';
        histogramContainer.appendChild(bigbar);
        const p = document.createElement('p');
        p.style.textAlign = 'center';
        p.innerHTML = '🤔';
        p.style.fontSize = '128px';
        p.style.margin = '0 0 0 8px';
        bigbar.appendChild(p);
    }
}

function updateHistogram(newArray) {
    numbers = newArray;
    createBars();
}

async function loadModel() {
    const model = await tf.loadLayersModel('tfjs_model/model.json');
    return model;
}

async function predict() {
    console.log('predicting');
    prediction = document.querySelector('.prediction');

    const model = await loadModel();

    inputs = []
    cells.forEach(cell => {
        if (cell.classList.contains('active')) {
            inputs.push(1);
        } else {
            inputs.push(0);
        }
    });

    let unflattened = [];

    for (let i = 0; i < 28; i++) {
        unflattened.push(inputs.slice(i * 28, (i + 1) * 28));
    }

    let prediction_res = model.predict(tf.tensor2d([inputs]));
    let probabilities = prediction_res.dataSync();

    console.log(unflattened);
    // console.log(inputs);

    output = probabilities;
    // wait for 200ms
    setTimeout(() => {
        prediction.innerHTML = output.indexOf(Math.max(...output));
        updateHistogram(output);
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    createBars();
});