import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

interface ErrorViewProps {
    message: string;
    onRetry: () => void;
}

// shows error message with a retry button
// used when api calls fail or other errors occur
export function ErrorView({ message, onRetry }: ErrorViewProps) {
    return (
        <View style={styles.centered}>
            <Text style={styles.errorText}>{message}</Text>
            <Pressable onPress={onRetry} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        marginBottom: 16,
        textAlign: 'center',
        fontSize: 16,
        color: '#ff6b6b',
    },
    retryButton: {
        padding: 12,
        backgroundColor: '#2d2d2d',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFE81F',
    },
    retryButtonText: {
        color: '#FFE81F',
    },
}); 