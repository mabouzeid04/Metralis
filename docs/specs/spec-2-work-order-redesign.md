# Spec 2: Work Order Form Redesign

**Status**: Ready for Review
**Dependencies**: Spec 1 (Hierarchical Assets)
**Blocked By**: Spec 1
**Blocks**: Spec 5 (Analytics)

---

## 1. High-Level Summary

### What We're Building

Redesign the work order form to match Food Basket's paper form while maintaining extensibility for other factories. Key changes:

1. **Link to Asset (not Machine)** - Work orders reference the hierarchical asset model
2. **New timestamp fields** - Equipment stop time, fault report time, repair times
3. **Two-part maintenance classification** - Discipline (multi-select) + Type (single-select)
4. **Role tracking** - Track who performed each role (not signatures, just user assignment)
5. **Equipment status after repair** - Factory-configurable options
6. **Additional text fields** - Corrective action, notes/recommendations

### Why This Matters

1. **Paper-to-digital transition** - Technicians use the same mental model
2. **Better metrics** - Detailed timestamps enable MTTR, downtime analysis
3. **Accountability** - Know who did what at each stage

---

## 2. Technical Decisions Requiring Attention

### ⚠️ Decision 1: Timestamp Auto-Capture vs Manual Entry

**Chosen Approach**: Auto-capture with manual override

| Timestamp | Auto-Captured When | Manual Override |
|-----------|-------------------|-----------------|
| `reportedAt` | Work order created | No |
| `faultReportTime` | Work order created | Yes |
| `equipmentStopTime` | Never | Yes (manual only) |
| `repairStartTime` | Status → IN_PROGRESS | Yes |
| `maintenanceStartTime` | Never | Yes (manual only) |
| `maintenanceEndTime` | Status → CLOSED | Yes |
| `completedAt` | Status → CLOSED | No |

**Why manual override matters**:
- Technician might create work order 30 min after fault was reported
- Repair might start before status is updated in system
- Accurate timestamps = accurate metrics

**Implementation**:
- Store both `autoCapture` and `override` values? No - just store final value
- UI shows "Captured automatically. Edit if incorrect." hint

---

### ⚠️ Decision 2: Maintenance Discipline vs Type

**Paper Form Analysis**:
The Arabic form has TWO sections:
1. **نوع عملية الصيانة (Type of maintenance operation)** with checkboxes in two groups:
   - Left column: كهربى (Electrical), ميكانيكى (Mechanical), هيدرونيوماتيك (Hydro-pneumatic)
   - Right column: مخطط (Planned), تنبؤية (Predictive), علاجى (Corrective)

**Our Interpretation**:
- **Discipline** (left column) = WHAT type of work (can be multiple)
- **Type** (right column) = WHY the work is happening (only one)

**Chosen Approach**:
```typescript
maintenanceDisciplines: string[]  // Multi-select: ["electrical", "mechanical"]
maintenanceType: string           // Single-select: "corrective"
```

**Why this matters**:
- A single work order can involve both electrical AND mechanical work
- But it's either corrective OR preventive, not both

---

### ⚠️ Decision 3: Role Tracking - User Selection vs Current User

**The 7 roles from paper form**:
1. Area Leader (قائد المنطقة)
2. Maintenance Supervisor (مسؤول الصيانة)
3. Maintenance Performer (القائم بعملية الصيانة)
4. Machine Receiver (مستلم الماكينة)
5. Responsible Engineer (المهندس المسؤول)
6. Maintenance Engineer (مهندس الصيانة)
7. Maintenance Manager (مدير الصيانة)

**Question**: Should these be:
- A) Manually selected from user list
- B) Auto-filled based on logged-in user and their role
- C) Combination

**Chosen Approach**: Manual selection from user dropdown

**Why**:
- Not all factories have the same organizational structure
- The person creating the work order might not be the performer
- Multiple people may need to be assigned at different stages

**UI Implication**:
- Each role is a user-picker dropdown
- Can be left empty if not applicable
- Filter users by role if roles are defined in User model

---

### ⚠️ Decision 4: Equipment Status After Repair

**Paper Form**: "حالة المعدة" (Equipment Status) column in spare parts table

**Question**: Is this:
- A) Status of the ASSET after repair is complete
- B) Status of each PART used
- C) Something else

**Clarification Needed**: Based on form layout, appears to be (A) - the equipment's status after the work is done.

**Chosen Approach**: Single `equipmentStatusAfter` field on work order
- Uses factory-configurable options (same as asset status reasons)
- Examples: "Running", "Needs more parts", "Under observation"

---

### ⚠️ Decision 5: Many User Foreign Keys

**Problem**: WorkOrder will have 8+ user foreign keys:
- reportedById
- assignedToId
- areaLeaderId
- maintenanceSupervisorId
- performerId
- machineReceiverId
- responsibleEngineerId
- maintenanceEngineerId
- maintenanceManagerId

**Concern**: Prisma requires unique relation names for each.

**Solution**: Use explicit relation names
```prisma
reportedBy            User  @relation("ReportedWorkOrders", ...)
assignedTo            User? @relation("AssignedWorkOrders", ...)
areaLeader            User? @relation("AreaLeaderWorkOrders", ...)
// ... etc
```

**Note**: This will create many indexes. Consider if all are needed for queries.

---

### ⚠️ Decision 6: Calculated Duration Fields

**Fields**:
- `maintenanceDurationMin` = maintenanceEndTime - maintenanceStartTime
- `downtimeDurationMin` = maintenanceEndTime - equipmentStopTime

**Question**: Calculate on-the-fly or store?

**Chosen Approach**: Store calculated values

**Why**:
- Analytics queries are simpler: `AVG(maintenanceDurationMin)`
- No null-handling in every query
- Values are "locked in" when work order closes

**When to calculate**:
- On work order CLOSE (status → CLOSED)
- If timestamps are edited after close, recalculate

---

## 3. Database Schema Changes

### 3.1 Updated WorkOrder Model

```prisma
model WorkOrder {
  id                    String    @id @default(uuid())
  publicId              String    @unique  // Auto-generated 8-char hex

  // ===== ASSET REFERENCE (changed from machineId) =====
  assetId               String
  asset                 Asset     @relation(fields: [assetId], references: [id])

  // ===== BASIC INFO =====
  title                 String
  descriptionRaw        String    @db.Text  // Problem description (وصف الشكوى)

  // ===== STATUS & CLASSIFICATION =====
  status                WorkOrderStatus     @default(OPEN)
  priority              WorkOrderPriority   @default(MEDIUM)

  // ===== MAINTENANCE CLASSIFICATION =====
  // Discipline: multi-select (electrical, mechanical, hydropneumatic)
  maintenanceDisciplines String[]
  // Type: single-select (corrective, preventive, predictive)
  maintenanceType       String?

  // ===== TIMESTAMPS - OPERATOR SECTION =====
  reportedAt            DateTime  @default(now())
  reportedById          String
  reportedBy            User      @relation("ReportedWorkOrders", fields: [reportedById], references: [id])

  equipmentStopTime     DateTime?  // توقيت توقف المُعدة - manual entry
  faultReportTime       DateTime?  // توقيت إبلاغ العُطل - auto on create, editable
  repairStartTime       DateTime?  // توقيت بداية الإصلاح - auto on IN_PROGRESS, editable

  // ===== TIMESTAMPS - MAINTENANCE SECTION =====
  maintenanceStartTime  DateTime?  // وقت عملية الصيانة - manual entry
  maintenanceEndTime    DateTime?  // وقت انتهاء عملية الصيانة - auto on CLOSED, editable
  completedAt           DateTime?  // When work order was closed (system timestamp)

  // ===== CALCULATED DURATIONS (stored for analytics) =====
  maintenanceDurationMin Int?      // maintenanceEndTime - maintenanceStartTime
  downtimeDurationMin    Int?      // maintenanceEndTime - equipmentStopTime

  // ===== DIAGNOSTIC FIELDS =====
  symptoms              Json?      // Array of symptom strings
  suspectedCause        String?
  rootCause             String?    @db.Text    // السبب الجذري
  failureMode           String?

  // ===== WORK DESCRIPTION =====
  maintenanceDescription String?   @db.Text    // وصف عملية الصيانة
  correctiveAction       String?   @db.Text    // الإجراء التصحيحي
  notesAndRecommendations String?  @db.Text    // ملاحظات وتوصية

  // ===== EQUIPMENT STATUS AFTER REPAIR =====
  equipmentStatusAfter   String?   // Factory-configurable: "running", "needs_parts", etc.

  // ===== ROLE-BASED TRACKING =====
  areaLeaderId           String?
  areaLeader             User?     @relation("AreaLeaderWorkOrders", fields: [areaLeaderId], references: [id])

  maintenanceSupervisorId String?
  maintenanceSupervisor   User?    @relation("SupervisorWorkOrders", fields: [maintenanceSupervisorId], references: [id])

  performerId            String?
  performer              User?     @relation("PerformerWorkOrders", fields: [performerId], references: [id])

  machineReceiverId      String?
  machineReceiver        User?     @relation("ReceiverWorkOrders", fields: [machineReceiverId], references: [id])

  responsibleEngineerId  String?
  responsibleEngineer    User?     @relation("ResponsibleEngineerWorkOrders", fields: [responsibleEngineerId], references: [id])

  maintenanceEngineerId  String?
  maintenanceEngineer    User?     @relation("MaintenanceEngineerWorkOrders", fields: [maintenanceEngineerId], references: [id])

  maintenanceManagerId   String?
  maintenanceManager     User?     @relation("MaintenanceManagerWorkOrders", fields: [maintenanceManagerId], references: [id])

  // ===== ASSIGNMENT (existing) =====
  assignedToId           String?
  assignedTo             User?     @relation("AssignedWorkOrders", fields: [assignedToId], references: [id])

  // ===== METADATA =====
  metadata               Json?
  createdAt              DateTime  @default(now())
  updatedAt              DateTime  @updatedAt

  // ===== RELATIONS =====
  repairActions          RepairAction[]
  parts                  WorkOrderPart[]
  attachments            Document[]
  incidentChunks         IncidentChunk[]

  @@index([reportedAt])
  @@index([assetId])
  @@index([status])
  @@index([priority])
  @@index([maintenanceType])
  @@index([assignedToId])
}
```

### 3.2 Migration Notes

```sql
-- Rename machineId to assetId
ALTER TABLE "WorkOrder" RENAME COLUMN "machineId" TO "assetId";

-- Add new columns
ALTER TABLE "WorkOrder" ADD COLUMN "maintenanceDisciplines" TEXT[];
ALTER TABLE "WorkOrder" ADD COLUMN "maintenanceType" TEXT;
ALTER TABLE "WorkOrder" ADD COLUMN "equipmentStopTime" TIMESTAMP;
ALTER TABLE "WorkOrder" ADD COLUMN "faultReportTime" TIMESTAMP;
ALTER TABLE "WorkOrder" ADD COLUMN "repairStartTime" TIMESTAMP;
ALTER TABLE "WorkOrder" ADD COLUMN "maintenanceStartTime" TIMESTAMP;
ALTER TABLE "WorkOrder" ADD COLUMN "maintenanceEndTime" TIMESTAMP;
ALTER TABLE "WorkOrder" ADD COLUMN "maintenanceDurationMin" INTEGER;
ALTER TABLE "WorkOrder" ADD COLUMN "downtimeDurationMin" INTEGER;
ALTER TABLE "WorkOrder" ADD COLUMN "maintenanceDescription" TEXT;
ALTER TABLE "WorkOrder" ADD COLUMN "correctiveAction" TEXT;
ALTER TABLE "WorkOrder" ADD COLUMN "notesAndRecommendations" TEXT;
ALTER TABLE "WorkOrder" ADD COLUMN "equipmentStatusAfter" TEXT;
ALTER TABLE "WorkOrder" ADD COLUMN "areaLeaderId" UUID REFERENCES "User"(id);
ALTER TABLE "WorkOrder" ADD COLUMN "maintenanceSupervisorId" UUID REFERENCES "User"(id);
ALTER TABLE "WorkOrder" ADD COLUMN "performerId" UUID REFERENCES "User"(id);
ALTER TABLE "WorkOrder" ADD COLUMN "machineReceiverId" UUID REFERENCES "User"(id);
ALTER TABLE "WorkOrder" ADD COLUMN "responsibleEngineerId" UUID REFERENCES "User"(id);
ALTER TABLE "WorkOrder" ADD COLUMN "maintenanceEngineerId" UUID REFERENCES "User"(id);
ALTER TABLE "WorkOrder" ADD COLUMN "maintenanceManagerId" UUID REFERENCES "User"(id);

-- Existing type column becomes maintenanceType
-- UPDATE "WorkOrder" SET "maintenanceType" = lower("type"::text);
-- ALTER TABLE "WorkOrder" DROP COLUMN "type";
```

---

## 4. API Endpoint Changes

### 4.1 POST /work-orders (Create)

**Updated Request Body**:
```typescript
interface CreateWorkOrderBody {
  // Required
  assetId: string;                    // Changed from machineId
  title: string;
  descriptionRaw: string;

  // Optional - classification
  priority?: WorkOrderPriority;
  maintenanceDisciplines?: string[];  // NEW
  maintenanceType?: string;           // Changed from type enum

  // Optional - timestamps
  equipmentStopTime?: string;         // NEW - ISO datetime
  faultReportTime?: string;           // NEW - ISO datetime (defaults to now)

  // Optional - diagnostic
  symptoms?: string[];
  suspectedCause?: string;

  // Optional - role tracking (NEW)
  areaLeaderId?: string;
  maintenanceSupervisorId?: string;

  // Optional - assignment
  assignedToId?: string;
}
```

**Implementation Changes**:
```typescript
// In createWorkOrder handler
const workOrder = await prisma.workOrder.create({
  data: {
    ...body,
    publicId: generatePublicId(),
    faultReportTime: body.faultReportTime || new Date(),  // Default to now
    reportedById: currentUser.id,
  }
});

// Trigger incident ingestion (existing)
await ingestIncident(workOrder.id);
```

### 4.2 PATCH /work-orders/:id (Update)

**Updated Request Body**:
```typescript
interface UpdateWorkOrderBody {
  // Basic
  title?: string;
  descriptionRaw?: string;
  priority?: WorkOrderPriority;

  // Classification
  maintenanceDisciplines?: string[];
  maintenanceType?: string;

  // Timestamps (all editable)
  equipmentStopTime?: string | null;
  faultReportTime?: string | null;
  repairStartTime?: string | null;
  maintenanceStartTime?: string | null;
  maintenanceEndTime?: string | null;

  // Diagnostic
  symptoms?: string[];
  suspectedCause?: string;
  rootCause?: string;
  failureMode?: string;

  // Work description
  maintenanceDescription?: string;
  correctiveAction?: string;
  notesAndRecommendations?: string;

  // Equipment status
  equipmentStatusAfter?: string;

  // Role tracking
  areaLeaderId?: string | null;
  maintenanceSupervisorId?: string | null;
  performerId?: string | null;
  machineReceiverId?: string | null;
  responsibleEngineerId?: string | null;
  maintenanceEngineerId?: string | null;
  maintenanceManagerId?: string | null;

  // Assignment
  assignedToId?: string | null;
}
```

### 4.3 PATCH /work-orders/:id/status (Status Change)

**Existing endpoint** - add auto-timestamp behavior:

```typescript
async function updateWorkOrderStatus(id: string, newStatus: WorkOrderStatus) {
  const workOrder = await prisma.workOrder.findUnique({ where: { id } });
  const now = new Date();

  const updates: Partial<WorkOrder> = { status: newStatus };

  // Auto-capture timestamps based on status change
  if (newStatus === 'IN_PROGRESS' && !workOrder.repairStartTime) {
    updates.repairStartTime = now;
  }

  if (newStatus === 'CLOSED') {
    if (!workOrder.maintenanceEndTime) {
      updates.maintenanceEndTime = now;
    }
    updates.completedAt = now;

    // Calculate durations
    if (workOrder.maintenanceStartTime && updates.maintenanceEndTime) {
      updates.maintenanceDurationMin = Math.round(
        (updates.maintenanceEndTime.getTime() - workOrder.maintenanceStartTime.getTime()) / 60000
      );
    }
    if (workOrder.equipmentStopTime && updates.maintenanceEndTime) {
      updates.downtimeDurationMin = Math.round(
        (updates.maintenanceEndTime.getTime() - workOrder.equipmentStopTime.getTime()) / 60000
      );
    }
  }

  return prisma.workOrder.update({
    where: { id },
    data: updates
  });
}
```

### 4.4 GET /work-orders (List)

**Add new filter parameters**:
```typescript
interface GetWorkOrdersQuery {
  // Existing
  status?: WorkOrderStatus;
  priority?: WorkOrderPriority;
  assignedToId?: string;
  search?: string;
  from?: string;  // reportedAt >= from
  to?: string;    // reportedAt <= to

  // New filters
  assetId?: string;              // Filter by specific asset
  includeDescendants?: boolean;  // Include work orders for child assets
  maintenanceType?: string;      // Filter by type
  maintenanceDiscipline?: string; // Filter by discipline (any match)
  performerId?: string;          // Filter by performer
}
```

---

## 5. Frontend Components

### 5.1 Work Order Create Form

**Location**: `/src/pages/workOrders/CreateWorkOrder.tsx`

**Form Layout** (matching paper form structure):

```
┌─────────────────────────────────────────────────────────────────────┐
│                    خاص بالمشغل (OPERATOR SECTION)                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Asset: [Cascading Picker: Machine → Group → Component]  *required  │
│                                                                     │
│  ┌─────────────────────────┐  ┌─────────────────────────┐          │
│  │ Report #: [Auto-filled] │  │ Date: [Auto-filled]     │          │
│  └─────────────────────────┘  └─────────────────────────┘          │
│                                                                     │
│  ┌─────────────────────────┐  ┌─────────────────────────┐          │
│  │ Requester: [Current]    │  │ Day: [Auto-filled]      │          │
│  └─────────────────────────┘  └─────────────────────────┘          │
│                                                                     │
│  Problem Description: *required                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │                      [Textarea]                             │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────┐  ┌─────────────────────────┐          │
│  │ Area Leader: [Dropdown] │  │ Maint. Supervisor: [▼]  │          │
│  └─────────────────────────┘  └─────────────────────────┘          │
│                                                                     │
│  ┌─────────────────────────┐  ┌─────────────────────────┐          │
│  │ Equipment Stop Time:    │  │ Fault Report Time:      │          │
│  │ [DateTime Picker]       │  │ [DateTime Picker]       │          │
│  └─────────────────────────┘  └─────────────────────────┘          │
│                                                                     │
│  Priority: [Low ▼] [Medium ▼] [High ▼] [Critical ▼]                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                   خاص بالصيانة (MAINTENANCE SECTION)                 │
│                     (shown after creation / on edit)                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Maintenance Discipline: (select all that apply)                    │
│  [✓] Electrical  [✓] Mechanical  [ ] Hydro-pneumatic               │
│                                                                     │
│  Maintenance Type: (select one)                                     │
│  ( ) Planned  ( ) Predictive  (•) Corrective                       │
│                                                                     │
│  ┌─────────────────────────┐  ┌─────────────────────────┐          │
│  │ Maint. Start Time:      │  │ Maint. End Time:        │          │
│  │ [DateTime Picker]       │  │ [DateTime Picker]       │          │
│  └─────────────────────────┘  └─────────────────────────┘          │
│                                                                     │
│  ┌─────────────────────────┐  ┌─────────────────────────┐          │
│  │ Maint. Duration: [calc] │  │ Downtime: [calc]        │          │
│  └─────────────────────────┘  └─────────────────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      السبب الجذري (ROOT CAUSE)                       │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      [Textarea]                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                وصف عملية الصيانة (MAINTENANCE DESCRIPTION)           │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      [Textarea]                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                  الإجراء التصحيحي (CORRECTIVE ACTION)                │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      [Textarea]                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      SPARE PARTS & STATUS                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Equipment Status After Repair: [Running ▼]                         │
│                                                                     │
│  Parts Used:                                                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Part Name          │ Qty │ Unit Cost │ Total  │ Stock Bal.  │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ [Part Picker ▼]    │ [1] │ [auto]    │ [calc] │ [auto]      │  │
│  │ + Add Part                                                   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    ملاحظات وتوصية (NOTES & RECOMMENDATIONS)          │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      [Textarea]                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         ROLE ASSIGNMENTS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────┐  ┌───────────────────┐  ┌─────────────────┐ │
│  │ Performer:        │  │ Machine Receiver: │  │ Resp. Engineer: │ │
│  │ [User Dropdown ▼] │  │ [User Dropdown ▼] │  │ [User Dropdown] │ │
│  └───────────────────┘  └───────────────────┘  └─────────────────┘ │
│                                                                     │
│  ┌───────────────────┐  ┌───────────────────┐                      │
│  │ Maint. Engineer:  │  │ Maint. Manager:   │                      │
│  │ [User Dropdown ▼] │  │ [User Dropdown ▼] │                      │
│  └───────────────────┘  └───────────────────┘                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

                    [Cancel]  [Save Draft]  [Submit]
```

### 5.2 Component Structure

```
CreateWorkOrder
├── WorkOrderForm
│   ├── OperatorSection
│   │   ├── AssetPicker (cascading dropdowns)
│   │   ├── AutoFilledFields (report #, date, requester)
│   │   ├── ProblemDescriptionField
│   │   ├── RolePickerRow (area leader, supervisor)
│   │   ├── TimestampRow (equipment stop, fault report)
│   │   └── PrioritySelector
│   ├── MaintenanceSection
│   │   ├── DisciplineMultiSelect (checkboxes)
│   │   ├── TypeSingleSelect (radio buttons)
│   │   ├── TimestampRow (start, end)
│   │   └── DurationDisplay (calculated, read-only)
│   ├── DiagnosticSection
│   │   ├── RootCauseField
│   │   ├── MaintenanceDescriptionField
│   │   └── CorrectiveActionField
│   ├── PartsSection
│   │   ├── EquipmentStatusDropdown
│   │   └── PartsTable
│   ├── NotesSection
│   │   └── NotesTextarea
│   └── RoleAssignmentSection
│       └── UserPickerGrid (5 role pickers)
└── FormActions (cancel, save, submit)
```

### 5.3 Discipline Multi-Select Component

```typescript
// components/MaintenanceDisciplineSelect.tsx

interface Props {
  value: string[];
  onChange: (disciplines: string[]) => void;
  options: MaintenanceOption[];  // From factory config
}

function MaintenanceDisciplineSelect({ value, onChange, options }: Props) {
  const { i18n } = useTranslation();

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(v => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="flex gap-4">
      {options.map(option => (
        <label key={option.id} className="flex items-center gap-2">
          <Checkbox
            checked={value.includes(option.id)}
            onCheckedChange={() => toggle(option.id)}
          />
          <span>{i18n.language === 'ar' ? option.nameAr : option.nameEn}</span>
        </label>
      ))}
    </div>
  );
}
```

### 5.4 Print Stylesheet

**Location**: `/src/styles/workOrderPrint.css`

```css
@media print {
  /* Hide navigation, sidebar, action buttons */
  nav, .sidebar, .form-actions, .no-print {
    display: none !important;
  }

  /* Reset page margins */
  @page {
    margin: 1cm;
  }

  /* Form sections */
  .work-order-print {
    font-family: 'Arial', sans-serif;
    font-size: 11pt;
  }

  .section-header {
    background: #f0f0f0;
    padding: 8px;
    font-weight: bold;
    border: 1px solid #000;
    margin-top: 16px;
  }

  .field-row {
    display: flex;
    border: 1px solid #000;
    border-top: none;
  }

  .field-label {
    width: 150px;
    padding: 6px;
    border-right: 1px solid #000;
    background: #fafafa;
  }

  .field-value {
    flex: 1;
    padding: 6px;
  }

  /* Parts table */
  .parts-table {
    width: 100%;
    border-collapse: collapse;
  }

  .parts-table th, .parts-table td {
    border: 1px solid #000;
    padding: 6px;
    text-align: center;
  }

  /* Signature boxes */
  .signature-row {
    display: flex;
    margin-top: 24px;
  }

  .signature-box {
    flex: 1;
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
    min-height: 60px;
  }

  .signature-label {
    font-size: 10pt;
    color: #666;
  }

  .signature-name {
    margin-top: 30px;
    border-top: 1px solid #000;
    padding-top: 4px;
  }
}
```

---

## 6. Validation

### 6.1 Create Work Order Schema

```typescript
const createWorkOrderSchema = z.object({
  assetId: z.string().uuid("Invalid asset ID"),
  title: z.string().min(1, "Title is required").max(200),
  descriptionRaw: z.string().min(1, "Description is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  maintenanceDisciplines: z.array(z.string()).optional(),
  maintenanceType: z.string().optional(),
  equipmentStopTime: z.string().datetime().optional().nullable(),
  faultReportTime: z.string().datetime().optional().nullable(),
  symptoms: z.array(z.string()).optional(),
  suspectedCause: z.string().optional(),
  areaLeaderId: z.string().uuid().optional().nullable(),
  maintenanceSupervisorId: z.string().uuid().optional().nullable(),
  assignedToId: z.string().uuid().optional().nullable(),
});
```

### 6.2 Update Work Order Schema

```typescript
const updateWorkOrderSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  descriptionRaw: z.string().min(1).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  maintenanceDisciplines: z.array(z.string()).optional(),
  maintenanceType: z.string().optional().nullable(),

  // Timestamps
  equipmentStopTime: z.string().datetime().optional().nullable(),
  faultReportTime: z.string().datetime().optional().nullable(),
  repairStartTime: z.string().datetime().optional().nullable(),
  maintenanceStartTime: z.string().datetime().optional().nullable(),
  maintenanceEndTime: z.string().datetime().optional().nullable(),

  // Diagnostic
  symptoms: z.array(z.string()).optional(),
  suspectedCause: z.string().optional().nullable(),
  rootCause: z.string().optional().nullable(),
  failureMode: z.string().optional().nullable(),

  // Description
  maintenanceDescription: z.string().optional().nullable(),
  correctiveAction: z.string().optional().nullable(),
  notesAndRecommendations: z.string().optional().nullable(),

  // Status
  equipmentStatusAfter: z.string().optional().nullable(),

  // Roles (all nullable to allow clearing)
  areaLeaderId: z.string().uuid().optional().nullable(),
  maintenanceSupervisorId: z.string().uuid().optional().nullable(),
  performerId: z.string().uuid().optional().nullable(),
  machineReceiverId: z.string().uuid().optional().nullable(),
  responsibleEngineerId: z.string().uuid().optional().nullable(),
  maintenanceEngineerId: z.string().uuid().optional().nullable(),
  maintenanceManagerId: z.string().uuid().optional().nullable(),
  assignedToId: z.string().uuid().optional().nullable(),
});
```

### 6.3 Backend Validation

```typescript
// Validate maintenanceDisciplines against factory config
async function validateDisciplines(disciplines: string[], prisma: PrismaClient) {
  const config = await prisma.factoryConfig.findFirst();
  const validIds = config.maintenanceDisciplines.map((d: any) => d.id);

  for (const d of disciplines) {
    if (!validIds.includes(d)) {
      throw new BadRequestError(`Invalid maintenance discipline: ${d}`);
    }
  }
}

// Validate maintenanceType against factory config
async function validateMaintenanceType(type: string, prisma: PrismaClient) {
  const config = await prisma.factoryConfig.findFirst();
  const validIds = config.maintenanceTypes.map((t: any) => t.id);

  if (!validIds.includes(type)) {
    throw new BadRequestError(`Invalid maintenance type: ${type}`);
  }
}

// Validate equipmentStatusAfter against factory config
async function validateEquipmentStatus(status: string, prisma: PrismaClient) {
  const config = await prisma.factoryConfig.findFirst();
  const allReasons = [
    ...config.statusReasonOptions.RUNNING,
    ...config.statusReasonOptions.DOWN
  ];
  const validIds = allReasons.map((r: any) => r.id);

  if (!validIds.includes(status)) {
    throw new BadRequestError(`Invalid equipment status: ${status}`);
  }
}
```

---

## 7. Localization Updates

### 7.1 New Keys for workOrders.json

```json
{
  "form": {
    "sections": {
      "operator": "Operator Section",
      "maintenance": "Maintenance Section",
      "rootCause": "Root Cause",
      "maintenanceDescription": "Maintenance Description",
      "correctiveAction": "Corrective Action",
      "partsAndStatus": "Parts & Equipment Status",
      "notes": "Notes & Recommendations",
      "roles": "Role Assignments"
    },
    "fields": {
      "asset": "Asset",
      "assetPlaceholder": "Select machine, group, or component",
      "reportNumber": "Report Number",
      "requester": "Requester",
      "problemDescription": "Problem Description",
      "areaLeader": "Area Leader",
      "maintenanceSupervisor": "Maintenance Supervisor",
      "equipmentStopTime": "Equipment Stop Time",
      "faultReportTime": "Fault Report Time",
      "repairStartTime": "Repair Start Time",
      "maintenanceStartTime": "Maintenance Start Time",
      "maintenanceEndTime": "Maintenance End Time",
      "maintenanceDuration": "Maintenance Duration",
      "downtimeDuration": "Downtime Duration",
      "maintenanceDiscipline": "Maintenance Discipline",
      "maintenanceType": "Maintenance Type",
      "rootCause": "Root Cause",
      "maintenanceDescription": "Maintenance Work Description",
      "correctiveAction": "Corrective Action Taken",
      "equipmentStatusAfter": "Equipment Status After Repair",
      "notesAndRecommendations": "Notes & Recommendations",
      "performer": "Maintenance Performer",
      "machineReceiver": "Machine Receiver",
      "responsibleEngineer": "Responsible Engineer",
      "maintenanceEngineer": "Maintenance Engineer",
      "maintenanceManager": "Maintenance Manager"
    },
    "hints": {
      "autoTimestamp": "Captured automatically. Edit if needed.",
      "selectMultiple": "Select all that apply",
      "selectOne": "Select one"
    }
  }
}
```

---

## 8. Testing Checklist

### Unit Tests
- [ ] Duration calculation with various timestamp combinations
- [ ] Validation of disciplines against factory config
- [ ] Validation of maintenance type against factory config
- [ ] Auto-timestamp on status change

### Integration Tests
- [ ] Create work order with new fields
- [ ] Update work order timestamps
- [ ] Status change triggers auto-timestamp
- [ ] Close work order calculates durations
- [ ] Filter by maintenanceType
- [ ] Filter by discipline
- [ ] Filter by asset (with/without descendants)

### E2E Tests
- [ ] Full create flow with all fields
- [ ] Edit existing work order
- [ ] Print work order matches layout
- [ ] Asset picker shows correct hierarchy
- [ ] Role pickers show user list

---

## 9. Implementation Order

1. **Database migration** - Add new columns, rename machineId to assetId
2. **Update Prisma schema** - Add all new fields and relations
3. **Backend validation** - Add validation functions
4. **Update API routes** - Modify create/update/list endpoints
5. **Frontend form** - Build new form layout
6. **Component extraction** - DisciplineSelect, TypeSelect, etc.
7. **Print stylesheet** - Add print CSS
8. **Localization** - Add translation keys
9. **Testing** - Unit, integration, E2E

---

*End of Spec 2*
