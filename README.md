# Blog SaaS 🚀

Blog SaaS es una plataforma para **crear, gestionar y consumir artículos** como servicio.  
El objetivo es brindar a los usuarios un sistema fácil de usar, con planes de suscripción, API pública y herramientas de inteligencia artificial para potenciar la creación de contenido.

---
![1](https://github.com/user-attachments/assets/667f9e87-c8bb-4600-b168-c67359c5ed7f)
![2](https://github.com/user-attachments/assets/66888a3a-ed5c-4d59-aa99-29cad2bbc5e2)



## ✨ Características principales

### Gestión de artículos

- CRUD completo de artículos (crear, editar, listar y eliminar).
- Metadatos: categorías globales (admin) y categorías personales (usuario).
- Límite de artículos según plan.
- Búsqueda avanzada con **Elasticsearch** (título, contenido, tags).

### Suscripciones y planes

- **Free**: hasta 3 artículos, 1 workspace, sin API Key.
- **Pro**: hasta 30 artículos, múltiples workspaces, API Key básica (solo lectura).
- **Premium**: ilimitados, workspaces avanzados, API Key avanzada (scopes, estadísticas), y acceso a AI.

### API Pública

- Consumo de artículos en sitios externos con API Keys.
- Soporte para scopes (ej. solo lectura, estadísticas).
- Rotación y revocación de claves.
- Rate limiting según plan.

### Inteligencia Artificial (Premium)

- Generación de borradores a partir de prompts.
- Reescritura de párrafos.
- Sugerencia automática de títulos SEO y metadescripciones.
- Recomendaciones de contenido personalizadas.

### Estadísticas

- Visualización de métricas (views, uso de API Key).
- Ranking de artículos más leídos.
- Beneficios e insignias para usuarios destacados.

### Moderación

- Sistema de reportes de artículos.
- Moderación automática.

### Integraciones externas

- Exportación de artículos a **WordPress, Medium y Notion**.
- Embeds mediante snippet de JavaScript.

### Workspaces

- Free: 1 workspace.
- Pro/Premium: múltiples workspaces con colaboración.

---

## 🛠️ Tecnologías

- **Backend**: Node.js + Express.
- **Base de datos**: MongoDB.
- **Búsqueda**: Elasticsearch.
- **Cache**: Redis.
- **Colas de trabajo**: RabbitMQ.
- **Autenticación**:
  - JWT (sesiones internas).
  - API Keys (consumo externo, scopes).
- **Contenerización**: Docker.
- **Monitoreo**: (pendiente: Sentry, Grafana).
- **Notificaciones**: Websockets.
- **AI**: integración futura con modelos LLM.

## How to start

### env

Add a .env file with this variables

```sh
# Entorno
PORT=8080
NODE_ENV=development
API_URL=http://localhost
FRONT_URL=http://localhost:4321

# security
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
HASH_SALT_ROUNDS=10

# MongoDB
MONGO_URL=mongodb://mongo:27017
MONGO_DB_NAME=blog_saas

# Redis
REDIS_URL=redis://redis:6379

# Elasticsearch
ELASTICSEARCH_URL=http://elasticsearch:9200

# RabbitMQ queue
RABBIT_URL=amqp://user:password@rabbitmq:5672/

# Email resend
RESEND_API_KEY=your_resend_api_key
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
├── astro-project/
│
├── public/
│ ├── index.html
│ └── favicon.svg
│
├── src
│ ├── application
│ │ └── usecases
│ │
│ ├── infrastructure
│ │ ├── database
│ │ │ ├── repositories/
│ │ │ ├── schemas/
│ │ │ └── database.js
│ │ ├── config
│ │ │ ├── env.config.js
│ │ │ └── index.js
│ │ ├── secure
│ │ │ ├── jwt.js
│ │ │ └── hash.js
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
