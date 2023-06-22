"use client";
import { useEffect, useState } from "react";
import {
  IndexedPokemon,
  IndexedType,
  ListPokemon,
  PokemonListResponse,
  PokemonTypeListResponse,
} from "../interfaces/pokemon.intrerface";
import {
  POKEMON_API_POKEMON_URL,
  POKEMON_IMAGES_BASE_URL,
  POKEMON_TYPES,
} from "../constants";
import { httpClient } from "../api/httpClient";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<ListPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    POKEMON_API_POKEMON_URL
  );
  const [selectedType, setSelectedType] = useState<IndexedType | null>(null);

  useEffect(() => {
    if (selectedType) {
      getPokemonsByType();
    } else {
      getPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

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
        setNextUrl(result.data.next);
      }
    }
  };

  const getPokemonsByType = async () => {
    if (selectedType) {
      const result = await httpClient.get<PokemonTypeListResponse>(
        selectedType.url
      );
      if (result.data.pokemon) {
        const listPokemons = result.data.pokemon.map((p) =>
          IndexedPokemonToListPokemon(p.pokemon)
        );
        setPokemons(listPokemons);
        setNextUrl(POKEMON_API_POKEMON_URL);
      }
    }
  };

  return {
    pokemons,
    fetchNextPage: getPokemons,
    hasMorePokemon: !!nextUrl,
    pokemonTypes: POKEMON_TYPES,
    setSelectedType,
    selectedType,
    setPokemons,
  };
};

export default usePokemons;
