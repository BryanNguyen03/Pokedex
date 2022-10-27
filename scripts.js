const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

// Create a request variable and assign a new XMLHttpsRequest object to it
var request = new XMLHttpRequest();

// Variable to store the number of pokemon that will be listed
var numPokemon = 151;

// Open a new connection, using the GET request on the URL endpoint
var url = 'https://pokeapi.co/api/v2/pokemon?limit=' + numPokemon + '&offset=0';
request.open('GET', url, true);

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    var pokedex = data['results']

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

async function getPokemonImage(name) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + name;
    let response = await fetch(url);
    let pokemonPage = await response.json();
    return pokemonPage["sprites"]["front_default"];
}

// Send request
request.send()