let loadFullscreen = false;

// open big view
function showBig(i) {
    soundOpen.play();
    soundOpen.volume = 0.5;
    soundClose.volume = 0;
    soundSwipe.volume = 0;
    removeClass('blurContainer', 'd-none');
    let firstType = pokeAll[i]['types'][0]['type']['name'];
    showBigText(i, firstType);
    checkLeftSwipe(i);
    checkFavouritesArray(i);
    checkShowFavourites();
}

// swipe left
function swipeLeft(i) {
    i = i - 1;
    showBig(i);
    removeBounceAnimation();
    soundSwipe.play();
    soundClose.volume = 0;
    soundOpen.volume = 0;
    soundSwipe.volume = 0.5;
}

// remove left arrow by the first Pokemon
function checkLeftSwipe(i) {
    if (i == 1) {
        addClass('leftswipe', 'd-none');
        removeClass('closeContainer', 'space-between');
        addClass('closeContainer', 'j-flex-end');
    }
}

// swipe right
async function swipeRight(i) {
    i = i + 1;
    if (i >= pokeAll.length) {
        pokeBegin = pokeDisplay + 1;
        pokeDisplay = pokeDisplay + 1;
        pokeMax = pokeDisplay + 1;
        await pokesAll();
    }
    showBig(i);
    removeBounceAnimation();
    soundSwipe.play();
    soundClose.volume = 0;
    soundOpen.volume = 0;
    soundSwipe.volume = 0.5;
}

// inner big view
function showBigText(i, firstType) {
    document.getElementById('bigCard').innerHTML = /*html*/ `
        <div id="pokeCard" class="color-white animation-bounceInUp ${firstType}-bg filterbg2">
            <div class="insidebackground2"><div class="insidebackground ${firstType}-bg2"></div></div>
            <img id="favHeartopen" onclick="addFavourites(${i})" class="icon-cursor hearticon" src="img/open-heart.png">
            <img id="favHeartclose" onclick="exciseFavourites(${i})" class="icon-cursor hearticon d-none" src="img/full-heart.png">
            <img  onclick="closeBig()" class="icon-cursor closeicon" src="img/close.png">
            <div id="closeContainer" class="d-flex j-space-betwen">
                <img id="leftswipe" onclick="swipeLeft(${i})" class="icon-cursor" src="img/left.png">
                <img id="rightswipe" onclick="swipeRight(${i})" class="icon-cursor" src="img/right.png">
            </div>
            <h3 id="pokeId">#${i}</h3>
            <img id="pokeImg" src="${pokeAll[i]['sprites']['other']['home']['front_default']}">
            <div id="pokeName"><h1>${pokeAll[i]['name']}</h1>
                <div class="insideiconstyle ${firstType}-icon"></div>
                <div id="bigTypesContainer${i}" class="insideiconposition d-flex j-center "> </div>
            </div>
            <div id="infoCard"> 
            <img  onclick="closeData(${i})" id="closedata" class="icon-cursor closeicon closeicon2 d-none" src="img/down.png">
                <div class="buttonContainer d-flex">
                    <div class="d-flex f-colum a-center">
                        <button id="aboutButton" onclick="openAbout(${i})"><img class="navicon" src="./img/naviconinfo.png"></button>
                        <div id="aboutShadow" class="buttonshadow d-none"></div>
                    </div>
                    <div class="d-flex f-colum a-center">
                        <button id="statusButton" onclick="openStats(${i})"><img class="navicon" src="./img/navicondetails.png"></button>
                        <div id="statsShadow" class="buttonshadow d-none"></div>
                    </div>
                    <div class="d-flex f-colum a-center">
                        <button id="movesButton" onclick="openMoves(${i})"><img class="navicon" src="./img/naviconmoves.png"></button>
                        <div id="movesShadow" class="buttonshadow d-none"></div>
                    </div>
                    <div class="d-flex f-colum a-center">
                        <button id="evoButton" onclick="openEvolution(${i})"><img class="navicon" src="./img/naviconevolution.png"></button>
                        <div id="evoShadow" class="buttonshadow d-none"></div>
                    </div>
                </div>
                <table id="statsTable"><div id="movesIdheader"></div><div id="movesId" class="d-flex f-wrap overflow-y-auto"></div></table>
            </div>
        </div>
    `;
    addClass('overflowh', 'overflowhidden');
    loopForShowBigTypes(i);
}

// Types
function loopForShowBigTypes(i) {
    for (let j = 0; j < pokeAll[i]['types'].length; j++) {
        const element = pokeAll[i]['types'][j]['type']['name'];
        document.getElementById(`bigTypesContainer${i}`).innerHTML += /*html*/`
            <span class="${element} typesstyle" ><b>${element}</b></span>
        `;
    }
}

// close big view
function closeBig() {
    addClass('blurContainer', 'd-none');
    removeClass('overflowh', 'overflowhidden');
    soundClose.play();
    soundClose.volume = 0.5;
    soundOpen.volume = 0;
    soundSwipe.volume = 0;
}

// show data in big view
function showDatas(i) {
    emptyInner('movesId');
    emptyInner('movesIdheader');
    removeClass('pokeImg', 'animation-scaleup');
    addClass('pokeImg', 'animation-scaledown');
    removeClass('infoCard', 'animation-fadedown');
    addClass('infoCard', 'animation-fadeup');
    addClass('pokeName', 'd-none');
    removeClass('closedata', 'd-none');
    document.getElementById('pokeId').innerHTML = `<h3>${pokeAll[i]['name']}</h3>`;
}

// open Info
function openAbout(i) {
    aboutShow = true;
    statShow = false;
    movesShow = false;
    evoShow = false;
    showDatas(i);
    removeClass('aboutShadow', 'd-none');
    addClass('evoShadow', 'd-none');
    addClass('statsShadow', 'd-none');
    addClass('movesShadow', 'd-none');
    aboutText(i);
}

// open Details
function openStats(i) {
    aboutShow = false;
    statShow = true;
    movesShow = false;
    evoShow = false;
    showDatas(i);
    addClass('aboutShadow', 'd-none');
    addClass('evoShadow', 'd-none');
    removeClass('statsShadow', 'd-none');
    addClass('movesShadow', 'd-none');
    statsText(i);
}

// open Moves
function openMoves(i) {
    aboutShow = false;
    statShow = false;
    movesShow = true;
    evoShow = false;
    showDatas(i);
    addClass('aboutShadow', 'd-none');
    addClass('statsShadow', 'd-none');
    addClass('evoShadow', 'd-none');
    removeClass('movesShadow', 'd-none');
    movesText(i);
}

// open Evolution
function openEvolution(i) {
    aboutShow = false;
    statShow = false;
    movesShow = false;
    evoShow = true;
    showDatas(i);
    addClass('aboutShadow', 'd-none');
    addClass('statsShadow', 'd-none');
    removeClass('evoShadow', 'd-none');
    addClass('movesShadow', 'd-none');
    evoText(i);
}

// Info - 1
function aboutText(i) {
    emptyInner('statsTable');
    document.getElementById('statsTable').innerHTML += /*html*/ `
        <tr>
            <th>ID</th>
            <th class=" j-flex-end">#${i}</th>
        </tr>
        <tr>
            <th>Name    </th>
            <th class=" j-flex-end">${pokeAll[i]['species']['name']}</th>
        </tr>
        <tr>
            <th>Base Experience</th>
            <th class="text-end j-flex-end">${pokeAll[i]['base_experience']}</th>
        </tr>  
        <tr>
            <th>Height</th>
            <th class="text-lowercase j-flex-end">${pokeAll[i]['height']}0 cm</th>
        </tr> 
        <tr>
            <th>Weight</th>
            <th class="text-lowercase j-flex-end">${(pokeAll[i]['weight'] / 10).toFixed(2)} kg</th>
        </tr> 
        <tr>
            <th>Abilities</th>
            <th id="abilities" class="text-end j-flex-end"></th>
        </tr>
    `;
    checkAbilitie(i);
}

// Info - 2
function checkAbilitie(i) {
    for (let j = 0; j < pokeAll[i]['abilities'].length; j++) {
        const element = pokeAll[i]['abilities'][j]['ability']['name'];
        document.getElementById('abilities').innerHTML += /*html*/`${element}<br>`;
    }
}

// Details - 1
function statsText(i) {
    emptyInner('statsTable');
    for (let j = 0; j < pokeAll[i]['stats'].length; j++) {
        const element = pokeAll[i]['stats'][j];
        document.getElementById('statsTable').innerHTML += /*html*/` 
            <tr>
                <th>${element['stat']['name'].replace(/special-/i, "Sp. ")}</th>
                <th>${element['base_stat']}<span><div id="data${j}" style="width: ${element['base_stat']}%;" class="background-green"></div></span></th>
            </tr>   
        `;
        fillBar(element, j);
    }
}

// Details - 2 
function fillBar(element, j) {
    if (element['base_stat'] > 80) {
        removeClass(`data${j}`, 'background-green');
        addClass(`data${j}`, 'background-red');
    }
}

//  Moves - 1
function movesText(i) {
    emptyInner('statsTable');
    document.getElementById('movesIdheader').innerHTML += /*html*/ `ALL POSSIBLE MOVES
    `;
    for (let j = 0; j < pokeAll[i]['moves'].length; j++) {
        const element = pokeAll[i]['moves'][j]['move']['name'];
        document.getElementById('movesId').innerHTML += /*html*/ `<span class="movesspan w-space-nowrap">${element}</span>
        `;
    }
}

//  Evolution - 1
function evoText(i) {
    emptyInner('statsTable');
    document.getElementById('statsTable').innerHTML += /*html*/ `    
    <div class="evolutiontitle">ALL POSSIBLE EVOLUTIONS</div>
    <div id="evolutionSection"></div>
    `;
    loadEvolution(i);
}

// remove Animation
function removeBounceAnimation() {
    removeClass('pokeCard', 'animation-bounceInUp');
    removeClass('infoCard', 'animation-fadeup');
}

// change Animation
function changeAnimation(i, firstType) {
    removeClass('infoCard', 'animation-fadeup');
    removeClass('pokeImg', 'animation-scaledown');
    document.getElementById('infoCard').style.height = '70%';
    document.getElementById('pokeImg').style.height = '30%';
}

// remove close Animation
function closeDataChangeAnimation() {
    removeClass('pokeImg', 'animation-scaledown');
    addClass('pokeImg', 'animation-scaleup');
    removeClass('infoCard', 'animation-fadeup');
    addClass('infoCard', 'animation-fadedown');
    removeClass('pokeName', 'd-none');
    addClass('closedata', 'd-none');
    addClass('aboutShadow', 'd-none');
    addClass('statsShadow', 'd-none');
    addClass('movesShadow', 'd-none');
}

// close data big view
function closeData(i) {
    aboutShow = false;
    statShow = false;
    movesShow = false;
    emptyInner('statsTable');
    emptyInner('movesId');
    emptyInner('movesIdheader');
    closeDataChangeAnimation();
    document.getElementById('pokeId').innerHTML = `
        <h3>#${pokeAll[i]['id']}</h3>
    `;
}