FROM node:22-bookworm

RUN apt-get update && apt-get install -y jq && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app/api

# Copiamos el script de entrada y le damos permisos
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# El contenedor siempre arrancará con este script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
