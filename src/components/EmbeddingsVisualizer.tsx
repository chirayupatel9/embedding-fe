import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Lasso, Move, ZoomIn, Loader2 } from 'lucide-react';
import { Point } from '../types/embedding';
import { useEmbeddingsData } from '../hooks/useEmbeddingsData';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { PixiRenderer } from './PixiRenderer';
import { SelectionOverlay } from './SelectionOverlay';

const CHUNK_SIZE = 100; // Number of sprites to load at once

export const EmbeddingsVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { points, isLoading, error } = useEmbeddingsData();
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [isLassoMode, setIsLassoMode] = useState(false);
  const [viewportBounds, setViewportBounds] = useState({ width: 0, height: 0 });
  const { preloadImages, getLoadedImage } = useImagePreloader();

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateViewportSize = () => {
      if (containerRef.current) {
        setViewportBounds({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    
    // Preload images in chunks
    const preloadChunks = async () => {
      const uniqueSpritePaths = [...new Set(points.map(p => p.spritePath))];
      for (let i = 0; i < uniqueSpritePaths.length; i += CHUNK_SIZE) {
        const chunk = uniqueSpritePaths.slice(i, i + CHUNK_SIZE);
        await preloadImages(chunk);
      }
    };

    preloadChunks();

    return () => window.removeEventListener('resize', updateViewportSize);
  }, [points, preloadImages]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg">
        <p className="text-red-600">Error loading embeddings: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="w-full bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setIsLassoMode(!isLassoMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                isLassoMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Lasso size={20} />
              {isLassoMode ? 'Exit Lasso' : 'Start Lasso'}
            </button>
            <button
              onClick={() => setSelectedPoints([])}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              <Move size={20} />
              Reset Selection
            </button>
            {selectedPoints.length > 0 && (
              <div className="flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
                <ZoomIn size={20} />
                <span>Zoomed to {selectedPoints.length} items</span>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-600">
            Selected: {selectedPoints.length} items
          </div>
        </div>
        
        <div 
          ref={containerRef} 
          className="relative w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden"
          style={{ backgroundColor: '#f8fafc' }}
        >
          <PixiRenderer
            points={points}
            selectedPoints={selectedPoints}
            setSelectedPoints={setSelectedPoints}
            viewportBounds={viewportBounds}
            isLassoMode={isLassoMode}
            getLoadedImage={getLoadedImage}
          />
          {isLassoMode && (
            <SelectionOverlay
              points={points}
              onSelection={setSelectedPoints}
              viewportBounds={viewportBounds}
            />
          )}
        </div>

        {selectedPoints.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Selected Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(selectedPoints.map(p => p.category))).map(category => (
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
      </div>
    </div>
  );
};