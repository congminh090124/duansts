import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import { useTranslation } from 'react-i18next';
import { getApiUrl } from '../screens/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [storedEmail, setStoredEmail] = useState('');
// lưu email
  const storeEmail = async (email) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
    } catch (error) {
      console.error('Failed to save email', error);
    }
  };
 // Hàm lấy email từ AsyncStorage
 const retrieveEmail = async () => {
  try {
    const savedEmail = await AsyncStorage.getItem('userEmail');
    if (savedEmail !== null) {
      setStoredEmail(savedEmail);
    }
  } catch (error) {
    console.error('Failed to retrieve email', error);
  }
};
  // Hàm validate email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Hàm validate số điện thoại
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[0-9]{10}$/; // Ví dụ: yêu cầu số điện thoại là 10 chữ số
    return regex.test(phoneNumber);
  };

  // Hàm validate mật khẩu
  const validatePassword = (password) => {
    return password.length >= 6; // Yêu cầu mật khẩu phải có ít nhất 6 ký tự
  };

  const handleRegister = async () => {
    // Kiểm tra các trường dữ liệu
    if (!companyName) {
      Alert.alert('Error', 'Company Name is required');
      return;
    }

    if (!username) {
      Alert.alert('Error', 'Username is required');
      return;
    }

    if (!email || !validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid phone number (10 digits)');
      return;
    }

    if (!password || !validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch(getApiUrl('/api/auth/register'), {
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
        Alert.alert('Success', 'Registration successful!');
        // Chuyển đến màn hình đăng nhập
        storeEmail(email);
        navigation.navigate('VerificationAccount');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <ScrollView>
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.textdangnhap}>{t('register')}</Text>
      <Text style={styles.textID}>{t('companyName')}</Text>
      <TextInput style={styles.box} placeholder="" onChangeText={setCompanyName} value={companyName} />
      <Text style={styles.textID}>{t('username')}</Text>
      <TextInput style={styles.box} placeholder="" onChangeText={setUsername} value={username} />
      <Text style={styles.textID}>{t('email')}</Text>
      <TextInput style={styles.box} placeholder="" onChangeText={setEmail} value={email} keyboardType="email-address" />
      <Text style={styles.textID}>{t('phoneNumber')}</Text>
      <TextInput style={styles.box} placeholder="" keyboardType="numeric" onChangeText={setPhoneNumber} value={phoneNumber} />
      <Text style={styles.textID}>{t('password')}</Text>
      <TextInput style={styles.box} placeholder="" secureTextEntry onChangeText={setPassword} value={password} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.text}>{t('register')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textdktk}>{t('alreadyhaveaccount')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
	textqmk: {
		color: "#182EF3",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 44,
		marginLeft: 65,
	},
  button: {
		alignItems: "center",
		backgroundColor: "#182EF3",
		borderRadius: 20,
		paddingVertical: 17,
		marginBottom: 24,
		marginHorizontal: 43,
	},
	text: {
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: "bold",
	},
  logo: {
		width: 285,
		height: 70,
		marginTop: 67,
		marginBottom: 78,
		marginHorizontal: 67,
    alignSelf: 'center',
	},
  textdangnhap: {
		color: "#000C7E",
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 30,
		marginLeft: 69,
	},
  box: {
		height: 44,
		backgroundColor: "#FFFFFF",
		borderColor: "#8A8A8A",
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: 20,
		marginHorizontal: 16,
	},
  textID: {
		color: "#262626",
		fontSize: 16,
		marginBottom: 5,
		marginLeft: 17,
	},
  textdktk: {
		color: "#000000",
		fontSize: 14,
		marginBottom: 268,
		marginLeft: 69,
	},
});