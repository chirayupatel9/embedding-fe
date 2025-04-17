import { API_CONFIG } from './api/config';


export async function getImageDetails(image_id: string) {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_IMAGE}/${image_id}`);
  if (!response.ok) throw new Error('Failed to fetch image');
  const blob = await response.blob();
  const image_url = URL.createObjectURL(blob);
  return { image_id, image_url, document_details: null };
}