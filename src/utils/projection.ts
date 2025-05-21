import { Point } from '../types/embedding';

export function createProjection(points: Point[], width: number, height: number): Point[] {
  if (!points || !Array.isArray(points) || points.length === 0) {
    console.error('Invalid points data:', points);
    return [];
  }

  // Validate all points have valid coordinates
  const validPoints = points.filter(point => {
    const isValid = point.embedding && 
                   Array.isArray(point.embedding) && 
                   point.embedding.length >= 2 &&
                   typeof point.embedding[0] === 'number' && 
                   typeof point.embedding[1] === 'number' &&
                   !isNaN(point.embedding[0]) && 
                   !isNaN(point.embedding[1]);
    
    if (!isValid) {
      console.error('Invalid point coordinates:', point);
    }
    return isValid;
  });

  if (validPoints.length === 0) {
    console.error('No valid points to project');
    return [];
  }

  const padding = 50;
  const availableWidth = width - (2 * padding);
  const availableHeight = height - (2 * padding);

  // Find min/max values from valid points' embeddings
  const minX = Math.min(...validPoints.map(p => p.embedding[0]));
  const maxX = Math.max(...validPoints.map(p => p.embedding[0]));
  const minY = Math.min(...validPoints.map(p => p.embedding[1]));
  const maxY = Math.max(...validPoints.map(p => p.embedding[1]));
  // console.log('minX:', minX, 'maxX:', maxX, 'minY:', minY, 'maxY:', maxY);
  // Calculate scales to fit points within available space
  const xRange = maxX - minX || 1;
  const yRange = maxY - minY || 1;
  const scale = Math.min(
    availableWidth / xRange,
    availableHeight / yRange
  );

 

  // Project points while preserving their original properties
  return validPoints.map(point => {
    const projectedX = padding + ((point.embedding[0] - minX) * scale);
    const projectedY = padding + ((point.embedding[1] - minY) * scale);


    return {
      ...point,
      x: projectedX,
      y: projectedY
    };
  });
}