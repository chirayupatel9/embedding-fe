import React from 'react';
import { Cpu, Code, Terminal, Server, Download, Play, Upload, Database } from 'lucide-react';
import { MermaidChart } from './MermaidChart';
import mermaid from 'mermaid';

const backendMermaid = `graph TD
    subgraph Frontend["Frontend - React/TypeScript"]
        FE["Embeddings App"]
        UI["User Interface"]
    end

    subgraph Backend["Backend - FastAPI"]
        API["API Endpoints"]
        FS["GridFS"]
        DB["MongoDB"]
        SPRITE["Sprite Sheet Generator"]
    end

    subgraph DataFlow["Data Flow"]
        Upload["Upload Images & Metadata"]
        Process["Process Data"]
        Visualize["Visualize Embeddings"]
    end

    %% Frontend to Backend connections
    FE -->|"HTTP Requests"| API
    UI -->|"User Interactions"| FE

    %% Backend internal connections
    API -->|"Store Images"| FS
    API -->|"Store Metadata"| DB
    API -->|"Generate"| SPRITE
    SPRITE -->|"Save"| FS
    SPRITE -->|"Save Metadata"| DB

    %% Data Flow connections
    Upload -->|"POST /api/upload-images-with-metadata"| API
    Process -->|"GET /api/embeddings"| API
    Visualize -->|"GET /api/get-image"| API

    %% API Endpoints
    subgraph Endpoints["API Endpoints"]
        UploadEP["/api/upload-images-with-metadata"]
        EmbeddingsEP["/api/embeddings"]
        GetImageEP["/api/get-image/{image_id}"]
        GetAllEP["/api/get-all-images"]
        GetDetailsEP["/api/get-image-details/{image_id}"]
    end

    %% Data Storage
    subgraph Storage["Storage"]
        Images["GridFS Images"]
        Metadata["MongoDB Documents"]
        SpriteSheet["Sprite Sheet"]
    end

    %% Connect endpoints to storage
    UploadEP --> Images
    UploadEP --> Metadata
    EmbeddingsEP --> SpriteSheet
    GetImageEP --> Images
    GetAllEP --> Images
    GetDetailsEP --> Metadata

    %% Style
    classDef frontend fill:#f9f,stroke:#333,stroke-width:2px
    classDef backend fill:#bbf,stroke:#333,stroke-width:2px
    classDef storage fill:#bfb,stroke:#333,stroke-width:2px
    classDef endpoint fill:#ffd,stroke:#333,stroke-width:2px

    class FE,UI frontend
    class API,FS,DB,SPRITE backend
    class Images,Metadata,SpriteSheet storage
    class UploadEP,EmbeddingsEP,GetImageEP,GetAllEP,GetDetailsEP endpoint`;

const BackendMermaidChart: React.FC = () => {
  const chartRef = React.useRef<HTMLPreElement>(null);
  React.useEffect(() => {
    if (chartRef.current) {
      try {
        mermaid.init(undefined, chartRef.current);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error rendering backend Mermaid chart:', error);
        chartRef.current.innerHTML = '<p class="text-red-500">Error loading backend chart</p>';
      }
    }
  }, []);
  return (
    <pre
      ref={chartRef}
      className="mermaid overflow-x-auto"
      style={{ minHeight: '400px' }}
    >
      {backendMermaid}
    </pre>
  );
};

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

          <MermaidChart />

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

          {/* Backend Section */}
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-green-600" /> Backend
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-gray-700">
              <div>
                <strong>Extracting data from datafed:</strong>
                <ul className="list-disc list-inside ml-5">
                  <li>If you have data locally, copy the folder path and use it for generating embeddings.</li>
                  <li>To extract from datafed, adjust your environment variables according to your datafed configuration.</li>
                  <li><b>Must have a globus container running.</b> If not, check the documentation for setup.</li>
                  <li>Run: <code className="bg-gray-100 px-1 py-0.5 rounded">python datafed_extractor.py</code></li>
                </ul>
              </div>
              <div>
                <strong>Initialize MongoDB with Docker:</strong>
                <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre mb-2">
{`docker run --name mongodb \
  -p 27017:27017 \
  --restart unless-stopped \
  -d mongodb/mongodb-community-server:latest`}
                </pre>
              </div>
              <div>
                <strong>Install Python dependencies:</strong>
                <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre mb-2">
{`pip install -r requirements.txt`}
                </pre>
              </div>
              <div>
                <strong>Run the backend server locally:</strong>
                <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre mb-2">
{`python app.py`}
                </pre>
              </div>
            </div>
            <div className="mt-6">
              <BackendMermaidChart />
            </div>
            <div className="space-y-4 text-base sm:text-lg text-gray-700 mt-6">
              <div>
                <strong>Docker Setup:</strong>
                <ol className="list-decimal list-inside ml-5">
                  <li>Clone the repository</li>
                  <li>Navigate to the project directory</li>
                  <li>Run:
                    <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre mb-2">
{`docker-compose -f docker-compose.yml up --build`}
                    </pre>
                  </li>
                </ol>
                <ul className="list-disc list-inside ml-5">
                  <li>Mounts the local code directory into the container for hot-reloading</li>
                  <li>Runs with debug mode enabled</li>
                  <li>Uses a non-authenticated MongoDB instance</li>
                </ul>
              </div>
              <div>
                <strong>Once app is running:</strong>
                <ul className="list-disc list-inside ml-5">
                  <li>To load/upload data with folder path of metadata and images:
                    <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre mb-2">
{`/api/upload-images`}
                    </pre>
                  </li>
                  <li>Then run the following API with method as UMap and TSNE:
                    <pre className="bg-gray-100 p-2 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre mb-2">
{`/api/make_reduction/{method}`}
                    </pre>
                  </li>
                  <li>Later, everything will be handled in the UI.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}; 