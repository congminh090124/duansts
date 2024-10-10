import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions, SafeAreaView, ScrollView, Modal, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import { getApiUrl } from '../screens/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Giả định API để tìm kiếm sản phẩm
const searchProducts = async (keyword) => {
  try {
    console.log(`Searching for: "${keyword}"`);
    const response = await fetch(getApiUrl(`/api/product/search?keyword=${keyword}`));

  

    const responseText = await response.text();
    console.log('Response text:', responseText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      const data = JSON.parse(responseText);
      console.log('Parsed JSON data:', data);
      return data.results;
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      console.error('Raw response:', responseText);
      throw new Error('Server response is not valid JSON');
    }
  } catch (error) {
    console.error('Error in searchProducts:', error);
    throw error;
  }
};

// Giả định API để thêm sản phẩm mới
const addNewProduct = async (nameProduct) => {
  // Thay thế URL này bằng URL thực của API của bạn
  const response = await fetch(getApiUrl('/api/product/addProduct'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nameProduct: nameProduct }),
  });
  const data = await response.json();
  return data;
};
// Giả định API để thêm sản phẩm vào giỏ hàng
const addToCart = async (productId, quantity, unit) => {

   // Lấy userId từ AsyncStorage
   const userId = await AsyncStorage.getItem('userId');
   if (!userId) {
       Alert.alert('Error', 'User not found');
       return;
   }
  try {
    const response = await fetch(getApiUrl('/api/cart/addToCart'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        quantity,
        unit,
        userId
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Added to cart:', data);
      alert('Sản phẩm đã được thêm vào giỏ hàng');
    } else {
      console.error('Error adding to cart:', data);
      alert('Lỗi khi thêm sản phẩm vào giỏ hàng');
    }
  } catch (error) {
    console.error('Error in addToCart:', error);
    alert('Lỗi kết nối đến server');
  }
};

export default function OderProductScreen() {
// navigation
  const navigation = useNavigation();
  // menu
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);
 
  const handleLogout = () => {
    Alert.alert(
      "Xác nhận đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        { 
          text: "Đăng xuất", 
          onPress: async () => {
            try {
              // Clear the user's session data
              await AsyncStorage.removeItem('userId');
              // You might want to clear other user-related data as well

              // Navigate to the login screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Lỗi đăng xuất', 'Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.');
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  
  const menuOptions = [
    { title: 'Trang chủ', onPress: () =>navigation.navigate("DropDownPicker") },
    { title: 'Giỏ hàng', onPress: () => navigation.navigate("ListOder") },
    { title: 'Lịch sử mua hàng', onPress: () => navigation.navigate("OrderListCode") },
    { title: 'Đăng xuất', onPress: () =>  handleLogout()},
  ];
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState(''); // Trạng thái để lưu số lượng
  const [unit, setUnit] = useState(null); // Trạng thái để lưu đơn vị tính (kg hoặc con)
  const [open, setOpen] = useState(false); // Trạng thái mở/đóng của dropdown
  const [items, setItems] = useState([
    { label: 'Kg', value: 'kg' },
    { label: 'Con', value: 'con' },
  ]);
  const [productName, setProductName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (productName.length > 0) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch(productName);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [productName]);

  const handleSearch = async (keyword) => {
    try {
      const results = await searchProducts(keyword);
      console.log('Search results:', results); // Log results để kiểm tra
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleSelectProduct = (product) => {
    setProductName(product.nameProduct);
    setSelectedProductId(product._id);
    setShowResults(false);
  };

  const handleAddNewProduct = async () => {
    try {
      const newProduct = await addNewProduct(productName);
      console.log('New product added:', newProduct);
      setProductName(''); // Clear input after adding
      setSearchResults([]); // Clear search results
    } catch (error) {
      console.error('Error adding new product:', error);
    }
  };
  const handleAddToCart = async () => {
    if (!selectedProductId || !quantity || !unit) {
      alert('Vui lòng chọn sản phẩm và nhập đủ thông tin');
      return;
    }

    try {
      await addToCart(selectedProductId, quantity, unit);
      setProductName('');
      setQuantity('');
      setUnit(null);
      setSelectedProductId(null);  // Xóa ID sau khi thêm vào giỏ hàng
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };


  const limitedResults = searchResults.slice(0, 4);
  return (

    <SafeAreaView style={styles.container}>
     
      <View style={styles.header}>
        <Text style={styles.headerText}>Tên đơn hàng</Text>

        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
      </View>

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

      
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>＊Tên sản phẩm</Text>
        </View>
        <TextInput
          placeholder="Đầu vào chính của sản phẩm"
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />
        {showResults && searchResults.length > 0 && (
          <FlatList
            data={limitedResults}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => handleSelectProduct(item)}
              >
                <Text style={styles.itemText}>{item.nameProduct}</Text>
              </TouchableOpacity>
            )}
            style={styles.resultsList}
            ListFooterComponent={() => (
              searchResults.length > 4 ? (
                <View style={styles.footerContainer}>
                  <Text style={styles.footerText}>Xem thêm...</Text>
                </View>
              ) : null
            )}
          />
        )}
        <View style={styles.text2}>
          <Text style={styles.text1}>
            {"＊Số lượng"}
          </Text>

        </View>
        <View style={styles.text2}>
          <TextInput
            placeholder={"Đầu vào số"}
            style={styles.input2}
            keyboardType="numeric"
            value={quantity}  // Liên kết với trạng thái số lượng
            onChangeText={setQuantity}  // Cập nhật trạng thái khi người dùng nhập số lượng
          />
          <DropDownPicker
            open={open}
            value={unit}
            items={items}
            setOpen={setOpen}
            setValue={setUnit}
            setItems={setItems}
            placeholder="Đơn vị"
           
            containerStyle={styles.donVi}
          />
        </View>
        <Text style={styles.textnx}>
          {"*Nhận xét"}
        </Text>
        <TextInput

          placeholder={""}
          style={styles.inputnx}
        />
        {productName.length > 0 && searchResults.length === 0 && (
          <TouchableOpacity onPress={handleAddNewProduct} style={styles.addNewButton}>
            <Text style={styles.addNewButtonText}>Thêm sản phẩm mới</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
     
    </SafeAreaView>
  );



}


const styles = StyleSheet.create({

  donVi:{
 
    left: 20,
    width:190,
    marginLeft:-5
   
  },
  dropdown:{ padding:3,},
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

  title: {
    color: "#000000",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  fieldContainer: {
    marginBottom: height * 0.02,
  },
  label: {
    color: "#000000",
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  input: {
    color: "#1D1B20",
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
    borderColor: "#79747E",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.035,
  },
  resultsList: {
    marginTop: height * 0.02,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  addNewButton: {
    marginTop: height * 0.02,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addToCartButton:{
    alignItems: "center",
    backgroundColor: "#182EF3",
    borderRadius: 20,
    marginLeft:width*0.21,
    width: width * 0.5, // 50% of screen width
    paddingVertical: 15,
    marginBottom: 24,
  },
  addNewButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
 
  text1: {
    color: "#000000",
    fontSize: width * 0.04,  // Giảm cỡ chữ
    marginBottom: height * 0.015,
    marginLeft: width * 0.07,
    marginTop: height * 0.02,
  },
  text2: {
    color: "#000000",
    fontSize: width * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  input: {
    color: "#1D1B20",
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.04,
    borderColor: "#79747E",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.035,
  },
  input2: {
    color: "#1D1B20",
    fontSize: width * 0.035,
    marginLeft: width * 0.04,
    width: 160,
    height: 50,
    borderColor: "#79747E",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    marginLeft: 20
  },
 
  textnx: {
    color: "#000000",
    fontSize: width * 0.045,
    marginBottom: height * 0.008,
    marginLeft: width * 0.06,
    marginTop: height * 0.15,
  },
  inputnx: {
    color: "#1D1B20",
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.04,
    borderColor: "#79747E",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.035,
  },

});