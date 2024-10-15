import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../api';
import { useLanguage } from '../language/language';
import { translations } from '../language/translations';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const [companyName, setCompanyName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [storedEmail, setStoredEmail] = useState('');

  const t = (key) => translations[language][key];

  // Save email in AsyncStorage
  const storeEmail = async (email) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
    } catch (error) {
      console.error('Failed to save email', error);
    }
  };

  // Validate email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate phone number
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phoneNumber);
  };

  // Validate password
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleRegister = async () => {
    if (!companyName) {
      Alert.alert(t('error'), t('companyNameRequired'));
      return;
    }

    if (!username) {
      Alert.alert(t('error'), t('usernameRequired'));
      return;
    }

    if (!email || !validateEmail(email)) {
      Alert.alert(t('error'), t('invalidEmail'));
      return;
    }

    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      Alert.alert(t('error'), t('invalidPhoneNumber'));
      return;
    }

    if (!password || !validatePassword(password)) {
      Alert.alert(t('error'), t('passwordTooShort'));
      return;
    }

    try {
      const response = await fetch(API_URLS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyname: companyName,
          username: username,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert(t('success'), t('registrationSuccessful'));
        storeEmail(email);
        navigation.navigate('VerificationAccount');
      } else {
        Alert.alert(t('error'), data.error || t('registrationFailed'));
      }
    } catch (error) {
      Alert.alert(t('error'), t('errorOccurred'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image source={require('../../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.title}>{t('register')}</Text>
        <Text style={styles.label}>{t('companyName')}</Text>
        <TextInput style={styles.input} onChangeText={setCompanyName} value={companyName} />
        <Text style={styles.label}>{t('username')}</Text>
        <TextInput style={styles.input} onChangeText={setUsername} value={username} />
        <Text style={styles.label}>{t('email')}</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} keyboardType="email-address" />
        <Text style={styles.label}>{t('phoneNumber')}</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={setPhoneNumber} value={phoneNumber} />
        <Text style={styles.label}>{t('password')}</Text>
        <TextInput style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>{t('register')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginRedirect}>{t('alreadyhaveaccount')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  logo: {
    width: "100%",
    height: "10%",
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#000C7E',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#262626',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderColor: '#8A8A8A',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#182EF3',
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginRedirect: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
  },
});
