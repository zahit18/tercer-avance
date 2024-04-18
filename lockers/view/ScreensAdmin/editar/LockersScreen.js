import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'; 
import { IP_ADDRESS } from '../../../env';

export default function LockersScreen() {
  const navigation = useNavigation(); // Obtenemos el objeto de navegación

  const [lockers, setLockersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getLockers = async () => {
      try {
        const response = await fetch(`http://${IP_ADDRESS}:9000/getSizePrice`);
        const data = await response.json();
        setLockersData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching lockers data:', error);
      }
    };

    getLockers();
  }, []);

  const handleNavigateToEditarPrecio = (lockerId) => {
    navigation.navigate('EditarPrecio', { lockerId });
  };

  const renderItem = ({ item }) => (
    <View style={styles.LockersContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>Precio:</Text>
        <Text style={styles.LockersText}>{item.precio}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>Descripción:</Text>
        <Text style={styles.LockersText}>{item.descripcion}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>Dimensiones:</Text>
        <Text style={styles.LockersText}>{item.dimensiones}</Text>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigateToEditarPrecio(item.numero)}
        >
          <Text style={styles.buttonText}>Editar Precio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="green" />
          <Text>Cargando</Text>
        </View>
      ) : (
        <FlatList
          data={lockers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

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
  LockersContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  titleText: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  LockersText: {
    flex: 1,
    textAlign: 'left',
  },
  button: {
    backgroundColor: 'rgba(128, 40, 44, 0.8)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});



