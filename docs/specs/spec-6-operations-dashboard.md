# Spec 6: Operations Dashboard

**Status**: Draft
**Dependencies**: Spec 2 (Work Orders), Spec 1 (Assets)
**Blocked By**: None
**Blocks**: Nothing

---

## Executive Summary (One-Pager)

### The Problem

The current dashboard shows generic metrics (pie charts, empty bar charts, "System Status: Online") that don't help a maintenance supervisor start their day. When you walk onto the floor at 6 AM, you need to know:

1. **What's broken right now?**
2. **What work needs attention today?**
3. **Who's working on what?**

The current dashboard answers none of these questions.

### The Solution

Replace the current dashboard with an **Operations Dashboard** designed for supervisors managing a maintenance team. The dashboard answers the daily operational questions:

| Section | Purpose |
|---------|---------|
| **Alert Banner** | Immediate attention items (machines down, overdue work) |
| **Machines Down** | List of currently down machines with duration |
| **Work Orders Needing Attention** | Overdue, unassigned, or high-priority items |
| **Today's Work** | Scheduled maintenance due today |
| **Recent Activity** | Latest work orders for situational awareness |

### Key Design Principles

1. **Actionable, not informational** - Every item should lead to action
2. **Supervisor view** - Shows all team work, not personal work
3. **Severity-based hierarchy** - Most critical items at the top
4. **One-click navigation** - Click any item to go fix it
5. **Real-time** - Status updates without page refresh

### What We're NOT Building

- Personal "my work orders" view (can add later)
- Charts or trends (that's the Analytics page)
- Time-based KPIs like MTTR (that's Analytics)
- Scheduled maintenance management (that's Spec 7)

### Success Metrics

- Supervisor can identify all critical issues within 10 seconds of page load
- Zero clicks required to see what's broken
- Every displayed item is clickable and navigates to the detail view

---

## 1. Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⚠️ ATTENTION: 2 machines down · 3 overdue work orders · 1 unassigned   │  ← Alert Banner (red, only if issues)
└─────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────┐  ┌────────────────────────────────────┐
│  MACHINES DOWN                 │  │  WORK ORDERS NEEDING ATTENTION     │
│  ───────────────────────────── │  │  ────────────────────────────────  │
│                                │  │                                    │
│  🔴 CNC-003                    │  │  Overdue (3)                       │
│     Assembly Line 1            │  │  ├─ WO-1201 · Belt replacement     │
│     Down 2h 34m                │  │  ├─ WO-1199 · Motor inspection     │
│     WO-1234 assigned → Ahmed   │  │  └─ WO-1195 · Lubrication          │
│     [View →]                   │  │                                    │
│                                │  │  Unassigned (1)                    │
│  🔴 PKG-001                    │  │  └─ WO-1230 · PKG-001 belt snap    │
│     Packaging                  │  │                                    │
│     Down 45m                   │  │  High Priority (2)                 │
│     No work order! [Create →]  │  │  ├─ WO-1228 · Compressor failure   │
│                                │  │  └─ WO-1225 · Cooling pump leak    │
│  ───────────────────────────── │  │                                    │
│  ✓ All other machines running  │  │  [View All Work Orders →]          │
│                                │  │                                    │
└────────────────────────────────┘  └────────────────────────────────────┘

┌────────────────────────────────┐  ┌────────────────────────────────────┐
│  TODAY'S SCHEDULE              │  │  TEAM WORKLOAD                     │
│  ───────────────────────────── │  │  ────────────────────────────────  │
│                                │  │                                    │
│  Due Today (4)                 │  │  Ahmed M.        ████████░░  3 WOs │
│  ├─ PM-1234 · Conveyor lube    │  │  Sarah K.        ██████░░░░  2 WOs │
│  ├─ PM-1235 · Filter change    │  │  Omar H.         ████░░░░░░  1 WO  │
│  ├─ PM-1236 · Safety check     │  │  Unassigned      ██░░░░░░░░  1 WO  │
│  └─ PM-1237 · Bearing inspect  │  │                                    │
│                                │  │  [View Team →]                     │
│  [View Full Schedule →]        │  │                                    │
│                                │  │                                    │
└────────────────────────────────┘  └────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  RECENT ACTIVITY                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  ID       │ Asset      │ Title                │ Status      │ Assignee  │
│  ─────────────────────────────────────────────────────────────────────  │
│  WO-1234  │ CNC-003    │ Motor replacement    │ In Progress │ Ahmed M.  │
│  WO-1233  │ CONV-02    │ Weekly lubrication   │ Completed   │ Sarah K.  │
│  WO-1232  │ HYD-001    │ Pressure check       │ Completed   │ Omar H.   │
│  WO-1231  │ CNC-001    │ Tool calibration     │ Waiting     │ Ahmed M.  │
│  WO-1230  │ PKG-001    │ Belt snapped         │ Open        │ -         │
│                                                                          │
│  [View All Work Orders →]                                                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Breakdown

### 2.1 Alert Banner

**Purpose**: Immediate visual indicator of problems requiring attention

**Display Logic**:
- Only shows if there are issues (hidden when all clear)
- Red background with white text
- Clickable - scrolls to relevant section or filters

**Data Required**:
```typescript
interface AlertBannerData {
  machinesDown: number;
  overdueWorkOrders: number;
  unassignedWorkOrders: number;
}
```

**Display Rules**:
- If `machinesDown > 0` → Show "X machines down"
- If `overdueWorkOrders > 0` → Show "X overdue work orders"
- If `unassignedWorkOrders > 0` → Show "X unassigned"
- If all zero → Hide banner entirely

---

### 2.2 Machines Down Panel

**Purpose**: Show which specific machines are currently not operational

**Data Required**:
```typescript
interface MachineDownItem {
  machineId: string;
  machineCode: string;
  machineName: string;
  location: string;           // Area/Line
  downSince: Date;            // When status changed to DOWN
  downDuration: string;       // Calculated: "2h 34m"
  workOrder?: {
    id: string;
    publicId: string;
    assignee?: string;
    status: string;
  };
}
```

**Display Logic**:
- Sort by `downDuration` descending (longest down first)
- Show up to 5 machines, then "[X more →]" link
- If machine has no work order, show prominent "Create Work Order" button
- If machine has work order, show assignee and link to WO

**Empty State**: "✓ All machines operational" with green checkmark

---

### 2.3 Work Orders Needing Attention Panel

**Purpose**: Surface work orders that need supervisor action

**Categories** (in order of display):
1. **Overdue** - Due date has passed, not closed
2. **Unassigned** - No performer assigned
3. **High Priority** - Priority = HIGH or CRITICAL

**Data Required**:
```typescript
interface AttentionWorkOrder {
  id: string;
  publicId: string;
  title: string;
  assetName: string;
  category: 'overdue' | 'unassigned' | 'high_priority';
  dueDate?: Date;
  daysOverdue?: number;
  priority: string;
}
```

**Display Logic**:
- Group by category with collapsible sections
- Show count in section header: "Overdue (3)"
- Sort within each section: most critical first
- Click item → navigate to work order detail

---

### 2.4 Today's Schedule Panel

**Purpose**: Show preventive maintenance and scheduled work due today

**Note**: This panel requires Spec 7 (Scheduled Maintenance) to be fully functional. Until then, show work orders with `dueDate = today`.

**Data Required**:
```typescript
interface ScheduledItem {
  id: string;
  publicId: string;
  title: string;
  assetName: string;
  scheduledTime?: string;     // Optional specific time
  isPreventive: boolean;      // PM vs corrective
  status: string;
}
```

**Display Logic**:
- Sort by scheduled time, then by creation time
- Show status indicator (pending, in progress, completed)
- Completed items show with strikethrough
- Maximum 6 items, then "[View Full Schedule →]"

**Empty State**: "No scheduled work for today"

---

### 2.5 Team Workload Panel

**Purpose**: Quick view of how work is distributed across technicians

**Data Required**:
```typescript
interface TeamMemberWorkload {
  userId: string;
  name: string;
  activeWorkOrders: number;
  inProgressCount: number;
}
```

**Display Logic**:
- Show all technicians with at least 1 assigned work order
- Progress bar shows relative workload
- "Unassigned" row shows work orders without assignee
- Sort by `activeWorkOrders` descending

---

### 2.6 Recent Activity Table

**Purpose**: Situational awareness of latest work order activity

**Data Required**:
```typescript
interface RecentWorkOrder {
  id: string;
  publicId: string;
  assetCode: string;
  assetName: string;
  title: string;
  status: string;
  assigneeName?: string;
  updatedAt: Date;
}
```

**Display Logic**:
- Show 5-8 most recently updated work orders
- Click row → navigate to work order detail
- Status shown with color-coded badge

---

## 3. API Endpoints

### 3.1 GET /api/dashboard/operations

**Single endpoint returning all dashboard data**

**Response**:
```typescript
interface OperationsDashboardResponse {
  // Alert banner data
  alerts: {
    machinesDown: number;
    overdueWorkOrders: number;
    unassignedWorkOrders: number;
  };

  // Machines currently down
  machinesDown: Array<{
    id: string;
    code: string;
    nameEn: string;
    nameAr?: string;
    locationEn: string;
    locationAr?: string;
    downSince: string;          // ISO datetime
    workOrder?: {
      id: string;
      publicId: string;
      status: string;
      assigneeName?: string;
    };
  }>;

  // Work orders needing attention
  attention: {
    overdue: Array<AttentionWorkOrder>;
    unassigned: Array<AttentionWorkOrder>;
    highPriority: Array<AttentionWorkOrder>;
  };

  // Today's scheduled work
  todaySchedule: Array<{
    id: string;
    publicId: string;
    title: string;
    assetNameEn: string;
    assetNameAr?: string;
    status: string;
    dueDate?: string;
  }>;

  // Team workload
  teamWorkload: Array<{
    userId: string;
    name: string;
    activeCount: number;
    inProgressCount: number;
  }>;

  // Recent activity
  recentWorkOrders: Array<{
    id: string;
    publicId: string;
    assetCode: string;
    assetNameEn: string;
    title: string;
    status: string;
    assigneeName?: string;
    updatedAt: string;
  }>;
}
```

### 3.2 Backend Implementation

```typescript
// backend/src/services/operationsDashboardService.ts

export async function getOperationsDashboard(factoryId: string) {
  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  // Parallel queries for performance
  const [
    machinesDown,
    overdueWOs,
    unassignedWOs,
    highPriorityWOs,
    todayWOs,
    teamWorkload,
    recentWOs
  ] = await Promise.all([
    // Machines with status DOWN
    prisma.asset.findMany({
      where: {
        factoryId,
        status: 'DOWN',
        assetType: 'machine'
      },
      include: {
        workOrders: {
          where: { status: { not: 'CLOSED' } },
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: { performer: true }
        }
      }
    }),

    // Overdue work orders
    prisma.workOrder.findMany({
      where: {
        factoryId,
        status: { not: 'CLOSED' },
        dueDate: { lt: now }
      },
      include: { asset: true },
      orderBy: { dueDate: 'asc' },
      take: 10
    }),

    // Unassigned work orders
    prisma.workOrder.findMany({
      where: {
        factoryId,
        status: { not: 'CLOSED' },
        performerId: null
      },
      include: { asset: true },
      orderBy: { createdAt: 'desc' },
      take: 10
    }),

    // High priority work orders
    prisma.workOrder.findMany({
      where: {
        factoryId,
        status: { not: 'CLOSED' },
        priority: { in: ['HIGH', 'CRITICAL'] }
      },
      include: { asset: true },
      orderBy: { priority: 'desc' },
      take: 10
    }),

    // Today's scheduled work
    prisma.workOrder.findMany({
      where: {
        factoryId,
        dueDate: { gte: todayStart, lte: todayEnd }
      },
      include: { asset: true },
      orderBy: { dueDate: 'asc' },
      take: 10
    }),

    // Team workload aggregation
    prisma.workOrder.groupBy({
      by: ['performerId'],
      where: {
        factoryId,
        status: { not: 'CLOSED' },
        performerId: { not: null }
      },
      _count: { id: true }
    }),

    // Recent work orders
    prisma.workOrder.findMany({
      where: { factoryId },
      include: { asset: true, performer: true },
      orderBy: { updatedAt: 'desc' },
      take: 8
    })
  ]);

  // Transform and return
  return {
    alerts: {
      machinesDown: machinesDown.length,
      overdueWorkOrders: overdueWOs.length,
      unassignedWorkOrders: unassignedWOs.length
    },
    machinesDown: machinesDown.map(transformMachineDown),
    attention: {
      overdue: overdueWOs.map(transformAttentionWO),
      unassigned: unassignedWOs.map(transformAttentionWO),
      highPriority: highPriorityWOs.map(transformAttentionWO)
    },
    todaySchedule: todayWOs.map(transformScheduledWO),
    teamWorkload: await enrichTeamWorkload(teamWorkload),
    recentWorkOrders: recentWOs.map(transformRecentWO)
  };
}
```

---

## 4. Frontend Implementation

### 4.1 Component Structure

```
Dashboard/
├── OperationsDashboard.tsx        # Main page component
├── components/
│   ├── AlertBanner.tsx            # Top alert bar
│   ├── MachinesDownPanel.tsx      # Machines down list
│   ├── AttentionPanel.tsx         # Work orders needing attention
│   ├── TodaySchedulePanel.tsx     # Today's scheduled work
│   ├── TeamWorkloadPanel.tsx      # Team workload bars
│   └── RecentActivityTable.tsx    # Recent work orders table
└── hooks/
    └── useOperationsDashboard.ts  # Data fetching hook
```

### 4.2 Data Fetching Hook

```typescript
// hooks/useOperationsDashboard.ts

export function useOperationsDashboard() {
  return useQuery({
    queryKey: ['operations-dashboard'],
    queryFn: () => api.get('/dashboard/operations'),
    refetchInterval: 30000,  // Refresh every 30 seconds
    staleTime: 10000         // Consider stale after 10 seconds
  });
}
```

### 4.3 Main Component

```typescript
// OperationsDashboard.tsx

export default function OperationsDashboard() {
  const { data, isLoading, error } = useOperationsDashboard();

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <ErrorState />;

  const { alerts, machinesDown, attention, todaySchedule, teamWorkload, recentWorkOrders } = data;
  const hasAlerts = alerts.machinesDown > 0 || alerts.overdueWorkOrders > 0 || alerts.unassignedWorkOrders > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Operations Dashboard</h1>
        <p className="text-muted-foreground">Factory floor status overview</p>
      </div>

      {/* Alert Banner */}
      {hasAlerts && <AlertBanner alerts={alerts} />}

      {/* Top Row: Machines Down + Attention */}
      <div className="grid gap-4 lg:grid-cols-2">
        <MachinesDownPanel machines={machinesDown} />
        <AttentionPanel attention={attention} />
      </div>

      {/* Middle Row: Today's Schedule + Team Workload */}
      <div className="grid gap-4 lg:grid-cols-2">
        <TodaySchedulePanel items={todaySchedule} />
        <TeamWorkloadPanel team={teamWorkload} />
      </div>

      {/* Bottom: Recent Activity */}
      <RecentActivityTable workOrders={recentWorkOrders} />
    </div>
  );
}
```

---

## 5. Localization

```json
{
  "operationsDashboard": {
    "title": "Operations Dashboard",
    "subtitle": "Factory floor status overview",
    "alerts": {
      "machinesDown": "{count} machines down",
      "overdueWorkOrders": "{count} overdue work orders",
      "unassignedWorkOrders": "{count} unassigned"
    },
    "machinesDown": {
      "title": "Machines Down",
      "downFor": "Down {duration}",
      "noWorkOrder": "No work order",
      "createWorkOrder": "Create Work Order",
      "allOperational": "All machines operational",
      "viewMore": "{count} more"
    },
    "attention": {
      "title": "Work Orders Needing Attention",
      "overdue": "Overdue",
      "unassigned": "Unassigned",
      "highPriority": "High Priority",
      "daysOverdue": "{days} days overdue",
      "viewAll": "View All Work Orders"
    },
    "todaySchedule": {
      "title": "Today's Schedule",
      "dueToday": "Due Today",
      "noScheduledWork": "No scheduled work for today",
      "viewFullSchedule": "View Full Schedule"
    },
    "teamWorkload": {
      "title": "Team Workload",
      "workOrders": "{count} WOs",
      "unassigned": "Unassigned",
      "viewTeam": "View Team"
    },
    "recentActivity": {
      "title": "Recent Activity",
      "viewAll": "View All Work Orders"
    }
  }
}
```

---

## 6. Migration Plan

### Phase 1: Build New Dashboard
1. Create new `OperationsDashboard.tsx` component
2. Implement API endpoint `/api/dashboard/operations`
3. Build all sub-components

### Phase 2: Replace Old Dashboard
1. Update route to use new component
2. Keep old dashboard code temporarily (can delete after validation)

### Phase 3: Enhance
1. Add real-time updates via WebSocket (optional)
2. Add click tracking for analytics
3. Gather user feedback for iteration

---

## 7. Testing Checklist

- [ ] Alert banner shows only when issues exist
- [ ] Machines down panel shows correct duration
- [ ] Work orders grouped correctly by attention type
- [ ] Navigation links work for all clickable items
- [ ] Empty states display correctly
- [ ] Auto-refresh works without disrupting user interaction
- [ ] RTL layout works correctly for Arabic

---

## 8. Future Enhancements (Out of Scope)

1. **Personal view toggle** - Switch between "my work" and "team work"
2. **Shift-based filtering** - Show only current shift's work
3. **Sound alerts** - Audio notification when machine goes down
4. **Mobile-optimized view** - Condensed layout for phone
5. **Customizable panels** - Let supervisors choose which panels to show

---

*End of Spec 6*
