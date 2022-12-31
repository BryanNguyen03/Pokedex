import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemoncontainer">
      <div className="pokemonImage">
        <img src={pokemon["sprites"]["front_default"]} />
      </div>

      <div className="pokemon">
        <div className="pokemonName">
          <p>{pokemon["name"]}</p>
        </div>

        <div className="pokemonNumber">
          <p>#{pokemon.id}</p>
        </div>

        {pokemon["types"][1] != null ? (
          <div className="pokemonTyping">
            <p className="type">{pokemon["types"][0]["type"]["name"]}</p>
            <p className="type">{pokemon["types"][1]["type"]["name"]}</p>
          </div>
        ) : (
          <div className="pokemonTyping">
            <p className="type">{pokemon["types"][0]["type"]["name"]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
