# Dashboard API - Postman Testing Guide

All Dashboard APIs require JWT authentication. This guide shows how to test the History API using Postman.

## Prerequisites

1. **Base URL**: `http://localhost:5000`
2. **Server must be running** (use `npm run dev` or `npm start`)
3. **Postman installed** on your machine
4. **JWT token** obtained from `POST /api/auth/login` or `/api/auth/register`

---

## Step 1: Get JWT Token

Before testing the History API, you need to authenticate and get a JWT token.

### Option A: Register a New User

**Request**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/register`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }
  ```

**Expected Response (201 Created)**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Option B: Login

**Request**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/login`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

**Expected Response (200 OK)**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ IMPORTANT**: Copy the `token` value from the response. You'll need it for all subsequent requests.

---

## Step 2: Get History by Date

**Endpoint**: `GET /api/history?date=YYYY-MM-DD`

This endpoint fetches targets and revisions for a specific date and groups them into a structured response.

### Request

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/history?date=2025-01-16`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

### Request Parameters

| Parameter | Type   | Required | Description                    | Example      |
|-----------|--------|----------|--------------------------------|--------------|
| `date`    | string | Yes      | Date in YYYY-MM-DD format      | `2025-01-16` |

### Backend Processing Rules

1. **Date Validation**:
   - Validates date format (YYYY-MM-DD)
   - Parses and validates the date is valid
   - Sets time to start of day (00:00:00)

2. **Targets Fetching**:
   - Fetches targets where `startTime` falls on the given date
   - Only returns targets belonging to the authenticated user
   - Orders by `startTime` (ascending)

3. **Revisions Fetching**:
   - Fetches revisions where `revisionDate` falls on the given date
   - Only returns revisions belonging to the authenticated user
   - Orders by `revisionDate` (ascending)

4. **Data Formatting**:
   - Groups targets and revisions into separate arrays
   - Formats revisions to use first unit as topic (or subject if no units)

### Expected Response (200 OK)

```json
{
  "date": "2025-01-16",
  "targets": [
    {
      "title": "DSA Practice",
      "subject": "DSA",
      "type": "solving",
      "actualHours": 2,
      "status": "completed"
    },
    {
      "title": "Mathematics Theory",
      "subject": "Mathematics",
      "type": "theory",
      "actualHours": 1.5,
      "status": "completed"
    }
  ],
  "revisions": [
    {
      "topic": "Binary Trees",
      "status": "completed"
    },
    {
      "topic": "Calculus Basics",
      "status": "pending"
    }
  ]
}
```

### Response Fields

**Root Object:**
- `date` (string): The requested date in YYYY-MM-DD format

**Targets Array:**
Each target object contains:
- `title` (string): Target title
- `subject` (string): Subject name
- `type` (string): Target type (`theory`, `lecture`, `revision`, `solving`, `mock`)
- `actualHours` (number | null): Actual hours spent
- `status` (string): Target status (`pending`, `completed`, `missed`)

**Revisions Array:**
Each revision object contains:
- `topic` (string): First unit from units array, or subject if no units
- `status` (string): Revision status (`pending`, `completed`, `missed`)

### Empty Response Example

If no targets or revisions exist for the date:

```json
{
  "date": "2025-01-16",
  "targets": [],
  "revisions": []
}
```

### Error Responses

#### 400 Bad Request - Missing Date Parameter

**Request**: `GET /api/history` (no date parameter)

**Response**:
```json
{
  "message": "Date query parameter is required"
}
```

#### 400 Bad Request - Invalid Date Format

**Request**: `GET /api/history?date=2025/01/16` (wrong format)

**Response**:
```json
{
  "message": "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)"
}
```

#### 400 Bad Request - Invalid Date

**Request**: `GET /api/history?date=2025-13-45` (invalid date)

**Response**:
```json
{
  "message": "Invalid date"
}
```

#### 401 Unauthorized - Missing Token

**Request**: Without `Authorization` header

**Response**:
```json
{
  "message": "Authorization token missing"
}
```

#### 401 Unauthorized - Invalid Token

**Request**: With invalid or expired token

**Response**:
```json
{
  "message": "Invalid or expired token"
}
```

#### 500 Internal Server Error

**Response**:
```json
{
  "message": "Failed to fetch history"
}
```

---

## Test Cases

### Test Case 1: Valid Request with Data

1. **Prerequisites**: 
   - Create targets with `startTime` on the test date
   - Create revisions with `revisionDate` on the test date

2. **Request**: 
   ```
   GET /api/history?date=2025-01-16
   Authorization: Bearer <valid_token>
   ```

3. **Expected**: 
   - Status: 200 OK
   - Response contains `date`, `targets` array, and `revisions` array
   - Targets and revisions match the requested date

### Test Case 2: Valid Request with No Data

1. **Request**: 
   ```
   GET /api/history?date=2025-12-31
   Authorization: Bearer <valid_token>
   ```
   (Use a date with no targets or revisions)

2. **Expected**: 
   - Status: 200 OK
   - Response contains empty `targets` and `revisions` arrays

### Test Case 3: Missing Date Parameter

1. **Request**: 
   ```
   GET /api/history
   Authorization: Bearer <valid_token>
   ```

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "Date query parameter is required"

### Test Case 4: Invalid Date Format

1. **Request**: 
   ```
   GET /api/history?date=01-16-2025
   Authorization: Bearer <valid_token>
   ```

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)"

### Test Case 5: Invalid Date Value

1. **Request**: 
   ```
   GET /api/history?date=2025-13-45
   Authorization: Bearer <valid_token>
   ```

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "Invalid date"

### Test Case 6: Missing Authentication

1. **Request**: 
   ```
   GET /api/history?date=2025-01-16
   ```
   (No Authorization header)

2. **Expected**: 
   - Status: 401 Unauthorized
   - Message: "Authorization token missing"

### Test Case 7: Invalid Token

1. **Request**: 
   ```
   GET /api/history?date=2025-01-16
   Authorization: Bearer invalid_token_here
   ```

2. **Expected**: 
   - Status: 401 Unauthorized
   - Message: "Invalid or expired token"

### Test Case 8: User Isolation

1. **Prerequisites**: 
   - Login as User A, create targets/revisions for a date
   - Login as User B

2. **Request**: 
   ```
   GET /api/history?date=2025-01-16
   Authorization: Bearer <user_b_token>
   ```

3. **Expected**: 
   - Status: 200 OK
   - Response only contains User B's targets and revisions
   - User A's data is not included

---

## Complete Postman Workflow

### Step-by-Step Testing

1. **Get Authentication Token**:
   - Register or login to get JWT token
   - Store token in Postman environment variable (e.g., `jwt_token`)

2. **Create Test Data** (Optional):
   - Create targets via `POST /api/targets` with `startTime` on a specific date
   - Create revisions via `POST /api/revisions` with `revisionDate` on the same date

3. **Test History Endpoint**:
   - Set up GET request: `http://localhost:5000/api/history?date=2025-01-16`
   - Add header: `Authorization: Bearer {{jwt_token}}`
   - Send request and verify response

4. **Test Edge Cases**:
   - Test with different date formats
   - Test with dates that have no data
   - Test without authentication
   - Test with invalid token

---

## Postman Environment Variables

To make testing easier, set up these environment variables in Postman:

1. **base_url**: `http://localhost:5000`
2. **jwt_token**: Your JWT token from login/register

Then use in requests:
- URL: `{{base_url}}/api/history?date=2025-01-16`
- Header: `Authorization: Bearer {{jwt_token}}`

---

## Notes

- **Date Format**: Always use `YYYY-MM-DD` format (e.g., `2025-01-16`)
- **Time Zone**: Dates are handled in UTC. The backend sets time to 00:00:00 for the start of the day
- **Target Matching**: Targets are matched by `startTime` falling on the given date
- **Revision Matching**: Revisions are matched by `revisionDate` falling on the given date
- **Topic Field**: For revisions, `topic` is the first unit from the `units` array, or the `subject` if no units exist
- **User Isolation**: Each user only sees their own targets and revisions
- **Empty Arrays**: If no data exists for a date, empty arrays are returned (not null)

---

## Troubleshooting

### Issue: "Date query parameter is required"
**Solution**: Ensure the `date` query parameter is included in the URL: `?date=2025-01-16`

### Issue: "Invalid date format"
**Solution**: Use the exact format `YYYY-MM-DD` (e.g., `2025-01-16`, not `2025/01/16` or `01-16-2025`)

### Issue: "Authorization token missing"
**Solution**: Add the `Authorization` header with format: `Bearer <your_token>`

### Issue: Empty response when data exists
**Solution**: 
- Verify targets have `startTime` set (not null)
- Verify revisions have `revisionDate` set
- Check that the date matches exactly (time is normalized to start of day)
- Ensure you're using the correct user's token

### Issue: Targets/Revisions from other users appearing
**Solution**: This should not happen. Verify you're using the correct JWT token for the intended user.

---

## Related APIs

- **Create Target**: `POST /api/targets` (see Target Management API guide)
- **Create Revision**: `POST /api/revisions` (see Revision API guide)
- **Get Targets by Date**: `GET /api/targets/today`
- **Get Revisions by Date**: `GET /api/revisions?date=YYYY-MM-DD`

---

## Example: Complete Request/Response Flow

### Request
```
GET http://localhost:5000/api/history?date=2025-01-16
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcwNTQwMDAwMCwiZXhwIjoxNzA1NDg2NDAwfQ.signature
```

### Response
```json
{
  "date": "2025-01-16",
  "targets": [
    {
      "title": "DSA Practice",
      "subject": "DSA",
      "type": "solving",
      "actualHours": 2,
      "status": "completed"
    },
    {
      "title": "Mathematics Theory",
      "subject": "Mathematics",
      "type": "theory",
      "actualHours": 1.5,
      "status": "completed"
    }
  ],
  "revisions": [
    {
      "topic": "Binary Trees",
      "status": "completed"
    },
    {
      "topic": "Calculus Basics",
      "status": "pending"
    }
  ]
}
```

---

**Happy Testing! 🚀**

