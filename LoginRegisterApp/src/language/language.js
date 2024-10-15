import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved language preference
    AsyncStorage.getItem('language')
      .then(savedLanguage => {
        if (savedLanguage) setLanguage(savedLanguage);
      })
      .catch(error => console.error('Error loading language:', error));
  }, []);

  const changeLanguage = (lang) => {
    if (typeof lang === 'string') {
      setLanguage(lang);
      AsyncStorage.setItem('language', lang)
        .catch(error => console.error('Error saving language:', error));
    } else {
      console.error('Invalid language value:', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);