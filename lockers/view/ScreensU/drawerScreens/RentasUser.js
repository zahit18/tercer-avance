import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import { useSession } from "../../../components/SessionContext";
import { IP_ADDRESS } from '../../../env';

const RentasUser = () => {
    const { numeroSolicitante } = useSession();
    const [rentasData, setRentasData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPrecio, setSelectedPrecio] = useState(0);
    const [selectedIdLocker, setSelectedIdLocker] = useState('');
    const [selectedRenta, setSelectedRenta] = useState(null); 
    const [selectedSolicitante, setSelectedSolicitante] = useState(''); 
    const [refreshKey, setRefreshKey] = useState(0); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://${IP_ADDRESS}:9000/rentasUser/${numeroSolicitante}`);
            setRentasData(response.data);
          } catch (error) {
            console.error('Error fetching reservations:', error);
          }
        };
    
        fetchData();
      }, [numeroSolicitante, refreshKey]);

      const handlePayPalPayment = (precio, lockerid, id_apartado, numeroSolicitante) => {
        setSelectedPrecio(precio); // Guardar el precio seleccionado
        setSelectedIdLocker(lockerid); // Guardar el idLocker seleccionado
        setSelectedRenta(id_apartado);
        setSelectedSolicitante(numeroSolicitante);
        setShowModal(true); // Mostrar el modal para iniciar el pago
      };

      const calculateDaysRemaining = (vencimiento) => {
        const parts = vencimiento.split('/'); // Dividir la cadena de fecha en partes
    
        // Crear un objeto Date con el formato (año, mes-1, día)
        const endDate = new Date(parts[2], parts[1] - 1, parts[0]);
    
        // Obtener la fecha actual
        const today = new Date();
    
        // Calcular la diferencia en milisegundos entre la fecha de vencimiento y la fecha actual
        const differenceMs = endDate - today;
    
        // Convertir la diferencia de milisegundos a días
        const diffDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    
        return diffDays;
      };
      
      
      const cancelarRenta = async (lockerid, rentaid) => {
        try {
          await axios.put(`http://${IP_ADDRESS}:9000/cancelarRenta/${rentaid}`);
          await axios.put(`http://${IP_ADDRESS}:9000/updateLockerDis/${lockerid}`);
          console.log('Renta cancelada correctamente');
          // Actualizar la lista de rentas después de la cancelación
          const updatedReservas = await axios.get(`http://${IP_ADDRESS}:9000/rentasUser/${numeroSolicitante}`);
          setRentasData(updatedReservas.data);
        } catch (error) {
          console.error('Error al cancelar la renta:', error);
          // Manejar el error apropiadamente
        }
      };
      const handlePaymentSuccess = async () => {
        try {
          // Actualizar la lista de reservas
          setRefreshKey(prevKey => prevKey + 1);
    
          // Opcional: mostrar una alerta o mensaje de éxito
          Alert.alert('Pago completado', 'Se ha completado el pago correctamente.');
        } catch (error) {
          console.error('Error al actualizar la reserva después del pago:', error);
          // Manejar errores aquí
        } finally {
          setShowModal(false);
        }
      };

      const handleResponse = async (navState) => {
        const url = navState.url;
        if (url.includes(`http://${IP_ADDRESS}:9000/suceso`)) {
          // El pago se ha completado con éxito
          setShowModal(false);
          // Actualizar la lista de rentas
          await handlePaymentSuccess();
        } else if (url.includes('cancel_url')) {
          // El usuario canceló el pago
          setShowModal(false);
          Alert.alert('Pago cancelado', 'El usuario canceló el pago.');
        }
      };
    
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Mis rentas</Text>
     
          <FlatList
            data={rentasData}
            renderItem={({ item }) => {
              const daysRemaining = calculateDaysRemaining(item.vencimiento);
              return (
                <View style={styles.reservaContainer}>
                  <View style={styles.reservaItem}>
                    <Text style={styles.text}>Fecha de vencimiento: {item.vencimiento}</Text>
                    <Text style={styles.text}>Locker: {item.locker}</Text>
                    <Text style={styles.text}>Ubicacion: {item.ubicacion}</Text>
                    <Text style={styles.text}>Dias restantes: {daysRemaining}</Text>
                    <Text style={styles.text}>Estado de renta: {item.estado}</Text>
                    {item.estado !== 'Inactiva' && daysRemaining <= 5 && (
                      <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => handlePayPalPayment(item.precio, item.idLocker, item.id_apartado, numeroSolicitante)}
                      >
                        <Text style={styles.buttonText}>Pagar con PayPal</Text>
                      </TouchableOpacity>
                    )}
                    {item.estado !== 'Inactiva' && (
                      <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => cancelarRenta(item.lockerid, item.numero)}
                      >
                        <Text style={styles.buttonText}>Cancelar renta</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()} 
          />
    
          <Modal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <WebView
              source={{
                uri: `http://${IP_ADDRESS}:9000/renta/paypal?precio=${selectedPrecio}&lockerid=${selectedIdLocker}&renta=${selectedRenta}`
              }}
              onNavigationStateChange={handleResponse}
              injectedJavaScript={`document.f1.submit()`}
            />
          </Modal>
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
        marginBottom: 10,
        color: 'white',
      },
      flatListContent: {
        flexGrow: 1,
      },
      reservaContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#ffffff',
        shadowOffset: {
          width: 0,
          height: 3, // Ajustar la altura de la sombra
        },
        shadowOpacity: 0.5, // Aumentar la opacidad de la sombra
        shadowRadius: 7, // Aumentar el radio de difuminado de la sombra
        elevation: 5,
      },
      text: {
        fontSize: 16,
        marginBottom: 5,
      },
      buttonContainer: {
        marginTop: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
});

export default RentasUser;
