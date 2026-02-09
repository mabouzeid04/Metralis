DONE

# User Management E2E Testing Goals

## Overview
Test admin-only user management functionality including viewing users, approving/rejecting pending users, changing roles, deleting users, and creating new users.

---

## Test Scenarios

### 1. User Management Access Control
**File:** `user-management-access.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-USER-001 | Admin can access user management | 1. Login as admin<br>2. Navigate to /users | User management page loads |
| TC-USER-002 | Technician cannot access | 1. Login as technician<br>2. Navigate to /users | Redirected or access denied |
| TC-USER-003 | Users link visible (admin) | 1. Login as admin<br>2. Check sidebar/nav | Users link visible |
| TC-USER-004 | Users link hidden (technician) | 1. Login as technician<br>2. Check sidebar/nav | Users link not visible |
| TC-USER-005 | Direct URL access blocked | 1. As technician, go to /users | Access denied |

---

### 2. View Users
**File:** `user-list.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-USER-010 | View approved users table | 1. Navigate to /users | Approved users table displayed |
| TC-USER-011 | User list shows name | 1. View users | User names displayed |
| TC-USER-012 | User list shows email | 1. View users | User emails displayed |
| TC-USER-013 | User list shows role | 1. View users | User roles (ADMIN/TECHNICIAN) shown |
| TC-USER-014 | Role displayed as badge | 1. View users | Role shown with appropriate styling |
| TC-USER-015 | Search users by name | 1. Enter name in search | Matching users shown |
| TC-USER-016 | Search users by email | 1. Enter email in search | Matching users shown |
| TC-USER-017 | Filter by role (ADMIN) | 1. Filter by ADMIN role | Only admins shown |
| TC-USER-018 | Filter by role (TECHNICIAN) | 1. Filter by TECHNICIAN | Only technicians shown |
| TC-USER-019 | Empty search results | 1. Search for non-existent user | Empty state message |
| TC-USER-020 | Pagination (if applicable) | 1. Many users<br>2. Navigate pages | Pagination works |

---

### 3. Pending Users Section
**File:** `pending-users.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-USER-030 | Pending users section visible | 1. Navigate to /users | Pending users section shown |
| TC-USER-031 | Pending users listed | 1. With pending users | Pending users appear in section |
| TC-USER-032 | Pending user info displayed | 1. View pending user | Name, email, registration date shown |
| TC-USER-033 | Approve button visible | 1. View pending user | Approve button shown |
| TC-USER-034 | Reject button visible | 1. View pending user | Reject button shown |
| TC-USER-035 | Empty pending section | 1. No pending users | Empty state message |
| TC-USER-036 | Pending count indicator | 1. With pending users | Count shown (badge or number) |

---

### 4. Approve Users
**File:** `approve-users.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-USER-040 | Click approve button | 1. Find pending user<br>2. Click approve | Confirmation or immediate action |
| TC-USER-041 | Approve confirmation (if present) | 1. Click approve<br>2. Confirm | User approved |
| TC-USER-042 | User moves to approved list | 1. Approve user | User appears in approved table |
| TC-USER-043 | User removed from pending | 1. Approve user | User removed from pending section |
| TC-USER-044 | Approved user default role | 1. Approve user | User has TECHNICIAN role |
| TC-USER-045 | Approved user can login | 1. Approve user<br>2. User attempts login | Login successful, access granted |
| TC-USER-046 | Success notification | 1. Approve user | Success message shown |
| TC-USER-047 | Approve multiple users | 1. Approve several pending users | All approvals process correctly |

---

### 5. Reject Users
**File:** `reject-users.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-USER-050 | Click reject button | 1. Find pending user<br>2. Click reject | Confirmation dialog appears |
| TC-USER-051 | Reject confirmation required | 1. Click reject | Must confirm before rejection |
| TC-USER-052 | Cancel rejection | 1. Click reject<br>2. Cancel | User not rejected |
| TC-USER-053 | Confirm rejection | 1. Click reject<br>2. Confirm | User rejected |
| TC-USER-054 | User removed from pending | 1. Reject user | User removed from pending section |
| TC-USER-055 | Rejected user cannot login | 1. Reject user<br>2. User attempts login | Login denied or blocked |
| TC-USER-056 | Success notification | 1. Reject user | Rejection confirmed message |
| TC-USER-057 | Rejection reason (if applicable) | 1. Reject user | Option to provide reason |

---

### 6. Change User Roles
**File:** `change-roles.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-USER-060 | Role dropdown visible | 1. View user in approved list | Role change dropdown shown |
| TC-USER-061 | Change TECHNICIAN to ADMIN | 1. Select ADMIN from dropdown | User role updated to ADMIN |
| TC-USER-062 | Change ADMIN to TECHNICIAN | 1. Select TECHNICIAN from dropdown | User role updated to TECHNICIAN |
| TC-USER-063 | Role change confirmation | 1. Change role | Confirmation dialog (if present) |
| TC-USER-064 | Role change persists | 1. Change role<br>2. Refresh page | New role maintained |
| TC-USER-065 | User gains admin access | 1. Promote to ADMIN<br>2. User refreshes | Admin features accessible |
| TC-USER-066 | User loses admin access | 1. Demote from ADMIN<br>2. User refreshes | Admin features hidden |
| TC-USER-067 | Cannot demote self | 1. Try to change own role from ADMIN | Prevented or warning |
| TC-USER-068 | Success notification | 1. Change role | Success message shown |
| TC-USER-069 | Cannot have zero admins | 1. Try to demote last admin | Prevented with error message |

---

### 7. Delete Users
**File:** `delete-users.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-USER-070 | Delete button visible | 1. View user in list | Delete button accessible |
| TC-USER-071 | Delete shows confirmation | 1. Click delete | Confirmation dialog with user info |
| TC-USER-072 | Cancel delete | 1. Click delete<br>2. Cancel | User not deleted |
| TC-USER-073 | Confirm delete | 1. Click delete<br>2. Confirm | User deleted |
| TC-USER-074 | User removed from list | 1. Delete user | User no longer in list |
| TC-USER-075 | Deleted user cannot login | 1. Delete user<br>2. User attempts login | Login fails |
| TC-USER-076 | Cannot delete self | 1. Try to delete own account | Prevented with error message |
| TC-USER-077 | Cannot delete last admin | 1. Try to delete last admin | Prevented with error message |
| TC-USER-078 | Work order assignments handled | 1. Delete user with WO assignments | Assignments handled appropriately |
| TC-USER-079 | Success notification | 1. Delete user | Deletion confirmed message |

---

### 8. Create New User
**File:** `create-users.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-USER-080 | Create user form visible | 1. Navigate to /users | Create user form/section visible |
| TC-USER-081 | Create user - all fields | 1. Fill name, email, password, role<br>2. Submit | User created |
| TC-USER-082 | Create as ADMIN | 1. Select ADMIN role<br>2. Submit | User created as ADMIN |
| TC-USER-083 | Create as TECHNICIAN | 1. Select TECHNICIAN role<br>2. Submit | User created as TECHNICIAN |
| TC-USER-084 | Created user auto-approved | 1. Create user | User appears in approved list, not pending |
| TC-USER-085 | Created user can login | 1. Create user<br>2. New user logs in | Login successful |
| TC-USER-086 | Validation - missing name | 1. Leave name empty<br>2. Submit | Validation error |
| TC-USER-087 | Validation - missing email | 1. Leave email empty<br>2. Submit | Validation error |
| TC-USER-088 | Validation - invalid email | 1. Enter invalid email format<br>2. Submit | Validation error |
| TC-USER-089 | Validation - existing email | 1. Enter existing user email<br>2. Submit | Error: email already exists |
| TC-USER-090 | Validation - missing password | 1. Leave password empty<br>2. Submit | Validation error |
| TC-USER-091 | Validation - short password | 1. Enter < 8 chars<br>2. Submit | Password minimum error |
| TC-USER-092 | User appears in list | 1. Create user | New user visible in approved list |
| TC-USER-093 | Success notification | 1. Create user | Success message shown |

---

## Test Data Requirements

```typescript
// fixtures/users.ts
export const userTestData = {
  adminUser: {
    name: 'Test Admin',
    email: 'admin@test.com',
    password: 'AdminPass123!',
    role: 'ADMIN'
  },
  technicianUser: {
    name: 'Test Technician',
    email: 'tech@test.com',
    password: 'TechPass123!',
    role: 'TECHNICIAN'
  },
  pendingUser: {
    name: 'Pending User',
    email: 'pending@test.com',
    password: 'PendPass123!',
    status: 'PENDING'
  },
  newUser: {
    name: 'New User',
    email: 'newuser@test.com',
    password: 'NewPass123!',
    role: 'TECHNICIAN'
  }
};
```

---

## Page Objects

```typescript
// pages/UserManagementPage.ts
class UserManagementPage {
  // Approved Users
  readonly approvedUsersTable: Locator;
  readonly searchInput: Locator;
  readonly roleFilter: Locator;

  // Pending Users
  readonly pendingUsersSection: Locator;
  readonly pendingUsersList: Locator;
  readonly pendingCountBadge: Locator;

  // Create User Form
  readonly createUserForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly roleSelect: Locator;
  readonly createButton: Locator;

  // Actions
  async searchUsers(query: string): Promise<void>;
  async filterByRole(role: string): Promise<void>;
  async getUserCount(): Promise<number>;
  async getPendingCount(): Promise<number>;
  async createUser(data: UserData): Promise<void>;
}

// components/UserRow.ts
class UserRow {
  readonly name: Locator;
  readonly email: Locator;
  readonly roleBadge: Locator;
  readonly roleDropdown: Locator;
  readonly deleteButton: Locator;

  async changeRole(newRole: string): Promise<void>;
  async delete(): Promise<void>;
  async getRole(): Promise<string>;
}

// components/PendingUserCard.ts
class PendingUserCard {
  readonly name: Locator;
  readonly email: Locator;
  readonly registrationDate: Locator;
  readonly approveButton: Locator;
  readonly rejectButton: Locator;

  async approve(): Promise<void>;
  async reject(): Promise<void>;
}

// components/ConfirmationDialog.ts
class ConfirmationDialog {
  readonly dialog: Locator;
  readonly title: Locator;
  readonly message: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;

  async confirm(): Promise<void>;
  async cancel(): Promise<void>;
  async isVisible(): Promise<boolean>;
}
```

---

## Special Test Scenarios

### Role Cascading Effects
When a user's role changes, verify:
- Sidebar navigation updates
- Page access changes
- API authorization changes

### User Deletion Cascading
When a user is deleted, verify:
- Work order assignments are handled
- AI chat conversations remain (or are deleted per policy)
- Audit logs are maintained

### Concurrent Admin Actions
Test scenarios where:
- Two admins modify the same user
- Admin approves user while another rejects
- Race conditions in user management
