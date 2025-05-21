import { API_CONFIG } from './api/config';
import { ImageDetails } from '../types/embedding';

export async function getImageDetails(image_id: string): Promise<ImageDetails> {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_IMAGE}/${image_id}`);
  // console.log(response);
  if (!response.ok) throw new Error('Failed to fetch image');

  // For backward compatibility with older implementation
  if (response.headers.get('content-type')?.includes('image/')) {
    const blob = await response.blob();
    const image_url = URL.createObjectURL(blob);
    
    // Convert blob to base64
    const reader = new FileReader();
    const imageDataPromise = new Promise<string>((resolve) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    
    const image_data_url = await imageDataPromise;
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
    const image_data = image_data_url.split(',')[1];
    
    return { 
      image_id, 
      filename: `image_${image_id}.jpg`, 
      image_data, 
      content_type: response.headers.get('content-type') || 'image/jpeg',
      has_metadata: false,
      document_details: null 
    };
  }
  
  // For the new API format that directly returns JSON with base64 image
  const data = await response.json();
  return data as ImageDetails;
}