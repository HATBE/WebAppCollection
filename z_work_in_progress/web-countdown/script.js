const countdownEl = document.querySelector('#countdown');
const hourEl = document.querySelector('#countdown #hours');
const minutesEl = document.querySelector('#countdown #minutes');
const secondsEl = document.querySelector('#countdown #seconds');
const millisecondsEl = document.querySelector('#countdown #milliseconds');

const stopBtnEl = document.querySelector('#controls-line #stop-btn');
const startBtnEl = document.querySelector('#controls-line #start-btn');
const timeInputEl = document.querySelector('#controls-line #time-input');
const timeSpanSelectEl = document.querySelector('#controls-line #time-span-select');

let currentCountDown = null;

const TIME_SPAN_TO_MS_MAP = {
    hours: 3_600_000,
    minutes: 60_000,
    seconds: 1_000
}

function startCountdown(ms) {
    const endTime = Date.now() + ms;

    currentCountDown = setInterval(() => {
        const now = Date.now();
        let timeToCountdownMs = endTime - now;

        if (timeToCountdownMs <= 0) {
            clearInterval(currentCountDown);
            timeToCountdownMs = 0;
            hourEl.textContent = 0;
            minutesEl.textContent = 0;
            secondsEl.textContent = 0;
            millisecondsEl.textContent = 0;
            return;
        }

        let hours = Math.floor(timeToCountdownMs / 3600000);
        let remainingMsAfterHours = timeToCountdownMs % 3600000;

        let minutes = Math.floor(remainingMsAfterHours / 60000);
        let remainingMsAfterMinutes = remainingMsAfterHours % 60000;

        let seconds = Math.floor(remainingMsAfterMinutes / 1000);
        let milliseconds = remainingMsAfterMinutes % 1000;

        if(hours > 0) {
            hourEl.textContent = hours;
        }

        if(minutes > 0) {
            minutesEl.textContent = minutes;
        }

        if(seconds > 0) {
            secondsEl.textContent = seconds;
        }

        millisecondsEl.textContent = milliseconds;
    }, 1);
}

startBtnEl.addEventListener('click', (event) => {
    if(currentCountDown) {
        clearInterval(currentCountDown);
    }

    let time = +timeInputEl.value;

    if(time < 1) {
        return;
    }

    time *= TIME_SPAN_TO_MS_MAP[timeSpanSelectEl.value];

    countdownEl.dataset.time = time;

    startCountdown(time);
});

stopBtnEl.addEventListener('click', (event) => {
    if(currentCountDown) {
        clearInterval(currentCountDown);
    }
});