import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { IP_ADDRESS } from '../../env';

export default function AgregarUbicacionScreen({ navigation }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

    
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://${IP_ADDRESS}:9000/agregarUbicacion`, {
        codigo: data.codigo,
        area: data.txtArea,
        referencia: data.txtReferencia,
      });

      console.log('Respuesta del servidor:', response.data);
   
      setFormData({
        codigo: '',
        txtArea: '',
        txtReferencia: ''
      });
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      // Aquí puedes manejar errores de manera apropiada, como mostrar un mensaje al usuario
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <Text style={styles.label}>Codigo</Text>
    <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="ej: ALM"
              placeholderTextColor="gray"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="codigo"
          rules={{ required: "Este campo es requerido"}}
          defaultValue=""
        />
        {errors.codigo&& <Text style={styles.error}>{errors.codigo.message}</Text>}
        <Text style={styles.label}>Area</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="ej: ALM"
              placeholderTextColor="gray"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="txtArea"
          rules={{ required: "Este campo es requerido"}}
          defaultValue=""
        />
        {errors.txtArea&& <Text style={styles.error}>{errors.txtArea.message}</Text>}

        <Text style={styles.label}>Referencia</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Referencia ej: Primera puerta a la derecha"
              placeholderTextColor="gray"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="txtReferencia"
          rules={{ required: "Este campo es requerido"}}
          defaultValue=""
        />
        {errors.txtReferencia&& <Text style={styles.error}>{errors.txtReferencia.message}</Text>}
        <View/>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Agregar ubicación</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(128, 40, 44, 0.8)",
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  error: {
    color: 'red',
  },
});
