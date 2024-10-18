import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  // Fetch the detailed information from a API or database using the provided id.
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-details">
      <img className="pokemon-details-image" src={pokemon.image} />
      <div className="pokemon-details-name">{" "}<span>{pokemon.name}</span></div>

      <div className="pokemon-details-weight">weight:{" "}<span>{pokemon.weight}</span>{" "}<span className="values">pounds</span></div>
      <div className="pokemon-details-height">height:{" "}<span>{pokemon.height}</span>{" "}<span className="values">meters</span></div>
      <div className="pokemon-details-types">
        {" "}
        <p className="types-wrapper">
          types : {" "}
          {pokemon.types &&
            pokemon.types.map((t, index) => (
              
              <span key={t}>
                {t}
                {index < pokemon.types.length - 1 && ", "}
              </span>
            ))}
        </p>
        {/* <p className="types-wrapper">types:
        
          {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}{" "}</p>
         */}
      </div>
      <Link to={'/'} ><button className="home-button" >Home</button></Link>
    </div>
  );
}
export default PokemonDetails;
