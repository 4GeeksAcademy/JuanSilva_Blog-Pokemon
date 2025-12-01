// src/hooks/useGlobalReducer.jsx - SIMPLIFICADO Y ROBUSTO
import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store";
import pokeApiServices from "../services/pokeApiServices";

const StoreContext = createContext();

// Datos de prueba como fallback
const mockPokemons = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
];

const mockItems = [
    { name: 'potion', url: 'https://pokeapi.co/api/v2/item/1/' },
    { name: 'super-potion', url: 'https://pokeapi.co/api/v2/item/2/' },
    { name: 'hyper-potion', url: 'https://pokeapi.co/api/v2/item/3/' },
    { name: 'max-potion', url: 'https://pokeapi.co/api/v2/item/4/' },
];

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    useEffect(() => {
        console.log("🚀 StoreProvider: Iniciando carga de datos...");

        const loadData = async () => {
            try {
                console.log("📥 Cargando pokémones...");
                const pokemonsResult = await pokeApiServices.getPokemons(8);
                console.log("📦 Resultado de getPokemons:", pokemonsResult);

                if (pokemonsResult && pokemonsResult.results) {
                    dispatch({ type: 'set_pokemons', payload: pokemonsResult.results });
                    console.log("✅ Pokémones cargados:", pokemonsResult.results.length);
                } else {
                    console.warn("⚠️ Usando datos de prueba para pokémones");
                    dispatch({ type: 'set_pokemons', payload: mockPokemons });
                }

                console.log("📥 Cargando items...");
                const itemsResult = await pokeApiServices.getItems(8);
                console.log("📦 Resultado de getItems:", itemsResult);

                if (itemsResult && itemsResult.results) {
                    dispatch({ type: 'set_items', payload: itemsResult.results });
                    console.log("✅ Items cargados:", itemsResult.results.length);
                } else {
                    console.warn("⚠️ Usando datos de prueba para items");
                    dispatch({ type: 'set_items', payload: mockItems });
                }

            } catch (error) {
                console.error("💥 Error general cargando datos:", error);
                // Usar datos de prueba en caso de error general
                dispatch({ type: 'set_pokemons', payload: mockPokemons });
                dispatch({ type: 'set_items', payload: mockItems });
            }
        };

        loadData();
    }, []);

    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext);
    return { dispatch, store };
}