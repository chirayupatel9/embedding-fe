import { useState, useCallback } from 'react';

export const useImagePreloader = () => {
  const [loadedImages] = useState<Map<string, HTMLImageElement>>(new Map());

  const preloadImages = useCallback(async (paths: string[]) => {
    const loadImage = (path: string) => {
      return new Promise<void>((resolve, reject) => {
        if (loadedImages.has(path)) {
          resolve();
          return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          loadedImages.set(path, img);
          resolve();
        };
        
        img.onerror = () => {
          reject(new Error(`Failed to load image: ${path}`));
        };

        img.src = path;
      });
    };

    try {
      await Promise.all(paths.map(loadImage));
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }, [loadedImages]);

  const getLoadedImage = useCallback((path: string) => {
    return loadedImages.get(path);
  }, [loadedImages]);

  return { preloadImages, getLoadedImage };
};