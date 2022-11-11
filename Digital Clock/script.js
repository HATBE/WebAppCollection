const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');
const timeEl = document.getElementById('time');

function updateClock() {
    const date = new Date();

    const days = date.getDate();
    const months = date.getMonth();
    const years =  date.getFullYear();
    const hours = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds();
    const milliseconds = Math.floor(date.getMilliseconds() / 100);

    dateEl.textContent = `${days}.${months}.${years}`;
    timeEl.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`
}

updateClock();
setInterval(updateClock, 100);