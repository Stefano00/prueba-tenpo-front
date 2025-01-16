
## README for Frontend

```markdown
# Frontend: Prueba Full Stack

## Description
This project serves as the frontend for the Tempo full-stack application, providing a user interface to manage transactions.

## Prerequisites
- Node.js
- npm
- Docker (optional)

## Setup

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
   If there are dependency conflicts:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Run the application:
   ```bash
   npm run start
   ```
3. Access the application at:
   ```
   http://localhost:3000/
   ```

### Using Docker
1. Build the image:
   ```bash
   docker build -t stefano00123/prueba-tenpo-fullstack:latest .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:80 stefano00123/prueba-tenpo-fullstack:latest
   ```

## Docker Hub
Pull the image from Docker Hub:
```bash
docker pull stefano00123/prueba-tenpo-fullstack:latest
```
```