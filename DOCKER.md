# Docker Setup for Life Insurance Backend

This project includes Docker configuration for both development and production environments using a single docker-compose file.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Development Mode (Default)

To run the application in development mode with hot reloading:

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### Production Mode

To run the application in production mode:

1. Edit `docker-compose.yml` and comment out the volume mounts:
   ```yaml
   volumes:
     # - ./src:/app/src
     # - ./package.json:/app/package.json
     - /app/node_modules
   ```

2. Change the command to production:
   ```yaml
   command: npm run start:prod
   ```

3. Build and start:
   ```bash
   docker-compose up --build
   ```

## Services

### Backend (NestJS)
- **Port**: 3001
- **Environment**: Development/Production
- **Features**: 
  - Hot reloading (dev mode)
  - TypeORM with PostgreSQL
  - REST API endpoints

### PostgreSQL Database
- **Port**: 5433 (host) -> 5432 (container)
- **Database**: life_insurance_db
- **Username**: postgres
- **Password**: 123456
- **Features**:
  - Persistent data storage
  - Health checks
  - Automatic initialization

## Environment Variables

The following environment variables are automatically set in the Docker containers:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=life_insurance_db
```

## Useful Commands

```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f postgres

# Stop services
docker-compose down

# Stop services and remove volumes
docker-compose down -v

# Rebuild and restart
docker-compose up --build --force-recreate

# Access database
docker exec -it life_insurance_db psql -U postgres -d life_insurance_db

# Access backend container
docker exec -it life_insurance_backend sh
```

## Development Workflow

1. Start the development environment:
   ```bash
   docker-compose up -d
   ```

2. Make changes to your code - they will be automatically reflected due to volume mounting

3. View logs to see any errors:
   ```bash
   docker-compose logs -f backend
   ```

4. Stop the environment:
   ```bash
   docker-compose down
   ```

## Production Deployment

1. Modify `docker-compose.yml` for production (see Production Mode section above)

2. Build and start production services:
   ```bash
   docker-compose up -d --build
   ```

3. The application will be available at `http://localhost:3001`

4. Database will be available at `localhost:5433`

## Troubleshooting

### Database Connection Issues
- Ensure the database container is healthy before the backend starts
- Check logs: `docker-compose logs postgres`

### Backend Issues
- Check logs: `docker-compose logs backend`
- Verify environment variables are set correctly
- Ensure all dependencies are installed

### Port Conflicts
- If ports 3001 or 5433 are already in use, modify the port mappings in docker-compose.yml 