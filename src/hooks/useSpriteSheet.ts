import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { ApiResponse, Metadata, SpriteSheetMeta } from '../types/embedding';
import { mockApiResponse, mockMetadata } from '../utils/mockData';

const API_ENDPOINT = 'http://localhost:8000/api/embeddings';
const IS_DEVELOPMENT = import.meta.env.DEV;

export const useSpriteSheet = () => {
  const baseTextureRef = useRef<PIXI.BaseTexture | null>(null);
  const texturesRef = useRef<Map<string, PIXI.Texture>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const spriteMetaRef = useRef<SpriteSheetMeta | null>(null);

  useEffect(() => {
    const loadSpriteSheet = async () => {
      try {
        let spritePath: string;
        let metadata: Metadata;
        
       
          const response = await fetch(API_ENDPOINT);
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }

          const apiResponse: ApiResponse = await response.json();
          spritePath = apiResponse.spritePath;
          const metadataResponse = await fetch(apiResponse.itemsPath);
          if (!metadataResponse.ok) {
            throw new Error(`Metadata request failed with status ${metadataResponse.status}`);
          }

        metadata = await metadataResponse.json();
        
        spriteMetaRef.current = metadata.sprite_sheet;

        // Create and load the base texture
        const baseTexture = new PIXI.BaseTexture(spritePath, {
          scaleMode: PIXI.SCALE_MODES.LINEAR,
          width: metadata.sprite_sheet.width,
          height: metadata.sprite_sheet.height
        });

        // Handle loading events
        baseTexture.on('error', (event) => {
          console.error('Texture loading error:', event);
          setError('Failed to load sprite sheet');
          setIsLoaded(true);
        });
        

        baseTexture.on('loaded', () => {
          baseTextureRef.current = baseTexture;
          setIsLoaded(true);
          setError(null);
        });

        // Force load if the image is already cached
        if (baseTexture.valid) {
          baseTextureRef.current = baseTexture;
          setIsLoaded(true);
          setError(null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Failed to load sprite sheet:', errorMessage);
        setError(`Failed to load sprite sheet: ${errorMessage}`);
        setIsLoaded(false);
      }
    };

    loadSpriteSheet();

    return () => {
      if (baseTextureRef.current) {
        baseTextureRef.current.destroy();
        baseTextureRef.current = null;
      }
      texturesRef.current.clear();
      setIsLoaded(false);
      setError(null);
    };
  }, []);

  const getTexture = (spriteX: number, spriteY: number): PIXI.Texture | undefined => {
    if (!spriteMetaRef.current || !baseTextureRef.current || !isLoaded) return undefined;

    const key = `${spriteX}-${spriteY}`;
    if (texturesRef.current.has(key)) {
      return texturesRef.current.get(key);
    }

    try {
      const { sprite_width, sprite_height } = spriteMetaRef.current;
      const texture = new PIXI.Texture(
        baseTextureRef.current,
        new PIXI.Rectangle(
          spriteX * sprite_width,
          spriteY * sprite_height,
          sprite_width,
          sprite_height
        )
      );

      texturesRef.current.set(key, texture);
      return texture;
    } catch (err) {
      console.error('Error creating texture:', err);
      return undefined;
    }
  };

  return { getTexture, isLoaded, error };
};