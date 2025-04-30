FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Expose port for development server
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"] 