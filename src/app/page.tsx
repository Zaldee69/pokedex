import { pokemonNatures } from "./constants";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-2xl mx-auto flex-col items-center justify-between ">
      <div className="mt-10 border w-full rounded-md p-5">
        <h1 className="text-center font-semibold">Pokédex</h1>
        <form>
          <label htmlFor="" className="text-sm text-center block">
            Filter Pokémon by Nature
          </label>
          <div className="flex justify-center mt-1 gap-2">
            <select className="text-sm border px-2 py-1 rounded" name="pokemon-nature">
              {pokemonNatures.map((nature, idx) => (
                <option key={idx} value={nature.toLowerCase()}>
                  {nature}
                </option>
              ))}
            </select>
            <button
              className="bg-black text-sm text-white rounded px-2 "
              type="submit"
            >
              Filter
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
