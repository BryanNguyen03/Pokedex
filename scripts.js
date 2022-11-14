const app = document.getElementById('root');

// Create a request variable and assign a new XMLHttpsRequest object to it
var request = new XMLHttpRequest();

// Default number of Pokemon will be the first 151 Pokemon
var numPokemon = 151;

/**
 * [setNumPokemon will take the input numPokemon from a textbox and then call the requestPokemon() function to create numPokemon entries ]
 */
function setNumPokemon(){
    // If the value the user inputs is not a number, then we will alert them
    numPokemon = document.getElementById("numPokemon").value;
    if (isNaN(numPokemon) || numPokemon == 0){
        alert("Invalid Input, Please Enter a Number Greater Than 0");
    }
    else{
        requestPokemon(numPokemon);
    }
}

/**
 * [requestPokemon will take in a number and make a request. The function will then create an entry for every pokemon up to the given number]
 * @param {int} numPokemon [The number of Pokemon that will be listed]
 */
function requestPokemon(numPokemon){

// Open a new connection, using the GET request on the URL endpoint
var url = 'https://pokeapi.co/api/v2/pokemon?limit=' + numPokemon + '&offset=0';
request.open('GET', url, true);

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    var pokedex = data['results']

    // Since users can change the amount of Pokemon listed, clear it before adding the number of Pokemon they want
    document.getElementById('root').innerHTML = "";

    container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.appendChild(container);

    //For each element in data['results']
    if(request.status >= 200 && request.status < 400) {
        pokedex.forEach(async pokemon => {

            let myPokemonImage = await getPokemonImage(pokemon.name);

            // Create a div with a entry class (for each pokedex entry)
            const entry = document.createElement('div');
            entry.setAttribute('class', 'entry');

            // Create an h1 and set the text content to the pokemon name
            const h1 = document.createElement('h1');
            h1.textContent = pokemon.name;

            // Create an img and set it to the pokemon's icon
            const icon = document.createElement('img')
            icon.src = myPokemonImage

            //Append our entries to the container element
            container.appendChild(entry);

            //Each entry will contain an h1
            entry.appendChild(h1);
            entry.appendChild(icon);
        })        
    }
    else {
        console.log('error');
    }

}

// Send request
request.send()
}

/**
 * [Takes in a name of a Pokemon and returns it's sprite]
 * @param {String} name [The name of the Pokemon]
 * @returns the Pokemon's sprite
 */
async function getPokemonImage(name) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + name;
    let response = await fetch(url);
    let pokemonPage = await response.json();
    return pokemonPage["sprites"]["front_default"];
}

requestPokemon(numPokemon)
