import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert, RefreshControl } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import { useSession } from "../../../components/SessionContext";
import { IP_ADDRESS } from '../../../env';

const ReservasUser = ({ navigation }) => {
  const { numeroSolicitante } = useSession();
  const [reservasData, setReservasData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrecio, setSelectedPrecio] = useState(0);
  const [selectedIdLocker, setSelectedIdLocker] = useState('');
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [selectedSolicitante, setSelectedSolicitante] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); // Estado local para forzar la actualización del componente
  const [refreshing, setRefreshing] = React.useState(false)


  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:9000/getApartadoU/${numeroSolicitante}`);
      setReservasData(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };


  useEffect(() => {

    fetchData();
  }, [numeroSolicitante, refreshKey]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
    await fetchData();
    setRefreshing(false);
  }, []);

  const handlePayPalPayment = (precio, idLocker, Reserva, numeroSolicitante) => {
    setSelectedPrecio(precio);
    setSelectedIdLocker(idLocker);
    setSelectedReserva(Reserva);
    setSelectedSolicitante(numeroSolicitante);
    setShowModal(true);
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

    if (url.includes(`http://${IP_ADDRESS}:9000/success`)) {
      // Se ha completado el pago con éxito
      await handlePaymentSuccess();
    } else if (url.includes('cancel_url')) {
      // El usuario canceló el pago
      setShowModal(false);
      Alert.alert('Pago cancelado', 'El usuario canceló el pago.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis reservas</Text>

      <FlatList
        data={reservasData}
        renderItem={({ item }) => (
          <View style={styles.reservaContainer}>
            <View style={styles.reservaItem}>
              <Text style={styles.text}>Fecha Reserva: {item.FechaReserva}</Text>
              <Text style={styles.text}>Vencimiento: {item.Vencimiento}</Text>
              <Text style={styles.text}>Locker: {item.Locker}</Text>
              <Text style={styles.text}>Ubicación: {item.Ubicacion}</Text>
              <Text style={styles.text}>Tamaño: {item.Tamaño}</Text>
              <Text style={styles.text}>Precio: {item.Precio}</Text>
              <Text style={styles.text}>Estado de Reserva: {item.Estado}</Text>
              {item.Estado !== 'Pagado' && item.Estado !== 'Cancelado' && item.Estado !== 'Vencido' && (
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handlePayPalPayment(item.Precio, item.idLocker, item.Reserva, numeroSolicitante)}
                >
                  <Text style={styles.buttonText}>Pagar con PayPal</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.Reserva.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#78e08f']}
            progressBackgroundColor='#0a3d62'
          />
        }
      />

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <WebView
          source={{
            uri: `http://${IP_ADDRESS}:9000/paypal?Precio=${selectedPrecio}&idLocker=${selectedIdLocker}&Reserva=${selectedReserva}&Solicitante=${selectedSolicitante}`
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
  reservaContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    // Propiedades de sombra para iOS
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
export default ReservasUser;