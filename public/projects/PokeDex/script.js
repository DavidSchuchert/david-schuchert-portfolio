let currentPokemon = [];
let allPokemon = [];
let newPokemon = [];
let allPokemonNames = [];
let allPokemonTypes = [];
let backgroundColorCards = "";
let pokemonLoadAmmount = 20;
let pokemonoffset = 0;
let typebgcolor1 = "";
let typebgcolor2 = "";
let addAbilities = ``;
let pokemonleft = "";
let pokemonright = "";
let backgroundColorCardsright = "";
let backgroundColorCardsleft = "";
let typeColors = {
  grass: "rgba(0, 128, 0, 0.5)", // Grün mit 50% Transparenz
  fire: "rgba(255, 0, 0, 0.5)", // Rot mit 50% Transparenz
  water: "rgba(0, 0, 255, 0.5)", // Blau mit 50% Transparenz
  bug: "rgba(144, 238, 144, 0.5)", // Hellgrün mit 50% Transparenz
  normal: "rgba(169, 169, 169, 0.5)", // Grau mit 50% Transparenz
  poison: "rgba(200, 161, 201, 0.5)", // Lila mit 50% Transparenz
  ground: "rgba(169, 152, 138, 0.5)", // Braun mit 50% Transparenz
  fairy: "rgba(248, 206, 212, 0.5)", // Hellrosa mit 50% Transparenz
  psychic: "rgba(115, 65, 113, 0.5)", // Dunkelrosa mit 50% Transparenz
  fighting: "rgba(97, 95, 92, 0.5)", // Dunkelgrau mit 50% Transparenz
  ghost: "rgba(154, 46, 253, 0.5)", // Lila mit 50% Transparenz
  electric: "rgba(255, 255, 0, 0.5)", // Gelb mit 50% Transparenz
  rock: "rgba(169, 169, 169, 0.5)", // Grau mit 50% Transparenz
  flying: "rgba(173, 216, 230, 0.5)", // Hellblau mit 50% Transparenz
  steel: "rgba(183, 183, 206, 0.5)", // Blaugrau mit 50% Transparenz
  ice: "rgba(224, 255, 255, 0.5)", // Hellcyan mit 50% Transparenz
  dragon: "rgba(111, 53, 252, 0.5)", // Blau mit 50% Transparenz
  dark: "rgba(112, 87, 70, 0.5)", // Dunkelbraun mit 50% Transparenz
};
let typeColorMap = {
  grass: "green !important",
  fire: "red !important",
  water: "blue !important",
  normal: "grey !important",
  bug: "lightgreen !important",
  flying: "lightblue !important",
  poison: "#C8A2C8 !important",
  ground: "#a9988a !important",
  fairy: "#F8CED4 !important",
  psychic: "#734171 !important",
  fighting: "#615f5c !important",
  ghost: "#9a2efd !important",
  electric: "yellow !important",
  rock: "grey !important",
};
let typeToImage = {
  grass: "field.webp",
  fire: "fire.jpg",
  water: "water.avif",
  bug: "bug.jpeg",
  normal: "normal.jpeg",
  poison: "poison.jpg",
  ground: "ground.jpg",
  fairy: "fairy.jpg",
  psychic: "psychic.jpg",
  fighting: "fighting.jpg",
  ghost: "ghost.jpg",
  electric: "electric.jpg",
  rock: "rock.jpg",
};
let searchTimeout;

async function init() {
  hideLoadMoreButton();
  await loadAllPokemon();
  await loadAllPokemonNames();
  showLoadingScreen();
  await loadPokemon();
  await loadAllPokemonTypes();
  updateTypeButtons();
  endLoadingScreen();
}
/* load functions */
async function loadAllPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/?offset=${pokemonoffset}&limit=${pokemonLoadAmmount}`;
  let response = await fetch(url);
  newPokemon = await response.json();
  for (let i = 0; i < newPokemon.results.length; i++) {
    await allPokemon.push(newPokemon.results[i]);
  }
}
function loadMorePkmn() {
  pokemonoffset += 20;
  init();
}

function loadAllPokemonNames() {
  for (let i = 0 + pokemonoffset; i < allPokemon.length; i++) {
    allPokemonNames.push(allPokemon[i]["name"]);
  }
}

function loadAllPokemonTypes() {
  for (let i = 0 + pokemonoffset; i < allPokemon.length; i++) {
    allPokemonTypes.push(currentPokemon[i]["types"]["0"]["type"]["name"]);
    renderPokemonInfo(i);
  }
}

async function loadPokemon() {
  for (let i = 0 + pokemonoffset; i < allPokemonNames.length; i++) {
    let pokemon = allPokemonNames[i];

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    currentPokemon[i] = await response.json();
  }
}

/* color or background changes */
function changePokemonCardBackground(i) {
  let img = typeToImage[allPokemonTypes[i]];
  if (img) {
    backgroundColorCards = `style="background-image: url(./img/${img});"`;
  }
}
function changePokemonCardBackgroundRight(i) {
  let type = allPokemonTypes[i + 1];
  let image = typeToImage[type];

  if (image) {
    backgroundColorCardsright = `style="background-image: url(./img/${image});"`;
  }
}

function changePokemonCardBackgroundLeft(i) {
  let type = allPokemonTypes[i - 1];
  let image = typeToImage[type];

  if (image) {
    backgroundColorCardsleft = `style="background-image: url(./img/${image});"`;
  }
}
function createColoredTypeButton(i) {
  let typeLength = currentPokemon[i]["types"].length;

  if (typeLength >= 1) {
    let type1 = currentPokemon[i]["types"][0]["type"]["name"];
    typebgcolor1 = typeColorMap[type1] || "defaultColor";
  }

  if (typeLength === 2) {
    let type2 = currentPokemon[i]["types"][1]["type"]["name"];
    typebgcolor2 = typeColorMap[type2] || "defaultColor";
  }
}

/* Big Pokemoncard generation */
function openPokemonCard(i) {
  changePokemonCardBackground(i);
  renderPokemoncard(i);
}

function createChart(i) {
  let ctx = document.getElementById("myChart");

  let hp = currentPokemon[i]["stats"]["0"]["base_stat"];
  let attack = currentPokemon[i]["stats"]["1"]["base_stat"];
  let defense = currentPokemon[i]["stats"]["2"]["base_stat"];
  let specialattack = currentPokemon[i]["stats"]["3"]["base_stat"];
  let specialdefense = currentPokemon[i]["stats"]["4"]["base_stat"];
  let speed = currentPokemon[i]["stats"]["5"]["base_stat"];

  new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "HP",
        "ATTACK",
        "DEFENSE",
        "SPECIAL-ATTACK",
        "SPECIAL-DEFENSE",
        "SPEED",
      ],
      datasets: [
        {
          label: "Base stats",
          data: [hp, attack, defense, specialattack, specialdefense, speed],
          backgroundColor: "rgba(255, 0, 0, 0.52)", 
          borderColor: "rgba(101, 15, 181, 0.3)", 
          borderWidth: 0.5,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 1,
          pointLabels: {
            font: {
              size: 10,
              weight: 700,
            },
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  });
}

function pokeInformationRequest(i) {
  if (currentPokemon[i]["types"].length == 1) {
    addtypes = `<span class="badge bg-secondary" style="background-color:${typebgcolor1}">${currentPokemon[i]["types"]["0"]["type"]["name"]}</span>`;
  }
  if (currentPokemon[i]["types"].length == 2) {
    addtypes = `<span class="badge bg-secondary" style="background-color:${typebgcolor1}">${currentPokemon[i]["types"]["0"]["type"]["name"]}</span> & <span class="badge bg-secondary" style="background-color:${typebgcolor2}"> ${currentPokemon[i]["types"]["1"]["type"]["name"]}</span>`;
  }
  if (currentPokemon[i]["abilities"].length == 1) {
    addAbilities = `${currentPokemon[i]["abilities"]["0"]["ability"]["name"]}`;
  }
  if (currentPokemon[i]["abilities"].length == 2) {
    addAbilities = `${currentPokemon[i]["abilities"]["0"]["ability"]["name"]} & ${currentPokemon[i]["abilities"]["1"]["ability"]["name"]} `;
  }
}
function Pokemonchange(i) {
  if (
    currentPokemon[i - 1] &&
    currentPokemon[i - 1]["sprites"]["other"]["official-artwork"][
      "front_default"
    ]
  ) {
    changePokemonCardBackgroundLeft(i);
    pokemonleft = `<div onclick="stop(event);openPokemonCard(${
      i - 1
    });" class="pokemonleft" ${backgroundColorCardsleft}><img class="pokecardimg" src="${
      currentPokemon[i - 1]["sprites"]["other"]["official-artwork"][
        "front_default"
      ]
    }" alt=""> </div>`;
  }
  if (
    currentPokemon[i + 1] &&
    currentPokemon[i + 1]["sprites"]["other"]["official-artwork"][
      "front_default"
    ]
  ) {
    changePokemonCardBackgroundRight(i);
    pokemonright = `<div onclick="stop(event);openPokemonCard(${
      i + 1
    });" class="pokemonright" ${backgroundColorCardsright}><img class="pokecardimg" src="${
      currentPokemon[i + 1]["sprites"]["other"]["official-artwork"][
        "front_default"
      ]
    }" alt=""> </div>`;
  }
}
async function renderPokemoncard(i) {
  await createColoredTypeButton(i);
  await pokeInformationRequest(i);
  await Pokemonchange(i);

  currentPokemon[i]["types"].length;
  document.getElementById("fullScreenCard").innerHTML = ``;
  document.getElementById("fullScreenCard").style.display = "flex";
  document.getElementById("fullScreenCard").innerHTML = `
  ${pokemonleft}
  <div id="fullscreenCardSmall" class="fullscreen_card_small" ${backgroundColorCards}>
  
  <div class="pkmnNameAndImg">
     <h2>${currentPokemon[i]["name"]}</h2>
     <img class="pokecardimg" src="${currentPokemon[i]["sprites"]["other"]["official-artwork"]["front_default"]}" alt="">
  </div>
  <div class="line"></div>
  <div class="pkmninfo">
  
     <div id="typesection" class="types_section">
        <div class="show_types" id="showTypes">
        <div class="pkmn_img_mediaquery" > ${currentPokemon[i]["name"]} <img src="${currentPokemon[i]["sprites"]["other"]["official-artwork"]["front_default"]}" style="display: none;"></div>
           Types: 
           <p>${addtypes}</p>
           
        </div>
     </div>
     <div id="abilitysection" class="abilitys_section">
        <div class="show_abilitys" id="showTypes">
           Start Abilities: 
           <p>${addAbilities}</p>
        </div>
     </div>
     <div id="statssection" class="stats_section">
        <div class="show_stats" id="showTypes">
           Base Stats:
           <canvas class="myChart" id="myChart"></canvas>
        </div>
     </div>
  </div>
  </div>
  ${pokemonright}
  `;
  createChart(i);
}
function stop(event) {
  event.stopPropagation();
}
function closePokemonCard() {
  document.getElementById("fullScreenCard").style.display = "none";
}

/* small Pokemoncard generation */
function renderPokemonInfo(i) {
  let pokeInfoBgColor = "";

  if (allPokemonTypes[i] == "grass") {
    pokeInfoBgColor = "#4cc94c";
  }

  if (allPokemonTypes[i] == "fire") {
    pokeInfoBgColor = "#F3B34C";
  }

  if (allPokemonTypes[i] == "water") {
    pokeInfoBgColor = "lightblue";
  }

  if (allPokemonTypes[i] == "bug") {
    pokeInfoBgColor = "lightgreen";
  }

  if (allPokemonTypes[i] == "normal") {
    pokeInfoBgColor = "gray";
  }
  if (allPokemonTypes[i] == "poison") {
    pokeInfoBgColor = "#C8A1C9";
  }
  if (allPokemonTypes[i] == "ground") {
    pokeInfoBgColor = "#a9988a";
  }
  if (allPokemonTypes[i] == "fairy") {
    pokeInfoBgColor = "#F8CED4";
  }
  if (allPokemonTypes[i] == "psychic") {
    pokeInfoBgColor = "#734171";
  }
  if (allPokemonTypes[i] == "fighting") {
    pokeInfoBgColor = "#615f5c";
  }
  if (allPokemonTypes[i] == "ghost") {
    pokeInfoBgColor = "#9a2efd";
  }
  if (allPokemonTypes[i] == "electric") {
    pokeInfoBgColor = "yellow";
  }
  if (allPokemonTypes[i] == "rock") {
    pokeInfoBgColor = "grey";
  }

  document.getElementById("bodyMainCards").innerHTML += `
  <div onclick="openPokemonCard(${i})" class="main_card" id="main_card" style="background-color: ${pokeInfoBgColor}">
  <div class="pokemon_card" id="pokemonCard">
     <h2 id="PokemonName">#${[i + 1]} ${currentPokemon[i]["name"]}</h2>
     <img class="pokemon_img" id="pokemon_img" src="${
       currentPokemon[i]["sprites"]["other"]["official-artwork"][
         "front_default"
       ]
     }" alt=""> 
  </div>
</div>
    `;
}

/* loading function */
function showLoadingScreen() {
  document.getElementById("loading").style.display = "flex";
  document.getElementById("loadMorePkmn").style.display = "none";
}

function endLoadingScreen() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("loadMorePkmn").style.display = "inline-block";
}

function hideLoadMoreButton() {
  document.getElementById("loadMorePkmn").style.display = "none";
}

/* search and filter functions */

function searchPokemon() {
  let searchTerm = document.getElementById("inputsearch").value.toLowerCase();

  let matchingPokemonIndex = allPokemonNames.findIndex(
    (pokemonName) => pokemonName.toLowerCase() === searchTerm
  );

  if (matchingPokemonIndex !== -1) {
    openPokemonCard(matchingPokemonIndex);
    updateMainCardList([matchingPokemonIndex]);
  } else {
    alert("Pokémon not found.");
  }
}

function updateMainCardList(filteredIndexes) {
  let mainCardContainer = document.getElementById("bodyMainCards");
  mainCardContainer.innerHTML = "";

  filteredIndexes.forEach((index) => {
    renderPokemonInfo(index);
  });
}

function handleSearchInput(inputElement) {
  clearTimeout(searchTimeout);

  let searchTerm = inputElement.value.trim().toLowerCase();

  if (searchTerm.length >= 3) {
    searchTimeout = setTimeout(() => {
      let matchingPokemonIndexes = allPokemonNames.reduce(
        (acc, pokemonName, index) => {
          if (pokemonName.toLowerCase().startsWith(searchTerm)) {
            acc.push(index);
          }
          return acc;
        },
        []
      );

      updateMainCardList(matchingPokemonIndexes);
    }, 300);
  } else {
    updateMainCardList(allPokemonNames.map((_, index) => index));
  }
}

function filterPokemonByType(type) {
  let matchingPokemonIndexes = [];

  if (type === "reset") {
    matchingPokemonIndexes = Array.from(
      { length: allPokemonTypes.length },
      (_, i) => i
    );
  } else {
    for (let i = 0; i < allPokemonTypes.length; i++) {
      if (allPokemonTypes[i].includes(type)) {
        matchingPokemonIndexes.push(i);
      }
    }
  }

  updateMainCardList(matchingPokemonIndexes);
}

function updateTypeButtons() {
  document.getElementById("typeButtons").innerHTML = "";
  let uniqueTypes = Array.from(new Set(allPokemonTypes));


  let resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.classList = "badge";
  resetButton.onclick = () => filterPokemonByType("reset");
  document.getElementById("typeButtons").appendChild(resetButton);

  uniqueTypes.forEach((type) => {
    let button = document.createElement("button");
    button.textContent = type.charAt(0).toUpperCase() + type.slice(1);


    if (typeColors[type]) {
      button.style.backgroundColor = typeColors[type];
    }

    button.classList = "badge";
    button.onclick = () => filterPokemonByType(type);
    document.getElementById("typeButtons").appendChild(button);
  });
}

function openTypeMenu() {
  let bar = document.getElementById("buttonbar");
  let arrow = document.getElementById("arrow");

  if (bar.style.display === "none") {
    bar.style.display = "flex";
    arrow.classList.add("rotate");
  } else {
    bar.style.display = "none";
    arrow.classList.remove("rotate");
  }
}

function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
}
function checkScrollPosition() {
  let windowHeight = window.innerHeight;
  let documentHeight = document.documentElement.scrollHeight;
  let scrollPosition = window.scrollY;

  if (scrollPosition + windowHeight >= documentHeight) {
    loadMorePkmn();
  }
}
let debouncedCheckScroll = debounce(checkScrollPosition, 100);

// Event-Listener hinzufügen
window.addEventListener("scroll", debouncedCheckScroll);