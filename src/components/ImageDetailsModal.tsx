import React from 'react';
import { ImageDetails } from '../types/embedding';

export const ImageDetailsModal: React.FC<{ details: ImageDetails; onClose: () => void }> = ({ details, onClose }) => (
  <div className="modal bg-white p-4 rounded shadow-lg fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50">
    <button className="mb-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={onClose}>Close</button>
    {details.image_url && (
      <img src={details.image_url} alt="Selected" style={{ maxWidth: '100%', maxHeight: 400, display: 'block', margin: '0 auto 1rem auto' }} />
    )}
    {details.document_details && (
      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
        {JSON.stringify(details.document_details, null, 2)}
      </pre>
    )}
  </div>
);