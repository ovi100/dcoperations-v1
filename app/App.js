import React from 'react';
import 'react-native-gesture-handler';
import AppProvider from '../contexts/AppContext';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
};

export default App;
