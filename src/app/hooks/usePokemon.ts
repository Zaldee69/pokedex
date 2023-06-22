import { useEffect, useState } from "react";
import { DetailPokemon } from "../interfaces/pokemon.intrerface";
import { POKEMON_API_POKEMON_URL } from "../constants";
import { httpClient } from "../api/httpClient";

interface usePokemonProps {
  pokemonName: string | null;
}

const usePokemon = ({ pokemonName }: usePokemonProps) => {
  const [pokemon, setPokemon] = useState<DetailPokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPokemon = async () => {
    if (pokemonName) {
      setIsLoading(true);
      const url = `${POKEMON_API_POKEMON_URL}/${pokemonName}`;
      const result = await httpClient.get<DetailPokemon>(url);
      if (result.data) {
        setPokemon(result.data);
      }
      setIsLoading(false);
    }
  };

  return {
    pokemon,
    isLoading,
  };
};

export default usePokemon;
