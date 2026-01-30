# Factory Customization & Localization Requirements

**Version:** 1.0
**Date:** January 5, 2026
**Status:** Requirements Gathering Complete
**First Client:** Food Basket (Freeze Drying Factory, Egypt)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current System State](#2-current-system-state)
3. [Hierarchical Asset Structure](#3-hierarchical-asset-structure)
4. [Work Order Form Redesign](#4-work-order-form-redesign)
5. [MetralisAI Arabic Support](#5-metralisai-arabic-support)
6. [Document Association System](#6-document-association-system)
7. [Analytics Dashboard](#7-analytics-dashboard)
8. [Extensibility Requirements](#8-extensibility-requirements)
9. [Standardized Enums with Custom Labels](#9-standardized-enums-with-custom-labels)
10. [Pitfalls & Improvements (Maintenance Engineer Perspective)](#10-pitfalls--improvements-maintenance-engineer-perspective)
11. [Data Model Changes](#11-data-model-changes)
12. [UI/UX Specifications](#12-uiux-specifications)

---

## 1. Executive Summary

### 1.1 The Problem

Food Basket, a freeze-drying factory in Egypt, cannot use the current Metralis system effectively because:

1. **Flat Machine Structure**: Their internal system organizes equipment as Machine → Group → Component, but Metralis only supports flat machines
2. **No Bilingual Support for Data**: Technicians know equipment by Arabic names (طلمبة بوستر), but manuals and LLM knowledge use English names (Booster Pump D1G02)
3. **Work Order Form Mismatch**: Their paper form has specific fields (maintenance discipline, equipment status, timestamps) that don't exist in the current system
4. **Arabic AI Interaction**: Technicians need to speak to MetralisAI in Arabic, but vector search requires English terminology

### 1.2 The Solution

Build a flexible, extensible system that:

- Supports configurable asset hierarchies (any depth, factory-defined level names)
- Stores bilingual names (English + Arabic) for all assets
- Replicates their work order form digitally with full i18n support
- Enables Arabic ↔ English asset name mapping for AI queries
- Can be adapted for other factories with minimal code changes

### 1.3 Design Principles

1. **Extensibility First**: Every feature must be configurable, not hardcoded
2. **Bilingual by Default**: All user-facing data supports multiple languages
3. **Factory-Specific Configuration**: Admins control hierarchy structure, field options, and workflows
4. **Clean Slate Migration**: No legacy data to migrate (confirmed by client)

---

## 2. Current System State

### 2.1 Current Machine Model

```
Machine {
  id: UUID
  name: String
  code: String (optional)
  category: String (optional)
  line: String (optional)        // Flat text field
  area: String (optional)        // Flat text field
  manufacturer: String (optional)
  model: String (optional)
  serialNumber: String (optional)
  status: RUNNING | DOWN | MAINTENANCE | RETIRED
  criticality: LOW | MEDIUM | HIGH
  metadata: JSON
}
```

**Limitations:**
- No parent-child relationships
- No component tracking within machines
- Single name field (no bilingual support)
- `line` and `area` are unstructured text, not linked entities

### 2.2 Current Work Order Model

```
WorkOrder {
  id: UUID
  publicId: String (8-char hex)
  machineId: UUID
  title: String
  descriptionRaw: String
  status: OPEN | IN_PROGRESS | WAITING | CLOSED
  type: CORRECTIVE | PREVENTIVE | INSPECTION
  priority: LOW | MEDIUM | HIGH | CRITICAL
  reportedAt: DateTime
  reportedById: UUID
  startedAt: DateTime (nullable)
  completedAt: DateTime (nullable)
  assignedToId: UUID (nullable)
  symptoms: JSON (optional)
  suspectedCause: String (optional)
  rootCause: String (optional)
  failureMode: String (optional)
}
```

**Missing Fields (from client's paper form):**
- Equipment stop time
- Fault report time
- Repair start time
- Maintenance end time/date
- Maintenance duration (calculated)
- Downtime duration (calculated)
- Maintenance discipline (Electrical, Mechanical, Hydro-pneumatic) - multi-select
- Maintenance type (Planned, Predictive, Corrective) - single-select
- Equipment status after repair (custom per factory)
- Corrective action description
- Notes and recommendations
- Role-based name tracking (Performer, Receiver, Engineers, Manager)

### 2.3 Current i18n System

- Uses i18next with `en` and `ar` locales
- RTL support with automatic direction switching
- Translation files for UI labels only
- No bilingual support for user-entered data (machine names, etc.)
- `translateText()` function exists for dynamic translation via API

### 2.4 Current MetralisAI

- RAG-based with vector search over DocumentChunk and IncidentChunk
- Embeddings: OpenAI 1536-dimensional vectors
- Machine context includes: name, model, manufacturer, line
- No Arabic query handling
- No bilingual name mapping

---

## 3. Hierarchical Asset Structure

### 3.1 Requirements Summary

| Requirement | Decision |
|-------------|----------|
| Hierarchy depth | Per-machine with factory defaults |
| Level names | Factory-wide custom names (Admin defines) |
| Asset naming | Bilingual (English + Arabic required) |
| Asset codes | Optional at all levels |
| Who can create assets | Admin only |
| Free-text fallback | No - must select from predefined list |

### 3.2 Food Basket's Hierarchy

Based on the provided spreadsheet (FB/Machines.xlsx):

```
Machine: Freeze Dryer (خط التجفيد)
├── Group: Vacuum System (خط الفاكيوم)
│   ├── Component: Booster pump D1G02 (طلمبة بوستر)
│   ├── Component: Vacuum pump D1G03 (طلمبة فاكيوم 1)
│   ├── Component: Vacuum pump D1G04 (طلمبة فاكيوم 2)
│   ├── Component: Vacuum pump D1G05 (طلمبة فاكيوم 3)
│   ├── Component: Butterfly Valve F14V aut SVdn 125 D1Q06 (محبس فاكيوم 1)
│   ├── Component: Butterfly Valve F14V aut SVdn 125 D1Q07 (محبس فاكيوم 2)
│   ├── Component: Check Valve dn 100 D1R01 (سيفتي)
│   ├── Component: Pressure Transmitter 1-0 bar D1K02 (برشر الخط)
│   ├── Component: Pressure Transmitter 10-0 mbar D1K01 (برشر الكابينة)
│   └── Component: Other (أخرى)
├── Group: Hot Water System (خط المياه الساخنة)
│   ├── Component: Steam Regulation Valve dn 50 C1Q53 (محبس البخار)
│   ├── Component: Steam Heat exchanger cb 76-90h C1E01 (المبادل الحراري)
│   ├── Component: PT 100 Sensor 0-150 degree C1K93 (حساس حرارة المياه الساخنة)
│   ├── Component: Cold water heat exchanger C1E11 (مبادل برج التبريد)
│   ├── Component: Mixing valve 3 way dn 100/pn 16,4-20mA C1Q51 (محبس ثلاثي المياه الساخنة)
│   ├── Component: Mixing valve 3 way dn 100/pn 16,4-20mA C1Q52 (محبس ثلاثي المياه الباردة (برج))
│   ├── Component: Hot water pump MODEL TP100-170/4 C1G81 (طلمبة المياة)
│   ├── Component: Expansion Vesssel N200 Reflex C1C01 (اكسبنشن تانك صغير)
│   ├── Component: Expansion Vesssel N300 Reflex C1C01 (اكسبنشن تانك كبير)
│   └── Component: Other (أخرى)
├── Group: Deicing System (خط الديايسينج)
│   ├── Component: Butterfly Valve F14V aut sv dn 125 E1Q08 (بوابة الديايسينج 1)
│   ├── Component: Butterfly Valve F14V aut sv dn 125 E1Q09 (بوابة الديايسينج 2)
│   ├── Component: Control valve 2 way dn25 pn16 (Steam inlet) E1Q51 (محبس البخار الاوتوماتيك)
│   ├── Component: Stop valve with bellow seal ARI E1Q01 (محبس البخار مانوال)
│   ├── Component: Safety valve dn50 E1Q15 (سيفتي)
│   ├── Component: Pressure Transmitter 0-100 mbar abs E1K92 (حساس ضغط التانك)
│   ├── Component: Level switch FTL50 E1K34 (حساس مستوى المياه)
│   ├── Component: PT 100 Temp.Sensor 1/2 in * 80 mm E1P90 (حساس حرارة التانك)
│   ├── Component: Horizental Centrifugal pump Model FP3402/110 KFB E6G81 (طلمبة المياة)
│   ├── Component: Deicing vessel right Ø 606*2500mm E6C01 (خزان الديايسينج)
│   ├── Component: Pressure Transmitter 0-2 bar abs E1K35 (حساس مضخه المياة)
│   └── Component: Other (أخرى)
├── Group: Cabinet (الكابينة)
│   ├── Component: Heating Plates 611600B (بالتات الومنيوم)
│   ├── Component: Trays-Aluminum ALMG 2.5 (صيحان الومنيوم)
│   ├── Component: Trolly (ترولي معلق)
│   ├── Component: Houses L=1.1m,Ø=3/4 in 611614-A (خرطوم بالتات الكابينة)
│   ├── Component: Temperture Sensor PT 100 Ø 6 *100mm 508497C (حساس حرارة الكابينة)
│   ├── Component: Heating plate Rod 40*115 mm (رود بالتة الكابينة)
│   ├── Component: Temperture Sensor (Product sensor) Ø 1.5 *30mm Type K 603697 (حساس منتج)
│   ├── Component: Trolly For Helm 600 profile 613474-A (حامل الترولي)
│   ├── Component: Rail system (سكة الكابينة)
│   └── Component: Other (أخرى)
├── Group: Hydraulic System (خط الهيدروليك)
│   ├── Component: Hydraulic pump unit 620812 (طلمبة هيدروليك)
│   └── Component: Other (أخرى)
```

### 3.3 Key Observations

1. **Three Levels**: Machine → Group → Component (but system must support 2-N levels)
2. **Technical Codes**: Components have codes like D1G02, C1Q53, E1Q08 (optional field)
3. **Arabic Names**: Colloquial/simplified (طلمبة = pump, محبس = valve, حساس = sensor)
4. **"Other" Option**: Each group has an "Other" component for unlisted items (admin adds new ones when needed)
5. **Same Component Types**: Similar components appear across groups (pumps, valves, sensors)

### 3.4 Data Model

```prisma
model Asset {
  id              String   @id @default(uuid())

  // Hierarchy
  parentId        String?
  parent          Asset?   @relation("AssetHierarchy", fields: [parentId], references: [id], onDelete: Cascade)
  children        Asset[]  @relation("AssetHierarchy")
  depth           Int      @default(0)  // 0 = root (machine), 1 = group, 2 = component, etc.

  // Bilingual Identity
  nameEn          String   // English name (required) - used for vector search
  nameAr          String   // Arabic name (required) - displayed to Arabic users
  code            String?  // Optional technical code (D1G02, etc.)

  // Classification
  levelType       String   // Factory-defined: "machine", "group", "component", or custom

  // Semantic Path (for LLM context)
  pathStringEn    String   @db.Text  // "Freeze Dryer / Vacuum System / Booster Pump D1G02"
  pathStringAr    String   @db.Text  // "خط التجفيد / خط الفاكيوم / طلمبة بوستر"

  // Operational
  status          AssetStatus?       // RUNNING or DOWN
  statusReason    String?            // Factory-configurable reason (e.g., "Waiting for Parts")
  criticality     AssetCriticality?

  // Flexible attributes (manufacturer, model, specs - varies by level)
  attributes      Json?

  // Timestamps
  commissionedAt  DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  workOrders      WorkOrder[]
  documents       Document[]

  @@index([parentId])
  @@index([levelType])
  @@index([nameEn])
  @@index([nameAr])
  @@unique([parentId, nameEn])  // No duplicate English names under same parent
  @@unique([parentId, nameAr])  // No duplicate Arabic names under same parent
}

// Simple two-value status enum for core logic (colors, alerts, filtering)
enum AssetStatus {
  RUNNING    // Green - Asset is operational
  DOWN       // Red   - Asset is not operational
}

// The REASON for the status is stored separately as a configurable string
// This allows factories to define their own reasons while keeping core logic simple
// Examples:
//   status=RUNNING, statusReason="Under Observation" (running but being watched)
//   status=RUNNING, statusReason="Standby" (idle but ready)
//   status=DOWN, statusReason="Waiting for Parts"
//   status=DOWN, statusReason="Scheduled Maintenance"
//   status=DOWN, statusReason="Breakdown"

enum AssetCriticality {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

### 3.5 Factory Configuration

```prisma
model FactoryConfig {
  id              String   @id @default(uuid())

  // Hierarchy Level Definitions
  // Example: [
  //   { depth: 0, nameEn: "Machine", nameAr: "الماكينة" },
  //   { depth: 1, nameEn: "Group", nameAr: "المجموعة" },
  //   { depth: 2, nameEn: "Component", nameAr: "المكون" }
  // ]
  hierarchyLevels Json

  // Default hierarchy depth for new machines (can be overridden per machine)
  defaultMaxDepth Int      @default(3)

  // Status reason options - grouped by core status (RUNNING or DOWN)
  // Users can filter by both the core status AND the specific reason
  // Example: {
  //   "RUNNING": [
  //     { id: "operational", nameEn: "Operational", nameAr: "يعمل" },
  //     { id: "under_observation", nameEn: "Under Observation", nameAr: "تحت المراقبة" },
  //     { id: "standby", nameEn: "Standby", nameAr: "في وضع الاستعداد" }
  //   ],
  //   "DOWN": [
  //     { id: "breakdown", nameEn: "Breakdown", nameAr: "عطل" },
  //     { id: "waiting_parts", nameEn: "Waiting for Parts", nameAr: "في انتظار قطع الغيار" },
  //     { id: "scheduled_maintenance", nameEn: "Scheduled Maintenance", nameAr: "صيانة مجدولة" },
  //     { id: "under_repair", nameEn: "Under Repair", nameAr: "تحت الإصلاح" }
  //   ]
  // }
  statusReasonOptions Json

  // Maintenance discipline options (multi-select)
  // Example: [
  //   { id: "electrical", nameEn: "Electrical", nameAr: "كهربى" },
  //   { id: "mechanical", nameEn: "Mechanical", nameAr: "ميكانيكى" },
  //   { id: "hydropneumatic", nameEn: "Hydro-pneumatic", nameAr: "هيدرونيوماتيك" }
  // ]
  maintenanceDisciplines Json

  // Maintenance type options (single-select)
  // Example: [
  //   { id: "planned", nameEn: "Planned", nameAr: "مخطط" },
  //   { id: "predictive", nameEn: "Predictive", nameAr: "تنبؤية" },
  //   { id: "corrective", nameEn: "Corrective", nameAr: "علاجى" }
  // ]
  maintenanceTypes Json

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## 4. Work Order Form Redesign

### 4.1 Form Field Mapping

Based on the paper form (FB/05_MNF-FB-05 Maintenance Job Request):

| Arabic Field | English Field | Type | Required | Notes |
|--------------|---------------|------|----------|-------|
| **خاص بالمشغل (Operator Section)** |
| اسم الماكينة | Machine Name | Asset Picker | Yes | Cascading: Machine → Group → Component |
| كود الماكينة | Machine Code | Auto-filled | No | From selected asset |
| مقدم الطلب | Requester | Auto-filled | Yes | Current user |
| رقم التقرير | Report Number | Auto-generated | Yes | publicId (existing) |
| وصف الشكوى | Problem Description | Textarea | Yes | Maps to descriptionRaw |
| قائد المنطقة | Area Leader | User Picker | No | Role-based |
| مسؤول الصيانة | Maintenance Supervisor | User Picker | No | Role-based |
| اليوم | Day | Auto-filled | Yes | Day of week from date |
| التاريخ | Date | DateTime | Yes | reportedAt |
| توقيت توقف المُعدة | Equipment Stop Time | DateTime | No | New field |
| توقيت إبلاغ العُطل | Fault Report Time | DateTime | Yes | Auto-captured, manual override |
| توقيت بداية الإصلاح | Repair Start Time | DateTime | No | Auto-captured on status change |
| **خاص بالصيانة (Maintenance Section)** |
| وقت عملية الصيانة | Maintenance Operation Time | Time | No | Start time of maintenance work |
| وقت انتهاء عملية الصيانة | Maintenance End Time | Time | No | Auto-captured on close |
| تاريخ انتهاء عملية الصيانة | Maintenance End Date | Date | No | Auto-captured on close |
| مدة الصيانة (د) | Maintenance Duration (min) | Calculated | No | End time - Start time |
| مدة التوقف (د) | Downtime Duration (min) | Calculated | No | End time - Equipment stop time |
| نوع عملية الصيانة | Maintenance Discipline | Multi-select | No | Electrical, Mechanical, Hydro-pneumatic |
| نوع عملية الصيانة | Maintenance Type | Single-select | No | Planned, Predictive, Corrective |
| **السبب الجذري (Root Cause)** |
| السبب الجذري | Root Cause | Textarea | No | Existing field |
| **وصف عملية الصيانة (Maintenance Description)** |
| وصف عملية الصيانة | Maintenance Description | Textarea | No | Detailed work performed |
| **الإجراء التصحيحي (Corrective Action)** |
| الإجراء التصحيحي | Corrective Action | Textarea | No | New field |
| **Spare Parts Table** |
| حالة المعدة | Equipment Status | Select | No | Custom options per factory |
| قطعة الغيار المستخدمة | Spare Part Used | Part Picker | No | Existing WorkOrderPart |
| العدد | Quantity | Number | No | Existing |
| التكلفة | Cost | Number | No | New field on Part |
| رصيد المخزن | Stock Balance | Auto-filled | No | From Part inventory |
| **ملاحظات وتوصية (Notes)** |
| ملاحظات وتوصية | Notes and Recommendations | Textarea | No | New field |
| **Signatures (Name Tracking)** |
| القائم بعملية الصيانة | Maintenance Performer | User Picker | No | Who did the work |
| مستلم الماكينة | Machine Receiver | User Picker | No | Who received machine back |
| المهندس المسؤول | Responsible Engineer | User Picker | No | Supervising engineer |
| مهندس الصيانة | Maintenance Engineer | User Picker | No | Department engineer |
| مدير الصيانة | Maintenance Manager | User Picker | No | Department manager |

### 4.2 Updated Work Order Model

```prisma
model WorkOrder {
  id                    String   @id @default(uuid())
  publicId              String   @unique  // Auto-generated 8-char hex

  // Asset Selection (replaces machineId)
  assetId               String
  asset                 Asset    @relation(fields: [assetId], references: [id])

  // Basic Info
  title                 String
  descriptionRaw        String   @db.Text  // Problem description

  // Status & Classification
  status                WorkOrderStatus  @default(OPEN)
  priority              WorkOrderPriority @default(MEDIUM)

  // Maintenance Classification (from factory config)
  maintenanceDisciplines String[]  // Multi-select: ["electrical", "mechanical"]
  maintenanceType       String?    // Single-select: "corrective"

  // Timestamps - Operator Section
  reportedAt            DateTime  @default(now())
  reportedById          String
  reportedBy            User      @relation("ReportedWorkOrders", fields: [reportedById], references: [id])
  equipmentStopTime     DateTime?  // When equipment actually stopped
  faultReportTime       DateTime?  // When fault was reported (auto + manual override)
  repairStartTime       DateTime?  // When repair work began

  // Timestamps - Maintenance Section
  maintenanceStartTime  DateTime?  // Start of maintenance operation
  maintenanceEndTime    DateTime?  // End of maintenance operation
  completedAt           DateTime?  // When work order was closed

  // Calculated Durations (stored for reporting)
  maintenanceDurationMin Int?      // maintenanceEndTime - maintenanceStartTime
  downtimeDurationMin   Int?       // maintenanceEndTime - equipmentStopTime

  // Diagnostic Fields
  symptoms              Json?      // Array of symptom strings
  suspectedCause        String?
  rootCause             String?    @db.Text
  failureMode           String?

  // Work Description
  maintenanceDescription String?   @db.Text  // What work was performed
  correctiveAction      String?    @db.Text  // Corrective action taken
  notesAndRecommendations String?  @db.Text  // Additional notes

  // Equipment Status After Repair (from factory config options)
  equipmentStatusAfter  String?    // e.g., "running", "needs_parts"

  // Role-Based Name Tracking (not actual signatures, just user assignment)
  areaLeaderId          String?
  areaLeader            User?      @relation("AreaLeaderWorkOrders", fields: [areaLeaderId], references: [id])
  maintenanceSupervisorId String?
  maintenanceSupervisor User?      @relation("SupervisorWorkOrders", fields: [maintenanceSupervisorId], references: [id])
  performerId           String?
  performer             User?      @relation("PerformerWorkOrders", fields: [performerId], references: [id])
  machineReceiverId     String?
  machineReceiver       User?      @relation("ReceiverWorkOrders", fields: [machineReceiverId], references: [id])
  responsibleEngineerId String?
  responsibleEngineer   User?      @relation("ResponsibleEngineerWorkOrders", fields: [responsibleEngineerId], references: [id])
  maintenanceEngineerId String?
  maintenanceEngineer   User?      @relation("MaintenanceEngineerWorkOrders", fields: [maintenanceEngineerId], references: [id])
  maintenanceManagerId  String?
  maintenanceManager    User?      @relation("MaintenanceManagerWorkOrders", fields: [maintenanceManagerId], references: [id])

  // Assignment (existing)
  assignedToId          String?
  assignedTo            User?      @relation("AssignedWorkOrders", fields: [assignedToId], references: [id])

  // Metadata
  metadata              Json?
  createdAt             DateTime   @default(now())
  updatedAt             DateTime   @updatedAt

  // Relations
  repairActions         RepairAction[]
  parts                 WorkOrderPart[]
  attachments           Document[]

  @@index([reportedAt])
  @@index([assetId])
  @@index([status])
  @@index([maintenanceType])
}

enum WorkOrderStatus {
  OPEN
  IN_PROGRESS
  WAITING
  CLOSED
}

enum WorkOrderPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

### 4.3 Time Tracking Behavior

| Event | Auto-Captured | Manual Override |
|-------|---------------|-----------------|
| Fault Report Time | Yes - on work order creation | Yes |
| Repair Start Time | Yes - when status → IN_PROGRESS | Yes |
| Maintenance Start Time | No | Yes |
| Maintenance End Time | Yes - when status → CLOSED | Yes |
| Equipment Stop Time | No | Yes |

### 4.4 Asset Selection UI

**Cascading Dropdowns:**

1. **Step 1**: Select Machine
   - Dropdown shows all top-level assets (depth=0)
   - Display: nameAr or nameEn based on user's language setting

2. **Step 2**: Select Group (Optional)
   - Dropdown appears after machine selection
   - Shows children of selected machine (depth=1)
   - Can skip if issue is at machine level

3. **Step 3**: Select Component (Optional)
   - Dropdown appears after group selection
   - Shows children of selected group (depth=2)
   - Can skip if issue is at group level

**Display Format:**
- Arabic UI: خط التجفيد → خط الفاكيوم → طلمبة بوستر
- English UI: Freeze Dryer → Vacuum System → Booster Pump D1G02

---

## 5. MetralisAI Arabic Support

### 5.1 Requirements

1. **Arabic Input**: Technicians can type queries in Arabic
2. **Asset Name Mapping**: Arabic asset names map to English for vector search
3. **Arabic Output**: AI responses displayed in Arabic when user's language is Arabic
4. **Context Preservation**: Full asset path provided to LLM in both languages

### 5.2 Query Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│ User Query (Arabic): "طلمبة الفاكيوم بتعمل صوت غريب"                      │
│ Selected Asset: طلمبة بوستر (Booster Pump D1G02)                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 1: Extract Asset Context                                           │
│ - pathStringEn: "Freeze Dryer / Vacuum System / Booster Pump D1G02"    │
│ - pathStringAr: "خط التجفيد / خط الفاكيوم / طلمبة بوستر"                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 2: Build LLM Prompt                                                │
│ - Include both language paths for context                               │
│ - User query remains in original language (Arabic)                      │
│ - Instruct LLM to respond in user's language                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 3: Vector Search                                                   │
│ - Search using English asset path + translated query keywords           │
│ - Documents are indexed with English terminology                        │
│ - Retrieve relevant document chunks                                     │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 4: LLM Response                                                    │
│ - LLM receives context in English (from documents/manuals)              │
│ - LLM knows user speaks Arabic (from system prompt)                     │
│ - LLM responds in Arabic, referencing Arabic asset names               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.3 System Prompt Enhancement

```typescript
function buildSystemPrompt(userLanguage: 'en' | 'ar', asset: Asset) {
  const languageInstruction = userLanguage === 'ar'
    ? `The user speaks Arabic. Respond entirely in Arabic.
       When referring to equipment, use the Arabic names provided.
       The user is asking about: ${asset.nameAr} (${asset.pathStringAr})`
    : `Respond in English.
       The user is asking about: ${asset.nameEn} (${asset.pathStringEn})`;

  return `
You are MetralisAI, a maintenance assistant for industrial equipment.

${languageInstruction}

Asset Context:
- English Path: ${asset.pathStringEn}
- Arabic Path: ${asset.pathStringAr}
- Technical Code: ${asset.code || 'N/A'}

When providing diagnoses and recommendations:
1. Reference specific components using the user's language
2. Cite document sources when available
3. Consider the asset's maintenance history
4. Provide step-by-step troubleshooting guidance
`;
}
```

### 5.4 Embedding Strategy

**Document Chunks**: Continue embedding in English (source language of manuals)

**Query Enhancement**: For Arabic queries:
1. Use LLM to extract key technical terms
2. Map Arabic asset names to English equivalents using stored bilingual names
3. Combine for hybrid search

```typescript
async function enhanceArabicQuery(
  query: string,
  selectedAsset: Asset
): Promise<string> {
  // The selected asset gives us the exact English equivalent
  const assetContext = `${selectedAsset.nameEn} (${selectedAsset.pathStringEn})`;

  // For additional terms in the query, use the bilingual asset database
  // to find matches (e.g., if user mentions "المضخة", find pumps in their asset tree)

  return `${assetContext}: ${query}`;
}
```

### 5.5 Bilingual Asset Lookup

```typescript
// When user types Arabic text, find matching assets
async function findAssetsByArabicName(
  searchTerm: string
): Promise<Asset[]> {
  return prisma.asset.findMany({
    where: {
      OR: [
        { nameAr: { contains: searchTerm, mode: 'insensitive' } },
        { pathStringAr: { contains: searchTerm, mode: 'insensitive' } }
      ]
    },
    take: 10
  });
}
```

---

## 6. Document Association System

### 6.1 Requirements

Documents can be associated at multiple levels:

| Association Level | Example | Behavior |
|-------------------|---------|----------|
| Specific Asset | "Booster Pump D1G02 Datasheet" | Only visible to this asset |
| Machine Type | "Freeze Dryer Manual" | Visible to all freeze dryers (same model) |
| Component Type | "Butterfly Valve Manual" | Visible wherever this valve type is used |
| Factory-wide | "Safety SOPs" | Visible to all assets |

### 6.2 Document Model Update

```prisma
model Document {
  id                String   @id @default(uuid())

  // File Info
  title             String
  filePath          String
  mimeType          String?
  fileSize          Int?

  // Association - Documents can be linked to multiple assets via join table
  assets            DocumentAsset[]      // Many-to-many: one doc can apply to multiple assets

  // OR factory-wide (applies to everything)
  isFactoryWide     Boolean @default(false)

  // Inheritance - when linked to an asset, also applies to its descendants
  appliesToChildren Boolean @default(false)

  // Metadata
  documentType      String?              // "manual", "datasheet", "sop", etc.
  language          String?              // "en", "ar", or "bilingual"

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  // Vector chunks
  chunks            DocumentChunk[]

  @@index([isFactoryWide])
}

// Join table for Document <-> Asset many-to-many relationship
// Allows one document to be assigned to multiple specific machines
model DocumentAsset {
  id          String   @id @default(uuid())
  documentId  String
  document    Document @relation(fields: [documentId], references: [id], onDelete: Cascade)
  assetId     String
  asset       Asset    @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@unique([documentId, assetId])  // No duplicate assignments
  @@index([documentId])
  @@index([assetId])
}
```

**Use cases this supports:**
1. **Single asset**: Link doc to one specific component
2. **Multiple specific assets**: Link same freeze dryer manual to 3 identical freeze dryers
3. **Asset + children**: Link doc to a machine, check "applies to children" → all groups/components see it
4. **Factory-wide**: SOPs that everyone needs

### 6.3 Document Retrieval Logic

```typescript
async function getApplicableDocuments(assetId: string): Promise<Document[]> {
  const asset = await prisma.asset.findUnique({
    where: { id: assetId }
  });

  // 1. Documents directly linked to this asset (via DocumentAsset join table)
  const directDocs = await prisma.document.findMany({
    where: {
      assets: { some: { assetId } }
    }
  });

  // 2. Inherited from ancestors (where appliesToChildren = true)
  const ancestorIds = await getAncestorIds(assetId);
  const inheritedDocs = await prisma.document.findMany({
    where: {
      appliesToChildren: true,
      assets: { some: { assetId: { in: ancestorIds } } }
    }
  });

  // 3. Factory-wide documents
  const factoryDocs = await prisma.document.findMany({
    where: { isFactoryWide: true }
  });

  // Deduplicate and return
  const allDocs = [...directDocs, ...inheritedDocs, ...factoryDocs];
  return deduplicateById(allDocs);
}
```

---

## 7. Analytics Dashboard

### 7.1 Required Metrics

| Metric | Description | Calculation |
|--------|-------------|-------------|
| MTTR | Mean Time To Repair | Avg(maintenanceDurationMin) |
| MTBF | Mean Time Between Failures | Avg(time between work orders per asset) |
| Downtime | Total downtime | Sum(downtimeDurationMin) |
| Work Orders by Status | Count per status | Group by status |
| Work Orders by Type | Count per maintenance type | Group by maintenanceType |
| Work Orders by Discipline | Count per discipline | Group by maintenanceDisciplines |
| Top Failing Assets | Assets with most work orders | Group by assetId, count |
| Common Failure Modes | Most frequent failure modes | Group by failureMode |
| Parts Usage | Parts consumed | Sum quantities from WorkOrderPart |

### 7.2 Filters

- Date range
- Asset (with hierarchy - select machine to see all descendants)
- Maintenance type
- Maintenance discipline
- Status
- Priority

### 7.3 Visualization

- Line charts for trends over time
- Bar charts for comparisons
- Pie charts for distributions
- Tables for detailed data
- Export to Excel/CSV

---

## 8. Extensibility Requirements

### 8.1 Per-Factory Configuration

Everything that varies between factories should be configurable:

| Feature | Configuration Location |
|---------|----------------------|
| Hierarchy level names | FactoryConfig.hierarchyLevels |
| Hierarchy depth | FactoryConfig.defaultMaxDepth (per-machine override in Asset) |
| Equipment status options | FactoryConfig.equipmentStatusOptions |
| Maintenance disciplines | FactoryConfig.maintenanceDisciplines |
| Maintenance types | FactoryConfig.maintenanceTypes |
| Work order ID format | FactoryConfig (future) |
| Required fields | FactoryConfig (future) |

### 8.2 Adding a New Factory

1. Create FactoryConfig record with their specific options
2. Define hierarchy levels (could be 2 levels, could be 5)
3. Define their status options, disciplines, types
4. Import their asset hierarchy (bulk CSV import)
5. Upload their documents with appropriate associations

### 8.3 Code Changes for New Factory

**Ideally: Zero code changes**

- All factory-specific options come from database
- UI renders based on configuration
- Work order form adapts to configured fields
- Analytics use configured options for filters/grouping

### 8.4 Future Extensibility

- Custom fields on work orders (JSON schema per factory)
- Custom workflows (approval chains)
- Custom notifications
- Integration with external systems (ERP, etc.)

---

## 9. Simplified Status Model

### 9.1 The Approach: Core Status + Configurable Reason

Instead of many enum values, we use a simple two-value status with a separate reason field:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CORE STATUS (2 values)                          │
│                    RUNNING (Green) | DOWN (Red)                     │
│                           │              │                          │
│                    ┌──────┴──────┐ ┌─────┴──────┐                   │
│                    │   REASONS   │ │   REASONS  │                   │
│                    │ (strings)   │ │  (strings) │                   │
│                    ├─────────────┤ ├────────────┤                   │
│                    │ Operational │ │ Breakdown  │                   │
│                    │ Under Obs.  │ │ Waiting    │                   │
│                    │ Standby     │ │ for Parts  │                   │
│                    │ ...         │ │ Scheduled  │                   │
│                    │             │ │ Maintenance│                   │
│                    └─────────────┘ └────────────┘                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.2 How It Works

**In the database:**
```prisma
model Asset {
  status        AssetStatus?   // RUNNING or DOWN (enum)
  statusReason  String?        // "Waiting for Parts", "Under Observation", etc.
}
```

**In factory config:**
```json
{
  "statusReasonOptions": {
    "RUNNING": [
      { "id": "operational", "nameEn": "Operational", "nameAr": "يعمل" },
      { "id": "under_observation", "nameEn": "Under Observation", "nameAr": "تحت المراقبة" },
      { "id": "standby", "nameEn": "Standby", "nameAr": "في وضع الاستعداد" }
    ],
    "DOWN": [
      { "id": "breakdown", "nameEn": "Breakdown", "nameAr": "عطل" },
      { "id": "waiting_parts", "nameEn": "Waiting for Parts", "nameAr": "في انتظار قطع الغيار" },
      { "id": "scheduled_maintenance", "nameEn": "Scheduled Maintenance", "nameAr": "صيانة مجدولة" }
    ]
  }
}
```

### 9.3 Filtering

Users can filter by:
1. **Core status only**: "Show me all DOWN assets"
2. **Specific reason**: "Show me assets that are DOWN because of Waiting for Parts"
3. **Combination**: Dashboard shows DOWN count, drill down shows breakdown by reason

### 9.4 Benefits

| Aspect | Benefit |
|--------|---------|
| **Simplicity** | Only 2 core statuses to handle in code |
| **Flexibility** | Factories define their own reasons |
| **Filtering** | Both coarse (RUNNING/DOWN) and fine (specific reason) filtering |
| **Colors** | Green for RUNNING, Red for DOWN - no ambiguity |
| **Analytics** | Can compare across factories at core status level |

### 9.5 Other Enums (Unchanged)

```prisma
// Work order status - standard, no customization needed
enum WorkOrderStatus {
  OPEN
  IN_PROGRESS
  WAITING
  CLOSED
}

// Priority - standard
enum WorkOrderPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

// Maintenance type - standard industry terms
enum MaintenanceType {
  CORRECTIVE    // Reactive - fix after failure
  PREVENTIVE    // Scheduled - prevent failure
  PREDICTIVE    // Condition-based - fix before failure
  INSPECTION    // Check/audit - no repair
}
```

**Note**: Maintenance disciplines (Electrical, Mechanical, etc.) remain fully configurable per factory since they vary significantly by industry.

---

## 10. Pitfalls & Improvements (Maintenance Engineer Perspective)

### 10.1 Critical Missing Features

As a maintenance engineer using this system daily, here's what would frustrate me or cause problems:

#### P1: No Preventive Maintenance Scheduling

**Current Gap**: System only handles reactive work orders. No way to:
- Schedule recurring PM tasks (e.g., "lubricate bearings every 500 hours")
- Generate work orders automatically based on time or usage
- Track PM compliance rates

**Impact**: Engineers lose visibility into scheduled maintenance, leading to:
- Missed PMs → increased breakdowns
- Manual tracking in spreadsheets → defeats purpose of system
- No MTBF improvement over time

**Recommendation**: Add `MaintenanceSchedule` model:
```prisma
model MaintenanceSchedule {
  id              String   @id
  assetId         String
  title           String
  description     String?
  frequency       ScheduleFrequency  // DAILY, WEEKLY, MONTHLY, HOURS_BASED, CYCLES_BASED
  intervalValue   Int                // Every X days/hours/cycles
  lastPerformed   DateTime?
  nextDue         DateTime?
  checklist       Json?              // Steps to perform
  estimatedMinutes Int?
  isActive        Boolean  @default(true)
}
```

#### P2: No Running Hours / Cycle Tracking

**Current Gap**: No way to track equipment usage. Critical for:
- Condition-based maintenance ("replace after 10,000 hours")
- Warranty tracking ("5 years or 20,000 hours")
- Utilization reporting

**Impact**: Can't implement predictive maintenance strategies.

**Recommendation**: Add to Asset model:
```prisma
model Asset {
  // ... existing
  runningHours      Float?    // Total operating hours
  cycles            Int?      // Total cycles (for presses, etc.)
  lastMeterReading  DateTime? // When hours/cycles last updated
}
```

#### P3: No Notifications / Escalation

**Current Gap**: If critical machine goes down, who gets notified? Current flow:
1. Technician creates work order
2. ...silence...
3. Manager checks dashboard hours later

**Impact**: Delayed response to critical issues.

**Recommendation**: Add notification rules:
```prisma
model NotificationRule {
  id              String   @id
  trigger         NotificationTrigger  // WORK_ORDER_CREATED, STATUS_CHANGED, OVERDUE, etc.
  conditions      Json                 // { priority: "CRITICAL", assetCriticality: "HIGH" }
  recipients      String[]             // User IDs or role names
  channels        String[]             // ["email", "whatsapp", "push"]
  escalateAfter   Int?                 // Minutes before escalation
  escalateTo      String[]             // Next level recipients
}
```

#### P4: No Cost Tracking

**Current Gap**: Can't answer "How much did we spend on maintenance this month?"

**Impact**: No ROI visibility, can't justify maintenance budget.

**Recommendation**: Track costs on work orders:
```prisma
model WorkOrder {
  // ... existing
  laborHours        Float?
  laborCostRate     Float?    // Per hour
  partsCost         Float?    // Sum from WorkOrderPart
  externalCost      Float?    // Contractor charges
  totalCost         Float?    // Calculated
}

model WorkOrderPart {
  // ... existing
  unitCost          Float?
  totalCost         Float?    // quantity * unitCost
}
```

#### P5: Parts Inventory Not Integrated

**Current Gap**: Work order says "used 2 bearings" but:
- Doesn't check if parts are in stock before assignment
- Doesn't decrement inventory automatically
- Doesn't trigger reorder alerts

**Impact**: Technicians arrive to find parts unavailable, extending downtime.

**Recommendation**: Enhance Parts model:
```prisma
model Part {
  // ... existing
  quantityOnHand    Int
  reorderPoint      Int       // Alert when below this
  reorderQuantity   Int       // How many to order
  leadTimeDays      Int?      // Expected delivery time
  lastOrderDate     DateTime?
  preferredSupplier String?
}

// On WorkOrderPart creation, decrement Part.quantityOnHand
// If quantityOnHand < reorderPoint, create notification
```

### 10.2 Data Quality Issues

#### P6: "Other" Component Handling

**Current Gap**: Each group has "Other (أخرى)" for unlisted components. When technician selects "Other":
- No tracking of what they actually meant
- No signal to admin to add missing component
- Pattern recognition fails ("Other" appears 50 times with no detail)

**Recommendation**: When "Other" selected:
- Require free-text description field
- Flag for admin review
- After N occurrences of same description, prompt admin to add as component

#### P7: Free-Text Fields Without Structure

**Current Gap**: Root cause, failure mode, symptoms are all free text. Results in:
- "Bearing failure" vs "bearing worn" vs "برنج باظ" = same issue, 3 entries
- Can't aggregate or analyze
- AI can't learn patterns effectively

**Recommendation**: Use dropdowns with "Other + specify" option:
```typescript
// Failure mode selection
<Select options={standardFailureModes} />
{selectedMode === 'OTHER' && <TextInput label="Specify failure mode" />}
```

### 10.3 Workflow Gaps

#### P8: No Distinction: Assigned vs Performed By

**Current Gap**: `assignedToId` tracks who should do work, but if someone else does it:
- No record of actual performer
- Incorrect workload tracking
- Performance metrics wrong

**Current Solution**: We have `performerId` - ensure UI makes distinction clear.

#### P9: No Work Order Templates

**Current Gap**: Common issues require same information every time:
- "Vacuum pump making noise" → always check X, Y, Z
- Repetitive data entry
- Inconsistent quality

**Recommendation**: Add templates:
```prisma
model WorkOrderTemplate {
  id              String   @id
  title           String
  description     String?
  assetId         String?           // Pre-fill asset
  maintenanceType MaintenanceType?
  disciplines     String[]
  checklist       Json?             // Standard steps
  estimatedMinutes Int?
  commonParts     Json?             // Frequently needed parts
}
```

#### P10: No Approval Workflow for High-Cost Repairs

**Current Gap**: Client said "no approval needed" but consider:
- Work order estimates 50,000 EGP in parts
- Should supervisor approve before ordering?
- No audit trail of who authorized expensive repairs

**Recommendation**: Make approval optional but available:
```prisma
model WorkOrder {
  // ... existing
  requiresApproval  Boolean  @default(false)
  approvedById      String?
  approvedAt        DateTime?
  estimatedCost     Float?   // Triggers approval if > threshold
}
```

### 10.4 Reporting & Analytics Gaps

#### P11: No Shift / Time Context

**Current Gap**: Work orders have timestamps but no shift context:
- Issues logged at 3am (night shift) may have different causes
- No shift handover visibility
- Can't analyze performance by shift

**Recommendation**: Add shift tracking:
```prisma
model WorkOrder {
  // ... existing
  shift             String?  // "morning", "evening", "night"
}
```

#### P12: No Downtime Categorization

**Current Gap**: `downtimeDurationMin` captures total downtime but not:
- Planned vs unplanned downtime
- Root cause of downtime (waiting for parts vs diagnosis time vs repair time)

**Recommendation**: Structured downtime tracking:
```prisma
model WorkOrder {
  // ... existing
  diagnosisTimeMin     Int?   // Time to identify problem
  waitingForPartsMin   Int?   // Time waiting for parts
  repairTimeMin        Int?   // Actual repair time
  verificationTimeMin  Int?   // Testing after repair
}
```

### 10.5 User Experience Issues

#### P13: No Quick Actions from Asset View

**Current Gap**: Viewing an asset, want to quickly:
- Log an issue (create work order)
- Check history
- Start AI chat about this asset

**Recommendation**: Add quick action buttons on asset cards/details.

#### P14: No QR Code / Barcode Support

**Current Gap**: Technician at machine has to:
1. Open app
2. Navigate to asset
3. Search/scroll to find correct one

**Recommendation**: Generate QR codes for assets:
- Scan → immediately opens asset page
- Print QR labels for machines
- Works offline with cached asset data

#### P15: Mobile Experience Critical

**Current Gap**: Technicians are on factory floor with phones, not desks with computers.

**Recommendation**: Ensure:
- Touch-friendly inputs (large buttons, no tiny dropdowns)
- Offline capability (queue work orders when no connection)
- Photo attachment from camera
- Voice-to-text for descriptions (Arabic support)

### 10.6 Summary: Priority Improvements

| Priority | Feature | Impact | Effort |
|----------|---------|--------|--------|
| **Must Have** | Standardized enums with custom labels | Data quality, analytics | Low |
| **Must Have** | Cost tracking | Business justification | Medium |
| **Should Have** | Notifications/escalation | Response time | Medium |
| **Should Have** | Parts inventory integration | Reduce waiting time | Medium |
| **Should Have** | PM scheduling | Preventive strategy | High |
| **Nice to Have** | Work order templates | Data entry speed | Low |
| **Nice to Have** | QR codes | Mobile UX | Low |
| **Future** | Running hours tracking | Predictive maintenance | Medium |
| **Future** | Shift tracking | Advanced analytics | Low |

---

## 11. Data Model Changes

### 11.1 Summary of Schema Changes

**New Models:**
- `Asset` - Replaces Machine with hierarchical structure
- `FactoryConfig` - Factory-specific configuration

**Modified Models:**
- `WorkOrder` - New fields for timestamps, disciplines, role tracking
- `Document` - Multi-level association support

**Deprecated Models:**
- `Machine` - Replaced by Asset (clean slate, no migration needed)

### 11.2 Migration Path

Since this is a clean slate:
1. Create new models
2. Deploy to production
3. Admin creates asset hierarchy
4. System is ready for use

---

## 12. UI/UX Specifications

### 12.1 Asset Management (Admin)

**Asset List View:**
- Tree view showing full hierarchy
- Expand/collapse nodes
- Search by English or Arabic name
- Filter by level type
- Status indicators

**Create Asset Form:**
- Parent selector (cascading dropdowns)
- English name (required)
- Arabic name (optional)
- Code (optional)
- Level type (from factory config)
- Status
- Criticality
- Additional attributes (JSON form)

### 12.2 Work Order Creation

**Asset Selection:**
- Cascading dropdowns: Machine → Group → Component
- Each level optional after machine
- Display names in user's language
- Show asset code alongside name

**Form Layout:**
- Follows paper form structure
- Grouped sections with headers
- Timestamps with auto-fill + edit capability
- Multi-select for disciplines
- Single-select for type
- Part picker with quantity and auto-calculated cost

### 12.3 Work Order Print

- Browser print (Ctrl+P / Cmd+P)
- Print stylesheet that matches paper form layout
- All fields visible
- Company logo
- QR code linking to digital version (future)

### 12.4 MetralisAI Chat

- Machine/Asset selector at top
- Cascading selection like work orders
- Chat interface with RTL support for Arabic
- Citations to documents
- Structured answers (causes, steps)
- Feedback buttons

### 12.5 Language Switching

- All UI labels from i18n files
- Asset names displayed in user's language
- Work order content stored as-entered (not translated)
- AI responds in user's language

---

## Appendix A: Food Basket Specific Configuration

```json
{
  "hierarchyLevels": [
    { "depth": 0, "keyEn": "machine", "nameEn": "Machine", "nameAr": "الماكينة" },
    { "depth": 1, "keyEn": "group", "nameEn": "Group", "nameAr": "المجموعة" },
    { "depth": 2, "keyEn": "component", "nameEn": "Component", "nameAr": "المكون" }
  ],
  "defaultMaxDepth": 3,
  "statusReasonOptions": {
    "RUNNING": [
      { "id": "operational", "nameEn": "Operational", "nameAr": "يعمل" },
      { "id": "under_observation", "nameEn": "Under Observation", "nameAr": "تحت المراقبة" },
      { "id": "standby", "nameEn": "Standby", "nameAr": "في وضع الاستعداد" }
    ],
    "DOWN": [
      { "id": "breakdown", "nameEn": "Breakdown", "nameAr": "عطل" },
      { "id": "waiting_parts", "nameEn": "Waiting for Parts", "nameAr": "في انتظار قطع الغيار" },
      { "id": "scheduled_maintenance", "nameEn": "Scheduled Maintenance", "nameAr": "صيانة مجدولة" },
      { "id": "under_repair", "nameEn": "Under Repair", "nameAr": "تحت الإصلاح" }
    ]
  },
  "maintenanceDisciplines": [
    { "id": "electrical", "nameEn": "Electrical", "nameAr": "كهربى" },
    { "id": "mechanical", "nameEn": "Mechanical", "nameAr": "ميكانيكى" },
    { "id": "hydropneumatic", "nameEn": "Hydro-pneumatic", "nameAr": "هيدرونيوماتيك" }
  ],
  "maintenanceTypes": [
    { "id": "planned", "nameEn": "Planned", "nameAr": "مخطط" },
    { "id": "predictive", "nameEn": "Predictive", "nameAr": "تنبؤية" },
    { "id": "corrective", "nameEn": "Corrective", "nameAr": "علاجى" }
  ]
}
```

---

## Appendix B: Sample Asset Data (Partial)

```json
[
  {
    "nameEn": "Freeze Dryer",
    "nameAr": "خط التجفيد",
    "code": null,
    "levelType": "machine",
    "children": [
      {
        "nameEn": "Vacuum System",
        "nameAr": "خط الفاكيوم",
        "code": null,
        "levelType": "group",
        "children": [
          {
            "nameEn": "Booster pump D1G02",
            "nameAr": "طلمبة بوستر",
            "code": "D1G02",
            "levelType": "component"
          },
          {
            "nameEn": "Vacuum pump D1G03",
            "nameAr": "طلمبة فاكيوم 1",
            "code": "D1G03",
            "levelType": "component"
          }
        ]
      }
    ]
  }
]
```

---

## Next Steps

1. **Review this document** - Confirm all requirements are captured correctly
2. **Create detailed specs** for each feature area:
   - Spec 1: Hierarchical Asset System
   - Spec 2: Work Order Form Redesign
   - Spec 3: MetralisAI Arabic Support
   - Spec 4: Document Association System
   - Spec 5: Analytics Dashboard
3. **Prioritize features** - Determine implementation order
Here is my order: 
   - Spec 1: Hierarchical Asset System
   - Spec 2: Work Order Form Redesign
   - Spec 4: Document Association System
   - Spec 3: MetralisAI Arabic Support
   - Spec 5: Analytics Dashboard
4. **Begin implementation** - Start with foundation (Asset model)

---

*Document End*
