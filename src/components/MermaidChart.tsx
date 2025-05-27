import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import svgPanZoom from 'svg-pan-zoom';

// Ensure mermaid is initialized only once
if (!(window as any).__MERMAID_INITIALIZED__) {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'inherit',
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
    },
  });
  (window as any).__MERMAID_INITIALIZED__ = true;
}

const chartDefinition = `
graph TD
    subgraph Frontend Application
        EV[EmbeddingsVisualizer] --> |fetches data| ED[useEmbeddingsData Hook]
        ED --> |API call| BE[Backend API /embeddings]
        BE --> |returns| D[Data]
        D --> |contains| P[Points Array]
        D --> |contains| SM[Sprite Sheet Metadata]
        
        EV --> |projects points| PR[createProjection]
        PR --> |returns| PP[Projected Points]
        
        EV --> |renders| PIX[PixiRenderer]
        PIX --> |loads| SS[Sprite Sheet]
        PIX --> |creates| SP[Sprites]
        
        SP --> |on click| IM[ImageDetailsModal]
        IM --> |fetches| IMG[getImageDetails]
        IMG --> |API call| BE2[Backend /get-image/:id]
        BE2 --> |returns| BL[Image Blob]
        BL --> |creates| URL[Object URL]
        URL --> |displays in| IM
    end

    subgraph User Interactions
        PIX --> |enables| PAN[Pan Mode]
        PIX --> |enables| ZOOM[Zoom Controls]
        PIX --> |enables| LASSO[Lasso Selection]
        LASSO --> |triggers| SEL[Selection Overlay]
        SEL --> |updates| PP
    end

    subgraph Data Types
        Point[Point Type]
        Point --> |contains| PID[id]
        Point --> |contains| PXY[x, y coordinates]
        Point --> |contains| PCAT[category]
        Point --> |contains| PSP[spriteX, spriteY]
        Point --> |contains| PEMB[embedding]
        Point --> |contains| PORG[originalItem]
    end
`;

export const MermaidChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const panZoomInstance = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    const renderMermaid = async () => {
      if (chartRef.current) {
        try {
          // Render SVG as string
          const { svg } = await mermaid.render('mermaid-svg', chartDefinition);
          if (!isMounted) return;
          chartRef.current.innerHTML = svg;
          const svgEl = chartRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.removeAttribute('width');
            svgEl.removeAttribute('height');
            svgEl.style.width = '100%';
            svgEl.style.height = '100%';
            // Ensure viewBox exists
            if (!svgEl.getAttribute('viewBox')) {
              const bbox = svgEl.getBBox();
              svgEl.setAttribute('viewBox', `0 0 ${bbox.width} ${bbox.height}`);
            }
            panZoomInstance.current = svgPanZoom(svgEl, {
              zoomEnabled: true,
              controlIconsEnabled: true,
              fit: true,
              center: true,
              panEnabled: true,
              minZoom: 0.2,
              maxZoom: 10,
            });
          }
        } catch (error) {
          chartRef.current.innerHTML = '<p class="text-red-500">Error rendering chart</p>';
        }
      }
    };
    renderMermaid();
    return () => {
      isMounted = false;
      if (panZoomInstance.current) {
        panZoomInstance.current.destroy();
        panZoomInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      className="bg-white shadow rounded-lg p-4 sm:p-6"
      style={{ minHeight: '400px', width: '100%', height: '500px', overflow: 'auto' }}
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
        Application Architecture
      </h2>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}; 