import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Character } from '../types/swapi';

interface CharacterGridProps {
    characters: Character[];
}

// fixed number of columns as per requirements
const NUM_COLUMNS = 3;

export function CharacterGrid({ characters }: CharacterGridProps) {
    // reorganize data for top-to-bottom ordering in columns
    const organizedData = React.useMemo(() => {
        const numRows = Math.ceil(characters.length / NUM_COLUMNS);
        const result: Character[] = new Array(characters.length);
        
        // fill columns from top to bottom
        characters.forEach((character, index) => {
            // calculate position in the grid
            const row = index % numRows;
            const col = Math.floor(index / numRows);
            // calculate new index in the result array
            const newIndex = row * NUM_COLUMNS + col;
            result[newIndex] = character;
        });

        return result.filter(Boolean); // Remove any empty slots
    }, [characters]);

    const renderCharacterItem = ({ item }: { item: Character }) => (
        <View style={styles.item} testID="character-item">
            <Text numberOfLines={2} style={styles.name}>
                {item.name}
            </Text>
        </View>
    );

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={organizedData}
                renderItem={renderCharacterItem}
                numColumns={NUM_COLUMNS}
                keyExtractor={(item) => item.url}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    container: {
        padding: 8,
    },
    row: {
        gap: 8,
        justifyContent: 'flex-start',
        marginBottom: 8,
    },
    item: {
        flex: 1,
        height: 70,
        maxWidth: '33%',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#2d2d2d',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    name: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 20,
        color: '#fff',
    },
}); 