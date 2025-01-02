import React from 'react';
import { Point } from '../types/embedding';

interface SelectionInfoProps {
  displayedPoints: Point[];
}

export const SelectionInfo: React.FC<SelectionInfoProps> = ({ displayedPoints }) => {
  const categories = Array.from(new Set(displayedPoints.map(p => p.category)));

  return (
    <div className="sticky bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg w-fit">
      <div className="text-sm font-medium text-gray-800 mb-2">
        Showing projection of {displayedPoints.length} items
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <span
            key={category}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};