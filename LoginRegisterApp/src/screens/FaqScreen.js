import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FaqScreen = () => {
  const [activeTab, setActiveTab] = useState('left');
  const [activeSubTab, setActiveSubTab] = useState('Tổng quan'); // Manage sub tabs for LeftScreen

  const LeftScreen = () => (
    <ScrollView style={styles.container}>
      {/* Sub Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScrollView}>
        {['Tổng quan', 'Tài khoản', 'Sự chi trả', 'Dịch vụ'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeSubTab === tab && styles.activeTab]}
            onPress={() => setActiveSubTab(tab)} // Set the active sub-tab
          >
            <Text style={[styles.tabText, activeSubTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sub Tab Content */}
      {activeSubTab === 'Tổng quan' && (
        <View>
          <Text style={styles.sectionTitle}>Tổng quan</Text>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>Tôi quản lý thông báo của mình như thế nào?</Text>
            <Text style={styles.answer}>Để quản lý thông báo, hãy vào "Cài đặt", chọn "Thông báo" và tùy chỉnh theo ý muốn của bạn.</Text>
          </View>
        </View>
      )}

      {activeSubTab === 'Tài khoản' && (
        <View>
          <Text style={styles.sectionTitle}>Tài khoản</Text>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>Làm thế nào để tôi quản lý tài khoản của mình?</Text>
          </View>
        </View>
      )}

      {activeSubTab === 'Sự chi trả' && (
        <View>
          <Text style={styles.sectionTitle}>Sự chi trả</Text>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>Làm sao để tôi kiểm tra hóa đơn thanh toán?</Text>
          </View>
        </View>
      )}

      {activeSubTab === 'Dịch vụ' && (
        <View>
          <Text style={styles.sectionTitle}>Dịch vụ</Text>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>Các dịch vụ nào có sẵn?</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );

  const RightScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Hỗ trợ dịch vụ khách hàng</Text>
      <TouchableOpacity style={styles.supportOption}>
        <Ionicons name="headset-outline" size={24} color="black" />
        <Text style={styles.supportOptionText}>Dịch vụ khách hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportOption}>
        <Ionicons name="logo-whatsapp" size={24} color="black" />
        <Text style={styles.supportOptionText}>WhatsApp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportOption}>
        <Ionicons name="globe-outline" size={24} color="black" />
        <Text style={styles.supportOptionText}>Trang web</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportOption}>
        <Ionicons name="logo-facebook" size={24} color="black" />
        <Text style={styles.supportOptionText}>Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportOption}>
        <Ionicons name="logo-twitter" size={24} color="black" />
        <Text style={styles.supportOptionText}>Twitter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportOption}>
        <Ionicons name="logo-instagram" size={24} color="black" />
        <Text style={styles.supportOptionText}>Instagram</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hỗ trợ khách hàng</Text>
      </View>

      {/* Top Nav */}
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={() => setActiveTab('left')} style={[styles.navItem, activeTab === 'left' && styles.activeNav]}>
          <Text style={styles.navText}>Câu hỏi thường gặp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('right')} style={[styles.navItem, activeTab === 'right' && styles.activeNav]}>
          <Text style={styles.navText}>Hỗ trợ dịch vụ</Text>
        </TouchableOpacity>
      </View>

      {/* Screen Content */}
      {activeTab === 'left' ? <LeftScreen /> : <RightScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  navItem: {
    paddingVertical: 15,
  },
  activeNav: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  navText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  questionContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  question: {
    fontSize: 16,
  },
  answer: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  supportOptionText: {
    fontSize: 16,
    marginLeft: 15,
  },
  tabScrollView: {
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: 'black',
    fontSize: 14,
  },
  activeTabText: {
    color: 'white',
  },
});

export default FaqScreen;
