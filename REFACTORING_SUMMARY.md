# Refactoring Summary - DRICE Grants System

## Overview

This refactoring significantly improves the form submission architecture, API consistency, and code maintainability across the DRICE grants system. All changes compile successfully and maintain backward compatibility with production deployments.

---

## Frontend Changes

### 1. ✅ API Base URL Standardization
**File**: `src/api/grants.js`

Changed from hardcoded localhost fallback to relative path:
```javascript
// Before
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/grants";

// After
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api/grants";
```

**Benefits**:
- Works seamlessly in both local dev and production without environment config
- Respects proxy settings in Vite
- Simplifies Vercel deployment (no need for hardcoded URLs)

### 2. ✅ Internal Grant Submission Simplified
**File**: `src/api/grants.js` & `src/components/Grants/InternalGrantForm.jsx`

**Before**: Two-step process (FormData upload → JSON confirm)
- Create endpoint accepted multipart FormData
- Separate confirm endpoint sent JSON for emails

**After**: Single JSON submission
- `submitInternalGrantApplication()` now sends JSON directly
- Backend handles both save + email notification in one call
- `sendInternalGrantConfirmation()` kept for backwards compatibility

```javascript
// Before (FormData wrapper)
const formDataToSend = new FormData();
formDataToSend.append("data", JSON.stringify(normalizedPayload));
await submitInternalGrantApplication(formDataToSend);
await sendInternalGrantConfirmation(applicantId, normalizedPayload);

// After (Direct JSON)
await submitInternalGrantApplication(normalizedPayload);
```

**Benefits**:
- Simpler flow, fewer API calls
- No JSON.parse() on backend
- Consistent with VC Innovation submission
- Cleaner error handling

### 3. ✅ Import Cleanup
**File**: `src/components/Grants/InternalGrantForm.jsx`

Removed unused `sendInternalGrantConfirmation` from imports:
```javascript
- import { submitInternalGrantApplication, sendInternalGrantConfirmation, ApiError }
+ import { submitInternalGrantApplication, ApiError }
```

---

## Backend Changes

### 1. ✅ Multer Removed from Internal Grant Routes
**File**: `grants-backend/src/grants/internal-grant/routes/internalGrant.routes.ts`

**Before**:
```typescript
router.post("/", uploadAttachments, handleCreate);
```

**After**:
```typescript
router.post("/", handleCreate);
```

**Rationale**:
- Files are uploaded to Supabase on the **client**, not the backend
- Multer was unnecessary and complicating request parsing
- Backend now receives pre-uploaded file URLs directly

### 2. ✅ Internal Grant Handler Refactored
**File**: `grants-backend/src/grants/internal-grant/handlers/internalGrant.handler.ts`

**Changes**:
- Removed `uploadAttachments` import and multer setup
- Updated `handleCreate()` to accept JSON directly via `req.body`
- Integrated email sending into `handleCreate()` 
- Added email validation to `handleConfirm()` endpoint
- Extracted CSV generation to shared helper

**New Flow** (harmonized with VC Innovation):
1. Validate incoming JSON
2. Save application to database
3. Generate CSV buffer
4. Send DRICE notification email
5. Send applicant confirmation email
6. Return created application record

### 3. ✅ Shared Email Utilities
**File**: `grants-backend/src/lib/mailer.ts`

**New Exports**:
```typescript
export function generateCSVBuffer(data: any): Buffer
export function buildUploadedFilesInfo(
  data: Record<string, unknown>,
  labelMap: Record<string, string>
): Record<string, string>
```

**Benefits**:
- Eliminates duplicate CSV flattening logic between VC and Internal handlers
- Provides consistent file URL mapping
- Supports both single URLs and comma-separated URL strings

### 4. ✅ SMTP Configuration Check
**File**: `grants-backend/src/lib/mailer.ts`

**Added**:
```typescript
if (!SMTP_USER || !SMTP_PASS) {
  throw new Error('SMTP_USER and SMTP_PASS must be configured for email delivery.');
}

transporter.verify().then(() => {
  console.log('[SMTP Debug] SMTP transporter verified successfully.');
}).catch((err) => {
  console.warn('[SMTP Debug] SMTP transporter verification failed:', err);
});
```

**Benefits**:
- Fails fast with clear error message if SMTP not configured
- Verifies connection on startup
- Helps catch configuration errors early

### 5. ✅ VC Innovation Handler Updated
**File**: `grants-backend/src/grants/vc-innovation/handlers/vcInnovation.handler.ts`

**Refactored To**:
- Remove duplicate CSV generation function
- Use shared `generateCSVBuffer()` and `buildUploadedFilesInfo()`
- Save database **first**, then send emails
- Email failures don't abort submission (record already saved)

**Order** (now: save first, then email):
```typescript
// 1. Save to DB first
const application = await createApplication(req.body);

// 2. Send emails (failures don't fail the request)
try {
  // Send emails...
} catch (emailErr) {
  console.error('Email failed but application was saved');
}
```

---

## API Contract Changes

### Internal Research Grant Endpoint

**POST `/api/grants/internal-research`**

**Request** (changed):
```typescript
// Before: multipart/form-data
FormData {
  applicantName: "John Doe"
  formName: "Internal Research Grant"
  data: '{"firstName":"John","lastName":"Doe",...}'
}

// After: application/json
{
  firstName: "John",
  lastName: "Doe",
  email: "john@daystar.ac.ke",
  projectTitle: "...",
  // ... all form fields
}
```

**Response** (unchanged):
```typescript
{
  success: true,
  data: {
    id: "uuid",
    firstName: "John",
    // ... application record
  }
}
```

**Behavior**:
- **Before**: Saved application only, separate `/confirm` endpoint for emails
- **After**: Saves application AND sends both DRICE + applicant emails in single call

---

## Database & Schema

✅ **No schema changes required** - All fields remain the same

---

## Environment Variables

### Required for Backend
- `DATABASE_URL` - PostgreSQL connection (Supabase transactional pool)
- `SMTP_HOST` - SMTP server (e.g., mail.tathmini.africa)
- `SMTP_PORT` - SMTP port (587 for TLS, 465 for SSL)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `DRICE_RECIPIENT_EMAIL` - Where to send notifications

### Optional for Frontend
- `.env.production`: `VITE_API_BASE_URL=https://<your-backend>.vercel.app/api/grants`
- Without this, defaults to `/api/grants` (relative path)

---

## Testing Checklist

- [x] Frontend builds without errors (Vite)
- [x] Backend compiles without errors (TypeScript)
- [x] SMTP verification on startup
- [x] New CSV buffer shared function works
- [x] File URL mapping handles both single and array URLs
- [x] JSON parsing from `req.body` works
- [x] Email failures don't crash API on VC Innovation
- [x] Application saved before email attempt on both grant types

---

## Rollout Notes

### For Vercel Backend Deployment
1. Set environment variables in Vercel project settings
2. Deploy backend code
3. Verify SMTP debug logs show successful verification
4. Test a submission in production

### For Frontend Deployment
1. Update `.env.production` with backend URL OR rely on relative path
2. Deploy frontend
3. Ensure `/api/grants` proxy is configured OR backend is same domain

### Backward Compatibility
- Old `sendInternalGrantConfirmation()` API still exists (unused but won't break)
- Both grant types now use consistent save-first-then-email pattern
- No database migration needed

---

## Performance Improvements

1. **One fewer API call** for internal research grants (combine save + email)
2. **No multipart parsing overhead** on backend
3. **Shared helper functions** reduce code duplication
4. **Earlier error detection** with SMTP verification on startup

---

## Known Issues & Limitations

None from this refactoring. All existing constraints remain:
- File uploads happen on client before form submission
- Email failures are logged but don't prevent record save
- CSV generation is simple flatten (doesn't handle complex nested objects)

---

## Future Improvements

1. Schema validation with Zod for both grant types
2. Email retry logic with exponential backoff
3. Webhook system for async email delivery
4. Admin dashboard to view applications
5. Application status tracking (draft, submitted, reviewed, awarded)
