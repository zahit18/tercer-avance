import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import Login from './Login';
import NavigationAdmin from '../view/NavigationAdmin';
import NavigationUser from '../view/NavigationUser';
import Registrarse from './Registrarse';

const Stack = createStackNavigator();

function StackGroup() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2c3e50', // Cambia el color de fondo de la barra de navegación
                },
                headerTintColor: '#ffffff', // Cambia el color del texto en la barra de navegación (blanco)
                headerTitleStyle: {
                    fontWeight: 'bold', // Opcional: Cambia el estilo del texto del título
                },
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="NavigationAdmin" component={NavigationAdmin} />
            <Stack.Screen name="NavigationUser" component={NavigationUser} />
            <Stack.Screen name="Registrarse" component={Registrarse} />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return <StackGroup />;
}
