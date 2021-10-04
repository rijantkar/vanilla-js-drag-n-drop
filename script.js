const draggableList = document.querySelector('.draggable-list');
const check = document.querySelector('.check-btn');

const jsFrameworksTimeline = [
    'Deno',
    'Svelte 3',
    'React Hooks',
    'VueJs',
    'ReactJS',
    'Angular',
    'Typescript',
    'CommonJS',
    'NodeJS',
    'ExtJS',
    'jQuery'
];

const listItems = [];

let dragStartIndex;

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
};

function dragOver() {
    event.preventDefault();
};

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
};

function dragEnter() {
    this.classList.add('over');
};

function dragLeave() {
    this.classList.remove('over');
};

function swapItems(fromIdx, toIdx) {
    const itemOne = listItems[fromIdx].querySelector('.draggable');
    const itemTwo = listItems[toIdx].querySelector('.draggable');

    listItems[fromIdx].appendChild(itemTwo);
    listItems[toIdx].appendChild(itemOne);
};

function checkOrder() {
    listItems.forEach((listItem, index) => {
       const jsName = listItem.querySelector('.draggable').innerText.trim();

       if (jsName !== jsFrameworksTimeline[index]) {
           listItem.classList.add('wrong');
       } else {
           listItem.classList.remove('wrong');
           listItem.classList.add('right');
       }
    });
}

createList();

// Insert list items into DOM
function createList() {
    [...jsFrameworksTimeline]
        .map(item => ({sort: Math.random(), value: item}))
        .sort((a, b) => a.sort - b.sort)
        .map(item => item.value)
        .forEach((person, index) => {
       const listItem = document.createElement('li');

       listItem.setAttribute('data-index', index);
       listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="js-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        listItems.push(listItem);
        draggableList.appendChild(listItem);

        addEventListeners();
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
       item.addEventListener('dragover', dragOver);
       item.addEventListener('drop', dragDrop);
       item.addEventListener('dragenter', dragEnter);
       item.addEventListener('dragleave', dragLeave);
    });
};

check.addEventListener('click', checkOrder);