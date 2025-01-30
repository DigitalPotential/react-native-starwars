import React, { memo } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Film } from '../types/swapi';

interface FilmCardProps {
    item: Film;
    onPress: () => void;
}

// renders a single film card with title and year
// handles the press event to show characters
// memoized to prevent unnecessary re-renders in the grid
export const FilmCard = memo(function FilmCard({ item, onPress }: FilmCardProps) {
    return (
        <Pressable
            style={styles.filmCardBase}
            onPress={onPress}
            android_ripple={{ color: 'rgba(255, 232, 31, 0.1)' }}
        >
            <View style={styles.filmCardContent}>
                <View style={styles.filmInfo}>
                    <Text style={styles.filmTitle} numberOfLines={2}>
                        {item.title}
                    </Text>
                    <Text style={styles.releaseDate}>
                        {item.release_date.slice(0, 4)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    filmCardBase: {
        flex: 1,
        minHeight: 120,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#2d2d2d',
    },
    filmCardContent: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    filmInfo: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    filmTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
    },
    releaseDate: {
        fontSize: 14,
        color: '#FFE81F',
    },
}); 