import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity,StyleSheet,Image ,Dimensions,ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from './DropDownPickerScreen';
const { width, height } = Dimensions.get('window');
// ko  dùng
export default function (OderSucsess) {
    const navigation = useNavigation();
   
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                {"[Nơi đặt hàng]"}
            </Text>

            <Image
                source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
                resizeMode={"stretch"}
                style={styles.image}
            />

            <Text style={styles.thankYouText}>
                {"Cảm ơn bạn vì tất cả mọi thứ\nĐơn đặt hàng đã được gửi"}
            </Text>

            <View style={styles.dateView}>
                <Text style={styles.dateText}>
                    {"Ngày 8 tháng 7 năm 2024"}
                </Text>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.viewallrow}>
                    {[...Array(7)].map((_, index) => (
                        <View key={index} style={styles.row}>
                            <View style={styles.row2}>
                                <View style={styles.view}>
                                    <Text style={styles.text}>
                                        {"Thịt bò"}
                                    </Text>
                                </View>
                                <View style={styles.view2}>
                                    <Text style={styles.text}>
                                        {"1"}
                                    </Text>
                                </View>
                                <View style={styles.view3}>
                                    <Text style={styles.text}>
                                        {"kg"}
                                    </Text>
                                </View>
                                <View style={styles.box}></View>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.buttonText}>
                                    {"Xoá"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('DropDownPicker')}>
	    <Text style={styles.buttonText}>{"Lên trang đầu"}</Text>

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
        marginBottom: 16,
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
        marginHorizontal: width * 0.06,
        marginLeft: 20,
        maxHeight:400,
    
    },
    row2: {
        
        width: width * 0.80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    text: {
        color: "#000000",
        fontSize: width * 0.027,
    },
    view: {
        width: width * 0.30,
        backgroundColor: "#FFFFFF00",
        borderColor: "#B8B8B8",
        borderWidth: 1,
        paddingVertical: height * 0.02,
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
        width: width * 0.2,
        backgroundColor: "#FFFFFF00",
        borderColor: "#B8B8B8",
        borderWidth: 1,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02,
    
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
