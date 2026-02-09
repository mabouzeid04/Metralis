# Spec 7: Scheduled Maintenance (Preventive Maintenance)

**Status**: Draft
**Dependencies**: Spec 1 (Assets), Spec 2 (Work Orders)
**Blocked By**: None
**Blocks**: Spec 6 (Operations Dashboard - "Today's Schedule" panel)

---

## Executive Summary (One-Pager)

### The Problem

Currently, preventive maintenance (PM) is managed manually:
1. Supervisor remembers or tracks PM schedules in spreadsheets
2. Manually creates work orders when PM is due
3. No visibility into upcoming maintenance
4. Easy to miss scheduled maintenance, leading to equipment failures

### The Solution

A **Scheduled Maintenance** system that:
1. Allows defining PM schedules per machine (e.g., "Every Monday", "First of each month")
2. Automatically creates work orders when PM is due
3. Notifies assigned personnel
4. Provides calendar visibility of upcoming maintenance

### How It Works

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SCHEDULED MAINTENANCE                           │
│                                                                         │
│  1. DEFINE SCHEDULE                                                     │
│     ┌─────────────────────────────────────────────────────────────┐     │
│     │  Machine: CNC-003                                           │     │
│     │  Task: Weekly Lubrication                                   │     │
│     │  Schedule: Every Monday at 8:00 AM                          │     │
│     │  Assigned to: Ahmed M.                                      │     │
│     │  Estimated duration: 30 min                                 │     │
│     └─────────────────────────────────────────────────────────────┘     │
│                                    ↓                                    │
│  2. SYSTEM AUTO-GENERATES                                               │
│     ┌─────────────────────────────────────────────────────────────┐     │
│     │  Work Order: WO-1234                                        │     │
│     │  Title: [PM] Weekly Lubrication - CNC-003                   │     │
│     │  Due Date: Monday, Feb 3, 2025 at 8:00 AM                   │     │
│     │  Auto-assigned to: Ahmed M.                                 │     │
│     │  Status: OPEN                                               │     │
│     └─────────────────────────────────────────────────────────────┘     │
│                                    ↓                                    │
│  3. NOTIFICATION SENT                                                   │
│     ┌─────────────────────────────────────────────────────────────┐     │
│     │  📧 Ahmed, you have a scheduled PM due:                     │     │
│     │  "Weekly Lubrication - CNC-003" - Monday 8:00 AM            │     │
│     └─────────────────────────────────────────────────────────────┘     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Features

| Feature | Description |
|---------|-------------|
| **Calendar-based scheduling** | Every Monday, 1st of month, every 2 weeks, etc. |
| **Per-machine configuration** | Each machine has its own PM schedules |
| **Auto work order creation** | System creates WO automatically when due |
| **Notifications** | Assignee notified when PM work order is created |
| **Upcoming view** | See what PMs are coming in the next 7/30 days |
| **Skip/reschedule** | Ability to skip an occurrence or reschedule |

### What We're NOT Building (v1)

- Usage-based triggers (runtime hours, cycles) - requires machine integration
- PM templates by machine type (each machine configured individually)
- Approval workflows for PM completion
- Parts auto-reservation for scheduled PMs

### Success Metrics

- 100% of scheduled PMs have work orders created automatically
- Zero missed PMs due to "forgetting"
- Supervisors can see upcoming week's PM workload

---

## 1. Feature Location & Navigation

### 1.1 Where It Lives

The Scheduled Maintenance feature is accessed via a **new sidebar navigation item** called "Maintenance" (or "Scheduled PM"):

```
┌─────────────────────────────────────┐
│  [Metralis Logo]                    │
├─────────────────────────────────────┤
│                                     │
│  📊 Dashboard                       │
│  🔧 Assets                          │
│  📋 Work Orders                     │
│  🗓️ Maintenance    ← NEW ITEM       │
│  📦 Parts                           │
│  📄 Documents                       │
│  🤖 AI                              │
│                                     │
├─────────────────────────────────────┤
│  📈 Admin Analytics (admin only)    │
│  👥 Access Management (admin only)  │
│  ⚙️ Settings                        │
└─────────────────────────────────────┘
```

**Icon**: `Calendar` or `CalendarClock` from lucide-react
**Route**: `/maintenance`
**i18n key**: `nav.maintenance` → "Maintenance" / "الصيانة المجدولة"

### 1.2 Page Structure

The Maintenance section has **two views** accessible via tabs:

| Route | View | Description |
|-------|------|-------------|
| `/maintenance` | Schedules List | Table of all PM schedules (default) |
| `/maintenance?view=calendar` | Calendar View | Monthly calendar showing upcoming PMs |

### 1.3 User Flow: Creating a Schedule

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          USER JOURNEY: Create a PM Schedule                 │
└─────────────────────────────────────────────────────────────────────────────┘

Step 1: User clicks "Maintenance" in sidebar
        ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  MAINTENANCE                                                                │
│  ┌──────────────┬─────────────────┐                    [+ Add Schedule]     │
│  │ 📋 Schedules │ 📅 Calendar     │                                         │
│  └──────────────┴─────────────────┘                                         │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Machine      │ Task               │ Schedule     │ Next Due │ Status │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ (empty state: "No schedules yet. Create your first schedule.")      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘

Step 2: User clicks "+ Add Schedule" button (top right)
        ↓
        A slide-over panel opens from the right (similar to work order creation)

Step 3: User fills out the form
        ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                              CREATE MAINTENANCE SCHEDULE [X]│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MACHINE *                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search machines...                                            ▼  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│    Dropdown shows: CNC-001, CNC-002, CONV-01, HYD-001, etc.                │
│                                                                             │
│  TASK NAME *                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ e.g., "Weekly Lubrication", "Monthly Filter Replacement"            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  DESCRIPTION (optional)                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Step-by-step instructions for the technician...                     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ───────────────────────────────────────────────────────────────────────   │
│                                                                             │
│  SCHEDULE *                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  How often should this maintenance occur?                           │   │
│  │                                                                     │   │
│  │  ○ Daily                                                            │   │
│  │  ● Weekly         [Monday ▼]                                        │   │
│  │  ○ Every 2 Weeks                                                    │   │
│  │  ○ Monthly        [1st ▼] of the month  OR  [1st ▼] [Monday ▼]     │   │
│  │  ○ Quarterly                                                        │   │
│  │  ○ Yearly                                                           │   │
│  │  ○ Custom         Every [__] days                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  START TIME (optional)                                                      │
│  ┌───────────────┐                                                          │
│  │ 08:00 AM   ▼  │  ← When the work order should be due                     │
│  └───────────────┘                                                          │
│                                                                             │
│  ───────────────────────────────────────────────────────────────────────   │
│                                                                             │
│  ASSIGN TO                              PRIORITY                            │
│  ┌─────────────────────────┐            ┌─────────────────────────┐        │
│  │ Ahmed M.             ▼  │            │ Medium               ▼  │        │
│  └─────────────────────────┘            └─────────────────────────┘        │
│                                                                             │
│  ESTIMATED DURATION                                                         │
│  ┌───────────────┐                                                          │
│  │ 30          ▼ │ minutes                                                  │
│  └───────────────┘                                                          │
│                                                                             │
│  ───────────────────────────────────────────────────────────────────────   │
│                                                                             │
│  NOTIFICATIONS                                                              │
│  ☑ Notify assignee when work order is created                              │
│  ☑ Send reminder  [1 ▼]  day(s) before due date                            │
│                                                                             │
│  ───────────────────────────────────────────────────────────────────────   │
│                                                                             │
│  PREVIEW                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  📅 Next 3 occurrences:                                             │   │
│  │     • Monday, Feb 3, 2025 at 8:00 AM                                │   │
│  │     • Monday, Feb 10, 2025 at 8:00 AM                               │   │
│  │     • Monday, Feb 17, 2025 at 8:00 AM                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                                           [Cancel]   [Create Schedule]      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Step 4: User clicks "Create Schedule"
        ↓
        - Schedule is saved to database
        - Toast notification: "Schedule created successfully"
        - Panel closes
        - Table refreshes to show new schedule

Step 5: System automatically creates work orders when due
        ↓
        - At the scheduled time, a work order appears in the Work Orders list
        - Title format: "[PM] Weekly Lubrication - CNC-003"
        - Assignee receives notification
```

### 1.4 User Flow: Viewing the Calendar

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MAINTENANCE                                                                │
│  ┌──────────────┬─────────────────┐                    [+ Add Schedule]     │
│  │ 📋 Schedules │ 📅 Calendar     │  ← User clicks Calendar tab            │
│  └──────────────┴─────────────────┘                                         │
│                                                                             │
│                        ◀  February 2025  ▶                                  │
│                                                                             │
│  ┌───────┬───────┬───────┬───────┬───────┬───────┬───────┐                 │
│  │  Sun  │  Mon  │  Tue  │  Wed  │  Thu  │  Fri  │  Sat  │                 │
│  ├───────┼───────┼───────┼───────┼───────┼───────┼───────┤                 │
│  │       │       │       │       │       │       │   1   │                 │
│  │       │       │       │       │       │       │  🔵🔵 │ ← 2 PMs         │
│  ├───────┼───────┼───────┼───────┼───────┼───────┼───────┤                 │
│  │   2   │   3   │   4   │   5   │   6   │   7   │   8   │                 │
│  │       │ 🔵🔵🔵│       │       │  🔵  │       │       │                 │
│  ├───────┼───────┼───────┼───────┼───────┼───────┼───────┤                 │
│  │   9   │  10   │  11   │  12   │  13   │  14   │  15   │                 │
│  │       │  🔵🔵 │       │       │  🔵  │       │🔵🔵🔵🔵│                 │
│  └───────┴───────┴───────┴───────┴───────┴───────┴───────┘                 │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  📅 February 3, 2025 (Monday)                              3 scheduled PMs  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🔵  08:00 AM  │  Weekly Lubrication       │  CNC-003  │  Ahmed M.   │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  🔵  09:00 AM  │  Belt Tension Check       │  CONV-02  │  Sarah K.   │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  🔵  10:00 AM  │  Hydraulic Pressure Test  │  HYD-001  │  Unassigned │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Click on a PM to view/edit the schedule                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.5 How Auto-Generated Work Orders Appear

When a schedule is due, the system creates a work order that appears in the **Work Orders** list:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  WORK ORDERS                                                                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ID      │ Title                          │ Asset   │ Status │ Due   │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ WO-1234 │ 🗓️ [PM] Weekly Lubrication     │ CNC-003 │ OPEN   │ Feb 3 │   │
│  │ WO-1233 │ Fix hydraulic leak             │ HYD-001 │ IN_PRO │ Feb 2 │   │
│  │ WO-1232 │ Replace worn belt              │ CONV-02 │ DONE   │ Feb 1 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  🗓️ = Automatically generated from Scheduled Maintenance                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Visual Indicators for PM Work Orders:**
- Title prefix: `[PM]`
- Optional icon: 🗓️ calendar icon
- Badge: "Scheduled" or "Preventive"

### 1.6 Alternative Entry Point: Asset Detail Page

Users can also create schedules directly from an **Asset's detail page**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ASSET: CNC-003 - CNC Milling Machine                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────────┐         │
│  │ Overview    │ Work Orders │ Documents   │ Scheduled Maint.    │         │
│  └─────────────┴─────────────┴─────────────┴─────────────────────┘         │
│                                             ↑ NEW TAB                       │
│                                                                             │
│  SCHEDULED MAINTENANCE FOR CNC-003                     [+ Add Schedule]     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Task                    │ Schedule       │ Next Due  │ Assignee     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ Weekly Lubrication      │ Every Monday   │ Feb 3     │ Ahmed M.     │   │
│  │ Monthly Inspection      │ 1st of month   │ Mar 1     │ Sarah K.     │   │
│  │ Quarterly Calibration   │ Quarterly      │ Apr 1     │ Unassigned   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

This allows supervisors to see all PM schedules for a specific machine in one place.

---

## 2. Data Model

### 2.1 MaintenanceSchedule Table

```prisma
model MaintenanceSchedule {
  id              String    @id @default(cuid())
  factoryId       String
  factory         Factory   @relation(fields: [factoryId], references: [id])

  // What machine
  assetId         String
  asset           Asset     @relation(fields: [assetId], references: [id])

  // What task
  title           String                    // "Weekly Lubrication"
  description     String?   @db.Text        // Detailed instructions

  // Schedule definition
  scheduleType    ScheduleType              // WEEKLY, MONTHLY, CUSTOM
  scheduleConfig  Json                      // Detailed schedule config

  // Assignment
  assigneeId      String?
  assignee        User?     @relation(fields: [assigneeId], references: [id])

  // Work order template
  priority        Priority  @default(MEDIUM)
  estimatedMinutes Int?
  maintenanceType String    @default("preventive")

  // Notification settings
  notifyOnCreate  Boolean   @default(true)
  advanceNoticeDays Int     @default(1)     // Notify X days before due

  // Status
  isActive        Boolean   @default(true)

  // Tracking
  lastGeneratedAt DateTime?                  // Last time WO was generated
  nextDueAt       DateTime?                  // Next scheduled occurrence

  // Audit
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  createdById     String?
  createdBy       User?     @relation("ScheduleCreatedBy", fields: [createdById], references: [id])

  // Relations
  generatedWorkOrders WorkOrder[]           // WOs created from this schedule

  @@index([factoryId])
  @@index([assetId])
  @@index([nextDueAt])
  @@index([isActive])
}

enum ScheduleType {
  DAILY
  WEEKLY
  BIWEEKLY
  MONTHLY
  QUARTERLY
  YEARLY
  CUSTOM
}
```

### 2.2 Schedule Configuration Examples

```typescript
// WEEKLY - Every Monday
{
  type: "WEEKLY",
  dayOfWeek: 1,           // 0=Sunday, 1=Monday, etc.
  time: "08:00"           // Optional specific time
}

// WEEKLY - Multiple days
{
  type: "WEEKLY",
  daysOfWeek: [1, 4],     // Monday and Thursday
  time: "08:00"
}

// MONTHLY - First Monday of each month
{
  type: "MONTHLY",
  weekOfMonth: 1,         // 1st week
  dayOfWeek: 1,           // Monday
  time: "08:00"
}

// MONTHLY - Specific date
{
  type: "MONTHLY",
  dayOfMonth: 15,         // 15th of each month
  time: "08:00"
}

// QUARTERLY
{
  type: "QUARTERLY",
  monthsOfYear: [1, 4, 7, 10],  // Jan, Apr, Jul, Oct
  dayOfMonth: 1,
  time: "08:00"
}

// YEARLY - Annual inspection
{
  type: "YEARLY",
  month: 6,               // June
  dayOfMonth: 1,
  time: "08:00"
}

// CUSTOM - Every X days
{
  type: "CUSTOM",
  intervalDays: 14,       // Every 14 days
  time: "08:00"
}
```

### 2.3 WorkOrder Additions

```prisma
model WorkOrder {
  // ... existing fields ...

  // Link to schedule (if auto-generated)
  scheduleId      String?
  schedule        MaintenanceSchedule? @relation(fields: [scheduleId], references: [id])

  // Flag for PM work orders
  isScheduledPM   Boolean   @default(false)
}
```

---

## 3. Schedule Management UI

### 3.1 Scheduled Maintenance List Page

**Route**: `/maintenance/schedules`

```
┌─────────────────────────────────────────────────────────────────────────┐
│  SCHEDULED MAINTENANCE                              [+ Add Schedule]    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Filters: [All Machines ▼] [All Status ▼] [Search...]                  │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ Machine     │ Task                │ Schedule      │ Next Due │ ⚙️  │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │ CNC-003     │ Weekly Lubrication  │ Every Monday  │ Feb 3    │ ··· │ │
│  │ CNC-003     │ Monthly Inspection  │ 1st of month  │ Mar 1    │ ··· │ │
│  │ CONV-02     │ Belt Tension Check  │ Every 2 weeks │ Feb 10   │ ··· │ │
│  │ HYD-001     │ Oil Change          │ Quarterly     │ Apr 1    │ ··· │ │
│  │ PKG-001     │ Safety Inspection   │ Monthly       │ Feb 15   │ ··· │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Showing 5 of 12 schedules                              [Load More]     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Create/Edit Schedule Form

```
┌─────────────────────────────────────────────────────────────────────────┐
│  CREATE MAINTENANCE SCHEDULE                                    [X]     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Machine *                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ [Select machine...]                                         ▼   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Task Name *                                                            │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Weekly Lubrication                                              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Description                                                            │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Lubricate all moving parts according to maintenance manual...  │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  Schedule *                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ○ Daily                                                         │   │
│  │ ● Weekly    → [Monday ▼]                                        │   │
│  │ ○ Bi-weekly                                                     │   │
│  │ ○ Monthly   → [1st ▼] [Monday ▼] OR [Day ▼] [15 ▼]             │   │
│  │ ○ Quarterly                                                     │   │
│  │ ○ Yearly                                                        │   │
│  │ ○ Custom    → Every [14] days                                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Time (optional)                                                        │
│  ┌───────────────┐                                                      │
│  │ 08:00 AM      │                                                      │
│  └───────────────┘                                                      │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  Assign To                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ [Select technician...]                                      ▼   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Priority                     Estimated Duration                        │
│  ┌───────────────────┐        ┌───────────────────┐                     │
│  │ [Medium ▼]        │        │ [30] minutes      │                     │
│  └───────────────────┘        └───────────────────┘                     │
│                                                                         │
│  ☑ Notify assignee when work order is created                          │
│  ☑ Send reminder [1] day(s) before due date                            │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│                                          [Cancel]  [Save Schedule]      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Upcoming Schedule Calendar View

**Route**: `/maintenance/schedules/calendar`

```
┌─────────────────────────────────────────────────────────────────────────┐
│  UPCOMING MAINTENANCE                    [List View] [Calendar View]    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ◀ February 2025 ▶                                                      │
│                                                                         │
│  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐                           │
│  │ Sun │ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │                           │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                           │
│  │     │     │     │     │     │     │  1  │                           │
│  │     │     │     │     │     │     │ ●●  │  ← 2 PMs scheduled        │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                           │
│  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │                           │
│  │     │ ●●● │     │     │ ●   │     │     │                           │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                           │
│  │  9  │ 10  │ 11  │ 12  │ 13  │ 14  │ 15  │                           │
│  │     │ ●●  │     │     │ ●   │     │ ●●●●│                           │
│  └─────┴─────┴─────┴─────┴─────┴─────┴─────┘                           │
│                                                                         │
│  Selected: Feb 3 (Monday)                                               │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ ● CNC-003 - Weekly Lubrication          8:00 AM    Ahmed M.       │ │
│  │ ● CONV-02 - Belt Check                  9:00 AM    Sarah K.       │ │
│  │ ● HYD-001 - Pressure Test               10:00 AM   Unassigned     │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Automatic Work Order Generation

### 4.1 Generation Logic

```typescript
// services/scheduledMaintenanceService.ts

/**
 * Runs periodically (cron job) to generate work orders for due schedules.
 * Should run at least once per day, ideally every hour.
 */
export async function generateScheduledWorkOrders() {
  const now = new Date();

  // Find all active schedules where nextDueAt is in the past or today
  const dueSchedules = await prisma.maintenanceSchedule.findMany({
    where: {
      isActive: true,
      nextDueAt: { lte: endOfDay(now) }
    },
    include: {
      asset: true,
      assignee: true,
      factory: true
    }
  });

  for (const schedule of dueSchedules) {
    // Check if work order already exists for this occurrence
    const existingWO = await prisma.workOrder.findFirst({
      where: {
        scheduleId: schedule.id,
        dueDate: schedule.nextDueAt
      }
    });

    if (existingWO) {
      // Already generated, skip
      continue;
    }

    // Create work order
    const workOrder = await prisma.workOrder.create({
      data: {
        factoryId: schedule.factoryId,
        assetId: schedule.assetId,
        title: `[PM] ${schedule.title} - ${schedule.asset.code}`,
        description: schedule.description,
        priority: schedule.priority,
        status: 'OPEN',
        maintenanceType: schedule.maintenanceType,
        performerId: schedule.assigneeId,
        dueDate: schedule.nextDueAt,
        scheduleId: schedule.id,
        isScheduledPM: true,
        // Generate public ID
        publicId: await generateNextPublicId(schedule.factoryId)
      }
    });

    // Calculate next occurrence
    const nextDueAt = calculateNextOccurrence(schedule);

    // Update schedule
    await prisma.maintenanceSchedule.update({
      where: { id: schedule.id },
      data: {
        lastGeneratedAt: now,
        nextDueAt: nextDueAt
      }
    });

    // Send notification if enabled
    if (schedule.notifyOnCreate && schedule.assigneeId) {
      await sendPMNotification(schedule, workOrder);
    }
  }
}
```

### 4.2 Next Occurrence Calculation

```typescript
// utils/scheduleCalculator.ts

import { addDays, addWeeks, addMonths, addYears, setDay, setDate, getDay, getDate } from 'date-fns';

export function calculateNextOccurrence(schedule: MaintenanceSchedule): Date {
  const config = schedule.scheduleConfig as ScheduleConfig;
  const lastDue = schedule.nextDueAt || new Date();

  switch (schedule.scheduleType) {
    case 'DAILY':
      return addDays(lastDue, 1);

    case 'WEEKLY':
      return addWeeks(lastDue, 1);

    case 'BIWEEKLY':
      return addWeeks(lastDue, 2);

    case 'MONTHLY':
      if (config.dayOfMonth) {
        // Specific day of month (e.g., 15th)
        let next = addMonths(lastDue, 1);
        return setDate(next, config.dayOfMonth);
      } else if (config.weekOfMonth && config.dayOfWeek !== undefined) {
        // Nth weekday of month (e.g., 1st Monday)
        return getNthWeekdayOfMonth(
          addMonths(lastDue, 1),
          config.weekOfMonth,
          config.dayOfWeek
        );
      }
      return addMonths(lastDue, 1);

    case 'QUARTERLY':
      return addMonths(lastDue, 3);

    case 'YEARLY':
      return addYears(lastDue, 1);

    case 'CUSTOM':
      return addDays(lastDue, config.intervalDays || 7);

    default:
      return addDays(lastDue, 7);
  }
}

function getNthWeekdayOfMonth(date: Date, weekNum: number, dayOfWeek: number): Date {
  // Get first day of the month
  const firstOfMonth = setDate(date, 1);
  const firstDayOfWeek = getDay(firstOfMonth);

  // Calculate days until target weekday
  let daysUntilTarget = dayOfWeek - firstDayOfWeek;
  if (daysUntilTarget < 0) daysUntilTarget += 7;

  // Calculate date of Nth occurrence
  const targetDate = 1 + daysUntilTarget + (weekNum - 1) * 7;

  return setDate(date, targetDate);
}
```

### 4.3 Cron Job Setup

```typescript
// jobs/scheduledMaintenanceJob.ts

import cron from 'node-cron';
import { generateScheduledWorkOrders } from '../services/scheduledMaintenanceService';

// Run every hour at minute 0
cron.schedule('0 * * * *', async () => {
  console.log('Running scheduled maintenance job...');
  try {
    await generateScheduledWorkOrders();
    console.log('Scheduled maintenance job completed');
  } catch (error) {
    console.error('Scheduled maintenance job failed:', error);
  }
});

// Alternative: Run daily at 6 AM
// cron.schedule('0 6 * * *', async () => { ... });
```

---

## 5. API Endpoints

### 5.1 Schedule CRUD

```typescript
// GET /api/maintenance/schedules
// List all schedules with filtering
interface ListSchedulesQuery {
  assetId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

// GET /api/maintenance/schedules/:id
// Get single schedule details

// POST /api/maintenance/schedules
// Create new schedule
interface CreateScheduleBody {
  assetId: string;
  title: string;
  description?: string;
  scheduleType: ScheduleType;
  scheduleConfig: ScheduleConfig;
  assigneeId?: string;
  priority?: Priority;
  estimatedMinutes?: number;
  notifyOnCreate?: boolean;
  advanceNoticeDays?: number;
}

// PUT /api/maintenance/schedules/:id
// Update schedule

// DELETE /api/maintenance/schedules/:id
// Delete schedule (soft delete - set isActive = false)

// POST /api/maintenance/schedules/:id/pause
// Pause schedule (isActive = false)

// POST /api/maintenance/schedules/:id/resume
// Resume schedule (isActive = true, recalculate nextDueAt)
```

### 5.2 Upcoming Maintenance

```typescript
// GET /api/maintenance/upcoming
// Get upcoming scheduled maintenance
interface UpcomingQuery {
  days?: number;      // Default 30
  assetId?: string;
}

interface UpcomingResponse {
  items: Array<{
    date: string;
    schedules: Array<{
      id: string;
      title: string;
      assetId: string;
      assetCode: string;
      assetName: string;
      assigneeName?: string;
      time?: string;
    }>;
  }>;
}
```

### 5.3 Skip Occurrence

```typescript
// POST /api/maintenance/schedules/:id/skip
// Skip the next occurrence
interface SkipBody {
  reason?: string;
}

// This will:
// 1. Record that this occurrence was skipped
// 2. Calculate and set the next occurrence
// 3. NOT generate a work order for the skipped date
```

---

## 6. Notifications

### 6.1 Notification Types

| Event | Recipient | Channel | Timing |
|-------|-----------|---------|--------|
| PM Work Order Created | Assignee | In-app, Email | Immediately |
| PM Due Tomorrow | Assignee | In-app | Day before |
| PM Overdue | Assignee + Supervisor | In-app, Email | Day after due |

### 6.2 Notification Templates

**Work Order Created**:
```
Subject: [PM] Scheduled Maintenance Due: {task_name}

Hi {assignee_name},

A scheduled preventive maintenance task has been created and assigned to you:

Task: {task_name}
Machine: {machine_name} ({machine_code})
Due: {due_date}
Priority: {priority}

{description}

[View Work Order]
```

**Reminder**:
```
Subject: Reminder: PM Due Tomorrow - {task_name}

Hi {assignee_name},

This is a reminder that you have a scheduled maintenance task due tomorrow:

Task: {task_name}
Machine: {machine_name}
Due: {due_date}

[View Work Order]
```

---

## 7. Localization

```json
{
  "scheduledMaintenance": {
    "title": "Scheduled Maintenance",
    "addSchedule": "Add Schedule",
    "editSchedule": "Edit Schedule",
    "form": {
      "machine": "Machine",
      "taskName": "Task Name",
      "description": "Description",
      "schedule": "Schedule",
      "time": "Time",
      "assignTo": "Assign To",
      "priority": "Priority",
      "estimatedDuration": "Estimated Duration",
      "notifyAssignee": "Notify assignee when work order is created",
      "sendReminder": "Send reminder {days} day(s) before due date"
    },
    "scheduleTypes": {
      "daily": "Daily",
      "weekly": "Weekly",
      "biweekly": "Every 2 Weeks",
      "monthly": "Monthly",
      "quarterly": "Quarterly",
      "yearly": "Yearly",
      "custom": "Custom Interval"
    },
    "scheduleDescriptions": {
      "everyDay": "Every day",
      "everyWeekday": "Every {day}",
      "everyNWeeks": "Every {n} weeks on {day}",
      "monthlyOnDate": "Monthly on the {date}",
      "monthlyOnWeekday": "{ordinal} {day} of each month",
      "quarterly": "Quarterly",
      "yearly": "Yearly on {month} {date}",
      "everyNDays": "Every {n} days"
    },
    "table": {
      "machine": "Machine",
      "task": "Task",
      "schedule": "Schedule",
      "nextDue": "Next Due",
      "assignee": "Assignee",
      "status": "Status"
    },
    "status": {
      "active": "Active",
      "paused": "Paused"
    },
    "actions": {
      "pause": "Pause",
      "resume": "Resume",
      "skip": "Skip Next",
      "delete": "Delete"
    },
    "upcoming": {
      "title": "Upcoming Maintenance",
      "noUpcoming": "No scheduled maintenance in the next {days} days",
      "calendarView": "Calendar View",
      "listView": "List View"
    },
    "notifications": {
      "workOrderCreated": "PM work order created: {title}",
      "dueTomorrow": "Scheduled maintenance due tomorrow: {title}",
      "overdue": "Scheduled maintenance overdue: {title}"
    }
  }
}
```

---

## 8. Implementation Order

### Phase 1: Core (MVP)
1. Database schema (MaintenanceSchedule table)
2. CRUD API endpoints
3. Schedule list page
4. Create/edit schedule form
5. Basic work order generation (manual trigger for testing)

### Phase 2: Automation
6. Cron job for automatic WO generation
7. Next occurrence calculation
8. Notifications (in-app only)

### Phase 3: Enhanced UX
9. Calendar view
10. Skip occurrence feature
11. Email notifications
12. Integration with Operations Dashboard (Spec 6)

---

## 9. Testing Checklist

### Unit Tests
- [ ] Next occurrence calculation for all schedule types
- [ ] Nth weekday of month calculation
- [ ] Edge cases: end of month, leap year, etc.

### Integration Tests
- [ ] Schedule CRUD operations
- [ ] Work order generation creates correct WO
- [ ] Skipping occurrence updates next due date
- [ ] Pause/resume works correctly

### E2E Tests
- [ ] Create schedule and verify next due date
- [ ] Trigger generation and verify WO created
- [ ] Calendar view shows correct dates
- [ ] Notifications delivered

---

## 10. Future Enhancements (Out of Scope)

1. **Usage-based scheduling** - Trigger based on runtime hours, cycles
2. **Templates by machine type** - Define PM once, apply to all machines of type
3. **Parts auto-reservation** - Reserve parts needed for upcoming PMs
4. **Compliance tracking** - Track PM completion rate for audits
5. **Dynamic scheduling** - Adjust frequency based on failure history
6. **Bulk operations** - Pause/resume multiple schedules at once

---

*End of Spec 7*
