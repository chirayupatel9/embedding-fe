import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EmbeddingsVisualizer } from './components/EmbeddingsVisualizer';
import { About } from './components/About';
import { Cpu } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <header className="fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between h-16 py-2 sm:py-0">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <Cpu className="w-8 h-8 text-blue-600" />
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Embeddings Visualizer
                  </h1>
                </div>
                <nav className="flex items-center space-x-4">
                  <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm sm:text-base">
                    Home
                  </Link>
                  <Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm sm:text-base">
                    About
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1 pt-20 sm:pt-16 relative">
            <Routes>
              <Route path="/" element={<EmbeddingsVisualizer />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;