import React from 'react';
import { Lasso, Hand, Move } from 'lucide-react';

interface ToolbarControlsProps {
  isLassoMode: boolean;
  isPanMode: boolean;
  onModeChange: (mode: 'pan' | 'lasso' | null) => void;
  onReset: () => void;
}

export const ToolbarControls: React.FC<ToolbarControlsProps> = ({
  isLassoMode,
  isPanMode,
  onModeChange,
  onReset,
}) => {
  return (
    <div className="sticky top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg w-fit mx-auto">
      <button
        onClick={() => onModeChange(isLassoMode ? null : 'lasso')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          isLassoMode
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <Lasso size={20} />
        {isLassoMode ? 'Exit Lasso' : 'Lasso Select'}
      </button>
      <button
        onClick={() => onModeChange(isPanMode ? null : 'pan')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          isPanMode
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <Hand size={20} />
        {isPanMode ? 'Exit Pan' : 'Pan Mode'}
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
      >
        <Move size={20} />
        Reset View
      </button>
    </div>
  );
};