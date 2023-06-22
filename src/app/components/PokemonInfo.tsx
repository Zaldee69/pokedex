import React from "react";
import { DetailPokemon } from "../interfaces/pokemon.intrerface";

interface PokemonInfoProps {
  pokemon: DetailPokemon;
}

const PokemonInfo = ({ pokemon }: PokemonInfoProps) => {
  return (
    <div className="flex gap-3 border p-3 rounded">
      <div>
        <p>Height</p>
        <p className="text-xs text-center">{pokemon.height}</p>
      </div>
      <div>
        <p>Weight</p>
        <p className="text-xs text-center">{pokemon.weight}</p>
      </div>
      <div>
        <p>Ability</p>
        {pokemon.abilities.map((ability) => (
          <p className="text-xs text-center" key={ability.slot}>
            {ability.ability.name}
          </p>
        ))}
      </div>
      <div>
        <p>Types</p>
        {pokemon.types.map((type) => (
          <p className="text-xs text-center" key={type.slot}>
            {type.type.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PokemonInfo;
