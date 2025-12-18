# Wellness API - Postman Testing Guide

All Wellness APIs require JWT authentication. This guide shows how to test Sleep Tracking, Exercise & Meditation, and Water Intake APIs using Postman.

The `DailyWellness` table is defined in `prisma/schema.prisma`:

```prisma
model DailyWellness {
  id               String   @id @default(uuid())
  date             DateTime
  sleptAt          DateTime?
  actualSleepTime  DateTime?
  actualWakeTime   DateTime?
  exerciseDone     Boolean  @default(false)
  meditationDone   Boolean  @default(false)
  waterIntakeMl    Int?
  userId           String
  user             User_info @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  @@unique([userId, date])
}
```

## Prerequisites

- **Base URL**: `http://localhost:5000`
- **Server running**: `npm run dev` or `npm start`
- **Postman** installed
- **JWT token** in a Postman environment variable (e.g. `jwt_token`), obtained from `POST /api/auth/login` or `/api/auth/register`

---

## Step 1: Get JWT Token

Before testing the Wellness APIs, you need to authenticate and get a JWT token.

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

## 1. Sleep Tracking API

### Endpoint
**POST** `/api/wellness/sleep`

### Purpose
Creates or updates the day's wellness record with sleep-related data. Only sleep-related fields are modified.

### Request

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/wellness/sleep`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```
- **Body** (raw JSON):
  ```json
  {
    "date": "2025-01-16",
    "sleptAt": "2025-01-15T23:30:00",
    "actualSleepTime": "2025-01-15T23:45:00",
    "actualWakeTime": "2025-01-16T06:30:00"
  }
  ```

### Request Body Fields

| Field            | Type   | Required | Description                          | Example                    |
|------------------|--------|----------|--------------------------------------|----------------------------|
| `date`           | string | Yes      | Date in YYYY-MM-DD format            | `"2025-01-16"`             |
| `sleptAt`        | string | No       | When user went to bed (ISO datetime) | `"2025-01-15T23:30:00"`    |
| `actualSleepTime`| string | No       | When user actually fell asleep        | `"2025-01-15T23:45:00"`    |
| `actualWakeTime` | string | No       | When user actually woke up           | `"2025-01-16T06:30:00"`    |

### Backend Behavior

- Validates date format (YYYY-MM-DD)
- Validates all datetime fields are valid ISO format
- Creates new wellness record if none exists for the date
- Updates existing wellness record if one exists (only sleep fields are modified)
- Does not affect exercise, meditation, or water intake data

### Expected Response (200 OK)

```json
{
  "message": "Sleep data saved successfully"
}
```

### Error Responses

#### 400 Bad Request - Missing Date

**Request**: Without `date` field

**Response**:
```json
{
  "message": "Date is required"
}
```

#### 400 Bad Request - Invalid Date Format

**Request**: `date: "2025/01/16"` (wrong format)

**Response**:
```json
{
  "message": "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)"
}
```

#### 400 Bad Request - Invalid DateTime Format

**Request**: `sleptAt: "invalid-date"`

**Response**:
```json
{
  "message": "Invalid date format for sleptAt"
}
```

#### 401 Unauthorized

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
  "message": "Failed to save sleep data"
}
```

### Test Cases

1. **Create New Sleep Record**:
   - Send POST with valid sleep data → expect 200
   - Verify record is created in database

2. **Update Existing Sleep Record**:
   - Create a record first, then send another POST with different sleep times → expect 200
   - Verify only sleep fields are updated, other fields remain unchanged

3. **Partial Sleep Data**:
   - Send POST with only `date` and `sleptAt` → expect 200
   - Verify record is created/updated with partial data

4. **Invalid Date Format**:
   - Send POST with `date: "01-16-2025"` → expect 400

5. **Invalid DateTime Format**:
   - Send POST with `actualSleepTime: "invalid"` → expect 400

6. **Missing Authentication**:
   - Remove Authorization header → expect 401

---

## 2. Exercise & Meditation Tracking API

### Endpoint
**POST** `/api/wellness/activity`

### Purpose
Updates boolean flags for exercise and meditation. Does not affect sleep or water data.

### Request

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/wellness/activity`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```
- **Body** (raw JSON):
  ```json
  {
    "date": "2025-01-16",
    "exerciseDone": true,
    "meditationDone": false
  }
  ```

### Request Body Fields

| Field            | Type    | Required | Description                          | Example     |
|------------------|---------|----------|--------------------------------------|-------------|
| `date`           | string  | Yes      | Date in YYYY-MM-DD format            | `"2025-01-16"` |
| `exerciseDone`   | boolean | No*      | Whether exercise was done today      | `true` or `false` |
| `meditationDone` | boolean | No*      | Whether meditation was done today    | `true` or `false` |

\* At least one of `exerciseDone` or `meditationDone` must be provided

### Backend Behavior

- Validates date format (YYYY-MM-DD)
- Validates at least one activity field is provided
- Validates boolean values are actual booleans
- Creates new wellness record if none exists for the date
- Updates existing wellness record if one exists (only activity fields are modified)
- Does not affect sleep or water intake data

### Expected Response (200 OK)

```json
{
  "message": "Activity data saved successfully"
}
```

### Error Responses

#### 400 Bad Request - Missing Date

**Response**:
```json
{
  "message": "Date is required"
}
```

#### 400 Bad Request - No Activity Fields

**Request**: `{ "date": "2025-01-16" }` (no activity fields)

**Response**:
```json
{
  "message": "At least one of exerciseDone or meditationDone must be provided"
}
```

#### 400 Bad Request - Invalid Boolean

**Request**: `exerciseDone: "yes"` (not a boolean)

**Response**:
```json
{
  "message": "exerciseDone must be a boolean"
}
```

#### 400 Bad Request - Invalid Date Format

**Response**:
```json
{
  "message": "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)"
}
```

### Test Cases

1. **Update Both Activities**:
   - Send POST with both `exerciseDone` and `meditationDone` → expect 200
   - Verify both flags are updated

2. **Update Only Exercise**:
   - Send POST with only `exerciseDone: true` → expect 200
   - Verify exercise flag is updated, meditation remains unchanged

3. **Update Only Meditation**:
   - Send POST with only `meditationDone: true` → expect 200
   - Verify meditation flag is updated, exercise remains unchanged

4. **Create New Record**:
   - Send POST for a date with no existing wellness record → expect 200
   - Verify new record is created with default values for other fields

5. **Invalid Boolean Value**:
   - Send POST with `exerciseDone: "true"` (string) → expect 400

6. **No Activity Fields**:
   - Send POST with only date → expect 400

---

## 3. Water Intake Tracking API (Upsert)

### Endpoint
**POST** `/api/wellness/water`

### Purpose
**Upsert operation**: Creates a new wellness record with water intake data if none exists for the date, or updates the existing record's water intake value. This allows you to track water intake throughout the day by updating the total as you drink more water.

### Request

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/wellness/water`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```
- **Body** (raw JSON):
  ```json
  {
    "date": "2025-01-16",
    "waterIntakeMl": 2500
  }
  ```

### Request Body Fields

| Field          | Type   | Required | Description                          | Example     |
|----------------|--------|----------|--------------------------------------|-------------|
| `date`         | string | Yes      | Date in YYYY-MM-DD format            | `"2025-01-16"` |
| `waterIntakeMl`| number | Yes      | Total water intake in milliliters    | `2500`      |

### Backend Behavior (Upsert)

- **Upsert Logic**: 
  - If no wellness record exists for the date → **Creates** a new record with water intake data
  - If a wellness record already exists for the date → **Updates** only the water intake field
- Validates date format (YYYY-MM-DD)
- Validates water intake is a non-negative number
- Only water intake field is modified (does not affect sleep, exercise, or meditation data)
- Value can be overwritten multiple times for the same day
- Uses unique constraint on `[userId, date]` to ensure one record per user per day

### Expected Response (200 OK)

```json
{
  "message": "Water intake data saved successfully"
}
```

### Error Responses

#### 400 Bad Request - Missing Date

**Response**:
```json
{
  "message": "Date is required"
}
```

#### 400 Bad Request - Missing Water Intake

**Request**: `{ "date": "2025-01-16" }` (no waterIntakeMl)

**Response**:
```json
{
  "message": "waterIntakeMl is required"
}
```

#### 400 Bad Request - Invalid Water Intake

**Request**: `waterIntakeMl: -100` (negative number)

**Response**:
```json
{
  "message": "waterIntakeMl must be a non-negative number"
}
```

#### 400 Bad Request - Invalid Date Format

**Response**:
```json
{
  "message": "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)"
}
```

### Test Cases

1. **Upsert - Create New Water Intake Record**:
   - Send POST with valid date and water intake for a date with no existing record → expect 200
   - Verify new wellness record is created with water intake data
   - Verify other fields (sleep, exercise, meditation) have default values

2. **Upsert - Update Existing Water Intake**:
   - First, create a wellness record (via sleep or activity endpoint)
   - Then send POST with water intake for the same date → expect 200
   - Verify water intake is updated, other fields remain unchanged

3. **Upsert - Multiple Updates Same Day**:
   - Send POST with `waterIntakeMl: 1000` → expect 200
   - Send POST again with `waterIntakeMl: 2500` (same date) → expect 200
   - Verify final value is 2500 (overwrites previous value)

3. **Zero Water Intake**:
   - Send POST with `waterIntakeMl: 0` → expect 200
   - Verify zero value is accepted

4. **Large Water Intake**:
   - Send POST with `waterIntakeMl: 5000` → expect 200
   - Verify large values are accepted

5. **Negative Water Intake**:
   - Send POST with `waterIntakeMl: -100` → expect 400

6. **Invalid Type**:
   - Send POST with `waterIntakeMl: "2500"` (string) → expect 400

---

## Complete Postman Workflow

### Step-by-Step Testing

1. **Get Authentication Token**:
   - Register or login to get JWT token
   - Store token in Postman environment variable (e.g., `jwt_token`)

2. **Track Sleep Data**:
   - Call `POST /api/wellness/sleep` with sleep times
   - Verify 200 response

3. **Track Activity**:
   - Call `POST /api/wellness/activity` with exercise/meditation flags
   - Verify 200 response

4. **Track Water Intake**:
   - Call `POST /api/wellness/water` with water intake amount
   - Verify 200 response

5. **Verify Data in History**:
   - Call `GET /api/history?date=2025-01-16`
   - Verify wellness data appears in response:
     ```json
     {
       "date": "2025-01-16",
       "targets": [...],
       "revisions": [...],
       "wellness": {
         "exercise": true,
         "meditation": false,
         "waterIntakeMl": 2500
       }
     }
     ```

6. **Test Updates**:
   - Update sleep data for the same date
   - Update activity flags
   - Update water intake
   - Verify each update works independently

---

## Postman Environment Variables

To make testing easier, set up these environment variables in Postman:

1. **base_url**: `http://localhost:5000`
2. **jwt_token**: Your JWT token from login/register

Then use in requests:
- URL: `{{base_url}}/api/wellness/sleep`
- Header: `Authorization: Bearer {{jwt_token}}`

---

## Business Rules Summary

### Sleep Tracking
- Creates or updates wellness record for the date
- **Only** sleep-related fields are modified (`sleptAt`, `actualSleepTime`, `actualWakeTime`)
- Does not affect exercise, meditation, or water data

### Activity Tracking
- Creates or updates wellness record for the date
- **Only** activity fields are modified (`exerciseDone`, `meditationDone`)
- Does not affect sleep or water data
- At least one activity field must be provided

### Water Intake (Upsert)
- **Upsert operation**: Creates new wellness record if none exists, or updates existing record
- **Only** water intake is modified (`waterIntakeMl`)
- Does not affect sleep or activity data
- Value can be overwritten multiple times for the same day
- Perfect for tracking cumulative water intake throughout the day

### Data Isolation
- Each user can only see and modify their own wellness data
- One wellness record per user per day (enforced by unique constraint)

---

## Integration with History API

The wellness data is automatically included in the History API response:

**GET** `/api/history?date=YYYY-MM-DD`

**Response includes wellness section:**
```json
{
  "date": "2025-01-16",
  "targets": [...],
  "revisions": [...],
  "wellness": {
    "exercise": true,
    "meditation": false,
    "waterIntakeMl": 2500
  }
}
```

If no wellness data exists for the date, default values are returned:
```json
{
  "wellness": {
    "exercise": false,
    "meditation": false,
    "waterIntakeMl": null
  }
}
```

---

## Common Testing Scenarios

### Scenario 1: Complete Daily Wellness Tracking

1. Track sleep: `POST /api/wellness/sleep`
2. Track exercise: `POST /api/wellness/activity` with `exerciseDone: true`
3. Track meditation: `POST /api/wellness/activity` with `meditationDone: true`
4. Track water: `POST /api/wellness/water` with `waterIntakeMl: 2500`
5. Get history: `GET /api/history?date=2025-01-16`
6. Verify all wellness data appears correctly

### Scenario 2: Partial Updates

1. Create wellness record with sleep data
2. Later, add exercise data (should not affect sleep)
3. Later, add water data (should not affect sleep or exercise)
4. Verify each update works independently

### Scenario 3: Water Intake Upsert (Multiple Updates)

1. First call: `POST /api/wellness/water` with `waterIntakeMl: 1000` → Creates new record
2. Second call: `POST /api/wellness/water` with `waterIntakeMl: 2000` (same date) → Updates existing record
3. Third call: `POST /api/wellness/water` with `waterIntakeMl: 3000` (same date) → Updates again
4. Get history: `GET /api/history?date=2025-01-16` → Verify final value is 3000
5. Verify only one record exists for the date (not three separate records)

### Scenario 4: Multiple Days

1. Track wellness for `2025-01-16`
2. Track wellness for `2025-01-17`
3. Get history for each date separately
4. Verify data is isolated per date

---

## Troubleshooting

### Issue: "Date is required"
**Solution**: Ensure `date` field is included in request body with YYYY-MM-DD format

### Issue: "Invalid date format"
**Solution**: Use exact format `YYYY-MM-DD` (e.g., `2025-01-16`, not `2025/01/16` or `01-16-2025`)

### Issue: "Authorization token missing"
**Solution**: Add `Authorization` header with format: `Bearer <your_token>`

### Issue: Data not appearing in history
**Solution**: 
- Verify wellness data was saved successfully (check response message)
- Ensure you're querying the same date
- Check that you're using the correct user's token

### Issue: Updates affecting wrong fields
**Solution**: This should not happen. Each endpoint only updates its specific fields. Verify you're calling the correct endpoint.

---

## Notes

- **Date Format**: Always use `YYYY-MM-DD` format (e.g., `2025-01-16`)
- **DateTime Format**: Use ISO 8601 format for datetime fields (e.g., `2025-01-15T23:30:00`)
- **Unique Constraint**: One wellness record per user per day (enforced by database)
- **Field Isolation**: Each endpoint only modifies its specific fields
- **Upsert Behavior**: 
  - All endpoints use upsert (create if not exists, update if exists)
  - **Water Intake API** is specifically designed as an upsert - perfect for tracking cumulative intake throughout the day
  - You can call the water intake endpoint multiple times per day to update the total
- **User Isolation**: Each user only sees and modifies their own wellness data

---

## Related APIs

- **Get History**: `GET /api/history?date=YYYY-MM-DD` - Includes wellness data
- **Authentication**: `POST /api/auth/register` or `POST /api/auth/login`

---

**Happy Testing! 🚀**

