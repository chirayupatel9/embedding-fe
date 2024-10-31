import React from 'react';
import { EmbeddingsVisualizer } from './components/EmbeddingsVisualizer';
import { Cpu } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Cpu className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Embeddings Visualizer
          </h1>
        </div>
        <EmbeddingsVisualizer />
      </div>
    </div>
  );
}

export default App;