import React, { useCallback } from 'react';
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';
import { Header } from '../../components/Header';
import { FilmGrid } from '../../components/FilmGrid';
import { ErrorView } from '../../components/ErrorView';
import { CharacterGrid } from '../../components/CharacterGrid';
import { LoadingGrid } from '../../components/LoadingGrid';
import { useFilms } from '../../hooks/useFilms';
import { useCharacters } from '../../hooks/useCharacters';

// main screen component that handles the film list and character view
// manages loading states and error handling for both views
export default function MoviesScreen() {
    const { films, loading: filmsLoading, error: filmsError, loadFilms } = useFilms();
    const { 
        selectedFilm,
        characters,
        loading: charactersLoading,
        error: charactersError,
        handleFilmSelect,
        handleRetry,
        clearSelectedFilm
    } = useCharacters();

    const spinValue = React.useRef(new Animated.Value(0)).current;

    // Start or restart animation when loading state changes
    React.useEffect(() => {
        // Reset the animation value
        spinValue.setValue(0);
        
        // Start the animation if we're loading
        if (charactersLoading) {
            Animated.loop(
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        }
    }, [charactersLoading]); // Depend on loading state

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const handleRetryFilms = useCallback(() => {
        loadFilms();
    }, [loadFilms]);

    const handleRetryCharacters = useCallback(() => {
        handleRetry();
    }, [handleRetry]);

    if (filmsLoading) {
        return (
            <View style={styles.container}>
                <Header />
                <LoadingGrid />
            </View>
        );
    }

    if (filmsError) {
        return (
            <View style={styles.container}>
                <Header />
                <ErrorView 
                    message={filmsError} 
                    onRetry={handleRetryFilms} 
                />
            </View>
        );
    }

    if (selectedFilm) {
        return (
            <View style={styles.container}>
                <Header 
                    showBack 
                    onBack={clearSelectedFilm}
                    title={selectedFilm.title}
                />
                <View style={styles.characterContent}>
                    {charactersLoading ? (
                        <View style={styles.centered}>
                            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                                <Image
                                    source={require('../../assets/images/Dueling_lightsabers.png')}
                                    style={styles.loadingImage}
                                    resizeMode="contain"
                                />
                            </Animated.View>
                        </View>
                    ) : charactersError ? (
                        <ErrorView 
                            message={charactersError} 
                            onRetry={handleRetryCharacters}
                        />
                    ) : (
                        <CharacterGrid characters={characters} />
                    )}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <FilmGrid 
                films={films} 
                onFilmPress={handleFilmSelect}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    characterContent: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingImage: {
        width: 100,
        height: 100,
    },
});