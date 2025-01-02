import { useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

interface ViewportBounds {
  width: number;
  height: number;
}

export const usePixiApp = (viewportBounds: ViewportBounds) => {
  const [app, setApp] = useState<PIXI.Application | null>(null);

  const initApp = () => {
    const pixiApp = new PIXI.Application({
      width: viewportBounds.width,
      height: viewportBounds.height,
      backgroundColor: 0xffffff,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    setApp(pixiApp);
    return pixiApp;
  };

  return { app, initApp };
};