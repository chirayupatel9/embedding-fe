import React from 'react';
import { X } from 'lucide-react';
import { ImageDetails } from '../types/embedding';

interface ImageDetailsModalProps {
  details: ImageDetails | null;
  onClose: () => void;
}

export const ImageDetailsModal: React.FC<ImageDetailsModalProps> = ({ details, onClose }) => {
  if (!details) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Image Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Image ID</h3>
              <p className="mt-1 text-sm text-gray-900">{details.image_id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Document Details</h3>
              <pre className="mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded-lg overflow-auto">
                {JSON.stringify(details.document_details, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};