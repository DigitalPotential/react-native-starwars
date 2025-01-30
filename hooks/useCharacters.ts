// manages the state for selected film and its characters
// handles loading, errors and navigation between films and characters view
import { useState } from 'react';
import { Film, Character } from '../types/swapi';
import { getFilmCharacters } from '../services/swapi';

export function useCharacters() {
    // track which film is selected and its characters
    const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // called when user selects a film
    // fetches all characters that appear in that film
    const handleFilmSelect = async (film: Film) => {
        setSelectedFilm(film);
        setLoading(true);
        setError(null);
        try {
            const charactersData = await getFilmCharacters(film);
            setCharacters(charactersData);
        } catch (error) {
            const message = error instanceof Error 
                ? `Failed to load characters: ${error.message}`
                : 'Failed to load characters. Please try again.';
            setError(message);
            console.error('Error loading characters:', error);
        } finally {
            setLoading(false);
        }
    };

    // retry loading characters if it failed the first time
    const handleRetry = () => {
        if (selectedFilm) {
            handleFilmSelect(selectedFilm);
        }
    };

    // reset everything when going back to films list
    const clearSelectedFilm = () => {
        setSelectedFilm(null);
        setCharacters([]);
        setError(null);
    };

    return {
        selectedFilm,
        characters,
        loading,
        error,
        handleFilmSelect,
        handleRetry,
        clearSelectedFilm
    };
} 