const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

// Create a request variable and assign a new XMLHttpsRequest object to it
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
var numPokemon = 151;
var url = 'https://pokeapi.co/api/v2/pokemon?limit=' + numPokemon + '&offset=0';
request.open('GET', url, true);

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    //The data is formatted such that you have:
    // console.log(data['results'][x]['name'])
    //Where ['results'] contains all the pokemon
    //[x] is the pokemon number (so 1 is bulbasaur, 2 is ivysaur, etc)
    //then ['name'] will access their name

    var pokedex = data['results']

    //For each element in data['results']
    if(request.status >= 200 && request.status < 400) {
        pokedex.forEach(pokemon => {
            //print their name
            console.log(pokemon.name);

            // Create a div with a entry class (for each pokedex entry)
            const entry = document.createElement('div');
            entry.setAttribute('class', 'entry');

            // Create an h1 and set the text content to the pokemon name
            const h1 = document.createElement('h1');
            h1.textContent = pokemon.name;

            // Create an img and set it to the pokemon's icon
            /*
            const icon = document.createElement('img')
            icon.src = pokemon.img*/

            //Append our entries to the container element
            container.appendChild(entry);

            //Each entry will contain an h1
            entry.appendChild(h1);

        })        
    }
    else {
        console.log('error');
    }

}

// Send request
request.send()