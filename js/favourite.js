// open favorites
function FavOpen() {
    document.getElementById("FavOpen").disabled = true;
    timeoutId = setTimeout(() => {
        document.getElementById("FavOpen").disabled = false;
    }, 1000);
    addClass('footerId', 'd-none');
    addClass('FavOpen', 'd-none');
    removeClass('FavClose', 'd-none');
    emptyInner('maincontainer');
    favouritesShow = true;
    loadFavourite();
}

// close favorites
let favOpenButtonClicked = false;
function FavClose() {
    if (!favOpenButtonClicked) {
        favOpenButtonClicked = true;
    document.getElementById("FavClose").disabled = true;
    timeoutId = setTimeout(() => {
        document.getElementById("FavClose").disabled = false;
    }, 1000);
    removeClass('footerId', 'd-none');
    removeClass('FavOpen', 'd-none');
    addClass('FavClose', 'd-none');
    emptyInner('maincontainer');
    favouritesShow = false;
    pokeSearchs = [];
    pokeBegin = 1;
    pokesAll();
    setTimeout(function() {
        favOpenButtonClicked = false;
    }, 1000); // 1 Sekunde Wartezeit
}
}
// load favorites
async function loadFavourite() {
    openLoader();
    for (let i = 0; i < pokeAll.length; i++) {
        if (favouritesArray[i]) {
            pokeAllContent(i);
        }
    }
    closeLoader();
}

// add favorites
function addFavourites(i) {
    addClass('favHeartopen', 'd-none');
    removeClass('favHeartclose', 'd-none');
    favouritesArray[i] = true;
    save();
}

// safe favorites in Storage
function save() {
    let favouritsAsText = JSON.stringify(favouritesArray);
    localStorage.setItem('favoritsPokemon', favouritsAsText);
}

// load favorites in Storage
function load() {
    let favouritsAsText = localStorage.getItem('favoritsPokemon');
    if (favouritsAsText) {
        favouritesArray = JSON.parse(favouritsAsText);
    }
}

// move to favorites
function exciseFavourites(i) {
    removeClass('favHeartopen', 'd-none');
    addClass('favHeartclose', 'd-none');
    favouritesArray[i] = false;
    save();
    if (favouritesShow) {
        FavOpen();
    }
}

// open favorites check
function checkShowFavourites() {
    if (favouritesShow) {
        addClass('leftswipe', 'd-none');
        addClass('rightswipe', 'd-none');
    }
}

// show hearth check
function checkFavouritesArray(i) {
    if (favouritesArray[i]) {
        if (favouritesArray[i] == true) {
            addFavourites(i);
        } else {
            exciseFavourites(i);
        }
    }
}