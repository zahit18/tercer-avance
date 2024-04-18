import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeAdmin from './ScreensAdmin/HomeAdmin';
import SettingsStack from './ScreensAdmin/tabScreen/SettingsStack';
import SolicitanteScreen from './ScreensAdmin/SolicitanteScreen';
import AgregarLockersScreen from './ScreensAdmin/AgregarLockersScreen';
import LockersScreen from "./ScreensAdmin/editar/LockersScreen";
import EditarPrecio from "./ScreensAdmin/editar/EditarPrecio";
import HistorialPagoScreen from "./ScreensAdmin/HistorialPagoScreen";
import HistorialReservasScreen from "./ScreensAdmin/HistorialReservasScreen";
import HistorialRentasScreen from "./ScreensAdmin/HistorialRentasScreen";
import AgregarUbicacionScreen from "./ScreensAdmin/AgregarUbicacionScreen";

const Stack = createNativeStackNavigator();

// Define screens within the stack navigator
function AdminStack() {
    return (
        <Stack.Navigator
        >
            <Stack.Screen name="TodosLockers" component={LockersScreen} /> 
            <Stack.Screen name="EditarPrecio" component={EditarPrecio} /> 
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Menu') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Configuracion') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#1a2530', // Color de fondo de la barra de pestañas
        },
        tabBarInactiveTintColor: '#ffffff', // Color del texto de las pestañas inactivas
        tabBarActiveTintColor: '#ffffff', // Color del texto de la pestaña activa
        tabBarShowLabel: false, // Oculta los labels de las pestañas
      })}
    >
      <Tab.Screen name="Menu" component={HomeAdmin} />
       <Tab.Screen name="Configuracion" component={SettingsStack} /> 
    </Tab.Navigator>
  );
};


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#2c3e50',
          width: 240,
        },
        headerTintColor: '#fff', // Color del texto del encabezado
        headerStyle: {
          height: 80,
          backgroundColor: '#2c3e50',
        },
        headerTitleStyle: {
          color: 'white',
        },
        drawerActiveTintColor: 'white', // Color del texto de la opción activa en el drawer
        drawerInactiveTintColor: 'white', // Color del texto de las opciones inactivas en el drawer
        drawerActiveBackgroundColor: '#34495e', // Color de fondo de la opción activa en el drawer al presionar
        drawerContentStyle: {
          // Estilos para el contenido del drawer
          backgroundColor: '#2c3e50',
          color: 'white', // Color del ícono del drawer (blanco)
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Lockers"
        component={AdminStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="lock-closed" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Agregar lockers"
        component={AgregarLockersScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Agregar ubicacion"
        component={AgregarUbicacionScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Historial de solicitantes"
        component={SolicitanteScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Historial de reservas"
        component={HistorialReservasScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Historial de rentas"
        component={HistorialRentasScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cash" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Historial de pagos"
        component={HistorialPagoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="card" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50', // Establece el color de fondo principal del drawer
    },
});

// Main navigation component
export default function Navigation() {
    return <DrawerNavigator />;
}
