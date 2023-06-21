"use client";
import { useEffect, useState } from "react";
import {
  IndexedPokemon,
  PokemonListResponse,
} from "../interfaces/pokemon.intrerface";
import { POKEMON_API_POKEMON_URL } from "../constants";
import { httpClient } from "../api/httpClient";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<IndexedPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    POKEMON_API_POKEMON_URL
  );

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    if (nextUrl) {
      const result = await httpClient.get<PokemonListResponse>(nextUrl);
      if(result.data.results){
        setPokemons(result.data.results)
      }
    }
  };

  return {
    pokemons,
  };
};

export default usePokemons;
