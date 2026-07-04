# GuideIT AI SaaS API Documentation

## Base URL

```
https://api.guideitsol.com/v1
```

## Authentication

All API requests require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Sign Up
```
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}

Response:
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token",
  "refreshToken": "refresh-token"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response:
{
  "user": { ... },
  "token": "jwt-token",
  "refreshToken": "refresh-token"
}
```

#### Refresh Token
```
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh-token"
}

Response:
{
  "token": "new-jwt-token"
}
```

### Conversations

#### List Conversations
```
GET /conversations
Query Parameters:
  - page (optional): default 1
  - limit (optional): default 20
  - archived (optional): boolean
  - sort (optional): created_at|updated_at

Response:
{
  "data": [
    {
      "id": "uuid",
      "title": "Project Planning",
      "model": "gpt-4",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T14:30:00Z",
      "messageCount": 42
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156
  }
}
```

#### Create Conversation
```
POST /conversations
Content-Type: application/json

{
  "title": "Project Planning",
  "model": "gpt-4",
  "systemPrompt": "You are a helpful project manager",
  "temperature": 0.7
}

Response:
{
  "id": "uuid",
  "title": "Project Planning",
  "model": "gpt-4",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

#### Get Conversation
```
GET /conversations/:id

Response:
{
  "id": "uuid",
  "title": "Project Planning",
  "model": "gpt-4",
  "messages": [
    {
      "id": "uuid",
      "role": "user",
      "content": "Help me plan...",
      "createdAt": "2024-01-15T10:00:00Z"
    },
    {
      "id": "uuid",
      "role": "assistant",
      "content": "I can help with...",
      "createdAt": "2024-01-15T10:01:00Z"
    }
  ]
}
```

#### Delete Conversation
```
DELETE /conversations/:id

Response:
{
  "success": true
}
```

### Messages

#### Send Message
```
POST /conversations/:id/messages
Content-Type: application/json

{
  "content": "What is the best way to...",
  "role": "user"
}

Response (Streaming):
{
  "id": "uuid",
  "role": "assistant",
  "content": "The best way to...",
  "createdAt": "2024-01-15T10:01:00Z"
}
```

#### Get Messages
```
GET /conversations/:id/messages
Query Parameters:
  - page (optional): default 1
  - limit (optional): default 50

Response:
{
  "data": [
    {
      "id": "uuid",
      "role": "user",
      "content": "...",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

### Prompt Templates

#### List Prompt Templates
```
GET /prompt-templates
Query Parameters:
  - category (optional): filter by category
  - search (optional): search in title/description
  - page (optional): default 1
  - limit (optional): default 20

Response:
{
  "data": [
    {
      "id": "uuid",
      "title": "Code Review Template",
      "description": "Template for reviewing code",
      "category": "development",
      "usageCount": 234
    }
  ],
  "pagination": { ... }
}
```

#### Create Prompt Template
```
POST /prompt-templates
Content-Type: application/json

{
  "title": "Code Review Template",
  "description": "Template for reviewing code",
  "content": "Please review the following code...",
  "category": "development",
  "tags": ["code", "review"],
  "isPublic": true
}

Response:
{
  "id": "uuid",
  "title": "Code Review Template",
  ...
}
```

#### Update Prompt Template
```
PUT /prompt-templates/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}

Response:
{
  "id": "uuid",
  "title": "Updated Title",
  ...
}
```

#### Delete Prompt Template
```
DELETE /prompt-templates/:id

Response:
{
  "success": true
}
```

### File Uploads

#### Upload File
```
POST /files/upload
Content-Type: multipart/form-data

file: <binary-file-data>

Response:
{
  "id": "uuid",
  "fileName": "document.pdf",
  "fileSize": 1024000,
  "fileType": "application/pdf",
  "storageUrl": "https://storage.example.com/...",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

#### List Files
```
GET /files
Query Parameters:
  - page (optional): default 1
  - limit (optional): default 20

Response:
{
  "data": [
    {
      "id": "uuid",
      "fileName": "document.pdf",
      "fileSize": 1024000,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### Delete File
```
DELETE /files/:id

Response:
{
  "success": true
}
```

### User Profile

#### Get Current User
```
GET /users/me

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "https://...",
  "bio": "...",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update Profile
```
PUT /users/me
Content-Type: application/json

{
  "name": "Jane Doe",
  "bio": "Updated bio",
  "avatar": "https://..."
}

Response:
{
  "id": "uuid",
  "name": "Jane Doe",
  ...
}
```

### API Keys

#### Create API Key
```
POST /api-keys
Content-Type: application/json

{
  "name": "Production Key"
}

Response:
{
  "id": "uuid",
  "name": "Production Key",
  "key": "sk_live_...",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

#### List API Keys
```
GET /api-keys

Response:
{
  "data": [
    {
      "id": "uuid",
      "name": "Production Key",
      "lastUsed": "2024-01-15T14:30:00Z",
      "isActive": true
    }
  ]
}
```

#### Revoke API Key
```
DELETE /api-keys/:id

Response:
{
  "success": true
}
```

### Billing

#### Get Subscription
```
GET /billing/subscription

Response:
{
  "plan": "professional",
  "status": "active",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-02-01T00:00:00Z",
  "autoRenew": true
}
```

#### Get Usage
```
GET /billing/usage
Query Parameters:
  - period (optional): daily|monthly|yearly, default monthly

Response:
{
  "apiCalls": 45231,
  "limit": 100000,
  "percentage": 45.23,
  "resetDate": "2024-02-01T00:00:00Z"
}
```

#### Update Subscription
```
POST /billing/subscription
Content-Type: application/json

{
  "plan": "enterprise"
}

Response:
{
  "plan": "enterprise",
  "status": "active",
  ...
}
```

## Error Handling

All errors follow this format:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request was invalid",
    "details": {
      "field": "email",
      "reason": "Already registered"
    }
  }
}
```

### Error Codes

- `INVALID_REQUEST`: Request validation failed
- `UNAUTHORIZED`: Missing or invalid authentication
- `FORBIDDEN`: Not authorized for this resource
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Rate Limiting

API rate limits:
- **Free**: 100 requests/15 min
- **Starter**: 1000 requests/15 min
- **Professional**: 10000 requests/15 min
- **Enterprise**: Unlimited

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642256400
```

## Pagination

List endpoints support pagination:

```
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

## Webhooks

Subscribe to events via webhooks:

```
POST /webhooks
Content-Type: application/json

{
  "url": "https://your-domain.com/webhook",
  "events": ["conversation.created", "message.received"]
}
```

Supported events:
- `conversation.created`
- `conversation.deleted`
- `message.received`
- `message.updated`
- `file.uploaded`
- `subscription.updated`

## SDK Support

- JavaScript/TypeScript: `@guideitsol/sdk`
- Python: `guideitsol-sdk`
- Go: `github.com/guideitsol/sdk-go`

## Support

For API support:
- Email: api-support@guideitsol.com
- Slack: #api-help
- Documentation: https://docs.guideitsol.com
