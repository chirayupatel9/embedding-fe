import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Point } from '../types/embedding';

interface SelectionOverlayProps {
  points: Point[];
  onSelection: (selected: Point[]) => void;
  viewportBounds: { width: number; height: number };
}

export const SelectionOverlay: React.FC<SelectionOverlayProps> = ({
  points,
  onSelection,
  viewportBounds,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lassoPaths, setLassoPaths] = useState<[number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Draw lasso path
    if (lassoPaths.length > 0) {
      const lineGenerator = d3.line();
      svg.append('path')
        .attr('d', lineGenerator(lassoPaths))
        .attr('fill', 'none')
        .attr('stroke', '#666')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
    }

    const handleMouseDown = (event: any) => {
      setIsDragging(true);
      const [x, y] = d3.pointer(event);
      setLassoPaths([[x, y]]);
    };

    const handleMouseMove = (event: any) => {
      if (!isDragging) return;
      const [x, y] = d3.pointer(event);
      setLassoPaths(prev => [...prev, [x, y]]);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (lassoPaths.length < 3) return;

      const polygon = lassoPaths.map(([x, y]) => [x, y]);
      const selected = points.filter(point => 
        d3.polygonContains(polygon, [point.x, point.y])
      );

      onSelection(selected);
      setLassoPaths([]);
    };

    svg
      .on('mousedown', handleMouseDown)
      .on('mousemove', handleMouseMove)
      .on('mouseup', handleMouseUp);

    return () => {
      svg
        .on('mousedown', null)
        .on('mousemove', null)
        .on('mouseup', null);
    };
  }, [points, lassoPaths, isDragging, onSelection]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-auto"
      width={viewportBounds.width}
      height={viewportBounds.height}
      style={{ pointerEvents: 'all' }}
    />
  );
};