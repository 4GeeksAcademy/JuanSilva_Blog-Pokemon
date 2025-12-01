import useGlobalReducer from "../hooks/useGlobalReducer";

const Favorites = () => {
  const { store } = useGlobalReducer();

  // Obtener pokémones favoritos
  const favoritePokemons = store.pokemons.filter(pokemon => {
    const pokemonId = pokemon.url.split('/').filter(part => part).pop();
    return store.favorites.pokemons.includes(pokemonId);
  });

  // Obtener items favoritos
  const favoriteItems = store.items.filter(item => {
    const itemId = item.url.split('/').filter(part => part).pop();
    return store.favorites.items.includes(itemId);
  });

  return (
    <div className="container py-4">
      <h1>Favoritos</h1>

      <h2>Pokémones Favoritos</h2>
      <div className="row">
        {favoritePokemons.map(pokemon => (
          <div key={pokemon.name} className="col-md-3 mb-4">
            {/* Renderizar card de pokémon favorito */}
          </div>
        ))}
      </div>

      <h2>Items Favoritos</h2>
      <div className="row">
        {favoriteItems.map(item => (
          <div key={item.name} className="col-md-3 mb-4">
            {/* Renderizar card de item favorito */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
