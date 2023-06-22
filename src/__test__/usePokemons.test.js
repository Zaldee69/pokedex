import { renderHook } from "@testing-library/react-hooks";
import usePokemon from "../app/hooks/usePokemon";
import usePokemons from "../app/hooks/usePokemons";
import  {httpClient}  from '../app/api/httpClient';

jest.mock("../app/api/httpClient");

describe("usePokemons", () => {
    beforeEach(() => {
      jest.resetAllMocks(); // Reset mocks before each test
    });
  
    it("fetches and sets the initial list of pokemons correctly", async () => {
      const mockedResponse = {
        data: {
          results: [
            { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
            { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
            { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
          ],
          next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
        },
      };
  
      httpClient.get.mockResolvedValueOnce(mockedResponse);
  
      const { result, waitForNextUpdate } = renderHook(() => usePokemons());
  
      await waitForNextUpdate();
  
      expect(result.current.pokemons).toHaveLength(3);
      expect(result.current.hasMorePokemon).toBe(true);
      expect(result.current.selectedType).toBe(null);
    });
  });