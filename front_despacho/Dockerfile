# ── STAGE 1: build ──────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependencias primero (optimiza cache de capas)
COPY package*.json ./
RUN npm ci --only=production=false

# Copiar código y compilar
COPY . .
RUN npm run build

# ── STAGE 2: serve ──────────────────────────────────
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Limpiar nginx default y copiar build
RUN rm -rf ./*
COPY --from=builder /app/dist .

# Copiar config de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ejecutar como usuario no-root
RUN chown -R nginx:nginx /usr/share/nginx/html     && chmod -R 755 /usr/share/nginx/html     && chown -R nginx:nginx /var/cache/nginx     && chown -R nginx:nginx /var/log/nginx     && touch /var/run/nginx.pid     && chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]