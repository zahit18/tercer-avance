import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSession } from "../../../components/SessionContext";
import { IP_ADDRESS } from '../../../env';

const PagosUser = () => {
    const { numeroSolicitante } = useSession();
    const [pagos, setPagos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://${IP_ADDRESS}:9000/pagosU/${numeroSolicitante}`);
            setPagos(response.data);
          } catch (error) {
            console.error('Error fetching reservations:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Mis Pagos</Text>
          <FlatList
            data={pagos}
            contentContainerStyle={styles.pagoList}
            renderItem={({ item }) => (
              <View style={styles.pagoItem}>
                <Text style={styles.pagoText}>Fecha: {item.Fecha}</Text>
                <Text style={styles.pagoText}>Monto: {item.Monto}</Text>
                <Text style={styles.pagoText}>Locker: {item.Locker}</Text>
                <Text style={styles.pagoText}>Estado de Renta: {item.Estado}</Text>
                <Text style={styles.pagoText}>Ubicación: {item.Ubicacion}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
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
    pagoList: {
        flexGrow: 1,
    },
    pagoItem: {
        backgroundColor: '#ffffff', // Fondo blanco
        padding: 15,
        marginBottom: 10,
        borderRadius: 10, // Hacer las esquinas redondeadas
        shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 3, // Ajustar la altura de la sombra
    },
    shadowOpacity: 0.5, // Aumentar la opacidad de la sombra
    shadowRadius: 7, // Aumentar el radio de difuminado de la sombra
    elevation: 5,
    },
    pagoText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default PagosUser;


