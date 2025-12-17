# Focus Session API - Postman Testing Guide

All Focus Session APIs require JWT authentication.

## Prerequisites

- **Base URL**: `http://localhost:5000`
- **Server running**: `npm run dev` or `npm start`
- **JWT token** from `POST /api/auth/register` or `POST /api/auth/login`

---

## 1. Save Focus Session

### Endpoint

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/focus`

### Headers

```text
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### Body (raw JSON)

```json
{
  "notes": "Deep work on Graph Algorithms",
  "startTime": "2025-01-15T08:00:00Z",
  "endTime": "2025-01-15T09:30:00Z"
}
```

### Backend Behavior

- Validates:
  - `startTime` and `endTime` are present
  - Both are valid ISO datetimes
  - `endTime` is strictly after `startTime`
- Calculates duration in minutes:
  - `duration = (endTime - startTime) / 60_000`
- Stores:
  - `notes` (nullable)
  - `startTime`
  - `endTime`
  - `duration` (minutes)
  - `userId` (from JWT)

### Expected Success Response (200 OK)

```json
{
  "message": "Focus session saved successfully"
}
```

### Error Cases

- **400** – Missing or invalid fields:

```json
{
  "message": "startTime and endTime are required"
}
```

or

```json
{
  "message": "Invalid date format for startTime or endTime"
}
```

or

```json
{
  "message": "endTime must be after startTime"
}
```

- **401** – Missing / invalid token:

```json
{
  "message": "Unauthorized"
}
```

- **500** – Server-side error:

```json
{
  "message": "Failed to save focus session"
}
```

### Suggested Postman Tests

1. Valid request → expect 200 + success message.
2. `endTime` before `startTime` → expect 400.
3. Invalid datetime string → expect 400.
4. No token → expect 401.

---

## 2. Get Recent Focus Sessions

### Endpoint

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/focus/recent?limit=5`

`limit` is optional:

- Default: `5`
- Max: `50`

### Headers

```text
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### Expected Success Response (200 OK)

```json
[
  {
    "notes": "Deep work on Graph Algorithms",
    "duration": 90
  },
  {
    "notes": "DP practice",
    "duration": 60
  }
]
```

- Results are ordered by `startTime` **descending** (most recent first).
- Each object contains:
  - `notes` – string or `null`
  - `duration` – integer minutes

### Error Cases

- **401** – Missing / invalid token:

```json
{
  "message": "Unauthorized"
}
```

- **500** – Server-side error:

```json
{
  "message": "Failed to fetch recent focus sessions"
}
```

### Suggested Postman Tests

1. Save several focus sessions for the same user.
2. `GET /api/focus/recent` (no limit) → should return last 5 by default.
3. `GET /api/focus/recent?limit=2` → should return exactly 2 most recent.
4. `GET /api/focus/recent?limit=100` → backend caps to max 50.
5. No token → expect 401.

---

## 3. Example Postman Environment Setup

Create environment variables:

- `base_url` = `http://localhost:5000`
- `jwt_token` = (set after login/register)

Use them in requests:

- URL: `{{base_url}}/api/focus`
- Header: `Authorization: Bearer {{jwt_token}}`

Auto-save token in auth responses (Tests tab on login/register request):

```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
  const jsonData = pm.response.json();
  if (jsonData.token) {
    pm.environment.set("jwt_token", jsonData.token);
  }
}
```

---

## 4. Quick Checklist

- [ ] Login and capture JWT token in Postman.
- [ ] Create at least one valid focus session.
- [ ] Try invalid time ranges and verify validation errors.
- [ ] Fetch recent focus sessions and verify order and duration.
- [ ] Confirm that another user cannot see your focus sessions.


