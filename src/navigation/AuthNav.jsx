import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../screens/VerifyCredentials';
import AddProfilePicture from '../screens/AddProfilePicture';
import OnBoarding from '../screens/onboarding/OnBoarding';
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isFirstTimeOpen = async () => {
  try {
    const firstTimeOpen = await AsyncStorage.getItem('firstTimeOpen');
    console.log('firstTimeOpen:', firstTimeOpen);
    return firstTimeOpen === 'false';
  } catch (error) {
    console.error('Error accessing AsyncStorage:', error);
    return false;
  }
};

const AuthNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isFirstTimeOpen() ? 'Login' : 'Onboarding'}
      >
        <Stack.Screen name='Onboarding' component={OnBoarding} />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{ headerShown: false }}
        />

        <Stack.Screen name='RegCreds' component={RegistrationScreen} />
        <Stack.Screen name='AddProfilePicture' component={AddProfilePicture} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNav;
