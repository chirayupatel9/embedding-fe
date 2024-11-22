import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Lasso, Move, Hand, MinusCircle, PlusCircle, Loader2 } from 'lucide-react';
import { Point } from '../types/embedding';
import { useEmbeddingsData } from '../hooks/useEmbeddingsData';
import { PixiRenderer } from './PixiRenderer';
import { SelectionOverlay } from './SelectionOverlay';
import { createProjection } from '../utils/projection';

const CANVAS_WIDTH = Math.min(800, window.innerWidth - 32);
const CANVAS_HEIGHT = Math.min(600, window.innerHeight - 200);
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
  const [viewportBounds] = useState({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
  const [isProjectedView, setIsProjectedView] = useState(false);
  const viewportRef = useRef<PIXI.Container>();
  const renderedPointsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (originalPoints.length > 0) {
      const projectedPoints = createProjection(originalPoints, CANVAS_WIDTH, CANVAS_HEIGHT);
      setDisplayedPoints(projectedPoints);
    }
  }, [originalPoints]);

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
    if (originalPoints.length > 0) {
      const projectedPoints = createProjection(originalPoints, CANVAS_WIDTH, CANVAS_HEIGHT);
      setDisplayedPoints(projectedPoints);
      setSelectedPoints([]);
      setZoomLevel(1);
      setIsLassoMode(false);
      setIsPanMode(false);
      setIsProjectedView(false);
      renderedPointsRef.current.clear();
      if (viewportRef.current) {
        viewportRef.current.position.set(0, 0);
        viewportRef.current.scale.set(1);
      }
    }
  };

  const handleSelectionComplete = (selected: Point[]) => {
    if (selected.length > 0) {
      const projectedSelection = createProjection(selected, CANVAS_WIDTH, CANVAS_HEIGHT);
      setSelectedPoints(selected);
      setDisplayedPoints(projectedSelection);
      setIsLassoMode(false);
      setIsProjectedView(true);
      renderedPointsRef.current.clear();

      if (viewportRef.current) {
        viewportRef.current.position.set(0, 0);
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
    <div className="fixed inset-0 overflow-auto bg-gray-100 p-4">
      <div className="sticky top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg w-fit mx-auto">
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

      <div className="sticky bottom-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg w-fit ml-auto">
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
        <div className="sticky bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg w-fit">
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
        className="relative mx-auto my-4 rounded-lg shadow-lg overflow-hidden bg-white"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      >
        <PixiRenderer
          points={displayedPoints}
          selectedPoints={selectedPoints}
          setSelectedPoints={setSelectedPoints}
          viewportBounds={viewportBounds}
          isLassoMode={isLassoMode}
          isPanMode={isPanMode}
          zoomLevel={zoomLevel}
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