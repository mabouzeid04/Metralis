# Metralis E2E Testing Suite

Comprehensive end-to-end testing coverage for the Metralis CMMS (Computerized Maintenance Management System) application.

---

## Testing Areas Overview

| # | Area | Test Cases | Description |
|---|------|------------|-------------|
| 01 | [Authentication](./01-authentication/) | 42 | Login, signup, logout, approval workflow, sessions |
| 02 | [Dashboard](./02-dashboard/) | 42 | Stats cards, charts, data accuracy, navigation |
| 03 | [Machines](./03-machines/) | 55 | CRUD operations, filtering, history, admin-only actions |
| 04 | [Assets](./04-assets/) | 63 | Hierarchical management, picker, navigation |
| 05 | [Work Orders](./05-work-orders/) | 139 | Full lifecycle, repair actions, parts tracking, status workflow |
| 06 | [Parts/Inventory](./06-parts-inventory/) | 97 | CRUD, stock management, work order integration |
| 07 | [Documents](./07-documents/) | 78 | Upload, processing, RAG integration, asset relationships |
| 08 | [AI Chat](./08-ai-chat/) | 104 | Conversations, RAG responses, feedback, shortcuts |
| 09 | [Admin Analytics](./09-admin-analytics/) | 67 | Stats, insights, generation, actions |
| 10 | [User Management](./10-user-management/) | 93 | Approve/reject, roles, delete, create users |
| 11 | [Settings](./11-settings/) | 95 | Profile, password, WhatsApp, language preferences |
| 12 | [Navigation & Layout](./12-navigation-and-layout/) | 105 | Sidebar, header, responsive, keyboard nav |
| 13 | [Error Handling](./13-error-handling/) | 115 | HTTP errors, validation, network, edge cases |
| 14 | [Role-Based Access](./14-role-based-access/) | 134 | Admin vs technician, URL protection, API auth |

**Total Test Cases: ~1,229**

---

## Quick Start

### Prerequisites
- Node.js 18+
- Playwright installed
- Backend server running
- Database seeded with test data

### Installation
```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install
```

### Running Tests
```bash
# Run all tests
npx playwright test

# Run specific area
npx playwright test e2e-tests/01-authentication/

# Run with UI
npx playwright test --ui

# Run headed (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test e2e-tests/05-work-orders/work-order-create.spec.ts
```

---

## Test Structure

Each testing area folder contains:

```
XX-area-name/
├── TESTING-GOALS.md    # Comprehensive test scenarios and cases
├── *.spec.ts           # Playwright test files (to be created)
└── fixtures/           # Test data fixtures (if needed)
```

### TESTING-GOALS.md Structure
- **Overview**: Purpose of the test area
- **Test Scenarios**: Grouped by functionality
- **Test Cases Table**: TC-ID, Description, Steps, Expected Result
- **Test Data Requirements**: Fixtures and seed data
- **Page Objects**: Suggested POM structure

---

## Test Case ID Convention

```
TC-[AREA]-[NUMBER]

Areas:
- AUTH    = Authentication
- DASH    = Dashboard
- MACH    = Machines
- ASST    = Assets
- WO      = Work Orders
- PART    = Parts/Inventory
- DOC     = Documents
- AI      = AI Chat
- ANLYT   = Analytics
- USER    = User Management
- SET     = Settings
- NAV     = Navigation & Layout
- ERR     = Error Handling
- RBAC    = Role-Based Access Control

Example: TC-WO-031 = Work Orders test case #31
```

---

## User Roles for Testing

| Role | Credentials | Description |
|------|-------------|-------------|
| Admin | admin@test.com / AdminPass123! | Full system access |
| Technician | tech@test.com / TechPass123! | Standard user access |
| Pending | pending@test.com / PendPass123! | Awaiting approval |
| Rejected | rejected@test.com / RejPass123! | Rejected user |

---

## Critical Workflows to Prioritize

### High Priority (Core Business Logic)
1. **Work Order Lifecycle** - Create → Update Status → Add Repair Actions → Close
2. **User Approval Flow** - Signup → Pending → Approve/Reject
3. **AI Diagnostic Flow** - Ask Question → Get RAG Response → Provide Feedback
4. **Document Upload & Processing** - Upload → Text Extraction → Embedding → Searchable

### Medium Priority (Admin Functions)
5. **Machine Management** - Admin CRUD operations
6. **Asset Hierarchy** - Parent-child relationships
7. **Analytics & Insights** - Data accuracy, generation

### Standard Priority (Supporting Features)
8. **Parts Inventory** - CRUD, usage tracking
9. **Settings & Preferences** - Profile, password, language
10. **Navigation & Responsiveness** - Cross-browser, mobile

---

## Test Data Seeding

Create a seeding script for consistent test data:

```typescript
// scripts/seed-test-data.ts
export async function seedTestData() {
  // Users
  await createUser({ email: 'admin@test.com', role: 'ADMIN', status: 'APPROVED' });
  await createUser({ email: 'tech@test.com', role: 'TECHNICIAN', status: 'APPROVED' });
  await createUser({ email: 'pending@test.com', role: 'TECHNICIAN', status: 'PENDING' });

  // Machines
  await createMachine({ code: 'PUMP-001', name: 'Main Pump', status: 'RUNNING' });
  await createMachine({ code: 'CNC-001', name: 'CNC Machine 1', status: 'DOWN' });

  // Assets (Hierarchy)
  const line = await createAsset({ code: 'LINE-A', name: 'Production Line A' });
  await createAsset({ code: 'AREA-1', name: 'Assembly Area', parentId: line.id });

  // Parts
  await createPart({ partNumber: 'BRG-001', name: 'Bearing SKF 6205', cost: 45.99 });

  // Documents
  await uploadDocument({ title: 'Pump Manual', type: 'MANUAL', assetCode: 'PUMP-001' });

  // Work Orders
  await createWorkOrder({ title: 'Pump Vibration', machineCode: 'PUMP-001', status: 'OPEN' });
}
```

---

## Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e-tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Shared Page Objects

```
e2e-tests/
├── pages/
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   ├── DashboardPage.ts
│   ├── MachineListPage.ts
│   ├── MachineDetailPage.ts
│   ├── WorkOrderListPage.ts
│   ├── WorkOrderDetailPage.ts
│   ├── WorkOrderFormPage.ts
│   ├── PartsListPage.ts
│   ├── DocumentsPage.ts
│   ├── AIChatPage.ts
│   ├── AdminAnalyticsPage.ts
│   ├── UserManagementPage.ts
│   └── SettingsPage.ts
├── components/
│   ├── Sidebar.ts
│   ├── Header.ts
│   ├── AssetPicker.ts
│   ├── UserPicker.ts
│   ├── ConfirmationDialog.ts
│   ├── Toast.ts
│   └── ErrorMessage.ts
├── fixtures/
│   ├── users.ts
│   ├── machines.ts
│   ├── work-orders.ts
│   ├── parts.ts
│   └── documents.ts
└── helpers/
    ├── AuthHelper.ts
    ├── ApiHelper.ts
    └── TestDataHelper.ts
```

---

## CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Coverage Goals

| Area | Target Coverage | Priority |
|------|-----------------|----------|
| Authentication | 100% | Critical |
| Work Orders | 100% | Critical |
| AI Chat | 90% | High |
| Role-Based Access | 100% | Critical |
| Error Handling | 90% | High |
| Dashboard | 80% | Medium |
| Navigation | 80% | Medium |
| Settings | 70% | Low |

---

## Next Steps

1. **Review TESTING-GOALS.md** in each folder for detailed test cases
2. **Implement Page Objects** based on the suggested structures
3. **Create test data fixtures** for consistent seeding
4. **Write Playwright spec files** following the test case tables
5. **Set up CI/CD** for automated testing on PRs
6. **Track coverage** using the test case IDs

---

## Contributing

When adding new tests:
1. Add test case to the appropriate TESTING-GOALS.md
2. Follow the TC-[AREA]-[NUMBER] naming convention
3. Update the test count in this README
4. Ensure tests are independent and idempotent
5. Clean up test data after each test
