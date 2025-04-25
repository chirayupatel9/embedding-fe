import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Point, Metadata, ImageDetails } from '../types/embedding';
import { getImageDetails } from '../services/images';
import { SidebarImageDetails } from './SidebarImageDetails';

interface PixiRendererProps {
  points: Point[];
  selectedPoints: Point[];
  viewportBounds: { width: number; height: number };
  isLassoMode: boolean;
  isPanMode: boolean;
  zoomLevel: number;
  viewportRef: React.MutableRefObject<PIXI.Container | undefined>;
  metadata: Metadata;
}

export const PixiRenderer: React.FC<PixiRendererProps> = ({
  points,
  selectedPoints,
  viewportBounds,
  isLassoMode,
  isPanMode,
  zoomLevel,
  viewportRef,
  metadata,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const spritesRef = useRef<Map<number, PIXI.Sprite>>(new Map());
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const cleanupRef = useRef<(() => void) | null>(null);
  const [selectedImageDetails, setSelectedImageDetails] = useState<ImageDetails | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [spriteSheetTexture, setSpriteSheetTexture] = useState<PIXI.Texture | null>(null);

  // Initialize PIXI Application and viewport
  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new PIXI.Application({
      width: viewportBounds.width,
      height: viewportBounds.height,
      backgroundColor: 0xffffff,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: false,
    });

    canvasRef.current.appendChild(app.view as unknown as Node);
    appRef.current = app;

    // Create viewport container
    const viewport = new PIXI.Container();
    viewportRef.current = viewport;
    app.stage.addChild(viewport);

    // Cleanup on unmount
    return () => {
      app.destroy(true, { children: true });
      spritesRef.current.clear();
    };
  }, [viewportBounds, viewportRef]);

  // Sprite creation: only when points or metadata change
  useEffect(() => {
    if (!metadata?.sprite_sheet?.url || !viewportRef.current) return;
    const spriteSheetUrl = metadata.sprite_sheet.url;
    const spriteWidth = metadata.sprite_sheet.sprite_width || 32;
    const spriteHeight = metadata.sprite_sheet.sprite_height || 32;

    PIXI.Assets.load(spriteSheetUrl).then((texture) => {
      // Store the sprite sheet texture for sidebar use
      setSpriteSheetTexture(texture);
      
      // Remove old sprites from viewport
      spritesRef.current.forEach(sprite => {
        viewportRef.current?.removeChild(sprite);
        sprite.destroy();
      });
      spritesRef.current.clear();

      // Create new sprites for each point
      points.forEach((point) => {
        const sprite = new PIXI.Sprite(
          new PIXI.Texture(
            texture,
            new PIXI.Rectangle(
              point.spriteX * spriteWidth,
              point.spriteY * spriteHeight,
              spriteWidth,
              spriteHeight
            )
          )
        );
        sprite.anchor.set(0.5);
        sprite.scale.set(0.5);
        sprite.position.set(point.x, point.y);
        sprite.eventMode = 'static';
        sprite.cursor = 'pointer';
        sprite.on('pointerdown', () => handleSpriteClick(point));
        spritesRef.current.set(point.id, sprite);
        viewportRef.current?.addChild(sprite);
      });
    });
  }, [points, metadata, viewportRef]);

  // Update sprite positions for existing sprites
  useEffect(() => {
    if (!viewportRef.current) return;
    points.forEach((point) => {
      const sprite = spritesRef.current.get(point.id);
      if (sprite) {
        sprite.position.set(point.x, point.y);
      }
    });
  }, [points]);

  // Update sprite visibility for selected points
  useEffect(() => {
    if (!viewportRef.current) return;
    spritesRef.current.forEach((sprite, id) => {
      const isSelected = selectedPoints.some((point) => point.id === id);
      sprite.alpha = isSelected ? 1 : 0.5;
    });
  }, [selectedPoints]);

  const handleSpriteClick = async (point: Point) => {
    try {
      setSelectedPoint(point); // Store the selected point
      const details = await getImageDetails(point.originalItem.image_id);
      console.log('details:', details);
      setSelectedImageDetails(details);
    } catch (error) {
      console.error('Error fetching image details:', error);
    }
  };

  // Handle pan mode
  useEffect(() => {
    const app = appRef.current;
    if (!app) return;

    app.stage.eventMode = 'static';
    app.stage.cursor = isPanMode ? 'grab' : 'default';

    const handlePan = (event: PIXI.FederatedPointerEvent) => {
      if (!isPanMode || isLassoMode) return;
      if (event.type === 'pointerdown') {
        isDraggingRef.current = true;
        lastPositionRef.current = { x: event.globalX, y: event.globalY };
        if (app.stage) {
          app.stage.cursor = 'grabbing';
        }
      } else if (event.type === 'pointermove' && isDraggingRef.current) {
        const dx = event.globalX - lastPositionRef.current.x;
        const dy = event.globalY - lastPositionRef.current.y;
        if (viewportRef.current) {
          viewportRef.current.x += dx;
          viewportRef.current.y += dy;
        }
        lastPositionRef.current = { x: event.globalX, y: event.globalY };
      } else if (event.type === 'pointerup' || event.type === 'pointerupoutside') {
        isDraggingRef.current = false;
        if (app.stage) {
          app.stage.cursor = isPanMode ? 'grab' : 'default';
        }
      }
    };

    const stage = app.stage;
    if (stage) {
      stage
        .on('pointerdown', handlePan)
        .on('pointermove', handlePan)
        .on('pointerup', handlePan)
        .on('pointerupoutside', handlePan);

      cleanupRef.current = () => {
        stage
          .off('pointerdown', handlePan)
          .off('pointermove', handlePan)
          .off('pointerup', handlePan)
          .off('pointerupoutside', handlePan);
      };
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isPanMode, isLassoMode]);

  // Handle zoom
  useEffect(() => {
    if (viewportRef.current && !isDraggingRef.current) {
      viewportRef.current.scale.set(zoomLevel);
    }
  }, [zoomLevel]);

  return (
    <>
      <div ref={canvasRef} className="w-full h-full" />
      {selectedImageDetails && (
        <SidebarImageDetails
          details={selectedImageDetails}
          onClose={() => {
            setSelectedImageDetails(null);
            setSelectedPoint(null);
          }}
          spriteTexture={spriteSheetTexture || undefined}
          spriteX={selectedPoint?.spriteX}
          spriteY={selectedPoint?.spriteY}
          spriteWidth={metadata?.sprite_sheet?.sprite_width}
          spriteHeight={metadata?.sprite_sheet?.sprite_height}
        />
      )}
    </>
  );
};