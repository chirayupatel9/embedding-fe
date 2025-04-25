import React from 'react';
import { ImageDetails } from '../types/embedding';

export const SidebarImageDetails: React.FC<{ details: ImageDetails; onClose: () => void }> = ({ 
  details, 
  onClose 
}) => (
  <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-40 overflow-y-auto transform transition-transform duration-300 ease-in-out">
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Image Details</h3>
        <button 
          className="p-1 rounded-full hover:bg-gray-200" 
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {details.image_url && (
        <div className="mb-4">
          <img 
            src={details.image_url} 
            alt="Selected" 
            className="w-full object-contain rounded"
            style={{ maxHeight: 300 }}
          />
        </div>
      )}
      
      {details.document_details && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Document Details</h4>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
            {JSON.stringify(details.document_details, null, 2)}
          </pre>
        </div>
      )}
    </div>
  </div>
); 