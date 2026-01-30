# Factory Customization - Plain English Summary

**Purpose**: This document explains what we're building and why, in simple terms. Read this first, then refer to the detailed requirements document for implementation specifics.

---

## What We're Building

We're adapting Metralis for Food Basket, a freeze-drying factory in Egypt. Their needs revealed gaps that will affect all future factories, so we're building extensible solutions.

---

## The 5 Major Changes

### 1. Hierarchical Assets (Machines → Groups → Components)

**What it is**: Instead of a flat list of machines, assets now have parent-child relationships.

**Example**:
```
Freeze Dryer (Machine)
  └── Vacuum System (Group)
        └── Booster Pump D1G02 (Component)
```

**Why it matters**:
- Technicians can report issues at the exact component level
- AI gets better context ("this pump is part of the vacuum system")
- Documents can be attached at any level and inherited downward

**Implication**: Every work order now links to an "Asset" instead of a "Machine". The UI needs cascading dropdowns.

> **⚠️ DECISION POINT: Hierarchy Depth**
>
> We chose: **Per-machine flexibility with factory defaults**
> - Factory sets default (e.g., 3 levels)
> - Individual machines can have more or fewer levels
>
> **Alternative considered**: Fixed depth per factory
> - Simpler to implement
> - But some machines genuinely need more detail than others
>
> **Your call**: Is the flexibility worth the complexity?

---

### 2. Bilingual Asset Names (English + Arabic)

**What it is**: Every asset has two names stored:
- `nameEn`: "Booster Pump D1G02" (for manuals, AI search)
- `nameAr`: "طلمبة بوستر" (what technicians call it)

**Why it matters**:
- Technicians see Arabic names in the UI
- AI searches use English names (matches manual terminology)
- No translation needed at runtime - it's a direct 1:1 mapping

**Implication**: Admin must enter both names when creating assets. More data entry, but more accurate.

> **⚠️ DECISION POINT: Arabic Name Required vs Optional**
>
> You changed this to: **Arabic name optional**
>
> **Trade-off**:
> - Optional = faster data entry, works for English-only factories
> - Required = ensures bilingual support is complete
>
> **Risk if optional**: Some assets might not have Arabic names, breaking the Arabic UX

---

### 3. New Work Order Form (Matching Paper Form)

**What it is**: The digital form now matches their paper form exactly.

**New fields added**:
- Equipment stop time, fault report time, repair start time
- Maintenance discipline (Electrical/Mechanical/Hydro-pneumatic) - **multi-select**
- Maintenance type (Planned/Predictive/Corrective) - **single-select**
- Equipment status after repair
- Notes and recommendations
- Role tracking (Performer, Receiver, Engineers, Manager)

**Why it matters**: Technicians can transition from paper without learning a new system.

**Implication**: More fields = more complex form. We'll need good UX to not overwhelm users.

> **⚠️ DECISION POINT: Timestamps - Auto vs Manual**
>
> We chose: **Auto-capture with manual override**
> - System records time when status changes
> - User can edit if the recorded time is wrong
>
> **Why this matters**: If auto-capture is wrong and users can't fix it, your metrics (MTTR, downtime) will be inaccurate.

---

### 4. Simplified Status Model (RUNNING/DOWN + Reason)

**What it is**: Just two core statuses, with a separate "reason" field for specifics.

**How it works**:
```
Asset Status: RUNNING (Green) or DOWN (Red)
       +
Status Reason: "Waiting for Parts", "Under Observation", etc.
```

**Example**:
- `status=DOWN, statusReason="Waiting for Parts"`
- `status=RUNNING, statusReason="Under Observation"`

**Why this is simpler**:
- Only 2 colors/states to handle in code
- Reasons are factory-configurable strings grouped by status
- Users can filter by status OR by specific reason OR both

**Factory configures reasons like this**:
```json
{
  "RUNNING": ["Operational", "Under Observation", "Standby"],
  "DOWN": ["Breakdown", "Waiting for Parts", "Scheduled Maintenance", "Under Repair"]
}
```

**Filtering options**:
1. "Show all DOWN assets" → sees everything that's down
2. "Show DOWN + Waiting for Parts" → just those waiting for parts
3. Dashboard shows: 5 RUNNING, 2 DOWN → click DOWN → breakdown by reason

---

### 5. MetralisAI Arabic Support

**What it is**: Technicians can chat with AI in Arabic about their equipment.

**How it works**:
1. User selects asset (sees Arabic name: "طلمبة بوستر")
2. User types question in Arabic
3. System looks up English equivalent ("Booster Pump D1G02")
4. Vector search runs in English (matches manual content)
5. AI responds in Arabic, using Arabic asset names

**Why it matters**: Technicians don't need to know English terminology.

**Implication**: Quality depends on having both English and Arabic names for all assets. If Arabic name is missing, the experience breaks down.

---

## Things We're NOT Building (Yet)

These were identified as important but deferred:

| Feature | Why Deferred |
|---------|--------------|
| Preventive Maintenance Scheduling | High effort, not in initial scope |
| Running Hours / Cycle Tracking | Requires IoT integration |
| Notifications / Escalation | Medium effort, can add later |
| Cost Tracking | Need to understand their cost structure first |
| Parts Inventory Integration | Separate project |
| Work Order Templates | Nice-to-have |
| QR Codes on Assets | Nice-to-have |

> **⚠️ FLAG FOR ATTENTION**
>
> **Notifications**: If a critical machine goes down at 2am, nobody gets alerted. The supervisor finds out when they check the dashboard in the morning.
>
> Is this acceptable for Food Basket? If not, we should prioritize notifications.

---

## Document Association (How Manuals Get Linked)

**What it is**: Documents can be linked to one or more assets, with optional inheritance.

| Association Type | Example | Who sees it |
|------------------|---------|-------------|
| Single asset | "Pump D1G02 Datasheet" | Only this pump |
| Multiple specific assets | "Freeze Dryer Manual" linked to 3 freeze dryers | Those 3 machines |
| Asset + inheritance | Manual linked to machine with "applies to children" | Machine + all groups/components inside |
| Factory-wide | "Safety SOPs" | Everyone |

**Key change**: One document can now be linked to multiple specific machines. Useful when you have several identical freeze dryers that all need the same manual.

**How it works in UI**:
1. Upload document
2. Select one or more assets to link it to (multi-select)
3. Optionally check "applies to children" (inheritance)
4. OR check "factory-wide" to make it available everywhere

---

## Data Model Impact

**What changes in the database**:

| Change | Impact |
|--------|--------|
| `Machine` table → `Asset` table | All existing code referencing machines needs updating |
| Work orders link to `Asset` instead of `Machine` | Work order queries change |
| New fields on `WorkOrder` | Database migration needed |
| New `FactoryConfig` table | Stores per-factory settings |

**Migration approach**: Clean slate (no existing data to migrate).

---

## UI Changes Required

1. **Asset Management Page** (Admin)
   - Tree view instead of flat list
   - Create/edit forms need both English and Arabic name fields

2. **Work Order Creation**
   - Cascading dropdowns: Machine → Group → Component
   - New sections matching paper form layout
   - Multi-select for disciplines

3. **MetralisAI Chat**
   - Asset selector becomes cascading dropdown
   - Ensure RTL support for Arabic responses

4. **Analytics**
   - New filters for maintenance type, discipline
   - Asset hierarchy drill-down

---

## Spec Breakdown & Execution Order

### The Distinct Specs

| # | Spec Name | What It Covers |
|---|-----------|----------------|
| 1 | **Hierarchical Assets** | Asset model, parent-child relationships, bilingual names, status+reason, factory config for hierarchy levels |
| 2 | **Work Order Redesign** | New form fields, cascading asset picker, timestamps, disciplines/types, role tracking |
| 3 | **Document System** | Multi-asset document linking, inheritance, factory-wide docs, document upload UI |
| 4 | **MetralisAI Arabic** | Bilingual context for AI, Arabic query handling, response in user's language |
| 5 | **Analytics Dashboard** | MTTR/MTBF metrics, filtering by asset/status/type, charts, export |

### Execution Order & Dependencies

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PHASE 1 (Foundation)                        │
│                                                                     │
│   ┌─────────────────────┐                                          │
│   │  Spec 1: Assets     │  ← Everything depends on this            │
│   │  (must be first)    │                                          │
│   └─────────────────────┘                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     PHASE 2 (Can run in parallel)                   │
│                                                                     │
│   ┌─────────────────────┐    ┌─────────────────────┐               │
│   │  Spec 2: Work Order │    │  Spec 3: Documents  │               │
│   │  Form Redesign      │    │  System             │               │
│   └─────────────────────┘    └─────────────────────┘               │
│         │                            │                              │
│         │   (both need assets)       │                              │
│         └────────────┬───────────────┘                              │
│                      │                                              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     PHASE 3 (Can run in parallel)                   │
│                                                                     │
│   ┌─────────────────────┐    ┌─────────────────────┐               │
│   │  Spec 4: AI Arabic  │    │  Spec 5: Analytics  │               │
│   │  Support            │    │  Dashboard          │               │
│   └─────────────────────┘    └─────────────────────┘               │
│                                                                     │
│   (AI needs assets + docs)   (Analytics needs work orders)         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Summary

| Phase | Specs | Can Parallelize? | Dependencies |
|-------|-------|------------------|--------------|
| **Phase 1** | Spec 1 (Assets) | No - must complete first | None |
| **Phase 2** | Spec 2 (Work Orders) + Spec 3 (Documents) | Yes, these two can run in parallel | Both need Spec 1 complete |
| **Phase 3** | Spec 4 (AI Arabic) + Spec 5 (Analytics) | Yes, these two can run in parallel | Spec 4 needs 1+3, Spec 5 needs 1+2 |

### Estimated Scope Per Spec

| Spec | Backend Changes | Frontend Changes | Complexity |
|------|-----------------|------------------|------------|
| 1. Assets | New Asset model, FactoryConfig, API routes | Asset tree UI, create/edit forms, cascading dropdowns | **High** |
| 2. Work Orders | Extend WorkOrder model, new fields, update routes | New form layout, multi-select disciplines, time pickers | **High** |
| 3. Documents | DocumentAsset join table, update retrieval logic | Multi-select asset picker, inheritance checkbox | **Medium** |
| 4. AI Arabic | Update prompt builder, bilingual context | Ensure RTL, no major new UI | **Medium** |
| 5. Analytics | New aggregation queries | Charts, filters, export | **Medium** |

---

## Next Step

Ready to start **Spec 1: Hierarchical Assets**. This spec will include:
1. Database schema changes (Asset model, FactoryConfig)
2. API endpoints (CRUD for assets, tree queries)
3. Frontend components (asset tree, create/edit forms)
4. Data seeding (Food Basket's machine hierarchy)
