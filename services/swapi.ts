import axios from 'axios';
import { Film, Character, SWAPIResponse } from '../types/swapi';

// create axios instance with default config
const api = axios.create({
    baseURL: 'https://swapi.dev/api',
    timeout: 10000, // 10 second timeout
});

// fetch films and sort by release date
export async function getFilms(): Promise<Film[]> {
    try {
        const { data } = await api.get<SWAPIResponse<Film>>('/films');
        return data.results.sort((a, b) => 
            new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
        );
    } catch (error) {
        console.error('Error fetching films:', error);
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timed out. Please try again.');
            }
            if (error.response?.status === 404) {
                throw new Error('Films data not found.');
            }
        }
        throw new Error('Failed to load films. Please check your connection.');
    }
}

// fetch all characters for a film
export async function getFilmCharacters(film: Film): Promise<Character[]> {
    try {
        const characters = await Promise.all(
            film.characters.map(url => {
                const path = url.replace('https://swapi.dev/api', '');
                return api.get<Character>(path)
                    .then(response => response.data)
                    .catch(error => {
                        if (axios.isAxiosError(error)) {
                            if (error.code === 'ECONNABORTED') {
                                throw new Error('Request timed out. Please try again.');
                            }
                            if (error.response?.status === 404) {
                                throw new Error('Character not found.');
                            }
                        }
                        throw new Error('Failed to load character data.');
                    });
            })
        );
        return characters;
    } catch (error) {
        console.error('Error fetching film characters:', error);
        throw new Error('Failed to load character list.');
    }
} 