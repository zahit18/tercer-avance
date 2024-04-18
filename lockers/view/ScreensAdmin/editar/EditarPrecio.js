import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { IP_ADDRESS } from '../../../env';


export default function EditarPrecio({ route }) {
  const { lockerId } = route.params;
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    precio: '',
  });
  const [locker, setLockersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getLockerID = async () => {
      try {
        const response = await fetch(`http://${IP_ADDRESS}:9000/getOneSizePrice/${lockerId}`);
        const data = await response.json();
        setLockersData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching lockers data:', error);
      }
    };

    getLockerID();
  }, [lockerId]);

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://${IP_ADDRESS}:9000/editPrecio/${locker[0].numero}`, {
        precio: formData.precio
      });
      console.log('Respuesta del servidor:', response.data);
      setFormData({
        precio: '',
      });
      navigation.navigate('TodosLockers');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.LockersContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>Numero:</Text>
        <Text style={styles.LockersText}>{item.numero}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>Dimensiones:</Text>
        <Text style={styles.LockersText}>{item.dimensiones}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>Precio actual:</Text>
        <Text style={styles.LockersText}>{item.precio}</Text>
      </View>
  
        <Text style={styles.titleText}>Precio Nuevo:</Text>
        <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.precio}
            onChangeText={(number) => handleChange('precio', number)}
          />
      <View style={styles.rowContainer}>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Guardar Cambios</Text>
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
          data={locker}
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
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff', // Fondo blanco
    borderColor: 'rgba(128, 40, 44, 0.8)', // Color del borde
    borderWidth: 1,
    borderRadius: 10, // Bordes redondos
    marginBottom: 10,
    paddingHorizontal: 10,
  },
})
