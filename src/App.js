import React, { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./pokeball-icon.jpg";
import PokemonCard from "./PokemonCard";

const App = () => {
  //Number of Pokemon being displayed
  const [numPokemon, setNumPokemon] = useState(151);
  //List of pokemon
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [outputMessage, setMessage] = useState("");

  //Set the list of pokemon
  const getPokemon = async (numPokemon) => {
    setLoading(true);
    let pokemonArray = [];
    if (numPokemon >= 1 && numPokemon <= 900) {
      for (let i = 1; i <= numPokemon; i++) {
        pokemonArray.push(await getPokemonData(i));
      }
      setLoading(false);
    }

    console.log(pokemonArray);
    setPokemonList(pokemonArray);
  };

  //Fetch the data for a specific pokemon
  const getPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  };

  //Update the output message for user
  const updateMessage = () => {
    // If the user input is invalid (the number of pokemon is not 1 - 900)
    if (!(numPokemon >= 1 && numPokemon <= 900)) {
      // Set the message to:
      setMessage("Enter a value between 1 - 900");
    } else {
      //Otherwise, we'll set the output message to "Loading ..." to indicate we are loading the Pokemon
      setMessage("Loading Pokemon, please be patient ... ");
    }
  };

  // Website will default to the original 151 Pokemon
  useEffect(() => {
    getPokemon(151);
  }, []);

  return (
    <div className="app">
      <h1>POKEDEX</h1>

      <div className="specifyNumPokemon">
        <input
          placeholder="Enter a number between 1 - 900"
          //set new value for num pokemon
          onChange={(e) => setNumPokemon(e.target.value)}
        />
        <img
          src={searchIcon}
          onClick={() => {
            getPokemon(numPokemon);
            updateMessage();
          }}
        />
      </div>

      {loading ? (
        <h2> {outputMessage} </h2>
      ) : (
        <div className="container">
          {pokemonList.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
