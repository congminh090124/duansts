import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../screens/API';
import { useTranslation } from 'react-i18next';
export default function OrderListScreen() {
    const { t, i18n } = useTranslation();
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            const userId = await AsyncStorage.getItem('userId');
            try {
                const response = await axios.get(getApiUrl(`/api/hoaDon/showInvoice/${userId}`));
                setInvoices(response.data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
                Alert.alert('Error', 'Unable to fetch invoices');
            }
        };

        fetchInvoices();
    }, []);

    const handleInvoiceDetail = async (invoiceId) => {
        if (selectedInvoice && selectedInvoice._id === invoiceId) {
            // Nếu hóa đơn đã được chọn, thu lại chi tiết hóa đơn
            setSelectedInvoice(null);
        } else {
            // Nếu hóa đơn chưa được chọn, hiển thị chi tiết hóa đơn
            try {
                const response = await axios.get(`https://lacewing-evolving-generally.ngrok-free.app/api/hoaDon/showCTHoaDon/${invoiceId}`);
                const invoiceDetail = response.data;
                setSelectedInvoice(invoiceDetail);
            } catch (error) {
                console.error('Error fetching invoice detail:', error);
                Alert.alert('Error', 'Unable to fetch invoice detail');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>
            {t('purchase_history')}
            </Text>
            <View style={styles.row}>
                <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/128/751/751463.png" }}
                    resizeMode={"stretch"}
                    style={styles.image}
                />
                <TextInput style={styles.text} placeholder={t('Enter_your_order_code')} />
            </View>
            <ScrollView>
                {invoices.map((invoice) => (
                    <View key={invoice._id}>
                        <TouchableOpacity onPress={() => handleInvoiceDetail(invoice._id)}>
                            <View style={styles.column}>
                                <View style={styles.row0}>
                                    <Text style={styles.textcod1}>
                                    {t('order_code')}
                                    </Text>
                                    <Text style={styles.textcod}>
                                        {invoice._id}
                                    </Text>
                                </View>
                                <View style={styles.row0}>
                                    <Text style={styles.textcod1}>
                                    {t('order_date')}
                                    </Text>
                                    <Text style={styles.text3}>
                                        {new Date(invoice.createdAt).toLocaleDateString()} {new Date(invoice.createdAt).toLocaleTimeString()}
                                    </Text>
                                </View>
                                <View style={styles.row0}>
                                    <Text style={styles.textpay}>
                                    {t('status')}
                                    </Text>
                                    <Text style={styles.textPC}>
                                        {invoice.tinhTrang}
                                    </Text>
                                </View>
                                <View style={styles.row0}>
                                    <Text style={styles.textpay}>
                                    {t('customer_name')}
                                    </Text>
                                    <Text style={styles.textuser}>
                                        {invoice.username || 'N/A'}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {selectedInvoice && selectedInvoice._id === invoice._id && (
                            <View style={styles.detailContainer}>
                                {selectedInvoice.cartItems.map((item) => (
                                    <View key={item.product._id} style={styles.detailRow}>
                                        <Text style={styles.detailText}>
                                            {`${t('name')}: ${item.nameProduct}: ${t('quantity')}: ${item.quantity} ${item.unit}`}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    detailContainer: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        marginHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#182EF3',
        marginTop: 10, // Thêm khoảng cách phía trên
    },
    detailRow: {
        flexDirection: 'column', // Sắp xếp theo chiều dọc
        marginBottom: 10,
    },
    detailText: {
        color: '#262626',
        fontSize: 16,
        marginBottom: 5, // Thêm khoảng cách giữa các dòng
    },
    text1: {
        color: "#000000",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: '11%',
        alignSelf: "center",
        marginBottom: 10
    },
    text3:{
        marginLeft: "-2%",
    },
    image: {
        width: 18,
        height: 18,
        marginRight: 13,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#262626",
        borderRadius: 12,
        borderWidth: 1,
        paddingVertical: 13,
        paddingHorizontal: 15,
        marginBottom: 20,
        marginHorizontal: 14,
    },
    text: {
        color: "#8A8A8A",
        fontSize: 16,
        flex: 1,
    },
    column: {
        backgroundColor: "#F9F9F9",
        borderColor: "#182EF3",
        borderRadius: 12,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        marginHorizontal: 14,
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
        marginBottom: 14,
    },
    textcod: {
        color: "#0671E0",
        fontSize: 16,
        marginRight: "45%",
    },
    textcod1: {
        color: "#262626",
        fontSize: 16,
        marginRight: 90,
        fontWeight: "bold",
    },
    textpay: {
        color: "#262626",
        fontSize: 16,
        fontWeight: "bold",
    },
  
    textuser: {
        color: "#262626",
        fontSize: 16,
        marginLeft: "13%",
    },
    textPC: {
        color: "#00FF00",
        fontSize: 16,
        marginLeft: "23%",
    },
    container: {
        height: '100%',
        flex: 1,
    }
});
