# XP System - Postman Testing Guide

This guide explains how to test the automatic XP (Experience Points) awarding system for focus sessions.

## Overview

The XP system automatically awards points to users based on their daily focus time:
- **7 hours (420 minutes)** in a day = **+15 XP**
- **11 hours (660 minutes)** in a day = **+30 XP**

XP is awarded automatically when a focus session is saved and thresholds are crossed.

## Prerequisites

- **Base URL**: `http://localhost:5000`
- **Server running**: `npm run dev` or `npm start`
- **Postman** installed
- **JWT token** obtained from `POST /api/auth/login` or `/api/auth/register`
- **Database migrations** run (for `DailyXPAward` table)

---

## Step 1: Get JWT Token

Before testing XP, authenticate and get a JWT token.

### Register or Login

**Request**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/register` or `/api/auth/login`
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

**Expected Response**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ IMPORTANT**: Copy the `token` value. You'll need it for all subsequent requests.

---

## Step 2: Understanding XP Rules

### XP Thresholds

| Threshold | Condition | XP Awarded |
|-----------|-----------|------------|
| Daily Focus - 7 Hours | Total focus time ≥ 7 hours (420 minutes) | +15 XP |
| Daily Focus - 11 Hours | Total focus time ≥ 11 hours (660 minutes) | +30 XP |

### Key Rules

1. **XP is calculated per calendar day** - Sessions are grouped by date (based on `startTime`)
2. **Focus time is cumulative** - Sum of all focus sessions for the day
3. **XP awarded only on threshold crossing** - Not every time you save a session
4. **XP awarded once per threshold per day** - Cannot get duplicate awards
5. **XP is automatic** - Awarded immediately after saving a focus session
6. **XP is cumulative** - Stored globally in `UserXP.totalXP`

### Threshold Crossing Logic

XP is awarded only when:
- **Previous total** was **below** the threshold
- **Current total** is **equal to or above** the threshold

**Example:**
```
Before Session: 390 minutes (6.5 hours)
After Session:  430 minutes (7.17 hours)
Result: +15 XP awarded ✅ (crossed 420 min threshold)

Before Session: 430 minutes (already above 7h)
After Session:  500 minutes
Result: No XP ❌ (already awarded for 7h threshold)
```

---

## Step 3: Test Focus Session XP Awarding

### Create Focus Sessions

**Endpoint**: `POST /api/focus`

**Request**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/focus`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
  ```
- **Body** (raw JSON):
  ```json
  {
    "notes": "Deep work session",
    "startTime": "2025-01-16T08:00:00Z",
    "endTime": "2025-01-16T10:00:00Z"
  }
  ```

**Expected Response (200 OK)**
```json
{
  "message": "Focus session saved successfully"
}
```

**Note**: XP is awarded automatically in the background. The response doesn't include XP information.

---

## Step 4: Test Scenarios

### Scenario 1: Award 7-Hour Threshold (+15 XP)

**Goal**: Reach 7 hours of focus time in one day to earn +15 XP.

**Steps:**

1. **Create multiple sessions** throughout the day (all with same date):
   
   **Session 1** (2 hours):
   ```json
   {
     "startTime": "2025-01-16T08:00:00Z",
     "endTime": "2025-01-16T10:00:00Z"
   }
   ```
   Total: 120 minutes (2 hours)

   **Session 2** (3 hours):
   ```json
   {
     "startTime": "2025-01-16T11:00:00Z",
     "endTime": "2025-01-16T14:00:00Z"
   }
   ```
   Total: 300 minutes (5 hours)

   **Session 3** (2.5 hours):
   ```json
   {
     "startTime": "2025-01-16T15:00:00Z",
     "endTime": "2025-01-16T17:30:00Z"
   }
   ```
   Total: 450 minutes (7.5 hours) → **+15 XP awarded** ✅

2. **Verify XP was awarded**:
   - Check `UserXP` table: `totalXP` should be 15
   - Check `DailyXPAward` table: Should have one record with `threshold: "focus_7h"` and `xpAmount: 15`

### Scenario 2: Award 11-Hour Threshold (+30 XP)

**Goal**: Reach 11 hours of focus time in one day to earn +30 XP.

**Steps:**

1. **Continue from Scenario 1** (already have 7.5 hours)

2. **Add more sessions**:
   
   **Session 4** (2 hours):
   ```json
   {
     "startTime": "2025-01-16T18:00:00Z",
     "endTime": "2025-01-16T20:00:00Z"
   }
   ```
   Total: 570 minutes (9.5 hours)

   **Session 5** (2 hours):
   ```json
   {
     "startTime": "2025-01-16T21:00:00Z",
     "endTime": "2025-01-16T23:00:00Z"
   }
   ```
   Total: 690 minutes (11.5 hours) → **+30 XP awarded** ✅

3. **Verify XP**:
   - Check `UserXP` table: `totalXP` should be 45 (15 + 30)
   - Check `DailyXPAward` table: Should have two records:
     - `focus_7h`: 15 XP
     - `focus_11h`: 30 XP

### Scenario 3: No Duplicate Awards

**Goal**: Verify that XP is not awarded multiple times for the same threshold.

**Steps:**

1. **After reaching 7 hours** (from Scenario 1), add another session:

   **Session 6** (1 hour):
   ```json
   {
     "startTime": "2025-01-16T23:30:00Z",
     "endTime": "2025-01-17T00:30:00Z"
   }
   ```
   Total: 750 minutes (12.5 hours)

2. **Verify**:
   - No additional XP should be awarded for 7h threshold (already awarded)
   - `UserXP.totalXP` should remain 45 (not 60)
   - `DailyXPAward` should still have only 2 records

### Scenario 4: Threshold Crossing Detection

**Goal**: Verify XP is only awarded when crossing threshold, not when already above.

**Test Case 1: Crossing 7h Threshold**
```
Before: 390 minutes (6.5 hours) - below threshold
Add:    30 minutes
After:  420 minutes (7 hours) - at threshold
Result: +15 XP ✅
```

**Test Case 2: Already Above Threshold**
```
Before: 450 minutes (7.5 hours) - already above
Add:    30 minutes
After:  480 minutes (8 hours) - still above
Result: No XP ❌ (already awarded)
```

**Test Case 3: Crossing 11h Threshold**
```
Before: 650 minutes (10.83 hours) - below threshold
Add:    20 minutes
After:  670 minutes (11.17 hours) - above threshold
Result: +30 XP ✅
```

---

## Step 5: Verify XP in Database

### Check UserXP Table

You can verify XP was awarded by checking the database:

```sql
SELECT * FROM "UserXP" WHERE "userId" = 'your-user-id';
```

**Expected Result:**
```
id: uuid
userId: your-user-id
totalXP: 45 (or whatever was awarded)
createdAt: timestamp
updatedAt: timestamp
```

### Check DailyXPAward Table

Check which thresholds were awarded:

```sql
SELECT * FROM "DailyXPAward" 
WHERE "userId" = 'your-user-id' 
AND "date" >= '2025-01-16' 
AND "date" < '2025-01-17';
```

**Expected Result:**
```
id: uuid
userId: your-user-id
date: 2025-01-16 00:00:00
threshold: "focus_7h"
xpAmount: 15
createdAt: timestamp

id: uuid
userId: your-user-id
date: 2025-01-16 00:00:00
threshold: "focus_11h"
xpAmount: 30
createdAt: timestamp
```

---

## Step 6: Complete Testing Workflow

### Full Day XP Test

**Objective**: Test complete XP awarding flow for one day.

1. **Start with 0 XP**:
   - Use a new user or verify current XP is 0

2. **Create sessions to reach 7 hours**:
   - Session 1: 2 hours (120 min) → Total: 120 min
   - Session 2: 2 hours (120 min) → Total: 240 min
   - Session 3: 2 hours (120 min) → Total: 360 min
   - Session 4: 1 hour (60 min) → Total: 420 min → **+15 XP** ✅

3. **Verify 7h XP**:
   - Check `UserXP.totalXP` = 15
   - Check `DailyXPAward` has `focus_7h` record

4. **Continue to 11 hours**:
   - Session 5: 2 hours (120 min) → Total: 540 min
   - Session 6: 2 hours (120 min) → Total: 660 min → **+30 XP** ✅

5. **Verify 11h XP**:
   - Check `UserXP.totalXP` = 45 (15 + 30)
   - Check `DailyXPAward` has both records

6. **Add more sessions** (should not award more XP):
   - Session 7: 1 hour (60 min) → Total: 720 min
   - Verify: No new XP awarded
   - `UserXP.totalXP` still = 45

---

## Step 7: Edge Cases

### Edge Case 1: Multiple Sessions Same Day

**Test**: Create 10 sessions of 1 hour each (10 hours total)

**Expected**:
- After 7th session (7 hours): +15 XP
- After 11th session (11 hours): +30 XP (if you create 11 sessions)
- Total XP: 45

### Edge Case 2: Single Long Session

**Test**: Create one 8-hour session

**Expected**:
- +15 XP (crossed 7h threshold)
- No +30 XP (didn't cross 11h threshold)
- Total XP: 15

### Edge Case 3: Sessions Spanning Midnight

**Test**: Session from 23:00 to 01:00 (next day)

**Expected**:
- Session date is determined by `startTime`
- If `startTime` is 2025-01-16 23:00, it counts for Jan 16
- If `startTime` is 2025-01-17 00:00, it counts for Jan 17

### Edge Case 4: Different Days

**Test**: Create sessions on different days

**Expected**:
- Each day's sessions are calculated separately
- XP can be awarded on multiple days
- `DailyXPAward` has separate records for each day

---

## Step 8: Troubleshooting

### Issue: XP Not Being Awarded

**Possible Causes:**

1. **Threshold not crossed**:
   - Verify total minutes >= 420 for 7h threshold
   - Verify total minutes >= 660 for 11h threshold

2. **Already awarded**:
   - Check `DailyXPAward` table for existing records
   - XP is only awarded once per threshold per day

3. **Date mismatch**:
   - Ensure all sessions have same date (based on `startTime`)
   - Check timezone issues

4. **Database error**:
   - Check server logs for errors
   - Verify `DailyXPAward` table exists
   - Verify `UserXP` table exists

### Issue: Duplicate XP Awarded

**Solution**: This should not happen due to unique constraint. If it does:
- Check `DailyXPAward` table for duplicate records
- Verify unique constraint is working: `@@unique([userId, date, threshold])`

### Issue: XP Amount Incorrect

**Check**:
- Verify threshold logic: 7h = 15 XP, 11h = 30 XP
- Check if both thresholds were awarded (should be 45 total)
- Verify `UserXP.totalXP` is being incremented correctly

---

## Step 9: API Response Notes

**Important**: The focus session API response does NOT include XP information:

```json
{
  "message": "Focus session saved successfully"
}
```

**Why?**
- XP is awarded asynchronously (non-blocking)
- Prevents API response delay
- XP can be verified by checking database or future XP API endpoints

---

## Step 10: Verification Queries

### Get User's Total XP

**Future API** (to be implemented):
```
GET /api/xp
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "totalXP": 45,
  "userId": "user-id"
}
```

### Get Daily XP Awards

**Future API** (to be implemented):
```
GET /api/xp/daily?date=2025-01-16
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "date": "2025-01-16",
  "awards": [
    {
      "threshold": "focus_7h",
      "xpAmount": 15,
      "awardedAt": "2025-01-16T10:30:00Z"
    },
    {
      "threshold": "focus_11h",
      "xpAmount": 30,
      "awardedAt": "2025-01-16T15:45:00Z"
    }
  ],
  "totalXPForDay": 45
}
```

---

## Summary

### Key Points

1. **XP is automatic** - Awarded when saving focus sessions
2. **Threshold crossing** - Only awarded when crossing threshold for first time
3. **No duplicates** - Each threshold can only be awarded once per day
4. **Cumulative** - XP adds to user's total XP
5. **Per day** - Sessions are grouped by date (startTime)

### Testing Checklist

- [ ] Create sessions to reach 7 hours → Verify +15 XP
- [ ] Create sessions to reach 11 hours → Verify +30 XP
- [ ] Add more sessions after thresholds → Verify no duplicate XP
- [ ] Test threshold crossing logic (390→430 minutes)
- [ ] Test already above threshold (450→480 minutes)
- [ ] Verify XP in database (`UserXP` and `DailyXPAward` tables)
- [ ] Test multiple days (XP awarded separately per day)

---

**Happy Testing! 🎮✨**

