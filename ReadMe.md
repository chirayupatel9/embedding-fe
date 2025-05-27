```mermaid
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
```

---

## How to Run and Deploy

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set environment variables

Create a `.env` file in the project root (if not already present):

```
VITE_API_URL=http://localhost:8000
```

Adjust the URL to point to your backend API.

### 4. Run in development mode

```bash
npm run dev
# or
yarn dev
```

The app will be available at http://localhost:5173 (or as shown in your terminal).

### 5. Build for production

```bash
npm run build
# or
yarn build
```

The production-ready files will be in the `dist/` directory.

### 6. Preview the production build locally

```bash
npm run preview
# or
yarn preview
```

### 7. Deploy

- Upload the contents of the `dist/` directory to your static web server (e.g., Vercel, Netlify, GitHub Pages, or your own server).
- Make sure your backend API is accessible from the deployed frontend.