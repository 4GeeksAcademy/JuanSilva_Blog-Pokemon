import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CardPoke = ({ pokemon }) => {
  const { store, dispatch } = useGlobalReducer();
  
  // Extraer ID del pokémon de la URL
  const pokemonId = pokemon.url.split('/').filter(part => part).pop();
  
  // Verificar si es favorito
  const isFavorite = store.favorites.pokemons.includes(pokemonId);
  
  // Función para alternar favorito
  const toggleFavorite = () => {
    dispatch({ type: 'toggle_favorite_pokemon', payload: pokemonId });
  };

  return (
    <div className="card h-100 shadow-sm" style={{ minWidth: '250px' }}>
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`} 
        className="card-img-top p-3" 
        alt={pokemon.name}
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center" style={{ color: '#FFCC00' }}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h5>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link 
            to={`/pokemon/${pokemonId}`} 
            className="btn btn-primary btn-sm"
          >
            Ver más...
          </Link>
          
          <button 
            className="btn btn-link p-0"
            onClick={toggleFavorite}
          >
            <i 
              className={`fa-heart ${isFavorite ? 'fas text-warning' : 'far'}`}
              style={{ fontSize: '1.5rem' }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPoke;