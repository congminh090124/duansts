import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import BASE_URL from '../api';
import { useLanguage } from '../language/language';
import { translations } from '../language/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DropDownPickerScreen() {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const [recentOrders, setRecentOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { language } = useLanguage();
    const t = (key) => translations[language][key];
    const [username, setUsername] = useState('');
    const toggleMenu = () => setMenuVisible(!menuVisible);

    const fetchUsername = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername !== null) {
                setUsername(storedUsername);
            }
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    };

    // Add logout function
    const handleLogout = async () => {
        try {
            // Clear AsyncStorage
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('username');
            
            // Navigate to Login screen
            navigation.replace('Login');
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'Unable to logout. Please try again.');
        }
    };

    const menuOptions = [
        { title: translations[language].home, onPress: () => navigation.navigate("DropDownPicker") },
        { title: translations[language].cart, onPress: () => navigation.navigate("ListOder") },
        { title: translations[language].History, onPress: () => navigation.navigate("OrderListCode") },
        { title: translations[language].supportcustomer, onPress: () => navigation.navigate("FaqScreen") },
        { title: translations[language].notification, onPress: () => navigation.navigate("ThongBaoScreen") },
        { title: translations[language].logout, onPress: () => handleLogout() },
    ];

    useEffect(() => {
        fetchUsername();
        const fetchRecentOrders = async () => {
            const userId = await AsyncStorage.getItem('userId');
            try {
                const response = await axios.get(`${BASE_URL.BASE}/api/hoaDon/showInvoice/${userId}`);
                setRecentOrders(response.data.slice(0, 3)); // Get the 3 most recent orders
            } catch (error) {
                console.error('Error fetching recent orders:', error);
                Alert.alert('Error', 'Unable to fetch recent orders');
            }
        };

        fetchRecentOrders();
    }, []);

    const handleOrderDetail = async (orderId) => {
        if (selectedOrder && selectedOrder._id === orderId) {
            setSelectedOrder(null);
        } else {
            try {
                const response = await axios.get(`${BASE_URL.BASE}/api/hoaDon/showCTHoaDon/${orderId}`);
                const orderDetail = response.data;
                setSelectedOrder(orderDetail);
            } catch (error) {
                console.error('Error fetching order detail:', error);
                Alert.alert('Error', 'Unable to fetch order detail');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{t('client')}</Text>
                <Text style={styles.subHeaderText}>{username}</Text>
                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Icon name="menu" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.content}>
                <View style={styles.recentOrdersContainer}>
                    <Text style={styles.recentOrdersTitle}>Đơn hàng gần đây</Text>
                    {recentOrders.map((order) => (
                        <View key={order._id}>
                            <TouchableOpacity 
                                style={styles.orderItem}
                                onPress={() => handleOrderDetail(order._id)}
                            >
                                <View style={styles.row0}>
                                    <Text style={styles.textcod1}>Mã đơn</Text>
                                    <Text style={styles.textcod}>{order._id}</Text>
                                </View>
                                <View style={styles.row0}>
                                    <Text style={styles.textcod1}>Ngày đặt:</Text>
                                    <Text style={styles.text3}>
                                        {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                                    </Text>
                                </View>
                                <View style={styles.row0}>
                                    <Text style={styles.textpay}>Tình trạng:</Text>
                                    <Text style={styles.textPC}>{order.tinhTrang}</Text>
                                </View>
                                <View style={styles.row0}>
                                    <Text style={styles.textpay}>Tên khách hàng:</Text>
                                    <Text style={styles.textuser}>{order.username || 'N/A'}</Text>
                                </View>
                            </TouchableOpacity>
                            {selectedOrder && selectedOrder._id === order._id && (
                                <View style={styles.detailContainer}>
                                    {selectedOrder.cartItems.map((item) => (
                                        <View key={item.product._id} style={styles.detailRow}>
                                            <Text style={styles.detailText}>
                                                {`Tên: ${item.nameProduct}: Số Lượng: ${item.quantity} ${item.unit}`}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OderProduct')}
            >
                <Text style={styles.buttonText}>{t('next')}</Text>
            </TouchableOpacity>

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
                                <Text style={[
                                    styles.menuItemText,
                                    option.title === 'Đăng xuất' && styles.logoutText
                                ]}>
                                    {option.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%', // Sử dụng phần trăm thay vì giá trị cố định
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    subHeaderText: {
        fontSize: 14,
        color: '#666',
    },
    menuButton: {
        padding: 8,
    },
    content: {
        flex: 1,
    },
    button: {
        backgroundColor: "#4052FF",
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginHorizontal: 40,
        marginBottom: 20,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
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
    logoutText: {
        color: 'red',
    },
    recentOrdersContainer: {
        marginTop: screenWidth * 0.02,
        marginHorizontal: screenWidth * 0.04,
    },
    recentOrdersTitle: {
        fontSize: screenWidth * 0.05,
        fontWeight: 'bold',
        marginBottom: screenWidth * 0.02,
    },
    orderItem: {
        backgroundColor: "#F9F9F9",
        borderColor: "#182EF3",
        borderRadius: 12,
        borderWidth: 1,
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        marginBottom: '4%',
        shadowColor: "#00000026",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        elevation: 4,
    },
    row0: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: '2%',
    },
    textcod: {
        color: "#0671E0",
        fontSize: 14,
        flex: 1,
        flexShrink: 1, // Cho phép co lại nếu cần
    },
    textcod1: {
        color: "#262626",
        fontSize: 14,
        fontWeight: "bold",
        width: '30%', // Sử dụng phần trăm thay vì giá trị cố định
    },
    textpay: {
        color: "#262626",
        fontSize: 14,
        fontWeight: "bold",
        width: '30%', // Sử dụng phần trăm thay vì giá trị cố định
    },
    text3: {
        color: "#262626",
        fontSize: 14,
        flex: 1,
        flexShrink: 1, // Cho phép co lại nếu cần
    },
    textuser: {
        color: "#262626",
        fontSize: 14,
        flex: 1,
        flexShrink: 1, // Cho phép co lại nếu cần
    },
    textPC: {
        color: "#00FF00",
        fontSize: 14,
        flex: 1,
        flexShrink: 1, // Cho phép co lại nếu cần
    },
    viewDetailsText: {
        color: '#0671E0',
        fontSize: 14,
        textAlign: 'right',
        marginTop: 8,
    },
    detailContainer: {
        backgroundColor: '#F0F0F0',
        padding: '3%',
        marginTop: '2%',
        marginBottom: '4%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D0D0D0',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Căn lề trái
        paddingVertical: '1%',
    },
    detailLabel: {
        color: '#262626',
        fontSize: 14,
        fontWeight: 'bold',
        width: '30%', // Đặt chiều rộng cố định cho nhãn
        marginRight: '2%',
    },
    detailText: {
        color: '#262626',
        fontSize: 14,
        flex: 1, // Cho phép nội dung mở rộng
        flexShrink: 1, // Cho phép co lại nếu cần
    },
});
