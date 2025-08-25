# Stage 1: Build the Angular application
FROM node:alpine AS build

WORKDIR /app
COPY . .
RUN npm ci && npm run build --omit=dev

# Stage 2: Setup Python backend
FROM python:3.13-slim AS python_backend

WORKDIR /app
COPY --from=angular_build /app/backend /app/backend
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Stage 3: Final image with Caddy
FROM caddy:latest

# Copy the built Angular app
COPY --from=angular_build /app/dist/portfolio-app/browser /usr/share/caddy
# Copy the Python backend and dependencies
COPY --from=python_backend /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=python_backend /app/backend /app/backend
# Copy Caddy and bootstrapper configuration
COPY Caddyfile /etc/caddy/Caddyfile
COPY container/bootstrap.py /usr/local/bin/bootstrap.py

# Ensure the bootstrapper is executable
RUN chmod +x /usr/local/bin/bootstrap.py

# Expose the port Caddy listens on
EXPOSE 8081

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/bootstrap.py"]
