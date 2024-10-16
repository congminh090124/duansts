import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../api';
import { useLanguage } from '../language/language';
import { translations } from '../language/translations';
export default function VerificationAccountScreen({  }) {

  const navigation = useNavigation();
  const { language  } = useLanguage();


  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const [storedEmail, setStoredEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']); // Lưu mã OTP 4 ký tự

  const t = (key) => translations[language][key];
  // Lấy email từ AsyncStorage
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

  useEffect(() => {
    retrieveEmail();
  }, []);

  // Xử lý khi người dùng nhập mã OTP
  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text; // Cập nhật ký tự tương ứng
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo hoặc quay lại ô trước đó
    if (text.length === 1 && index < 3) {
      // Focus vào ô tiếp theo nếu chưa nhập hết
      if (index === 0) input2Ref.current.focus();
      if (index === 1) input3Ref.current.focus();
      if (index === 2) input4Ref.current.focus();
    } else if (text.length === 0 && index > 0) {
      // Focus về ô trước đó nếu xóa ký tự
      if (index === 3) input3Ref.current.focus();
      if (index === 2) input2Ref.current.focus();
      if (index === 1) input1Ref.current.focus();
    }
  };

  // Xử lý xác thực OTP với API
  const handleVerifyOTP = async () => {
    const otpCode = otp.join(''); // Ghép 4 ký tự thành chuỗi OTP
    if (otpCode.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP.');
      return;
    }

    try {
      const response = await fetch(API_URLS.VERIFY_OTP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: storedEmail, // Gửi email đã lưu
          otp: otpCode, // Gửi mã OTP
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert(`${t('success')}`, `${t('Account_verification_successful')}`);
        // Chuyển đến màn hình đăng nhập hoặc màn hình chính
        navigation.navigate('Login');
      } else {
        Alert.alert(`${t('Error')}`, data.error ||`${t('sInvalid_OTP_Please_try_againuccess')}`);
      }
    } catch (error) {
      Alert.alert(`${t('Error')}`, 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View>
      <Text style={styles.textxm}>{t("verification")}</Text>
      <View style={styles.column}>
        <Text style={styles.textnm}>{storedEmail ? `Email: ${storedEmail}` : ''}</Text>
        <Text style={styles.textnm}>{t("enter_verification_code")}</Text>
        <View style={styles.row}>
          <View style={styles.view}>
            <TextInput
              ref={input1Ref}
              style={styles.text}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, 0)}
              value={otp[0]}
            />
          </View>
          <View style={styles.view}>
            <TextInput
              ref={input2Ref}
              style={styles.text}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, 1)}
              value={otp[1]}
            />
          </View>
          <View style={styles.view}>
            <TextInput
              ref={input3Ref}
              style={styles.text}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, 2)}
              value={otp[2]}
            />
          </View>
          <View style={styles.view}>
            <TextInput
              ref={input4Ref}
              style={styles.text}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, 3)}
              value={otp[3]}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.text}>{t("submit")}</Text>
        </TouchableOpacity>
        <Text style={styles.textnb}>{t("resend_code_instruction")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    marginTop: '50%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 73,
  },
  text: {
    color: '#8F8F8F',
    fontSize: 13,
    fontWeight: 'bold',
  },
  textxm: {
    color: '#444444',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: '10%',
    alignSelf: 'center',
  },
  textnm: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  textnb: {
    color: '#ABABAB',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 41,
    marginLeft: 114,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#182EF3',
    borderRadius: 20,
    paddingVertical: 17,
    marginBottom: 24,
    marginHorizontal: 43,
  },
  view: {
    width: 50,
    alignItems: 'center',
    borderColor: '#444444',
    borderRadius: 33,
    borderWidth: 1,
    paddingVertical: 19,
  },
});
