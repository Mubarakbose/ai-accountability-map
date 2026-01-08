# 🚀 Quick Reference Guide - Docker Commands

## Essential Commands

### Getting Started
```bash
# Clone the repository
git clone https://github.com/Mubarakbose/ai-accountability-map.git
cd ai-accountability-map

# Copy environment template
cp backend/.env.example backend/.env.docker

# Build and start all services
docker compose up -d --build

# Access the application
# Web UI: http://localhost
# API Docs: http://localhost/api/docs
```

## Frequently Used Commands

### Service Management
```bash
# Start services in background
docker compose up -d

# Stop all services
docker compose down

# Restart a service
docker compose restart backend

# View service status
docker compose ps
```

### Viewing Logs
```bash
# All service logs (follow mode)
docker compose logs -f

# Specific service logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db

# Last N lines
docker compose logs -f backend --tail=50
```

### Debugging
```bash
# Access backend container shell
docker compose exec backend bash

# Access frontend container shell
docker compose exec frontend sh

# Access database container shell
docker compose exec db bash

# Check container resource usage
docker stats
```

### Database Access
```bash
# Access PostgreSQL directly
docker compose exec db psql -U aimap_user -d ai_accountability

# Backup database
docker compose exec db pg_dump -U aimap_user ai_accountability > backup.sql

# Restore database
cat backup.sql | docker compose exec -T db psql -U aimap_user ai_accountability
```

## Rebuilding & Cleanup

### Clean Rebuild
```bash
# Remove and rebuild everything
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

### Remove Everything
```bash
# Remove all containers and volumes (WARNING: data will be deleted!)
docker compose down -v

# Remove all Docker resources
docker system prune -a --volumes
```

## Configuration

### Change Database Credentials
Edit `docker-compose.yml` and update:
```yaml
environment:
  POSTGRES_USER: new_username
  POSTGRES_PASSWORD: new_password
  POSTGRES_DB: new_database_name
```

### Change Port
Edit `docker-compose.yml`:
```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Access at http://localhost:8080
```

### Add Environment Variables
Edit `backend/.env.docker` and add your variables

## Troubleshooting

### Service won't start
```bash
# Check logs
docker compose logs backend

# Rebuild
docker compose build --no-cache backend
```

### Port already in use
```bash
# Change port in docker-compose.yml or kill existing process
# Find process: lsof -i :80 (macOS/Linux) or netstat -ano | findstr :80 (Windows)
```

### Database connection error
```bash
# Restart database
docker compose restart db

# Check database health
docker compose logs db
```

### Out of disk space
```bash
# Clean unused resources
docker system prune -a
```

## Service Information

| Service | Container | Port | Access Point |
|---------|-----------|------|--------------|
| Frontend | aiacc-frontend | 80 | http://localhost |
| Backend | aiacc-backend | 8000 | http://localhost/api |
| Database | aiacc-db | 5432 | Internal only |
| API Docs | - | 80 | http://localhost/api/docs |

## Important Credentials

**Database (Default)**
- User: `aimap_user`
- Password: `root`
- Database: `ai_accountability`

⚠️ **Change these for production!**

## Help & Documentation

- **Quick Start:** README.md
- **Detailed Guide:** DOCKER.md
- **Configuration:** .env.example or backend/.env.example
- **Implementation Details:** DOCKER_IMPLEMENTATION.md

## One-Liner Commands

```bash
# Check all is running
docker compose ps && docker compose logs -f --tail=5

# Rebuild and start fresh
docker compose down -v && docker compose up -d --build

# View API documentation
open http://localhost/api/docs  # macOS
xdg-open http://localhost/api/docs  # Linux
start http://localhost/api/docs  # Windows

# Quick health check
curl http://localhost/api/docs
```

---

**For more detailed information, see [DOCKER.md](DOCKER.md)**
