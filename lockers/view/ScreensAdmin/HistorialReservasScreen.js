import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { IP_ADDRESS } from '../../env';

const HistorialReservasScreen = () => {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${IP_ADDRESS}:9000/historialReserva`);
        setReservas(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.reservaContainer}>
      <Text style={styles.titleText}>Solicitante: {item.Solicitante}</Text>
      <Text style={styles.titleText}>Locker: {item.Locker}</Text>
      <Text style={styles.titleText}>ID: {item.Id}</Text>
      <Text style={styles.titleText}>Tamaño: {item.Tamaño}</Text>
      <Text style={styles.titleText}>Ubicación: {item.Ubicacion}</Text>
      <Text style={styles.titleText}>Reserva: {item.Reserva}</Text>
      <Text style={styles.titleText}>Vencimiento: {item.Vencimiento}</Text>
      <Text style={styles.titleText}>Estado: {item.Estado}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Reservas</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: '#ffffff' }}>Cargando datos</Text>
        </View>
      ) : (
        <FlatList
          data={reservas}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reservaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default HistorialReservasScreen;


