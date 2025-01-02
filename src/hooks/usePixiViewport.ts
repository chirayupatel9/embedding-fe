import { useRef } from 'react';
import * as PIXI from 'pixi.js';

export const usePixiViewport = (
  viewportRef: React.MutableRefObject<PIXI.Container | undefined>,
  isPanMode: boolean,
  isLassoMode: boolean
) => {
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  const initViewport = (app: PIXI.Application) => {
    const viewport = new PIXI.Container();
    app.stage.addChild(viewport);
    viewportRef.current = viewport;
    return viewport;
  };

  const handlePan = (app: PIXI.Application) => {
    app.stage.eventMode = 'static';
    app.stage.cursor = isPanMode ? 'grab' : 'default';

    const onPointerDown = (event: PIXI.FederatedPointerEvent) => {
      if (!isPanMode || isLassoMode) return;
      isDraggingRef.current = true;
      lastPositionRef.current = { x: event.globalX, y: event.globalY };
      app.stage.cursor = 'grabbing';
    };

    const onPointerMove = (event: PIXI.FederatedPointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = event.globalX - lastPositionRef.current.x;
      const dy = event.globalY - lastPositionRef.current.y;
      if (viewportRef.current) {
        viewportRef.current.x += dx;
        viewportRef.current.y += dy;
      }
      lastPositionRef.current = { x: event.globalX, y: event.globalY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      app.stage.cursor = isPanMode ? 'grab' : 'default';
    };

    app.stage
      .on('pointerdown', onPointerDown)
      .on('pointermove', onPointerMove)
      .on('pointerup', onPointerUp)
      .on('pointerupoutside', onPointerUp);

    return () => {
      app.stage
        .off('pointerdown', onPointerDown)
        .off('pointermove', onPointerMove)
        .off('pointerup', onPointerUp)
        .off('pointerupoutside', onPointerUp);
    };
  };

  return { initViewport, handlePan };
};