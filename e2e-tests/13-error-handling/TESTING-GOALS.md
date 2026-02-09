DONE

# Error Handling E2E Testing Goals

## Overview
Test error handling across the application including API errors, validation errors, network issues, and edge cases.

---

## Test Scenarios

### 1. HTTP Error Responses
**File:** `api-errors.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-001 | 400 Bad Request handling | 1. Submit malformed data | User-friendly error message |
| TC-ERR-002 | 401 Unauthorized handling | 1. Session expires<br>2. Make request | Redirect to login |
| TC-ERR-003 | 403 Forbidden handling | 1. Access restricted resource | Access denied message |
| TC-ERR-004 | 404 Not Found handling | 1. Navigate to non-existent resource | 404 page or message |
| TC-ERR-005 | 409 Conflict handling | 1. Create duplicate resource | Conflict error message |
| TC-ERR-006 | 422 Validation Error handling | 1. Submit invalid data | Validation errors displayed |
| TC-ERR-007 | 429 Rate Limit handling | 1. Exceed rate limit | Rate limit message |
| TC-ERR-008 | 500 Server Error handling | 1. Server error occurs | Generic error message |
| TC-ERR-009 | 502 Bad Gateway handling | 1. Gateway error | Service unavailable message |
| TC-ERR-010 | 503 Service Unavailable handling | 1. Service down | Maintenance/retry message |

---

### 2. Network Errors
**File:** `network-errors.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-020 | Network disconnection | 1. Disconnect network<br>2. Perform action | "No connection" message |
| TC-ERR-021 | Request timeout | 1. Slow server response | Timeout error displayed |
| TC-ERR-022 | Reconnection recovery | 1. Disconnect<br>2. Reconnect | App recovers gracefully |
| TC-ERR-023 | Offline indicator | 1. Go offline | Visual offline indicator |
| TC-ERR-024 | Retry mechanism | 1. Error occurs<br>2. Click retry | Request retried |
| TC-ERR-025 | Automatic retry (if implemented) | 1. Transient error | Automatic retry attempt |
| TC-ERR-026 | Partial load handling | 1. Some requests fail | Successful data shown, errors for failed |

---

### 3. Form Validation Errors
**File:** `validation-errors.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-030 | Required field missing | 1. Leave required field empty<br>2. Submit | Field-specific error shown |
| TC-ERR-031 | Invalid email format | 1. Enter invalid email | Email validation error |
| TC-ERR-032 | Password too short | 1. Enter short password | Minimum length error |
| TC-ERR-033 | Passwords don't match | 1. Different confirm password | Match error shown |
| TC-ERR-034 | Invalid phone format | 1. Enter invalid phone | Phone validation error |
| TC-ERR-035 | Number field validation | 1. Enter text in number field | Number format error |
| TC-ERR-036 | Date validation | 1. Enter invalid date | Date validation error |
| TC-ERR-037 | Field too long | 1. Exceed max length | Max length error |
| TC-ERR-038 | Invalid characters | 1. Enter special characters where not allowed | Character validation error |
| TC-ERR-039 | Duplicate value (unique fields) | 1. Enter existing email/code | Uniqueness error |
| TC-ERR-040 | Server-side validation | 1. Pass client validation<br>2. Fail server validation | Server error displayed |
| TC-ERR-041 | Multiple validation errors | 1. Multiple invalid fields | All errors shown |
| TC-ERR-042 | Error clears on fix | 1. Fix validation error | Error message clears |
| TC-ERR-043 | Focus on first error | 1. Submit with errors | Focus moves to first error |

---

### 4. Page Not Found (404)
**File:** `not-found.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-050 | Invalid URL path | 1. Navigate to /invalid-page | 404 page displayed |
| TC-ERR-051 | Invalid machine ID | 1. Navigate to /machines/invalid-id | 404 or error message |
| TC-ERR-052 | Invalid work order ID | 1. Navigate to /work-orders/invalid | 404 or error message |
| TC-ERR-053 | Deleted resource access | 1. Delete item<br>2. Navigate to its URL | 404 or deleted message |
| TC-ERR-054 | 404 page has navigation | 1. View 404 page | Can navigate back to app |
| TC-ERR-055 | 404 page styling | 1. View 404 page | Matches app design |
| TC-ERR-056 | 404 page suggestions | 1. View 404 page | Shows helpful links/suggestions |

---

### 5. Authentication Errors
**File:** `auth-errors.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-060 | Invalid credentials | 1. Login with wrong password | "Invalid credentials" error |
| TC-ERR-061 | Account not found | 1. Login with non-existent email | Appropriate error (security-conscious) |
| TC-ERR-062 | Account locked (if implemented) | 1. Multiple failed attempts | Account lock message |
| TC-ERR-063 | Token expired | 1. Wait for token expiry<br>2. Make request | Redirect to login |
| TC-ERR-064 | Token invalid | 1. Tamper with token | Redirect to login |
| TC-ERR-065 | Concurrent session handling | 1. Login elsewhere | Handled gracefully |
| TC-ERR-066 | Session storage cleared | 1. Clear localStorage<br>2. Make request | Redirect to login |

---

### 6. File Upload Errors
**File:** `upload-errors.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-070 | File too large | 1. Upload oversized file | Size limit error |
| TC-ERR-071 | Invalid file type | 1. Upload unsupported file type | File type error |
| TC-ERR-072 | Upload interrupted | 1. Start upload<br>2. Disconnect | Upload failure message |
| TC-ERR-073 | Empty file | 1. Upload empty file | Appropriate error |
| TC-ERR-074 | Corrupted file | 1. Upload corrupted file | Processing error |
| TC-ERR-075 | Storage quota exceeded | 1. Exceed storage limit | Quota error message |
| TC-ERR-076 | Upload progress on failure | 1. Upload fails | Progress clears/resets |
| TC-ERR-077 | Retry failed upload | 1. Upload fails<br>2. Retry | Can retry upload |

---

### 7. Data Operation Errors
**File:** `data-operation-errors.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-080 | Create fails | 1. Create operation fails | Error message, form preserved |
| TC-ERR-081 | Update fails | 1. Update operation fails | Error message, form preserved |
| TC-ERR-082 | Delete fails | 1. Delete operation fails | Error message, item preserved |
| TC-ERR-083 | Foreign key constraint | 1. Delete item with dependencies | Constraint error message |
| TC-ERR-084 | Concurrent edit conflict | 1. Two users edit same item | Conflict handling |
| TC-ERR-085 | Database connection lost | 1. DB unavailable | Service error message |
| TC-ERR-086 | Transaction rollback | 1. Multi-step operation fails | Full rollback, clear state |

---

### 8. Error Message Quality
**File:** `error-message-quality.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-090 | Messages are user-friendly | 1. Trigger various errors | No technical jargon |
| TC-ERR-091 | Messages are specific | 1. Trigger validation error | Specific field/issue identified |
| TC-ERR-092 | Messages suggest action | 1. Trigger error | Message suggests next steps |
| TC-ERR-093 | No sensitive data in errors | 1. Trigger server error | No stack traces/internal info |
| TC-ERR-094 | Consistent error styling | 1. View various errors | Consistent visual design |
| TC-ERR-095 | Error messages translated | 1. Switch to Arabic<br>2. Trigger error | Error in Arabic |
| TC-ERR-096 | Error dismissible | 1. Trigger error<br>2. Dismiss | Error can be dismissed |
| TC-ERR-097 | Error persists until fixed | 1. Validation error<br>2. Don't fix | Error remains visible |

---

### 9. Edge Cases
**File:** `edge-cases.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-100 | Very long input | 1. Enter extremely long text | Handled gracefully |
| TC-ERR-101 | Special characters | 1. Enter <script>, SQL injection attempts | Properly sanitized |
| TC-ERR-102 | Unicode input | 1. Enter emoji, special Unicode | Handled correctly |
| TC-ERR-103 | Double submit prevention | 1. Click submit rapidly | Single submission only |
| TC-ERR-104 | Browser back during operation | 1. Start operation<br>2. Press back | Graceful handling |
| TC-ERR-105 | Refresh during operation | 1. Start operation<br>2. Refresh | State handled appropriately |
| TC-ERR-106 | Empty list handling | 1. View empty data list | Empty state shown |
| TC-ERR-107 | Very large data set | 1. View list with many items | Pagination or performance |
| TC-ERR-108 | Null/undefined data | 1. Data has null values | No crashes, graceful display |

---

### 10. Error Recovery
**File:** `error-recovery.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ERR-110 | Recover from network error | 1. Error occurs<br>2. Network returns<br>3. Retry | Success on retry |
| TC-ERR-111 | Form data preserved on error | 1. Fill form<br>2. Submit fails | Form data not lost |
| TC-ERR-112 | Navigate away after error | 1. Error occurs<br>2. Navigate | Navigation works normally |
| TC-ERR-113 | Clear error state | 1. Error occurs<br>2. Fix issue<br>3. Retry | Error cleared on success |
| TC-ERR-114 | Global error boundary | 1. Component crashes | Error boundary catches, shows fallback |
| TC-ERR-115 | Error logging (console) | 1. Error occurs | Error logged for debugging |

---

## Test Data Requirements

```typescript
// fixtures/error-scenarios.ts
export const errorScenarios = {
  invalidInputs: {
    longString: 'a'.repeat(10000),
    sqlInjection: "'; DROP TABLE users; --",
    xssAttempt: '<script>alert("xss")</script>',
    unicodeString: '🎉💻🔥 Test émoji ñ',
    negativeNumber: -999,
    futureDate: '2099-12-31',
    malformedEmail: 'not-an-email',
    shortPassword: '123'
  },
  apiErrorResponses: {
    badRequest: { status: 400, message: 'Invalid request' },
    unauthorized: { status: 401, message: 'Session expired' },
    forbidden: { status: 403, message: 'Access denied' },
    notFound: { status: 404, message: 'Resource not found' },
    conflict: { status: 409, message: 'Resource already exists' },
    serverError: { status: 500, message: 'Internal server error' }
  },
  invalidIds: {
    nonExistent: 'non-existent-uuid',
    malformed: 'not-a-valid-id',
    negative: '-1'
  }
};
```

---

## Page Objects

```typescript
// components/ErrorMessage.ts
class ErrorMessage {
  readonly container: Locator;
  readonly title: Locator;
  readonly message: Locator;
  readonly dismissButton: Locator;
  readonly retryButton: Locator;

  async getText(): Promise<string>;
  async dismiss(): Promise<void>;
  async retry(): Promise<void>;
  async isVisible(): Promise<boolean>;
}

// components/ValidationError.ts
class ValidationError {
  readonly fieldErrors: Locator;
  readonly generalErrors: Locator;

  async getFieldError(fieldName: string): Promise<string>;
  async getAllErrors(): Promise<string[]>;
  async hasError(fieldName: string): Promise<boolean>;
}

// pages/ErrorPage.ts
class ErrorPage {
  readonly errorCode: Locator;
  readonly errorMessage: Locator;
  readonly homeLink: Locator;
  readonly backButton: Locator;
  readonly suggestedLinks: Locator;

  async getErrorCode(): Promise<string>;
  async goHome(): Promise<void>;
  async goBack(): Promise<void>;
}

// components/NetworkErrorBanner.ts
class NetworkErrorBanner {
  readonly banner: Locator;
  readonly message: Locator;
  readonly retryButton: Locator;

  async isVisible(): Promise<boolean>;
  async retry(): Promise<void>;
}
```

---

## Error Simulation Techniques

### API Error Mocking
```typescript
// Mock API errors for testing
await page.route('**/api/v1/**', route => {
  route.fulfill({
    status: 500,
    body: JSON.stringify({ error: 'Internal Server Error' })
  });
});
```

### Network Conditions
```typescript
// Simulate offline
await context.setOffline(true);

// Simulate slow network
await page.route('**/*', route => {
  setTimeout(() => route.continue(), 3000);
});
```

### Storage Manipulation
```typescript
// Clear auth tokens
await page.evaluate(() => localStorage.clear());
```
