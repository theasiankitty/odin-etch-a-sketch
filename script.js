const mainContainer = document.querySelector('#container');

// header container
const headerContainer = document.createElement('div');
headerContainer.classList.add('header-container');

const headerTitle = document.createElement('h1');
headerTitle.classList.add('header-title');
headerTitle.textContent = 'Etch-A-Sketch';

headerContainer.appendChild(headerTitle);

// content container
const contentContainer = document.createElement('div');
contentContainer.classList.add('content-container');

const content = document.createElement('div');
content.classList.add('content');

const sketchPadContainer = document.createElement('div');
sketchPadContainer.classList.add('sketch-pad-container');

const toolsContainer = document.createElement('div');
toolsContainer.classList.add('tools-container');

content.appendChild(sketchPadContainer);
content.appendChild(toolsContainer);

contentContainer.appendChild(content);

// footer container
const footerContainer = document.createElement('div');
footerContainer.classList.add('footer-container');

const footerText = document.createElement('span');
footerText.classList.add('footer-text');
footerText.textContent = '_theasiankitty © 2023';

footerContainer.appendChild(footerText);

// appending all containers
mainContainer.appendChild(headerContainer);
mainContainer.appendChild(contentContainer);
mainContainer.appendChild(footerContainer);

// mouse down
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// default colorPicker value
let penColor = '#000000';

function createGrid(size) {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    for (i = 1; i <= size; i++) {
        const grid = document.createElement('div');
        grid.classList.add('grid');
        grid.style.cssText =
            `display: grid;
            grid-template-columns: repeat(${size}, 1fr);
            grid-auto-rows: minmax(1fr, auto);`
        gridContainer.appendChild(grid);

        for (j = 1; j <= size; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add(`grid-item`);
            gridItem.addEventListener('mouseover', draw);
            gridItem.addEventListener('mousedown', draw);
            grid.appendChild(gridItem);
        }
    }
    sketchPadContainer.appendChild(gridContainer);
}

// draw function
function draw(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = penColor;
}

function createTools() {
    // color picker
    const colorPickerContainer = document.createElement('div');
    colorPickerContainer.classList.add('color-picker-container');

    const colorPicker = document.createElement('input');
    colorPicker.setAttribute('type', 'color');
    colorPicker.setAttribute('id', 'colorPicker');
    colorPicker.setAttribute('name', 'colorPicker');
    colorPicker.setAttribute('value', '#000000');
    colorPicker.classList.add('color-picker');

    const colorPickerLabel = document.createElement('label');
    colorPickerLabel.setAttribute('for', 'colorPicker');
    colorPickerLabel.textContent = '#000000';

    colorPickerContainer.appendChild(colorPicker);
    colorPickerContainer.appendChild(colorPickerLabel);

    // clear container
    const clearContainer = document.createElement('div');
    clearContainer.classList.add('clear-container');

    const clearBtn = document.createElement('img');
    clearBtn.setAttribute('src', 'images/clear.svg');
    clearBtn.setAttribute('alt', 'Clear');
    clearBtn.setAttribute('class', 'clear-btn');

    const clearTitle = document.createElement('span');
    clearTitle.textContent = 'Clear';

    clearContainer.appendChild(clearBtn);
    clearContainer.appendChild(clearTitle);

    // slider container
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');

    const slider = document.createElement('input');
    slider.setAttribute('type', 'range');
    slider.setAttribute('id', 'sizeSlider');
    slider.setAttribute('name', 'sizeSlider');
    slider.setAttribute('min', '16');
    slider.setAttribute('max', '64');
    slider.setAttribute('value', '32');
    slider.classList.add('size-slider');

    const sliderLabel = document.createElement('label');
    sliderLabel.setAttribute('for', 'sizeSlider');
    sliderLabel.textContent = '32 x 32';

    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(sliderLabel);

    toolsContainer.appendChild(colorPickerContainer);
    toolsContainer.appendChild(clearContainer);
    toolsContainer.appendChild(sliderContainer);

    // change the color for the pen
    colorPicker.oninput = () => {
        colorPickerLabel.textContent = colorPicker.value;
        penColor = colorPicker.value;
        console.log(penColor);
    }

    // clear the sketchpad
    clearBtn.onclick = () => {
        console.log('click');
    }

    // change the pixel size of the sketch pad
    slider.oninput = () => {
        const min = slider.min;
        const max = slider.max;
        const val = slider.value;

        slider.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
        const currentGrid = document.querySelector('.grid-container');
        sketchPadContainer.removeChild(currentGrid);

        sliderLabel.textContent = `${slider.value} x ${slider.value}`;
        createGrid(slider.value);
    }

    createGrid(slider.value);
}

createTools();