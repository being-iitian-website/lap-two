# Revision Management API - Postman Testing Guide

All Revision Management APIs require JWT authentication. Follow these steps to test the APIs using Postman.

## Prerequisites

1. **Base URL**: `http://localhost:5000`
2. **Server must be running** (use `npm run dev` or `npm start`)
3. **Postman installed** on your machine
4. **JWT Token**: Get token from `/api/auth/register` or `/api/auth/login` (see main Postman guide)

---

## Revision System Overview

Revisions can be created in **2 ways**:

1. **Manual Revision Scheduling** - User creates revision directly
2. **Auto from Target** - When a Target with `type: "revision"` is created, a Revision is automatically created

**Important**: 
- `source` field indicates origin: `"manual"` or `"target"`
- `targetId` is only present if revision came from a Target
- Backend automatically updates `pending → missed` if `revisionDate < today` and `status != completed`

---

## Step 1: Create Manual Revision

### Request
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/revisions`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

- **Body** (raw JSON):
  ```json
  {
    "subject": "Physics",
    "units": ["Thermodynamics", "Laws of Motion"],
    "notes": "Revise formulas and key concepts",
    "revisionDate": "2025-01-15"
  }
  ```

### Expected Response (201 Created)
```json
{
  "id": "uuid-string-here",
  "subject": "Physics",
  "units": ["Thermodynamics", "Laws of Motion"],
  "revisionDate": "2025-01-15T00:00:00.000Z",
  "status": "pending",
  "source": "manual",
  "message": "Revision created successfully"
}
```

**Backend automatically sets**:
- `status: "pending"`
- `source: "manual"`
- `targetId: null`

### Test Cases:
1. **Valid Request**: Should return 201 with revision ID
2. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
3. **Invalid Token**: Use fake token → Should return 401 Invalid or expired token
4. **Missing Required Fields**: Remove `subject` → Should return 400 Bad Request
5. **Empty Units Array**: Use `units: []` → Should return 400 Bad Request
6. **Invalid Date Format**: Use invalid date → Should return 400 Invalid date format

---

## Step 2: Create Target with Type "revision" (Auto-creates Revision)

### Request
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/targets`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

- **Body** (raw JSON):
  ```json
  {
    "field": "Engineering",
    "subject": "Mathematics",
    "title": "Differential Equations",
    "type": "revision",
    "plannedHours": 2,
    "startTime": "2025-01-15T10:00:00Z",
    "endTime": "2025-01-15T12:00:00Z"
  }
  ```

### Expected Behavior:
1. Target is created successfully
2. **Revision is automatically created** with:
   - `source: "target"`
   - `targetId: <target-id>`
   - `status: "pending"`
   - `subject: "Mathematics"` (from target)
   - `units: ["Differential Equations"]` (from target title)
   - `revisionDate: <target startTime>` (or current date if no startTime)

### Verify Auto-created Revision:
After creating the target, check revisions:
```
GET /api/revisions?date=2025-01-15
```
You should see the auto-created revision with `source: "target"` and `targetId` populated.

---

## Step 3: Get Revisions by Date (Calendar View)

### Request
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/revisions?date=2025-01-15`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

### Expected Response (200 OK)
```json
[
  {
    "id": "uuid-string-here",
    "subject": "Physics",
    "units": ["Thermodynamics", "Laws of Motion"],
    "notes": "Revise formulas",
    "status": "completed",
    "source": "manual",
    "revisionDate": "2025-01-15T00:00:00.000Z",
    "targetId": null
  },
  {
    "id": "uuid-string-here-2",
    "subject": "Mathematics",
    "units": ["Differential Equations"],
    "notes": null,
    "status": "pending",
    "source": "target",
    "revisionDate": "2025-01-15T00:00:00.000Z",
    "targetId": "target-uuid-here"
  }
]
```

**Note**: Backend automatically updates `pending → missed` if `revisionDate < today` and `status != completed` before returning results.

### Test Cases:
1. **Valid Request**: Should return 200 with array of revisions for that date
2. **No Revisions**: Date with no revisions → Should return empty array `[]`
3. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
4. **Missing Date Parameter**: Remove `?date=` → Should return 400 Date query parameter is required
5. **Invalid Date Format**: Use `?date=invalid` → Should return 400 Invalid date format

---

## Step 4: Get Revision Analytics (Count by Subject and Unit)

### Request
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/revisions/analytics/count`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

### Expected Response (200 OK)
```json
{
  "Physics": {
    "Thermodynamics": {
      "completed": 10,
      "pending": 3,
      "missed": 2
    },
    "Laws of Motion": {
      "completed": 7,
      "pending": 1,
      "missed": 0
    }
  },
  "Chemistry": {
    "Electrochemistry": {
      "completed": 5,
      "pending": 2,
      "missed": 1
    }
  }
}
```

**Structure**: `{ subject: { unit: { completed, pending, missed } } }`

**Note**: Backend automatically updates `pending → missed` before calculating analytics.

### Test Cases:
1. **Valid Request**: Should return 200 with analytics object
2. **No Revisions**: User with no revisions → Should return empty object `{}`
3. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized

---

## Step 5: Get Revision History

### Request - Last 7 Days
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/revisions/history?range=7`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

### Expected Response (200 OK)
```json
{
  "from": "2025-01-08",
  "to": "2025-01-15",
  "completed": 12,
  "pending": 4,
  "missed": 3
}
```

### Request - Last 30 Days
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/revisions/history?range=30`

### Expected Response (200 OK)
```json
{
  "from": "2024-12-16",
  "to": "2025-01-15",
  "completed": 45,
  "pending": 8,
  "missed": 7
}
```

### Request - All Time
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/revisions/history?range=all`

### Expected Response (200 OK)
```json
{
  "to": "2025-01-15",
  "completed": 120,
  "pending": 15,
  "missed": 10
}
```

**Note**: `from` field is omitted for `range=all`.

**Note**: Backend automatically updates `pending → missed` before calculating history.

### Test Cases:
1. **Valid Request (7 days)**: Should return 200 with 7-day stats
2. **Valid Request (30 days)**: Should return 200 with 30-day stats
3. **Valid Request (all)**: Should return 200 with all-time stats
4. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
5. **Invalid Range**: Use `?range=invalid` → Should return 400 Range must be: 7, 30, or all
6. **Missing Range**: Remove `?range=` → Should return 400 Range query parameter is required

---

## Step 6: Update Revision Status

### Request
- **Method**: `PATCH`
- **URL**: `http://localhost:5000/api/revisions/{revision_id}/status`
  Replace `{revision_id}` with the actual revision ID.

- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

- **Body** (raw JSON):
  ```json
  {
    "status": "completed"
  }
  ```

### Expected Response (200 OK)
```json
{
  "message": "Revision marked as completed",
  "revision": {
    "id": "uuid-string-here",
    "status": "completed",
    "subject": "Physics",
    "units": ["Thermodynamics", "Laws of Motion"]
  }
}
```

### Allowed Status for This Endpoint:
- `"completed"` - Marks a **pending** revision as completed

### Test Cases:
1. **Mark Pending as Completed**: Use `"status": "completed"` on a `pending` revision → Should return 200 with success message
2. **Mark Missed as Completed**: Use `"status": "completed"` on a `missed` revision → Should return 400 (`Missed revisions cannot be updated. They are locked.`)
3. **Mark Completed Again**: Use `"status": "completed"` on an already `completed` revision → Should return 400 (`Only pending revisions can be marked as completed`)
4. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
5. **Invalid Token**: Use fake token → Should return 401 Invalid or expired token
6. **Invalid Revision ID**: Use non-existent ID → Should return 404 Revision not found
7. **Invalid Status**: Use anything other than `"completed"` (e.g. `"pending"`, `"missed"`, `"invalid"`) → Should return 400 (`Invalid status. Only 'completed' is allowed for this endpoint`)
8. **Update Other User's Revision**: Use revision ID from different user → Should return 404 Access denied

---

## Missed Revision Logic (Backend Automatic)

The backend automatically updates revision status from `pending` to `missed` when:

- `revisionDate < today`
- AND `status != "completed"`

**Auto-Update Triggers**:
This happens automatically on:
- `GET /api/revisions?date=...`
- `GET /api/revisions/analytics/count`
- `GET /api/revisions/history?range=...`

**Note**: The system checks and updates missed revisions in real-time when any GET endpoint is called. This ensures data is always current without requiring a separate cron job.

**Example**:
1. Create revision with `revisionDate: "2025-01-10"` and `status: "pending"`
2. Today is `2025-01-15`
3. When you call any GET endpoint, backend automatically updates it to `status: "missed"`
4. The revision will now show as `"missed"` in all subsequent queries

**Important**: Once a revision is marked as `"completed"`, it will never be auto-updated to `"missed"`, even if the date has passed.

---

## Quick Test Checklist

- [ ] Register/Login to get JWT token
- [ ] Create manual revision
- [ ] Create target with `type: "revision"` (verify auto-created revision)
- [ ] Get revisions by date (calendar view)
- [ ] Verify missed revision logic (create past date revision, check status)
- [ ] Get revision analytics (count by subject/unit)
- [ ] Get revision history (7 days, 30 days, all time)
- [ ] Update revision status to "completed" (only for pending revisions)
- [ ] Try accessing other user's revisions (should fail)
- [ ] Try updating other user's revision status (should fail)

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "message": "Authorization token missing"
}
```
or
```json
{
  "message": "Invalid or expired token"
}
```

### 400 Bad Request
```json
{
  "message": "Missing required fields: subject, units (array), revisionDate"
}
```

### 404 Not Found
```json
{
  "message": "Revision not found or access denied"
}
```

### 500 Internal Server Error
```json
{
  "message": "Failed to create revision"
}
```

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
- URL: `{{base_url}}/api/revisions`
- Authorization Header: `Bearer {{jwt_token}}`

---

## Testing Scenarios

### Scenario 1: Manual Revision Workflow
1. Create manual revision for today
2. Get revisions by today's date → Should see your revision
3. Get analytics → Should see count for your subject/unit
4. Get history (7 days) → Should include your revision

### Scenario 2: Target → Revision Auto-creation
1. Create target with `type: "revision"`
2. Get revisions by date → Should see auto-created revision with `source: "target"`
3. Verify `targetId` is populated
4. Delete the target → Revision should be deleted (CASCADE)

### Scenario 3: Missed Revision Logic
1. Create revision with past date (e.g., 7 days ago) and `status: "pending"`
2. Get revisions by any date → Status should be automatically updated to `"missed"`
3. Get analytics → Should show in `missed` count
4. Get history → Should show in `missed` count

### Scenario 4: Multiple Units Analytics
1. Create revisions with same subject but different units
2. Get analytics → Should show separate counts for each unit
3. Create revisions with same subject and same unit
4. Get analytics → Should aggregate counts correctly

### Scenario 5: Update Revision Status
1. Create a revision with `status: "pending"`
2. Update status to `"completed"` → Should succeed
3. Get revisions by date → Should show `status: "completed"`
4. Get analytics → Should show in `completed` count
5. Try to update a `missed` revision to `"completed"` → Should fail with `400` (missed revisions are locked)
6. Try to update an already `completed` revision again → Should fail with `400` (only pending → completed is allowed)

### Scenario 6: Auto-Mark Missed Revisions
1. Create revision with past date (e.g., 7 days ago) and `status: "pending"`
2. Get revisions by any date → Status automatically updated to `"missed"`
3. Get analytics → Should show in `missed` count
4. Get history → Should show in `missed` count
5. Try to manually update this `missed` revision to `"completed"` → Should fail with `400` (missed revisions are locked)
6. Create another revision, mark it as `"completed"` using the status API → It should stay `"completed"` and never auto-change to `"missed"`

---

## Notes

1. **JWT Token Expiry**: Tokens expire after 7 days (as configured)
2. **User Isolation**: Each user can only access their own revisions
3. **Date Format**: Use ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`
4. **Auto-update**: Backend automatically updates `pending → missed` on GET requests
5. **Cascade Delete**: If a target is deleted, associated revisions are also deleted

---

## Troubleshooting

### Issue: "Authorization token missing"
**Solution**: Make sure you've added the `Authorization` header with `Bearer` prefix

### Issue: "Invalid or expired token"
**Solution**: 
- Check if token is correctly copied
- Token might have expired (7 days)
- Re-login to get a new token

### Issue: Revision not auto-created from target
**Solution**: 
- Verify target `type` is exactly `"revision"` (lowercase)
- Check server console for errors
- Verify target was created successfully first

### Issue: Status not updating to "missed"
**Solution**: 
- Make sure `revisionDate` is in the past
- Status must be `"pending"` (not `"completed"`)
- Call any GET endpoint to trigger the update

### Issue: Server not responding
**Solution**: 
- Check if server is running: `npm run dev`
- Verify port 5000 is not in use
- Check server console for errors

