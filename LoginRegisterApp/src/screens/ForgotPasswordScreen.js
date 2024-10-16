import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API_URLS from '../api';
import { useLanguage } from '../language/language';
import { translations } from '../language/translations';

export default function ForgotPasswordScreen() {

  // const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const { language,  } = useLanguage();
  const t = (key) => translations[language][key];
  
  const handleSendOTP = async () => {
    try {
      const response = await fetch(API_URLS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert (`${t('success')}`, data.message);
		navigation.navigate('ConfirmPass', { email: email });
      } else {
        throw new Error(data.message || '');
      }
    } catch (error) {
      Alert.alert((`${t('error')}`), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textqmk}>{t('forgotPassword')}</Text>
      <Text style={styles.text1}>{`${t('enter_your_mail')}`}</Text>
      <View style={styles.view}>
        <TextInput 
          style={styles.text}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
        <Text style={styles.text}>{t('submit')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>{t('BacktoLogin')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  textqmk: {
    color: "#444444",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
  },
  text1: {
    color: "#444444",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 11,
    textAlign: 'center',
  },
  text: {
    color: "#8F8F8F",
    fontSize: 12,
  },
  view: {
    borderColor: "#444444",
    borderRadius: 20,
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 13,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#182EF3",
    borderRadius: 20,
    paddingVertical: 15,
    marginBottom: 24,
  },
  buttonText: {
    color: "#ABABAB",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: 'center',
  },
});