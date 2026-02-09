DONE

# Work Orders E2E Testing Goals

## Overview
Test the complete work order lifecycle including creation, viewing, editing, status transitions, repair action logging, parts tracking, and attachments.

---

## Test Scenarios

### 1. Work Order List View
**File:** `work-order-list.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-WO-001 | View work orders list | 1. Navigate to /work-orders | Table displays with work order data |
| TC-WO-002 | Search by title | 1. Enter title in search | Matching work orders shown |
| TC-WO-003 | Search by work order ID | 1. Enter WO ID in search | Matching work order found |
| TC-WO-004 | Search by machine/asset name | 1. Enter machine name in search | Related work orders shown |
| TC-WO-005 | Filter by status (OPEN) | 1. Select OPEN status | Only OPEN work orders shown |
| TC-WO-006 | Filter by status (IN_PROGRESS) | 1. Select IN_PROGRESS | Only IN_PROGRESS shown |
| TC-WO-007 | Filter by status (WAITING) | 1. Select WAITING | Only WAITING shown |
| TC-WO-008 | Filter by status (CLOSED) | 1. Select CLOSED | Only CLOSED shown |
| TC-WO-009 | Filter by priority (LOW) | 1. Select LOW priority | Only LOW priority shown |
| TC-WO-010 | Filter by priority (MEDIUM) | 1. Select MEDIUM | Only MEDIUM priority shown |
| TC-WO-011 | Filter by priority (HIGH) | 1. Select HIGH | Only HIGH priority shown |
| TC-WO-012 | Filter by priority (CRITICAL) | 1. Select CRITICAL | Only CRITICAL shown |
| TC-WO-013 | Filter by type (CORRECTIVE) | 1. Select CORRECTIVE | Only corrective maintenance shown |
| TC-WO-014 | Filter by type (PREVENTIVE) | 1. Select PREVENTIVE | Only preventive maintenance shown |
| TC-WO-015 | Filter by type (INSPECTION) | 1. Select INSPECTION | Only inspection work orders shown |
| TC-WO-016 | Filter by assigned person | 1. Select assignee | Only their work orders shown |
| TC-WO-017 | Filter by date range | 1. Select date range | Work orders within range shown |
| TC-WO-018 | Combined filters | 1. Apply multiple filters | Results match all criteria |
| TC-WO-019 | Clear all filters | 1. Apply filters<br>2. Clear | All work orders shown |
| TC-WO-020 | Status badges with colors | 1. View list | Correct color-coded status badges |
| TC-WO-021 | Priority badges with colors | 1. View list | Correct color-coded priority badges |
| TC-WO-022 | Empty state | 1. Filter with no results | Empty state message shown |
| TC-WO-023 | Pagination | 1. With many work orders<br>2. Navigate pages | Pagination works correctly |
| TC-WO-024 | Click to view details | 1. Click work order row | Navigate to detail page |

---

### 2. Create Work Order
**File:** `work-order-create.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-WO-030 | Navigate to create form | 1. Click create button | Navigate to /work-orders/new |
| TC-WO-031 | Create basic work order | 1. Fill required fields<br>2. Submit | Work order created with OPEN status |
| TC-WO-032 | Select asset/machine | 1. Open asset picker<br>2. Select asset | Asset associated with work order |
| TC-WO-033 | Set title and description | 1. Enter title<br>2. Enter description | Text fields accept input |
| TC-WO-034 | Set priority | 1. Select priority level | Priority set correctly |
| TC-WO-035 | Set maintenance type | 1. Select maintenance type | Type set (CORRECTIVE/PREVENTIVE/INSPECTION) |
| TC-WO-036 | Select disciplines | 1. Check discipline checkboxes | Multiple disciplines can be selected |
| TC-WO-037 | Set equipment stop time | 1. Enter equipment stop datetime | Timestamp recorded |
| TC-WO-038 | Set fault report time | 1. Enter fault report datetime | Timestamp recorded |
| TC-WO-039 | Set maintenance start time | 1. Enter maintenance start datetime | Timestamp recorded |
| TC-WO-040 | Set maintenance end time | 1. Enter maintenance end datetime | Timestamp recorded |
| TC-WO-041 | Assign area leader | 1. Select area leader from picker | User assigned to role |
| TC-WO-042 | Assign supervisor | 1. Select supervisor | User assigned to role |
| TC-WO-043 | Assign performer | 1. Select performer | User assigned to role |
| TC-WO-044 | Assign engineer | 1. Select engineer | User assigned to role |
| TC-WO-045 | Enter root cause | 1. Enter root cause text | Text saved |
| TC-WO-046 | Enter maintenance description | 1. Enter maintenance description | Text saved |
| TC-WO-047 | Enter corrective action | 1. Enter corrective action | Text saved |
| TC-WO-048 | Upload photo attachment | 1. Upload photo file | Photo attached to work order |
| TC-WO-049 | Upload video attachment | 1. Upload video file | Video attached |
| TC-WO-050 | Upload document attachment | 1. Upload PDF/DOC | Document attached |
| TC-WO-051 | Multiple attachments | 1. Upload multiple files | All files attached |
| TC-WO-052 | Validation - missing title | 1. Leave title empty<br>2. Submit | Validation error for title |
| TC-WO-053 | Validation - missing asset | 1. Don't select asset<br>2. Submit | Validation error for asset |
| TC-WO-054 | Cancel create | 1. Fill form<br>2. Cancel | Return to list, no WO created |
| TC-WO-055 | Real-time validation | 1. Fill fields | Validation feedback as you type |

---

### 3. Work Order Detail View
**File:** `work-order-detail.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-WO-060 | View work order detail | 1. Navigate to /work-orders/:id | Full work order information displayed |
| TC-WO-061 | All basic info displayed | 1. View detail | Title, asset, description, priority, type shown |
| TC-WO-062 | All timestamps displayed | 1. View detail | All datetime fields shown |
| TC-WO-063 | All role assignments displayed | 1. View detail | Assigned users shown with roles |
| TC-WO-064 | Repair actions section | 1. View detail | Repair actions list visible |
| TC-WO-065 | Parts summary section | 1. View detail | Parts used summary shown |
| TC-WO-066 | Attachments displayed | 1. View detail with attachments | Attachment previews/links shown |
| TC-WO-067 | Download attachment | 1. Click attachment | File downloads |
| TC-WO-068 | Status timeline | 1. View detail | Status change history shown |
| TC-WO-069 | Edit button visible | 1. View detail | Edit button accessible |
| TC-WO-070 | Print functionality | 1. Click print button | Print-friendly view or PDF generated |
| TC-WO-071 | Navigate to machine | 1. Click machine link | Navigate to machine detail |

---

### 4. Edit Work Order
**File:** `work-order-edit.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-WO-080 | Open edit modal | 1. Click edit button | Edit modal/form opens |
| TC-WO-081 | Form pre-populated | 1. Open edit | Current values shown |
| TC-WO-082 | Update status OPEN → IN_PROGRESS | 1. Change status to IN_PROGRESS<br>2. Save | Status updated |
| TC-WO-083 | Update status IN_PROGRESS → WAITING | 1. Change to WAITING<br>2. Save | Status updated |
| TC-WO-084 | Update status WAITING → IN_PROGRESS | 1. Change back to IN_PROGRESS<br>2. Save | Status updated |
| TC-WO-085 | Update status to CLOSED | 1. Change to CLOSED<br>2. Save | Status CLOSED, downtime calculated |
| TC-WO-086 | Update assigned technician | 1. Select different technician<br>2. Save | Assignment updated, notification sent |
| TC-WO-087 | Update priority | 1. Change priority<br>2. Save | Priority updated |
| TC-WO-088 | Update timestamps | 1. Modify timestamps<br>2. Save | Timestamps updated |
| TC-WO-089 | Update descriptions | 1. Modify text fields<br>2. Save | Text updated |
| TC-WO-090 | Cancel edit | 1. Make changes<br>2. Cancel | Modal closes, no changes |

---

### 5. Repair Actions
**File:** `repair-actions.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-WO-100 | Add repair action button | 1. View work order detail | "Add Repair Action" button visible |
| TC-WO-101 | Open add repair action form | 1. Click add repair action | Form/modal opens |
| TC-WO-102 | Document repair steps | 1. Enter action description<br>2. Save | Repair action recorded |
| TC-WO-103 | Select parts used | 1. Open parts picker<br>2. Select parts | Parts associated with action |
| TC-WO-104 | Set part quantities | 1. Select parts<br>2. Enter quantities | Quantities recorded |
| TC-WO-105 | Upload photo evidence | 1. Upload photos | Photos attached to repair action |
| TC-WO-106 | Mark success/failure | 1. Set success/failure status | Outcome recorded |
| TC-WO-107 | Record root cause | 1. Enter root cause | Root cause saved |
| TC-WO-108 | Auto-populate performer | 1. Add repair action | Current user auto-assigned as performer |
| TC-WO-109 | Timestamp auto-recorded | 1. Add repair action | Created timestamp automatic |
| TC-WO-110 | View repair action details | 1. Click repair action | Full details displayed |
| TC-WO-111 | Multiple repair actions | 1. Add several repair actions | All actions listed |
| TC-WO-112 | Repair action validation | 1. Submit empty action | Validation error |

---

### 6. Parts Tracking
**File:** `work-order-parts.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-WO-120 | Parts summary on detail | 1. View WO with parts | Parts list with quantities shown |
| TC-WO-121 | Total parts cost | 1. View WO with parts | Cost calculation displayed |
| TC-WO-122 | Parts from multiple repair actions | 1. WO with multiple actions using parts | All parts aggregated |
| TC-WO-123 | Navigate to part detail | 1. Click part link | Navigate to /parts/:id |
| TC-WO-124 | Parts picker search | 1. In repair action<br>2. Search parts | Matching parts shown |
| TC-WO-125 | Add quantity for part | 1. Select part<br>2. Set quantity | Quantity saved |

---

### 7. Status Workflow
**File:** `work-order-status.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-WO-130 | New WO starts as OPEN | 1. Create work order | Status is OPEN |
| TC-WO-131 | Status flow: OPEN → IN_PROGRESS | 1. Update to IN_PROGRESS | Valid transition |
| TC-WO-132 | Status flow: IN_PROGRESS → WAITING | 1. Update to WAITING | Valid transition |
| TC-WO-133 | Status flow: WAITING → IN_PROGRESS | 1. Update back to IN_PROGRESS | Valid transition |
| TC-WO-134 | Status flow: IN_PROGRESS → CLOSED | 1. Update to CLOSED | Valid transition, closes WO |
| TC-WO-135 | Status flow: WAITING → CLOSED | 1. Update to CLOSED | Valid transition |
| TC-WO-136 | Status reason selection | 1. Change status | Reason selector appears if configured |
| TC-WO-137 | Reopen closed WO (if allowed) | 1. Reopen CLOSED WO | WO returns to IN_PROGRESS or not allowed |
| TC-WO-138 | Downtime calculation on close | 1. Close WO with timestamps | Downtime auto-calculated |
| TC-WO-139 | Maintenance duration calculation | 1. Close WO with timestamps | Duration calculated |

---

## Test Data Requirements

```typescript
// fixtures/work-orders.ts
export const workOrderTestData = {
  basicWorkOrder: {
    title: 'Pump Vibration Issue',
    assetCode: 'PUMP-001',
    description: 'Unusual vibration detected during operation',
    priority: 'HIGH',
    type: 'CORRECTIVE'
  },
  fullWorkOrder: {
    title: 'Complete Maintenance Record',
    assetCode: 'CNC-001',
    description: 'Full preventive maintenance',
    priority: 'MEDIUM',
    type: 'PREVENTIVE',
    disciplines: ['MECHANICAL', 'ELECTRICAL'],
    equipmentStopTime: '2024-01-15T08:00:00',
    faultReportTime: '2024-01-15T08:30:00',
    maintenanceStartTime: '2024-01-15T09:00:00',
    maintenanceEndTime: '2024-01-15T12:00:00',
    areaLeader: 'leader@test.com',
    supervisor: 'supervisor@test.com',
    performer: 'tech@test.com',
    rootCause: 'Bearing wear',
    maintenanceDescription: 'Replaced bearings',
    correctiveAction: 'Monitor for vibration'
  },
  repairAction: {
    description: 'Replaced main bearing',
    parts: [
      { partCode: 'BEARING-001', quantity: 2 }
    ],
    success: true,
    rootCause: 'Normal wear and tear'
  }
};
```

---

## Page Objects

```typescript
// pages/WorkOrderListPage.ts
class WorkOrderListPage {
  readonly searchInput: Locator;
  readonly statusFilter: Locator;
  readonly priorityFilter: Locator;
  readonly typeFilter: Locator;
  readonly createButton: Locator;
  readonly workOrderTable: Locator;

  async search(query: string): Promise<void>;
  async filterByStatus(status: string): Promise<void>;
  async filterByPriority(priority: string): Promise<void>;
  async clickWorkOrder(woId: string): Promise<void>;
  async getWorkOrderCount(): Promise<number>;
}

// pages/WorkOrderDetailPage.ts
class WorkOrderDetailPage {
  readonly title: Locator;
  readonly statusBadge: Locator;
  readonly priorityBadge: Locator;
  readonly editButton: Locator;
  readonly addRepairActionButton: Locator;
  readonly repairActionsList: Locator;
  readonly partsSummary: Locator;

  async clickEdit(): Promise<void>;
  async addRepairAction(): Promise<void>;
  async getStatus(): Promise<string>;
  async getRepairActionCount(): Promise<number>;
}

// pages/WorkOrderFormPage.ts
class WorkOrderFormPage {
  readonly titleInput: Locator;
  readonly assetPicker: Locator;
  readonly descriptionInput: Locator;
  readonly prioritySelect: Locator;
  readonly typeSelect: Locator;
  readonly submitButton: Locator;

  async fillBasicInfo(data: WorkOrderBasicInfo): Promise<void>;
  async selectAsset(assetCode: string): Promise<void>;
  async setTimestamps(timestamps: Timestamps): Promise<void>;
  async assignRoles(roles: RoleAssignments): Promise<void>;
  async uploadAttachment(filePath: string): Promise<void>;
  async submit(): Promise<void>;
}

// components/RepairActionForm.ts
class RepairActionForm {
  readonly descriptionInput: Locator;
  readonly partsPicker: Locator;
  readonly successToggle: Locator;
  readonly rootCauseInput: Locator;
  readonly photoUpload: Locator;
  readonly submitButton: Locator;

  async fillDescription(text: string): Promise<void>;
  async addPart(partCode: string, quantity: number): Promise<void>;
  async setOutcome(success: boolean): Promise<void>;
  async submit(): Promise<void>;
}
```
