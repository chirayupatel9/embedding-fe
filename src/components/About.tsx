import React from 'react';
import { Cpu, Code, Terminal, Server, Download, Play, Upload } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            About Embeddings Visualizer
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            A powerful tool for visualizing and understanding embeddings
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
              What are Embeddings?
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Embeddings are numerical representations of data (like text, images, or audio) in a high-dimensional space. 
              They capture semantic relationships and patterns, making it easier to analyze and compare different pieces of data.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-600 space-y-2">
              <li>Interactive 3D visualization of embeddings</li>
              <li>Real-time data processing and analysis</li>
              <li>Customizable visualization parameters</li>
              <li>Intuitive user interface</li>
              <li>Support for various embedding formats</li>
              <li>Pan, zoom, and lasso selection tools</li>
              <li>Image details modal for selected points</li>
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
              How to Use
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Simply upload your embedding data or connect to your data source, and the visualizer will create an interactive 
              3D representation of your embeddings. You can rotate, zoom, and explore the visualization to understand the 
              relationships between different data points.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Getting Started
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Code className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Prerequisites</h3>
                  <ul className="list-disc list-inside text-base text-gray-600">
                    <li>Node.js (v16 or newer)</li>
                    <li>npm or yarn</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <Terminal className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Installation</h3>
                  <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 mb-2 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre">
                    npm install
                  </pre>
                  <p className="text-gray-600">or</p>
                  <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre">
                    yarn install
                  </pre>
                </div>
              </div>

              <div className="flex items-start">
                <Server className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Environment Setup</h3>
                  <p className="text-base text-gray-600 mb-2">Create a `.env` file in the project root:</p>
                  <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre">
                    VITE_API_URL=http://localhost:8000
                  </pre>
                </div>
              </div>

              <div className="flex items-start">
                <Play className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Development</h3>
                  <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 mb-2 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre">
                    npm run dev
                  </pre>
                  <p className="text-base text-gray-600">The app will be available at http://localhost:5173</p>
                </div>
              </div>

              <div className="flex items-start">
                <Download className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Production Build</h3>
                  <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 mb-2 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre">
                    npm run build
                  </pre>
                  <p className="text-base text-gray-600">Production files will be in the `dist/` directory</p>
                </div>
              </div>

              <div className="flex items-start">
                <Upload className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Deployment</h3>
                  <p className="text-base text-gray-600">
                    Upload the contents of the `dist/` directory to your static web server (e.g., Vercel, Netlify, GitHub Pages).
                    Ensure your backend API is accessible from the deployed frontend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 