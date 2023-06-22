import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonAvatar from "../app/components/PokemonAvatar";
import PokemonCard from "../app/components/PokemonCard";
import PokemonInfo from "../app/components/PokemonInfo";
import PokemonList from "../app/components/PokemonList";
import PokemonStats from "../app/components/PokemonStats";

describe("Pokemon Avatar", () => {
  const pokemon = {
    name: "Pikachu",
    id: 25,
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "http://localhost/_next/image?url=http%3A%2F%2Flocalhost%2F_next%2Fimage%3Furl%3Dhttps%253A%252F%252Fexample.com%252Fpikachu.png%26w%3D256%26q%3D75&w=256&q=75",
        },
      },
    },
  };

  it("renders the Pokemon name and ID correctly", () => {
    const { getByText } = render(<PokemonAvatar pokemon={pokemon} />);

    expect(getByText("Pikachu")).toBeInTheDocument();
    expect(getByText("#25")).toBeInTheDocument();
  });

  it("renders the Pokemon image with the correct src and alt attributes", () => {
    const { getByAltText } = render(<PokemonAvatar pokemon={pokemon} />);

    const imageElement = getByAltText("Pikachu");
    expect(imageElement).toBeInTheDocument();
  });
});

describe("PokemonCard", () => {
  const mockPokemon = {
    name: "bulbasaur",
    image: "https://example.com/bulbasaur.png",
    pokedexNumber: 1,
  };
  it("renders the Pokemon card with correct information", () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    const pokemonName = screen.getByText(/bulbasaur/i);
    const pokemonNumber = screen.getByText(/#1/i);
    const pokemonImage = screen.getByAltText(/bulbasaur/i);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonNumber).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute("width", "60");
    expect(pokemonImage).toHaveAttribute("height", "60");
  });

  it("renders the Pokemon card as a link with correct href", () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      "/details?pokemonName=bulbasaur"
    );
  });
});

describe("PokemonInfo", () => {
  const mockPokemon = {
    height: 10,
    weight: 100,
    abilities: [
      { slot: 1, ability: { name: "ability1" } },
      { slot: 2, ability: { name: "ability2" } },
    ],
    types: [
      { slot: 1, type: { name: "type1" } },
      { slot: 2, type: { name: "type2" } },
    ],
  };
  it("renders the Pokemon information correctly", () => {
    render(<PokemonInfo pokemon={mockPokemon} />);

    const heightElement = screen.getByText("Height");
    const weightElement = screen.getByText("Weight");
    const abilitiesElements = screen.getByText("Ability");
    const typesElements = screen.getByText("Types");

    expect(heightElement).toBeInTheDocument();

    expect(weightElement).toBeInTheDocument();

    expect(abilitiesElements).toBeInTheDocument();

    expect(typesElements).toBeInTheDocument();
  });
});

describe("PokemonList", () => {
  const mockPokemons = [
    {
      name: "bulbasaur",
      image: "https://example.com/bulbasaur.png",
      pokedexNumber: 1,
    },
    {
      name: "charmander",
      image: "https://example.com/charmander.png",
      pokedexNumber: 4,
    },
  ];
  it("renders the list of Pokemon cards correctly", () => {
    render(<PokemonList pokemons={mockPokemons} />);

    const pokemonCards = screen.getAllByRole("link");
    expect(pokemonCards).toHaveLength(2);

    pokemonCards.forEach((card, index) => {
      const pokemonName = screen.getByText(mockPokemons[index].name);
      const pokemonNumber = screen.getByText(
        `#${mockPokemons[index].pokedexNumber}`
      );
      const pokemonImage = screen.getByAltText(mockPokemons[index].name);

      expect(card).toBeInTheDocument();
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonNumber).toBeInTheDocument();
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute("src");
      expect(pokemonImage).toHaveAttribute("width", "60");
      expect(pokemonImage).toHaveAttribute("height", "60");
    });
  });
});

describe("PokemonStats", () => {
  const mockPokemon = {
    stats: [
      { stat: { name: "stat1" }, base_stat: 50 },
      { stat: { name: "stat2" }, base_stat: 70 },
      { stat: { name: "stat3" }, base_stat: 80 },
    ],
  };

  it("renders the Pokemon stats container with correct styles", () => {
    render(<PokemonStats pokemon={mockPokemon} />);

    const statsContainer = screen.getByTestId("stats-container");

    expect(statsContainer).toHaveClass("flex");
    expect(statsContainer).toHaveClass("gap-3");
    expect(statsContainer).toHaveClass("rounded");
    expect(statsContainer).toHaveClass("border");
    expect(statsContainer).toHaveClass("p-3");
  });
});
