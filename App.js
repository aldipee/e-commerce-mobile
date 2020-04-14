import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';

import Index from './src/index';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Index />
      </PersistGate>
    </Provider>
  );
};

export default App;
