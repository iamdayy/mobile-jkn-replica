import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../utils/colors';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import BottomTabs from './BottomTabs';
import FaskesRujukanScreen from '../screens/main/FaskesRujukanScreen';
import FaskesPertamaScreen from '../screens/main/FaskesPertamaScreen';
import KantorCabangScreen from '../screens/main/KantorCabangScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="FaskesRujukan" component={FaskesRujukanScreen} />
            <Stack.Screen name="FaskesPertama" component={FaskesPertamaScreen} />
            <Stack.Screen name="KantorCabang" component={KantorCabangScreen} />
          </>
        ) : (
          // Jika belum login
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
