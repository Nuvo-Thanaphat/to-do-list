// This module handles all interactions with the PokéAPI, including fetching Pokémon data.
// It uses `async/await`, promises, and error handling with `try...catch`.

import { FetchError } from './errors.js';

/**
 * A private function to fetch data from the specified URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - The fetched data as JSON.
 * @throws {FetchError} - If the fetch fails or returns a non-2xx status.
 */
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Throw a FetchError with the status code
            throw new FetchError(response.statusText, response.status);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        // If it's already a FetchError, rethrow it
        if (error instanceof FetchError) {
            throw error;
        }
        // Otherwise, throw a FetchError
        throw new FetchError(error.message);
    }
};

export const fetchPokemon = (name) => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    return fetchData(apiUrl);
};
