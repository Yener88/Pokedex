let pokeAll = [];
let pokeAllNames;
let aboutShow = false;
let statShow = false;
let movesShow = false;
let evoShow = false;
let favouritesShow = false;
let favouritesArray = [];
let pokeSearch = [];
let pokeBegin = 1;
let pokeDisplay = 24;
let pokeMax = pokeDisplay + 1;
let game_mode = 'off';
let soundTheme = new Audio('audio/theme.mp3');
let soundOpen = new Audio('audio/open.mp3');
let soundClose = new Audio('audio/close.mp3');
let soundSwipe = new Audio('audio/swipe.mp3');

// API
async function pokesAll() {
    openLoader(); 
    let pokeAllNamesUrl = 'https://pokeapi.co/api/v2/pokemon?limit=898&offset=0';
    let pokeAllNamesresponse = await fetch(pokeAllNamesUrl);
    pokeAllNames = await pokeAllNamesresponse.json();
    setTimeout(async () => {
        for (let i = pokeBegin; i < pokeMax; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            pokeAll[i] = await response.json();
            favouritesArray[i] = false;
            pokeAllContent(i);
        }
        closeLoader();
    }, 500); 
}


// Render first view
function pokeAllText(i, firstType) {
    document.getElementById('maincontainer').innerHTML += /*html*/ `
        <div id="id${i}" onclick="showBig(${i})" class="smallCard height350 width260 color-white letter-2 ${firstType}-bg">
            <h3 class="idposition2">&copy;2022 Pokedex ID-#${pokeAll[i]['id']}</h3>
            <div class="allPokeheader ${firstType}-icon">
                <h3 class="smallcardpokename">${pokeAll[i]['name']}</h3>
                <h3 class="baseexpstyle ${firstType}text">${pokeAll[i]['base_experience']}XP</h3>
            </div>
            <div class="first-smallcard-container ${firstType}-bg2">
                <img src="${pokeAll[i]['sprites']['other']['official-artwork']['front_default']}">
            </div>
            <div class="frontability">Ability:<div>${pokeAll[i]['abilities'][0]['ability']['name']}</div></div>

            <div class="second-smallcard-container">
                <div id="typesContainer${i}" class="d-flex f-colum statsfrontposition"></div>
                <div class="statsfrontposition2">                
                    <div class="statsfrontstyle"><div>Health</div><div>${pokeAll[i]['stats'][0]['base_stat']}</div></div>
                    <div class="statsfrontstyle2"><div>${pokeAll[i]['moves'][0]['move']['name']}</div><div>${pokeAll[i]['stats'][1]['base_stat']}</div></div>
                </div>
            </div>
            <h3 class="idposition">&copy;2022 Pokedex ID-#${pokeAll[i]['id']}</h3>
        </div>
    `;
    loopForPokeAllTypes(i);
    countPokemons();
}

// Types
function pokeAllContent(i) {
    let firstType = pokeAll[i]['types'][0]['type']['name'];
    pokeAllText(i, firstType);
    load();
}

// Loop for Types
function loopForPokeAllTypes(i) {
    for (let j = 0; j < pokeAll[i]['types'].length; j++) {
        const element = pokeAll[i]['types'][j]['type']['name'];
        document.getElementById(`typesContainer${i}`).innerHTML += /*html*/`
            <span class="${element}">${element}</span>
        `;
    }
}

// Load more pokemon
async function showMorePokemon() {
    pokeBegin = pokeDisplay + 1;
    pokeDisplay = pokeDisplay + 12;
    pokeMax = pokeDisplay + 1;
    await pokesAll();
}

// Loadingbar
function openLoader() {
    removeClass('loadcontainer', 'd-none');
}


function closeLoader() {
    addClass('loadcontainer', 'd-none');
}

// Sounds
function muteAudio() {
    soundTheme.muted = true;
    soundTheme.volume = 0;
}

function playAudio() {
    soundTheme.muted = false;
    soundTheme.play();
    soundTheme.loop = true;
    soundTheme.volume = 0.01;
}

async function countPokemons() {
    document.getElementById('counter').innerHTML = pokeAll.length - 1;
    closeLoader();
}

// Scrollbar
function renderByScroll() {
    if (window.scrollY == 0) {
        document.getElementById('goupcontainer').classList.add('d-none');
    } else if (userDidScroll()) {
        document.getElementById('goupcontainer').classList.remove('d-none');
    }
}

window.addEventListener('scroll', () => {
    renderByScroll();
})

function userDidScroll() {
    return (window.innerHeight + window.scrollY) > (window.innerHeight);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CLASSLIST MANAGMENT
function addClass(id, className) {
    document.getElementById(id).classList.add(className);
}

function removeClass(id, className) {
    document.getElementById(id).classList.remove(className);
}

function emptyInner(id) {
    document.getElementById(id).innerHTML = ``;
}