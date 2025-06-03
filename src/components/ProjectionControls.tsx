import React from 'react';
import { API_CONFIG } from '../services/api/config';

interface ProjectionControlsProps {
  projectionType: string;
  onProjectionTypeChange: (type: string) => void;
  modelType: string;
  onModelTypeChange: (type: string) => void;
}

export const ProjectionControls: React.FC<ProjectionControlsProps> = ({
  projectionType,
  onProjectionTypeChange,
  modelType,
  onModelTypeChange,
}) => {
  return (
    <div className="absolute top-19 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg w-fit ml-auto">
      <select
        value={modelType}
        onChange={e => onModelTypeChange(e.target.value)}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-200"
      >
        <option value={API_CONFIG.MODEL_TYPES.XCITE}>XCite</option>
        <option value={API_CONFIG.MODEL_TYPES.RESNET50}>ResNet50</option>
      </select>
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
