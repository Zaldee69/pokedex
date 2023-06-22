import React from "react";
import { ListPokemon } from "../interfaces/pokemon.intrerface";
import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  pokemon: ListPokemon;
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Link href={`/details?pokemonName=${pokemon.name}`}>
      <div className="border flex items-center flex-col p-3 rounded min-w-2xl">
        <Image src={pokemon.image} width={60} height={60} alt={pokemon.name} />
        <p className="text-xs">{pokemon.name}</p>
        <p className="text-xs">#{pokemon.pokedexNumber}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
