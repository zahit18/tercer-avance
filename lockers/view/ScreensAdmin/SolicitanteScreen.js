import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { IP_ADDRESS } from '../../env';

const SolicitantesScreen = () => {
  const [solicitantes, setSolicitantes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${IP_ADDRESS}:9000/solicitante`);
        setSolicitantes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.solicitanteContainer}>
      <Text style={styles.titleText}>Solicitante: {item.Solicitante}</Text>
      <Text style={styles.titleText}>Teléfono: {item.Telefono}</Text>
      <Text style={styles.titleText}>Email: {item.Email}</Text>
      <Text style={styles.titleText}>Departamento: {item.Departamento}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitantes</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: '#ffffff' }}>Loading Data</Text>
        </View>
      ) : (
        <FlatList
          data={solicitantes}
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
  solicitanteContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000', // Color de texto negro para contraste
  },
  flatListContainer: {
    paddingBottom: 20, // Agregar espacio al final de la lista
  },
});

export default SolicitantesScreen;
