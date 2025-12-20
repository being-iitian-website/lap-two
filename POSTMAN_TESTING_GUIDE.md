# Target Management API - Postman Testing Guide

All Target Management APIs require JWT authentication. Follow these steps to test the APIs using Postman.

## Prerequisites

1. **Base URL**: `http://localhost:5000`
2. **Server must be running** (use `npm run dev` or `npm start`)
3. **Postman installed** on your machine

---

## Step 1: Register a New User (Get JWT Token)

### Request
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

### Expected Response (201 Created)
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ IMPORTANT**: Copy the `token` value from the response. You'll need it for all subsequent requests.

---

## Step 2: Login (Alternative - Get JWT Token)

### Request
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

### Expected Response (200 OK)
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ IMPORTANT**: Copy the `token` value from the response.

---

## Step 2.1: Logout (Stateless)

> Note: With JWT-based stateless auth, **logout is handled on the client** by deleting the stored token (e.g. from localStorage, cookies, or Postman environment).  
> This endpoint is mainly for frontend/Postman flows and future extensibility (e.g. token blacklist).

### Request
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/logout`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

### Expected Response (200 OK)
```json
{
  "message": "Logged out successfully. Please remove the token on the client."
}
```

### What you should do after this response
- In **frontend**: remove the JWT from storage (localStorage / cookie / memory).
- In **Postman**: clear or unset the `jwt_token` environment variable.

### Test Cases:
1. **Valid Request**: Should return 200 with logout message.
2. **Missing Token**: Remove Authorization header → Should return 401 if you later protect this route; currently it's open, but you should still treat it as a signal to clear the token client-side.

---

## Step 3: Create a Target

### Request
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/targets`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```
  Replace `YOUR_JWT_TOKEN_HERE` with the token from Step 1 or 2.

- **Body** (raw JSON):
  ```json
  {
    "field": "Engineering",
    "subject": "Mathematics",
    "title": "Differential Equations Practice",
    "type": "solving",
    "plannedHours": 2,
    "questions": 25,
    "startTime": "2025-01-15T10:00:00Z",
    "endTime": "2025-01-15T12:00:00Z",
    "carryForward": true
  }
  ```
  
  **Note**: 
  - `plannedHours`, `startTime`, and `endTime` are **optional** fields.
  - If `startTime` and `endTime` are omitted, they will be set to `null`.
  - If `plannedHours` is omitted, it will be set to `null`.
  - If carrying forward a target without `plannedHours`, only `startTime` will be updated (no `endTime` calculation).
  
  **Example with minimal required fields**:
  ```json
  {
    "field": "Engineering",
    "subject": "Mathematics",
    "title": "Differential Equations Practice",
    "type": "solving"
  }
  ```
  
  **Example without dates**:
  ```json
  {
    "field": "Engineering",
    "subject": "Mathematics",
    "title": "Differential Equations Practice",
    "type": "solving",
    "plannedHours": 2,
    "questions": 25
  }
  ```

### Expected Response (201 Created)
```json
{
  "id": "uuid-string-here",
  "status": "pending",
  "message": "Target created successfully"
}
```

### Test Cases:
1. **Valid Request with all fields**: Should return 201 with target ID
2. **Valid Request with minimal fields**: Only `field`, `subject`, `title`, `type` → Should return 201
3. **Valid Request without dates**: Omit `startTime` and `endTime` → Should return 201 (set to null)
4. **Valid Request without plannedHours**: Omit `plannedHours` → Should return 201 (set to null)
5. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
6. **Invalid Token**: Use fake token → Should return 401 Invalid or expired token
7. **Missing Required Fields**: Remove `field` → Should return 400 Bad Request
8. **Invalid Type**: Use `type: "invalid"` → Should return 400 Invalid target type
9. **Invalid Date Format**: Use invalid date format → Should return 400 Invalid date format
10. **Invalid plannedHours**: Use `plannedHours: 0` or negative → Should return 400 Planned hours must be greater than 0
11. **Only startTime provided**: Provide only `startTime` without `endTime` → Should return 400 (both must be provided together or both omitted)
12. **Only endTime provided**: Provide only `endTime` without `startTime` → Should return 400 (both must be provided together or both omitted)

---

## Step 4: Get Today's Targets

### Request
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/targets/today`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

### Expected Response (200 OK)
```json
[
  {
    "id": "uuid-string-here",
    "title": "Differential Equations Practice",
    "type": "solving",
    "status": "pending",
    "startTime": "2025-01-15T10:00:00Z"
  }
]
```

### Test Cases:
1. **Valid Request**: Should return 200 with array of today's targets
2. **No Targets Today**: Should return empty array `[]`
3. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
4. **Invalid Token**: Use fake token → Should return 401 Invalid or expired token

---

## Step 5: Update Target Status

### Request
- **Method**: `PATCH`
- **URL**: `http://localhost:5000/api/targets/{target_id}/status`
  Replace `{target_id}` with the actual target ID from Step 3.

- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

- **Body** (raw JSON):
  ```json
  {
    "status": "completed",
    "actualHours": 1.8
  }
  ```

### Expected Response (200 OK)
```json
{
  "message": "Target status updated successfully",
  "target": {
    "id": "uuid-string-here",
    "status": "completed",
    "actualHours": 1.8
  }
}
```

### Test Cases:
1. **Valid Request**: Should return 200 with updated target
2. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
3. **Invalid Target ID**: Use non-existent ID → Should return 404 Target not found
4. **Invalid Status**: Use `status: "invalid"` → Should return 400 Invalid status
5. **Update Other User's Target**: Use target ID from different user → Should return 404 Access denied

---

## Step 6: Carry Forward Missed Target

### Request
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/targets/{target_id}/carry-forward`
  Replace `{target_id}` with the actual target ID from Step 3.

- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

- **Body** (raw JSON):
  ```json
  {
    "newDate": "2025-01-16T10:00:00Z"
  }
  ```

### Expected Response (200 OK)
```json
{
  "message": "Target carried forward successfully",
  "target": {
    "id": "uuid-string-here",
    "startTime": "2025-01-16T10:00:00Z",
    "endTime": "2025-01-16T12:00:00Z",
    "status": "pending",
    "carryForward": true
  }
}
```

### Test Cases:
1. **Valid Request**: Should return 200 with updated target dates
2. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
3. **Invalid Target ID**: Use non-existent ID → Should return 404 Target not found
4. **Missing newDate**: Remove `newDate` field → Should return 400 newDate is required
5. **Invalid Date Format**: Use invalid date → Should return 400 Invalid date format
6. **Carry Forward Other User's Target**: Use target ID from different user → Should return 404 Access denied

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
- URL: `{{base_url}}/api/targets`
- Authorization Header: `Bearer {{jwt_token}}`

### 4. Create a Pre-request Script (Optional)
To automatically add the token to all requests:
```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('jwt_token')
});
```

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
  "message": "Missing required fields: field, subject, title, type"
}
```
or
```json
{
  "message": "Both startTime and endTime must be provided together, or both omitted"
}
```
or
```json
{
  "message": "question1 and answer1 are required"
}
```
or
```json
{
  "message": "Responses for today already exist and cannot be overwritten"
}
```

### 409 Conflict
```json
{
  "message": "Daily challenge already exists for today"
}
```

### 404 Not Found
```json
{
  "message": "Target not found or access denied"
}
```

### 500 Internal Server Error
```json
{
  "message": "Failed to create target"
}
```

---

## Step 7: Delete a Target

### Request
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/api/targets/{target_id}`
  Replace `{target_id}` with the actual target ID from Step 3.

- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

- **Body**: No body required

### Expected Response (200 OK)
```json
{
  "message": "Target deleted successfully"
}
```

### Test Cases:
1. **Valid Request**: Should return 200 with success message
2. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
3. **Invalid Token**: Use fake token → Should return 401 Invalid or expired token
4. **Invalid Target ID**: Use non-existent ID → Should return 404 Target not found
5. **Delete Other User's Target**: Use target ID from different user → Should return 404 Access denied
6. **Delete Already Deleted Target**: Try to delete the same target twice → Should return 404 Target not found

---

## Step 8: Submit Daily Response for a Target

### Request
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/targets/{target_id}/daily-response`
  Replace `{target_id}` with the actual target ID from Step 3.

- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

- **Body** (raw JSON):
  ```json
  {
    "question1": "What did I study today?",
    "answer1": "Graphs and Trees",
    "question2": "What was challenging?",
    "answer2": "DFS recursion"
  }
  ```

   **Note**: 
   - `question1` and `answer1` are **required** fields.
   - `question2` and `answer2` are **optional** fields.
   - The `responseDate` is automatically set to today's date.
   - The target's `status` is automatically set to `"completed"` when a daily response is submitted.
   - Responses cannot be overwritten once submitted for today.

### Expected Response (200 OK)
```json
{
  "message": "Daily response submitted successfully",
  "target": {
    "id": "uuid-string-here",
    "title": "Differential Equations Practice",
    "status": "completed",
    "responseDate": "2025-01-16T00:00:00.000Z"
  }
}
```

### Test Cases:
1. **Valid Request with all fields**: Should return 200 with target ID and responseDate
2. **Valid Request with only question1/answer1**: Omit `question2` and `answer2` → Should return 200
3. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
4. **Invalid Token**: Use fake token → Should return 401 Invalid or expired token
5. **Invalid Target ID**: Use non-existent ID → Should return 404 Target not found
6. **Missing Required Fields**: Remove `question1` or `answer1` → Should return 400 Bad Request
7. **Submit Response for Other User's Target**: Use target ID from different user → Should return 404 Access denied
8. **Overwrite Existing Response**: Submit response for the same target twice on the same day → Should return 400 "Responses for today already exist and cannot be overwritten"
9. **Submit Response for Different Days**: Submit response today, then submit again tomorrow → Should return 200 (allowed for different days)

---

## Step 9: Create Daily Challenge Target

### Request
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/targets/challenge`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```

- **Body** (raw JSON):
  ```json
  {}
  ```
  
  **Note**: 
  - No request body is required. The challenge target is created with predefined values:
    - `type`: `"challenge"`
    - `status`: `"pending"`
    - `field`: `"Daily Challenge"`
    - `subject`: `"Challenge"`
    - `title`: `"Daily Challenge"`
    - `plannedHours`: `1.0`
  - Only one challenge target per user per day is allowed.
  - The challenge target is automatically associated with the authenticated user.

### Expected Response (201 Created)
```json
{
  "message": "Daily challenge added successfully",
  "target": {
    "id": "uuid-string-here",
    "type": "challenge",
    "status": "pending"
  }
}
```

### Test Cases:
1. **Valid Request**: Should return 201 with challenge target details
2. **Missing Token**: Remove Authorization header → Should return 401 Unauthorized
3. **Invalid Token**: Use fake token → Should return 401 Invalid or expired token
4. **Duplicate Challenge**: Create challenge twice on the same day → First request returns 201, second request returns 409 Conflict
5. **Create Challenge on Different Days**: Create challenge today, then create again tomorrow → Should return 201 (allowed for different days)
6. **Empty Body**: Send empty JSON object `{}` → Should return 201 (no body required)

---

## Quick Test Checklist

- [ ] Register a new user and get JWT token
- [ ] Create a target with valid data
- [ ] Try creating target without token (should fail)
- [ ] Get today's targets
- [ ] Update target status to "completed"
- [ ] Update target status to "missed"
- [ ] Carry forward a missed target
- [ ] Submit daily response for a target
- [ ] Try submitting daily response twice on same day (should fail)
- [ ] Create daily challenge target
- [ ] Try creating daily challenge twice on same day (should fail)
- [ ] Delete a target
- [ ] Try accessing other user's target (should fail)
- [ ] Try deleting other user's target (should fail)

---

## Notes

1. **JWT Token Expiry**: Tokens expire after 7 days (as configured in `src/utils/jwt.ts`)
2. **User Isolation**: Each user can only access their own targets
3. **Date Format**: Use ISO 8601 format: `YYYY-MM-DDTHH:mm:ssZ`
4. **Target Types**: Must be one of: `theory`, `lecture`, `revision`, `solving`, `mock`, `challenge`
5. **Target Status**: Must be one of: `pending`, `completed`, `missed`

---

## Troubleshooting

### Issue: "Authorization token missing"
**Solution**: Make sure you've added the `Authorization` header with `Bearer` prefix

### Issue: "Invalid or expired token"
**Solution**: 
- Check if token is correctly copied
- Token might have expired (7 days)
- Re-login to get a new token

### Issue: "Target not found or access denied"
**Solution**: 
- Verify the target ID is correct
- Ensure you're using a token from the user who created the target
- Target might have been deleted

### Issue: Server not responding
**Solution**: 
- Check if server is running: `npm run dev`
- Verify port 5000 is not in use
- Check server console for errors

