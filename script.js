const container = document.querySelector('#container');

const sketchPadContainer = document.createElement('div');
sketchPadContainer.classList.add('sketch-pad-container');

const toolsContainer = document.createElement('div');
toolsContainer.classList.add('tools-container');

container.appendChild(sketchPadContainer);
container.appendChild(toolsContainer);

function createGrid(size) {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    for (i = 0; i < size; i++) {
        const grid = document.createElement('div');
        grid.classList.add('grid');
        grid.style.cssText =
            `display: grid;
            grid-template-columns: repeat(${size}, 1fr);
            grid-auto-rows: minmax(1fr, auto);`
        gridContainer.appendChild(grid);

        for (j = 0; j < size; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item')
            grid.appendChild(gridItem);
        }
    }

    sketchPadContainer.appendChild(gridContainer);
}

function createTools() {
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
    toolsContainer.appendChild(sliderContainer);

    colorPicker.oninput = () => {
        colorPickerLabel.textContent = colorPicker.value;
    }

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