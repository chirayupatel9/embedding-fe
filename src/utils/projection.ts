import { Point } from '../types/embedding';

export function createProjection(points: Point[], width: number, height: number): Point[] {
  const padding = 50;
  const availableWidth = width - (2 * padding);
  const availableHeight = height - (2 * padding);

  // Find min/max values
  const minX = Math.min(...points.map(p => p.x));
  const maxX = Math.max(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));
  const maxY = Math.max(...points.map(p => p.y));
  console.log(minX,minY,maxX,maxY)
  // Calculate scales to fit points within available space
  const xRange = maxX - minX || 1;
  const yRange = maxY - minY || 1;
  const scale = Math.min(
    availableWidth / xRange,
    availableHeight / yRange
  );
console.log("scale",scale,availableWidth / xRange);

  // Project points while preserving their original properties
  return points.map(point => ({
    ...point,
    x: padding + ((point.x - minX) * (availableWidth / xRange)),
    y: padding + ((point.y - minY) * scale),
    originalX: point.x,
    originalY: point.y
  }));
}