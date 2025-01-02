import React, { useEffect, useRef, useState } from 'react';
import { Lasso, Move, Hand, MinusCircle, PlusCircle, Loader2 } from 'lucide-react';
import { Point } from '../types/embedding';
import { useEmbeddingsData } from '../hooks/useEmbeddingsData';
import { PixiRenderer } from './PixiRenderer';
import { SelectionOverlay } from './SelectionOverlay';
import { createProjection } from '../utils/projection';
import { ToolbarControls } from './ToolbarControls';
import { ZoomControls } from './ZoomControls';
import { SelectionInfo } from './SelectionInfo';

const CANVAS_WIDTH = Math.min(1000, window.innerWidth - 32);
const CANVAS_HEIGHT = Math.min(800, window.innerHeight - 200);
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

export const EmbeddingsVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { points: originalPoints, isLoading, error, metadata } = useEmbeddingsData();
  const [displayedPoints, setDisplayedPoints] = useState<Point[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [isLassoMode, setIsLassoMode] = useState(false);
  const [isPanMode, setIsPanMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewportBounds] = useState({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
  const [isProjectedView, setIsProjectedView] = useState(false);
  const viewportRef = useRef<PIXI.Container>();

  useEffect(() => {
    if (originalPoints && originalPoints.length > 0) {
      const projectedPoints = createProjection(originalPoints, CANVAS_WIDTH, CANVAS_HEIGHT);
      setDisplayedPoints(projectedPoints);
    }
  }, [originalPoints]);

  const handleZoomChange = (newZoom: number) => {
    setZoomLevel(Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM));
  };

  const handleModeChange = (mode: 'pan' | 'lasso' | null) => {
    setIsLassoMode(mode === 'lasso');
    setIsPanMode(mode === 'pan');
  };

  const handleReset = () => {
    if (originalPoints && originalPoints.length > 0) {
      const projectedPoints = createProjection(originalPoints, CANVAS_WIDTH, CANVAS_HEIGHT);
      setDisplayedPoints(projectedPoints);
      setSelectedPoints([]);
      setZoomLevel(1);
      setIsLassoMode(false);
      setIsPanMode(false);
      setIsProjectedView(false);
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

  if (isLoading || !metadata) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-auto bg-gray-100 p-4">
      <ToolbarControls
        isLassoMode={isLassoMode}
        isPanMode={isPanMode}
        onModeChange={handleModeChange}
        onReset={handleReset}
      />
      
      <ZoomControls
        zoomLevel={zoomLevel}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        onZoomChange={handleZoomChange}
      />

      {isProjectedView && (
        <SelectionInfo
          displayedPoints={displayedPoints}
        />
      )}
      
      <div 
        ref={containerRef} 
        className="relative mx-auto my-4 rounded-lg shadow-lg overflow-hidden bg-white"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      >
        <PixiRenderer
          points={displayedPoints}
          selectedPoints={selectedPoints}
          viewportBounds={viewportBounds}
          isLassoMode={isLassoMode}
          isPanMode={isPanMode}
          zoomLevel={zoomLevel}
          viewportRef={viewportRef}
          metadata={metadata}
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