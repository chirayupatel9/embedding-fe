import React from 'react';
import { ImageDetails } from '../types/embedding';

export const SidebarImageDetails: React.FC<{ details: ImageDetails; onClose: () => void }> = ({ 
  details, 
  onClose 
}) => (
  <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-40 overflow-y-auto transform transition-all duration-300 ease-in-out rounded-l-2xl">
    <div className="sticky top-0 z-10 bg-blue-600 text-white px-6 py-4 shadow-md rounded-tl-2xl">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Image Details</h3>
        <button 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
    
    <div className="p-6">
      {details.image_url && (
        <div className="mb-6 bg-white rounded-xl overflow-hidden shadow-md">
          <img 
            src={details.image_url} 
            alt="Selected" 
            className="w-full object-contain"
            style={{ maxHeight: 300 }}
          />
        </div>
      )}
      
      {details.document_details && (
        <div className="mt-4 bg-white rounded-xl shadow-md p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Document Details</h4>
          <div className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto border border-gray-100">
            <pre className="text-gray-800">
              {JSON.stringify(details.document_details, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  </div>
); 