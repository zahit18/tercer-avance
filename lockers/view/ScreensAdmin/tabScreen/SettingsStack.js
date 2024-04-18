import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AgregarAdminScreen from '../AgregarAdminScreen';
import EditarUsuarioScreen from '../EditarUsuarioScreen';
import { StyleSheet } from 'react-native'; // Importa StyleSheet desde react-native

const TopTab = createMaterialTopTabNavigator();

const SettingsStack = () => {
  return (
    <TopTab.Navigator
    >
      <TopTab.Screen name="Agregar Administrador" component={AgregarAdminScreen} />
      <TopTab.Screen name="Editar Usuario" component={EditarUsuarioScreen} />
    </TopTab.Navigator>
  );
};

export default SettingsStack;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#2c3e50', // Color de fondo de la barra de pestañas
  },
});
