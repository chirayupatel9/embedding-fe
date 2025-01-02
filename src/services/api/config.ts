// API configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api',
  ENDPOINTS: {
    EMBEDDINGS: '/embeddings',
  },
  TIMEOUT: 10000, // 10 seconds
};

export const IS_DEVELOPMENT = import.meta.env.DEV;