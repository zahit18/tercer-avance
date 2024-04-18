import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { IP_ADDRESS } from '../../env';

export default function AgregarLockersScreen({ navigation }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    const obtenerUbicaciones = async () => {
      try {
        const response = await fetch(`http://${IP_ADDRESS}:9000/listUbicacion`);
        const data = await response.json();
        setUbicaciones(data);
      } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
      }
    };

    obtenerUbicaciones();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://${IP_ADDRESS}:9000/agregarLocker`, {
        nameLocker: data.nameLocker,
        observaciones: data.observaciones,
        ubicacion: data.ubicacion,
        size: data.size,
        estatus: 1, 
        rentaLocker: 'Inactiva',
      });

      console.log('Respuesta del servidor:', response.data);

      reset({
        nameLocker: '',
        size: '',
        ubicacion: '',
        observaciones: ''
      });
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     <Text style={styles.label}>Numero:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Número de Locker"
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="nameLocker"
        rules={{ required: "Este campo es requerido" }}
        defaultValue=""
      />
      {errors.nameLocker && <Text style={styles.error}>{errors.nameLocker.message}</Text>}
      
      <Text style={styles.label}>Tamaño de Locker:</Text>
      <View style={styles.radioContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={[styles.radioOption, value === '1' && styles.selected]}
              onPress={() => onChange('1')}
            >
              <Text style={styles.radioText}>Chico 40cmX55cm</Text>
            </TouchableOpacity>
          )}
          name="size"
          rules={{ required: "Selecciona el tamaño del locker" }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={[styles.radioOption, value === '2' && styles.selected]}
              onPress={() => onChange('2')}
            >
              <Text style={styles.radioText}>Grande 50cmX70cm</Text>
            </TouchableOpacity>
          )}
          name="size"
          rules={{ required: "Selecciona el tamaño del locker" }}
          defaultValue=""
        />
      </View>
      {errors.size && <Text style={styles.error}>{errors.size.message}</Text>}
      
      <Text style={styles.label}>Ubicación:</Text>
      {ubicaciones.map((ubicacion, index) => (
        <Controller
          key={index}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={[styles.ubicacionOption, value === ubicacion.codigo && styles.selectedUbicacion]}
              onPress={() => onChange(ubicacion.codigo)}
            >
              <Text style={styles.ubicacionText}>{ubicacion.area}</Text>
            </TouchableOpacity>
          )}
          name="ubicacion"
          rules={{ required: "Selecciona la ubicación del locker" }}
          defaultValue=""
        />
      ))}
      {errors.ubicacion && <Text style={styles.error}>{errors.ubicacion.message}</Text>}
      <Text style={styles.label}>Observaciones:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.textarea}
            placeholder="Observaciones"
            placeholderTextColor="gray"
            multiline={true}
            numberOfLines={4}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="observaciones"
        defaultValue=""
      />
      {errors.observaciones && <Text style={styles.error}>{errors.observaciones.message}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Agregar Locker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: "#2c3e50",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2c3e50',
  },
  input: {
    height: 40,
    borderColor: 'rgba(128, 40, 44, 0.8)',
    borderWidth: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10, 
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioOption: {
    backgroundColor: '#e5e4e2',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
    borderRadius: 10, 
  },
  selected: {
    backgroundColor: '#873b51',
  },
  ubicacionOption: {
    backgroundColor: '#e5e4e2',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10, 
  },
  selectedUbicacion: {
    backgroundColor: '#873b51',
  },
  ubicacionText: {
    fontSize: 16,
  },
  textarea: {
    borderColor: 'rgba(128, 40, 44, 0.8)',
    borderWidth: 1,
    borderRadius: 10, 
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: 'rgba(128, 40, 44, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 20, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: 'red',
  },
}