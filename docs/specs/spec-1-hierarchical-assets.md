# Spec 1: Hierarchical Assets

**Status**: Ready for Review
**Dependencies**: None (foundation spec)
**Blocked By**: Nothing
**Blocks**: Specs 2, 3, 4, 5

---

## 1. High-Level Summary

### What We're Building

Replace the flat `Machine` model with a hierarchical `Asset` model that supports:
- Parent-child relationships (Machine → Group → Component)
- Bilingual names (English + Arabic)
- Simple status model (RUNNING/DOWN + configurable reason)
- Factory-specific configuration (hierarchy levels, status reasons)

### Why This Matters

1. **Technicians can report issues at the exact level** - "Vacuum Pump D1G03" not just "Freeze Dryer"
2. **AI gets precise context** - knows the component's full path and parent systems
3. **Extensibility** - other factories can have different hierarchy depths and names

---

## 2. Technical Decisions Requiring Attention

### ⚠️ Decision 1: Replacing Machine Model vs Extending It

**Chosen Approach**: Replace `Machine` with `Asset`

**Why**:
- Clean slate confirmed - no migration needed
- `Machine` model is too flat to extend cleanly
- Work orders, documents, AI chat all need to reference the new hierarchical structure

**Implication**:
- All existing code referencing `Machine` must be updated
- Database migration will drop `Machine` table and create `Asset` table

**Alternative Considered**: Add hierarchy on top of existing Machine
- Would create complexity with two models doing similar things
- Rejected because clean slate makes replacement simpler

---

### ⚠️ Decision 2: Path String Storage (Denormalization)

**Chosen Approach**: Store full path as denormalized string fields

```prisma
model Asset {
  pathStringEn  String  // "Freeze Dryer / Vacuum System / Booster Pump D1G02"
  pathStringAr  String  // "خط التجفيد / خط الفاكيوم / طلمبة بوستر"
}
```

**Why**:
- AI prompts need the full path as context - computing on every request is expensive
- Search/display needs path strings frequently
- Path changes are rare (hierarchy restructuring is uncommon)

**Implication**:
- When an asset's name changes, must update `pathString` for ALL descendants
- When an asset moves to different parent, must update `pathString` for itself and ALL descendants
- Need a utility function that propagates path updates

**Alternative Considered**: Compute path on-the-fly via recursive query
- More normalized, no update propagation needed
- But slower for frequent reads (AI, search, display)
- Rejected due to performance concerns

---

### ⚠️ Decision 3: Depth Field vs Computing from Parent Chain

**Chosen Approach**: Store `depth` as integer field

```prisma
model Asset {
  depth  Int  @default(0)  // 0 = machine, 1 = group, 2 = component
}
```

**Why**:
- Quick filtering: "get all components" = `WHERE depth = 2`
- Validate hierarchy: ensure assets at depth N only have children at depth N+1
- Display: indent tree based on depth

**Implication**:
- When asset moves to different parent, must update depth for itself and all descendants
- Depth must be recalculated: `parent.depth + 1`

---

### ⚠️ Decision 4: Factory Config as Singleton vs Per-Tenant

**Chosen Approach**: Single `FactoryConfig` record for now

**Why**:
- Current deployment is single-tenant (one factory per deployment)
- Multi-tenancy decision deferred

**Implication**:
- All config queries assume single record: `prisma.factoryConfig.findFirst()`
- When multi-tenancy is added, will need to add `tenantId` foreign key

**Future-Proofing**:
- Design APIs to accept `factoryConfigId` parameter even if we ignore it now
- Makes migration to multi-tenant easier

---

### ⚠️ Decision 5: Arabic Name Optional vs Required

**Current Setting**: Arabic name is **optional** (per your edit to the requirements doc)

**Risk**:
- Assets without Arabic names will show blank or English fallback to Arabic users
- Breaks the Arabic UX for those assets

**Mitigation Options**:
1. Show English name as fallback if Arabic is empty
2. Admin UI warns when Arabic name is missing
3. Report showing "assets missing Arabic names"

**Recommendation**: Implement option 1 (fallback) + option 2 (warning in admin UI)

---

## 3. Database Schema

### 3.1 Asset Model

```prisma
model Asset {
  id              String    @id @default(uuid())

  // Hierarchy
  parentId        String?
  parent          Asset?    @relation("AssetHierarchy", fields: [parentId], references: [id], onDelete: Cascade)
  children        Asset[]   @relation("AssetHierarchy")
  depth           Int       @default(0)

  // Bilingual Identity
  nameEn          String                    // Required - used for AI/search
  nameAr          String?                   // Optional - displayed to Arabic users
  code            String?                   // Technical code like "D1G02"

  // Classification
  levelType       String                    // "machine", "group", "component" (from factory config)

  // Denormalized Paths (for AI context and display)
  pathStringEn    String    @db.Text        // "Freeze Dryer / Vacuum System / Booster Pump"
  pathStringAr    String?   @db.Text        // Arabic equivalent (nullable if nameAr missing)

  // Status
  status          AssetStatus?              // RUNNING or DOWN
  statusReason    String?                   // Factory-configurable reason

  // Classification
  criticality     AssetCriticality?

  // Flexible attributes (manufacturer, model, serial, specs)
  attributes      Json?

  // Lifecycle
  commissionedAt  DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations (to be used by other specs)
  workOrders      WorkOrder[]
  documents       DocumentAsset[]
  conversations   ChatConversation[]

  @@index([parentId])
  @@index([depth])
  @@index([levelType])
  @@index([status])
  @@index([nameEn])
  @@index([nameAr])
  @@unique([parentId, nameEn])              // No duplicate English names under same parent
}

enum AssetStatus {
  RUNNING
  DOWN
}

enum AssetCriticality {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

### 3.2 Factory Config Model

```prisma
model FactoryConfig {
  id                    String    @id @default(uuid())

  // Hierarchy Level Definitions
  // [{ depth: 0, keyEn: "machine", nameEn: "Machine", nameAr: "الماكينة" }, ...]
  hierarchyLevels       Json

  // Default max depth for new machines
  defaultMaxDepth       Int       @default(3)

  // Status reason options grouped by core status
  // { "RUNNING": [...], "DOWN": [...] }
  statusReasonOptions   Json

  // Maintenance disciplines (multi-select options)
  // [{ id: "electrical", nameEn: "Electrical", nameAr: "كهربى" }, ...]
  maintenanceDisciplines Json

  // Maintenance types (single-select options)
  // [{ id: "corrective", nameEn: "Corrective", nameAr: "علاجى" }, ...]
  maintenanceTypes      Json

  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
}
```

### 3.3 Migration Notes

```sql
-- Drop existing Machine table (clean slate confirmed)
DROP TABLE IF EXISTS "Machine" CASCADE;

-- Create Asset table
CREATE TABLE "Asset" (
  -- ... as per schema above
);

-- Create FactoryConfig table
CREATE TABLE "FactoryConfig" (
  -- ... as per schema above
);

-- Seed initial FactoryConfig for Food Basket
INSERT INTO "FactoryConfig" (id, hierarchyLevels, statusReasonOptions, ...) VALUES (...);
```

---

## 4. API Endpoints

### 4.1 Asset CRUD

#### GET /assets
List all assets with optional filtering.

```typescript
// Query params
interface GetAssetsQuery {
  parentId?: string;      // Filter by parent (null = root assets only)
  depth?: number;         // Filter by depth level
  status?: AssetStatus;   // Filter by RUNNING/DOWN
  statusReason?: string;  // Filter by specific reason
  levelType?: string;     // Filter by "machine", "group", "component"
  search?: string;        // Search in nameEn, nameAr, code
}

// Response
interface GetAssetsResponse {
  assets: Asset[];
  total: number;
}
```

#### GET /assets/tree
Get full asset tree (for admin UI).

```typescript
// Response - nested structure
interface AssetTreeNode {
  id: string;
  nameEn: string;
  nameAr: string | null;
  code: string | null;
  levelType: string;
  status: AssetStatus | null;
  statusReason: string | null;
  depth: number;
  children: AssetTreeNode[];
}

type GetAssetsTreeResponse = AssetTreeNode[];
```

#### GET /assets/:id
Get single asset with full details.

```typescript
interface GetAssetResponse {
  asset: Asset & {
    parent: Asset | null;
    children: Asset[];
    // Include recent work orders count
    workOrdersCount: number;
    openWorkOrdersCount: number;
  };
}
```

#### GET /assets/:id/ancestors
Get all ancestors of an asset (for breadcrumb display).

```typescript
interface GetAssetAncestorsResponse {
  ancestors: Array<{
    id: string;
    nameEn: string;
    nameAr: string | null;
    depth: number;
  }>;
}
```

#### GET /assets/:id/descendants
Get all descendants (for bulk operations, document inheritance).

```typescript
interface GetAssetDescendantsResponse {
  descendants: Asset[];
}
```

#### POST /assets (Admin only)
Create new asset.

```typescript
interface CreateAssetBody {
  parentId: string | null;    // null = root asset (machine)
  nameEn: string;             // Required
  nameAr?: string;            // Optional
  code?: string;
  levelType: string;          // Must match factory config
  status?: AssetStatus;
  statusReason?: string;
  criticality?: AssetCriticality;
  attributes?: Record<string, any>;
  commissionedAt?: string;    // ISO date
}

// Response
interface CreateAssetResponse {
  asset: Asset;
}
```

**Implementation Notes**:
- Validate `levelType` against factory config
- Validate `statusReason` belongs to the chosen `status` in factory config
- Compute `depth` from parent
- Compute `pathStringEn` and `pathStringAr` from parent path + own name

#### PATCH /assets/:id (Admin only)
Update asset.

```typescript
interface UpdateAssetBody {
  nameEn?: string;
  nameAr?: string;
  code?: string;
  status?: AssetStatus;
  statusReason?: string;
  criticality?: AssetCriticality;
  attributes?: Record<string, any>;
  commissionedAt?: string;
}
```

**Implementation Notes**:
- If `nameEn` or `nameAr` changes, must update `pathStringEn`/`pathStringAr` for this asset AND all descendants
- If `status` changes, validate `statusReason` matches new status

#### PATCH /assets/:id/move (Admin only)
Move asset to different parent.

```typescript
interface MoveAssetBody {
  newParentId: string | null;  // null = move to root
}
```

**Implementation Notes**:
- Validate not creating circular reference
- Update `depth` for this asset and all descendants
- Update `pathStringEn`/`pathStringAr` for this asset and all descendants

#### DELETE /assets/:id (Admin only)
Delete asset and all descendants (cascade).

**Implementation Notes**:
- Prisma `onDelete: Cascade` handles child deletion
- Check for linked work orders - decide policy:
  - Option A: Prevent deletion if work orders exist
  - Option B: Set work order's assetId to null (orphan)
  - **Recommended**: Option A (prevent deletion, require reassignment first)

---

### 4.2 Factory Config

#### GET /factory-config
Get current factory configuration.

```typescript
interface GetFactoryConfigResponse {
  config: FactoryConfig;
}
```

#### PATCH /factory-config (Admin only)
Update factory configuration.

```typescript
interface UpdateFactoryConfigBody {
  hierarchyLevels?: HierarchyLevel[];
  defaultMaxDepth?: number;
  statusReasonOptions?: StatusReasonOptions;
  maintenanceDisciplines?: MaintenanceOption[];
  maintenanceTypes?: MaintenanceOption[];
}
```

---

## 5. Frontend Components

### 5.1 Asset Tree View (Admin)

**Location**: `/src/pages/assets/AssetsList.tsx`

**Features**:
- Tree structure with expand/collapse
- Show status badge (green/red) with reason tooltip
- Search filters by name (En/Ar) and code
- Filter by status, level type
- Click row to view details
- "Add Asset" button (creates at root or under selected)

**Component Structure**:
```
AssetsList
├── AssetFilters (search, status dropdown, level type dropdown)
├── AssetTree
│   └── AssetTreeNode (recursive)
│       ├── ExpandCollapseButton
│       ├── AssetNameDisplay (shows En or Ar based on language)
│       ├── StatusBadge
│       └── ActionMenu (edit, add child, delete)
└── AddAssetButton
```

### 5.2 Asset Create/Edit Form

**Location**: `/src/pages/assets/CreateAsset.tsx`, `/src/pages/assets/EditAsset.tsx`

**Form Fields**:
```
┌─────────────────────────────────────────────────────────────┐
│ Parent: [Cascading Dropdown: Machine → Group → ...]         │
├─────────────────────────────────────────────────────────────┤
│ Level Type: [Dropdown from factory config]                  │
├─────────────────────────────────────────────────────────────┤
│ English Name: [________________] *required                  │
│ Arabic Name:  [________________]                            │
│ Code:         [________________]                            │
├─────────────────────────────────────────────────────────────┤
│ Status: [RUNNING ▼]  Reason: [Operational ▼]               │
├─────────────────────────────────────────────────────────────┤
│ Criticality: [Medium ▼]                                     │
├─────────────────────────────────────────────────────────────┤
│ Commissioned Date: [Date Picker]                            │
├─────────────────────────────────────────────────────────────┤
│ Additional Attributes (JSON Editor or key-value pairs)      │
└─────────────────────────────────────────────────────────────┘
```

**Validation (Zod)**:
```typescript
const createAssetSchema = z.object({
  parentId: z.string().uuid().nullable(),
  levelType: z.string().min(1),
  nameEn: z.string().min(1, "English name is required"),
  nameAr: z.string().optional(),
  code: z.string().optional(),
  status: z.enum(["RUNNING", "DOWN"]).optional(),
  statusReason: z.string().optional(),
  criticality: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  commissionedAt: z.string().datetime().optional(),
  attributes: z.record(z.any()).optional(),
});
```

### 5.3 Cascading Asset Picker (Reusable)

**Location**: `/src/components/AssetPicker.tsx`

Used in: Work Order creation, Document association, AI chat machine selector

**Props**:
```typescript
interface AssetPickerProps {
  value: string | null;              // Selected asset ID
  onChange: (assetId: string | null) => void;
  maxDepth?: number;                 // Stop at this depth (optional)
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}
```

**Behavior**:
1. First dropdown shows all root assets (machines)
2. Selecting a machine shows second dropdown with its children (groups)
3. Selecting a group shows third dropdown with its children (components)
4. User can stop at any level (machine-only, machine+group, full path)
5. Display names based on user's language preference

### 5.4 Asset Detail Page

**Location**: `/src/pages/assets/AssetDetail.tsx`

**Sections**:
1. **Header**: Name, status badge, breadcrumb path
2. **Quick Actions**: Edit, Add Child, Create Work Order, Start AI Chat
3. **Details Card**: Code, criticality, commissioned date, attributes
4. **Children List**: If has children, show expandable list
5. **Recent Work Orders**: Last 10 work orders for this asset
6. **Documents**: Documents linked to this asset

---

## 6. Utility Functions

### 6.1 Path Computation

```typescript
// backend/src/utils/assetPath.ts

export async function computeAssetPath(
  assetId: string,
  prisma: PrismaClient
): Promise<{ pathEn: string; pathAr: string | null }> {
  const ancestors = await getAncestors(assetId, prisma);
  const asset = await prisma.asset.findUnique({ where: { id: assetId } });

  const allNodes = [...ancestors, asset];

  const pathEn = allNodes.map(a => a.nameEn).join(' / ');
  const pathAr = allNodes.every(a => a.nameAr)
    ? allNodes.map(a => a.nameAr).join(' / ')
    : null;

  return { pathEn, pathAr };
}

export async function updateDescendantPaths(
  assetId: string,
  prisma: PrismaClient
): Promise<void> {
  const descendants = await getDescendants(assetId, prisma);

  for (const descendant of descendants) {
    const { pathEn, pathAr } = await computeAssetPath(descendant.id, prisma);
    await prisma.asset.update({
      where: { id: descendant.id },
      data: { pathStringEn: pathEn, pathStringAr: pathAr }
    });
  }
}
```

### 6.2 Ancestor/Descendant Queries

```typescript
// backend/src/utils/assetHierarchy.ts

export async function getAncestors(
  assetId: string,
  prisma: PrismaClient
): Promise<Asset[]> {
  const ancestors: Asset[] = [];
  let currentId: string | null = assetId;

  while (currentId) {
    const asset = await prisma.asset.findUnique({
      where: { id: currentId },
      select: { id: true, parentId: true, nameEn: true, nameAr: true, depth: true }
    });

    if (!asset || !asset.parentId) break;

    const parent = await prisma.asset.findUnique({
      where: { id: asset.parentId }
    });

    if (parent) {
      ancestors.unshift(parent);
      currentId = parent.parentId;
    } else {
      break;
    }
  }

  return ancestors;
}

export async function getDescendants(
  assetId: string,
  prisma: PrismaClient
): Promise<Asset[]> {
  const descendants: Asset[] = [];
  const queue = [assetId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const children = await prisma.asset.findMany({
      where: { parentId: currentId }
    });

    for (const child of children) {
      descendants.push(child);
      queue.push(child.id);
    }
  }

  return descendants;
}
```

---

## 7. Data Seeding

### 7.1 Factory Config Seed

```typescript
// prisma/seed.ts

const factoryConfig = await prisma.factoryConfig.create({
  data: {
    hierarchyLevels: [
      { depth: 0, keyEn: "machine", nameEn: "Machine", nameAr: "الماكينة" },
      { depth: 1, keyEn: "group", nameEn: "Group", nameAr: "المجموعة" },
      { depth: 2, keyEn: "component", nameEn: "Component", nameAr: "المكون" }
    ],
    defaultMaxDepth: 3,
    statusReasonOptions: {
      RUNNING: [
        { id: "operational", nameEn: "Operational", nameAr: "يعمل" },
        { id: "under_observation", nameEn: "Under Observation", nameAr: "تحت المراقبة" },
        { id: "standby", nameEn: "Standby", nameAr: "في وضع الاستعداد" }
      ],
      DOWN: [
        { id: "breakdown", nameEn: "Breakdown", nameAr: "عطل" },
        { id: "waiting_parts", nameEn: "Waiting for Parts", nameAr: "في انتظار قطع الغيار" },
        { id: "scheduled_maintenance", nameEn: "Scheduled Maintenance", nameAr: "صيانة مجدولة" },
        { id: "under_repair", nameEn: "Under Repair", nameAr: "تحت الإصلاح" }
      ]
    },
    maintenanceDisciplines: [
      { id: "electrical", nameEn: "Electrical", nameAr: "كهربى" },
      { id: "mechanical", nameEn: "Mechanical", nameAr: "ميكانيكى" },
      { id: "hydropneumatic", nameEn: "Hydro-pneumatic", nameAr: "هيدرونيوماتيك" }
    ],
    maintenanceTypes: [
      { id: "corrective", nameEn: "Corrective", nameAr: "علاجى" },
      { id: "preventive", nameEn: "Preventive", nameAr: "وقائى" },
      { id: "predictive", nameEn: "Predictive", nameAr: "تنبؤية" }
    ]
  }
});
```

### 7.2 Food Basket Asset Seed

```typescript
// Create hierarchical assets from FB/Machines.xlsx data
// This would be a separate seed script or CSV import

const freezeDryer = await prisma.asset.create({
  data: {
    nameEn: "Freeze Dryer",
    nameAr: "خط التجفيد",
    levelType: "machine",
    depth: 0,
    pathStringEn: "Freeze Dryer",
    pathStringAr: "خط التجفيد",
    status: "RUNNING",
    statusReason: "operational"
  }
});

const vacuumSystem = await prisma.asset.create({
  data: {
    parentId: freezeDryer.id,
    nameEn: "Vacuum System",
    nameAr: "خط الفاكيوم",
    levelType: "group",
    depth: 1,
    pathStringEn: "Freeze Dryer / Vacuum System",
    pathStringAr: "خط التجفيد / خط الفاكيوم",
    status: "RUNNING",
    statusReason: "operational"
  }
});

const boosterPump = await prisma.asset.create({
  data: {
    parentId: vacuumSystem.id,
    nameEn: "Booster pump D1G02",
    nameAr: "طلمبة بوستر",
    code: "D1G02",
    levelType: "component",
    depth: 2,
    pathStringEn: "Freeze Dryer / Vacuum System / Booster pump D1G02",
    pathStringAr: "خط التجفيد / خط الفاكيوم / طلمبة بوستر",
    status: "RUNNING",
    statusReason: "operational"
  }
});

// ... continue for all components from FB/Machines.xlsx
```

---

## 8. Localization

### 8.1 New Translation Keys

**File**: `public/locales/en/assets.json`
```json
{
  "title": "Assets",
  "createTitle": "Add Asset",
  "editTitle": "Edit Asset",
  "tree": {
    "noAssets": "No assets found",
    "addRoot": "Add Machine",
    "addChild": "Add Child"
  },
  "form": {
    "parent": "Parent Asset",
    "parentPlaceholder": "Select parent (leave empty for root)",
    "levelType": "Asset Type",
    "nameEn": "Name (English)",
    "nameAr": "Name (Arabic)",
    "code": "Code",
    "status": "Status",
    "statusReason": "Status Reason",
    "criticality": "Criticality",
    "commissionedAt": "Commissioned Date",
    "attributes": "Additional Attributes"
  },
  "status": {
    "RUNNING": "Running",
    "DOWN": "Down"
  },
  "criticality": {
    "LOW": "Low",
    "MEDIUM": "Medium",
    "HIGH": "High",
    "CRITICAL": "Critical"
  },
  "actions": {
    "viewDetails": "View Details",
    "edit": "Edit",
    "addChild": "Add Child Asset",
    "delete": "Delete",
    "createWorkOrder": "Create Work Order",
    "startChat": "Ask AI"
  },
  "errors": {
    "loadFailed": "Failed to load assets",
    "createFailed": "Failed to create asset",
    "updateFailed": "Failed to update asset",
    "deleteFailed": "Failed to delete asset",
    "hasWorkOrders": "Cannot delete asset with existing work orders"
  }
}
```

**File**: `public/locales/ar/assets.json`
```json
{
  "title": "الأصول",
  "createTitle": "إضافة أصل",
  "editTitle": "تعديل أصل",
  "tree": {
    "noAssets": "لا توجد أصول",
    "addRoot": "إضافة ماكينة",
    "addChild": "إضافة فرعي"
  },
  "form": {
    "parent": "الأصل الرئيسي",
    "parentPlaceholder": "اختر الأصل الرئيسي (اتركه فارغاً للجذر)",
    "levelType": "نوع الأصل",
    "nameEn": "الاسم (إنجليزي)",
    "nameAr": "الاسم (عربي)",
    "code": "الكود",
    "status": "الحالة",
    "statusReason": "سبب الحالة",
    "criticality": "الأهمية",
    "commissionedAt": "تاريخ التشغيل",
    "attributes": "خصائص إضافية"
  },
  "status": {
    "RUNNING": "يعمل",
    "DOWN": "متوقف"
  },
  "criticality": {
    "LOW": "منخفضة",
    "MEDIUM": "متوسطة",
    "HIGH": "عالية",
    "CRITICAL": "حرجة"
  },
  "actions": {
    "viewDetails": "عرض التفاصيل",
    "edit": "تعديل",
    "addChild": "إضافة أصل فرعي",
    "delete": "حذف",
    "createWorkOrder": "إنشاء طلب صيانة",
    "startChat": "اسأل الذكاء الاصطناعي"
  },
  "errors": {
    "loadFailed": "فشل تحميل الأصول",
    "createFailed": "فشل إنشاء الأصل",
    "updateFailed": "فشل تحديث الأصل",
    "deleteFailed": "فشل حذف الأصل",
    "hasWorkOrders": "لا يمكن حذف أصل له طلبات صيانة"
  }
}
```

---

## 9. Testing Checklist

### Unit Tests
- [ ] `computeAssetPath` correctly builds path from ancestors
- [ ] `updateDescendantPaths` updates all descendants
- [ ] `getAncestors` returns correct order (root first)
- [ ] `getDescendants` returns all descendants
- [ ] Asset creation validates level type against factory config
- [ ] Asset creation validates status reason against status

### Integration Tests
- [ ] Create root asset (machine)
- [ ] Create child asset (group under machine)
- [ ] Create grandchild asset (component under group)
- [ ] Update asset name → path strings update for descendants
- [ ] Move asset to different parent → depth and paths update
- [ ] Delete asset → children cascade delete
- [ ] Prevent delete if work orders exist
- [ ] Filter assets by status, depth, level type
- [ ] Search assets by name (En and Ar)

### E2E Tests
- [ ] Admin can view asset tree
- [ ] Admin can create asset at any level
- [ ] Admin can edit asset
- [ ] Admin can delete asset (without work orders)
- [ ] Asset picker shows cascading dropdowns
- [ ] Language switch shows correct names

---

## 10. Implementation Order

1. **Database migration** - Create Asset and FactoryConfig tables
2. **Backend models** - Prisma schema, generate client
3. **Utility functions** - Path computation, ancestor/descendant queries
4. **API routes** - CRUD endpoints for assets and factory config
5. **Seed data** - Factory config and sample assets
6. **Frontend components** - Asset tree, forms, picker
7. **Localization** - Add translation files
8. **Testing** - Unit, integration, E2E tests

---

*End of Spec 1*
