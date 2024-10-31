import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Point } from '../types/embedding';

interface PixiRendererProps {
  points: Point[];
  selectedPoints: Point[];
  setSelectedPoints: (points: Point[]) => void;
  viewportBounds: { width: number; height: number };
  isLassoMode: boolean;
  getLoadedImage: (path: string) => HTMLImageElement | undefined;
}

export const PixiRenderer: React.FC<PixiRendererProps> = ({
  points,
  selectedPoints,
  setSelectedPoints,
  viewportBounds,
  isLassoMode,
  getLoadedImage,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application>();
  const spritesRef = useRef<Map<number, PIXI.Sprite>>(new Map());
  const viewportRef = useRef<PIXI.Container>();

  useEffect(() => {
    if (!canvasRef.current || !viewportBounds.width || !viewportBounds.height) return;

    // Initialize PIXI Application
    const app = new PIXI.Application({
      width: viewportBounds.width,
      height: viewportBounds.height,
      backgroundColor: 0xf8fafc,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    });

    canvasRef.current.appendChild(app.view as unknown as Node);
    appRef.current = app;

    // Create container for sprites
    const container = new PIXI.Container();
    app.stage.addChild(container);

    // Setup viewport and interaction
    const viewport = new PIXI.Container();
    viewport.sortableChildren = true;
    container.addChild(viewport);
    viewportRef.current = viewport;

    // Center the viewport
    viewport.x = viewportBounds.width / 2;
    viewport.y = viewportBounds.height / 2;

    // Create sprites for each point
    points.forEach((point) => {
      const image = getLoadedImage(point.spritePath);
      if (!image) return;

      const texture = PIXI.Texture.from(image);
      const sprite = new PIXI.Sprite(texture);

      sprite.width = 40;
      sprite.height = 40;
      sprite.x = point.x;
      sprite.y = point.y;
      sprite.anchor.set(0.5);
      sprite.interactive = true;
      sprite.zIndex = 1;

      // Add circular mask
      const mask = new PIXI.Graphics();
      mask.beginFill(0xffffff);
      mask.drawCircle(0, 0, 20);
      mask.endFill();
      sprite.mask = mask;
      sprite.addChild(mask);

      viewport.addChild(sprite);
      spritesRef.current.set(point.id, sprite);

      // Handle click events
      sprite.on('pointerdown', () => {
        if (!isLassoMode) {
          const isSelected = selectedPoints.includes(point);
          setSelectedPoints(isSelected 
            ? selectedPoints.filter(p => p.id !== point.id)
            : [...selectedPoints, point]
          );
        }
      });
    });

    return () => {
      app.destroy(true);
      if (canvasRef.current?.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
    };
  }, [points, viewportBounds, getLoadedImage]);

  // Update selected states and handle zooming
  useEffect(() => {
    if (!viewportRef.current || !viewportBounds.width || !viewportBounds.height) return;

    spritesRef.current.forEach((sprite, id) => {
      const isSelected = selectedPoints.some(p => p.id === id);
      sprite.alpha = isSelected ? 1 : 0.7;
      sprite.scale.set(isSelected ? 1.2 : 1);
      sprite.zIndex = isSelected ? 2 : 1;
    });

    // Handle zooming to selected points
    if (selectedPoints.length > 0) {
      const bounds = {
        minX: Math.min(...selectedPoints.map(p => p.x)),
        maxX: Math.max(...selectedPoints.map(p => p.x)),
        minY: Math.min(...selectedPoints.map(p => p.y)),
        maxY: Math.max(...selectedPoints.map(p => p.y)),
      };

      const padding = 100; // Padding around the selection
      const boundsWidth = bounds.maxX - bounds.minX + padding * 2;
      const boundsHeight = bounds.maxY - bounds.minY + padding * 2;

      // Calculate scale to fit the selection
      const scaleX = viewportBounds.width / boundsWidth;
      const scaleY = viewportBounds.height / boundsHeight;
      const scale = Math.min(scaleX, scaleY, 2); // Limit max zoom

      // Calculate center of selection
      const centerX = (bounds.minX + bounds.maxX) / 2;
      const centerY = (bounds.minY + bounds.maxY) / 2;

      // Animate the viewport
      const viewport = viewportRef.current;
      const targetX = viewportBounds.width / 2 - centerX * scale;
      const targetY = viewportBounds.height / 2 - centerY * scale;

      // Smooth animation
      const animate = () => {
        const dx = (targetX - viewport.x) * 0.1;
        const dy = (targetY - viewport.y) * 0.1;
        const ds = (scale - viewport.scale.x) * 0.1;

        viewport.x += dx;
        viewport.y += dy;
        viewport.scale.set(viewport.scale.x + ds);

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || Math.abs(ds) > 0.001) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    } else {
      // Reset zoom when no points are selected
      const viewport = viewportRef.current;
      const animate = () => {
        const dx = (viewportBounds.width / 2 - viewport.x) * 0.1;
        const dy = (viewportBounds.height / 2 - viewport.y) * 0.1;
        const ds = (1 - viewport.scale.x) * 0.1;

        viewport.x += dx;
        viewport.y += dy;
        viewport.scale.set(viewport.scale.x + ds);

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || Math.abs(ds) > 0.001) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [selectedPoints, viewportBounds]);

  return <div ref={canvasRef} className="w-full h-full" />;
};