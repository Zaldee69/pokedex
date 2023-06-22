"use client";
import PokemonList from "./components/PokemonList";
import usePokemons from "./hooks/usePokemons";
import { IndexedType } from "./interfaces/pokemon.intrerface";

export default function Home() {
  const {
    pokemons,
    hasMorePokemon,
    fetchNextPage,
    pokemonTypes,
    setSelectedType,
    selectedType,
    setPokemons,
  } = usePokemons();

  const handleSelectedType = (type: IndexedType | null) => {
    if (type) {
      setSelectedType(type);
    } else {
      setPokemons([]);
      setSelectedType(null);
    }
  };

  return (
    <main className="flex min-h-screen max-w-2xl mx-auto flex-col items-center justify-between ">
      <div className="mt-10 border w-full rounded-md p-5">
        <h1 className="text-center font-semibold">Pokédex</h1>
        <div>
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {pokemonTypes.map((type) => (
              <button
                onClick={() => handleSelectedType(type)}
                className="border uppercase rounded px-2 py-1 text-xs"
                key={type.name}
              >
                {type.name}
              </button>
            ))}
            <button
                onClick={() => handleSelectedType(null)}
                className="border rounded px-2 py-1 text-xs"
              >
                ALL
              </button>
          </div>
          <div>
            <PokemonList pokemons={pokemons} />
            {hasMorePokemon ? (
              <button
                className="block mx-auto text-sm mt-10"
                onClick={fetchNextPage}
              >
                Load more
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
