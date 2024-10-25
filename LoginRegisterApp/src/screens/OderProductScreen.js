import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions, SafeAreaView, ScrollView, Modal, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../api';
import { useLanguage } from '../language/language';
import { translations } from '../language/translations';
// Giả định API để tìm kiếm sản phẩm
const searchProducts = async (keyword) => {
  try {
    console.log(`Searching for: "${keyword}"`);
    const response = await fetch(API_URLS.SEARCH_PRODUCT(keyword));

  

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
export const addNewProduct = async (productName) => {
  try {
    const response = await fetch(API_URLS.ADD_PRODUCT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nameProduct: productName })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Lỗi khi tạo sản phẩm mới');
    }

    const data = await response.json();
    console.log('Phản hồi từ API khi thêm sản phẩm mới:', data);
    
    if (!data.product || !data.product._id) {
      throw new Error('Không nhận được dữ liệu hợp lệ từ server');
    }

    return data.product;
  } catch (error) {
    console.error('Lỗi chi tiết khi thêm sản phẩm mới:', error);
    throw new Error(`Không thể tạo sản phẩm mới: ${error.message}`);
  }
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
    const response = await fetch(API_URLS.ADD_TO_CART, {
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
  const { language } = useLanguage();
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
    { title: translations[language].home, onPress: () => navigation.navigate("DropDownPicker") },
    { title: translations[language].cart, onPress: () => navigation.navigate("ListOder") },
    { title: translations[language].History, onPress: () => navigation.navigate("OrderListCode") },
    { title: translations[language].supportcustomer, onPress: () => navigation.navigate("FaqScreen") },
    { title: translations[language].notification, onPress: () => navigation.navigate("ThongBaoScreen") },
    { title: translations[language].logout, onPress: () => handleLogout() },
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

  const handleAddToCart = async () => {
    if (!productName || !quantity || !unit) {
    
      return;
    }

    try {
      let productToAdd;

      if (!selectedProductId) {
        console.log('Đang tạo sản phẩm mới...');
        const newProduct = await addNewProduct(productName);
        productToAdd = newProduct._id;
        console.log('Sản phẩm mới đã được tạo:', newProduct);
      } else {
        productToAdd = selectedProductId;
      }

      console.log('Đang thêm vào giỏ hàng...', { productToAdd, quantity, unit });
      await addToCart(productToAdd, quantity, unit);

      // Reset form
      setProductName('');
      setQuantity('');
      setUnit(null);
      setSelectedProductId(null);
      
      // alert(translations[language].Product_added_to_cart);
    } catch (error) {
      console.error('Lỗi chi tiết:', error);
      alert(translations[language].Error_adding_product);
    }
  };

  const limitedResults = searchResults.slice(0, 4);
  return (

    <SafeAreaView style={styles.container}>
     
      <View style={styles.header}>
        <Text style={styles.headerText}>{translations[language].add_to_cart_button}</Text>

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

      
    
          <Text style={styles.text1}>{translations[language].nameProduct}</Text>
        <TextInput
          placeholder={translations[language].product_input_placeholder}
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
      
          <Text style={styles.text1}>
            {translations[language].quantity}
          </Text>

       
        <View style={styles.quantityContainer}>
  <TextInput
    placeholder={translations[language].enter_quantity}
    style={styles.quantityInput}
    keyboardType="numeric"
    value={quantity}
    onChangeText={setQuantity}
  />
  <DropDownPicker
    open={open}
    value={unit}
    items={items}
    setOpen={setOpen}
    setValue={setUnit}
    setItems={setItems}
    placeholder={translations[language].unit}
    containerStyle={styles.unitPicker}
    style={styles.unitPickerStyle}
    dropDownContainerStyle={styles.dropDownContainerStyle}
  />
</View>

        <Text style={styles.textnx}>
          {translations[language].comment}
        </Text>
        <TextInput

          placeholder={""}
          style={styles.inputnx}
        />
        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>{translations[language].add_to_cart_button}</Text>
        </TouchableOpacity>
     
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
  menuButton: {
    padding: 8,
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
    marginHorizontal: width * 0.04,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.04,
    marginBottom: height * 0.02,
  },
  quantityInput: {
    flex: 1,
    color: "#1D1B20",
    fontSize: width * 0.035,
    height: 50,
    borderColor: "#79747E",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: width * 0.04,
    marginRight: width * 0.02,
  },
  unitPicker: {
    width: width * 0.3,
  },
  unitPickerStyle: {
    backgroundColor: '#fafafa',
    borderColor: "#79747E",
    height: 50,
  },
  dropDownContainerStyle: {
    borderColor: "#79747E",
  },
  text1: {
    color: "#000000",
    fontSize: width * 0.04,
    marginBottom: height * 0.015,
    marginLeft: width * 0.05,
    marginTop: height * 0.02,
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
  addToCartButton: {
    marginTop: height * 0.02,
    backgroundColor: '#66CCFF',
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    alignSelf: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});
