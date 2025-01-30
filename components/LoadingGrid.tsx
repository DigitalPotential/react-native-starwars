import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, useWindowDimensions } from 'react-native';
import Animated, { withRepeat, withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

// grid layout constants matching the film grid
const GRID_MARGIN = 8;
const MIN_COLUMN_WIDTH = 150;

// animated skeleton component for loading state
// uses reanimated for smooth opacity animation
const FilmSkeleton = ({ width }: { width: number }) => {
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        // create a repeating fade animation
        opacity.value = withRepeat(
            withTiming(0.7, { duration: 1000 }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[styles.skeletonBase, { width }, animatedStyle]}>
            <View style={styles.skeletonContent}>
                <View style={styles.skeletonInfo}>
                    <View style={styles.skeletonTitle} />
                    <View style={styles.skeletonDate} />
                </View>
            </View>
        </Animated.View>
    );
};

// loading placeholder that matches the film grid layout
// shows animated skeletons while content is loading
export function LoadingGrid() {
    const { width } = useWindowDimensions();
    const numColumns = Math.max(2, Math.min(4, Math.floor(width / MIN_COLUMN_WIDTH)));
    const totalGapSpace = GRID_MARGIN * (numColumns - 1);
    const itemWidth = (width - totalGapSpace - (GRID_MARGIN * 2)) / numColumns;
    
    // create placeholders for all 6 star wars films
    const skeletonData = Array(6).fill(null);
    
    const renderSkeletonItem = ({ index }: { index: number }) => (
        <FilmSkeleton key={index} width={itemWidth} />
    );

    return (
        <FlatList
            data={skeletonData}
            renderItem={renderSkeletonItem}
            numColumns={numColumns}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.container}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: GRID_MARGIN,
    },
    columnWrapper: {
        gap: GRID_MARGIN,
        justifyContent: 'center',
        marginBottom: GRID_MARGIN,
    },
    skeletonBase: {
        minHeight: 120,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#2d2d2d',
    },
    skeletonContent: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    skeletonInfo: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    skeletonTitle: {
        height: 20,
        backgroundColor: '#3d3d3d',
        borderRadius: 4,
        marginBottom: 8,
        width: '80%',
    },
    skeletonDate: {
        height: 16,
        backgroundColor: '#3d3d3d',
        borderRadius: 4,
        width: '40%',
    },
}); 