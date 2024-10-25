import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URLS from '../api';

const NotificationItem = ({ item, onPress }) => {
  const getIcon = () => {
    switch (item.icon) {
      case 'cloud':
        return <Feather name="cloud" size={24} color="#87CEEB" />;
      case 'map-pin':
        return <Feather name="map-pin" size={24} color="#FF9500" />;
      case 'bell':
        return <Feather name="bell" size={24} color="#FF2D55" />;
      case 'check-circle':
        return <Feather name="check-circle" size={24} color="#4CD964" />;
      case 'package':
        return <Feather name="package" size={24} color="#8B4513" />;
      case 'star':
        return <Feather name="star" size={24} color="#FFD700" />;
      case 'percent':
        return <Feather name="percent" size={24} color="#FF3B30" />;
      case 'truck':
        return <Feather name="truck" size={24} color="#1E90FF" />;
      default:
        return <Feather name="info" size={24} color="#007AFF" />;
    }
  };

  return (
    <TouchableOpacity style={styles.notificationItem} onPress={() => onPress(item)}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );
};

const ThongBaoScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.get(`${API_URLS.BASE}/api/notifications/${userId}`);
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  const handleNotificationPress = async (notification) => {
    if (notification.invoiceId) {
      try {
        const response = await axios.get(`${API_URLS.BASE}/api/hoaDon/showCTHoaDon/${notification.invoiceId}`);
        setSelectedOrder(response.data);
        setModalVisible(true);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>thông báo</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} onPress={handleNotificationPress} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chi tiết đơn hàng</Text>
            {selectedOrder && (
              <>
                <Text>Mã đơn hàng: {selectedOrder._id}</Text>
                <Text>Ngày đặt: {new Date(selectedOrder.createdAt).toLocaleString()}</Text>
                <Text>Tình trạng: {selectedOrder.tinhTrang}</Text>
                <Text>Sản phẩm:</Text>
                {selectedOrder.cartItems.map((item, index) => (
                  <Text key={index}>{item.nameProduct}: {item.quantity} {item.unit}</Text>
                ))}
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ThongBaoScreen;
