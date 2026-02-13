#!/bin/sh

# 1. 'Reclamamos' las carpetas para el usuario node (ID 1000)
# Esto soluciona los errores de permisos en volúmenes de Docker
chown -R node:node /app/api /app/api/node_modules

# 2. Ejecutamos el resto como el usuario 'node'
# Usamos exec para que Node sea el proceso principal (PID 1) y reciba señales de apagado
exec su node -s /bin/sh -c "
    # Iniciar package.json si no existe
    if [ ! -f package.json ]; then
        pnpm init
    fi

    # Inyectar scripts con jq (escapamos las comillas para el subshell)
    jq '.scripts.dev=\"tsx watch src/app.ts\" | .scripts.build=\"rimraf dist && tsc\"' package.json > temp.json && mv temp.json package.json

    # Instalar dependencias necesarias
    pnpm add -D typescript @types/node rimraf tsx

    # Estructura inicial
    mkdir -p src
    if [ ! -f src/app.ts ]; then
        echo 'console.log(\"Node 22 + pnpm + tsx corriendo en /api\");' > src/app.ts
    fi

    if [ ! -f tsconfig.json ]; then
        pnpm tsc --init
    fi

    # Ejecutar el comando de desarrollo
    pnpm dev
"
