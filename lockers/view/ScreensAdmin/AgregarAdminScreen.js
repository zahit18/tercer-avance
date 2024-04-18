import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { IP_ADDRESS } from '../../env';
import { Ionicons } from '@expo/vector-icons';

export default function AgregarAdminScreen() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [departamentos, setDepartamentos] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado para alternar la visibilidad de la contraseña
  };

  useEffect(() => {
    const obtenerDepartamentos = async () => {
      try {
        const response = await fetch(`http://${IP_ADDRESS}:9000/listDepartamento`);
        const data = await response.json();
        setDepartamentos(data);
      } catch (error) {
        console.error('Error al obtener los departamentos:', error);
      }
    };

    obtenerDepartamentos();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Validar que al menos uno de los apellidos esté presente
      if (!data.txtapMat && !data.txtapPat) {
        throw new Error("Debes ingresar al menos un apellido (materno o paterno).");
      }
  
      const response = await axios.post(`http://${IP_ADDRESS}:9000/agregarAdmin`, {
        nombre: data.txtName,
        apPat: data.txtapPat,
        apMat: data.txtapMat,
        telefono: data.txtTelefono,
        email: data.txtEmail,
        password: data.txtPwd,
        roles: 'A',
        depto: data.txtDepto
      });

      console.log('Respuesta del servidor:', response.data);

      reset({
        txtName: '',
        txtapMat: '',
        txtapPat: '',
        txtPwd: '',
        txtTelefono: '',
        txtEmail: '',
        txtDepto: ''
      });
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Agregar Administrador</Text>
        <Text style={styles.radioLabel}>Nombre</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="gray"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="txtName"
        rules={{ required: "Este campo es requerido", pattern: { value: /[A-Za-z ]+/, message: "Ingrese solo letras y espacios" } }}
        defaultValue=""
      />
      {errors.txtName && <Text style={styles.error}>{errors.txtName.message}</Text>}
      <Text style={styles.radioLabel}>Apellidos: </Text>
     
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            placeholderTextColor="gray"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="txtapPat"
        rules={{ pattern: { value: /[A-Za-z ]+/, message: "Ingrese solo letras y espacios" } }}
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
            onChangeText={onChange}
          />
        )}
        name="txtapMat"
        rules={{ pattern: { value: /[A-Za-z ]+/, message: "Ingrese solo letras y espacios" } }}
        defaultValue=""
      />
       {errors.txtapMat && <Text style={styles.error}>{errors.txtapMat.message}</Text>}
       
      <Text style={styles.radioLabel}>Telefono</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="ejemplo: (664-999-9999)"
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="txtTelefono"
        rules={{ required: "Este campo es requerido", pattern: { value: /\d{3}-\d{3}-\d{4}/, message: "Ingrese un número de teléfono válido (664-999-9999)" } }}
        defaultValue=""
      />
      {errors.txtTelefono && <Text style={styles.error}>{errors.txtTelefono.message}</Text>}
      <Text style={styles.radioLabel}>Correo Electronico</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="gray"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="txtEmail"
        rules={{ required: "Este campo es requerido", pattern: { value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?/, message: "Por favor, ingresa una dirección de correo electrónico válida." } }}
        defaultValue=""
      />
      {errors.txtEmail && <Text style={styles.error}>{errors.txtEmail.message}</Text>}
      <Text style={styles.radioLabel}>Contraseña</Text>
      <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onBlur,onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="gray"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={!showPassword} // Mostrar u ocultar la contraseña según el estado showPassword
              />
            )}
            name="txtPwd"
            rules={{ required: "Este campo es requerido" }}
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
      
      <View>
  
        <Text style={styles.radioLabel}>Departamento:</Text>
        {departamentos.map((departamento, index) => (
          <Controller
            key={index}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[styles.radioOption, value === departamento.codigo && styles.selected]}
                onPress={() => onChange(departamento.codigo)}
              >
                <Text style={styles.radioText}>{departamento.descripcion}</Text>
              </TouchableOpacity>
            )}
            name="txtDepto"
            rules={{ required: "Selecciona un departamento" }}
            defaultValue=""
          />
        ))}
        {errors.txtDepto && <Text style={styles.error}>{errors.txtDepto.message}</Text>}
      </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2c3e50',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'rgba(128, 40, 44, 0.8)',
    borderWidth: 1,
    flex: 1,
    marginBottom: 15,
  },
  apellidosContainer: {
    justifyContent: 'space-between',
    marginBottom: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  apellidoInput: {
    flex: 1,
    color: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'rgba(128, 40, 44, 0.8)',
    borderWidth: 1,
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    padding: 8,
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
  radioLabel: {
    marginBottom: 5,
    color: 'white',
  },
  radioGroup: {
    width: '100%',
    marginBottom: 10,
  },
  radioOption: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 5,
    width: '100%', // Ajusta el ancho al 100% del ScrollView
  },
  radioText: {
    fontSize: 16,
  },
  selected: {
    backgroundColor: '#873b51', // Cambia el color de selección aquí
  },
  error: {
    color: 'red',
  },
});
