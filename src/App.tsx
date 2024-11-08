import React from 'react';
import { EmbeddingsVisualizer } from './components/EmbeddingsVisualizer';
import { Cpu } from 'lucide-react';

function App() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="fixed top-4 left-4 z-10 flex items-center gap-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
        <Cpu className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          Embeddings Visualizer
        </h1>
      </div>
      <EmbeddingsVisualizer />
    </div>
  );
}

export default App;