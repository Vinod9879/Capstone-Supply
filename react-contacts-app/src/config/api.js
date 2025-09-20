// API Configuration
const API_CONFIG = {
  // Development URLs
  development: {
    baseURL: 'https://localhost:7000/api',
    timeout: 10000
  },
  
  // Production URLs (update these with your actual production URLs)
  production: {
    baseURL: 'https://your-api-domain.com/api',
    timeout: 10000
  },
  
  // Local development (if running on different ports)
  local: {
    baseURL: 'http://localhost:5000/api',
    timeout: 10000
  }
};

// Get current environment
const getEnvironment = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
  
  // Check if we're running on a different port or domain
  if (window.location.hostname === 'localhost' && window.location.port === '3000') {
    return 'development';
  }
  
  return 'local';
};

// Export the appropriate configuration
export const API_BASE_URL = API_CONFIG[getEnvironment()].baseURL;
export const API_TIMEOUT = API_CONFIG[getEnvironment()].timeout;

export default API_CONFIG[getEnvironment()];
