import 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { TamaguiProvider, Theme } from 'tamagui';

import RootStack from './src/navigation';
import config from './tamagui.config';

import { DatabaseProvider } from '~/contexts/databaseContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const themeName = useColorScheme();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={themeName}>
        <DatabaseProvider>
          <MenuProvider>
            <RootStack />
          </MenuProvider>
        </DatabaseProvider>
      </Theme>
      <StatusBar style={themeName === 'light' ? 'dark' : 'light'} translucent />
    </TamaguiProvider>
  );
}
