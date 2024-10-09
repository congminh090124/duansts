import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

export default function DropDownPickerScreen() {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const menuOptions = [
        { title: 'Trang chủ', onPress: () =>navigation.navigate("DropDownPicker") },
        { title: 'Giỏ hàng', onPress: () => navigation.navigate("ListOder") },
        { title: 'Lịch sử mua hàng', onPress: () => navigation.navigate("OrderListCode") },
      ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Khách hàng</Text>
                <Text style={styles.subHeaderText}>Tên người dùng ứng dụng</Text>
                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Icon name="menu" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.content}>
                <Image
                    source={{ uri: 'https://i.pinimg.com/564x/6e/93/fd/6e93fd70335d4245fa0c0bad1126d21b.jpg' }}
                    style={styles.hinhanhdicho}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OderProduct')}
            >
                <Text style={styles.buttonText}>Đến tiếp theo</Text>
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
                                <Text style={styles.menuItemText}>{option.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        // Add content styling as needed
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      hinhanhdicho: {
        width: '80%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
        resizeMode: 'cover',
      },
    
});