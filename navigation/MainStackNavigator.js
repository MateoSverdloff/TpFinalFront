import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator'; // Asegúrate de ajustar la ruta si es necesario
import { useAuth } from '../AuthContext.js';
import LoginScreen from '../screens/LoginScreen.js';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;