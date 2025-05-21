// API configuration
const apiUrl = import.meta.env.VITE_API_URL;
export const API_CONFIG = {
  BASE_URL: `${apiUrl}/api`,
  ENDPOINTS: {
    EMBEDDINGS: '/make_reduction/{type}',
    MAKE_SUBSET: '/make_reduction_subset/{type}',
    GET_IMAGE: '/image-with-metadata',
  },
  TIMEOUT: 10000, // 30 seconds
  PROJECTION_TYPE: 'umap', // Default projection type
};
