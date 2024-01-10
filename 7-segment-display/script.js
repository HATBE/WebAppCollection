const controlsEl = document.getElementById('controls');

const inputAEl = controlsEl.querySelector('#a');
const inputBEl = controlsEl.querySelector('#b');
const inputCEl = controlsEl.querySelector('#c');
const inputDEl = controlsEl.querySelector('#d');

const aLabelEl = controlsEl.querySelector('#a-label');
const bLabelEl = controlsEl.querySelector('#b-label');
const cLabelEl = controlsEl.querySelector('#c-label');
const dLabelEl = controlsEl.querySelector('#d-label');

const segmentDisplayEl = document.querySelector('#seven-segment-display');

const segmentAEl = segmentDisplayEl.querySelector('#a');
const segmentBEl = segmentDisplayEl.querySelector('#b');
const segmentCEl = segmentDisplayEl.querySelector('#c');
const segmentDEl = segmentDisplayEl.querySelector('#d');
const segmentEEl = segmentDisplayEl.querySelector('#e');
const segmentFEl = segmentDisplayEl.querySelector('#f');
const segmentGEl = segmentDisplayEl.querySelector('#g');

const currentNumberEl = document.getElementById('current-number')

let a = false; // 2³ = 8
let b = false; // 2² = 4
let c = false; // 2¹ = 2
let d = false; // 2⁰ = 1

let currentNumber = 0;

function init() {
    hideAllSegments()
    
    inputAEl.checked = false;
    inputBEl.checked = false;
    inputCEl.checked = false;
    inputDEl.checked = false;

    updateUi();
}

function hideAllSegments() {
    segmentAEl.hidden = true;
    segmentBEl.hidden = true;
    segmentCEl.hidden = true;
    segmentDEl.hidden = true;
    segmentEEl.hidden = true;
    segmentFEl.hidden = true;
    segmentGEl.hidden = true;
}

function updateUi() {
    currentNumber = (a ? 1 : 0) * 8 + (b ? 1 : 0) * 4 + (c ? 1 : 0) * 2 + (d ? 1 : 0) * 1;

    currentNumberEl.textContent = currentNumber;

    hideAllSegments();
    
    // segment A
    if(a || c || b && d || !b && !d) { 
        segmentAEl.hidden = false;
    }

    // segment B
    if(!b || !c && !d || c && d) { 
        segmentBEl.hidden = false;
    }

    // segment C
    if(b || !c || d) { 
        segmentCEl.hidden = false;
    }

    // segment D
    if(a || !b && !d || !b && c || c && !d || b && !c && d) { 
        segmentDEl.hidden = false;
    }

    // segment E
    if(!b && !d || c && !d) { 
        segmentEEl.hidden = false;
    }

    // segment F
    if(a || b && !c || b && !d || !c && !d) { 
        segmentFEl.hidden = false;
    }

    // segment G
    if(a || b && !c || !b && c || c && !d) { 
        segmentGEl.hidden = false;
    }
}

init();

// event listener for number checkboxes
controlsEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('input')) {
        return;
    }

    // if 8 (A) is checked, only allow to add 1 (D), else there will be more than 9 and this is not allowed
    if(inputAEl.checked) {
        inputBEl.checked = false;
        inputCEl.checked = false;
        inputBEl.disabled = true;
        inputCEl.disabled = true;
    } else {
        inputBEl.disabled = false;
        inputCEl.disabled = false;
    }

    a = inputAEl.checked;
    b = inputBEl.checked;
    c = inputCEl.checked;
    d = inputDEl.checked;

    aLabelEl.textContent = a ? 1 : 0;
    bLabelEl.textContent = b ? 1 : 0;
    cLabelEl.textContent = c ? 1 : 0;
    dLabelEl.textContent = d ? 1 : 0;

    updateUi();
});