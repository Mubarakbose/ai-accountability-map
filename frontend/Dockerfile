# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with cache optimization
RUN npm ci --prefer-offline --no-audit

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage - Serve via Nginx
FROM nginx:alpine

# Install curl for health check
RUN apk add --no-cache curl

# Copy custom nginx config with /api proxy
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
