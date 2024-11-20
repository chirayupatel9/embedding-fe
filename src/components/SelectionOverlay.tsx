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
  const [highlightedPoints, setHighlightedPoints] = useState<Point[]>([]);

  const updateHighlightedPoints = useCallback((paths: [number, number][]) => {
    if (paths.length > 2) {
      const closedPath = [...paths, paths[0]];
      const polygon = closedPath.map(([x, y]) => [x, y]);
      
      const viewport = viewportRef.current;
      const selected = points.filter(point => {
        // Transform point coordinates based on viewport
        const transformedX = (point.x * viewport!.scale.x + viewport!.x);
        const transformedY = (point.y * viewport!.scale.y + viewport!.y);
        return d3.polygonContains(polygon, [transformedX, transformedY]);
      });

      setHighlightedPoints(selected);
    } else {
      setHighlightedPoints([]);
    }
  }, [points, viewportRef]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    if (lassoPaths.length > 2) {
      const lineGenerator = d3.line().curve(d3.curveBasisClosed);
      const closedPath = [...lassoPaths, lassoPaths[0]];
      
      // Draw fill area
      svg.append('path')
        .attr('d', lineGenerator(closedPath))
        .attr('fill', '#3b82f6')
        .attr('fill-opacity', 0.1)
        .attr('stroke', 'none');

      // Draw outline with animation
      svg.append('path')
        .attr('d', lineGenerator(closedPath))
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-linecap', 'round')
        .style('animation', 'dash 1s linear infinite');
    }

    const handleMouseDown = (event: any) => {
      const [x, y] = d3.pointer(event);
      setLassoPaths([[x, y]]);
      setIsDragging(true);
      setHighlightedPoints([]);
    };

    const handleMouseMove = (event: any) => {
      if (!isDragging) return;
      const [x, y] = d3.pointer(event);
      
      setLassoPaths(prev => {
        const lastPoint = prev[prev.length - 1];
        if (lastPoint) {
          const [lastX, lastY] = lastPoint;
          const distance = Math.hypot(x - lastX, y - lastY);
          if (distance < 5) return prev;
        }
        const newPaths = [...prev, [x, y]] as [number, number][];
        updateHighlightedPoints(newPaths);
        return newPaths;
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      if (lassoPaths.length < 3) {
        setLassoPaths([]);
        setHighlightedPoints([]);
        return;
      }

      onSelection(highlightedPoints);
      setLassoPaths([]);
      setHighlightedPoints([]);
    };

    svg
      .on('mousedown', handleMouseDown)
      .on('mousemove', handleMouseMove)
      .on('mouseup', handleMouseUp)
      .on('mouseleave', () => {
        if (isDragging) {
          handleMouseUp();
        }
      });

    return () => {
      svg
        .on('mousedown', null)
        .on('mousemove', null)
        .on('mouseup', null)
        .on('mouseleave', null);
    };
  }, [lassoPaths, isDragging, onSelection, highlightedPoints, updateHighlightedPoints]);

  return (
    <>
      <style>
        {`
          @keyframes dash {
            to {
              stroke-dashoffset: -10;
            }
          }
        `}
      </style>
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-auto cursor-crosshair"
        width={viewportBounds.width}
        height={viewportBounds.height}
        style={{ pointerEvents: 'all' }}
      />
    </>
  );
};