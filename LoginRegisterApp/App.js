import React from 'react';
import AppNavigation from './src/navigation/AppNavigation'; 
import 'intl-pluralrules'; // Import the polyfill
import 'react-native-get-random-values'; // Optional, if you use UUID or similar features
import { LanguageProvider } from './src/language/language';

const App = () => {
  return (
    <LanguageProvider>
    <AppNavigation />
    </LanguageProvider>
  );
};

export default App;