import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import API_URLS from '../api';
import { useLanguage } from '../language/language';
import { translations } from '../language/translations';
export default function ConfirmPassScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { language } = useLanguage();
  const t = (key) => translations[language][key];
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert((`${t('error')}`), (`${t('Gmail_not_found,_please_try_again')}`));
      return;
    }
    try {
      const response = await fetch(API_URLS.RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Không thể xử lý phản hồi từ server');
      }

      if (response.ok) {
        Alert.alert((`${t('ssuccess')}`), );
        navigation.navigate('Login');
      } else {
        throw new Error(data.message || (`${t('error')}`));
      }
    } catch (error) {
      console.error('Reset password error:', error);
      Alert.alert((`${t('error')}`), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textqmk}>{t('new_pass')}</Text>
      <Text style={styles.text1}>{t('please_enter_new_password')}</Text>
     
      <View style={styles.view}>
        <TextInput 
          style={styles.text}
          placeholder="OTP"
          value={otp}
          onChangeText={setOTP}
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.text1}>{t('reset_password')}</Text>

      <View style={styles.view}>
        <TextInput 
          style={styles.text}
          placeholder={t('new_pass')}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.text}>{t('reset_password')}</Text>
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
});