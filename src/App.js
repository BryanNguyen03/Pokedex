import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";

const App = () => {
  //The search term users will use to find a specific Pokemon
  const [pokemonToFind, setPokemonToFind] = useState("");
  const [searching, setSearching] = useState(true);

  //A map for the state of each checkbox representing a generation of Pokemon
  const [checkedState, setCheckedState] = useState({
    gen1: true,
    gen2: false,
    gen3: false,
    gen4: false,
    gen5: false,
    gen6: false,
  });

  //The list of Pokemon, each list representing their generation (list2 is generation 2, list3 is generation 3...)
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonList2, setPokemonList2] = useState([]);
  const [pokemonList3, setPokemonList3] = useState([]);
  const [pokemonList4, setPokemonList4] = useState([]);
  const [pokemonList5, setPokemonList5] = useState([]);
  const [pokemonList6, setPokemonList6] = useState([]);

  /**
   *
   * @param {*} gen Which generation to handle
   * Changes the checkbox state for the given generation
   */
  const handleOnChange = (gen) => {
    let updatedCheckedState = checkedState;
    for (let i in updatedCheckedState) {
      if (gen == i) {
        updatedCheckedState[i] = !updatedCheckedState[i];
      } else {
        updatedCheckedState[i] = updatedCheckedState[i];
      }
    }

    console.log(updatedCheckedState);
    setCheckedState(updatedCheckedState);
    console.log(checkedState);
    updatePokemonList();
  };

  /**
   * @param {*} start the start index that the array should start (index representing a pokemon)
   * @param {*} end The end index that the array should end at
   * @param {*} gen The generation to load the array into
   */
  const loadArray = async (start, end, gen) => {
    //Load all pokemon starting from the 'start' all the way to the 'end' param
    let loadedArray = [];
    for (let i = start; i <= end; i++) {
      //Call the getPokemonData function, which will fetch the Pokemon's data using an index
      loadedArray.push(await getPokemonData(i));
    }

    // Depending on the 'gen' param, load the corresponding pokemon list
    if (gen === 1) {
      setPokemonList(loadedArray);
    }
    if (gen === 2) {
      setPokemonList2(loadedArray);
    }
    if (gen === 3) {
      setPokemonList3(loadedArray);
    }
    if (gen === 4) {
      setPokemonList4(loadedArray);
    }
    if (gen === 5) {
      setPokemonList5(loadedArray);
    }
    if (gen === 6) {
      setPokemonList6(loadedArray);
    }
  };

  /*
   * Loads the array for each generation of Pokemon depending on it's checkbox state
   * If a checkbox state is true, then the array will be loaded with Pokemon
   * Otherwise it will be an empty an Array
   */
  const updatePokemonList = async () => {
    // If the state of the generation 1 checkbox is true, we call the loadArray function to load the list
    // Otherwise, set it to an empty array
    if (checkedState["gen1"]) {
      loadArray(1, 151, 1);
    } else {
      setPokemonList([]);
    }

    // If the state of the generation 2 checkbox is true, we call the loadArray function to load the list
    // Otherwise, set it to an empty array
    if (checkedState["gen2"]) {
      loadArray(152, 251, 2);
    } else {
      setPokemonList2([]);
    }

    if (checkedState["gen3"]) {
      loadArray(252, 386, 3);
    } else {
      setPokemonList3([]);
    }

    if (checkedState["gen4"]) {
      loadArray(387, 493, 4);
    } else {
      setPokemonList4([]);
    }

    if (checkedState["gen5"]) {
      loadArray(494, 649, 5);
    } else {
      setPokemonList5([]);
    }

    if (checkedState["gen6"]) {
      loadArray(650, 721, 6);
    } else {
      setPokemonList6([]);
    }
  };

  //Fetch the data for a specific pokemon
  const getPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  };

  // Website will default to the original 151 Pokemon as the boolean for generation 1 is true by default
  useEffect(() => {
    // We do this by calling the updatePokemonList function which will load lists that have the checkbox state set to true
    updatePokemonList();
  }, []);

  return (
    <div className="app">
      <h1>POKEDEX</h1>
      <a className="githubLink" href="https://github.com/BryanNguyen03/Pokedex">
        Github
      </a>

      <div className="specifyNumPokemon">
        <input
          placeholder="Search Pokemon"
          //set new value for num pokemon
          onChange={(e) => setPokemonToFind(e.target.value)}
        />
      </div>

      <div className="filterCheckboxes">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={checkedState["gen1"]}
            onChange={() => handleOnChange("gen1")}
          />
          Generation 1
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={checkedState["gen2"]}
            onChange={() => handleOnChange("gen2")}
          />
          Generation 2
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={checkedState["gen3"]}
            onChange={() => handleOnChange("gen3")}
          />
          Generation 3
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={checkedState["gen4"]}
            onChange={() => handleOnChange("gen4")}
          />
          Generation 4
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={checkedState["gen5"]}
            onChange={() => handleOnChange("gen5")}
          />
          Generation 5
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={checkedState["gen6"]}
            onChange={() => handleOnChange("gen6")}
          />
          Generation 6
        </label>
      </div>

      {searching ? (
        <div className="container">
          {pokemonList.map(
            (pokemon) =>
              pokemon["name"].includes(pokemonToFind.toLowerCase()) && (
                <PokemonCard pokemon={pokemon} />
              )
          )}
          {pokemonList2.map(
            (pokemon) =>
              pokemon["name"].includes(pokemonToFind.toLowerCase()) && (
                <PokemonCard pokemon={pokemon} />
              )
          )}
          {pokemonList3.map(
            (pokemon) =>
              pokemon["name"].includes(pokemonToFind.toLowerCase()) && (
                <PokemonCard pokemon={pokemon} />
              )
          )}
          {pokemonList4.map(
            (pokemon) =>
              pokemon["name"].includes(pokemonToFind.toLowerCase()) && (
                <PokemonCard pokemon={pokemon} />
              )
          )}
          {pokemonList5.map(
            (pokemon) =>
              pokemon["name"].includes(pokemonToFind.toLowerCase()) && (
                <PokemonCard pokemon={pokemon} />
              )
          )}
          {pokemonList6.map(
            (pokemon) =>
              pokemon["name"].includes(pokemonToFind.toLowerCase()) && (
                <PokemonCard pokemon={pokemon} />
              )
          )}
        </div>
      ) : (
        <div className="container">
          {pokemonList.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
          {pokemonList2.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
          {pokemonList3.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
          {pokemonList4.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
          {pokemonList5.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
          {pokemonList6.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
