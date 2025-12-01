export const initialStore=()=>{
  return{
    pokemons: [],
    items: [],
    favorites: {
    pokemons: [],
    items: []    
    }
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'set_pokemons':
      return {
        ...store,
        pokemons: action.payload
      };
    
    case 'set_items':
      return {
        ...store,
        items: action.payload
      };
    
    case 'toggle_favorite_pokemon':
      const pokemonId = action.payload;
      const isPokemonFavorite = store.favorites.pokemons.includes(pokemonId);
      
      return {
        ...store,
        favorites: {
          ...store.favorites,
          pokemons: isPokemonFavorite 
            ? store.favorites.pokemons.filter(id => id !== pokemonId)
            : [...store.favorites.pokemons, pokemonId]
        }
      };
    
    case 'toggle_favorite_item':
      const itemId = action.payload;
      const isItemFavorite = store.favorites.items.includes(itemId);
      
      return {
        ...store,
        favorites: {
          ...store.favorites,
          items: isItemFavorite 
            ? store.favorites.items.filter(id => id !== itemId)
            : [...store.favorites.items, itemId]
        }
      };
    
    default:
      throw Error('Unknown action: ' + action.type);
  }    
}