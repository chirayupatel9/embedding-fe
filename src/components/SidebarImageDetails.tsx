import React from 'react';
import { ImageDetails } from '../types/embedding';
import * as PIXI from 'pixi.js';
import { JsonViewer } from './JsonViewer';

export const SidebarImageDetails: React.FC<{ 
  details: ImageDetails; 
  onClose: () => void;
  spriteTexture?: PIXI.Texture;
  spriteX?: number;
  spriteY?: number;
  spriteWidth?: number;
  spriteHeight?: number;
}> = ({ 
  details, 
  onClose,
  spriteTexture,
  spriteX = 0,
  spriteY = 0,
  spriteWidth = 32,
  spriteHeight = 32
}) => {
  // Get all metadata keys except for image_data to avoid duplicating large base64 strings
  const metadataKeys = Object.keys(details).filter(key => key !== 'image_data');
  
  // Create a sprite canvas ref
  const spriteCanvasRef = React.useRef<HTMLDivElement>(null);
  
  // Setup sprite rendering
  React.useEffect(() => {
    if (!spriteCanvasRef.current || !spriteTexture) return;
    
    // Clear any previous content
    while (spriteCanvasRef.current.firstChild) {
      spriteCanvasRef.current.removeChild(spriteCanvasRef.current.firstChild);
    }
    
    // Create a small PIXI application to render the sprite
    const app = new PIXI.Application({
      width: 100,
      height: 100,
      backgroundColor: 0xf5f5f5,
      antialias: true,
    });
    
    spriteCanvasRef.current.appendChild(app.view as unknown as Node);
    
    // Create the sprite
    const sprite = new PIXI.Sprite(
      new PIXI.Texture(
        spriteTexture.baseTexture,
        new PIXI.Rectangle(
          spriteX * spriteWidth,
          spriteY * spriteHeight,
          spriteWidth,
          spriteHeight
        )
      )
    );
    
    // Center and scale the sprite
    sprite.anchor.set(0.5);
    sprite.scale.set(2);
    sprite.position.set(app.screen.width / 2, app.screen.height / 2);
    
    // Add to stage
    app.stage.addChild(sprite);
    
    // Cleanup
    return () => {
      app.destroy(true, { children: true });
    };
  }, [spriteTexture, spriteX, spriteY, spriteWidth, spriteHeight]);
  
  return (
    <div className="fixed right-0 top-0 h-full w-[550px] bg-white shadow-xl z-40 overflow-y-auto transform transition-all duration-300 ease-in-out rounded-l-2xl">
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
      
      <div className="p-2">
        {/* Image Preview */}
        {details.image_data && (
          <div className="mb-6 bg-white rounded-xl overflow-hidden shadow-md">
            <h4 className="text-sm font-medium text-gray-700 px-4 pt-3 pb-2">Full Image</h4>
            <img 
              src={`data:${details.content_type};base64,${details.image_data}`}
              alt={details.filename || 'Image'} 
              className="w-full rounded-xl object-contain"
              style={{ maxHeight: 240 }}
            />
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 truncate" title={details.filename}>
                {details.filename}
              </h4>1
            </div>
          </div>
        )}
        
        {/* Metadata */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Metadata</h4>
            <div className="space-y-3">
              {metadataKeys.map(key => (
                <div key={key} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <p className="text-gray-500 text-xs mb-1 font-medium uppercase">{key}:</p>
                  <div className="font-medium break-words">
                    {typeof details[key] === 'object' ? (
                      <div className="bg-gray-50 p-3 rounded-lg overflow-x-auto border border-gray-100">
                        <JsonViewer data={details[key]} />
                      </div>
                    ) : (
                      String(details[key])
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {details.document_details && (
            <div className="bg-white rounded-xl shadow-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Additional Metadata</h4>
              <div className="bg-gray-50 p-3 rounded-lg overflow-x-auto border border-gray-100">
                <JsonViewer data={details.document_details} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 