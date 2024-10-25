import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URLS from '../api';

const NotificationItem = ({ item }) => {
  const getIcon = () => {
    switch (item.icon) {
      case 'restaurant-outline':
        return <Ionicons name="restaurant-outline" size={24} color="#007AFF" />;
      case 'local-shipping':
        return <MaterialIcons name="local-shipping" size={24} color="#FF9500" />;
      case 'ice-cream':
        return <FontAwesome5 name="ice-cream" size={24} color="#FF2D55" />;
      case 'gift-outline':
        return <Ionicons name="gift-outline" size={24} color="#4CD964" />;
      case 'fastfood':
        return <MaterialIcons name="fastfood" size={24} color="#FFCC00" />;
      case 'star-border':
        return <MaterialIcons name="star-border" size={24} color="#FF9500" />;
      case 'weekend':
        return <MaterialIcons name="weekend" size={24} color="#FF3B30" />;
      default:
        return <Ionicons name="notifications-outline" size={24} color="#007AFF" />;
    }
  };

  return (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );
};

const ThongBaoScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông báo</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
    textAlign: 'center',
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#C7C7CC',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThongBaoScreen;
