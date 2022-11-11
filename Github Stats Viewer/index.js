const apiEndpoint = 'https://api.github.com/users/';

const searchBarFormEl = document.querySelector('#searchBarForm');
const searchBarEl = document.querySelector('#searchBar');

const tabMainEl = document.querySelector('#main');
const tabUserEl = document.querySelector('#user');
const tabErrorEl = document.querySelector('#error');

const errorMsg = document.querySelector('#errorMsg');

const avatarEl = document.querySelector('#avatar');
const usernameEl = document.querySelector('#username');
const bioEl = document.querySelector('#bio');
const followersEl = document.querySelector('#follower');
const followingEl = document.querySelector('#following');
const reposEl = document.querySelector('#repos')

function getDataFromGitHub(username) {
    $.get(apiEndpoint + username, (data) => {
        successLoading(data);
    }).fail((data) => {
        failedLoading(username);
    });
}

function successLoading(data) {
    tabMainEl.classList.add('d-none');
    tabUserEl.classList.remove('d-none');
    tabErrorEl.classList.add('d-none');
    
    avatarEl.src = data.avatar_url;
    usernameEl.textContent = data.name;
    bioEl.textContent = data.bio;
    followersEl.textContent = data.followers;
    followingEl.textContent = data.following;
    reposEl.textContent = data.public_repos;
}

function failedLoading(username) {
    createError('The user "' + username + '" was not found!')
}

function createError(msg) {
    tabMainEl.classList.add('d-none');
    tabUserEl.classList.add('d-none');
    tabErrorEl.classList.remove('d-none');
    errorMsg.textContent = msg;
}

function submitSearchbar(e) {
    e.preventDefault();
    if(searchBarEl.value === '') {
        createError('Please enter a username into the searchbar!');
        return;
    }
    let searchTerm = searchBarEl.value;

    getDataFromGitHub(searchTerm);
    searchBarEl.value = "";
}

searchBarFormEl.addEventListener('submit', (e) => {submitSearchbar(e)});
