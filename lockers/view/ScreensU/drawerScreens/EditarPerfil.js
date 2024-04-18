import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSession } from "../../../components/SessionContext";
import { IP_ADDRESS } from '../../../env';
import { Ionicons } from '@expo/vector-icons';

const EditarPerfil = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const { numeroSolicitante } = useSession();
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado para alternar la visibilidad de la contraseña
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:9000/getAllSolicitante/${numeroSolicitante}`);
      setUserData(response.data[0]);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const updatedData = {};

      // Verificar qué campos han cambiado y agregarlos al objeto updatedData
if (data.txtName ) updatedData.nombre = data.txtName;
if (data.txtapPat ) updatedData.apPat = data.txtapPat;
if (data.txtapMat) updatedData.apMat = data.txtapMat;
if (data.txtTelefono ) updatedData.telefono = data.txtTelefono;
if (data.txtEmail) updatedData.email = data.txtEmail;
if (data.txtPwd) updatedData.password = data.txtPwd; // Verificar si se proporcionó una nueva contraseña


      const response = await axios.put(`http://${IP_ADDRESS}:9000/editUsuario/${numeroSolicitante}`, updatedData);

      console.log('Respuesta del servidor:', response.data);

      setUserData(response.data);

      reset({
        txtName: '',
        txtapMat: '',
        txtapPat: '',
        txtPwd: '',
        txtTelefono: '',
        txtEmail: ''
      });

      navigation.navigate('HomeAdmin');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Editar Usuario </Text>
        <Text style={styles.buttonText}>Nombre:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="gray"
              value={value}
              onChangeText={onChange}
              defaultValue={userData ? userData.nombre : ''}
            />
          )}
          name="txtName"
          rules={{ pattern: { value: /[A-Za-z ]+/, message: "Ingrese solo letras y espacios" } }}
          defaultValue=""
        />
        {errors.txtName && <Text style={styles.error}>{errors.txtName.message}</Text>}
        <Text style={styles.buttonText}>Apellidos:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
  style={styles.input}
  placeholder="Apellido Paterno"
  placeholderTextColor="gray"
  value={value}
  onChangeText={(onChange)}
/>
          )}
          name="txtapPat"
          rules={{pattern: { value: /[A-Za-z ]+/, message: "Ingrese solo letras y espacios" } }}
          defaultValue=""
        />
        {errors.txtapPat && <Text style={styles.error}>{errors.txtapPat.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
  style={styles.input}
  placeholder="Apellido Materno"
  placeholderTextColor="gray"
  value={value}
  onChangeText={(onChange)}
/>
          )}
          name="txtapMat"
          rules={{ pattern: { value: /[A-Za-z ]+/, message: "Ingrese solo letras y espacios" } }}
          defaultValue=""
        />
        {errors.txtapMat && <Text style={styles.error}>{errors.txtapMat.message}</Text>}

        <Text style={styles.buttonText}>Telefono:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
  style={styles.input}
  placeholder="ejemplo: (664-999-9999)"
  placeholderTextColor="gray"
  value={value}
  onChangeText={(onChange)}
/>
          )}
          name="txtTelefono"
          rules={{pattern: { value: /\d{3}-\d{3}-\d{4}/, message: "Ingrese un número de teléfono válido (664-999-9999)" } }}
          defaultValue=""
        />
        {errors.txtTelefono && <Text style={styles.error}>{errors.txtTelefono.message}</Text>}
        <Text style={styles.buttonText}>Correo Electronico:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="gray"
            value={value}
            onChangeText={(onChange)}
          />
          
          )}
          name="txtEmail"
          rules={{ pattern: { value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?/, message: "Por favor, ingresa una dirección de correo electrónico válida." } }}
          defaultValue=""
        />
        {errors.txtEmail && <Text style={styles.error}>{errors.txtEmail.message}</Text>}
        <Text style={styles.buttonText}>Contraseña:</Text>
        <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
  style={styles.input}
  placeholder="Ejemplo123!"
  placeholderTextColor="gray"
  value={value}
  onChangeText={(onChange)}
/>

          )}
          name="txtPwd"
          rules={{pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:<>?])(?=.*[0-9]).{8,}$/, message: "Debe ser de 8 caracteres, incluyendo una letra mayúscula, un carácter especial y un dígito. Ejemplo: Ejemplo123!" } }}
          defaultValue=""
        />
         {/* Ícono para alternar la visibilidad de la contraseña */}
         <TouchableOpacity
                style={styles.iconContainer}
                onPress={togglePasswordVisibility}
              >
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="rgba(128, 40, 44, 0.8)" />
              </TouchableOpacity>
          </View>
        {errors.txtPwd && <Text style={styles.error}>{errors.txtPwd.message}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#fff",
      padding: 20,
      backgroundColor: '#2c3e50',
    },
    formContainer: {
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      marginBottom: 20,
      textAlign: 'center',
      color: 'white',
    },
    input: {
      height: 40,
      color: 'black',
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth: 1,
      flex: 1,
      marginBottom: 15,
    },
    iconContainer: {
      position: 'absolute',
      right: 10,
      padding: 8,
    },
    roundedInput: {
      borderRadius: 20, // Ajusta el valor según el radio de esquina deseado
    },
    button: {
      backgroundColor: 'rgba(128, 40, 44, 0.8)',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
  });

export default EditarPerfil;
