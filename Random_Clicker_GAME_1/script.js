// My First JS Game!!

const clickerEl = document.getElementById('clicker');
const counterEl = document.getElementById('counter');
const msgWrapper = document.getElementById('msgWrapper');

const shopItems = document.querySelectorAll('.shopItem');

const autoclickerCountEl = document.getElementById('autoclickerItemCount');
const multiplayerCountEl = document.getElementById('multiplayerItemCount');
const autoclickerPriceEl = document.getElementById('autoclickerItemPrice');
const multiplayerPriceEl = document.getElementById('multiplayerItemPrice');


let money;
let autoclickerCount;
let currentMultiply;

const cost = {
    'autoclicker': {
        'cost': 83
    },
    'multiplayer': {
        'cost': 167
    }
}

function init() {
    currentMultiply = Number(getStandard('currentMultiply', 1)); 
    money = Number(getStandard('money', 0));
    autoclickerCount = Number(getStandard('autoclickerCount', 1));

    updateUi();
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;" + "SameSite=None; Secure";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function addMoney(num) {
    money = money + Number(num);
}

function removeMoney(num) {
    money -= Number(num);
}

function createMsg(text) {
    const msg = document.createElement('div');
    msg.classList.add('msg');
    msg.textContent = text;

    msgWrapper.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 3000)
}

function clicked() {
    addMoney(1 * currentMultiply);
    updateUi();
}

function getStandard(name, std) {
    let value = getCookie(name);
    if (value != "") {
        return value;
    } else {
        return std;
    }
}

function save() {
    if(typeof money == 'number') {
        if(money > 0) {
            setCookie('money', money, 365);
        }
    }
    if(typeof autoclickerCount == 'number') {
        if(autoclickerCount > 0) {
            setCookie('autoclickerCount', autoclickerCount, 365);
        }
    }
    if(typeof currentMultiply == 'number') {
        if(currentMultiply > 0) {
            setCookie('currentMultiply', currentMultiply, 365);
        }
    }

    createMsg(`Saved!`);
    updateUi();
}

function autoClicker() {
    if(autoclickerCount > 0) {
        addMoney(1 * autoclickerCount * currentMultiply);
    }
}

function updateUi() {
    counterEl.textContent = money;
    multiplayerCountEl.textContent = currentMultiply;
    autoclickerCountEl.textContent = autoclickerCount;

    autoclickerPriceEl.textContent = Math.round(cost.autoclicker.cost * (autoclickerCount * 1.2));
    multiplayerPriceEl.textContent = Math.round(cost.multiplayer.cost * (currentMultiply * 1.2));
}

function buyItem(item) {
    if(item == 'autoclickerItem') {
        if(money >= Math.round(cost.autoclicker.cost * (autoclickerCount * 1.2))) {
            removeMoney(Math.round(cost.autoclicker.cost * (autoclickerCount * 1.2)));
            autoclickerCount++;
            createMsg('Buy');
         } else {
             createMsg('Not enough Money');
         }
    } else if(item == 'multiplayerItem') {
        if(money >= Math.round(cost.multiplayer.cost * (currentMultiply * 1.2))) {
            removeMoney(Math.round(cost.multiplayer.cost * (currentMultiply * 1.2)));
            currentMultiply++;
            createMsg('Buy');
        } else {
            createMsg('Not enough Money');
        }
    }
    updateUi();
}

window.setInterval(function(){ 
    autoClicker();
    save();
}, 10000);

/* START */

clickerEl.addEventListener('click', clicked);

shopItems.forEach((shopItem) => {
    shopItem.addEventListener('click', () => {
        buyItem(shopItem.id);
    }); 
});

init();