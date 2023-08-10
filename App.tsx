/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import { store } from './src/store';
import { ToastLayouts } from './src/layouts';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  return (
    <ToastLayouts offsetBottom={56}>
      <Provider store={store}>
        <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
          <SafeAreaProvider style={{ flex: 1 }}>
            <MainStackNavigator />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </ToastLayouts>
  );
};

export default App;
