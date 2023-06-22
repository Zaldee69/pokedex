"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import usePokemon from "../hooks/usePokemon";
import PokemonAvatar from "../components/PokemonAvatar";
import PokemonInfo from "../components/PokemonInfo";
import PokemonStats from "../components/PokemonStats";
import Link from "next/link";

const Page = () => {
  const searchParams = useSearchParams();
  const pokemonName = searchParams.get("pokemonName");

  const { pokemon, isLoading } = usePokemon({ pokemonName });

  return (
    <div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : pokemon ? (
        <div className="flex flex-col items-center gap-3 mt-3">
          <PokemonAvatar pokemon={pokemon} />
          <PokemonInfo pokemon={pokemon} />
          <PokemonStats pokemon={pokemon} />
        </div>
      ) : (
        <p className="text-center">Pokemon not found</p>
      )}
      <Link href="/" >
        <p className="text-center mt-3" >Back to home</p>
      </Link>
    </div>
  );
};

export default Page;
