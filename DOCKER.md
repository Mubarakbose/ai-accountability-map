# Docker Setup Guide for AI Accountability Map

This guide provides comprehensive instructions for building, running, and managing the application using Docker.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Docker Architecture](#docker-architecture)
4. [Configuration](#configuration)
5. [Common Commands](#common-commands)
6. [Advanced Usage](#advanced-usage)
7. [Troubleshooting](#troubleshooting)

## Installation

### Docker Desktop Setup

1. **Download Docker Desktop**
   - [Windows & Mac](https://www.docker.com/products/docker-desktop)
   - [Ubuntu/Linux](https://docs.docker.com/engine/install/ubuntu/)

2. **Verify Installation**
   ```bash
   docker --version
   docker compose version
   ```

3. **Grant Permissions (Linux only)**
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Mubarakbose/ai-accountability-map.git
cd ai-accountability-map
```

### 2. Prepare Environment Files

```bash
# Copy backend environment template
cp backend/.env.example backend/.env.docker

# (Optional) Copy frontend environment template
cp frontend/.env.example frontend/.env.local
```

### 3. Build and Start Services

```bash
# Build images and start containers
docker compose up -d --build

# Or separately:
docker compose build
docker compose up -d
```

### 4. Access the Application

| Service | URL |
|---------|-----|
| Web UI | http://localhost |
| API Docs (Swagger) | http://localhost/api/docs |
| API Docs (ReDoc) | http://localhost/api/redoc |

### 5. Verify Everything Works

```bash
# Check all services are running
docker compose ps

# Test the API
curl http://localhost/api/docs
```

## Docker Architecture

### Service Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐      ┌──────────────┐               │
│  │  Nginx       │      │  FastAPI     │               │
│  │  (Port 80)   │─────▶│  (Port 8000) │               │
│  │              │      │              │               │
│  │ React Build  │      │  Python 3.10 │               │
│  └──────────────┘      └──────┬───────┘               │
│                                │                       │
│                        ┌───────▼────────┐             │
│                        │  PostgreSQL    │             │
│                        │  (Port 5432)   │             │
│                        │                │             │
│                        │  ai_acc DB     │             │
│                        └────────────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Container Details

| Container | Image | Port | Role |
|-----------|-------|------|------|
| **aiacc-frontend** | `nginx:alpine` | 80 | Web server for React UI |
| **aiacc-backend** | `python:3.10-slim` | 8000 | FastAPI application server |
| **aiacc-db** | `postgres:15-alpine` | 5432 | Data persistence |

## Configuration

### Environment Variables

#### Backend (.env.docker)

```env
DATABASE_URL=postgresql://aimap_user:root@db:5432/ai_accountability
ENV=production
API_HOST=0.0.0.0
API_PORT=8000
FRONTEND_URL=http://localhost
MAX_UPLOAD_SIZE=52428800
UPLOAD_DIR=/app/uploads
```

#### Frontend (.env.local) - Optional

```env
REACT_APP_API_URL=http://localhost/api
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_DEBUG_MODE=false
```

### Database Configuration

Default credentials in `docker-compose.yml`:
- **User:** `aimap_user`
- **Password:** `root`
- **Database:** `ai_accountability`
- **Host:** `db` (within Docker network)
- **Port:** `5432`

To change these, edit `docker-compose.yml`:

```yaml
db:
  environment:
    POSTGRES_USER: your_user
    POSTGRES_PASSWORD: your_password
    POSTGRES_DB: your_database
```

## Common Commands

### Lifecycle Management

```bash
# Start services in background
docker compose up -d

# Start services with output (Ctrl+C to stop)
docker compose up

# Stop all services
docker compose down

# Stop and remove volumes (data will be deleted)
docker compose down -v

# Restart services
docker compose restart

# Restart specific service
docker compose restart backend
```

### Building & Images

```bash
# Build all images
docker compose build

# Build without cache (fresh build)
docker compose build --no-cache

# Build specific service
docker compose build backend

# List built images
docker images | grep aiacc
```

### Viewing Logs

```bash
# Follow all service logs
docker compose logs -f

# Follow specific service logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db

# View last 100 lines
docker compose logs --tail=100

# View logs since specific time
docker compose logs --since 10m
```

### Debugging

```bash
# Execute command in running container
docker compose exec backend bash
docker compose exec frontend sh

# Check service status
docker compose ps

# Inspect specific container
docker inspect aiacc-backend

# View container resource usage
docker stats

# Check container logs for errors
docker compose logs backend | grep -i error
```

## Advanced Usage

### Scaling Services

To run multiple backend instances (if needed):

```yaml
# In docker-compose.yml
services:
  backend:
    deploy:
      replicas: 2
```

Then rebuild:
```bash
docker compose up -d --build
```

### Custom Port Mapping

Edit `docker-compose.yml` to use different host ports:

```yaml
services:
  frontend:
    ports:
      - "8080:80"      # Access at http://localhost:8080
  db:
    ports:
      - "5433:5432"    # Connect to localhost:5433
```

### Persistent Volumes

Data is automatically persisted in the `db-data` volume. To backup:

```bash
# Backup database
docker compose exec db pg_dump -U aimap_user ai_accountability > backup.sql

# Restore database
cat backup.sql | docker compose exec -T db psql -U aimap_user ai_accountability
```

### Network Communication

Services can communicate using their service names:
- Frontend to Backend: `http://backend:8000` (within network)
- Backend to Database: `postgresql://aimap_user:root@db:5432/ai_accountability`

### Development with Hot Reload

For development, use the dev Dockerfile in frontend:

```bash
# Edit docker-compose.yml to use Dockerfile.dev instead
# Then run with volume mounts for hot reload
docker compose -f docker-compose.dev.yml up
```

## Troubleshooting

### Port Conflicts

**Error:** `bind: address already in use`

```bash
# Find process using the port
lsof -i :80         # macOS/Linux
netstat -ano | findstr :80  # Windows

# Use different port in docker-compose.yml
ports:
  - "8000:80"
```

### Database Connection Issues

```bash
# Check database is running
docker compose ps

# View database logs
docker compose logs db

# Restart database
docker compose restart db

# Test connection from backend container
docker compose exec backend psql -h db -U aimap_user -d ai_accountability
```

### Out of Disk Space

```bash
# Clean up unused Docker resources
docker system prune -a --volumes

# Remove specific volume
docker volume rm ai-accountability_db-data
```

### Build Failures

```bash
# Full clean rebuild
docker compose down -v
docker system prune -a
docker compose up -d --build

# Check build output
docker compose build --progress=plain backend
```

### Container Exits Immediately

```bash
# Check exit code and error message
docker compose logs backend

# Inspect the container
docker inspect aiacc-backend

# Try rebuilding
docker compose up -d --build
```

### Memory/Performance Issues

```bash
# Check resource usage
docker stats

# Limit container memory (in docker-compose.yml)
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

## Performance Optimization

1. **Use Alpine Images:** Already implemented for lightweight containers
2. **Multi-stage Builds:** Backend uses multi-stage build to reduce image size
3. **Layer Caching:** `npm ci` in frontend for faster installs
4. **Health Checks:** Included to ensure service readiness

## Security Notes

⚠️ **Important for Production:**

1. Change default database credentials:
   ```yaml
   POSTGRES_USER: secure_username
   POSTGRES_PASSWORD: generate_strong_password
   ```

2. Use secrets management:
   ```bash
   docker secret create db_password password.txt
   ```

3. Enable SSL/TLS for production deployment

4. Use environment variable secrets:
   ```bash
   docker compose --env-file .env.prod up -d
   ```

5. Never commit `.env` or secrets to version control

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)

---

For issues or questions, please refer to the main [README.md](README.md) or open an issue on the repository.
