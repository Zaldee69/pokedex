import { renderHook } from "@testing-library/react-hooks";
import usePokemon from "../app/hooks/usePokemon";
import usePokemons from "../app/hooks/usePokemons";
import  {httpClient}  from '../app/api/httpClient';
import { act } from "react-dom/test-utils"; // Import act from react-dom/test-utils



jest.mock("../app/api/httpClient");

describe("usePokemon", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches and sets the pokemon data correctly", async () => {
    const pokemonName = "pikachu";
    const mockedPokemon = { name: "Pikachu", type: "Electric" };
    const mockedResponse = { data: mockedPokemon };

    httpClient.get.mockResolvedValueOnce(mockedResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      usePokemon({ pokemonName })
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.pokemon).toEqual(mockedPokemon);
    expect(result.current.isLoading).toBe(false);
  });

  it("does not fetch pokemon data if pokemonName is null", async () => {
    const { result } = renderHook(() => usePokemon({ pokemonName: null }));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.pokemon).toBe(null);
  });
});