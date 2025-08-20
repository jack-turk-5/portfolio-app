# Stage 1: Build the Angular application
FROM node:alpine AS build

# Set the working directory
WORKDIR /app

COPY . .
RUN npm ci && npm run build --omit=dev

# Stage 2: Serve the application with Caddy
FROM caddy:latest

# Copy the built application from the build stage
COPY --from=build /app/dist/portfolio-app/browser /usr/share/caddy/html

# Copy the Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile