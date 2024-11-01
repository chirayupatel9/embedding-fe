import { useState, useCallback } from 'react';

const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNODAgOTNIMTIwTTEwMCA3M1YxMTMiIHN0cm9rZT0iIzlDQTNCOCIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=';

export const useImagePreloader = () => {
  const [loadedImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const [failedImages] = useState<Set<string>>(new Set());

  const preloadImage = useCallback(async (path: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      // If image was already loaded successfully, return it
      if (loadedImages.has(path)) {
        resolve(loadedImages.get(path)!);
        return;
      }

      // If image previously failed, use fallback immediately
      if (failedImages.has(path)) {
        const fallback = new Image();
        fallback.src = FALLBACK_IMAGE;
        resolve(fallback);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const timeoutId = setTimeout(() => {
        reject(new Error('Image load timeout'));
      }, 5000); // 5 second timeout

      img.onload = () => {
        clearTimeout(timeoutId);
        loadedImages.set(path, img);
        resolve(img);
      };
      
      img.onerror = () => {
        clearTimeout(timeoutId);
        failedImages.add(path);
        const fallback = new Image();
        fallback.src = FALLBACK_IMAGE;
        resolve(fallback);
      };

      img.src = path;
    });
  }, [loadedImages, failedImages]);

  const preloadImages = useCallback(async (paths: string[]) => {
    try {
      await Promise.all(paths.map(path => preloadImage(path)));
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }, [preloadImage]);

  const getLoadedImage = useCallback((path: string) => {
    if (failedImages.has(path)) {
      const fallback = new Image();
      fallback.src = FALLBACK_IMAGE;
      return fallback;
    }
    return loadedImages.get(path);
  }, [loadedImages, failedImages]);

  return { preloadImages, getLoadedImage };
};