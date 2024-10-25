import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLanguage } from '../language/language';
import { translations } from '../language/translations';
const { width, height } = Dimensions.get('window');

export default function OderSucsess() {
    const navigation = useNavigation();
    const route = useRoute();
    const t = (key) => translations[language][key];
    const { language, changeLanguage } = useLanguage();
    const { orderData, cartItems } = route.params || {};

    // Thêm kiểm tra này
    if (!cartItems) {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Đơn hàng thành công</Text>
                <Text>Không có thông tin sản phẩm</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                {`${t('OderSucsess')}`}
            </Text>

            <Image
                source={require('../../assets/order_success.png')}
                resizeMode="contain"
                style={styles.image}
            />

            <Text style={styles.thankYouText}>
                {`${t('Thanks')}`}
            </Text>

            <View style={styles.dateView}>
                <Text style={styles.dateText}>
                    {new Date().toLocaleDateString()}
                </Text>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.viewallrow}>
                    {cartItems.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <View style={styles.row2}>
                                <View style={styles.view}>
                                    <Text style={styles.text}>
                                        {item.product.nameProduct}
                                    </Text>
                                </View>
                                <View style={styles.view2}>
                                    <Text style={styles.text}>
                                        {item.quantity}
                                    </Text>
                                </View>
                                <View style={styles.view3}>
                                    <Text style={styles.text}>
                                        {item.unit}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DropDownPicker')}>
                <Text style={styles.buttonText}>{`${t('back_to_home')}`}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    titleText: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop:"10%"
    },
    thankYouText: {
        color: "#182EF3",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 12,
    },
    image: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginBottom: 12,
    },
    dateView: {
        backgroundColor: '#F1F1F1',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    dateText: {
        fontSize: 16,
        color: '#000',
    },
    scrollView: {
        marginVertical: 16,
        
    },
    tableContainer: {
        paddingHorizontal: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    row2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
    },
    view: {
        flex: 3,
        paddingRight: 10,
    },
    view2: {
        flex: 1,
        alignItems: 'center',
    },
    view3: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    cell: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#B8B8B8',
    },
    cellText: {
        fontSize: 16,
        color: '#000',
    },
    deleteText: {
        color: '#FF0000',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#182EF3',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText:{
        color:"black",
        fontWeight: "bold",
    }
});
