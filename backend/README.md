# Flaminext Backend - Zapier Agent Integration

Backend Express server untuk handle webhook dari Zapier Agent dan integrasi chat AI.

## Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   Edit `backend/.env`:

   ```env
   PORT=3001
   ZAPIER_AGENT_API_URL=https://agents.zapier.com/api/v1/agents/YOUR_AGENT_ID/chat
   ZAPIER_AGENT_TOKEN=your_zapier_agent_token
   ```

3. **Start server:**
   ```bash
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

## API Endpoints

### POST /api/zapier-webhook

Menerima data dari Zapier Agent webhook.

**Request Body:**

```json
{
  "timestamp": "2025-10-26T11:37:13Z",
  "event_type": "chat_message",
  "source": "zapier_agent",
  "message": "User message",
  "agent_response": "AI response"
}
```

### POST /api/chat-with-agent

Endpoint untuk chat widget call Zapier Agent.

**Request Body:**

```json
{
  "message": "Hello AI",
  "user_name": "Ahmad Farhan",
  "user_id": "user_123",
  "timestamp": "2025-10-26T11:37:13Z"
}
```

### GET /api/zapier-data

Get stored Zapier data (for debugging).

## Zapier Agent Setup

1. Copy agent dari link share Anda
2. Di agent dashboard, setup webhook action:
   - URL: `http://localhost:3001/api/zapier-webhook`
   - Method: POST
   - Headers: `Content-Type: application/json`

## Testing

Test webhook:

```bash
curl -X POST http://localhost:3001/api/zapier-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true, "message": "Hello from Zapier"}'
```

Test chat:

```bash
curl -X POST http://localhost:3001/api/chat-with-agent \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello AI", "user_name": "Test User"}'
```
