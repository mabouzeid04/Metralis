DONE

# Authentication E2E Testing Goals

## Overview
Test all authentication flows including login, signup, logout, and the user approval workflow.

---

## Test Scenarios

### 1. Login Flow
**File:** `login.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AUTH-001 | Successful login with valid credentials | 1. Navigate to /login<br>2. Enter valid email<br>3. Enter valid password<br>4. Click login button | User redirected to dashboard, auth token stored |
| TC-AUTH-002 | Login with invalid email | 1. Navigate to /login<br>2. Enter non-existent email<br>3. Enter any password<br>4. Click login | Error message displayed: "Invalid credentials" |
| TC-AUTH-003 | Login with wrong password | 1. Navigate to /login<br>2. Enter valid email<br>3. Enter wrong password<br>4. Click login | Error message displayed: "Invalid credentials" |
| TC-AUTH-004 | Login with empty fields | 1. Navigate to /login<br>2. Leave fields empty<br>3. Click login | Form validation errors shown |
| TC-AUTH-005 | Login form validation - invalid email format | 1. Navigate to /login<br>2. Enter "notanemail"<br>3. Try to submit | Email validation error displayed |
| TC-AUTH-006 | Pending user login attempt | 1. Login with PENDING user credentials | Redirected to /awaiting-approval page |
| TC-AUTH-007 | Rejected user login attempt | 1. Login with REJECTED user credentials | Error message or blocked access |
| TC-AUTH-008 | Navigate to signup from login | 1. Navigate to /login<br>2. Click "Sign up" link | Redirected to /signup page |

---

### 2. Signup Flow
**File:** `signup.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AUTH-010 | Successful signup (first user - auto admin) | 1. Navigate to /signup<br>2. Fill name, email, password<br>3. Submit | User created as ADMIN, auto-approved, redirected to dashboard |
| TC-AUTH-011 | Successful signup (subsequent user) | 1. Navigate to /signup<br>2. Fill valid details<br>3. Submit | User created as TECHNICIAN with PENDING status, redirected to /awaiting-approval |
| TC-AUTH-012 | Signup with existing email | 1. Navigate to /signup<br>2. Enter already-registered email<br>3. Submit | Error: "Email already exists" |
| TC-AUTH-013 | Signup with short password | 1. Navigate to /signup<br>2. Enter password < 8 chars<br>3. Submit | Validation error: minimum 8 characters |
| TC-AUTH-014 | Signup with empty fields | 1. Navigate to /signup<br>2. Leave fields empty<br>3. Submit | Form validation errors for all required fields |
| TC-AUTH-015 | Signup password requirements | 1. Navigate to /signup<br>2. Test various password patterns | Password requirements enforced |
| TC-AUTH-016 | Navigate to login from signup | 1. Navigate to /signup<br>2. Click "Login" link | Redirected to /login page |

---

### 3. Logout Flow
**File:** `logout.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AUTH-020 | Successful logout | 1. Login as valid user<br>2. Click logout button/menu | Session cleared, redirected to /login |
| TC-AUTH-021 | Access protected route after logout | 1. Logout<br>2. Try to navigate to /dashboard | Redirected to /login |
| TC-AUTH-022 | Auth token cleared on logout | 1. Logout<br>2. Check localStorage/cookies | No auth tokens present |

---

### 4. Awaiting Approval Flow
**File:** `awaiting-approval.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AUTH-030 | View awaiting approval page | 1. Login as PENDING user | See approval status message |
| TC-AUTH-031 | Retry check for approval | 1. On awaiting-approval page<br>2. Click refresh/retry | Status re-checked |
| TC-AUTH-032 | Redirect after approval | 1. PENDING user is approved by admin<br>2. User refreshes/re-logs | Access granted, redirected to dashboard |

---

### 5. Session Management
**File:** `session.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AUTH-040 | Session persistence on refresh | 1. Login<br>2. Refresh page | User remains logged in |
| TC-AUTH-041 | Session expiry handling | 1. Login<br>2. Wait for token expiry<br>3. Make API request | Graceful redirect to login |
| TC-AUTH-042 | Multiple tab session sync | 1. Login in tab 1<br>2. Logout in tab 2<br>3. Action in tab 1 | Tab 1 redirected to login |

---

## Test Data Requirements

```typescript
// fixtures/auth-users.ts
export const authTestUsers = {
  validAdmin: {
    email: 'admin@test.com',
    password: 'TestPass123!',
    name: 'Test Admin'
  },
  validTechnician: {
    email: 'tech@test.com',
    password: 'TestPass123!',
    name: 'Test Technician'
  },
  pendingUser: {
    email: 'pending@test.com',
    password: 'TestPass123!',
    name: 'Pending User'
  },
  rejectedUser: {
    email: 'rejected@test.com',
    password: 'TestPass123!',
    name: 'Rejected User'
  }
};
```

---

## Page Objects

```typescript
// pages/LoginPage.ts
class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signupLink: Locator;
  readonly errorMessage: Locator;

  async login(email: string, password: string): Promise<void>;
  async expectError(message: string): Promise<void>;
}

// pages/SignupPage.ts
class SignupPage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;
  readonly loginLink: Locator;
  readonly errorMessage: Locator;

  async signup(name: string, email: string, password: string): Promise<void>;
  async expectError(message: string): Promise<void>;
}
```

---

## Environment Setup

- Clean database before each test suite
- Seed admin user for login tests
- Seed pending/rejected users for approval tests
