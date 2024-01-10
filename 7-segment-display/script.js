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
    if(a && !b && !c || !a && b && d || !b && !d || a && !d || !a && c || b && c) { 
        segmentAEl.hidden = false;
    }

    // segment B
    if(!a && !c && !d || a && !c && d || !a && c && d || !b && !d || !a && !b) { 
        segmentBEl.hidden = false;
    }

    // segment C
    if(!a && !c || a && !b || !a && b || !c && d || !a && d) { 
        segmentCEl.hidden = false;
    }

    // segment D
    if(!a && !b && !d || !b && c && d || b && c && !d || b && !c && d || a && !c) { 
        segmentDEl.hidden = false;
    }

    // segment E
    if(c && !d || a && c || a && b || !b && !d) { 
        segmentEEl.hidden = false;
    }

    // segment F
    if(!a && b && !c || !c && !d || a && !b || b && !d || a && c) { 
        segmentFEl.hidden = false;
    }

    // segment G
    if(!a && b && !c || a && !b || c && !d || !b && c || a && d) { 
        segmentGEl.hidden = false;
    }
}

init();

// event listener for number checkboxes
controlsEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('input')) {
        return;
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