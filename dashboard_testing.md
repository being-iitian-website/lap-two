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

## Step 3: Get Daily XP Awards by Date

**Endpoint**: `GET /api/dashboard/xp/daily?date=YYYY-MM-DD`

This endpoint fetches all XP awards earned by the user on a specific date, including details about each award (threshold, amount, time awarded).

### Request

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/dashboard/xp/daily?date=2025-01-16`
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
   - Sets time to start of day (00:00:00) for query range

2. **XP Awards Fetching**:
   - Fetches all `DailyXPAward` records where `date` falls on the given date
   - Only returns awards belonging to the authenticated user
   - Orders by `createdAt` (ascending) to show chronological order

3. **Total Calculation**:
   - Calculates sum of all `xpAmount` values for the day
   - Returns `totalXPForDay` in the response

### Expected Response (200 OK)

```json
{
  "date": "2025-01-16",
  "awards": [
    {
      "threshold": "focus_7h",
      "xpAmount": 15,
      "awardedAt": "2025-01-16T10:30:00.000Z"
    },
    {
      "threshold": "exercise_daily",
      "xpAmount": 10,
      "awardedAt": "2025-01-16T12:00:00.000Z"
    },
    {
      "threshold": "meditation_daily",
      "xpAmount": 10,
      "awardedAt": "2025-01-16T14:30:00.000Z"
    },
    {
      "threshold": "revision_3rounds_Physics_Thermodynamics",
      "xpAmount": 20,
      "awardedAt": "2025-01-16T16:00:00.000Z"
    }
  ],
  "totalXPForDay": 55
}
```

### Response Fields

**Root Object:**
- `date` (string): The requested date in YYYY-MM-DD format
- `awards` (array): Array of XP award objects
- `totalXPForDay` (number): Sum of all XP amounts for the day

**Awards Array:**
Each award object contains:
- `threshold` (string): The threshold/rule that triggered the XP award (e.g., `focus_7h`, `exercise_daily`, `revision_3rounds_Physics_Thermodynamics`)
- `xpAmount` (number): Amount of XP awarded for this threshold
- `awardedAt` (string): ISO 8601 timestamp when the XP was awarded

### Common Threshold Values

- **Focus**: `focus_7h` (15 XP), `focus_11h` (30 XP)
- **Exercise**: `exercise_daily` (10 XP), `exercise_5day` (25 XP)
- **Meditation**: `meditation_daily` (10 XP), `meditation_5day` (25 XP)
- **Sleep**: `sleep_7day` (25 XP), `sleep_21day` (100 XP)
- **Revision**: `revision_3rounds_{subject}_{units}` (20 XP), `revision_5rounds_{subject}_{units}` (50 XP), `revision_weekly_{weekId}` (25 XP)

### Empty Response Example

If no XP awards exist for the date:

```json
{
  "date": "2025-01-16",
  "awards": [],
  "totalXPForDay": 0
}
```

### Error Responses

#### 400 Bad Request - Missing Date Parameter

**Request**: `GET /api/dashboard/xp/daily` (no date parameter)

**Response**:
```json
{
  "message": "Date query parameter is required"
}
```

#### 400 Bad Request - Invalid Date Format

**Request**: `GET /api/dashboard/xp/daily?date=2025/01/16` (wrong format)

**Response**:
```json
{
  "message": "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)"
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

#### 500 Internal Server Error

**Response**:
```json
{
  "message": "Failed to fetch daily XP awards"
}
```

---

## Step 4: Get Total XP for User

**Endpoint**: `GET /api/dashboard/xp/total`

This endpoint fetches the user's total accumulated XP across all time.

### Request

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/dashboard/xp/total`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

### Request Parameters

No query parameters required.

### Backend Processing Rules

1. **User XP Record**:
   - Fetches the `UserXP` record for the authenticated user
   - Uses `userId` from the JWT token

2. **Default Value**:
   - If no `UserXP` record exists (user hasn't earned any XP yet), returns `totalXP: 0`
   - `lastUpdated` will be `null` if no record exists

### Expected Response (200 OK)

```json
{
  "userId": "user-id-123",
  "totalXP": 250,
  "lastUpdated": "2025-01-16T18:30:00.000Z"
}
```

### Response Fields

- `userId` (string): The user's ID
- `totalXP` (number): Total accumulated XP across all time
- `lastUpdated` (string | null): ISO 8601 timestamp of when the total XP was last updated, or `null` if no XP record exists

### Response for New User (No XP Yet)

If the user hasn't earned any XP:

```json
{
  "userId": "user-id-123",
  "totalXP": 0,
  "lastUpdated": null
}
```

### Error Responses

#### 401 Unauthorized - Missing Token

**Request**: Without `Authorization` header

**Response**:
```json
{
  "message": "Authorization token missing"
}
```

#### 500 Internal Server Error

**Response**:
```json
{
  "message": "Failed to fetch total XP"
}
```

---

## XP API Test Cases

### Test Case 1: Get Daily XP Awards with Data

1. **Prerequisites**: 
   - User has earned XP on a specific date (e.g., completed focus sessions, exercise, etc.)

2. **Request**: 
   ```
   GET /api/dashboard/xp/daily?date=2025-01-16
   Authorization: Bearer <valid_token>
   ```

3. **Expected**: 
   - Status: 200 OK
   - Response contains `date`, `awards` array, and `totalXPForDay`
   - Awards are ordered chronologically by `awardedAt`
   - `totalXPForDay` equals sum of all `xpAmount` values

### Test Case 2: Get Daily XP Awards with No Data

1. **Request**: 
   ```
   GET /api/dashboard/xp/daily?date=2025-12-31
   Authorization: Bearer <valid_token>
   ```
   (Use a date with no XP awards)

2. **Expected**: 
   - Status: 200 OK
   - Response contains empty `awards` array
   - `totalXPForDay` is 0

### Test Case 3: Get Daily XP Awards - Missing Date Parameter

1. **Request**: 
   ```
   GET /api/dashboard/xp/daily
   Authorization: Bearer <valid_token>
   ```

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "Date query parameter is required"

### Test Case 4: Get Daily XP Awards - Invalid Date Format

1. **Request**: 
   ```
   GET /api/dashboard/xp/daily?date=01-16-2025
   Authorization: Bearer <valid_token>
   ```

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)"

### Test Case 5: Get Total XP with Existing Record

1. **Prerequisites**: 
   - User has earned some XP (has `UserXP` record)

2. **Request**: 
   ```
   GET /api/dashboard/xp/total
   Authorization: Bearer <valid_token>
   ```

3. **Expected**: 
   - Status: 200 OK
   - Response contains `userId`, `totalXP` (greater than 0), and `lastUpdated` timestamp

### Test Case 6: Get Total XP for New User

1. **Prerequisites**: 
   - User has never earned any XP (no `UserXP` record)

2. **Request**: 
   ```
   GET /api/dashboard/xp/total
   Authorization: Bearer <valid_token>
   ```

3. **Expected**: 
   - Status: 200 OK
   - Response contains `userId`, `totalXP: 0`, and `lastUpdated: null`

### Test Case 7: User Isolation - Daily XP Awards

1. **Prerequisites**: 
   - User A has earned XP on a date
   - User B has earned different XP on the same date

2. **Request**: 
   ```
   GET /api/dashboard/xp/daily?date=2025-01-16
   Authorization: Bearer <user_b_token>
   ```

3. **Expected**: 
   - Status: 200 OK
   - Response only contains User B's XP awards
   - User A's awards are not included

### Test Case 8: User Isolation - Total XP

1. **Prerequisites**: 
   - User A has 100 total XP
   - User B has 50 total XP

2. **Request**: 
   ```
   GET /api/dashboard/xp/total
   Authorization: Bearer <user_b_token>
   ```

3. **Expected**: 
   - Status: 200 OK
   - Response shows `totalXP: 50` (User B's total)
   - User A's total is not shown

---

## Complete Postman Workflow (Updated)

### Step-by-Step Testing

1. **Get Authentication Token**:
   - Register or login to get JWT token
   - Store token in Postman environment variable (e.g., `jwt_token`)

2. **Create Test Data** (Optional):
   - Complete focus sessions to earn focus XP
   - Track exercise/meditation to earn activity XP
   - Complete revisions to earn revision XP
   - Track sleep to earn sleep XP

3. **Test History Endpoint**:
   - Set up GET request: `http://localhost:5000/api/dashboard/history?date=2025-01-16`
   - Add header: `Authorization: Bearer {{jwt_token}}`
   - Send request and verify response

4. **Test Daily XP Awards Endpoint**:
   - Set up GET request: `http://localhost:5000/api/dashboard/xp/daily?date=2025-01-16`
   - Add header: `Authorization: Bearer {{jwt_token}}`
   - Send request and verify response
   - Check that `totalXPForDay` matches sum of all awards

5. **Test Total XP Endpoint**:
   - Set up GET request: `http://localhost:5000/api/dashboard/xp/total`
   - Add header: `Authorization: Bearer {{jwt_token}}`
   - Send request and verify response
   - Verify `totalXP` matches cumulative XP from all days

6. **Test Edge Cases**:
   - Test with different date formats
   - Test with dates that have no data
   - Test without authentication
   - Test with invalid token

---

## Postman Environment Variables (Updated)

To make testing easier, set up these environment variables in Postman:

1. **base_url**: `http://localhost:5000`
2. **jwt_token**: Your JWT token from login/register

Then use in requests:
- History: `{{base_url}}/api/dashboard/history?date=2025-01-16`
- Daily XP: `{{base_url}}/api/dashboard/xp/daily?date=2025-01-16`
- Total XP: `{{base_url}}/api/dashboard/xp/total`
- Header: `Authorization: Bearer {{jwt_token}}`

---

## Notes (Updated)

- **Date Format**: Always use `YYYY-MM-DD` format (e.g., `2025-01-16`)
- **Time Zone**: Dates are handled in UTC. The backend sets time to 00:00:00 for the start of the day
- **XP Awards**: Awards are ordered chronologically by when they were earned (`awardedAt`)
- **Total XP**: Represents cumulative XP across all time, not just a single day
- **User Isolation**: Each user only sees their own XP data
- **Empty Arrays**: If no awards exist for a date, empty array is returned (not null)
- **Threshold Names**: Threshold names encode the activity type and conditions (e.g., `focus_7h`, `revision_3rounds_Physics_Thermodynamics`)

---

## Troubleshooting (Updated)

### Issue: "Date query parameter is required"
**Solution**: Ensure the `date` query parameter is included in the URL: `?date=2025-01-16`

### Issue: "Invalid date format"
**Solution**: Use the exact format `YYYY-MM-DD` (e.g., `2025-01-16`, not `2025/01/16` or `01-16-2025`)

### Issue: "Authorization token missing"
**Solution**: Add the `Authorization` header with format: `Bearer <your_token>`

### Issue: Daily XP shows 0 when you know you earned XP
**Solution**: 
- Verify the date matches exactly (time is normalized to start of day)
- Check that XP was actually awarded (check server logs)
- Ensure you're using the correct user's token
- Verify the date you're querying matches when XP was earned

### Issue: Total XP doesn't match sum of daily XP
**Solution**: 
- Total XP is cumulative across all time, not just one day
- Sum daily XP across all dates to match total
- Check if XP was awarded on dates you haven't queried yet

### Issue: XP awards from other users appearing
**Solution**: This should not happen. Verify you're using the correct JWT token for the intended user.

---

## Related APIs (Updated)

- **Create Target**: `POST /api/targets` (see Target Management API guide)
- **Create Revision**: `POST /api/revisions` (see Revision API guide)
- **Get Targets by Date**: `GET /api/targets/today`
- **Get Revisions by Date**: `GET /api/revisions?date=YYYY-MM-DD`
- **Track Focus Session**: `POST /api/focus` (earns focus XP)
- **Track Exercise/Meditation**: `POST /api/wellness/activity` (earns activity XP)
- **Track Sleep**: `POST /api/wellness/sleep` (earns sleep XP)

---

## Example: Complete Request/Response Flow

### Daily XP Awards Request
```
GET http://localhost:5000/api/dashboard/xp/daily?date=2025-01-16
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcwNTQwMDAwMCwiZXhwIjoxNzA1NDg2NDAwfQ.signature
```

### Daily XP Awards Response
```json
{
  "date": "2025-01-16",
  "awards": [
    {
      "threshold": "focus_7h",
      "xpAmount": 15,
      "awardedAt": "2025-01-16T10:30:00.000Z"
    },
    {
      "threshold": "exercise_daily",
      "xpAmount": 10,
      "awardedAt": "2025-01-16T12:00:00.000Z"
    },
    {
      "threshold": "meditation_daily",
      "xpAmount": 10,
      "awardedAt": "2025-01-16T14:30:00.000Z"
    }
  ],
  "totalXPForDay": 35
}
```

### Total XP Request
```
GET http://localhost:5000/api/dashboard/xp/total
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcwNTQwMDAwMCwiZXhwIjoxNzA1NDg2NDAwfQ.signature
```

### Total XP Response
```json
{
  "userId": "123456",
  "totalXP": 250,
  "lastUpdated": "2025-01-16T18:30:00.000Z"
}
```

---

## Step 5: Get Today's Efficiency

**Endpoint**: `GET /api/dashboard/efficiency/today`

This endpoint calculates and returns today's efficiency metrics based on targets in the database. **All calculations are performed on the backend using the targets table - no efficiency data is sent from frontend.**

### Request

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/dashboard/efficiency/today`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```
- **Query Parameters**: None - Backend automatically calculates for today

### Backend Processing Rules

1. **Date Handling**:
   - Automatically uses today's date (no frontend input needed)
   - Sets time to start of day (00:00:00)

2. **Target Data Fetching from Database**:
   - Queries `targets` table for all targets on today's date
   - Filters by authenticated user ID
   - Extracts: status, plannedHours, actualHours

3. **Efficiency Calculation** (All on Backend):
   - Counts targets by status from database: pending, completed, missed
   - **Completion Rate**: (completed targets / total targets) × 100
   - **Time Efficiency**: (actual hours / planned hours) × 100 for completed targets, capped at 100%
   - **Overall Efficiency**: (completion rate × 0.6) + (time efficiency × 0.4)

4. **Data Storage**:
   - Automatically creates or updates `DailyEfficiency` record
   - Stores all calculated metrics for future reference
   - No data received from frontend

### Expected Response (200 OK)

```json
{
  "date": "2025-01-16",
  "overallEfficiency": 75.5,
  "completionRate": 80.0,
  "timeEfficiency": 68.0,
  "totalTargets": 5,
  "completedTargets": 4,
  "missedTargets": 1,
  "pendingTargets": 0
}
```

### Response Fields

- `date` (string): Today's date in YYYY-MM-DD format
- `overallEfficiency` (number): Weighted efficiency score (0-100)
- `completionRate` (number): Percentage of targets completed (0-100)
- `timeEfficiency` (number): Percentage of planned time vs actual time (0-100)
- `totalTargets` (number): Total number of targets for today
- `completedTargets` (number): Number of completed targets
- `missedTargets` (number): Number of missed targets
- `pendingTargets` (number): Number of pending targets

### No Data Response

If no targets exist for today:

```json
{
  "date": "2025-01-16",
  "message": "No targets found for today",
  "efficiency": null
}
```

### Error Responses

#### 401 Unauthorized - Missing Token

**Request**: Without `Authorization` header

**Response**:
```json
{
  "message": "Unauthorized"
}
```

#### 500 Internal Server Error

**Response**:
```json
{
  "message": "Failed to fetch today's efficiency"
}
```

---

## Step 6: Get 7-Day Average Efficiency

**Endpoint**: `GET /api/dashboard/efficiency/week`

This endpoint calculates 7-day efficiency averages and daily breakdown based on targets in the database. **All calculations are performed on the backend from the targets table - no data is received from frontend.**

### Request

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/dashboard/efficiency/week`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```
- **Query Parameters**: None - Backend automatically calculates for last 7 days

### Backend Processing Rules

1. **Date Range Calculation**:
   - Automatically calculates last 7 days (including today)
   - Example: If today is 2025-01-16, fetches data from 2025-01-10 to 2025-01-16
   - No frontend input needed for date range

2. **Data Fetching from Database**:
   - Retrieves `DailyEfficiency` records from database for 7-day range
   - If records don't exist, automatically calculates them from targets table
   - Each calculation queries targets table for that specific day

3. **Averaging and Aggregation** (All on Backend):
   - Averages all metrics across the 7 days
   - Includes only days with targets in calculations
   - Totals: sums targets, completed, missed across all 7 days

4. **Breakdown**:
   - Provides detailed daily breakdown for trend analysis
   - All values extracted from database calculations, not frontend

### Expected Response (200 OK)

```json
{
  "weeklyAverage": {
    "overallEfficiency": 72.3,
    "completionRate": 78.5,
    "timeEfficiency": 64.2,
    "totalTargets": 35,
    "totalCompleted": 28,
    "totalMissed": 3,
    "daysTracked": 7
  },
  "dailyBreakdown": [
    {
      "date": "2025-01-10",
      "overallEfficiency": 70.0,
      "completionRate": 75.0,
      "timeEfficiency": 63.0,
      "totalTargets": 4,
      "completedTargets": 3,
      "missedTargets": 1
    },
    {
      "date": "2025-01-11",
      "overallEfficiency": 75.5,
      "completionRate": 80.0,
      "timeEfficiency": 68.0,
      "totalTargets": 5,
      "completedTargets": 4,
      "missedTargets": 0
    }
  ]
}
```

### Response Fields

**Weekly Average:**
- `overallEfficiency` (number): Average of all daily overall efficiencies
- `completionRate` (number): Average completion rate across 7 days
- `timeEfficiency` (number): Average time efficiency across 7 days
- `totalTargets` (number): Sum of targets across all 7 days
- `totalCompleted` (number): Sum of completed targets across all 7 days
- `totalMissed` (number): Sum of missed targets across all 7 days
- `daysTracked` (number): Number of days with data in the 7-day period

**Daily Breakdown:**
Array of daily efficiency objects (same fields as today's efficiency response)

### No Data Response

If no targets exist for any of the last 7 days:

```json
{
  "message": "No efficiency data available for the past 7 days",
  "weeklyAverage": null,
  "dailyBreakdown": []
}
```

### Error Responses

#### 401 Unauthorized - Missing Token

**Request**: Without `Authorization` header

**Response**:
```json
{
  "message": "Unauthorized"
}
```

#### 500 Internal Server Error

**Response**:
```json
{
  "message": "Failed to fetch week efficiency"
}
```

---

## Step 7: Get Efficiency History for Date Range

**Endpoint**: `GET /api/dashboard/efficiency/history?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

This endpoint fetches calculated efficiency metrics for a custom date range based on targets in the database. **All calculations are performed on the backend from the targets table - no efficiency data is sent from frontend.**

### Request

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/dashboard/efficiency/history?startDate=2025-01-10&endDate=2025-01-16`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```
- **Query Parameters**: Only dates - Backend calculates all metrics

### Request Parameters

| Parameter | Type   | Required | Description                    | Example      |
|-----------|--------|----------|--------------------------------|--------------|
| `startDate` | string | Yes      | Start date in YYYY-MM-DD format | `2025-01-10` |
| `endDate`   | string | Yes      | End date in YYYY-MM-DD format   | `2025-01-16` |

### Backend Processing Rules

1. **Date Validation and Parsing** (Backend):
   - Validates both dates are in YYYY-MM-DD format
   - Validates dates are actual calendar dates
   - Ensures startDate ≤ endDate
   - No date data sent from frontend

2. **Data Fetching from Database** (Backend):
   - Queries `DailyEfficiency` table for the date range
   - If records don't exist, calculates from targets table
   - Each calculation uses targets table data
   - Returns records ordered by date (ascending)

3. **Calculation** (All Backend):
   - For each date in range, queries targets table
   - Calculates efficiency metrics from target statuses and hours
   - Stores in DailyEfficiency table
   - Returns calculated results (not frontend input)

### Expected Response (200 OK)

```json
{
  "startDate": "2025-01-10",
  "endDate": "2025-01-16",
  "recordsFound": 7,
  "history": [
    {
      "date": "2025-01-10",
      "overallEfficiency": 70.0,
      "completionRate": 75.0,
      "timeEfficiency": 63.0,
      "totalTargets": 4,
      "completedTargets": 3,
      "missedTargets": 1,
      "pendingTargets": 0
    },
    {
      "date": "2025-01-11",
      "overallEfficiency": 75.5,
      "completionRate": 80.0,
      "timeEfficiency": 68.0,
      "totalTargets": 5,
      "completedTargets": 4,
      "missedTargets": 0,
      "pendingTargets": 1
    }
  ]
}
```

### Response Fields

- `startDate` (string): The provided start date
- `endDate` (string): The provided end date
- `recordsFound` (number): Count of efficiency records found
- `history` (array): Array of daily efficiency objects for the date range

**Each History Item:**
- `date` (string): Date in YYYY-MM-DD format
- `overallEfficiency` (number): Efficiency score (0-100)
- `completionRate` (number): Completion percentage (0-100)
- `timeEfficiency` (number): Time efficiency percentage (0-100)
- `totalTargets` (number): Total targets for the day
- `completedTargets` (number): Completed targets for the day
- `missedTargets` (number): Missed targets for the day
- `pendingTargets` (number): Pending targets for the day

### Empty Response Example

If no efficiency records exist in the range:

```json
{
  "startDate": "2025-01-10",
  "endDate": "2025-01-16",
  "recordsFound": 0,
  "history": []
}
```

### Error Responses

#### 400 Bad Request - Missing Date Parameters

**Request**: `GET /api/dashboard/efficiency/history` (no query parameters)

**Response**:
```json
{
  "message": "Both startDate and endDate query parameters are required"
}
```

#### 400 Bad Request - Invalid Date Format

**Request**: `GET /api/dashboard/efficiency/history?startDate=01/10/2025&endDate=2025-01-16`

**Response**:
```json
{
  "message": "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-01)"
}
```

#### 400 Bad Request - Invalid Date Value

**Request**: `GET /api/dashboard/efficiency/history?startDate=2025-13-45&endDate=2025-01-16`

**Response**:
```json
{
  "message": "Invalid date"
}
```

#### 400 Bad Request - Start Date After End Date

**Request**: `GET /api/dashboard/efficiency/history?startDate=2025-01-16&endDate=2025-01-10`

**Response**:
```json
{
  "message": "startDate must be before or equal to endDate"
}
```

#### 401 Unauthorized - Missing Token

**Request**: Without `Authorization` header

**Response**:
```json
{
  "message": "Unauthorized"
}
```

---

## Step 8: Recalculate Efficiency for Specific Date

**Endpoint**: `POST /api/dashboard/efficiency/recalculate`

This endpoint recalculates efficiency metrics for a specific date based on current targets in the database. **All metrics are calculated from the targets table - only date is sent from frontend.**

### Request

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/dashboard/efficiency/recalculate`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "date": "2025-01-16"
  }
  ```

### Request Parameters

| Field | Type   | Required | Description                    | Example      |
|-------|--------|----------|--------------------------------|--------------|
| `date` | string | Yes      | Date in YYYY-MM-DD format      | `2025-01-16` |

### Backend Processing Rules

1. **Date Validation** (Backend):
   - Validates date is in YYYY-MM-DD format
   - Validates it's a valid calendar date

2. **Targets Fetching from Database** (Backend):
   - Queries targets table for the specified date
   - Filters by authenticated user
   - Extracts status, plannedHours, actualHours

3. **Recalculation** (All Backend):
   - Recalculates all efficiency metrics from scratch
   - Uses current target data from database
   - Compares actual vs planned hours from targets table
   - Updates or creates `DailyEfficiency` record

4. **Return Calculated Data** (Backend):
   - Returns newly calculated efficiency metrics
   - No data sent from frontend, all from database calculations

### Expected Response (200 OK)

```json
{
  "message": "Efficiency recalculated successfully",
  "date": "2025-01-16",
  "efficiency": {
    "overallEfficiency": 75.5,
    "completionRate": 80.0,
    "timeEfficiency": 68.0,
    "totalTargets": 5,
    "completedTargets": 4,
    "missedTargets": 1,
    "pendingTargets": 0
  }
}
```

### Response Fields

- `message` (string): Success confirmation message
- `date` (string): The date that was recalculated
- `efficiency` (object): Updated efficiency metrics
  - `overallEfficiency` (number): Weighted efficiency score
  - `completionRate` (number): Completion percentage
  - `timeEfficiency` (number): Time efficiency percentage
  - `totalTargets` (number): Total targets on that date
  - `completedTargets` (number): Completed targets
  - `missedTargets` (number): Missed targets
  - `pendingTargets` (number): Pending targets

### No Targets Response

If no targets exist for the date:

```json
{
  "message": "No targets found for the specified date",
  "date": "2025-01-16",
  "efficiency": null
}
```

### Error Responses

#### 400 Bad Request - Missing Date

**Request**: `POST /api/dashboard/efficiency/recalculate` with empty body

**Response**:
```json
{
  "message": "Date is required in request body (format: YYYY-MM-DD)"
}
```

#### 400 Bad Request - Invalid Date Format

**Request**: 
```json
{
  "date": "01/16/2025"
}
```

**Response**:
```json
{
  "message": "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-27)"
}
```

#### 400 Bad Request - Invalid Date Value

**Request**: 
```json
{
  "date": "2025-13-45"
}
```

**Response**:
```json
{
  "message": "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-27)"
}
```

#### 401 Unauthorized - Missing Token

**Request**: Without `Authorization` header

**Response**:
```json
{
  "message": "Unauthorized"
}
```

#### 500 Internal Server Error

**Response**:
```json
{
  "message": "Failed to recalculate efficiency"
}
```

---

## Efficiency API Test Cases

### Test Case 1: Get Today's Efficiency with Data

1. **Prerequisites**: 
   - Create multiple targets for today with different statuses using the targets API
   - Mark some as completed, some as missed, some as pending
   - Set plannedHours and actualHours for completed targets in the database

2. **Request** (Frontend only sends auth token, no efficiency data): 
   ```
   GET /api/dashboard/efficiency/today
   Authorization: Bearer <valid_token>
   ```

3. **Backend Processing**: 
   - Queries targets table for today
   - Calculates all metrics from target data
   - Returns calculated efficiency

4. **Expected**: 
   - Status: 200 OK
   - Response contains all efficiency metrics calculated from targets table
   - completionRate = (completed / total) × 100 from database counts
   - overallEfficiency = (completionRate × 0.6) + (timeEfficiency × 0.4)
   - All values derived from targets table, not frontend input

### Test Case 2: Get Today's Efficiency with No Data

1. **Request**: 
   ```
   GET /api/dashboard/efficiency/today
   Authorization: Bearer <valid_token>
   ```
   (On a day with no targets)

2. **Expected**: 
   - Status: 200 OK
   - Response shows "No targets found for today"
   - efficiency field is null

### Test Case 3: Get 7-Day Average Efficiency

1. **Prerequisites**: 
   - Ensure targets exist in database for the last 7 days
   - Some days may have multiple targets from targets table

2. **Request** (Frontend only sends auth, backend calculates everything): 
   ```
   GET /api/dashboard/efficiency/week
   Authorization: Bearer <valid_token>
   ```

3. **Backend Processing**: 
   - Queries targets table for last 7 days
   - Calculates efficiency for each day from targets
   - Averages all metrics across 7 days
   - Returns both weekly average and daily breakdown

4. **Expected**: 
   - Status: 200 OK
   - weeklyAverage contains averaged metrics calculated from targets table
   - dailyBreakdown contains all 7 days of calculated data
   - daysTracked = number of days with targets in database
   - All calculations done on backend from targets table

### Test Case 4: Get 7-Day Average with Partial Data

1. **Prerequisites**: 
   - Only 3 of the last 7 days have targets

2. **Request**: 
   ```
   GET /api/dashboard/efficiency/week
   Authorization: Bearer <valid_token>
   ```

3. **Expected**: 
   - Status: 200 OK
   - daysTracked = 3
   - Averages calculated only from 3 days with data

### Test Case 5: Get 7-Day Average with No Data

1. **Request**: 
   ```
   GET /api/dashboard/efficiency/week
   Authorization: Bearer <valid_token>
   ```
   (New user with no targets in past 7 days)

2. **Expected**: 
   - Status: 200 OK
   - Message: "No efficiency data available for the past 7 days"
   - weeklyAverage is null
   - dailyBreakdown is empty array

### Test Case 6: Get Efficiency History for Valid Date Range

1. **Prerequisites**: 
   - Create targets in database across multiple dates
   - Example: Create targets from 2025-01-10 to 2025-01-20

2. **Request** (Frontend only sends date range parameters): 
   ```
   GET /api/dashboard/efficiency/history?startDate=2025-01-10&endDate=2025-01-16
   Authorization: Bearer <valid_token>
   ```

3. **Backend Processing**: 
   - Queries targets table for each day in the range
   - Calculates efficiency for each day from targets
   - Returns calculated efficiency for days with targets
   - No data from frontend, all from database

4. **Expected**: 
   - Status: 200 OK
   - recordsFound shows count of days with targets in database
   - history array contains efficiency calculated from targets for each day
   - All values derived from targets table, not frontend input

### Test Case 7: Get Efficiency History - Missing Parameters

1. **Request**: 
   ```
   GET /api/dashboard/efficiency/history
   Authorization: Bearer <valid_token>
   ```
   (No query parameters)

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "Both startDate and endDate query parameters are required"

### Test Case 8: Get Efficiency History - Invalid Date Format

1. **Request**: 
   ```
   GET /api/dashboard/efficiency/history?startDate=01-10-2025&endDate=2025-01-16
   Authorization: Bearer <valid_token>
   ```

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-01)"

### Test Case 9: Get Efficiency History - Start Date After End Date

1. **Request**: 
   ```
   GET /api/dashboard/efficiency/history?startDate=2025-01-16&endDate=2025-01-10
   Authorization: Bearer <valid_token>
   ```

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "startDate must be before or equal to endDate"

### Test Case 10: Get Efficiency History - No Data in Range

1. **Request**: 
   ```
   GET /api/dashboard/efficiency/history?startDate=2099-01-01&endDate=2099-01-31
   Authorization: Bearer <valid_token>
   ```

2. **Expected**: 
   - Status: 200 OK
   - recordsFound: 0
   - history: empty array

### Test Case 11: Recalculate Efficiency for Specific Date

1. **Prerequisites**: 
   - Create targets in database for a specific date
   - Initial efficiency is calculated from targets table
   - Modify target status in database (e.g., change pending to completed)

2. **Request** (Frontend only sends date, no efficiency data): 
   ```
   POST /api/dashboard/efficiency/recalculate
   Authorization: Bearer <valid_token>
   Content-Type: application/json
   
   {
     "date": "2025-01-16"
   }
   ```

3. **Backend Processing**: 
   - Queries targets table for the specified date
   - Recalculates all metrics from current target data
   - Compares actual vs planned hours from database
   - Updates DailyEfficiency with newly calculated values
   - Returns only calculated metrics (no frontend data)

4. **Expected**: 
   - Status: 200 OK
   - Message: "Efficiency recalculated successfully"
   - efficiency shows updated metrics reflecting current target data from database
   - All calculations based on targets table, not frontend input

### Test Case 12: Recalculate Efficiency - Missing Date

1. **Request**: 
   ```
   POST /api/dashboard/efficiency/recalculate
   Authorization: Bearer <valid_token>
   Content-Type: application/json
   
   {}
   ```

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "Date is required in request body (format: YYYY-MM-DD)"

### Test Case 13: Recalculate Efficiency - Invalid Date Format

1. **Request**: 
   ```
   POST /api/dashboard/efficiency/recalculate
   Authorization: Bearer <valid_token>
   Content-Type: application/json
   
   {
     "date": "2025/01/16"
   }
   ```

2. **Expected**: 
   - Status: 400 Bad Request
   - Message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-27)"

### Test Case 14: Recalculate Efficiency - No Targets

1. **Request**: 
   ```
   POST /api/dashboard/efficiency/recalculate
   Authorization: Bearer <valid_token>
   Content-Type: application/json
   
   {
     "date": "2025-12-31"
   }
   ```
   (Date with no targets)

2. **Expected**: 
   - Status: 200 OK
   - Message: "No targets found for the specified date"
   - efficiency: null

### Test Case 15: User Isolation - Efficiency Data

1. **Prerequisites**: 
   - User A creates targets for 2025-01-16
   - User B creates different targets for the same date

2. **Request as User B**: 
   ```
   GET /api/dashboard/efficiency/today
   Authorization: Bearer <user_b_token>
   ```

3. **Expected**: 
   - User B only sees their own targets' efficiency
   - User A's data is not included

### Test Case 16: Efficiency Calculation Accuracy (Backend Calculation from Targets)

1. **Prerequisites**: 
   - Create 5 targets in database with specific data:
     - 3 completed with planned=2h, actual=1.5h (75% efficient)
     - 1 missed
     - 1 pending
   - All data stored in targets table

2. **Expected Calculation** (Done on Backend from Targets Table):
   - Completion Rate: 3/5 = 60%
   - Time Efficiency: (75% + 75% + 75%) / 3 = 75%
   - Overall Efficiency: (60 × 0.6) + (75 × 0.4) = 36 + 30 = 66%

3. **Request** (Frontend only sends auth, no calculation data): 
   ```
   GET /api/dashboard/efficiency/today
   Authorization: Bearer <valid_token>
   ```

4. **Backend Processing**: 
   - Queries targets table
   - Fetches status, plannedHours, actualHours from database
   - Performs all calculations on backend
   - Returns calculated results

5. **Expected**: 
   - overallEfficiency ≈ 66.0 (calculated from targets table)
   - completionRate ≈ 60.0 (counted from targets table)
   - timeEfficiency ≈ 75.0 (calculated from targets table hours)
   - All metrics derived from targets table data only

---

## Complete Efficiency Testing Workflow

### Step-by-Step Testing

1. **Get Authentication Token**:
   - Register or login to get JWT token
   - Store token in Postman environment variable (e.g., `jwt_token`)

2. **Create Test Data** (in Targets Table):
   - Create multiple targets for different dates via targets API
   - Set status to pending, completed, or missed
   - Set plannedHours and actualHours for completed targets
   - All data stored in targets table (no frontend efficiency input)

3. **Test Today's Efficiency** (Backend Calculates from Targets):
   - Request: `GET /api/dashboard/efficiency/today`
   - Backend queries targets table for today
   - Backend calculates all metrics from target data
   - Verify metrics match manual calculation from targets
   - Test with no data scenario

4. **Test Week Efficiency** (Backend Calculates from Targets):
   - Request: `GET /api/dashboard/efficiency/week`
   - Backend queries targets table for last 7 days
   - Backend calculates daily efficiency from target data
   - Backend averages metrics across 7 days
   - Verify daily breakdown matches individual calculations

5. **Test Efficiency History** (Backend Calculates from Targets):
   - Request: `GET /api/dashboard/efficiency/history?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
   - Backend queries targets table for date range
   - Backend calculates efficiency for each day
   - Test with various date ranges
   - Test edge cases (no data, invalid dates)

6. **Test Recalculate** (Backend Recalculates from Updated Targets):
   - Modify target statuses in database
   - Request: `POST /api/dashboard/efficiency/recalculate`
   - Backend re-queries targets table
   - Verify updated metrics reflect changes in targets table
   - Confirm calculations from current target data

7. **Test Error Handling**:
   - Test all error scenarios
   - Verify error messages are descriptive
   - Verify HTTP status codes are correct

8. **Verify No Frontend Data Needed**:
   - Frontend only sends: user token and date parameters
   - Frontend never sends efficiency data
   - All metrics calculated on backend from targets table
   - All stored and returned from database

---

## Postman Environment Variables (Updated)

To make testing easier, set up these environment variables in Postman:

1. **base_url**: `http://localhost:5000`
2. **jwt_token**: Your JWT token from login/register

Then use in requests:
- Today: `{{base_url}}/api/dashboard/efficiency/today`
- Week: `{{base_url}}/api/dashboard/efficiency/week`
- History: `{{base_url}}/api/dashboard/efficiency/history?startDate=2025-01-10&endDate=2025-01-16`
- Recalculate: `{{base_url}}/api/dashboard/efficiency/recalculate`
- Header: `Authorization: Bearer {{jwt_token}}`

---

## Efficiency Calculation Formula

**Completion Rate**:
$$\text{Completion Rate} = \frac{\text{Completed Targets}}{\text{Total Targets}} \times 100$$

**Time Efficiency** (per completed target):
$$\text{Target Efficiency} = \min\left(\frac{\text{Actual Hours}}{\text{Planned Hours}} \times 100, 100\right)$$

**Overall Time Efficiency**:
$$\text{Time Efficiency} = \frac{\sum \text{Target Efficiencies}}{\text{Number of Completed Targets}}$$

**Overall Efficiency**:
$$\text{Overall Efficiency} = (\text{Completion Rate} \times 0.6) + (\text{Time Efficiency} \times 0.4)$$

---

## Troubleshooting

### Issue: "Unauthorized" response
**Solution**: Ensure the `Authorization` header is included with format: `Bearer <your_token>`

### Issue: Efficiency shows 0 when you know you have targets
**Solution**: 
- Verify targets exist in database with correct `startTime` (must fall on the target date)
- Check that target status is set (pending, completed, or missed)
- Verify planned hours and actual hours are set correctly for completed targets
- Ensure you're querying the correct date (time is normalized to start of day)
- Backend queries targets table, so ensure data is saved there

### Issue: Overall Efficiency doesn't match manual calculation
**Solution**: 
- Verify completion rate: (completed / total) × 100
- Verify time efficiency is capped at 100%
- Check the formula: (completion × 0.6) + (time efficiency × 0.4)
- Ensure you're using the same target data from targets table that backend queries

### Issue: Week efficiency shows partial data
**Solution**: 
- Check `daysTracked` to see how many days have targets in database
- Averages are calculated only from days with target data
- Create targets on more days if you want full 7-day coverage
- Backend calculates from targets table, check if targets exist for those dates

### Issue: Recalculate doesn't show updated values
**Solution**: 
- Ensure you updated the target data in database before recalculating
- Check that target status was actually changed in targets table
- Verify the date format is correct (YYYY-MM-DD)
- Backend reads from targets table, so changes must be in database

### Issue: Date format errors
**Solution**: Always use `YYYY-MM-DD` format (e.g., `2025-01-16`, not `01-16-2025` or `2025/01/16`)

### Issue: Frontend sending efficiency data instead of targets
**Solution**: 
- Frontend should NOT send any efficiency metric data
- Frontend should only send: authentication token and date parameters
- All efficiency metrics must be calculated on backend from targets table
- Backend queries `targets` table for status, plannedHours, actualHours
- If efficiency seems wrong, check targets table data first

---

## Related APIs (Updated)

- **Create Target**: `POST /api/targets`
- **Update Target**: `PATCH /api/targets/:id`
- **Get History**: `GET /api/history?date=YYYY-MM-DD`
- **Get Daily XP**: `GET /api/dashboard/xp/daily?date=YYYY-MM-DD`
- **Get Total XP**: `GET /api/dashboard/xp/total`

---

## Example: Complete Efficiency Request/Response Flow

### Get Today's Efficiency Request
```
GET http://localhost:5000/api/dashboard/efficiency/today
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcwNTQwMDAwMCwiZXhwIjoxNzA1NDg2NDAwfQ.signature
```

### Get Today's Efficiency Response
```json
{
  "date": "2025-01-16",
  "overallEfficiency": 75.5,
  "completionRate": 80.0,
  "timeEfficiency": 68.0,
  "totalTargets": 5,
  "completedTargets": 4,
  "missedTargets": 1,
  "pendingTargets": 0
}
```

### Get Week Efficiency Request
```
GET http://localhost:5000/api/dashboard/efficiency/week
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Get Week Efficiency Response
```json
{
  "weeklyAverage": {
    "overallEfficiency": 72.3,
    "completionRate": 78.5,
    "timeEfficiency": 64.2,
    "totalTargets": 35,
    "totalCompleted": 28,
    "totalMissed": 3,
    "daysTracked": 7
  },
  "dailyBreakdown": [
    {
      "date": "2025-01-10",
      "overallEfficiency": 70.0,
      "completionRate": 75.0,
      "timeEfficiency": 63.0,
      "totalTargets": 4,
      "completedTargets": 3,
      "missedTargets": 1
    }
  ]
}
```

### Recalculate Efficiency Request
```
POST http://localhost:5000/api/dashboard/efficiency/recalculate
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "date": "2025-01-16"
}
```

### Recalculate Efficiency Response
```json
{
  "message": "Efficiency recalculated successfully",
  "date": "2025-01-16",
  "efficiency": {
    "overallEfficiency": 75.5,
    "completionRate": 80.0,
    "timeEfficiency": 68.0,
    "totalTargets": 5,
    "completedTargets": 4,
    "missedTargets": 1,
    "pendingTargets": 0
  }
}
```

---

**Happy Testing! 🚀**

