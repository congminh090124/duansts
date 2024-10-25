import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
import API_URLS from '../api';
import { useLanguage } from '../language/language';
import { translations } from '../language/translations';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { language, changeLanguage } = useLanguage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'English', value: 'en' },
    { label: 'Tiếng Việt', value: 'vi' }
  ]);

  const t = (key) => translations[language][key];

  useEffect(() => {
    // You can add any additional setup logic here if needed
  }, []);

  const handleLanguageChange = (value) => {
    if (typeof value === 'string') {
      changeLanguage(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(t('error'), t('errorMessage'));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await AsyncStorage.setItem('userToken', data.token || '');
        await AsyncStorage.setItem('userId', data.userId || '');
        
        // Sử dụng username từ input nếu không có trong response
        const usernameToStore = data.username || username;
        await AsyncStorage.setItem('username', usernameToStore);

        await AsyncStorage.setItem('isLoggedIn', 'true');
        Alert.alert(t('success'), t('loginSuccess'));
        navigation.navigate('DropDownPicker', { username: usernameToStore });
      } else {
        Alert.alert(t('error'), t('loginFailed'));
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(t('error'), t('errorOccurred'));
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image source={require('../../assets/Logo.png')} style={styles.logo} />
          <Text style={styles.title}>{t('loginTitle')}</Text>

          <Text style={styles.label}>{t('username')}</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder={t('usernamePlaceholder')}
            autoCapitalize="none"
          />

          <Text style={styles.label}>{t('password')}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholder={t('passwordPlaceholder')}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>{t('forgotPassword')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? t('loggingIn') : t('login')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>{t('register')}</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>https://www.riatec-th.co.jp</Text>
        </ScrollView>

        <View style={styles.languagePickerContainer}>
          <DropDownPicker
            open={open}
            value={language} // giá trị hiện tại của ngôn ngữ
            items={items}
            setOpen={setOpen}
            setValue={(callback) => {
              const selectedValue = callback(language); // lấy giá trị ngôn ngữ mới
              handleLanguageChange(selectedValue); // cập nhật ngôn ngữ
            }}
            setItems={setItems}
            containerStyle={styles.languagePicker}
            textStyle={styles.languagePickerText}
          />

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: "90%",
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    color: '#0000FF',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#0000FF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#8888FF',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#0000FF',
    marginBottom: 20,
  },
  languagePickerContainer: {
    zIndex: 1000,
    width: '100%',
    marginBottom: 20,
  },
  languagePicker: {
    width: '100%',
  },
  languagePickerText: {
    fontSize: 16,
  },
  footerText: {
    color: '#888',
    marginTop: 20,
  },
});
