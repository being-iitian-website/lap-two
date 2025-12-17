## Journal API – Postman Testing Guide

All journal APIs require JWT authentication. This guide shows how to test them in Postman.

The `Journal` table is defined in `prisma/schema.prisma` as:

```prisma
model Journal {
  id        String   @id @default(uuid())
  date      DateTime
  notes     String
  userId    String
  user      User_info @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
}
```

### 1. Prerequisites

- **Base URL**: `http://localhost:5000`
- **Server running**: `npm run dev` or `npm start`
- **Postman** installed
- **JWT token** in a Postman environment variable (e.g. `jwt_token`), obtained from `POST /api/auth/login` or `/api/auth/register`

---

### 2. Create / Update Journal (Upsert)

**Endpoint**

- `POST {{base_url}}/api/journal`

**Headers**

```text
Content-Type: application/json
Authorization: Bearer {{jwt_token}}
```

**Request Body – Create new journal**

```json
{
  "date": "2025-01-15",
  "notes": "Good focus today, solved 30 questions."
}
```

**Request Body – Update existing journal (include id)**

```json
{
  "id": "existing-journal-uuid",
  "date": "2025-01-16",
  "notes": "Updated notes for this day."
}
```

**Backend Behavior**

- If `id` is provided:
  - Finds a journal with that `id` belonging to the current user.
  - Updates its `date` and `notes`.
  - `updated_at` is automatically updated.
- If `id` is not provided:
  - Creates a new `Journal` with `date`, `notes`, `userId` (from token), and sets `createdAt`/`updatedAt` automatically.
- `date` is treated as a calendar date (time is normalised to start of day).

**Expected Response (200 OK)**

```json
{
  "message": "Journal saved successfully"
}
```

**Error Responses**

- **400 Bad Request**
  - Missing `date` or `notes`
  - Invalid `date` format (use ISO date, e.g. `"2025-01-15"`)
  - For updates: missing both `date` and `notes`
- **401 Unauthorized**
  - Missing or invalid `Authorization` header
- **404 Not Found**
  - Updating with `id` that does not belong to the current user
- **500 Internal Server Error**
  - Unexpected server error

**Test Cases**

1. Create a new journal with valid `date` and `notes` → expect 200.
2. Create without `notes` → expect 400.
3. Update an existing journal by passing its `id` and new `notes` → expect 200 and `updatedAt` to change.
4. Try updating a journal with an invalid or someone else’s `id` → expect 404.

---

### 3. Get My Journals

**Endpoint**

- `GET {{base_url}}/api/journal/me`

**Headers**

```text
Authorization: Bearer {{jwt_token}}
```

**Backend Behavior**

- Returns all journals for the authenticated user.
- Sorted by `date` (descending) and then by `createdAt` (newest first).

**Expected Response (200 OK)**

```json
[
  {
    "id": "uuid",
    "date": "2025-01-15T00:00:00.000Z",
    "notes": "Good focus today, solved 30 questions.",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  },
  {
    "id": "uuid-older",
    "date": "2025-01-14T00:00:00.000Z",
    "notes": "Practiced DP problems.",
    "createdAt": "2025-01-14T09:00:00.000Z",
    "updatedAt": "2025-01-14T09:15:00.000Z"
  }
]
```

**Test Cases**

1. After creating journals, call `GET /api/journal/me` and verify they appear.
2. Ensure journals from other users are not included.
3. Check that `updatedAt` changes after you update a journal via `POST /api/journal` (with `id`).
 
---

### 4. Get Today's Responses

**Endpoint**

- `GET {{base_url}}/api/space/today-responses`

**Headers**

```text
Authorization: Bearer {{jwt_token}}
```

**Backend Behavior**

- Fetches all targets that have daily question responses submitted today.
- Only returns targets where `responseDate` is today and both `dailyQuestion1` and `dailyAnswer1` are not null.
- Results are sorted by `responseDate` in ascending order.
- Returns data formatted for display in the Space (Journal) view.

**Expected Response (200 OK)**

```json
{
  "date": "2025-01-16",
  "responses": [
    {
      "targetTitle": "DSA Revision",
      "question1": "What did I study today?",
      "answer1": "Graphs",
      "question2": "What was challenging?",
      "answer2": "DFS recursion"
    },
    {
      "targetTitle": "Mathematics Practice",
      "question1": "What did I study today?",
      "answer1": "Calculus problems",
      "question2": null,
      "answer2": null
    }
  ]
}
```

**Note**: 
- If no targets have responses for today, the `responses` array will be empty.
- `question2` and `answer2` may be `null` if they were not provided when submitting the daily response.

**Error Responses**

- **401 Unauthorized**
  - Missing or invalid `Authorization` header
- **500 Internal Server Error**
  - Unexpected server error

**Test Cases**

1. **Valid Request with responses**: After submitting daily responses for targets today, call `GET /api/space/today-responses` → expect 200 with responses array.
2. **No Responses Today**: Call endpoint when no targets have responses for today → expect 200 with empty `responses` array.
3. **Missing Token**: Remove Authorization header → expect 401 Unauthorized.
4. **Invalid Token**: Use fake token → expect 401 Invalid or expired token.
5. **Verify User Isolation**: Ensure only responses from the authenticated user's targets are returned.

**Prerequisites for Testing**

Before testing this endpoint, you need to:
1. Create at least one target (see `POST /api/targets` in Target Management API guide).
2. Submit daily responses for those targets using `POST /api/targets/{targetId}/daily-response` (see Step 8 in Target Management API guide).

---

### 5. Example Postman Workflow

1. **Login** via `POST /api/auth/login` and store `token` in `{{jwt_token}}`.
2. **Create a journal** via `POST /api/journal`.
3. **Fetch journals** via `GET /api/journal/me` and verify the new entry.
4. **Update a journal**:
   - Copy `id` from step 3.
   - Call `POST /api/journal` with that `id` and new `notes`.
   - Call `GET /api/journal/me` again and verify `updatedAt` changed.
5. **Get today's responses**:
   - First, create a target via `POST /api/targets` (see Target Management API guide).
   - Submit daily response for that target via `POST /api/targets/{targetId}/daily-response`.
   - Call `GET /api/space/today-responses` and verify the response appears.


