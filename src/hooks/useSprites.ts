import { useRef, useCallback } from 'react';
import * as PIXI from 'pixi.js';
import { Point, Metadata } from '../types/embedding';

const SPRITE_SIZE = 32; // Smaller sprite size for better performance
const BATCH_SIZE = 3000; // Increased batch size

export const useSprites = (
  points: Point[],
  selectedPoints: Point[],
  metadata: Metadata,
  renderedPointsRef: React.MutableRefObject<Set<number>>
) => {
  const spritesRef = useRef<Map<number, PIXI.Sprite>>(new Map());
  const textureCache = useRef<Map<string, PIXI.Texture>>(new Map());
  const containerRef = useRef<PIXI.ParticleContainer | null>(null);

  const getTexture = useCallback((spriteX: number, spriteY: number, baseTexture: PIXI.BaseTexture) => {
    const key = `${spriteX}-${spriteY}`;
    if (textureCache.current.has(key)) {
      return textureCache.current.get(key)!;
    }

    const { sprite_width, sprite_height } = metadata.sprite_sheet;
    const texture = new PIXI.Texture(
      baseTexture,
      new PIXI.Rectangle(
        spriteX * sprite_width,
        spriteY * sprite_height,
        sprite_width,
        sprite_height
      )
    );

    textureCache.current.set(key, texture);
    return texture;
  }, [metadata.sprite_sheet]);

  const cleanupResources = useCallback(() => {
    spritesRef.current.forEach(sprite => sprite.destroy());
    spritesRef.current.clear();
    textureCache.current.forEach(texture => texture.destroy());
    textureCache.current.clear();
    if (containerRef.current) {
      containerRef.current.destroy({ children: true });
      containerRef.current = null;
    }
    renderedPointsRef.current.clear();
  }, []);

  const renderSprites = useCallback((app: PIXI.Application, viewport: PIXI.Container | undefined) => {
    if (!viewport || !metadata.sprite_sheet) return;

    cleanupResources();

    const baseTexture = PIXI.BaseTexture.from(metadata.sprite_sheet.url || 'https://placehold.co/1000x1000/png', {
      scaleMode: PIXI.SCALE_MODES.LINEAR,
      resolution: window.devicePixelRatio || 1,
    });

    if (!baseTexture.valid) {
      baseTexture.once('loaded', () => renderSprites(app, viewport));
      return;
    }

    containerRef.current = new PIXI.ParticleContainer(points.length, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true,
    }, BATCH_SIZE);

    let currentBatch = 0;

    const renderBatch = () => {
      const start = currentBatch * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, points.length);

      for (let i = start; i < end; i++) {
        const point = points[i];
        if (renderedPointsRef.current.has(point.id)) continue;

        const texture = getTexture(point.spriteX, point.spriteY, baseTexture);
        const sprite = new PIXI.Sprite(texture);

        sprite.width = SPRITE_SIZE;
        sprite.height = SPRITE_SIZE;
        sprite.x = point.x;
        sprite.y = point.y;
        sprite.anchor.set(0.5);
        sprite.alpha = selectedPoints.includes(point) ? 1 : 0.7;
        sprite.scale.set(selectedPoints.includes(point) ? 1.2 : 1);

        containerRef.current?.addChild(sprite);
        spritesRef.current.set(point.id, sprite);
        renderedPointsRef.current.add(point.id);
      }

      currentBatch++;
      if (currentBatch * BATCH_SIZE < points.length) {
        requestAnimationFrame(renderBatch);
      }
    };

    renderBatch();
    viewport.addChild(containerRef.current);
  }, [points, selectedPoints, metadata.sprite_sheet, getTexture, cleanupResources]);

  return { renderSprites };
};