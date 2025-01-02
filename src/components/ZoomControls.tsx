import React from 'react';
import { MinusCircle, PlusCircle } from 'lucide-react';

interface ZoomControlsProps {
  zoomLevel: number;
  minZoom: number;
  maxZoom: number;
  onZoomChange: (zoom: number) => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  minZoom,
  maxZoom,
  onZoomChange,
}) => {
  return (
    <div className="sticky bottom-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg w-fit ml-auto">
      <button
        onClick={() => onZoomChange(zoomLevel - 0.1)}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-200"
        disabled={zoomLevel <= minZoom}
      >
        <MinusCircle size={20} />
      </button>
      <span className="text-sm font-medium text-gray-600 min-w-[4rem] text-center">
        {Math.round(zoomLevel * 100)}%
      </span>
      <button
        onClick={() => onZoomChange(zoomLevel + 0.1)}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-200"
        disabled={zoomLevel >= maxZoom}
      >
        <PlusCircle size={20} />
      </button>
    </div>
  );
};