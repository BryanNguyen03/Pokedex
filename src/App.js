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

  //Set the list of pokemon
  const getPokemon = async (numPokemon) => {
    setLoading(true);
    let pokemonArray = [];
    for (let i = 1; i <= numPokemon; i++) {
      pokemonArray.push(await getPokemonData(i));
    }

    console.log(pokemonArray);
    setPokemonList(pokemonArray);
    setLoading(false);
  };

  //Fetch the data for a specific pokemon
  const getPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
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
        <img src={searchIcon} onClick={() => getPokemon(numPokemon)} />
      </div>

      {loading ? (
        <h2> Loading ... </h2>
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
