const BASE_URL = 'https://sts-rho.vercel.app';

const API_URLS = {
  BASE: BASE_URL,
  LOGIN: `${BASE_URL}/api/auth/login`,
  REGISTER: `${BASE_URL}/api/auth/register`,
  RESET_PASSWORD: `${BASE_URL}/api/auth/resetpass`,
  FORGOT_PASSWORD: `${BASE_URL}/api/auth/forgotpassword`,
  SEARCH_PRODUCT: (keyword) => `${BASE_URL}/api/product/search?keyword=${keyword}`,
  ADD_PRODUCT: `${BASE_URL}/api/product/addProduct`,
  ADD_TO_CART: `${BASE_URL}/api/cart/addToCart`,
  SHOW_INVOICE: (userId) => `${BASE_URL}/api/hoaDon/showInvoice/${userId}`,
  SHOW_INVOICE_DETAIL: (invoiceId) => `${BASE_URL}/api/hoaDon/showCTHoaDon/${invoiceId}`,
  VERIFY_OTP: `${BASE_URL}/api/auth/verify-otp`,
  SHOW_CART: `${BASE_URL}/api/cart/`,
  UPDATE_QUANTITY: (itemId) => `${BASE_URL}/api/cart/updateQuantity/${itemId}`,
  DELETE_CART_ITEM: (itemId) => `${BASE_URL}/api/cart/${itemId}`,
  CREATE_INVOICE: `${BASE_URL}/api/hoaDon/createInvoice`,
  // Thêm các endpoint khác ở đây khi cần
};

export default API_URLS;