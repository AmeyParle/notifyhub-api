# NotificationHub API

NotificationHub is a reusable event-driven notification service built using Node.js, Express, PostgreSQL, and Prisma. It is designed to process notification events from multiple backend systems, store them reliably, and provide APIs for retrieval, filtering, and read-state management.

---

## 📌 Features

* 🔔 Event-driven notification ingestion
* 📦 Generic notification model with source tracking
* 🔍 Filtering by recipient, type, source, and read status
* 📄 Pagination support
* ✅ Mark notifications as read
* ⚠️ Centralized error handling
* ❤️ Health & readiness endpoints

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* REST APIs

---

## 📂 Project Structure

```
src/
  config/
  controllers/
  middleware/
  routes/
  utils/
  app.js
  server.js

prisma/
  schema.prisma
```

---

## 📚 API Endpoints

### Notifications

* `POST /api/notifications` → Create notification
* `GET /api/notifications` → Get notifications (with filters)
* `GET /api/notifications/:id` → Get notification by ID
* `PATCH /api/notifications/:id/read` → Mark notification as read

### System

* `GET /health` → Service health
* `GET /ready` → Readiness check

---

## 🔑 Example Notification Payload

```json
{
  "type": "USER_MESSAGE",
  "message": "You received a new message",
  "recipientId": 5,
  "source": "chat-service",
  "metadata": {
    "senderId": 2,
    "chatId": 10
  }
}
```

---

## 🔍 Query Examples

```
GET /api/notifications?recipientId=5
GET /api/notifications?type=USER_MESSAGE
GET /api/notifications?source=chat-service
GET /api/notifications?isRead=false&page=1&limit=10
```

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/notifyhub-api.git
cd notifyhub-api
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
PORT=5001
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:5432/DATABASE_NAME"
SERVICE_API_KEY="notificationhub-internal-key"
```

---

### 4. Run database migrations

```
npx prisma generate
npx prisma migrate dev --name init_schema
```

---

### 5. Start the server

```
npm run dev
```

---

## 🧠 Design Overview

NotificationHub follows a simple event-driven backend design:

```
External Services → NotificationHub → PostgreSQL
```

* Accepts events from any backend system
* Stores structured notification data
* Provides APIs for querying and managing notifications

---

## 📈 Future Improvements

* Swagger/OpenAPI documentation
* Message queue integration (Kafka / RabbitMQ)
* Email / Push notification delivery
* Redis caching for performance
* Retry and dead-letter handling

---

## 👨‍💻 Author

Amey Parle

---

## ⭐ Notes

This project demonstrates backend engineering fundamentals including API design, event-driven architecture, database modeling, and service modularity. It is designed to reflect real-world backend system patterns in a clean and practical way.
