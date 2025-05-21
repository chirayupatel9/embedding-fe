import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as PIXI from 'pixi.js';
import { Lasso, Move, Hand, MinusCircle, PlusCircle, Loader2 } from 'lucide-react';
import { Point } from '../types/embedding';
import { useEmbeddingsData } from '../hooks/useEmbeddingsData';
import { PixiRenderer } from './PixiRenderer';
import { SelectionOverlay } from './SelectionOverlay';
import { createProjection } from '../utils/projection';
import { ToolbarControls } from './ToolbarControls';
import { ZoomControls } from './ZoomControls';
import { SelectionInfo } from './SelectionInfo';
import { API_CONFIG } from '../services/api/config';
import { ProjectionControls } from './ProjectionControls';
import { fetchSubsetData } from '../services/api/embeddings';

const CANVAS_WIDTH = window.innerWidth - 32
const CANVAS_HEIGHT = window.innerHeight - 200
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

export const EmbeddingsVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectionType, setProjectionType] = useState(API_CONFIG.PROJECTION_TYPE);
  const { points: originalPoints, isLoading, error, metadata } = useEmbeddingsData(projectionType);
  const [displayedPoints, setDisplayedPoints] = useState<Point[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [isLassoMode, setIsLassoMode] = useState(false);
  const [isPanMode, setIsPanMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewportBounds] = useState({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
  const [isProjectedView, setIsProjectedView] = useState(false);
  const viewportRef = useRef<PIXI.Container>();
  const lastProjectedPointsRef = useRef<Point[]>([]);

  // Handle projection type change
  const handleProjectionTypeChange = (type: string) => {
    setProjectionType(type);
    console.log('Projection type changed to:', type);
  };

  // Map API items to Point type before projecting
  useEffect(() => {
    if (originalPoints && originalPoints.length > 0) {
      const points: Point[] = originalPoints.map((item: any, idx: number) => ({
        id: item.label ?? idx,
        x: 0, // will be set by projection
        y: 0, // will be set by projection
        category: item.category,
        spriteX: item.spriteX ?? 0,
        spriteY: item.spriteY ?? 0,
        embedding: item.embedding,
        originalItem: {
          embedding: item.embedding,
          label: item.label ?? idx,
          category: item.category,
          spriteX: item.spriteX ?? 0,
          spriteY: item.spriteY ?? 0,
          image_id: item.image_id,
        },
      }));
      console.log('Mapped points sample:', points[0]);
      const projectedPoints = createProjection(points, CANVAS_WIDTH, CANVAS_HEIGHT);
      lastProjectedPointsRef.current = projectedPoints;
      setDisplayedPoints(projectedPoints);
    }
  }, [originalPoints]);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoomLevel(Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM));
  }, []);

  const handleModeChange = useCallback((mode: 'pan' | 'lasso' | null) => {
    setIsLassoMode(mode === 'lasso');
    setIsPanMode(mode === 'pan');
  }, []);

  const handleReset = useCallback(() => {
    if (lastProjectedPointsRef.current.length > 0) {
      setDisplayedPoints(lastProjectedPointsRef.current);
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
  }, []);

  const handleSelectionComplete = useCallback(async (selected: Point[]) => {
    if (selected.length > 0) {
      try {
        // Get the image IDs from the selected points
        const imageIds = selected
          .map(point => point.originalItem.image_id)
          .filter((id): id is string => typeof id === 'string');
        
        if (imageIds.length === 0) {
          throw new Error('No valid image IDs found in selection');
        }
        
        console.log('Sending image IDs to subset endpoint:', imageIds);
        
        // Fetch the subset data
        const subsetData = await fetchSubsetData(imageIds);
        
        // Transform the subset data into points
        const subsetPoints = subsetData.items.map((item: any, idx: number) => ({
          id: item.image_id, // Use image_id as the id
          x: item.embedding[0], // Use the x coordinate from embedding
          y: item.embedding[1], // Use the y coordinate from embedding
          category: item.category,
          spriteX: item.spriteX ?? item.sprite_x ?? 0,
          spriteY: item.spriteY ?? item.sprite_y ?? 0,
          embedding: item.embedding,
          originalItem: {
            embedding: item.embedding,
            label: item.image_id,
            category: item.category,
            spriteX: item.spriteX ?? item.sprite_x ?? 0,
            spriteY: item.spriteY ?? item.sprite_y ?? 0,
            image_id: item.image_id,
            filename: item.filename,
            width: item.width,
            height: item.height
          },
        }));

        // Project the subset points to fit the canvas
        const projectedSelection = createProjection(subsetPoints, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Update the state with the subset data
        setSelectedPoints(selected);
        setDisplayedPoints(projectedSelection);
        setIsLassoMode(false);
        setIsProjectedView(true);
        
        // Reset viewport
        if (viewportRef.current) {
          viewportRef.current.position.set(0, 0);
          viewportRef.current.scale.set(1);
        }
        setZoomLevel(1);
      } catch (error) {
        console.error('Error fetching subset data:', error);
        // If there's an error, fall back to the original selection behavior
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
    }
  }, [CANVAS_WIDTH, CANVAS_HEIGHT]);

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
      <ProjectionControls
        projectionType={projectionType}
        onProjectionTypeChange={handleProjectionTypeChange}
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