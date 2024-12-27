// This module manages DOM manipulation, event handling, and displays the fetched data.
// It demonstrates functions, conditional statements, and module exports/imports.

import { fetchPokemon } from './api.js';

// Function to initialize the UI
export const initUI = () => {

    // Select DOM elements
    const searchButton = document.getElementById('search-button');
    const pokemonInput = document.getElementById('pokemon-input');
    const pokemonContainer = document.getElementById('pokemon-container');

    // Loading state flag
    let isLoading = false;

    // A function to create elements
    const createElement = (tag, className, innerText) => {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        if (innerText) {
            element.innerText = innerText;
        }
        return element;
    };

    // Function to display Pokémon data
    const displayPokemon = (pokemon) => {
        // Clear previous content
        pokemonContainer.innerHTML = '';

        // Create card container
        const card = createElement('div', 'pokemon-card');

        // Pokémon Name
        const name = createElement('h2', '', `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`);

        // Pokémon Image
        const img = createElement('img');
        img.src = pokemon.sprites.front_default;
        img.alt = pokemon.name;

        // Pokémon Types
        const typesText = `Types: ${pokemon.types.map(typeObj => typeObj.type.name).join(', ')}`;
        const types = createElement('p', '', typesText);

        // Pokémon Abilities
        const abilitiesText = `Abilities: ${pokemon.abilities.map(abilityObj => abilityObj.ability.name).join(', ')}`;
        const abilities = createElement('p', '', abilitiesText);

        // Append elements to card
        card.appendChild(name);
        card.appendChild(img);
        card.appendChild(types);
        card.appendChild(abilities);

        // Append card to container
        pokemonContainer.appendChild(card);
    };

    // Function to show messages
    const showMessage = (message, isError = false) => {
        let elementclass = isError ? 'red-text' : '';
        const errorMsg = createElement('p', elementclass, message);
        pokemonContainer.innerHTML = '';
        pokemonContainer.appendChild(errorMsg);
    };

    // Function to toggle loading state
    const setLoadingState = (loading) => {
        isLoading = loading;
        searchButton.disabled = loading;
        pokemonInput.disabled = loading;
        if (loading) {
            searchButton.textContent = 'Loading...';
        } else {
            searchButton.textContent = 'Search';
        }
    };

    // Event handler for search button
    const handleSearch = async () => {
        if (isLoading) {
            return;
        }

        const pokemonName = pokemonInput.value.trim();
        if (pokemonName === '') {
            showMessage('Please enter a Pokémon name', true);
            return;
        }

        try {
            setLoadingState(true); // Start loading
            const pokemonData = await fetchPokemon(pokemonName);
            displayPokemon(pokemonData);
        } catch (error) {
            if (error.status === 404) {
                showMessage(`No Pokémon named '${pokemonName}' found`);
            }
            else {
                showMessage('An error occurred', true);
            }
        } finally {
            setLoadingState(false); // End loading
        }
    };

    // Add event listener
    searchButton.addEventListener('click', handleSearch);

    // Also handle "Enter" key
    pokemonInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
};
