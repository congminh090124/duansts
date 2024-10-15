import React from 'react';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


export default function OderDetailScreen() {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    return (
        <View>
            <View style={styles.row}>
                <TouchableOpacity>
                    <Image
                        source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
                        resizeMode={"stretch"}
                        style={styles.buttonImage}
                    />
                </TouchableOpacity>
                <View style={styles.box}>
                </View>
                <Text style={styles.text}>
                    {t("orderDetail")}
                </Text>
                <TouchableOpacity>
                    <Image
                        source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
                        resizeMode={"stretch"}
                        style={styles.buttonImage2}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.row2}>
                    <Text style={styles.text2}>
                    {t("order_code")}
                    </Text>
                    <Text style={styles.text3}>
                        {"IN00000008"}
                    </Text>
                </View>
                <View style={styles.row3}>
                    <Text style={styles.text4}>
                    {t("order_date")}
                    </Text>
                    <Text style={styles.text5}>
                        {"2024/07/14 16:20"}
                    </Text>
                </View>
                <View style={styles.row4}>
                    <Text style={styles.text6}>
                    {t("situation")}
                    </Text>
                    <Text style={styles.text7}>
                    {t("complete")}
                    </Text>
                </View>
                <View style={styles.box2}>
                </View>
                <View style={styles.row5}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/128/10507/10507943.png" }}
                        resizeMode={"stretch"}
                        style={styles.image}
                    />
                    <View style={styles.box}>
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.text8}>
                        {t("bluefin_tuna")}
                        </Text>
                        <Text style={styles.text9}>
                            {"MÃ00001"}  {/*  chỗ này ghi thẳng mã sp luôn không cần chú thish bên cạnh  */}
                        </Text>
                        <View style={styles.row6}>
                            <Text style={styles.text10}>
                                {"kg"}
                            </Text>
                            <Text style={styles.text11}>
                                {"1.6"}
                            </Text>
                        </View>
                        <View style={styles.row6}>

                            <Text style={styles.text12}>
                            {t("price")}
                            </Text>
                            <Text style={styles.text13}>
                                {"16.600"} {t('yen')}
                            </Text>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.row5}>
                    <Image
                        source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
                        resizeMode={"stretch"}
                        style={styles.image}
                    />
                    <View style={styles.box}>
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.text8}>
                            {"Đẳng cấp cá ngừ vây xanh"}
                        </Text>
                        <Text style={styles.text9}>
                            {"MÃ00001"}
                        </Text>
                        <View style={styles.row6}>
                            <Text style={styles.text10}>
                                {"kg"}
                            </Text>
                            <Text style={styles.text11}>
                                {"1.6"}
                            </Text>
                        </View>
                        <View style={styles.row6}>
                            <Text style={styles.text12}>
                                {"giá "}
                            </Text>
                            <Text style={styles.text13}>
                                {"16.600 yên"}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row5}>
                    <Image
                        source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
                        resizeMode={"stretch"}
                        style={styles.image}
                    />
                    <View style={styles.box}>
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.text8}>
                            {"Đẳng cấp cá ngừ vây xanh"}
                        </Text>
                        <Text style={styles.text9}>
                            {"MÃ00001"}
                        </Text>
                        <View style={styles.row6}>
                            <Text style={styles.text10}>
                                {"kg"}
                            </Text>
                            <Text style={styles.text11}>
                                {"1.6"}
                            </Text>
                        </View>
                        <View style={styles.row6}>
                            <Text style={styles.text12}>
                                {"giá "}
                            </Text>
                            <Text style={styles.text13}>
                                {"16.600 yên"}
                            </Text>
                        </View>
                    </View>
                </View> */}
                <View style={styles.box3}>
                </View>
                
            </ScrollView>
            <View style={styles.viewtt}>
                    <Text style={styles.text18}>
                    {t('order_payment_details')}
                    </Text>
                    <View style={styles.row12}>
                        <Text style={styles.text15}>
                        {t('order_amount')}
                        </Text>
                        <Text style={styles.text19}>
                            {"21.000 "}  {t('yen')}
                        </Text>
                    </View>
                    <View style={styles.row12}>
                        <Text style={styles.text15}>
                        {t('discount')}
                        </Text>
                        <Text style={styles.text19}>
                            {"1.000  "}{t('yen')}
                        </Text>
                    </View>
                    <View style={styles.row12}>
                        <Text style={styles.text15}>
                        {t('shipping_fee')}
                        </Text>
                        <Text style={styles.text22}>
                        {t('free_shipping')}
                        </Text>
                    </View>
                    <View style={styles.box4}>
                    </View>
                    <View style={styles.row13}>
                        <Text style={styles.text23}>
                        {t('total_order_amount')}
                        </Text>
                        <Text style={styles.text22}>
                            {"20.100  "}{t('yen')}
                        </Text>
                    </View>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    absoluteText: {
        position: "absolute",
        bottom: -15,
        right: 0,
        color: "#262626",
        fontSize: 16,
        fontWeight: "bold",
    },
    scrollView:{
        height: 400,
    },
    box: {
        flex: 1,
    },
    box2: {
        height: 1,
        marginBottom: 9,
        marginHorizontal: 15,
    },
    box3: {
        height: 1,
        marginBottom: 38,
        marginHorizontal: 36,
    },
    box4: {
        height: 1,
        backgroundColor: "#CACACA",
        marginBottom: 31,
        marginHorizontal: 36,
    },
    buttonImage: {
        width: 8,
        height: 14,
    },
    buttonImage2: {
        width: 30,
        height: 16,
    },
    column2: {
        width: 208,
    },
    column3: {
        flex: 1,
    },
    column4: {
        width: 119,
        alignSelf: "flex-start",
    },
    column5: {
        width: 50,
        alignSelf: "flex-start",
        marginTop: 3,
    },
    image: {
        borderRadius: 4,
        width: 140,
        height: 153,
    },
    image2: {
        borderRadius: 4,
        width: 140,
        height: 153,
        marginRight: 34,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 19,
        marginHorizontal: 30,
       marginTop: '10%',
    },
    row2: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        marginHorizontal: 17,
    },
    row3: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        marginHorizontal: 18,
    },
    row4: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 9,
        marginHorizontal: 17,
    },
    row5: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#BEBEBE",
        borderWidth: 1,
        marginBottom: 9,
        marginHorizontal: 13,
    },
    row6: {
        flexDirection: 'row', // Đặt các phần tử nằm ngang
        alignItems: 'center', // Căn giữa theo chiều dọc (nếu cần)
        backgroundColor: '#000', // Màu nền xám nhạt
        marginTop: 10,
         backgroundColor:"#C5CCC8",
        borderRadius: 4,

    },
    row7: {
        width: 140,
        height: 25,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 7,
    },
    row8: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#BEBEBE",
        borderWidth: 1,
        marginBottom: 13,
        marginHorizontal: 11,
    },
    row9: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
        borderRadius: 4,
        paddingVertical: 8,
        paddingLeft: 10,
        paddingRight: 50,
        marginBottom: 7,
    },
    row10: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
        borderRadius: 4,
        paddingVertical: 6,
        paddingLeft: 7,
        paddingRight: 26,
    },
    row11: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 11,
        marginHorizontal: 41,
    },
    row12: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        marginHorizontal: 40,
    },
    row13: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 38,
    },
    text: {
        color: "#000000",
        fontSize: 22,
        fontWeight: "bold",
        marginRight: 40,
        marginTop: 20
    },
    text2: {
        color: "#262626",
        fontSize: 16,
        marginRight: 98,
    },
    text3: {
        color: "#0671E0",
        fontSize: 16,
        flex: 1,
    },
    text4: {
        color: "#262626",
        fontSize: 16,
        marginRight: 58,
    },
    text5: {
        color: "#000000",
        fontSize: 16,
        flex: 1,
    },
    text6: {
        color: "#262626",
        fontSize: 16,
        marginRight: 90,
    },
    text7: {
        color: "#35CD00",
        fontSize: 16,
        flex: 1,
    },
    text8: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text9: {
        color: "#000000",
        fontSize: 13,
        marginBottom: 8,
        marginLeft: 3,
    },
    text10: {
        color: "#000000",
        fontSize: 14,
        marginRight: 50,
        padding: 5
    },
    text11: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10
    },
    text12: {
        color: "#000000",
        fontSize: 14,
        marginRight: 29,
        padding: 5

    },
    text13: {
        color: "#B40000",
        fontSize: 14,
        flex: 1,
    },
    text14: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 9,
        marginLeft: 1,
    },
    text15: {
        color: "#000000",
        fontSize: 14,
    },
    text16: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "bold",
    },
    text17: {
        color: "#B40000",
        fontSize: 14,
    },
    text18: {
        color: "#000000",
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 30,
        marginLeft: 41,
    },
    text19: {
        color: "#262626",
        fontSize: 14,
        fontWeight: "bold",
    },
    text20: {
        color: "#000000",
        fontSize: 16,
    },
    text21: {
        color: "#262626",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
        width: 50,
    },
    text22: {
        color: "#F73658",
        fontSize: 14,
        fontWeight: "bold",
    },
    text23: {
        color: "#000000",
        fontSize: 17,
        fontWeight: "bold",
    },
    text24: {
        color: "#F73658",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
        marginTop: 4,
        width: 50,
    },
    viewtt:{
        marginBottom:20,
        height:100,
    }
});



