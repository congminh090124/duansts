import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';




export default function SupportChanelScreen() {

    const { t, i18n } = useTranslation();
    return (


        <ScrollView style={styles.background}>

            <TouchableOpacity style={styles.buttonRow}>
                <Image
                    source={require('../../assets/headphones.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>
                    {t("customer_service")}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRow}>
                <Image
                    source={ require('../../assets/whatsApp.png') }
                    style={styles.image}
                />
                <Text style={styles.text}>
                    {"WhatsApp"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRow}>
                <Image
                    source={  require('../../assets/global.png') }
                    style={styles.image}
                />
                <Text style={styles.text}>
                    {t("website")}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRow}>
                <Image
                    source={require('../../assets/facebook.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>
                    {"Facebook"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRow}>
                <Image
                    source={require('../../assets/twitter.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>
                    {"Twitter"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRow}>
                <Image
                    source={ require('../../assets/instagram.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>
                    {"Instagram"}
                </Text>
            </TouchableOpacity>
            
        </ScrollView>



    );
}
const styles = StyleSheet.create({
	buttonRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FBFBFB",
		borderRadius: 21,
		paddingVertical: 26,
		paddingHorizontal: 27,
		marginBottom: 10,
		marginHorizontal: 34,
        marginTop: 34,
	},
    background: {
		backgroundColor: "#FFFFFF",
	},
	image: {
		width: 18,
		height: 18,
		marginRight: 27,
	},
	text: {
		color: "#000000",
		fontSize: 16,
		fontWeight: "bold",
		flex: 1,
        
	},
    
});