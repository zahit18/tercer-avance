import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import { IP_ADDRESS } from '../../env';

const HistorialPago = () => {
  const [pago, setPago] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${IP_ADDRESS}:9000/historialPago`);
        setPago(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.pagoContainer}>
      <Text style={styles.titleText}>Solicitante: {item.Solicitante}</Text>
      <Text style={styles.titleText}>Fecha: {item.Fecha}</Text>
      <Text style={styles.titleText}>Monto: {item.Monto}</Text>
      <Text style={styles.titleText}>Locker: {item.Locker}</Text>
      <Text style={styles.titleText}>Estado: {item.Estado}</Text>
      <Text style={styles.titleText}>Ubicación: {item.Ubicacion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: '#ffffff' }}>Cargando datos</Text>
        </View>
      ) : (
        <FlatList
          data={pago}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagoContainer: {
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
    shadowOpacity: 0.8,
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

export default HistorialPago;
