# Performance API - Postman Testing Guide

All Performance APIs require JWT authentication. This guide shows how to test the Performance APIs using Postman.

## Prerequisites

- **Base URL**: `http://localhost:5000`
- **Server running**: `npm run dev` or `npm start`
- **Postman** installed
- **JWT token** in a Postman environment variable (e.g. `jwt_token`), obtained from `POST /api/auth/login` or `/api/auth/register`

## Common Rules

- **Data Source**: All metrics are calculated from the `Target` model
- **Metrics**:
  - Questions → `Target.questions` (only from completed targets)
  - Hours → `Target.plannedHours` (only from completed targets)
- **Status Filter**: Only targets with `status: "completed"` are included in calculations
- **Time Ranges**: Supported ranges are 7, 30, or 90 days
- **Query Parameter**: `?range=7|30|90` (default: 7 days)
- **User Isolation**: All data is filtered by the authenticated user

---

## 1. Questions - Total

### Endpoint

- `GET {{base_url}}/api/performance/questions/total`

### Headers

```text
Authorization: Bearer {{jwt_token}}
```

### Query Parameters (Optional)

- `range`: `7`, `30`, or `90` (default: `7`)

### Example Requests

**Default (7 days)**:
```
GET {{base_url}}/api/performance/questions/total
```

**Last 30 days**:
```
GET {{base_url}}/api/performance/questions/total?range=30
```

**Last 90 days**:
```
GET {{base_url}}/api/performance/questions/total?range=90
```

### Expected Response (200 OK)

```json
{
  "range": "last 7 days",
  "totalQuestions": 180
}
```

### Error Responses

- **400 Bad Request**
  ```json
  {
    "message": "Invalid range. Must be 7, 30, or 90 days"
  }
  ```
- **401 Unauthorized**
  - Missing or invalid `Authorization` header
- **500 Internal Server Error**
  - Unexpected server error

### Test Cases

1. **Valid Request (default range)**: Call without `range` param → expect 200 with "last 7 days"
2. **Valid Request (30 days)**: Call with `?range=30` → expect 200 with "last 30 days"
3. **Valid Request (90 days)**: Call with `?range=90` → expect 200 with "last 90 days"
4. **Invalid Range**: Call with `?range=15` → expect 400 Bad Request
5. **Missing Token**: Remove Authorization header → expect 401 Unauthorized
6. **No Questions**: If user has no targets with questions → expect 200 with `totalQuestions: 0`

---

## 2. Questions - Subject Wise

### Endpoint

- `GET {{base_url}}/api/performance/questions/subject`

### Headers

```text
Authorization: Bearer {{jwt_token}}
```

### Query Parameters (Optional)

- `range`: `7`, `30`, or `90` (default: `7`)

### Example Requests

**Default (7 days)**:
```
GET {{base_url}}/api/performance/questions/subject
```

**Last 30 days**:
```
GET {{base_url}}/api/performance/questions/subject?range=30
```

### Expected Response (200 OK)

```json
[
  { "subject": "Maths", "questions": 70 },
  { "subject": "Physics", "questions": 60 },
  { "subject": "Chemistry", "questions": 50 }
]
```

**Note**: Results are sorted by questions count in descending order.

### Error Responses

- **400 Bad Request**
  ```json
  {
    "message": "Invalid range. Must be 7, 30, or 90 days"
  }
  ```
- **401 Unauthorized**
  - Missing or invalid `Authorization` header
- **500 Internal Server Error**
  - Unexpected server error

### Test Cases

1. **Valid Request**: Call endpoint → expect 200 with array of subjects and question counts
2. **Empty Result**: If user has no targets with questions → expect 200 with empty array `[]`
3. **Multiple Subjects**: Create targets with different subjects → verify all subjects appear
4. **Invalid Range**: Call with `?range=15` → expect 400 Bad Request
5. **Missing Token**: Remove Authorization header → expect 401 Unauthorized

---

## 3. Hours - Total

### Endpoint

- `GET {{base_url}}/api/performance/hours/total`

### Headers

```text
Authorization: Bearer {{jwt_token}}
```

### Query Parameters (Optional)

- `range`: `7`, `30`, or `90` (default: `7`)

### Example Requests

**Default (7 days)**:
```
GET {{base_url}}/api/performance/hours/total
```

**Last 30 days**:
```
GET {{base_url}}/api/performance/hours/total?range=30
```

### Expected Response (200 OK)

```json
{
  "range": "last 30 days",
  "totalHours": 45.5
}
```

**Note**: Hours are rounded to 1 decimal place.

### Error Responses

- **400 Bad Request**
  ```json
  {
    "message": "Invalid range. Must be 7, 30, or 90 days"
  }
  ```
- **401 Unauthorized**
  - Missing or invalid `Authorization` header
- **500 Internal Server Error**
  - Unexpected server error

### Test Cases

1. **Valid Request (default range)**: Call without `range` param → expect 200 with "last 7 days"
2. **Valid Request (30 days)**: Call with `?range=30` → expect 200 with "last 30 days"
3. **Valid Request (90 days)**: Call with `?range=90` → expect 200 with "last 90 days"
4. **Invalid Range**: Call with `?range=15` → expect 400 Bad Request
5. **Missing Token**: Remove Authorization header → expect 401 Unauthorized
6. **No Hours**: If user has no targets with actualHours → expect 200 with `totalHours: 0`
7. **Decimal Precision**: Verify hours are rounded to 1 decimal place

---

## 4. Hours - Subject Wise

### Endpoint

- `GET {{base_url}}/api/performance/hours/subject`

### Headers

```text
Authorization: Bearer {{jwt_token}}
```

### Query Parameters (Optional)

- `range`: `7`, `30`, or `90` (default: `7`)

### Example Requests

**Default (7 days)**:
```
GET {{base_url}}/api/performance/hours/subject
```

**Last 30 days**:
```
GET {{base_url}}/api/performance/hours/subject?range=30
```

### Expected Response (200 OK)

```json
[
  { "subject": "Maths", "hours": 18 },
  { "subject": "Physics", "hours": 14.5 },
  { "subject": "Chemistry", "hours": 13 }
]
```

**Note**: 
- Results are sorted by hours in descending order
- Hours are rounded to 1 decimal place

### Error Responses

- **400 Bad Request**
  ```json
  {
    "message": "Invalid range. Must be 7, 30, or 90 days"
  }
  ```
- **401 Unauthorized**
  - Missing or invalid `Authorization` header
- **500 Internal Server Error**
  - Unexpected server error

### Test Cases

1. **Valid Request**: Call endpoint → expect 200 with array of subjects and hours
2. **Empty Result**: If user has no targets with actualHours → expect 200 with empty array `[]`
3. **Multiple Subjects**: Create targets with different subjects → verify all subjects appear
4. **Invalid Range**: Call with `?range=15` → expect 400 Bad Request
5. **Missing Token**: Remove Authorization header → expect 401 Unauthorized
6. **Decimal Precision**: Verify hours are rounded to 1 decimal place

---

## 5. Hours - Theory vs Solving

### Endpoint

- `GET {{base_url}}/api/performance/hours/type`

### Headers

```text
Authorization: Bearer {{jwt_token}}
```

### Query Parameters (Optional)

- `range`: `7`, `30`, or `90` (default: `7`)

### Example Requests

**Default (7 days)**:
```
GET {{base_url}}/api/performance/hours/type
```

**Last 30 days**:
```
GET {{base_url}}/api/performance/hours/type?range=30
```

### Expected Response (200 OK)

```json
[
  { "type": "theory", "hours": 20 },
  { "type": "solving", "hours": 25.5 }
]
```

**Note**: 
- Only includes targets with type `"theory"` or `"solving"`
- Always returns both types, even if one has 0 hours
- Hours are rounded to 1 decimal place

### Error Responses

- **400 Bad Request**
  ```json
  {
    "message": "Invalid range. Must be 7, 30, or 90 days"
  }
  ```
- **401 Unauthorized**
  - Missing or invalid `Authorization` header
- **500 Internal Server Error**
  - Unexpected server error

### Test Cases

1. **Valid Request**: Call endpoint → expect 200 with theory and solving hours
2. **Both Types Present**: Create targets with both theory and solving types → verify both appear
3. **Only Theory**: If only theory targets exist → expect theory hours > 0, solving hours = 0
4. **Only Solving**: If only solving targets exist → expect solving hours > 0, theory hours = 0
5. **No Hours**: If user has no targets with actualHours → expect both types with 0 hours
6. **Invalid Range**: Call with `?range=15` → expect 400 Bad Request
7. **Missing Token**: Remove Authorization header → expect 401 Unauthorized

---

## Example Postman Workflow

1. **Login** via `POST /api/auth/login` and store `token` in `{{jwt_token}}`.

2. **Create Targets with Questions and Planned Hours**:
   - Create targets via `POST /api/targets` with `questions` and `plannedHours` fields
   - Example:
     ```json
     {
       "field": "Engineering",
       "subject": "Mathematics",
       "title": "Algebra Practice",
       "type": "solving",
       "questions": 50,
       "plannedHours": 2.5
     }
     ```

3. **Update Target Status to Completed**:
   - Update target status via `PATCH /api/targets/{id}/status` to mark as completed
   - Example:
     ```json
     {
       "status": "completed",
       "actualHours": 2.5
     }
     ```
   - **Important**: Only targets with `status: "completed"` are counted in performance metrics

4. **Test Performance Endpoints**:
   - Call `GET /api/performance/questions/total` → verify total questions
   - Call `GET /api/performance/questions/subject` → verify subject breakdown
   - Call `GET /api/performance/hours/total` → verify total hours
   - Call `GET /api/performance/hours/subject` → verify subject breakdown
   - Call `GET /api/performance/hours/type` → verify theory vs solving breakdown

5. **Test Routine Endpoints**:
   - Call `GET /api/performance/routine/sleep` → verify day-wise sleep data (default 7 days)
   - Call `GET /api/performance/routine/sleep?range=30` → verify last 30 days sleep data
   - Call `GET /api/performance/routine/health` → verify day-wise health activity data (default 7 days)
   - Call `GET /api/performance/routine/health?range=90` → verify last 90 days health data
   - Test with different ranges (7, 30, 90) to verify date range behavior

6. **Test Different Ranges**:
   - Test with `?range=7`, `?range=30`, and `?range=90`
   - Verify results change based on date range

---

## Postman Collection Setup Tips

### 1. Create Environment Variables

In Postman, create an environment with:
- `base_url`: `http://localhost:5000`
- `jwt_token`: (will be set after login/register)

### 2. Set Authorization Token Automatically

After login/register, use Postman's **Tests** tab to automatically save the token:
```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
    const jsonData = pm.response.json();
    if (jsonData.token) {
        pm.environment.set("jwt_token", jsonData.token);
    }
}
```

### 3. Use Environment Variables in Requests

- URL: `{{base_url}}/api/performance/questions/total?range=30`
- Authorization Header: `Bearer {{jwt_token}}`

---

## Quick Test Checklist

- [ ] Login and get JWT token
- [ ] Create targets with questions and actualHours
- [ ] Test GET /api/performance/questions/total (default range)
- [ ] Test GET /api/performance/questions/total?range=30
- [ ] Test GET /api/performance/questions/subject
- [ ] Test GET /api/performance/hours/total
- [ ] Test GET /api/performance/hours/subject
- [ ] Test GET /api/performance/hours/type
- [ ] Track sleep data via POST /api/wellness/sleep
- [ ] Track exercise/meditation via POST /api/wellness/activity
- [ ] Test GET /api/performance/routine/sleep (default range)
- [ ] Test GET /api/performance/routine/sleep?range=30
- [ ] Test GET /api/performance/routine/health (default range)
- [ ] Test GET /api/performance/routine/health?range=90
- [ ] Test invalid range parameter (should fail)
- [ ] Test without authentication (should fail)
- [ ] Verify user isolation (only own data is returned)

---

## Notes

1. **Date Range Calculation**: The range is calculated from `Target.createdAt` field
2. **Status Filter**: Only targets with `status: "completed"` are included in all calculations
3. **Null Values**: Targets with `null` or `0` for `questions` or `plannedHours` are excluded
4. **Hours Source**: Hours are calculated from `Target.plannedHours` (not `actualHours`)
5. **Rounding**: Hours are rounded to 1 decimal place for display
6. **Sorting**: Subject-wise results are sorted by count/hours in descending order
7. **Type Filter**: Hours by type only includes `"theory"` and `"solving"` types (excludes `"lecture"`, `"revision"`, `"mock"`)
8. **Routine Date Range**: Sleep and health routines return data for the last N days (7, 30, or 90) from today, calculated backwards
9. **Routine Data Completeness**: All days in the range are included, with `null` or `false` values for days without data
10. **Sleep Duration**: Requires `actualSleepTime` and `actualWakeTime` to calculate `sleepDurationMin`
11. **Range Parameter**: Both routine endpoints support `?range=7|30|90` query parameter (default: 7 days)

---

## 6. Sleep Routine (Range-based)

### Endpoint

- `GET {{base_url}}/api/performance/routine/sleep?range=7|30|90`

### Headers

```text
Authorization: Bearer {{jwt_token}}
```

### Query Parameters (Optional)

- `range`: `7`, `30`, or `90` (default: `7`)

### Purpose

To retrieve day-wise sleep duration for the last N days (7, 30, or 90 days).

### Business Rules

- Data is fetched only for the authenticated user
- Each day returns a single record
- If no sleep data exists for a day, `durationMin` is returned as `null`
- Sleep duration is expressed in minutes
- Date range: Last N days from today (calculated backwards)

### Example Requests

**Default (7 days)**:
```
GET {{base_url}}/api/performance/routine/sleep
```

**Last 30 days**:
```
GET {{base_url}}/api/performance/routine/sleep?range=30
```

**Last 90 days**:
```
GET {{base_url}}/api/performance/routine/sleep?range=90
```

### Expected Response (200 OK)

```json
{
  "data": [
    {
      "date": "2025-12-18",
      "durationMin": 480
    },
    {
      "date": "2025-12-19",
      "durationMin": null
    },
    {
      "date": "2025-12-20",
      "durationMin": 525
    }
  ]
}
```

### Response Fields

**Root Object:**
- `data` (array): Array of day-wise sleep records

**Data Array:**
Each object contains:
- `date` (string): Date in YYYY-MM-DD format
- `durationMin` (number | null): Sleep duration in minutes, or `null` if no sleep data exists for that day

### Error Responses

- **400 Bad Request - Invalid Range**
  ```json
  {
    "message": "Invalid range. Must be 7, 30, or 90 days"
  }
  ```

- **401 Unauthorized**
  - Missing or invalid `Authorization` header

- **500 Internal Server Error**
  ```json
  {
    "message": "Failed to fetch sleep routine"
  }
  ```

### Test Cases

1. **Valid Request (default range)**: Call without `range` param → expect 200 with "last 7 days" data
2. **Valid Request (30 days)**: Call with `?range=30` → expect 200 with "last 30 days" data
3. **Valid Request (90 days)**: Call with `?range=90` → expect 200 with "last 90 days" data
4. **Invalid Range**: Call with `?range=15` → expect 400 Bad Request
5. **Missing Token**: Remove Authorization header → expect 401 Unauthorized
6. **No Sleep Data**: If user has no sleep records → expect 200 with array of null values

---

## 7. Health Routine (Range-based)

### Endpoint

- `GET {{base_url}}/api/performance/routine/health?range=7|30|90`

### Headers

```text
Authorization: Bearer {{jwt_token}}
```

### Query Parameters (Optional)

- `range`: `7`, `30`, or `90` (default: `7`)

### Purpose

To retrieve day-wise health activity status (exercise & meditation) for the last N days (7, 30, or 90 days).

### Business Rules

- Data is fetched only for the authenticated user
- Each day returns a single record
- If no wellness data exists for a day, both `exercise` and `meditation` are returned as `false`
- Date range: Last N days from today (calculated backwards)

### Example Requests

**Default (7 days)**:
```
GET {{base_url}}/api/performance/routine/health
```

**Last 30 days**:
```
GET {{base_url}}/api/performance/routine/health?range=30
```

**Last 90 days**:
```
GET {{base_url}}/api/performance/routine/health?range=90
```

### Expected Response (200 OK)

```json
{
  "data": [
    {
      "date": "2025-12-18",
      "exercise": true,
      "meditation": false
    },
    {
      "date": "2025-12-19",
      "exercise": false,
      "meditation": false
    },
    {
      "date": "2025-12-20",
      "exercise": true,
      "meditation": true
    }
  ]
}
```

### Response Fields

**Root Object:**
- `data` (array): Array of day-wise health activity records

**Data Array:**
Each object contains:
- `date` (string): Date in YYYY-MM-DD format
- `exercise` (boolean): `true` if exercise was done, `false` otherwise
- `meditation` (boolean): `true` if meditation was done, `false` otherwise

### Error Responses

- **400 Bad Request - Invalid Range**
  ```json
  {
    "message": "Invalid range. Must be 7, 30, or 90 days"
  }
  ```

- **401 Unauthorized**
  - Missing or invalid `Authorization` header

- **500 Internal Server Error**
  ```json
  {
    "message": "Failed to fetch health routine"
  }
  ```

### Test Cases

1. **Valid Request (default range)**: Call without `range` param → expect 200 with "last 7 days" data
2. **Valid Request (30 days)**: Call with `?range=30` → expect 200 with "last 30 days" data
3. **Valid Request (90 days)**: Call with `?range=90` → expect 200 with "last 90 days" data
4. **Invalid Range**: Call with `?range=15` → expect 400 Bad Request
5. **Missing Token**: Remove Authorization header → expect 401 Unauthorized
6. **No Health Data**: If user has no wellness records → expect 200 with array of false values
7. **Exercise Only**: Track exercise but not meditation → verify `exercise: true, meditation: false`
8. **Meditation Only**: Track meditation but not exercise → verify `exercise: false, meditation: true`
9. **Both Activities**: Track both exercise and meditation → verify both are `true`

---

## Troubleshooting

### Issue: "Invalid range. Must be 7, 30, or 90 days"
**Solution**: Ensure the `range` query parameter is exactly `7`, `30`, or `90`

### Issue: All metrics return 0
**Solution**: 
- Verify targets have been created with `questions` or `plannedHours` values
- **Important**: Ensure targets have `status: "completed"` (only completed targets are counted)
- Check that targets were created within the selected date range
- Update target status to "completed" via `PATCH /api/targets/{id}/status`

### Issue: "Authorization token missing"
**Solution**: Make sure you've added the `Authorization` header with `Bearer` prefix

### Issue: "Invalid or expired token"
**Solution**: 
- Check if token is correctly copied
- Token might have expired (7 days)
- Re-login to get a new token

### Issue: Sleep/Health Routine returns empty array or all null/false values
**Solution**: 
- Verify wellness data has been tracked via `POST /api/wellness/sleep` or `POST /api/wellness/activity`
- Check that wellness data was created within the selected date range (last 7, 30, or 90 days)
- Ensure you're using the correct user's token
- Try increasing the range (e.g., `?range=30` or `?range=90`) to see if data exists in a longer period

### Issue: Sleep duration is null for days with sleep data
**Solution**: 
- Verify sleep data was saved with `actualSleepTime` and `actualWakeTime` (required to calculate `sleepDurationMin`)
- Check that sleep data exists in the database for those dates
- Ensure dates match exactly (time is normalized to start of day)

### Issue: "Invalid range. Must be 7, 30, or 90 days"
**Solution**: Ensure the `range` query parameter is exactly `7`, `30`, or `90`

