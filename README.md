# Blog

Los usuarios pueden registrarse, crear y gestionar artículos, interactuar mediante comentarios y stars (similar a GitHub), y buscar contenido con una searchbar avanzada. La aplicación incluye planes de suscripción (Free, Pro, Premium) que limitan funcionalidades, y un componente de inteligencia artificial para generar borradores de artículos y recomendaciones. También la posibilidad de consumir sus articulos mediante una consulta (con una api key) para los que quieran mostrar sus artículos.

## Características Principales

### Gestión de Artículos

- Crear, editar, listar y eliminar artículos (CRUD).
- Filtros dinámicos por autor, fecha, tags o popularidad (basado en stars).

### Creación de categorías

- Categorías globales, creadas por el admin
- Categorías personales del usuario

### Searchbar

- Búsqueda full-text de artículos por título, contenido o tags usando Elasticsearch.
- Soporte para autocompletado y resaltado de resultados (en plan Pro/Premium).

### Interacciones Sociales

- Comentar artículos (con posibilidad de discusiones en tiempo real para Pro/Premium).
- Sistema de "stars" para marcar artículos favoritos, con contadores visibles.

### Suscripciones

- Planes Free (lectura básica, límite de 1-2 posts/mes), Pro (edición ilimitada, filtros avanzados, comentarios) y Premium (acceso completo a AI, stars ilimitados).
- Dashboard de usuario para ver límites y estado del plan.

### API Pública con API Keys

- Permite a los usuarios consumir sus propios artículos (públicos) en frontends externos (e.g., portfolios) mediante solicitudes autenticadas con API Keys.
- Ejemplo: Un usuario genera una API Key en el dashboard y la usa en un fetch (GET /api/articles?userId=miId&apiKey=miKey) para obtener sus artículos en JSON.
- Soporte para scopes (e.g., solo lectura de artículos propios) y rate limiting para seguridad.

### Integración de AI (Premium)

- Generación de borradores de artículos a partir de prompts (e.g., "Tutorial Node.js con ejemplos SOLID").
- Recomendaciones personalizadas basadas en stars o historial.
- Moderación automática de comentarios (opcional, para evitar spam/toxicity).

### Escalabilidad y Performance

- Cacheo con Redis para consultas frecuentes (e.g., checks de permisos, contadores de stars).
- Colas de trabajo con RabbitMQ o Kafka para tareas asíncronas (envío de emails, procesamiento de AI).
- Despliegue con Docker para entornos consistentes.

## Tecnologías

- Backend: Node.js + Express (API RESTful).
- Base de Datos: MongoDB (almacenamiento de usuarios, artículos, comentarios, stars).
- Búsqueda: Elasticsearch (searchbar con full-text, autocompletado y filtros).
- Cache: Redis (optimización de permisos, contadores y sesiones).
- Colas de Trabajo: RabbitMQ o Kafka (tareas asíncronas como notificaciones o generación de AI).
- Contenerización: Docker (entornos locales y pruebas).
- Autenticación:
  - JWT para sesiones internas y RBAC para permisos por plan.
  - API Keys para acceso externo a artículos (con scopes y rate limiting).
- Monitoreo: to think.

## How to start

### env

Add a .env file with this variables

```sh
# Entorno
PORT=8080
NODE_ENV=development
API_URL=http://localhost
FRONT_URL=http://localhost:5173

# MongoDB
MONGO_URL=mongodb://mongo:27017
MONGO_DB_NAME=parcial_express

# Redis
REDIS_URL=redis://redis:6379

# Elasticsearch
ELASTICSEARCH_URL=http://elasticsearch:9200
```

### start project

```sh
# go into your project folder
cd your_project/

# build and start application with docker
docker-compose up --build
```

Test endpoints at

```sh
@GET http://localhost/ping
```

## Arquitectura

```sh
/
├── public/
│ └── favicon.svg
├── src
│ ├── application
│ │ └── usecases
│ │
│ ├── config
│ │ ├── index.js
│ │ └── env.config
│ │
│ ├── infrastructure
│ │ ├── database
│ │ │ ├── repositories/
│ │ │ ├── schemas/
│ │ │ └── database.js
│ │ ├── http
│ │ │   ├── controllers
│ │ │   ├── middlewares
│ │ │   ├── routes
│ │ │   └── utils
│ │ └── adapters/
│ │     ├── elasticsearch/
│ │     ├── redis/
│ │     ├── rabbitmq/
│ │     └── email/
│ │
│ ├── bootstrap
│ │ ├── server.js
│ │ └── container.js
│ │
│ ├── domain
│ │ ├── entities
│ │ └── error
│ │
│ │
│ └── server.js
└── package.json

```
