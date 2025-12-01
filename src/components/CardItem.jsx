import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CardItem = ({ item }) => {
  const { store, dispatch } = useGlobalReducer();
  
  // Extraer ID del item de la URL
  const itemId = item.url.split('/').filter(part => part).pop();
  
  // Verificar si es favorito
  const isFavorite = store.favorites.items.includes(itemId);
  
  // Función para alternar favorito
  const toggleFavorite = () => {
    dispatch({ type: 'toggle_favorite_item', payload: itemId });
  };

  return (
    <div className="card h-100 shadow-sm" style={{ minWidth: '250px' }}>
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`} 
        className="card-img-top p-3" 
        alt={item.name}
        style={{ height: '200px', objectFit: 'contain' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center" style={{ color: '#FFCC00' }}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1).replace('-', ' ')}
        </h5>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link 
            to={`/item/${itemId}`} 
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

export default CardItem;