import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HelloFromCarlosScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../../assets/images/Rebel-Alliance-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.signature}>Built with ⚡ by Carlos</Text>
                <Text style={styles.description}>
                    A Star Wars fan exploring the galaxy{'\n'}
                    one React Native component at a time
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    content: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        width: 120,
        height: 120,
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    signature: {
        color: '#ffffff',
        fontSize: 20,
        fontStyle: 'italic',
        opacity: 0.8,
        marginBottom: 16,
    },
    description: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.6,
        lineHeight: 24,
    },
}); 