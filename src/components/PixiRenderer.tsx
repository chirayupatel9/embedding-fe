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
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application>();
  const spritesRef = useRef<Map<number, PIXI.Sprite>>(new Map());
  const viewportRef = useRef<PIXI.Container>();
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !viewportBounds.width || !viewportBounds.height) return;

    const app = new PIXI.Application({
      width: viewportBounds.width,
      height: viewportBounds.height,
      backgroundColor: 0xf8fafc,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    canvasRef.current.appendChild(app.view as unknown as Node);
    appRef.current = app;

    const viewport = new PIXI.Container();
    viewport.sortableChildren = true;
    app.stage.addChild(viewport);
    viewportRef.current = viewport;

    viewport.x = viewportBounds.width / 2;
    viewport.y = viewportBounds.height / 2;

    const batchSize = 50;
    let currentBatch = 0;

    const processBatch = () => {
      const start = currentBatch * batchSize;
      const end = Math.min(start + batchSize, points.length);
      
      for (let i = start; i < end; i++) {
        const point = points[i];
        const image = getLoadedImage(point.spritePath);
        if (!image) continue;

        const texture = PIXI.Texture.from(image);
        const sprite = new PIXI.Sprite(texture);

        sprite.width = 40;
        sprite.height = 40;
        sprite.x = point.x;
        sprite.y = point.y;
        sprite.anchor.set(0.5);
        sprite.eventMode = 'static';
        sprite.cursor = isPanMode ? 'grab' : 'pointer';
        sprite.zIndex = 1;

        // Add glow filter for highlighting
        const glowFilter = new PIXI.BlurFilter();
        glowFilter.blur = 4;
        glowFilter.quality = 2;
        sprite.filters = [glowFilter];
        glowFilter.enabled = false;

        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff);
        mask.drawCircle(0, 0, 20);
        mask.endFill();
        sprite.mask = mask;
        sprite.addChild(mask);

        viewport.addChild(sprite);
        spritesRef.current.set(point.id, sprite);

        sprite.on('pointerdown', (event) => {
          if (!isLassoMode && !isPanMode && !isDraggingRef.current) {
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
            (sprite.filters![0] as PIXI.BlurFilter).enabled = true;
          }
        });

        sprite.on('mouseout', () => {
          if (!selectedPoints.includes(point)) {
            sprite.scale.set(1);
            (sprite.filters![0] as PIXI.BlurFilter).enabled = false;
          }
        });
      }

      currentBatch++;
      if (currentBatch * batchSize < points.length) {
        requestAnimationFrame(processBatch);
      }
    };

    processBatch();

    const onDragStart = (event: PIXI.FederatedPointerEvent) => {
      if (isLassoMode || !isPanMode) return;
      isDraggingRef.current = true;
      lastPositionRef.current = { x: event.globalX, y: event.globalY };
      app.stage.cursor = 'grabbing';
    };

    const onDragMove = (event: PIXI.FederatedPointerEvent) => {
      if (!isDraggingRef.current || isLassoMode || !isPanMode) return;

      const dx = event.globalX - lastPositionRef.current.x;
      const dy = event.globalY - lastPositionRef.current.y;
      
      viewport.x += dx;
      viewport.y += dy;

      lastPositionRef.current = { x: event.globalX, y: event.globalY };
    };

    const onDragEnd = () => {
      isDraggingRef.current = false;
      app.stage.cursor = isPanMode ? 'grab' : 'default';
    };

    app.stage
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
        x: (mouseX - viewport.x) / viewport.scale.x,
        y: (mouseY - viewport.y) / viewport.scale.y
      };

      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(viewport.scale.x * zoomFactor, 0.1), 5);
      
      viewport.scale.set(newScale);

      viewport.x = mouseX - worldPos.x * viewport.scale.x;
      viewport.y = mouseY - worldPos.y * viewport.scale.y;
    };

    canvasRef.current.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      canvasRef.current?.removeEventListener('wheel', onWheel);
      app.destroy(true);
      if (canvasRef.current?.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
    };
  }, [points, viewportBounds, getLoadedImage, isLassoMode, isPanMode]);

  // Update zoom level
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scale.set(zoomLevel);
    }
  }, [zoomLevel]);

  // Update selected states
  useEffect(() => {
    spritesRef.current.forEach((sprite, id) => {
      const isSelected = selectedPoints.some(p => p.id === id);
      sprite.alpha = isSelected ? 1 : 0.7;
      sprite.scale.set(isSelected ? 1.2 : 1);
      sprite.zIndex = isSelected ? 2 : 1;
      (sprite.filters![0] as PIXI.BlurFilter).enabled = isSelected;
    });

    if (selectedPoints.length > 0 && !isDraggingRef.current) {
      const bounds = {
        minX: Math.min(...selectedPoints.map(p => p.x)),
        maxX: Math.max(...selectedPoints.map(p => p.x)),
        minY: Math.min(...selectedPoints.map(p => p.y)),
        maxY: Math.max(...selectedPoints.map(p => p.y)),
      };

      const padding = 100;
      const boundsWidth = bounds.maxX - bounds.minX + padding * 2;
      const boundsHeight = bounds.maxY - bounds.minY + padding * 2;

      const scaleX = viewportBounds.width / boundsWidth;
      const scaleY = viewportBounds.height / boundsHeight;
      const scale = Math.min(scaleX, scaleY, 2);

      const centerX = (bounds.minX + bounds.maxX) / 2;
      const centerY = (bounds.minY + bounds.maxY) / 2;

      const viewport = viewportRef.current;
      if (viewport) {
        viewport.x = viewportBounds.width / 2 - centerX * scale;
        viewport.y = viewportBounds.height / 2 - centerY * scale;
        viewport.scale.set(scale);
      }
    }
  }, [selectedPoints, viewportBounds]);

  return <div ref={canvasRef} className="w-full h-full" />;
};