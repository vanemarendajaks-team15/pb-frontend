FROM composer:2 AS composer
FROM node:22-bookworm-slim AS node

FROM php:8.4-cli

ENV DEBIAN_FRONTEND=noninteractive \
    COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /var/www/html

COPY --from=composer /usr/bin/composer /usr/local/bin/composer
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /usr/local/bin/npm /usr/local/bin/npm
COPY --from=node /usr/local/bin/npx /usr/local/bin/npx

RUN ln -sf /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -sf /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        procps \
        unzip \
        libsqlite3-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8000 5173

CMD ["sh", "-lc", "composer install --no-interaction && npm ci && if [ ! -f .env ]; then cp .env.example .env; fi && touch database/database.sqlite && if ! grep -q '^APP_KEY=base64:' .env; then php artisan key:generate --force; fi && php artisan migrate --force && composer run docker:dev"]
