import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import pokeApiServices from "../services/pokeApiServices";

export const DetailItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log("🔄 Loading item with ID:", id);

                const data = await pokeApiServices.getItem(id);

                if (data) {
                    setItem(data);
                    console.log("Item loaded:", data.name);
                } else {
                    setError("No se pudo cargar la información del Item");
                }
            } catch (err) {
                console.error("Error fetching item:", err);
                setError("Error al cargar el Item");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container py-5 text-center" style={{ backgroundColor: '#E8F4FF', minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando información del Item...</p>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="container py-5 text-center" style={{ backgroundColor: '#E8F4FF', minHeight: '100vh' }}>
                <h2>{error || "Item no encontrado"}</h2>
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
                {/* Imagen del Item */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                                alt={item.name}
                                className="img-fluid rounded"
                                style={{ maxHeight: '200px', width: 'auto' }}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                                }}
                            />
                            <h1 className="mt-3" style={{ color: '#FFCC00' }}>
                                {item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/-/g, ' ') : 'Nombre no disponible'}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Información del Item */}
                <div className="col-md-8">
                    <div className="row">
                        {/* Descripción */}
                        <div className="col-12 mb-4">
                            <div className="card shadow">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">Descripción</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        {item.effect_entries?.find(entry => entry.language.name === 'es')?.effect ||
                                            item.effect_entries?.find(entry => entry.language.name === 'en')?.effect ||
                                            item.flavor_text_entries?.find(entry => entry.language.name === 'es')?.text ||
                                            item.flavor_text_entries?.find(entry => entry.language.name === 'en')?.text ||
                                            'No hay descripción disponible.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Categoría y Atributos */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-header bg-success text-white">
                                    <h5 className="mb-0">Información</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>Categoría:</strong>
                                            <span>{item.category?.name?.replace(/-/g, ' ').toUpperCase() || 'N/A'}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>Costo:</strong>
                                            <span>{item.cost || 0} ₱</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>Rareza:</strong>
                                            <span>{item.fling_power || 'Normal'}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Atributos */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-header bg-info text-white">
                                    <h5 className="mb-0">Atributos</h5>
                                </div>
                                <div className="card-body">
                                    {item.attributes && item.attributes.length > 0 ? (
                                        <ul className="list-group list-group-flush">
                                            {item.attributes.map((attribute, index) => (
                                                <li key={index} className="list-group-item">
                                                    {attribute.name?.replace(/-/g, ' ').toUpperCase() || 'Atributo'}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted">No hay atributos especiales</p>
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