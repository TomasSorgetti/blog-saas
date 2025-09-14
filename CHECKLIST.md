# ✅ Roadmap / Checklist

## 🔹 Fase 0 – Setup & Infra

- [x] Arquitectura hexagonal definida
- [x] Configuración de Docker + docker-compose
- [x] Configuración de Nginx como reverse proxy
- [x] Integración MongoDB
- [x] Integración Redis
- [x] Integración Elasticsearch
- [x] Integración RabbitMQ
- [x] Worker de email (envío básico)
- [ ] Logging estructurado (Winston / Pino)
- [ ] Configuración inicial de Sentry (o similar) para errores
- [ ] Scripts de inicialización de índices en Elasticsearch (mapping)

---

## 🔹 Fase 1 – Autenticación y usuarios

- [x] Registro de usuario
- [x] Login de usuario
- [x] Logout
- [x] Refresh token
- [x] Verify email con token
- [x] Resend token
- [x] Sesiones (guardadas en Redis)
- [x] Obtener perfil de usuario (GET /me)
- [ ] Recuperación de contraseña (forgot/reset)
- [ ] Roles por plan (Free / Pro / Premium)
- [ ] Middleware de autorización por rol/plan
- [ ] Dashboard básico de usuario (estado del plan, límites)

---

## 🔹 Fase 2 – Artículos y Workspaces

- [ ] Entidad **Article** en el dominio
- [ ] CRUD de artículos (create, update, delete, list)
- [ ] Validaciones (longitud, tags, categorías)
- [ ] Categorías globales (admin)
- [ ] Categorías personales (user)
- [ ] Workspaces (Free: 1, Pro/Premium: múltiples)
- [ ] Límite de artículos según plan (Free: 3, Pro: 30, Premium: ∞)
- [ ] Estado del artículo (draft/published)
- [ ] Soft delete (no borrar físicamente)
- [ ] Indexación automática en Elasticsearch al crear/editar artículo
- [ ] Búsqueda avanzada (title, content, tags, highlights)
- [ ] Filtros dinámicos (autor, fecha, tags)

---

## 🔹 Fase 3 – API Keys

- [ ] Generación de API Key (dashboard)
- [ ] Guardar hash de API Key en DB (no en texto plano)
- [ ] Scopes básicos (ej. `articles:read`)
- [ ] Consumo externo: `GET /api/articles?apiKey=...`
- [ ] Rotación de API Keys
- [ ] Revocación de API Keys
- [ ] Rate limiting según plan (ej. Redis + bucket)
- [ ] Logs de uso de API Key
- [ ] Dashboard de consumo (ej. “85/100 requests este mes”)

---

## 🔹 Fase 4 – Estadísticas y Moderación

- [ ] Contador de views por artículo
- [ ] Ranking de artículos más leídos
- [ ] Dashboard de estadísticas para el usuario
- [ ] Sistema de reportes de artículos
- [ ] Moderación manual (admin)
- [ ] Moderación automática con AI (Premium)
- [ ] Beneficios/insignias para usuarios con mejor ranking

---

## 🔹 Fase 5 – AI

- [ ] Integración de modelo LLM (ej. OpenAI o local)
- [ ] Generación de borradores a partir de prompt
- [ ] Reescribir párrafo seleccionado
- [ ] Generar título SEO-friendly
- [ ] Generar metadescripción y tags automáticos
- [ ] Recomendaciones de artículos (basado en historial/stats)

---

## 🔹 Fase 6 – Integraciones externas

- [ ] Exportar a WordPress
- [ ] Exportar a Medium
- [ ] Exportar a Notion
- [ ] Embeds con snippet de JS (para mostrar artículos en un sitio externo)

---

## 🔹 Fase 7 – Escalabilidad y DevOps

- [ ] Cacheo con Redis (contadores, permisos)
- [ ] Colas de trabajo con RabbitMQ (mails, AI, reportes)
- [ ] Monitoreo con Prometheus + Grafana
- [ ] Integración con Sentry para errores
- [ ] CI/CD con GitHub Actions
- [ ] Deploy en entorno productivo (ej. AWS / GCP / Render / Railway)
