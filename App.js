import React, { useEffect } from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import RootNavigation from './src/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    const checkFirstTimeOpen = async () => {
      try {
        const firstTimeOpen = await AsyncStorage.getItem('firstTimeOpen');
        if (firstTimeOpen === null) {
          // If firstTimeOpen doesn't exist, set it to 'false'
          await AsyncStorage.setItem('firstTimeOpen', 'false');
        }
      } catch (error) {
        console.error('Error accessing AsyncStorage:', error);
      }
    };

    checkFirstTimeOpen();
  }, []);

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;
