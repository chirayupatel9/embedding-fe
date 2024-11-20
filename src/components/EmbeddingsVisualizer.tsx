import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Lasso, Move, Hand, MinusCircle, PlusCircle, Loader2 } from 'lucide-react';
import { Point } from '../types/embedding';
import { useEmbeddingsData } from '../hooks/useEmbeddingsData';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { PixiRenderer } from './PixiRenderer';
import { SelectionOverlay } from './SelectionOverlay';
import { createProjection } from '../utils/projection';

const CHUNK_SIZE = 50;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

export const EmbeddingsVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { points: originalPoints, isLoading, error } = useEmbeddingsData();
  const [displayedPoints, setDisplayedPoints] = useState<Point[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [isLassoMode, setIsLassoMode] = useState(false);
  const [isPanMode, setIsPanMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewportBounds, setViewportBounds] = useState({ width: 0, height: 0 });
  const [isProjectedView, setIsProjectedView] = useState(false);
  const { preloadImages, getLoadedImage } = useImagePreloader();
  const viewportRef = useRef<PIXI.Container>();
  const renderedPointsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    setDisplayedPoints(originalPoints);
  }, [originalPoints]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateViewportSize = () => {
      if (containerRef.current) {
        setViewportBounds({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    
    const preloadChunks = async () => {
      const uniqueSpritePaths = [...new Set(displayedPoints.map(p => p.spritePath))];
      for (let i = 0; i < uniqueSpritePaths.length; i += CHUNK_SIZE) {
        const chunk = uniqueSpritePaths.slice(i, i + CHUNK_SIZE);
        await preloadImages(chunk);
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    };

    preloadChunks();

    return () => window.removeEventListener('resize', updateViewportSize);
  }, [displayedPoints, preloadImages]);

  const handleZoomChange = (newZoom: number) => {
    setZoomLevel(Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM));
  };

  const handleModeChange = (mode: 'pan' | 'lasso' | null) => {
    if (mode === 'lasso') {
      setIsLassoMode(true);
      setIsPanMode(false);
    } else if (mode === 'pan') {
      setIsLassoMode(false);
      setIsPanMode(true);
    } else {
      setIsLassoMode(false);
      setIsPanMode(false);
    }
  };

  const handleReset = () => {
    setSelectedPoints([]);
    setZoomLevel(1);
    setIsLassoMode(false);
    setIsPanMode(false);
    setDisplayedPoints(originalPoints);
    setIsProjectedView(false);
    renderedPointsRef.current.clear();
    if (viewportRef.current) {
      viewportRef.current.position.set(viewportBounds.width / 2, viewportBounds.height / 2);
      viewportRef.current.scale.set(1);
    }
  };

  const handleSelectionComplete = (selected: Point[]) => {
    if (selected.length > 0) {
      setSelectedPoints(selected);
      setIsLassoMode(false);
      setIsProjectedView(true);
      
      // Create new projection for selected points
      const newProjection = createProjection(selected, viewportBounds.width, viewportBounds.height);
      renderedPointsRef.current.clear();
      setDisplayedPoints(newProjection);
      
      if (viewportRef.current) {
        viewportRef.current.position.set(viewportBounds.width / 2, viewportBounds.height / 2);
        viewportRef.current.scale.set(1);
      }
      setZoomLevel(1);
    }
  };

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-red-50">
        <p className="text-red-600">Error loading embeddings: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-100">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
        <button
          onClick={() => handleModeChange(isLassoMode ? null : 'lasso')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            isLassoMode
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Lasso size={20} />
          {isLassoMode ? 'Exit Lasso' : 'Lasso Select'}
        </button>
        <button
          onClick={() => handleModeChange(isPanMode ? null : 'pan')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            isPanMode
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Hand size={20} />
          {isPanMode ? 'Exit Pan' : 'Pan Mode'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          <Move size={20} />
          Reset View
        </button>
      </div>

      <div className="fixed bottom-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
        <button
          onClick={() => handleZoomChange(zoomLevel - 0.1)}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-200"
          disabled={zoomLevel <= MIN_ZOOM}
        >
          <MinusCircle size={20} />
        </button>
        <span className="text-sm font-medium text-gray-600 min-w-[4rem] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() => handleZoomChange(zoomLevel + 0.1)}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-200"
          disabled={zoomLevel >= MAX_ZOOM}
        >
          <PlusCircle size={20} />
        </button>
      </div>

      {isProjectedView && (
        <div className="fixed bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <div className="text-sm font-medium text-gray-800 mb-2">
            Showing projection of {displayedPoints.length} items
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(displayedPoints.map(p => p.category))).map(category => (
              <span
                key={category}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="w-full h-full"
      >
        <PixiRenderer
          key={isProjectedView ? 'projected-view' : 'original-view'}
          points={displayedPoints}
          selectedPoints={selectedPoints}
          setSelectedPoints={setSelectedPoints}
          viewportBounds={viewportBounds}
          isLassoMode={isLassoMode}
          isPanMode={isPanMode}
          zoomLevel={zoomLevel}
          getLoadedImage={getLoadedImage}
          viewportRef={viewportRef}
          renderedPointsRef={renderedPointsRef}
        />
        {isLassoMode && (
          <SelectionOverlay
            points={displayedPoints}
            onSelection={handleSelectionComplete}
            viewportBounds={viewportBounds}
            viewportRef={viewportRef}
          />
        )}
      </div>
    </div>
  );
};