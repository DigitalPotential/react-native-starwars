import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// props for header customization
// showBack controls close button visibility
// title is shown below the logo when viewing a film
interface HeaderProps {
    showBack?: boolean;
    onBack?: () => void;
    title?: string;
}

// app header component with star wars logo
// handles safe area insets and optional back button
export function Header({ showBack, onBack, title }: HeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                <Image 
                    source={require('../assets/images/Star-Wars-transparent-logo-1024x650.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                {showBack && (
                    <Pressable 
                        onPress={onBack}
                        style={styles.backButton}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </Pressable>
                )}
            </View>
            {title && (
                <Text numberOfLines={2} style={styles.title}>
                    {title}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a1a1a',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    content: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    logo: {
        height: 40,
        width: 120,
        tintColor: '#FFE81F', // Star Wars yellow for the logo
    },
    backButton: {
        padding: 8,
        backgroundColor: '#2d2d2d',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFE81F',
    },
    buttonText: {
        color: '#FFE81F',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
        color: '#fff',
    },
}); 