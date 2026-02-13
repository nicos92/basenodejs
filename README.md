
# Plantilla Docker: Node.js 22 + pnpm + tsx (WSL Optimized)

Esta plantilla está diseñada específicamente para desarrollar con **Node.js 22** dentro de **WSL**, evitando los problemas comunes de permisos de archivos y manteniendo el sistema host limpio mediante el uso de Docker y **pnpm**.

## Estructura del Proyecto

```text
.
├── api/                # Código fuente y configuración de Node.js
│   ├── src/app.ts      # Punto de entrada
│   └── package.json    # Dependencias y scripts
├── nginx/
│   └── default.conf    # Configuración del Proxy Inverso
├── docker-compose.yml  # Orquestación de contenedores
├── Dockerfile          # Definición de la imagen de Node
├── entrypoint.sh       # Script de automatización y fix de permisos
├── .env                # Variables de entorno (UID/GID)
└── .npmrc              # Configuración de pnpm

```

---

## Requisitos Previos

1. **WSL2** instalado.
2. **Docker Desktop** configurado para usar el motor de WSL2.
3. Tener un archivo `.env` en la raíz con tu ID de usuario para evitar problemas de `root`:

```bash
# Ejecuta esto en tu terminal de WSL para crearlo automáticamente
echo "UID=$(id -u)\nGID=$(id -g)" > .env

```

---

## Cómo empezar (Quick Start)

1. **Levantar el entorno:**
```bash
docker compose up --build

```


*El script `entrypoint.sh` se encargará automáticamente de inicializar el `package.json`, instalar `tsx`, `typescript` y configurar los permisos de `node_modules`.*
2. **Acceso:**
* **API (vía Nginx):** `http://localhost` (Puerto 80)
* **API (Directo):** `http://localhost:3000`


3. **Scripts incluidos:**
* `pnpm dev`: Arranca la app con `tsx watch` (recarga automática).
* `pnpm build`: Compila el proyecto usando `tsc`.



---

## Comandos Útiles

### Instalar nuevas librerías

No las instales en tu terminal local. Usa el contenedor para que se registren correctamente:

```bash
docker compose exec app pnpm add <paquete>

```

### Limpieza Total

Si necesitas resetear los `node_modules` o los volúmenes corruptos:

```bash
docker compose down -v

```

### Problemas de Permisos (EACCES)

Si ves errores de permisos en la carpeta `api/` o `node_modules/`, ejecuta:

```bash
sudo chown -R $USER:$USER api/

```

---

## Notas de Configuración

* **pnpm:** Configurado con `node-linker=hoisted` en `.npmrc` para máxima compatibilidad con volúmenes Docker.
* **tsx:** Utilizado para ejecutar TypeScript directamente en desarrollo sin pasos de compilación intermedios, ofreciendo una velocidad superior a `ts-node-dev`.
* **Nginx:** Actúa como puerta de enlace, permitiendo que la app de Node escale o cambie de puerto internamente sin afectar la URL externa.

---
