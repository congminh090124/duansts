import * as React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';
import FaqScreen from '../screens/FaqScreen';
import SupportChanelScreeen from './SupportChanelScreen';



// Tạo các Tab Component
function FaqScreenComponent() {
	return (

		<View style={styles.container}>
			<FaqScreen></FaqScreen>
			
		</View>
	);
}

function SupportChanelScreeenComponent() {
	return (

		<View>
			
			<SupportChanelScreeen>
				
			</SupportChanelScreeen>
		</View>

	);
}


// Khởi tạo Tab Navigator
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
	const { t, i18n } = useTranslation();

	return (
		<View style={styles.wrapper}>
		{/* Text nằm trên các tab */}
		<Text style={styles.headerText}>{t("support_customer")}</Text>
		
		{/* Tab Navigator nằm bên dưới Text */}
		<Tab.Navigator
			screenOptions={{
				tabBarIndicatorStyle: { backgroundColor: '#000' },  // Đổi màu của thanh indicator
			}}
		>
			<Tab.Screen name={t("faq")} component={FaqScreenComponent} />
			<Tab.Screen name={t("other")} component={SupportChanelScreeenComponent} />
		</Tab.Navigator>
	</View>
	);
}


export default function SupportCustomerScreen() {
	return (
		<MyTabs  />
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,               // Đảm bảo component chiếm hết không gian
		justifyContent: 'center',  // Canh giữa theo trục dọc
		alignItems: 'center',      // Canh giữa theo trục ngang
		backgroundColor: '#f5f5f5', // Màu nền cho dễ nhìn
	},
	wrapper: {
		flex: 1,
		paddingTop:'10%'               // Đảm bảo component chiếm hết không gian
	},
	headerText: {
		fontSize: 20,          // Kích thước chữ
		fontWeight: 'bold',    // Chữ đậm
		textAlign: 'center',   // Canh giữa chữ
		marginVertical: 10,    // Khoảng cách giữa chữ và các thành phần khác
	},
});