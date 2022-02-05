const cookieList = [
    [
        'Chocolate chip cookies',
        'https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg'
    ],
    [
        'Peanut butter cookies',
        'https://thenovicechefblog.com/wp-content/uploads/2014/07/The-Best-Chewy-Peanut-Butter-Cookies-3-sm-1-720x540.jpg'
    ],
    [
        'Oatmeal raisin cookies',
        'https://www.persnicketyplates.com/wp-content/uploads/2019/07/best-oatmeal-raisin-cookies-SQUARE.jpg'
    ],
    [
        'Shortbread cookies',
        'https://preppykitchen.com/wp-content/uploads/2021/07/Shortbread-cookies-Recipe-New.jpg'
    ],
    [
        'Gingerbread cookies',
        'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2015/11/gingerbread-men.jpg'
    ],
    [
        'Sugar cookies',
        'https://preppykitchen.com/wp-content/uploads/2020/12/Sugar-cookies-recipe-1200.jpg'
    ],
    [
        'Butter cookies',
        'https://www.thespruceeats.com/thmb/vpp_TBVgv6xmwz7GmLo6dvpDPb0=/2667x2000/smart/filters:no_upscale()/DanishButterCookiesHERO-5feef1d853ea47dab07e11aeb1f9e693.jpg'
    ]
];

let checkedBoxes = [];

const saveBtnEl = document.querySelector('.save-btn');
const popupEl = document.querySelector('.popup');
const bodyEl = document.querySelector('.body');

function showPopup() {
    cookieList.forEach((cookie, idx) => {
        const name = cookie[0];
        const img = cookie[1];

        const itemEl = document.createElement('div');
        itemEl.classList.add('cookie-item-sm');

        const imgEl = document.createElement('img');
        imgEl.classList.add('cookie-img-sm');
        imgEl.src = img;

        const detailsEl = document.createElement('div');
        detailsEl.classList.add('cookie-details-sm');

        const nameEl = document.createElement('label');
        nameEl.style.display = "block";
        nameEl.setAttribute('for', `checkbox--${idx}`);
        nameEl.classList.add('cookie-name');
        nameEl.textContent = name;

        const checkboxEl = document.createElement('input');
        checkboxEl.setAttribute('type', 'checkbox');
        checkboxEl.id = `checkbox--${idx}`;
        checkboxEl.classList.add('checkbox');
        checkboxEl.checked = true;

        detailsEl.appendChild(nameEl);
        detailsEl.appendChild(checkboxEl);
        itemEl.appendChild(imgEl);
        itemEl.appendChild(detailsEl);
        bodyEl.appendChild(itemEl);
    });
}

function showcookies() {
    const bodyEl = document.querySelector('body');
    const detailsEl = document.createElement('div');
    detailsEl.classList.add('details');

    checkedBoxes.forEach((idx) => {
        const name = cookieList[idx][0];
        const img = cookieList[idx][1];

        const itemEl = document.createElement('div');
        itemEl.classList.add('cookie-item-xl')

        const imgEl = document.createElement('img');
        imgEl.classList.add('cookie-img-xl');
        imgEl.src = img;

        const detailEl = document.createElement('div');
        detailEl.textContent = name;
        detailEl.classList.add('cookie-details-xl');

        itemEl.appendChild(imgEl);
        itemEl.appendChild(detailEl);

        detailsEl.appendChild(itemEl);
        
        bodyEl.appendChild(detailsEl);
    });
}

showPopup();

saveBtnEl.addEventListener('click', () => {
    const checkboxesEls = document.querySelectorAll('input[type="checkbox"]');
    checkboxesEls.forEach((checkbox, idx) => {
        if(checkbox.checked) {
            checkedBoxes.push(idx);
        }
    });

    popupEl.classList.add('hidden')
    showcookies();
});