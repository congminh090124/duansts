import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Sử dụng bộ icon Ionicons
import { useTranslation } from 'react-i18next';

export default function FaqScreen() {
    const { t, i18n } = useTranslation();
    const [expandedId, setExpandedId] = useState(null); // Trạng thái lưu ID của item mở rộng
    const [activeTab, setActiveTab] = useState('general'); // Trạng thái lưu tab hiện tại

    const toggleDropdown = (id) => {
        setExpandedId(expandedId === id ? null : id); // Thay đổi trạng thái khi người dùng nhấn
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <View>
                        {[1, 2, 3].map((itemId) => (
                            <TouchableOpacity key={itemId} style={styles.button2} onPress={() => toggleDropdown(itemId)}>
                                <View style={styles.row}>
                                    <Text style={styles.text2}>{t("support_related_questions")}</Text>
                                    <Ionicons
                                        name={expandedId === itemId ? 'chevron-up-outline' : 'chevron-down-outline'}
                                        size={20}
                                        color="black"
                                        style={styles.icon}
                                    />
                                </View>
                                {expandedId === itemId && (
                                    <View style={styles.dropdown}>
                                        <Text style={styles.item}>
                                            {t("data_safety")}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            case 'payments':
                return (
                    <View>
                    {[1, 2, 3].map((itemId) => (
                        <TouchableOpacity key={itemId} style={styles.button2} onPress={() => toggleDropdown(itemId)}>
                            <View style={styles.row}>
                                <Text style={styles.text2}>{t("support_related_questions")}</Text>
                                <Ionicons
                                    name={expandedId === itemId ? 'chevron-up-outline' : 'chevron-down-outline'}
                                    size={20}
                                    color="black"
                                    style={styles.icon}
                                />
                            </View>
                            {expandedId === itemId && (
                                <View style={styles.dropdown}>
                                    <Text style={styles.item}>
                                        {t("available_payment_methods")}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
                );
            case 'support':
                return (
                    <View>
                        {[1, 2, 3].map((itemId) => (
                            <TouchableOpacity key={itemId} style={styles.button2} onPress={() => toggleDropdown(itemId)}>
                                <View style={styles.row}>
                                    <Text style={styles.text2}>{t("support_related_questions")}</Text>
                                    <Ionicons
                                        name={expandedId === itemId ? 'chevron-up-outline' : 'chevron-down-outline'}
                                        size={20}
                                        color="black"
                                        style={styles.icon}
                                    />
                                </View>
                                {expandedId === itemId && (
                                    <View style={styles.dropdown}>
                                        <Text style={styles.item}>
                                            {t("manage_notifications")}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            case 'general':
            default:
                return (
                    <View>
                    {[1, 2, 3].map((itemId) => (
                        <TouchableOpacity key={itemId} style={styles.button2} onPress={() => toggleDropdown(itemId)}>
                            <View style={styles.row}>
                                <Text style={styles.text2}>{t("join_support_group")}</Text>
                                <Ionicons
                                    name={expandedId === itemId ? 'chevron-up-outline' : 'chevron-down-outline'}
                                    size={20}
                                    color="black"
                                    style={styles.icon}
                                />
                            </View>
                            {expandedId === itemId && (
                                <View style={styles.dropdown}>
                                    <Text style={styles.item}>
                                           {t("join_support_group")}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
                );
        }
    };

    return (
        <View style={styles.vb}>
            <ScrollView
                horizontal={true} // Cuộn ngang
                style={styles.scrollView} // Áp dụng style cho ScrollView
                showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
            >
                <TouchableOpacity
                    style={[styles.button,{   borderWidth: 1 }, activeTab === 'general' && styles.activeButton]}
                    onPress={() => setActiveTab('general')}
                >
                    <Text style={[styles.text, activeTab === 'general' && styles.activeText]}>{t("overview")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button,{   borderWidth: 1 }, activeTab === 'account' && styles.activeButton]}
                    onPress={() => setActiveTab('account')}
                >
                    <Text style={[styles.text, activeTab === 'account' && styles.activeText]}>{t("account")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button,{   borderWidth: 1 }, activeTab === 'payments' && styles.activeButton]}
                    onPress={() => setActiveTab('payments')}
                >
                    <Text style={[styles.text, activeTab === 'payments' && styles.activeText]}>{t("payment")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button,{   borderWidth: 1 }, activeTab === 'support' && styles.activeButton]}
                    onPress={() => setActiveTab('support')}
                >
                    <Text style={[styles.text, activeTab === 'support' && styles.activeText]}>{t("support")}</Text>
                </TouchableOpacity>
            </ScrollView>

            <ScrollView
                style={styles.verticalScroll} // Áp dụng style cho ScrollView
                showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
            >
                {renderContent()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F7F6F6",
        borderColor: "#000",
        borderRadius: 25,
        height: 50,
        marginTop: 20,
        paddingTop: 12,
        left: 0,
        padding: 10,
        marginLeft: 10,
    },
    button2: {
        width: '90%',
        backgroundColor: "#FBFBFB",
        borderColor: "#fff",
        borderRadius: 20,
        // paddingTop: 12,
        padding: 10,
        // alignItems: "center",
        marginLeft: 20,
        // marginRight: 20,
        marginTop: 20
    },
    text: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    text2: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
    },
    verticalScroll: {
        flex: 1,
        marginTop: -540
    },
    dropdown: {
       
        backgroundColor: '#FBFBFB',
        borderRadius: 5,
    },
    vb: {
        backgroundColor: '#fff'
    },
    item: {
        fontSize: 14,
        marginLeft: '-1%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        
    },
    icon: {
        marginLeft: 10,
        marginBottom: 10,
    },
    activeButton:{
        backgroundColor: '#182EF3', // Màu xanh biển cho button active
    },
    activeText: {
        color: '#FFFFFF', // Màu chữ trắng cho button active
    },
    
    
});