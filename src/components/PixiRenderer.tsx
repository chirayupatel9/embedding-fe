import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Point } from '../types/embedding';

interface PixiRendererProps {
  points: Point[];
  selectedPoints: Point[];
  setSelectedPoints: (points: Point[]) => void;
  viewportBounds: { width: number; height: number };
  isLassoMode: boolean;
  isPanMode: boolean;
  zoomLevel: number;
  getLoadedImage: (path: string) => HTMLImageElement | undefined;
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
  getLoadedImage,
  viewportRef,
  renderedPointsRef,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application>();
  const spritesRef = useRef<Map<number, PIXI.Sprite>>(new Map());
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const textureCache = useRef<Map<string, PIXI.Texture>>(new Map());

  // Initialize PIXI application and viewport
  useEffect(() => {
    if (!canvasRef.current || !viewportBounds.width || !viewportBounds.height) return;

    let app = appRef.current;
    let viewport = viewportRef.current;

    if (!app) {
      PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(PIXI.settings.SPRITE_MAX_TEXTURES, 16);
      
      app = new PIXI.Application({
        width: viewportBounds.width,
        height: viewportBounds.height,
        backgroundColor: 0xf8fafc,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        powerPreference: 'high-performance',
      });

      canvasRef.current.appendChild(app.view as unknown as Node);
      appRef.current = app;

      viewport = new PIXI.Container();
      viewport.sortableChildren = true;
      app.stage.addChild(viewport);
      viewportRef.current = viewport;

      viewport.x = viewportBounds.width / 2;
      viewport.y = viewportBounds.height / 2;

      // Create a transparent overlay for pan mode
      const overlay = new PIXI.Graphics();
      overlay.beginFill(0xFFFFFF, 0);
      overlay.drawRect(0, 0, viewportBounds.width, viewportBounds.height);
      overlay.endFill();
      overlay.eventMode = 'static';
      overlay.cursor = 'grab';
      app.stage.addChild(overlay);

      const onDragStart = (event: PIXI.FederatedPointerEvent) => {
        if (isLassoMode || !isPanMode) return;
        isDraggingRef.current = true;
        lastPositionRef.current = { x: event.globalX, y: event.globalY };
        app!.stage.cursor = 'grabbing';
      };

      const onDragMove = (event: PIXI.FederatedPointerEvent) => {
        if (!isDraggingRef.current || isLassoMode || !isPanMode) return;

        const dx = event.globalX - lastPositionRef.current.x;
        const dy = event.globalY - lastPositionRef.current.y;
        
        viewport!.x += dx;
        viewport!.y += dy;

        lastPositionRef.current = { x: event.globalX, y: event.globalY };
      };

      const onDragEnd = () => {
        isDraggingRef.current = false;
        app!.stage.cursor = isPanMode ? 'grab' : 'default';
      };

      overlay
        .on('pointerdown', onDragStart)
        .on('pointermove', onDragMove)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd);

      const onWheel = (event: WheelEvent) => {
        if (isLassoMode) return;
        event.preventDefault();

        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        
        const worldPos = {
          x: (mouseX - viewport!.x) / viewport!.scale.x,
          y: (mouseY - viewport!.y) / viewport!.scale.y
        };

        const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.min(Math.max(viewport!.scale.x * zoomFactor, 0.1), 5);
        
        viewport!.scale.set(newScale);

        viewport!.x = mouseX - worldPos.x * viewport!.scale.x;
        viewport!.y = mouseY - worldPos.y * viewport!.scale.y;
      };

      canvasRef.current.addEventListener('wheel', onWheel, { passive: false });
    }

    app.stage.cursor = isPanMode ? 'grab' : 'default';

    return () => {
      if (app && !viewportRef.current) {
        textureCache.current.forEach(texture => texture.destroy(true));
        textureCache.current.clear();
        app.destroy(true);
        if (canvasRef.current?.firstChild) {
          canvasRef.current.removeChild(canvasRef.current.firstChild);
        }
      }
    };
  }, [viewportBounds, isLassoMode, isPanMode]);

  // Handle points rendering with batching and culling
  useEffect(() => {
    if (!viewportRef.current || !points.length) return;

    const viewport = viewportRef.current;
    const batchSize = 50;
    let currentBatch = 0;
    let isProcessing = false;

    const isPointInViewport = (x: number, y: number) => {
      const margin = 100;
      const vpBounds = {
        left: -viewport.x / viewport.scale.x - margin,
        right: (viewportBounds.width - viewport.x) / viewport.scale.x + margin,
        top: -viewport.y / viewport.scale.y - margin,
        bottom: (viewportBounds.height - viewport.y) / viewport.scale.y + margin,
      };

      return x >= vpBounds.left && x <= vpBounds.right && 
             y >= vpBounds.top && y <= vpBounds.bottom;
    };

    const processBatch = () => {
      if (isProcessing) return;
      isProcessing = true;

      const start = currentBatch * batchSize;
      const end = Math.min(start + batchSize, points.length);
      let hasNewSprites = false;

      const batchContainer = new PIXI.Container();
      
      for (let i = start; i < end; i++) {
        const point = points[i];
        if (renderedPointsRef.current.has(point.id)) continue;
        if (!isPointInViewport(point.x, point.y)) continue;

        const image = getLoadedImage(point.spritePath);
        if (!image) continue;

        let texture = textureCache.current.get(point.spritePath);
        if (!texture) {
          texture = PIXI.Texture.from(image);
          textureCache.current.set(point.spritePath, texture);
        }

        const sprite = new PIXI.Sprite(texture);
        sprite.width = 40;
        sprite.height = 40;
        sprite.x = point.x;
        sprite.y = point.y;
        sprite.anchor.set(0.5);
        sprite.cursor = isPanMode ? 'inherit' : 'pointer';
        sprite.zIndex = 1;

        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff);
        mask.drawCircle(0, 0, 20);
        mask.endFill();
        sprite.mask = mask;
        sprite.addChild(mask);

        batchContainer.addChild(sprite);
        spritesRef.current.set(point.id, sprite);
        renderedPointsRef.current.add(point.id);
        hasNewSprites = true;

        if (!isPanMode) {
          sprite.eventMode = 'static';
          sprite.on('pointerdown', (event) => {
            if (!isLassoMode && !isDraggingRef.current) {
              const isSelected = selectedPoints.includes(point);
              setSelectedPoints(isSelected 
                ? selectedPoints.filter(p => p.id !== point.id)
                : [...selectedPoints, point]
              );
              event.stopPropagation();
            }
          });

          sprite.on('mouseover', () => {
            if (!isLassoMode && !isPanMode) {
              sprite.scale.set(1.2);
            }
          });

          sprite.on('mouseout', () => {
            if (!selectedPoints.includes(point)) {
              sprite.scale.set(1);
            }
          });
        }
      }

      if (batchContainer.children.length > 0) {
        viewport.addChild(batchContainer);
      }

      currentBatch++;
      isProcessing = false;

      if (currentBatch * batchSize < points.length && hasNewSprites) {
        requestAnimationFrame(processBatch);
      }
    };

    const throttledProcessBatch = () => {
      if (!isProcessing) {
        requestAnimationFrame(processBatch);
      }
    };

    throttledProcessBatch();
  }, [points, getLoadedImage, isPanMode, isLassoMode, selectedPoints, setSelectedPoints, viewportBounds]);

  // Update sprite states
  useEffect(() => {
    spritesRef.current.forEach(sprite => {
      sprite.cursor = isPanMode ? 'inherit' : 'pointer';
      sprite.eventMode = isPanMode ? 'none' : 'static';
    });

    spritesRef.current.forEach((sprite, id) => {
      const isSelected = selectedPoints.some(p => p.id === id);
      sprite.alpha = isSelected ? 1 : 0.7;
      sprite.scale.set(isSelected ? 1.2 : 1);
      sprite.zIndex = isSelected ? 2 : 1;
    });
  }, [isPanMode, selectedPoints]);

  // Update zoom level
  useEffect(() => {
    if (viewportRef.current && !isDraggingRef.current) {
      viewportRef.current.scale.set(zoomLevel);
    }
  }, [zoomLevel]);

  return <div ref={canvasRef} className="w-full h-full" />;
};