import useGlobalReducer from "../hooks/useGlobalReducer";
import CardPoke from "../components/CardPoke";
import CardItem from "../components/CardItem";

// Datos estáticos de respaldo
const staticPokemons = [
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
  { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
  { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
  { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
];

const staticItems = [
  { name: 'potion', url: 'https://pokeapi.co/api/v2/item/1/' },
  { name: 'super-potion', url: 'https://pokeapi.co/api/v2/item/2/' },
  { name: 'hyper-potion', url: 'https://pokeapi.co/api/v2/item/3/' },
  { name: 'max-potion', url: 'https://pokeapi.co/api/v2/item/4/' },
  { name: 'full-restore', url: 'https://pokeapi.co/api/v2/item/5/' },
  { name: 'revive', url: 'https://pokeapi.co/api/v2/item/6/' },
  { name: 'antidote', url: 'https://pokeapi.co/api/v2/item/7/' },
  { name: 'burn-heal', url: 'https://pokeapi.co/api/v2/item/8/' },
];

export const Home = () => {
  const { store } = useGlobalReducer();

  // Usar datos del store o datos estáticos
  const displayPokemons = store.pokemons.length > 0 ? store.pokemons : staticPokemons;
  const displayItems = store.items.length > 0 ? store.items : staticItems;

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#E8F4FF', minHeight: '100vh' }}>

      {/* Sección de Pokémones */}
      <section className="mb-5">
        <h2 className="mb-4 text-center">Pokémones Destacados</h2>
        <div className="d-flex overflow-auto pb-3" style={{ gap: '1rem' }}>
          {displayPokemons.map(pokemon => (
            <CardPoke key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </section>

      {/* Sección de Items */}
      <section>
        <h2 className="mb-4 text-center">Items de Pokémon</h2>
        <div className="d-flex overflow-auto pb-3" style={{ gap: '1rem' }}>
          {displayItems.map(item => (
            <CardItem key={item.name} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};