import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, TouchableOpacity  } from 'react-native';
import axios from 'axios';
import { useSession } from "../../../components/SessionContext"; 
import { IP_ADDRESS } from '../../../env';

const LockersDisponibles = ({ route, navigation }) => {
    const { codigo } = route.params;
    const [lockersData, setLockersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { numeroSolicitante } = useSession();

    useEffect(() => {
        const getLockerData = async () => {
            try {
                const response = await axios.get(`http://${IP_ADDRESS}:9000/ubicacionLockersU/${codigo}`);
                setLockersData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching lockers data:', error);
            }
        };

        getLockerData();
    }, [codigo]);

    const handleReservarLocker = async (lockerId) => {
        try {
            // Realizar el apartado del locker
            const fechaActual = new Date();
            const fechaReserva = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const fechaVencimientoPago = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            await axios.post(`http://${IP_ADDRESS}:9000/insertApartado`, {
                fecha_vencimiento_pago: fechaVencimientoPago,
                fecha_reserva: fechaReserva,
                estado: 'Pendiente',
                solicitante: numeroSolicitante,
                locker: lockerId,
            });

            // Actualizar el estado del locker
            await updateLockerEstado(lockerId);
           
            // Redirigir a reservasUser
           // En LockersDisponibles.js
navigation.navigate('Reservas');


            const updatedLocker = await axios.get(`http://${IP_ADDRESS}:9000/ubicacionLockersU/${codigo}`);
            setLockersData(updatedLocker.data);
      
         
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateLockerEstado = async (lockerId) => {
        try {
            await axios.put(`http://${IP_ADDRESS}:9000/updateLocker/${lockerId}`, {
                disponible: false // o cualquier otro estado que necesites
            });
            console.log('Estado del locker actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el estado del locker:', error);
        }
    };

    const renderLockerItem = ({ item }) => (
        <View style={[styles.lockerItem, !item.disponible && styles.lockerItemDisabled]}>
            <Text style={styles.lockerText}>Locker: {item.locker}</Text>
            <Text style={styles.lockerText}>Tamaño: {item.size}</Text>
            <Text style={styles.lockerText}>Precio: {item.precio}</Text>
            <TouchableOpacity
             style={styles.button}
                onPress={() => handleReservarLocker(item.Id)}
                disabled={item.disponible}
            >
                 <Text style={styles.buttonText}>Reservar</Text>
                 </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lockers Disponibles</Text>
            {isLoading ? (
                <Text>Cargando...</Text>
            ) : (
                <FlatList
                    data={lockersData}
                    renderItem={renderLockerItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.lockerList}
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
        color: "white",
    },
    lockerList: {
        flexGrow: 1,
    },
    lockerItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    lockerItemDisabled: {
        backgroundColor: '#d3d3d3',
    },
    lockerText: {
        fontSize: 18,
        marginBottom: 5,
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
});

export default LockersDisponibles;
