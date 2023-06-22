import React from "react";
import PokemonCard from "./PokemonCard";
import { ListPokemon } from "../interfaces/pokemon.intrerface";

interface PokemonListProps {
  pokemons: ListPokemon[];
};

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <div className="grid grid-cols-4 mt-10 gap-3 justify-center" >
      {pokemons.map((p) => (
        <PokemonCard key={p.name} pokemon={p} />
      ))}
    </div>
  );
};

export default PokemonList;
