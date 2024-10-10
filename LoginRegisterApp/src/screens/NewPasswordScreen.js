import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

export default function NewPasswordScreen() {
  return (
    <View>
      <Text>Mật khẩu mới</Text>
      <TextInput 
        placeholder={t('newpass')} 
        secureTextEntry 
        style={styles.input}
      />
        <TextInput 
        placeholder={t('newpass1')} 
        secureTextEntry 
        style={styles.input}
      />
      <Button title={t('send')} onPress={() => {}} />
      <TouchableOpacity>
        <Text>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}
