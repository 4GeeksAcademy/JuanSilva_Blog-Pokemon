const pokeApiServices = {}
const baseUrl = 'https://pokeapi.co/api/v2'

// Obtener lista de pokémones
pokeApiServices.getPokemons = async (limit = 50, offset = 0) => {
    try {
        console.log(`🔍 Fetching pokemons from: ${baseUrl}/pokemon?limit=${limit}&offset=${offset}`);

        const response = await fetch(`${baseUrl}/pokemon?limit=${limit}&offset=${offset}`);

        console.log(`📡 Pokemon API Response status:`, response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`✅ Pokemons received:`, data.results?.length || 0);

        return data;

    } catch (error) {
        console.error('❌ Error in getPokemons:', error);
        return {
            results: [
                { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
                { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
            ]
        };
    }
}


pokeApiServices.getPokemon = async (id) => {
    try {
        console.log(`Fetching pokemon details for ID: ${id}`);

        const response = await fetch(`${baseUrl}/pokemon/${id}`);

        console.log(`Pokemon Detail API Response status:`, response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Pokemon details received:`, data.name);

        return data;

    } catch (error) {
        console.error('❌ Error in getPokemon:', error);
        return null;
    }
}

// Obtener lista de items
pokeApiServices.getItems = async (limit = 50, offset = 0) => {
    try {
        console.log(`🔍 Fetching items from: ${baseUrl}/item?limit=${limit}&offset=${offset}`);

        const response = await fetch(`${baseUrl}/item?limit=${limit}&offset=${offset}`);

        console.log(`📡 Items API Response status:`, response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Items received:`, data.results?.length || 0);

        return data;

    } catch (error) {
        console.error('❌ Error in getItems:', error);
        return {
            results: [
                { name: 'potion', url: 'https://pokeapi.co/api/v2/item/1/' },
                { name: 'super-potion', url: 'https://pokeapi.co/api/v2/item/2/' },
                { name: 'hyper-potion', url: 'https://pokeapi.co/api/v2/item/3/' },
                { name: 'max-potion', url: 'https://pokeapi.co/api/v2/item/4/' },
            ]
        };
    }
}


pokeApiServices.getItem = async (id) => {
    try {
        console.log(`🔍 Fetching item details for ID: ${id}`);

        const response = await fetch(`${baseUrl}/item/${id}`);

        console.log(`📡 Item Detail API Response status:`, response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Item details received:`, data.name);

        return data;

    } catch (error) {
        console.error('Error in getItem:', error);
        return null;
    }
}

export default pokeApiServices;