import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, FlatList, useWindowDimensions } from 'react-native';
import { Film } from '../types/swapi';
import { FilmCard } from './FilmCard';

// these could also be moved to a constants file if used across multiple components
const GRID_MARGIN = 8;
const MIN_COLUMN_WIDTH = 150;

interface FilmGridProps {
    films: Film[];
    onFilmPress: (film: Film) => void;
}

// displays films in a responsive grid
// adjusts columns based on screen width
export function FilmGrid({ films, onFilmPress }: FilmGridProps) {
    const { width } = useWindowDimensions();
    
    // memoize grid calculations to prevent recalculation on every render
    const { numColumns, itemWidth } = useMemo(() => {
        const cols = Math.max(2, Math.min(4, Math.floor(width / MIN_COLUMN_WIDTH)));
        const totalGapSpace = GRID_MARGIN * (cols - 1);
        const iWidth = (width - totalGapSpace - (GRID_MARGIN * 2)) / cols;
        return { numColumns: cols, itemWidth: iWidth };
    }, [width]);

    // memoize the render item function to prevent recreation on every render
    const renderItem = useCallback(({ item }: { item: Film }) => (
        <View style={{ width: itemWidth }}>
            <FilmCard 
                item={item} 
                onPress={() => onFilmPress(item)}
            />
        </View>
    ), [itemWidth, onFilmPress]);

    // memoize the key extractor to prevent recreation
    const keyExtractor = useCallback((item: Film) => 
        item.episode_id.toString(), []);

    return (
        <FlatList
            key={`films-grid-${numColumns}`}
            data={films}
            renderItem={renderItem}
            numColumns={numColumns}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={4}
            windowSize={5}
            initialNumToRender={8}
        />
    );
}

const styles = StyleSheet.create({
    gridContainer: {
        padding: GRID_MARGIN,
        width: '100%',
    },
    columnWrapper: {
        gap: GRID_MARGIN,
        justifyContent: 'flex-start',
        marginBottom: GRID_MARGIN,
    },
}); 