// API base URL
export const API_BASE_URL = 'https://humane-goshawk-randomly.ngrok-free.app';

// Function to get full API URL
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;