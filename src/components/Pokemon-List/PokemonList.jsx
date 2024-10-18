import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  async function downloadPokemons() {

    setIsLoading(true);
    const response = await axios.get(pokedexUrl); // this DOWNLOADS THE LIST OF 20 POKEMONS FROM API
    const pokemonResults = response.data.results; // we get the array of pokemons from the results

    console.log(response.data);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);


    // Iterating over the array of pokemons, and using their url, to create an array of promises
    // that will download those 20 pokemons
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // using axios.all to wait for all promises to resolve, and then storing the resolved data in pokemonData
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);

    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(res);
    setPokemonsList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <>
      <div className="pokemon-list-wrapper">
        <div className="pokemon-wrapper">
          {isLoading
            ? "Downloading in progress"
            : pokemonList.map((p) => (
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
              ))}
        </div>

        <div className="controls" >
          <button disabled={prevUrl == null} onClick={() => setPokedexUrl(prevUrl) } >prev</button>
          <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)} >next</button>

        </div>
      </div>
    </>
  );
}
export default PokemonList;
