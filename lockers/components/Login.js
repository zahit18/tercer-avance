import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, View, Pressable, Alert } from 'react-native';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useSession } from './SessionContext';
import { useNavigation } from '@react-navigation/native';
import { IP_ADDRESS } from '../env';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const { setNumeroSolicitante } = useSession();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:9000/getSoli`, {
        params: {
          nombre: data.txtName,
          password: data.txtPwd
        }
      });

      if (response.data.success) {
        setNumeroSolicitante(response.data.numero);

        if (response.data.roles === 'A') {
          navigation.navigate('NavigationAdmin');
        } else if (response.data.roles === 'C') {
          navigation.navigate('NavigationUser');
        }
      }
    } catch (error) {
      alert('Nombre de usuario o contraseña incorrectos.'); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Locker's Company</Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="txtName"
          rules={{ required: 'Este campo es obligatorio' }}
          defaultValue=""
        />
        {errors.txtName && <Text style={styles.errorText}>{errors.txtName.message}</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={togglePasswordVisibility}
              >
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="gray" />
              </TouchableOpacity>
            </View>
          )}
          name="txtPwd"
          rules={{ required: 'Este campo es obligatorio' }}
          defaultValue=""
        />
        {errors.txtPwd && <Text style={styles.errorText}>{errors.txtPwd.message}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: 'rgba(128, 40, 44, 0.8)' }]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: '#3d5a80' }]}
          onPress={reset}
        >
          <Text style={styles.buttonText}>Borrar datos</Text>
        </Pressable>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
        <Pressable
          style={[styles.button, styles.registerButton, { backgroundColor: '#4d7326' }]}
          onPress={() => navigation.navigate('Registrarse')}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(128, 40, 44, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '80%',
  },
  registerButton: {
    marginLeft: 10,
  },
  registerText: {
    fontSize: 14,
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});
