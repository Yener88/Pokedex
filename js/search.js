// search String
async function searchOnlyString(value) {
    emptyInner('maincontainer');
    for (let i = 0; i < pokeAllNames['results'].length; i++) {
        let pokemonName = pokeAllNames['results'][i];
        if (checkLetters(pokemonName, value)) {
            console.log(`${pokemonName['name']}`)
            try {
                let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName['name']}`;
                let response = await fetch(url);
                pokeAll[i] = await response.json();
                pokeSearch[i] = true
            } catch (e) {
                alert('an error has occurred');
                location.reload();
            }
        }
    }
    checkResults();
    closeLoader();
}

// search Number
async function searchOnlyNumber(value) {
    if (value > 0 && value <= 898) {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon/${value}`;
            let response = await fetch(url);
            let currentPokemon = await response.json();
            let i = currentPokemon['id']
            pokeAll[i] = currentPokemon;
            showBig(i);
            addClass('rightswipe', 'd-none');
            addClass('leftswipe', 'd-none');
        } catch (e) {
            alert('an error has occurred!');
            location.reload();
        }
    } else {
        alert('no Pokemon could be found!');
        location.reload();
    }
    closeLoader();
}

// search Number or String
async function search() {
    pokeSearch = [];
    let value = document.getElementById('searchContainer').value.toLowerCase();
    let regex = /^[0-9]+$/;
    openLoader();
    if (value.length == 0) {
        alert('Please insert Pokemon or ID!')
        document.getElementById('searchContainer').value = '';
        location.reload();
    } else if (value.match(regex)) {
        searchOnlyNumber(value);
    } else {
        searchOnlyString(value);
    }
    document.getElementById('searchContainer').value = '';
}

// check pokemon find
function checkResults() {
    if (!pokeSearch.includes(true)) {
        alert('no Pokemon could be found');
        pokesAll();
    } else {
        searchResultsLoad();
    }
}

// all search results load
function searchResultsLoad() {
    addClass('footerId', 'd-none');
    addClass('FavOpen', 'd-none');
    removeClass('FavClose', 'd-none');
    emptyInner('maincontainer');
    favouritesShow = true;
    load();
    for (let i = 0; i < pokeSearch.length; i++) {
        if (pokeSearch[i] == true) {
            pokeAllContent(i);
        }
    }
}

// searchvalue
function checkLetters(pokemonName, value) {
    let valueLetter = '';
    let pokemonLetter = '';
    for (let i = 0; i < value.length; i++) {
        valueLetter = valueLetter + value[i]
        pokemonLetter = pokemonLetter + pokemonName['name'][i]
    }
    return pokemonLetter == valueLetter;
}

// enter button to search
function key(e) {
    if (e.keyCode == 13) {
        search();
    }
}