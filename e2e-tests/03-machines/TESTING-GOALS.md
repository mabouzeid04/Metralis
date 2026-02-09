DONE

# Machines E2E Testing Goals

## Overview
Test machine management functionality including listing, creating, viewing details, editing, and viewing machine history.

---

## Test Scenarios

### 1. Machine List View
**File:** `machine-list.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-MACH-001 | View machines list | 1. Navigate to /machines | Table displays with machine data |
| TC-MACH-002 | Search machines by name | 1. Enter machine name in search<br>2. Verify results | Only matching machines shown |
| TC-MACH-003 | Search machines by code | 1. Enter machine code in search | Only matching machines shown |
| TC-MACH-004 | Filter by status (RUNNING) | 1. Select RUNNING status filter | Only RUNNING machines shown |
| TC-MACH-005 | Filter by status (DOWN) | 1. Select DOWN status filter | Only DOWN machines shown |
| TC-MACH-006 | Filter by status (MAINTENANCE) | 1. Select MAINTENANCE filter | Only MAINTENANCE machines shown |
| TC-MACH-007 | Filter by category | 1. Select a category filter | Only machines in that category shown |
| TC-MACH-008 | Filter by line | 1. Select a production line filter | Only machines on that line shown |
| TC-MACH-009 | Filter by area | 1. Select an area filter | Only machines in that area shown |
| TC-MACH-010 | Filter by criticality | 1. Select criticality level | Only machines with that criticality shown |
| TC-MACH-011 | Combined filters | 1. Apply multiple filters | Results match all filter criteria |
| TC-MACH-012 | Clear filters | 1. Apply filters<br>2. Clear all filters | All machines shown again |
| TC-MACH-013 | Empty search results | 1. Search for non-existent machine | Empty state message displayed |
| TC-MACH-014 | Pagination (if applicable) | 1. With many machines<br>2. Navigate pages | Pagination works correctly |
| TC-MACH-015 | Status badges display | 1. View machine list | Correct color-coded status badges |

---

### 2. Create Machine (Admin Only)
**File:** `machine-create.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-MACH-020 | Admin sees create button | 1. Login as admin<br>2. Navigate to /machines | Create machine button visible |
| TC-MACH-021 | Technician cannot create | 1. Login as technician<br>2. Navigate to /machines | Create button not visible or disabled |
| TC-MACH-022 | Navigate to create form | 1. Click create button | Navigate to /machines/new |
| TC-MACH-023 | Create machine - all required fields | 1. Fill all required fields<br>2. Submit | Machine created, redirected to list/detail |
| TC-MACH-024 | Create machine - validation errors | 1. Leave required fields empty<br>2. Submit | Validation errors displayed |
| TC-MACH-025 | Create machine - duplicate code | 1. Enter existing machine code<br>2. Submit | Error: code already exists |
| TC-MACH-026 | Create machine - all optional fields | 1. Fill all fields including optional<br>2. Submit | Machine created with all data |
| TC-MACH-027 | Cancel create | 1. Fill some fields<br>2. Click cancel | Return to list, no machine created |

**Create Form Fields:**
- Name (required)
- Code (required, unique)
- Category
- Line
- Area
- Manufacturer
- Model
- Serial Number
- Commissioning Date
- Status (RUNNING, DOWN, MAINTENANCE, RETIRED)
- Criticality (LOW, MEDIUM, HIGH, CRITICAL)

---

### 3. Machine Detail View
**File:** `machine-detail.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-MACH-030 | View machine details | 1. Click machine in list | Navigate to /machines/:id with details |
| TC-MACH-031 | All metadata displayed | 1. View machine detail | See all machine properties |
| TC-MACH-032 | Work order history shown | 1. View machine detail | Timeline of related work orders |
| TC-MACH-033 | Repair history shown | 1. View machine detail | List of past repairs |
| TC-MACH-034 | Associated documents shown | 1. View machine detail | Links to related documents |
| TC-MACH-035 | Status and criticality badges | 1. View machine detail | Correct badges displayed |
| TC-MACH-036 | Edit button visible (admin) | 1. Login as admin<br>2. View machine detail | Edit button visible |
| TC-MACH-037 | Edit button hidden (technician) | 1. Login as technician<br>2. View machine detail | Edit button not visible |
| TC-MACH-038 | Navigate to work order from history | 1. Click work order in timeline | Navigate to work order detail |
| TC-MACH-039 | Navigate to document from list | 1. Click document link | Navigate to document or download |

---

### 4. Edit Machine (Admin Only)
**File:** `machine-edit.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-MACH-040 | Navigate to edit form | 1. As admin, click edit on detail page | Navigate to /machines/:id/edit |
| TC-MACH-041 | Form pre-populated | 1. Open edit form | All current values displayed |
| TC-MACH-042 | Update machine name | 1. Change name<br>2. Save | Name updated successfully |
| TC-MACH-043 | Update machine status | 1. Change status<br>2. Save | Status updated, badge changes |
| TC-MACH-044 | Update criticality | 1. Change criticality<br>2. Save | Criticality updated |
| TC-MACH-045 | Update all fields | 1. Modify all editable fields<br>2. Save | All changes persisted |
| TC-MACH-046 | Edit validation errors | 1. Clear required field<br>2. Save | Validation error shown |
| TC-MACH-047 | Cancel edit | 1. Make changes<br>2. Cancel | Return to detail, no changes saved |
| TC-MACH-048 | Technician cannot access edit URL | 1. As technician, navigate to /machines/:id/edit | Redirected or access denied |

---

### 5. Machine History & Timeline
**File:** `machine-history.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-MACH-050 | View complete history | 1. Navigate to machine detail | Full history timeline visible |
| TC-MACH-051 | History chronological order | 1. View history | Events sorted by date (newest first or configurable) |
| TC-MACH-052 | Work order events in history | 1. Create work order for machine<br>2. View history | New work order appears in timeline |
| TC-MACH-053 | Status change events | 1. Change machine status<br>2. View history | Status change logged in timeline |
| TC-MACH-054 | Filter history by type | 1. Filter history (if available) | Only selected event types shown |

---

## Test Data Requirements

```typescript
// fixtures/machines.ts
export const machineTestData = {
  newMachine: {
    name: 'Test CNC Machine',
    code: 'CNC-TEST-001',
    category: 'CNC',
    line: 'Line A',
    area: 'Production Floor',
    manufacturer: 'Test Manufacturer',
    model: 'Model X100',
    serialNumber: 'SN123456',
    commissioningDate: '2024-01-15',
    status: 'RUNNING',
    criticality: 'HIGH'
  },
  existingMachines: [
    { name: 'Lathe 01', status: 'RUNNING', criticality: 'MEDIUM' },
    { name: 'Press 02', status: 'DOWN', criticality: 'HIGH' },
    { name: 'Welder 03', status: 'MAINTENANCE', criticality: 'LOW' }
  ]
};
```

---

## Page Objects

```typescript
// pages/MachineListPage.ts
class MachineListPage {
  readonly searchInput: Locator;
  readonly statusFilter: Locator;
  readonly categoryFilter: Locator;
  readonly createButton: Locator;
  readonly machineTable: Locator;

  async searchMachines(query: string): Promise<void>;
  async filterByStatus(status: string): Promise<void>;
  async clickMachine(machineCode: string): Promise<void>;
  async getMachineCount(): Promise<number>;
}

// pages/MachineDetailPage.ts
class MachineDetailPage {
  readonly machineName: Locator;
  readonly statusBadge: Locator;
  readonly editButton: Locator;
  readonly historyTimeline: Locator;
  readonly documentsSection: Locator;

  async clickEdit(): Promise<void>;
  async getStatus(): Promise<string>;
  async getWorkOrderCount(): Promise<number>;
}

// pages/MachineFormPage.ts
class MachineFormPage {
  readonly nameInput: Locator;
  readonly codeInput: Locator;
  readonly statusSelect: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  async fillForm(data: MachineData): Promise<void>;
  async submit(): Promise<void>;
  async cancel(): Promise<void>;
}
```
