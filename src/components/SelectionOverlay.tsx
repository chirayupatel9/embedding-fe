import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { Point } from '../types/embedding';

interface SelectionOverlayProps {
  points: Point[];
  onSelection: (selected: Point[]) => void;
  viewportBounds: { width: number; height: number };
  viewportRef: React.MutableRefObject<PIXI.Container | undefined>;
}

export const SelectionOverlay: React.FC<SelectionOverlayProps> = ({
  points,
  onSelection,
  viewportBounds,
  viewportRef,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lassoPaths, setLassoPaths] = useState<[number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const screenToWorld = useCallback((x: number, y: number): [number, number] => {
    const viewport = viewportRef.current;
    if (!viewport) return [x, y];

    return [
      (x - viewport.x) / viewport.scale.x,
      (y - viewport.y) / viewport.scale.y
    ];
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    if (lassoPaths.length > 2) {
      const lineGenerator = d3.line();
      const closedPath = [...lassoPaths, lassoPaths[0]];

      svg.append('path')
        .attr('d', lineGenerator(closedPath))
        .attr('fill', '#3b82f6')
        .attr('fill-opacity', 0.1)
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-linecap', 'round');
    }

    const handleMouseDown = (event: MouseEvent) => {
      const rect = svgRef.current!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setLassoPaths([[x, y]]);
      setIsDragging(true);
      event.preventDefault();
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const rect = svgRef.current!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setLassoPaths(prev => {
        const lastPoint = prev[prev.length - 1];
        if (lastPoint) {
          const [lastX, lastY] = lastPoint;
          const distance = Math.hypot(x - lastX, y - lastY);
          if (distance < 5) return prev;
        }
        return [...prev, [x, y]];
      });
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);

      if (lassoPaths.length >= 3) {
        const worldPaths = lassoPaths.map(([x, y]) => screenToWorld(x, y));
        const closedPath = [...worldPaths, worldPaths[0]];

        const selectedPoints = points.filter(point => {
          const worldPoint = screenToWorld(point.x, point.y);
          return d3.polygonContains(closedPath, worldPoint);
        });

        if (selectedPoints.length > 0) {
          onSelection(selectedPoints);
        }
      }

      setLassoPaths([]);
    };

    const svgElement = svgRef.current;
    svgElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      svgElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [lassoPaths, isDragging, onSelection, points, screenToWorld]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-auto cursor-crosshair"
      width={viewportBounds.width}
      height={viewportBounds.height}
      style={{
        pointerEvents: 'all',
        touchAction: 'none'
      }}
    />
  );
};