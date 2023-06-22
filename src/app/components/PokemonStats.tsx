import React from "react";
import { DetailPokemon } from "../interfaces/pokemon.intrerface";

interface PokemonStatsProps {
  pokemon: DetailPokemon;
}

const PokemonStats = ({ pokemon }: PokemonStatsProps) => {
  return (
    <div className="flex gap-3 rounded border p-3" >
      {pokemon.stats.map((stat) => (
        <div key={stat.base_stat}>
          <p>{stat.stat.name}</p>
          <p className="text-xs text-center" >{stat.base_stat}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonStats;
