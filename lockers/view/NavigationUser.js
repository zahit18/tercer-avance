import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// TABSCREENS
import HomeU from "./ScreensU/tabScreens/HomeU";
import NotificationsUser from "./ScreensU/tabScreens/NotificationsUser";
import SettingsUser from "./ScreensU/tabScreens/SettingsUser";

// STACKSCREENS
import Ubicaciones from "./ScreensU/homeStack/Ubicaciones";
import LockersDisponibles from "./ScreensU/homeStack/LockersDisponibles";

// DRAWERSCREENS
import ReservasUser from "./ScreensU/drawerScreens/ReservasUser";
import RentasUser from "./ScreensU/drawerScreens/RentasUser";
import EditarPerfil from "./ScreensU/drawerScreens/EditarPerfil";
import PagosUser from "./ScreensU/drawerScreens/PagosUser";


// ICONS
import { Ionicons } from '@expo/vector-icons';
import Informacion from "./ScreensU/topTabScreens/Informacion";

// TOPTABS
const TopTab = createMaterialTopTabNavigator();

function TobTabGroup() {
    return (
        <TopTab.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#2c3e50', // Color de fondo del encabezado
            },
            headerTintColor: '#ffffff', // Color del texto del encabezado
            headerTitleStyle: {
                fontWeight: 'bold', // Estilo del título del encabezado
            },
        }}
        >
            <TopTab.Screen name="Home" component={HomeU} />
            <TopTab.Screen name="Informacion" component={Informacion} />
        </TopTab.Navigator>
    )
}

// DRAWER
const Drawer = createDrawerNavigator();

// Define el componente para el DrawerNavigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#2c3e50', // Color de fondo del drawer
          width: 240,
        },
        headerTintColor: '#fff', // Color del texto del encabezado
        headerStyle: {
          height: 80,
          backgroundColor: '#2c3e50', // Color de fondo del encabezado
        },
        headerTitleStyle: {
          color: 'white', // Color del título del encabezado
        },
        drawerActiveTintColor: 'white', // Color del texto de la opción activa en el drawer
        drawerInactiveTintColor: 'white', // Color del texto de las opciones inactivas en el drawer
        drawerActiveBackgroundColor: '#34495e', // Color de fondo de la opción activa en el drawer al presionar
        drawerContentStyle: {
          backgroundColor: '#2c3e50', // Color de fondo del contenido del drawer
          color: 'white', // Color del ícono del drawer (blanco)
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={StackGroup}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reservas"
        component={ReservasUser}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Rentas"
        component={RentasUser}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cash" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Editar Perfil"
        component={EditarPerfil}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Pagos"
        component={PagosUser}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="card" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// STACK
const Stack = createNativeStackNavigator();

function StackGroup() {
    return (
        <Stack.Navigator
        
        >
            <Stack.Screen name="MainStack" component={TabGroup} options={{ headerShown: false }} />
            <Stack.Screen name="Ubicaciones" component={Ubicaciones} />
            <Stack.Screen name="LockersDisponibles" component={LockersDisponibles} />
            <Drawer.Screen name="Reservas" component={ReservasUser} />
        </Stack.Navigator>
    )
}


// TABS
const Tab = createBottomTabNavigator();

function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false, // Oculta los labels de las pestañas
                headerShown: false, // Oculta el encabezado de la pantalla
                tabBarStyle: {
                    backgroundColor: '#1a2530', // Color de fondo de la barra de pestañas
                },
                tabBarIconStyle: {
                    marginBottom: -3, // Ajuste opcional para la posición de los iconos
                },
                tabBarInactiveTintColor: '#ffffff', // Color del ícono de pestaña inactiva
                tabBarActiveTintColor: '#ffffff', // Color del ícono de pestaña activa
            }}
        >
            <Tab.Screen
                name="HomeU"
                component={TobTabGroup}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="NotificationsUser"
                component={NotificationsUser}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsUser"
                component={SettingsUser}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50', // Establece el color de fondo principal del drawer
    },
});

export default function NavigationUser() {
    return (
            <DrawerNavigator />
        
    )
}
