import PokemonList from "../Pokemon-List/PokemonList";
import Search from "../search/search";
import './Pokedex.css';

function Pokedex(){

    return(
        <>
        <div className="pokedex-wrapper">
            
            <Search/>
            <PokemonList/>
        </div>
            
        </>
    )
}

export default Pokedex;