import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const NotificationsUser = () => {
    // Ejemplo de datos de notificaciones (puedes reemplazarlo con datos reales de tu aplicación)
    const notificationsData = [
        { id: '1', title: '¡Tu locker ha sido reservado!', message: 'Recuerda recogerlo dentro de las próximas 24 horas.' },
        { id: '2', title: 'Nueva promoción disponible', message: 'Obtén un descuento del 10% en tu próxima renta de locker.' },
        { id: '3', title: '¡Bienvenido de nuevo!', message: 'Gracias por usar nuestra aplicación. ¡Esperamos que disfrutes del servicio!' },
    ];

    // Renderizar cada elemento de la lista de notificaciones
    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notificaciones</Text>
            <FlatList
                data={notificationsData}
                renderItem={renderNotificationItem}
                keyExtractor={item => item.id}
                style={styles.notificationList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#2c3e50',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    notificationList: {
        flexGrow: 1,
    },
    notificationItem: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 16,
    },
});

export default NotificationsUser;
