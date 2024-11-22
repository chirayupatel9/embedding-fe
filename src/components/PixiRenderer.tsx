import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Point } from '../types/embedding';
import { useSpriteSheet } from '../hooks/useSpriteSheet';

interface PixiRendererProps {
  points: Point[];
  selectedPoints: Point[];
  setSelectedPoints: (points: Point[]) => void;
  viewportBounds: { width: number; height: number };
  isLassoMode: boolean;
  isPanMode: boolean;
  zoomLevel: number;
  viewportRef: React.MutableRefObject<PIXI.Container | undefined>;
  renderedPointsRef: React.MutableRefObject<Set<number>>;
}

export const PixiRenderer: React.FC<PixiRendererProps> = ({
  points,
  selectedPoints,
  setSelectedPoints,
  viewportBounds,
  isLassoMode,
  isPanMode,
  zoomLevel,
  viewportRef,
  renderedPointsRef,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application>();
  const spritesRef = useRef<Map<number, PIXI.Sprite>>(new Map());
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const { getTexture, isLoaded } = useSpriteSheet();

  // Initialize PIXI application
  useEffect(() => {
    if (!canvasRef.current) return;

    PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(PIXI.settings.SPRITE_MAX_TEXTURES, 16);
    PIXI.settings.RENDER_OPTIONS.antialias = true;
    PIXI.settings.ROUND_PIXELS = true;
    
    const app = new PIXI.Application({
      width: viewportBounds.width,
      height: viewportBounds.height,
      backgroundColor: 0xffffff,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      powerPreference: 'high-performance',
    });

    canvasRef.current.appendChild(app.view as unknown as Node);
    appRef.current = app;

    const viewport = new PIXI.Container();
    app.stage.addChild(viewport);
    viewportRef.current = viewport;

    return () => {
      app.destroy(true);
      if (canvasRef.current?.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
    };
  }, [viewportBounds.width, viewportBounds.height]);

  // Render points with batching
  useEffect(() => {
    const app = appRef.current;
    const viewport = viewportRef.current;
    if (!app || !viewport || !isLoaded) return;

    spritesRef.current.forEach(sprite => sprite.destroy());
    spritesRef.current.clear();
    renderedPointsRef.current.clear();
    viewport.removeChildren();

    // Create a container for better performance
    const container = new PIXI.ParticleContainer(points.length, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true,
    });
    container.sortableChildren = true;

    // Create sprites in batches
    const batchSize = 1000;
    const totalBatches = Math.ceil(points.length / batchSize);

    const processBatch = (batchIndex: number) => {
      const start = batchIndex * batchSize;
      const end = Math.min(start + batchSize, points.length);
      
      for (let i = start; i < end; i++) {
        const point = points[i];
        const texture = getTexture(point.spriteX, point.spriteY);
        if (!texture) continue;

        const sprite = new PIXI.Sprite(texture);
        sprite.width = 30;
        sprite.height = 30;
        sprite.x = point.x;
        sprite.y = point.y;
        sprite.anchor.set(0.5);
        sprite.alpha = selectedPoints.includes(point) ? 1 : 0.7;
        sprite.scale.set(selectedPoints.includes(point) ? 1.2 : 1);

        container.addChild(sprite);
        spritesRef.current.set(point.id, sprite);
        renderedPointsRef.current.add(point.id);
      }

      if (batchIndex + 1 < totalBatches) {
        requestAnimationFrame(() => processBatch(batchIndex + 1));
      }
    };

    processBatch(0);
    viewport.addChild(container);

    // Handle interactions
    const hitArea = new PIXI.Rectangle(0, 0, viewportBounds.width, viewportBounds.height);
    app.stage.eventMode = 'static';
    app.stage.hitArea = hitArea;
    app.stage.cursor = isPanMode ? 'grab' : 'default';

    const handlePan = (event: PIXI.FederatedPointerEvent) => {
      if (!isPanMode || isLassoMode) return;
      
      if (event.type === 'pointerdown') {
        isDraggingRef.current = true;
        lastPositionRef.current = { x: event.globalX, y: event.globalY };
        app.stage.cursor = 'grabbing';
      } else if (event.type === 'pointermove' && isDraggingRef.current) {
        const dx = event.globalX - lastPositionRef.current.x;
        const dy = event.globalY - lastPositionRef.current.y;
        viewport.x += dx;
        viewport.y += dy;
        lastPositionRef.current = { x: event.globalX, y: event.globalY };
      } else if (event.type === 'pointerup' || event.type === 'pointerupoutside') {
        isDraggingRef.current = false;
        app.stage.cursor = isPanMode ? 'grab' : 'default';
      }
    };

    app.stage
      .on('pointerdown', handlePan)
      .on('pointermove', handlePan)
      .on('pointerup', handlePan)
      .on('pointerupoutside', handlePan);

    return () => {
      app.stage
        .off('pointerdown', handlePan)
        .off('pointermove', handlePan)
        .off('pointerup', handlePan)
        .off('pointerupoutside', handlePan);
    };
  }, [points, isPanMode, isLassoMode, selectedPoints, getTexture, isLoaded, viewportBounds, setSelectedPoints]);

  // Update zoom level
  useEffect(() => {
    if (viewportRef.current && !isDraggingRef.current) {
      viewportRef.current.scale.set(zoomLevel);
    }
  }, [zoomLevel]);

  return <div ref={canvasRef} className="w-full h-full" />;
};