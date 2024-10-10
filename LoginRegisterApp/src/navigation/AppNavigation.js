import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import VerificationAccountScreen from '../screens/VerificationAccount';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ConfirmPassScreen from '../screens/ConfirmPassScreen';
import DropDownPickerScreen from '../screens/DropDownPickerScreen';
import OderProductScreen from '../screens/OderProductScreen';
import NotificationScreen from '../screens/NotificationScreen';
import OrderListScreen from '../screens/OrderListScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import SupportCustomerScreen from '../screens/SupportCustomerScreen';
import SupportChanelScreen from '../screens/SupportChanelScreen';
import ListOderScreen from '../screens/ListOderScreen';
import OderSucsess from '../screens/OderSucsess';
import FaqScreen from '../screens/FaqScreen';
import i18n from '../language/i18n';
import { MenuProvider } from 'react-native-popup-menu'; // Import MenuProvider
const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <MenuProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VerificationCode">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="FaqScreen" 
          component={FaqScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ headerShown: false }} // Hide the header
        /><Stack.Screen 
          name="SupportChannel" 
          component={SupportChanelScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="VerificationCode" 
          component={VerificationCodeScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="VerificationAccount" 
          component={VerificationAccountScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="NewPassword" 
          component={NewPasswordScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="ConfirmPass" 
          component={ConfirmPassScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="DropDownPicker" 
          component={DropDownPickerScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="OderProduct" 
          component={OderProductScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="NotifycationCode" 
          component={NotificationScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="OrderListCode" 
          component={OrderListScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="OderDetailCode" 
          component={OrderDetailScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="SupportCustomerScreenCode" 
          component={SupportCustomerScreen} 
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen 
          name="ListOder" 
          component={ListOderScreen} 
          options={{ headerShown: false }} // Hide the header
        />
         <Stack.Screen 
          name="OderSucsess" 
          component={OderSucsess} 
          options={{ headerShown: false }} // Hide the header
        />
      </Stack.Navigator>
    </NavigationContainer>
    </MenuProvider>
  );
};

export default AppNavigation;

