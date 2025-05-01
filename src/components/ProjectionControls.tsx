import React from 'react';

interface ProjectionControlsProps {
  projectionType: string;
  onProjectionTypeChange: (type: string) => void;
}

export const ProjectionControls: React.FC<ProjectionControlsProps> = ({
  projectionType,
  onProjectionTypeChange,
}) => {
  return (
    <div className="absolute top-19 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg w-fit ml-auto">
      <select
        value={projectionType}
        onChange={e => onProjectionTypeChange(e.target.value)}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-200"
      >
        <option value="tsne">t-SNE</option>
        <option value="umap">UMAP</option>
      </select>
    </div>
  );
};
