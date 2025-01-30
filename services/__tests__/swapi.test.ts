import axios from 'axios';
import { getFilms, getFilmCharacters } from '../swapi';
import { Film, Character } from '../../types/swapi';

// mock axios to prevent real API calls
jest.mock('axios', () => {
    const mockAxios = {
        get: jest.fn(),
        create: jest.fn().mockReturnThis(),
        isAxiosError: (error: any) => error.isAxiosError
    };
    return {
        create: jest.fn(() => mockAxios),
        isAxiosError: (error: any) => error.isAxiosError
    };
});

// get the mocked instance
const mockedAxios = axios.create();

describe('SWAPI Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getFilms', () => {
        it('should fetch and sort films by release date', async () => {
            const mockFilms = {
                data: {
                    results: [
                        { 
                            title: 'Film 2', 
                            release_date: '2000-01-01', 
                            episode_id: 2,
                            opening_crawl: 'Test crawl',
                            director: 'Test Director',
                            producer: 'Test Producer',
                            characters: [],
                            planets: [],
                            starships: [],
                            vehicles: [],
                            species: [],
                            created: '2014-12-10T14:23:31.880000Z',
                            edited: '2014-12-20T19:49:45.256000Z',
                            url: 'https://swapi.dev/api/films/2/'
                        },
                        { 
                            title: 'Film 1', 
                            release_date: '1999-01-01', 
                            episode_id: 1,
                            opening_crawl: 'Test crawl',
                            director: 'Test Director',
                            producer: 'Test Producer',
                            characters: [],
                            planets: [],
                            starships: [],
                            vehicles: [],
                            species: [],
                            created: '2014-12-10T14:23:31.880000Z',
                            edited: '2014-12-20T19:49:45.256000Z',
                            url: 'https://swapi.dev/api/films/1/'
                        }
                    ]
                }
            };

            (mockedAxios.get as jest.Mock).mockResolvedValueOnce(mockFilms);

            const result = await getFilms();

            expect(result).toHaveLength(2);
            expect(result[0].title).toBe('Film 1');
            expect(result[1].title).toBe('Film 2');
            expect(mockedAxios.get).toHaveBeenCalledWith('/films');
        });

        it('should handle API errors gracefully', async () => {
            const error = new Error('API Error') as any;
            error.isAxiosError = true;
            error.code = 'ERR_BAD_REQUEST';
            (mockedAxios.get as jest.Mock).mockRejectedValueOnce(error);

            await expect(getFilms()).rejects.toThrow('Failed to load films');
        });
    });

    describe('getFilmCharacters', () => {
        const mockFilm: Film = {
            title: 'Test Film',
            episode_id: 1,
            release_date: '2000-01-01',
            opening_crawl: 'Test crawl',
            director: 'Test Director',
            producer: 'Test Producer',
            characters: [
                'https://swapi.dev/api/people/1',
                'https://swapi.dev/api/people/2',
                'https://swapi.dev/api/people/3',
            ],
            planets: [],
            starships: [],
            vehicles: [],
            species: [],
            created: '2014-12-10T14:23:31.880000Z',
            edited: '2014-12-20T19:49:45.256000Z',
            url: 'https://swapi.dev/api/films/1/'
        };

        const mockCharacter: Character = {
            name: 'Luke',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: [],
            species: [],
            vehicles: [],
            starships: [],
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T21:17:56.891000Z',
            url: 'https://swapi.dev/api/people/1/'
        };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should fetch characters in batches', async () => {
            (mockedAxios.get as jest.Mock).mockResolvedValue({ data: mockCharacter });

            const result = await getFilmCharacters(mockFilm);

            expect(result).toHaveLength(3);
            expect(mockedAxios.get).toHaveBeenCalledTimes(3);
            expect(mockedAxios.get).toHaveBeenCalledWith('/people/1');
            expect(mockedAxios.get).toHaveBeenCalledWith('/people/2');
            expect(mockedAxios.get).toHaveBeenCalledWith('/people/3');
        });
    });
}); 