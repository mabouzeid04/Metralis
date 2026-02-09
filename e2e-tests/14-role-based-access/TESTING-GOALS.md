DONE

# Role-Based Access Control E2E Testing Goals

## Overview
Test role-based access control (RBAC) across the application ensuring admins and technicians have appropriate access levels.

---

## Test Scenarios

### 1. Admin Access Rights
**File:** `admin-access.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-001 | Admin can access dashboard | 1. Login as admin<br>2. Navigate to / | Dashboard accessible |
| TC-RBAC-002 | Admin can access machines | 1. Navigate to /machines | Machines page loads |
| TC-RBAC-003 | Admin can create machines | 1. Navigate to /machines/new | Create form accessible |
| TC-RBAC-004 | Admin can edit machines | 1. Navigate to /machines/:id/edit | Edit form accessible |
| TC-RBAC-005 | Admin can access assets | 1. Navigate to /assets | Assets page loads |
| TC-RBAC-006 | Admin can create assets | 1. Navigate to /assets/new | Create form accessible |
| TC-RBAC-007 | Admin can edit assets | 1. Navigate to /assets/:id/edit | Edit form accessible |
| TC-RBAC-008 | Admin can access work orders | 1. Navigate to /work-orders | Work orders page loads |
| TC-RBAC-009 | Admin can create work orders | 1. Navigate to /work-orders/new | Create form accessible |
| TC-RBAC-010 | Admin can access parts | 1. Navigate to /parts | Parts page loads |
| TC-RBAC-011 | Admin can create parts | 1. Navigate to /parts/new | Create form accessible |
| TC-RBAC-012 | Admin can edit parts | 1. Navigate to /parts/:id/edit | Edit form accessible |
| TC-RBAC-013 | Admin can delete parts | 1. Click delete on part | Delete action works |
| TC-RBAC-014 | Admin can access documents | 1. Navigate to /documents | Documents page loads |
| TC-RBAC-015 | Admin can upload documents | 1. Upload document | Upload works |
| TC-RBAC-016 | Admin can delete documents | 1. Delete document | Delete works |
| TC-RBAC-017 | Admin can access AI chat | 1. Navigate to /ai | AI chat accessible |
| TC-RBAC-018 | Admin can access analytics | 1. Navigate to /admin/analytics | Analytics dashboard loads |
| TC-RBAC-019 | Admin can access user management | 1. Navigate to /users | User management loads |
| TC-RBAC-020 | Admin can approve users | 1. Approve pending user | User approved |
| TC-RBAC-021 | Admin can reject users | 1. Reject pending user | User rejected |
| TC-RBAC-022 | Admin can change user roles | 1. Change user role | Role changed |
| TC-RBAC-023 | Admin can delete users | 1. Delete user | User deleted |
| TC-RBAC-024 | Admin can create users | 1. Create new user | User created |
| TC-RBAC-025 | Admin can access settings | 1. Navigate to /settings | Settings accessible |

---

### 2. Technician Access Rights
**File:** `technician-access.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-030 | Technician can access dashboard | 1. Login as technician<br>2. Navigate to / | Dashboard accessible |
| TC-RBAC-031 | Technician can view machines | 1. Navigate to /machines | Machines list visible |
| TC-RBAC-032 | Technician cannot create machines | 1. As technician, check for create button | Create button hidden/disabled |
| TC-RBAC-033 | Technician cannot edit machines | 1. View machine detail | Edit button hidden |
| TC-RBAC-034 | Technician cannot access machine create URL | 1. Navigate to /machines/new | Redirected or access denied |
| TC-RBAC-035 | Technician can view assets | 1. Navigate to /assets | Assets list visible |
| TC-RBAC-036 | Technician cannot create assets | 1. Check for create button | Create button hidden |
| TC-RBAC-037 | Technician cannot edit assets | 1. View asset detail | Edit button hidden |
| TC-RBAC-038 | Technician can view work orders | 1. Navigate to /work-orders | Work orders visible |
| TC-RBAC-039 | Technician can create work orders | 1. Navigate to /work-orders/new | Create form accessible |
| TC-RBAC-040 | Technician can log repair actions | 1. Add repair action to WO | Repair action added |
| TC-RBAC-041 | Technician can view parts | 1. Navigate to /parts | Parts list visible |
| TC-RBAC-042 | Technician can create parts | 1. Navigate to /parts/new | Create form accessible |
| TC-RBAC-043 | Technician can edit parts | 1. Navigate to /parts/:id/edit | Edit form accessible |
| TC-RBAC-044 | Technician can view documents | 1. Navigate to /documents | Documents visible |
| TC-RBAC-045 | Technician can upload documents | 1. Upload document | Upload works |
| TC-RBAC-046 | Technician can use AI chat | 1. Navigate to /ai | AI chat accessible |
| TC-RBAC-047 | Technician cannot access analytics | 1. Try /admin/analytics | Redirected or denied |
| TC-RBAC-048 | Technician cannot access user management | 1. Try /users | Redirected or denied |
| TC-RBAC-049 | Technician can access settings | 1. Navigate to /settings | Settings accessible |
| TC-RBAC-050 | Technician sees limited navigation | 1. Check sidebar | Admin-only links hidden |

---

### 3. Pending User Access
**File:** `pending-access.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-060 | Pending user redirected | 1. Login as pending user | Redirected to /awaiting-approval |
| TC-RBAC-061 | Pending cannot access dashboard | 1. Try to navigate to / | Redirected to awaiting approval |
| TC-RBAC-062 | Pending cannot access machines | 1. Try /machines | Redirected |
| TC-RBAC-063 | Pending cannot access work orders | 1. Try /work-orders | Redirected |
| TC-RBAC-064 | Pending cannot access parts | 1. Try /parts | Redirected |
| TC-RBAC-065 | Pending cannot access documents | 1. Try /documents | Redirected |
| TC-RBAC-066 | Pending cannot access AI chat | 1. Try /ai | Redirected |
| TC-RBAC-067 | Pending cannot access settings | 1. Try /settings | Redirected or limited access |
| TC-RBAC-068 | Pending can logout | 1. Click logout | Logged out successfully |
| TC-RBAC-069 | Pending sees approval status | 1. View awaiting approval page | Status message displayed |

---

### 4. Rejected User Access
**File:** `rejected-access.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-070 | Rejected user cannot login | 1. Login with rejected credentials | Login denied or blocked message |
| TC-RBAC-071 | Rejected user API requests blocked | 1. With rejected session, call API | 403 Forbidden |

---

### 5. Unauthenticated Access
**File:** `unauthenticated-access.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-080 | Unauthenticated redirected to login | 1. Without login, access / | Redirected to /login |
| TC-RBAC-081 | Login page accessible | 1. Navigate to /login | Login page loads |
| TC-RBAC-082 | Signup page accessible | 1. Navigate to /signup | Signup page loads |
| TC-RBAC-083 | Protected routes require auth | 1. Try /machines without login | Redirected to login |
| TC-RBAC-084 | API routes require auth | 1. Call API without token | 401 Unauthorized |
| TC-RBAC-085 | Deep link preserved | 1. Access /work-orders/123<br>2. Login | Redirected to original URL |

---

### 6. UI Element Visibility by Role
**File:** `ui-visibility.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-090 | Admin sees Analytics nav link | 1. As admin, check sidebar | Analytics link visible |
| TC-RBAC-091 | Technician doesn't see Analytics | 1. As technician, check sidebar | Analytics link hidden |
| TC-RBAC-092 | Admin sees Users nav link | 1. As admin, check sidebar | Users link visible |
| TC-RBAC-093 | Technician doesn't see Users | 1. As technician, check sidebar | Users link hidden |
| TC-RBAC-094 | Admin sees Create Machine button | 1. As admin, view /machines | Create button visible |
| TC-RBAC-095 | Technician doesn't see Create Machine | 1. As technician, view /machines | Create button hidden |
| TC-RBAC-096 | Admin sees Edit button on machine | 1. As admin, view machine detail | Edit button visible |
| TC-RBAC-097 | Technician doesn't see Edit on machine | 1. As technician, view machine detail | Edit button hidden |
| TC-RBAC-098 | Admin sees Delete on parts | 1. As admin, view part detail | Delete button visible |
| TC-RBAC-099 | User role shown correctly | 1. View profile/header | Correct role badge displayed |

---

### 7. Direct URL Access Prevention
**File:** `url-access-prevention.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-100 | Technician blocked from /admin/analytics | 1. As technician, go to /admin/analytics | Access denied or redirect |
| TC-RBAC-101 | Technician blocked from /users | 1. As technician, go to /users | Access denied or redirect |
| TC-RBAC-102 | Technician blocked from /machines/new | 1. As technician, go to /machines/new | Access denied or redirect |
| TC-RBAC-103 | Technician blocked from machine edit | 1. Go to /machines/:id/edit | Access denied or redirect |
| TC-RBAC-104 | Technician blocked from /assets/new | 1. Go to /assets/new | Access denied or redirect |
| TC-RBAC-105 | Technician blocked from asset edit | 1. Go to /assets/:id/edit | Access denied or redirect |
| TC-RBAC-106 | Access denied page displayed | 1. Try restricted URL | Access denied page or message |
| TC-RBAC-107 | Can navigate away from denied | 1. Access denied<br>2. Navigate | Can return to allowed pages |

---

### 8. API Authorization
**File:** `api-authorization.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-110 | Tech cannot POST /machines | 1. As tech, POST /api/v1/machines | 403 Forbidden |
| TC-RBAC-111 | Tech cannot PATCH /machines | 1. As tech, PATCH /api/v1/machines/:id | 403 Forbidden |
| TC-RBAC-112 | Tech cannot DELETE /machines | 1. As tech, DELETE /api/v1/machines/:id | 403 Forbidden |
| TC-RBAC-113 | Tech cannot POST /assets | 1. As tech, POST /api/v1/assets | 403 Forbidden |
| TC-RBAC-114 | Tech cannot PATCH /assets | 1. As tech, PATCH /api/v1/assets/:id | 403 Forbidden |
| TC-RBAC-115 | Tech cannot access /users | 1. As tech, GET /api/v1/users | 403 Forbidden |
| TC-RBAC-116 | Tech cannot approve users | 1. As tech, PATCH /api/v1/users/:id | 403 Forbidden |
| TC-RBAC-117 | Tech cannot access analytics API | 1. As tech, GET /api/v1/analytics | 403 Forbidden |
| TC-RBAC-118 | Admin can access all APIs | 1. As admin, test all endpoints | All return 200 OK |
| TC-RBAC-119 | No role escalation | 1. As tech, try to change own role | 403 Forbidden |

---

### 9. Role Transitions
**File:** `role-transitions.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-120 | Promoted user gains admin access | 1. Admin promotes tech to admin<br>2. Tech refreshes | Admin features accessible |
| TC-RBAC-121 | Demoted user loses admin access | 1. Admin demotes admin to tech<br>2. User refreshes | Admin features hidden |
| TC-RBAC-122 | Approved user gains access | 1. Admin approves pending<br>2. User refreshes | Full technician access |
| TC-RBAC-123 | Rejected user loses access | 1. Admin rejects pending<br>2. User tries action | Access denied |
| TC-RBAC-124 | Real-time permission update | 1. Change role<br>2. User makes request | New permissions apply |

---

### 10. Cross-User Data Access
**File:** `data-isolation.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-RBAC-130 | User can view own conversations | 1. View AI chat history | Own conversations only |
| TC-RBAC-131 | User cannot view others' conversations | 1. Try to access other user's chat | Not accessible |
| TC-RBAC-132 | Work orders visible to all | 1. View work orders | All work orders visible |
| TC-RBAC-133 | Machines visible to all | 1. View machines | All machines visible |
| TC-RBAC-134 | Admin can view all user data | 1. Admin views user list | All users visible |

---

## Test Data Requirements

```typescript
// fixtures/rbac-users.ts
export const rbacTestUsers = {
  admin: {
    email: 'admin@test.com',
    password: 'AdminPass123!',
    role: 'ADMIN',
    status: 'APPROVED'
  },
  technician: {
    email: 'tech@test.com',
    password: 'TechPass123!',
    role: 'TECHNICIAN',
    status: 'APPROVED'
  },
  pendingUser: {
    email: 'pending@test.com',
    password: 'PendPass123!',
    role: 'TECHNICIAN',
    status: 'PENDING'
  },
  rejectedUser: {
    email: 'rejected@test.com',
    password: 'RejPass123!',
    role: 'TECHNICIAN',
    status: 'REJECTED'
  }
};
```

---

## Page Objects

```typescript
// helpers/AuthHelper.ts
class AuthHelper {
  async loginAsAdmin(): Promise<void>;
  async loginAsTechnician(): Promise<void>;
  async loginAsPending(): Promise<void>;
  async loginWithRole(role: string): Promise<void>;
  async logout(): Promise<void>;
  async getCurrentRole(): Promise<string>;
}

// helpers/AccessChecker.ts
class AccessChecker {
  async canAccessPage(url: string): Promise<boolean>;
  async isElementVisible(locator: Locator): Promise<boolean>;
  async apiReturnsStatus(method: string, url: string, expectedStatus: number): Promise<boolean>;
}

// components/AccessDeniedPage.ts
class AccessDeniedPage {
  readonly message: Locator;
  readonly homeLink: Locator;
  readonly backButton: Locator;

  async isDisplayed(): Promise<boolean>;
  async goHome(): Promise<void>;
}
```

---

## Permission Matrix

| Feature | Admin | Technician | Pending | Rejected | Unauthenticated |
|---------|-------|------------|---------|----------|-----------------|
| View Dashboard | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Machines | ✅ | ✅ | ❌ | ❌ | ❌ |
| Create Machines | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit Machines | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Assets | ✅ | ✅ | ❌ | ❌ | ❌ |
| Create Assets | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit Assets | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Work Orders | ✅ | ✅ | ❌ | ❌ | ❌ |
| Create Work Orders | ✅ | ✅ | ❌ | ❌ | ❌ |
| Log Repair Actions | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Parts | ✅ | ✅ | ❌ | ❌ | ❌ |
| Create/Edit Parts | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete Parts | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Documents | ✅ | ✅ | ❌ | ❌ | ❌ |
| Upload Documents | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete Documents | ✅ | ✅ | ❌ | ❌ | ❌ |
| Use AI Chat | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Analytics | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ | ❌ |
| Settings | ✅ | ✅ | ❌ | ❌ | ❌ |
| Login Page | ✅ | ✅ | ✅ | ✅ | ✅ |
| Signup Page | ✅ | ✅ | ✅ | ✅ | ✅ |
