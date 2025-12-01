import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect, useRef } from "react";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const [showFavorites, setShowFavorites] = useState(false);
	const dropdownRef = useRef(null);

	// Cerrar dropdown al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowFavorites(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Calcular total de favoritos
	const totalFavorites = store.favorites.pokemons.length + store.favorites.items.length;

	// Obtener pokémones favoritos con IDs
	const favoritePokemons = store.favorites.pokemons.map(pokemonId => {
		const pokemon = store.pokemons.find(p => {
			const id = p.url.split('/').filter(part => part).pop();
			return id === pokemonId;
		});
		return {
			id: pokemonId,
			name: pokemon ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : `Pokémon ${pokemonId}`
		};
	});

	// Obtener items favoritos con IDs
	const favoriteItems = store.favorites.items.map(itemId => {
		const item = store.items.find(i => {
			const id = i.url.split('/').filter(part => part).pop();
			return id === itemId;
		});
		return {
			id: itemId,
			name: item ? item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/-/g, ' ') : `Item ${itemId}`
		};
	});

	// Función para eliminar pokémon favorito
	const removePokemonFavorite = (pokemonId, event) => {
		event.stopPropagation(); // Evitar que se cierre el dropdown
		dispatch({ type: 'toggle_favorite_pokemon', payload: pokemonId });
	};

	// Función para eliminar item favorito
	const removeItemFavorite = (itemId, event) => {
		event.stopPropagation(); // Evitar que se cierre el dropdown
		dispatch({ type: 'toggle_favorite_item', payload: itemId });
	};

	const toggleFavorites = () => {
		setShowFavorites(!showFavorites);
	};

	return (
		<nav className="navbar navbar-light bg-light sticky-top">
			<div className="container">
				<Link to="/" className="navbar-brand mb-0 h1 fw-bold">
					PokeBlog
				</Link>

				<div className="dropdown" ref={dropdownRef}>
					<button
						className="btn btn-primary dropdown-toggle"
						type="button"
						onClick={toggleFavorites}
						aria-expanded={showFavorites}
					>
						Favoritos ({totalFavorites})
					</button>

					<div className={`dropdown-menu ${showFavorites ? 'show' : ''} position-absolute end-0`}
						style={{ maxHeight: '400px', overflowY: 'auto', minWidth: '280px' }}>

						{/* Pokémones Favoritos */}
						<h6 className="dropdown-header text-primary d-flex justify-content-between align-items-center">
							<span>Pokémones Favoritos ({store.favorites.pokemons.length})</span>
						</h6>
						{favoritePokemons.length > 0 ? (
							favoritePokemons.map((pokemon) => (
								<div key={`pokemon-${pokemon.id}`} className="dropdown-item d-flex justify-content-between align-items-center">
									<span className="text-truncate" style={{ maxWidth: '200px' }}>
										{pokemon.name}
									</span>
									<button
										className="btn btn-link p-0 text-danger"
										onClick={(e) => removePokemonFavorite(pokemon.id, e)}
										title="Eliminar de favoritos"
										style={{ width: '24px', height: '24px', border: 'none', background: 'none' }}
									>
										{/* ÍCONO PAPELERA SIN RECUADRO */}
										<i className="fa-regular fa-trash-can"></i>
									</button>
								</div>
							))
						) : (
							<div className="dropdown-item text-muted">
								No hay pokémones favoritos
							</div>
						)}

						<div className="dropdown-divider"></div>

						{/* Items Favoritos */}
						<h6 className="dropdown-header text-success d-flex justify-content-between align-items-center">
							<span>Items Favoritos ({store.favorites.items.length})</span>
						</h6>
						{favoriteItems.length > 0 ? (
							favoriteItems.map((item) => (
								<div key={`item-${item.id}`} className="dropdown-item d-flex justify-content-between align-items-center">
									<span className="text-truncate" style={{ maxWidth: '200px' }}>
										{item.name}
									</span>
									<button
										className="btn btn-link p-0 text-danger"
										onClick={(e) => removeItemFavorite(item.id, e)}
										title="Eliminar de favoritos"
										style={{ width: '24px', height: '24px', border: 'none', background: 'none' }}
									>
										{/* ÍCONO PAPELERA SIN RECUADRO */}
										<i className="fa-regular fa-trash-can"></i>
									</button>
								</div>
							))
						) : (
							<div className="dropdown-item text-muted">
								No hay items favoritos
							</div>
						)}

						{/* Footer del dropdown */}
						{totalFavorites > 0 && (
							<>
								<div className="dropdown-divider"></div>
								<div className="dropdown-item text-center small text-muted">
									Total: {totalFavorites} favoritos
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};