import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Point, Metadata } from '../types/embedding';

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
  const baseTextureRef = useRef<PIXI.BaseTexture | null>(null);
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const cleanupRef = useRef<(() => void) | null>(null);

  // Initialize PIXI Application
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
    // console.log("view",viewportBounds)
    canvasRef.current.appendChild(app.view as unknown as Node);
    appRef.current = app;

    const viewport = new PIXI.Container();
    app.stage.addChild(viewport);
    viewportRef.current = viewport;

    // Load sprite sheet
    if (metadata.sprite_sheet.url) {
      baseTextureRef.current = new PIXI.BaseTexture(metadata.sprite_sheet.url, {
        scaleMode: PIXI.SCALE_MODES.LINEAR,
      });
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      spritesRef.current.forEach(sprite => sprite.destroy());
      spritesRef.current.clear();
      if (baseTextureRef.current) {
        baseTextureRef.current.destroy();
        baseTextureRef.current = null;
      }
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
      if (canvasRef.current?.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
    };
  }, [viewportBounds.width, viewportBounds.height, metadata.sprite_sheet.url]);

  // Render sprites
  useEffect(() => {
    const app = appRef.current;
    const viewport = viewportRef.current;
    const baseTexture = baseTextureRef.current;
    
    if (!app || !viewport || !baseTexture || !baseTexture.valid) return;

    viewport.removeChildren();
    spritesRef.current.clear();

    const container = new PIXI.Container();
    viewport.addChild(container);

    const { sprite_width, sprite_height } = metadata.sprite_sheet;
    const SPRITE_SIZE = 32; // Display size of sprites
    // console.log("points",viewport);
    
    points.forEach((point) => {
      const texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(
          point.spriteX * sprite_width,
          point.spriteY * sprite_height,
          sprite_width,
          sprite_height
        )
      );

      const sprite = new PIXI.Sprite(texture);
      sprite.width = SPRITE_SIZE;
      sprite.height = SPRITE_SIZE;
      sprite.x = point.x;
      sprite.y = point.y;
      sprite.anchor.set(0.5);
      sprite.alpha = selectedPoints.includes(point) ? 1 : 0.7;
      sprite.scale.set(selectedPoints.includes(point) ? 1.2 : 1);
        // console.log("sprites",sprite);
        
      container.addChild(sprite);
      spritesRef.current.set(point.id, sprite);
    });
  }, [points, selectedPoints, metadata.sprite_sheet]);

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

  return <div ref={canvasRef} className="w-full h-full" />;
};