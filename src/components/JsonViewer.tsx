import React, { useState } from 'react';

type JsonViewerProps = {
  data: any;
  initialExpanded?: boolean;
  depth?: number;
  maxDepth?: number;
};

export const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  initialExpanded = true,
  depth = 0,
  maxDepth = 3,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded && depth < 2);
  
  const getType = (value: any): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  };

  const getValueColor = (type: string): string => {
    switch (type) {
      case 'string': return 'text-green-600';
      case 'number': return 'text-blue-600';
      case 'boolean': return 'text-purple-600';
      case 'null': return 'text-gray-500';
      default: return 'text-gray-800';
    }
  };

  const formatValue = (value: any, type: string): React.ReactNode => {
    switch (type) {
      case 'string': return <span className="text-green-600">"{value}"</span>;
      case 'number': return <span className="text-blue-600">{value}</span>;
      case 'boolean': return <span className="text-purple-600">{String(value)}</span>;
      case 'null': return <span className="text-gray-500">null</span>;
      case 'undefined': return <span className="text-gray-500">undefined</span>;
      default: return <span>{String(value)}</span>;
    }
  };

  const renderObject = (obj: Record<string, any> | any[]) => {
    const isArray = Array.isArray(obj);
    const isEmpty = Object.keys(obj).length === 0;
    
    if (isEmpty) {
      return isArray ? <span>[]</span> : <span>{'{}'}</span>;
    }

    if (depth >= maxDepth) {
      return (
        <span className="text-gray-600 italic">
          {isArray ? '[...]' : '{...}'}
        </span>
      );
    }
    
    if (!isExpanded) {
      return (
        <span 
          className="text-gray-600 cursor-pointer hover:underline hover:text-blue-500"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(true);
          }}
        >
          {isArray ? `[...] (${Object.keys(obj).length} items)` : `{...} (${Object.keys(obj).length} properties)`}
        </span>
      );
    }

    return (
      <div className="pl-4 border-l border-gray-200">
        {Object.entries(obj).map(([key, value], index) => {
          const type = getType(value);
          const isComplex = type === 'object' || type === 'array';
          
          return (
            <div key={key} className="mt-1">
              <div className="flex items-start">
                <span className="mr-1 font-medium text-gray-700">
                  {isArray ? index : `"${key}"`}:
                </span>
                {isComplex ? (
                  <div>
                    <span onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
                      {type === 'array' ? '[' : '{'}
                    </span>
                    <JsonViewer 
                      data={value} 
                      initialExpanded={initialExpanded} 
                      depth={depth + 1}
                      maxDepth={maxDepth}
                    />
                    <span>{type === 'array' ? ']' : '}'}</span>
                  </div>
                ) : (
                  formatValue(value, type)
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const type = getType(data);
  
  if (type === 'object' || type === 'array') {
    return (
      <div className="json-viewer text-sm">
        <div 
          className="flex cursor-pointer hover:bg-gray-50 py-1 px-1 rounded-md -ml-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="mr-1 text-gray-600 transition-transform w-4">
            {isExpanded ? '▼' : '▶'}
          </span>
          <span className={`${type === 'array' ? 'text-orange-600' : 'text-gray-800'} font-medium`}>
            {type === 'array' ? 'Array' : 'Object'}
            <span className="text-gray-500 font-normal ml-1">
              ({Object.keys(data).length} {type === 'array' ? 'items' : 'properties'})
            </span>
          </span>
        </div>
        {renderObject(data)}
      </div>
    );
  }

  return formatValue(data, type);
}; 