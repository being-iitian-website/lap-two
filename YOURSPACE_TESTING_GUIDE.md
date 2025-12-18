## YourSpace API – Postman Testing Guide

All YourSpace APIs require JWT authentication. This guide shows how to test Journal and Vision Board APIs in Postman.

The `Journal` and `VisionBoard` tables are defined in `prisma/schema.prisma`:

```prisma
model Journal {
  id        String   @id @default(uuid())
  date      DateTime
  notes     String
  userId    String
  user      User_info @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model VisionBoard {
  id        String   @id @default(uuid())
  columns   Int
  rows      Int
  gap       Int
  userId    String
  user      User_info @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  items     VisionBoardItem[]
}

model VisionBoardItem {
  id           String  @id @default(uuid())
  row          Int
  column       Int
  rowSpan      Int     @default(1)
  columnSpan   Int     @default(1)
  type         String  // "text" | "image"
  text         String?
  imageUrl     String?
  fontSize     Int?
  textColor    String?
  background   String?
  boardId      String
  board        VisionBoard @relation(fields: [boardId], references: [id], onDelete: Cascade)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### 1. Prerequisites

- **Base URL**: `http://localhost:5000`
- **Server running**: `npm run dev` or `npm start`
- **Postman** installed
- **JWT token** in a Postman environment variable (e.g. `jwt_token`), obtained from `POST /api/auth/login` or `/api/auth/register`

---

## Journal APIs

### 2. Create / Update Journal (Upsert)

**Endpoint**

- `POST {{base_url}}/api/yourspace`

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
4. Try updating a journal with an invalid or someone else's `id` → expect 404.

---

### 3. Get My Journals

**Endpoint**

- `GET {{base_url}}/api/yourspace/me`

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

1. After creating journals, call `GET /api/yourspace/me` and verify they appear.
2. Ensure journals from other users are not included.
3. Check that `updatedAt` changes after you update a journal via `POST /api/yourspace` (with `id`).

---

### 4. Get Today's Responses

**Endpoint**

- `GET {{base_url}}/api/yourspace/today-responses`

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

1. **Valid Request with responses**: After submitting daily responses for targets today, call `GET /api/yourspace/today-responses` → expect 200 with responses array.
2. **No Responses Today**: Call endpoint when no targets have responses for today → expect 200 with empty `responses` array.
3. **Missing Token**: Remove Authorization header → expect 401 Unauthorized.
4. **Invalid Token**: Use fake token → expect 401 Invalid or expired token.
5. **Verify User Isolation**: Ensure only responses from the authenticated user's targets are returned.

**Prerequisites for Testing**

Before testing this endpoint, you need to:
1. Create at least one target (see `POST /api/targets` in Target Management API guide).
2. Submit daily responses for those targets using `POST /api/targets/{targetId}/daily-response` (see Step 8 in Target Management API guide).

---

## Vision Board APIs

### 5. Save / Update Vision Board

**Endpoint**

- `POST {{base_url}}/api/yourspace/vision-board/save`

**Headers**

```text
Content-Type: application/json
Authorization: Bearer {{jwt_token}}
```

**Request Body**

```json
{
  "columns": 4,
  "rows": 4,
  "gap": 8,
  "items": [
    {
      "row": 1,
      "column": 2,
      "rowSpan": 1,
      "columnSpan": 2,
      "type": "text",
      "text": "Crack JEE 2025",
      "fontSize": 18,
      "textColor": "#000000",
      "background": "#ffffff"
    },
    {
      "row": 4,
      "column": 2,
      "rowSpan": 1,
      "columnSpan": 1,
      "type": "text",
      "text": "Daily consistency",
      "fontSize": 14,
      "textColor": "#333333",
      "background": "#f0f0f0"
    },
    {
      "row": 2,
      "column": 1,
      "rowSpan": 2,
      "columnSpan": 1,
      "type": "image",
      "imageUrl": "https://example.com/motivation.jpg",
      "background": "#ffffff"
    }
  ]
}
```

**Request Body – Minimal Example (text item)**

```json
{
  "columns": 4,
  "rows": 4,
  "gap": 8,
  "items": [
    {
      "row": 1,
      "column": 2,
      "type": "text",
      "text": "Crack JEE 2025"
    }
  ]
}
```

**Backend Behavior**

- **Business Rules:**
  - Each user can have only one active vision board
  - Save action overwrites existing board completely
  - Empty cells are not stored (only items with content are saved)
  - Only logged-in user can save their board
- If a vision board already exists for the user:
  - Deletes all existing items
  - Updates the board configuration (columns, rows, gap)
  - Creates new items from the request
- If no vision board exists:
  - Creates a new board with the provided configuration
  - Creates all items from the request
- Uses database transactions to ensure atomicity

**Field Descriptions**

- `columns` (required): Number of columns in the grid (integer)
- `rows` (required): Number of rows in the grid (integer)
- `gap` (required): Gap between grid items in pixels (integer)
- `items` (required): Array of vision board items (can be empty array)
  - `row` (required): Row position (1-indexed, integer)
  - `column` (required): Column position (1-indexed, integer)
  - `rowSpan` (optional): Number of rows the item spans (default: 1)
  - `columnSpan` (optional): Number of columns the item spans (default: 1)
  - `type` (required): Item type - must be `"text"` or `"image"` (string)
  - `text` (required if type is "text"): Text content for text items (string)
  - `imageUrl` (required if type is "image"): URL for image items (string)
  - `fontSize` (optional): Font size in pixels (integer)
  - `textColor` (optional): Text color in hex format (e.g., "#000000") (string)
  - `background` (optional): Background color in hex format (e.g., "#ffffff") (string)

**Expected Response (200 OK)**

```json
{
  "message": "Vision board saved successfully"
}
```

**Error Responses**

- **400 Bad Request**
  - Missing required fields: `columns`, `rows`, or `gap`
  - `items` is not an array
  - Item validation errors:
    - Missing or invalid `type` (must be "text" or "image")
    - Text item missing `text` field
    - Image item missing `imageUrl` field
    - Missing `row` or `column` in item
- **401 Unauthorized**
  - Missing or invalid `Authorization` header
- **500 Internal Server Error**
  - Unexpected server error

**Test Cases**

1. **Create New Vision Board**: 
   - Send POST request with valid board configuration and items → expect 200.
   - Verify board is created in database.

2. **Update Existing Vision Board**:
   - Create a board first, then send another POST with different items → expect 200.
   - Verify old items are deleted and new items are created.

3. **Save Empty Board**:
   - Send POST with empty `items` array → expect 200.
   - Verify board configuration is saved but no items exist.

4. **Invalid Item Type**:
   - Send POST with item `type: "invalid"` → expect 400.

5. **Text Item Without Text**:
   - Send POST with text item missing `text` field → expect 400.

6. **Image Item Without ImageUrl**:
   - Send POST with image item missing `imageUrl` field → expect 400.

7. **Missing Required Fields**:
   - Send POST without `columns`, `rows`, or `gap` → expect 400.

8. **Missing Authentication**:
   - Remove Authorization header → expect 401.

9. **User Isolation**:
   - Create board as User A, login as User B, create board → verify each user has their own board.

---

### 6. Get Vision Board

**Endpoint**

- `GET {{base_url}}/api/yourspace/vision-board`

**Headers**

```text
Authorization: Bearer {{jwt_token}}
```

**Backend Behavior**

- Returns the vision board for the authenticated user
- If no board exists, returns default empty structure:
  - `columns: 4`, `rows: 4`, `gap: 8`, `items: []`
- Items are sorted by row (ascending) and then by column (ascending)

**Expected Response (200 OK) – With Existing Board**

```json
{
  "columns": 4,
  "rows": 4,
  "gap": 8,
  "items": [
    {
      "row": 1,
      "column": 2,
      "rowSpan": 1,
      "columnSpan": 2,
      "type": "text",
      "text": "Crack JEE 2025",
      "fontSize": 18,
      "textColor": "#000000",
      "background": "#ffffff"
    },
    {
      "row": 4,
      "column": 2,
      "rowSpan": 1,
      "columnSpan": 1,
      "type": "text",
      "text": "Daily consistency",
      "fontSize": 14,
      "textColor": "#333333",
      "background": "#f0f0f0"
    },
    {
      "row": 2,
      "column": 1,
      "rowSpan": 2,
      "columnSpan": 1,
      "type": "image",
      "imageUrl": "https://example.com/motivation.jpg",
      "fontSize": null,
      "textColor": null,
      "background": "#ffffff"
    }
  ]
}
```

**Expected Response (200 OK) – No Board Exists**

```json
{
  "columns": 4,
  "rows": 4,
  "gap": 8,
  "items": []
}
```

**Error Responses**

- **401 Unauthorized**
  - Missing or invalid `Authorization` header
- **500 Internal Server Error**
  - Unexpected server error

**Test Cases**

1. **Get Existing Board**:
   - Create a board via POST, then call GET → expect 200 with board data.
   - Verify all items are returned correctly.

2. **Get Non-Existent Board**:
   - Call GET without creating a board first → expect 200 with default empty structure.

3. **Verify Item Ordering**:
   - Create board with items at different positions → verify items are sorted by row, then column.

4. **User Isolation**:
   - User A creates board, User B calls GET → expect default empty structure (User B has no board).

5. **Missing Authentication**:
   - Remove Authorization header → expect 401.

6. **After Update**:
   - Create board, update it via POST, then call GET → verify updated items are returned.

---

### 7. Complete Postman Workflow

#### Journal Workflow

1. **Login** via `POST /api/auth/login` and store `token` in `{{jwt_token}}`.
2. **Create a journal** via `POST /api/yourspace`.
3. **Fetch journals** via `GET /api/yourspace/me` and verify the new entry.
4. **Update a journal**:
   - Copy `id` from step 3.
   - Call `POST /api/yourspace` with that `id` and new `notes`.
   - Call `GET /api/yourspace/me` again and verify `updatedAt` changed.
5. **Get today's responses**:
   - First, create a target via `POST /api/targets` (see Target Management API guide).
   - Submit daily response for that target via `POST /api/targets/{targetId}/daily-response`.
   - Call `GET /api/yourspace/today-responses` and verify the response appears.

#### Vision Board Workflow

1. **Login** via `POST /api/auth/login` and store `token` in `{{jwt_token}}`.
2. **Get initial board** (should be empty):
   - Call `GET /api/yourspace/vision-board` → expect default empty structure.
3. **Create vision board**:
   - Call `POST /api/yourspace/vision-board/save` with board configuration and items.
   - Verify 200 response.
4. **Retrieve saved board**:
   - Call `GET /api/yourspace/vision-board` → verify your items are returned.
5. **Update vision board**:
   - Call `POST /api/yourspace/vision-board/save` with modified items.
   - Verify 200 response.
6. **Verify update**:
   - Call `GET /api/yourspace/vision-board` → verify new items are returned, old items are gone.
7. **Test edge cases**:
   - Save board with empty items array.
   - Save board with only text items.
   - Save board with only image items.
   - Save board with mixed text and image items.

#### Combined Workflow

1. **Login** and get token.
2. **Create journal entry** for today.
3. **Create vision board** with motivational items.
4. **Get today's responses** to see target progress.
5. **Update journal** with reflection on the day.
6. **Retrieve vision board** to view goals.

---

### 8. Common Testing Scenarios

#### Scenario 1: First-Time User Setup

1. Register/Login → get token
2. GET `/api/yourspace/vision-board` → expect empty default structure
3. POST `/api/yourspace/vision-board/save` → create initial board
4. POST `/api/yourspace` → create first journal entry
5. GET `/api/yourspace/me` → verify journal appears

#### Scenario 2: Daily Usage

1. Login → get token
2. GET `/api/yourspace/vision-board` → view goals
3. GET `/api/yourspace/today-responses` → check daily progress
4. POST `/api/yourspace` → write daily journal
5. GET `/api/yourspace/me` → review past entries

#### Scenario 3: Vision Board Updates

1. Login → get token
2. GET `/api/yourspace/vision-board` → see current board
3. POST `/api/yourspace/vision-board/save` → update with new items
4. GET `/api/yourspace/vision-board` → verify changes
5. POST `/api/yourspace/vision-board/save` with empty items → clear board
6. GET `/api/yourspace/vision-board` → verify board config remains but items are empty

---

### 9. Error Handling Checklist

Test all endpoints with:

- ✅ Valid token → should work
- ✅ Missing Authorization header → expect 401
- ✅ Invalid/expired token → expect 401
- ✅ Missing required fields → expect 400
- ✅ Invalid data types → expect 400
- ✅ User isolation (different users' data) → should be separate
- ✅ Server errors → expect 500 (if applicable)

---

### 10. Notes

- All endpoints require JWT authentication via `Authorization: Bearer {token}` header
- Vision board items are stored only if they have content (empty cells are not saved)
- Each user can have only one vision board (saving overwrites the existing one)
- Journal entries can be created multiple times per day (different dates)
- Vision board items support both text and image types
- All date fields use ISO 8601 format
- Color fields use hex format (e.g., "#000000", "#ffffff")

