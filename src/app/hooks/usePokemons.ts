"use client";
import { useEffect, useState } from "react";
import {
  IndexedPokemon,
  ListPokemon,
  PokemonListResponse,
} from "../interfaces/pokemon.intrerface";
import { POKEMON_API_POKEMON_URL, POKEMON_IMAGES_BASE_URL } from "../constants";
import { httpClient } from "../api/httpClient";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<ListPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    POKEMON_API_POKEMON_URL
  );

  useEffect(() => {
    getPokemons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const IndexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon) => {
    const pokedexNumber = parseInt(
      indexedPokemon.url
        .replace(`${POKEMON_API_POKEMON_URL}/`, "")
        .replace("/", "")
    );

    const listPokemonObject = {
      name: indexedPokemon.name,
      url: indexedPokemon.url,
      image: `${POKEMON_IMAGES_BASE_URL}/${pokedexNumber}.png`,
      pokedexNumber,
    };

    return listPokemonObject;
  };

  const getPokemons = async () => {
    if (nextUrl) {
      const result = await httpClient.get<PokemonListResponse>(nextUrl);
      if (result.data.results) {
        const listPokemons = result.data.results.map((p) =>
          IndexedPokemonToListPokemon(p)
        );
        setPokemons([...pokemons, ...listPokemons]);
        setNextUrl(result.data.next)
      }
    }
  };

  return {
    pokemons,
    fetchNextPage: getPokemons,
    hasMorePokemon: !!nextUrl
  };
};

export default usePokemons;
