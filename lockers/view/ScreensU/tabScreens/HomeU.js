import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeU = ({ navigation }) => {

    const handleVerUbicacionesPress = () => {
        navigation.navigate('Ubicaciones');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido a la App de Rentas de Lockers!</Text>
            <Text style={styles.description}>Aquí podrás encontrar información sobre nuestros lockers disponibles para renta.</Text>
            <Text style={styles.subtitle}>Tipos de Lockers:</Text>
            <Text style={styles.listItem}>- Locker pequeño: $5 por día</Text>
            <Text style={styles.listItem}>- Locker grande: $15 por día</Text>
            <Text style={styles.contactInfo}>Para más información, contáctanos al 123-456-7890</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleVerUbicacionesPress}
            >
                <Text style={styles.buttonText}>Ver Ubicaciones</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 31, 63, 0.8)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white',
    },
    listItem: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
        color: 'white',
    },
    contactInfo: {
        fontSize: 14,
        marginTop: 20,
        textAlign: 'center',
        color: 'cyan',
    },
    button: {
        backgroundColor: 'rgba(128, 40, 44, 0.8)',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});

export default HomeU;

