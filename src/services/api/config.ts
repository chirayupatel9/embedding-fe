// API configuration
const apiUrl = import.meta.env.VITE_API_URL;
export const API_CONFIG = {
  BASE_URL: `${apiUrl}/api`,
  ENDPOINTS: {
    EMBEDDINGS: '/embeddings',
    GET_IMAGE: '/image-with-metadata',
  },
  TIMEOUT: 10000, // 30 seconds
};