import './Search.css';

function Search() {
  return (
    <>
      <div className="search-wrapper">
        <input
          id="pokemon-name-search"
          type="text"
          placeholder="Search for a Pokémon..."
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
}
export default Search;
