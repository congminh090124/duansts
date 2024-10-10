import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert ,Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo';

import { getApiUrl } from '../screens/API';
const { width, height } = Dimensions.get('window');

export default function ListOrderScreen() {
     const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const menuOptions = [
        { title: `${t('home')}`, onPress: () =>navigation.navigate("DropDownPicker") },
        { title: `${t('cart')}`, onPress: () => navigation.navigate("ListOder") },
        { title: `${t('order')}`, onPress: () => navigation.navigate("OrderListCode") },
      ];
    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(getApiUrl('/api/cart/'));
            setCartItems(response.data);
        } catch (error) {
            console.error(`${t('error')}`, error);
            Alert.alert(`${t('error')}`);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) {
            Alert.alert((`${t('notification')}`), (`${t('The number cannot be less than 1')}`));
            return;
        }
        try {
            const response = await axios.put(getApiUrl(`/api/cart/updateQuantity/${itemId}`), {
                quantity: newQuantity
            });
            if (response.status === 200) {
                fetchCartItems(); // Làm mới giỏ hàng
            }
        } catch (error) {
            console.error(`${t('quantityUpdateError')}`, error);
            Alert.alert((`${t('error')}`), );
        }
    };

    const handleDeleteItem = async (itemId) => {
        Alert.alert(
            (`${t('Delete confirmation')}`),
            (`${t('Are you sure you want to delete this item?')}`),
            [
                { text: (`${t('Cancel')}`), style: 'cancel' },
                {
                    text: (`${t('Delete')}`),
                    onPress: async () => {
                        try {
                            const userId = await AsyncStorage.getItem('userId');
                            if (!userId) {
                                Alert.alert((`${t('Error')}`), (`${t('User not logged in')}`));
                                return;
                            }
    
                            // Thêm token xác thực nếu cần
                            const token = await AsyncStorage.getItem('token');
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                                data: { userId }
                            };
    
                            await axios.delete (getApiUrl(`/api/cart/${itemId}`), config);
                            fetchCartItems();
                        } catch (error) {
                            console.error((`${t('Failed to delete item')}`), error);
                            Alert.alert((`${t('Error')}`), (`${t('Failed to delete item')}`));
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleCheckout = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                Alert.alert((`${t('Error')}`), (`${t('User not logged in')}`));
                return;
            }

            console.log('Dữ liệu thanh toán:', { userId, cartItems, tinhTrang: (`${t('success')}`) });

            const response = await axios.post(getApiUrl('/api/hoaDon/createInvoice'), {
                userId,
                cartItems,
                tinhTrang: (`${t('success')}`),
            });

            if (response.status === 201) {
                Alert.alert(`${t('success')}`, `${t('checkoutSuccess')}`);
                fetchCartItems(); 
            } else {
                Alert.alert(`${t('Error')}`, `${t('checkoutError')}`);
            }
        } catch (error) {
            console.error(`${t('Failed to process payment')}`, error);
            Alert.alert(`${t('Error')}`, `${t('Failed with status code 500')}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textf}>{t('cart')}</Text>
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Icon name="menu" size={24} color="#000" />
                </TouchableOpacity>
            <View>
                <Text style={styles.text1}>{t('product_list')}</Text>
            </View>
            <View style={styles.viewday}>
                <Text style={styles.textday}>{new Date().toLocaleDateString()}</Text>
            </View>



            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={toggleMenu}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleMenu}>
                    <View style={styles.menuContainer}>
                        {menuOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={() => {
                                    option.onPress();
                                    toggleMenu();
                                }}
                            >
                                <Text style={styles.menuItemText}>{option.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
            <ScrollView style={styles.scrollView}>
                <View style={styles.viewallrow}>
                    {cartItems.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <View style={styles.row2}>
                                <View style={styles.view}>
                                    <Text style={styles.text}>{item.product.nameProduct}</Text>
                                </View>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => updateQuantity(item._id, item.quantity - 1)}>
                                        <Text style={styles.quantityButton}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => updateQuantity(item._id, item.quantity + 1)}>
                                        <Text style={styles.quantityButton}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.view3}>
                                    <Text style={styles.text}>{item.unit}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteItem(item._id)}>
                                <Text style={styles.deleteButton}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.viewbutton}>
                <TouchableOpacity style={styles.viewodcf} onPress={handleCheckout}>
                    <Text style={styles.textodcf}>{t('submit_order_button')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    text1:{
        textAlign: 'center',
        // fontSize: width * 0.04,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
        marginTop: height * 0.05,
    },
    menuButton: {
        padding: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    menuContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
    },
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
    },
    viewday: {
        borderColor: "#79747E",
        borderRadius: 4,
        borderWidth: 1,
        paddingVertical: height * 0.03,
        marginHorizontal: width * 0.05,
    },
    textday: {
        color: "#1D1B20",
        // fontSize: "15%",
        textAlign: "center",
       
    },
    box: {
        width: 1,
        height: height * 0.05,
        backgroundColor: "#B8B8B8",
    },
   
  
    text: {
        color: "#000000",
        // fontSize: width * 0.035,
    },
    view: {
        width: width * 0.35, 
        backgroundColor: "#FFFFFF00",
        borderColor: "#B8B8B8",
        borderWidth: 1,
        paddingVertical: height * 0.025, 
        paddingHorizontal: width * 0.02,
    },
    view2: {
        width: width * 0.20,
        backgroundColor: "#FFFFFF00",
        borderColor: "#B8B8B8",
        borderWidth: 1,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02,
    },
    view3: {
        width: width * 0.25,
        backgroundColor: "#FFFFFF00",
        borderColor: "#B8B8B8",
        borderWidth: 1,
        paddingVertical: height * 0.025,
        paddingHorizontal: width * 0.02,
    },
   
 
    buttonText: {
        color: "#000000",
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textf: {
        // fontSize: width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: height * 0.07,
    },
    scrollView: {
        marginTop: height * 0.02,
    },
    viewallrow: {
        marginHorizontal: width * 0.05,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height * 0.025, 
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: height * 0.015, 
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    view: {
        width: width * 0.3,
    },
    text: {
        // fontSize: width * 0.027,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width * 0.25, 
    },
    quantityText: {
        fontSize: width * 0.035, 
        marginHorizontal: 10,
    },
    quantityButton: {
        fontSize: width * 0.05, 
        fontWeight: 'bold',
        color: '#007AFF',
        paddingHorizontal: 12, 
    },
    deleteButton: {
        // fontSize: width * 0.05,
        color: 'red',
    },
    view3: {
        width: width * 0.1,
        alignItems: 'center',
    },
    viewbutton: {
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    viewodcf: {
        backgroundColor: '#007AFF',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.1,
        marginBottom: height * 0.04,
        borderRadius: 6,
        
    },
    textodcf: {
        color: '#fff',
        // fontSize: width * 0.04,
        fontWeight: 'bold',
    },
});
