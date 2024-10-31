import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Lasso, Move, Loader2 } from 'lucide-react';
import { Point } from '../types/embedding';
import { useEmbeddingsData } from '../hooks/useEmbeddingsData';

export const EmbeddingsVisualizer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { points, isLoading, error } = useEmbeddingsData();
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [isLassoMode, setIsLassoMode] = useState(false);
  const [lassoPaths, setLassoPaths] = useState<[number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!svgRef.current || isLoading) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create main visualization group
    const g = svg.append('g');

    // Draw sprites
    g.selectAll('image')
      .data(points)
      .join('image')
      .attr('x', d => d.x - 20)
      .attr('y', d => d.y - 20)
      .attr('width', 40)
      .attr('height', 40)
      .attr('href', d => d.spritePath)
      .attr('clip-path', 'circle(50%)')
      .attr('class', d => 
        selectedPoints.includes(d) 
          ? 'transition-all duration-200 ring-2 ring-blue-500 ring-offset-2' 
          : 'transition-all duration-200'
      );

    // Draw lasso path
    if (lassoPaths.length > 0) {
      const lineGenerator = d3.line();
      g.append('path')
        .attr('d', lineGenerator(lassoPaths))
        .attr('fill', 'none')
        .attr('stroke', '#666')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
    }

    // Handle mouse events
    if (isLassoMode) {
      svg
        .on('mousedown', (event) => {
          setIsDragging(true);
          const [x, y] = d3.pointer(event);
          setLassoPaths([[x, y]]);
        })
        .on('mousemove', (event) => {
          if (!isDragging) return;
          const [x, y] = d3.pointer(event);
          setLassoPaths(prev => [...prev, [x, y]]);
        })
        .on('mouseup', () => {
          setIsDragging(false);
          if (lassoPaths.length < 3) return;

          // Create polygon from lasso path
          const polygon = lassoPaths.map(([x, y]) => [x, y]);
          
          // Select points inside the lasso
          const selected = points.filter(point => {
            return d3.polygonContains(polygon, [point.x, point.y]);
          });

          setSelectedPoints(selected);
          setLassoPaths([]);
        });
    }

    return () => {
      svg.on('mousedown', null)
         .on('mousemove', null)
         .on('mouseup', null);
    };
  }, [points, selectedPoints, lassoPaths, isLassoMode, isDragging, isLoading]);

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
              onClick={() => {
                setSelectedPoints([]);
                setLassoPaths([]);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              <Move size={20} />
              Reset Selection
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Selected: {selectedPoints.length} items
          </div>
        </div>
        <svg
          ref={svgRef}
          width="100%"
          height="600"
          className="border border-gray-200 rounded-lg"
          style={{ backgroundColor: '#f8fafc' }}
        />
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