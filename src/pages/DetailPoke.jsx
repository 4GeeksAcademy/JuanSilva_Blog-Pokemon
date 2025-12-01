import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import pokeApiServices from "../services/pokeApiServices";

export const DetailPoke = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log("🔄 Loading pokemon with ID:", id);

                const data = await pokeApiServices.getPokemon(id);

                if (data) {
                    setPokemon(data);
                    console.log("Pokemon loaded:", data.name);
                } else {
                    setError("No se pudo cargar la información del Pokémon");
                }
            } catch (err) {
                console.error(" Error fetching pokemon:", err);
                setError("Error al cargar el Pokémon");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPokemon();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container py-5 text-center" style={{ backgroundColor: '#E8F4FF', minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando información del Pokémon...</p>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="container py-5 text-center" style={{ backgroundColor: '#E8F4FF', minHeight: '100vh' }}>
                <h2>{error || "Pokémon no encontrado"}</h2>
                <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
            </div>
        );
    }

    return (
        <div className="container py-4" style={{ backgroundColor: '#E8F4FF', minHeight: '100vh' }}>
            <Link to="/" className="btn btn-outline-primary mb-4">
                ← Volver al inicio
            </Link>

            <div className="row">
                {/* Imagen del Pokémon */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <img
                                src={pokemon.sprites?.other?.['official-artwork']?.front_default ||
                                    pokemon.sprites?.front_default ||
                                    'https://via.placeholder.com/300x300?text=No+Image'}
                                alt={pokemon.name}
                                className="img-fluid rounded"
                                style={{ maxHeight: '300px', width: 'auto' }}
                            />
                            <h1 className="mt-3" style={{ color: '#FFCC00' }}>
                                {pokemon.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : 'Nombre no disponible'}
                            </h1>
                            <p className="text-muted">#{pokemon.id}</p>
                        </div>
                    </div>
                </div>

                {/* Estadísticas y Habilidades */}
                <div className="col-md-8">
                    <div className="row">
                        {/* Habilidades */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">Habilidades</h5>
                                </div>
                                <div className="card-body">
                                    {pokemon.abilities && pokemon.abilities.length > 0 ? (
                                        <ul className="list-group list-group-flush">
                                            {pokemon.abilities.map((ability, index) => (
                                                <li key={index} className="list-group-item">
                                                    {ability.ability?.name?.replace(/-/g, ' ').toUpperCase() || 'Habilidad desconocida'}
                                                    {ability.is_hidden && <span className="badge bg-warning ms-2">Oculta</span>}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted">No hay habilidades disponibles</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Estadísticas */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-header bg-success text-white">
                                    <h5 className="mb-0">Estadísticas</h5>
                                </div>
                                <div className="card-body">
                                    {pokemon.stats && pokemon.stats.length > 0 ? (
                                        <ul className="list-group list-group-flush">
                                            {pokemon.stats.map((stat, index) => (
                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span>{stat.stat?.name?.replace(/-/g, ' ').toUpperCase() || 'Stat'}</span>
                                                    <span className="badge bg-primary rounded-pill">{stat.base_stat || 0}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted">No hay estadísticas disponibles</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tipos */}
                        <div className="col-12 mb-4">
                            <div className="card shadow">
                                <div className="card-header bg-info text-white">
                                    <h5 className="mb-0">Tipos</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex gap-2 flex-wrap">
                                        {pokemon.types && pokemon.types.length > 0 ? (
                                            pokemon.types.map((type, index) => (
                                                <span key={index} className="badge bg-secondary p-2 fs-6">
                                                    {type.type?.name?.toUpperCase() || 'Tipo'}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-muted">No hay tipos disponibles</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Movimientos (primeros 10) */}
                        <div className="col-12">
                            <div className="card shadow">
                                <div className="card-header bg-warning text-dark">
                                    <h5 className="mb-0">Movimientos Principales</h5>
                                </div>
                                <div className="card-body">
                                    {pokemon.moves && pokemon.moves.length > 0 ? (
                                        <div className="row">
                                            {pokemon.moves.slice(0, 10).map((move, index) => (
                                                <div key={index} className="col-md-3 col-6 mb-2">
                                                    <span className="badge bg-light text-dark p-2 w-100 d-block">
                                                        {move.move?.name?.replace(/-/g, ' ').toUpperCase() || 'Movimiento'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted">No hay movimientos disponibles</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};