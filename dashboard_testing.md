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

**Happy Testing! 🚀**

