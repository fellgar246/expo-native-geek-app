import { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import TabNavigator from './src/navigation/TabNavigator';

import { store } from './src/app/store';
import { Provider } from 'react-redux';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-VariableFont_wght.ttf'),
    'PressStart2P': require('./assets/fonts/PressStart2P-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  
  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <TabNavigator />
      <StatusBar style="light" /> 
    </Provider>
  );
}
