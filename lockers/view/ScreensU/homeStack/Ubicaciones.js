import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { IP_ADDRESS } from '../../../env';

const Ubicaciones = ({ navigation }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [ubicaciones, setUbicaciones] = useState([]);
    const [codigoSeleccionado, setCodigoSeleccionado] = useState('');

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

    const handleUbicacionSeleccionada = (codigo) => {
        setCodigoSeleccionado(codigo);
    };

    const onSubmit = () => {
        navigation.navigate('LockersDisponibles', { codigo: codigoSeleccionado });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <ScrollView>
                <Text style={styles.label}>Seleccione una ubicación:</Text>
                {ubicaciones.map((ubicacion, index) => (
                    <Controller
                        key={index}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TouchableOpacity
                                style={[styles.ubicacionOption, value === ubicacion.codigo && styles.selectedUbicacion]}
                                onPress={() => {
                                    onChange(ubicacion.codigo);
                                    handleUbicacionSeleccionada(ubicacion.codigo); // Actualizar el estado con el código seleccionado
                                }}
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        </ScrollView>
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
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white',
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
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10, 
      },
      button: {
        backgroundColor: "rgba(128, 40, 44, 0.8)",
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
});

export default Ubicaciones;
