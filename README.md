# Plantilla Docker: Node.js 22 + pnpm + Nginx (WSL Optimized)

Esta plantilla proporciona un entorno de desarrollo profesional diseñado para **WSL2**. Utiliza **Nginx** como proxy inverso para proteger el contenedor de Node y **tsx** para ejecutar TypeScript en tiempo real con recarga automática infalible.

## 📂 Estructura del Proyecto

```text
.
├── api/                # Microservicio Node.js (Express + TS)
│   ├── src/app.ts      # Punto de entrada de la aplicación
│   └── package.json    # Scripts y dependencias
├── nginx/
│   └── default.conf    # Configuración del Proxy (Puerto 80 -> 3000)
├── docker-compose.yml  # Orquestación de servicios
├── Dockerfile          # Definición de imagen (Node 22 + jq)
├── entrypoint.sh       # Script de automatización y corrección de permisos
├── .env                # Variables de entorno (UID/GID del host)
└── .npmrc              # Configuración de pnpm (hoisted)

```

---

## 🚀 Inicio Rápido

1. **Sincronizar permisos de usuario:**
Para evitar que Docker cree archivos como `root` en tu sistema, sincroniza tu UID/GID:
```bash
echo -e "UID=$(id -u)\nGID=$(id -g)" > .env

```


2. **Levantar el entorno:**
```bash
docker compose up --build

```


*El sistema inicializará automáticamente el `package.json`, instalará dependencias y configurará el servidor Express si no existe.*
3. **Verificación:**
Accede a `http://localhost/`. La respuesta JSON confirmará la conexión a través de Nginx (`"via_nginx": "Sí"`).

---

## 🛡️ Arquitectura y Seguridad

* **Acceso Único:** Node.js está aislado en la red interna de Docker. Solo es accesible a través de Nginx en el puerto 80.
* **Headers de Identidad:** Nginx está configurado para inyectar la IP real y el Host del cliente en las peticiones hacia Node:
* `X-Real-IP`
* `X-Forwarded-For`
* `X-Forwarded-Host`


* **Fix de Permisos:** `entrypoint.sh` ejecuta un `chown` recursivo sobre `node_modules` en cada arranque, eliminando los errores de `EACCES` típicos de WSL.

---

## 🛠️ Comandos de Desarrollo

| Acción | Comando |
| --- | --- |
| **Instalar Dependencias** | `docker compose exec app pnpm add <paquete>` |
| **Ver Logs en tiempo real** | `docker compose logs -f` |
| **Reiniciar la API** | `docker compose restart app` |
| **Limpieza de Volúmenes** | `docker compose down -v` |

---

## 📝 Notas de Configuración

* **pnpm:** Usa `node-linker=hoisted` para asegurar que las dependencias sean visibles correctamente dentro del volumen de Docker.
* **tsx:** Ejecución directa de TypeScript sin compilación previa, optimizada para el sistema de archivos de WSL mediante `CHOKIDAR_USEPOLLING=true`.
