import React from "react";
import { DetailPokemon } from "../interfaces/pokemon.intrerface";
import Image from "next/image";

interface PokemonAvatarProps {
  pokemon: DetailPokemon;
}

const PokemonAvatar = ({ pokemon }: PokemonAvatarProps) => {
  return (
    <div>
      <div className="border flex items-center flex-col p-3 rounded">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default || ""}
          width={100}
          height={100}
          alt={pokemon.name || ""}
        />
        <p className="text-xs">{pokemon.name}</p>
        <p className="text-xs">#{pokemon.id}</p>
      </div>
    </div>
  );
};

export default PokemonAvatar;
