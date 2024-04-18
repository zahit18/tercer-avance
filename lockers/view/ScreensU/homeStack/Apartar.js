import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSession } from "../../../components/SessionContext"; 
import { IP_ADDRESS } from '../../../env';

const Apartar = ({ route, navigation }) => {
    const { lockerId } = route.params;
    const { numeroSolicitante } = useSession();

    useEffect(() => {
        const handleApartar = async () => {
            try {
                // Realizar el apartado del locker
                const apartadoResponse = await post(`http://${IP_ADDRESS}:9000/insertApartado`, {
                    fecha_reserva: new Date().toISOString().split('T')[0],
                    fecha_vencimiento_pago: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    locker: lockerId,
                    solicitante: numeroSolicitante,
                });
                const apartadoData = await apartadoResponse.json();
                console.log(apartadoData);

                // Actualizar el estado del locker
                const updateLockerResponse = await put(`http://${IP_ADDRESS}:9000/updateLocker/${lockerId}`, { estatus: 0 });
                const updateLockerData = await updateLockerResponse.json();
                console.log(updateLockerData);
                
                // Redirigir a reservasUser
                navigation.navigate('reservasUser');
            } catch (error) {
                console.error('Error:', error);
            }
        };

        handleApartar();
    }, [lockerId, navigation, numeroSolicitante]);

    return (
        <View style={styles.container}>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default Apartar;
