import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/AppNavigator';
import { SessionProvider } from './components/SessionContext'; // Importa el proveedor de contexto de sesión

export default function App() {
  return (
    <SessionProvider> 
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
