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
    container.addChild(viewport);

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

  // Update selected states
  useEffect(() => {
    spritesRef.current.forEach((sprite, id) => {
      const isSelected = selectedPoints.some(p => p.id === id);
      sprite.alpha = isSelected ? 1 : 0.7;
      sprite.scale.set(isSelected ? 1.2 : 1);
    });
  }, [selectedPoints]);

  return <div ref={canvasRef} className="w-full h-full" />;
};