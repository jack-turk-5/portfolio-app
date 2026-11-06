# Stage 1: Build the Angular application
FROM node:alpine AS angular_build

WORKDIR /app
COPY . . 
RUN npm ci && npm run build --omit=dev

# Stage 2: Final image with Python and Caddy
FROM python:3.13-slim

# Install Caddy
RUN apt-get update && \
    apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl gpg && \
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg && \
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list && apt-get update && \
    apt-get install -y caddy

# Set up the application directory
WORKDIR /app

# Copy the built Angular app
COPY --from=angular_build /app/dist/portfolio-app/browser /usr/share/caddy/html

# Copy the Python backend and install dependencies
COPY --from=angular_build /app/backend /app/backend
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy Caddy and bootstrapper configuration
COPY Caddyfile /etc/caddy/Caddyfile
COPY container/bootstrap.py /usr/local/bin/bootstrap.py

# Ensure the bootstrapper is executable
RUN chmod +x /usr/local/bin/bootstrap.py

# Expose the port Caddy listens on
EXPOSE 8081

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/bootstrap.py"]
