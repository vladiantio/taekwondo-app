FROM node:23-bookworm-slim AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile

COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY src/ ./src/
COPY lib/ ./lib/
COPY public/ ./public/

RUN pnpm run build
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.d/40-app-config.sh
RUN chmod +x /docker-entrypoint.d/40-app-config.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]