// custom hook to fetch and manage films data
// handles loading states and errors when fetching from SWAPI
import { useState, useEffect } from 'react';
import { Film } from '../types/swapi';
import { getFilms } from '../services/swapi';

export function useFilms() {
    // keeping track of our films and loading state
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // loads the films from the API
    // wrapping in try/catch since the API can be flaky sometimes
    const loadFilms = async () => {
        try {
            setError(null);
            setLoading(true);
            const filmsData = await getFilms();
            setFilms(filmsData);
        } catch (error) {
            const message = error instanceof Error 
                ? `Failed to load movies: ${error.message}`
                : 'Failed to load movies. Please try again later.';
            setError(message);
            console.error('Error loading films:', error);
        } finally {
            setLoading(false);
        }
    };

    // fetch films when component mounts
    useEffect(() => {
        loadFilms();
    }, []);

    return { films, loading, error, loadFilms };
} 