DONE

# Dashboard E2E Testing Goals

## Overview
Test the main dashboard functionality including stats display, charts, and navigation to other sections.

---

## Test Scenarios

### 1. Dashboard Loading & Display
**File:** `dashboard-display.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DASH-001 | Dashboard loads for authenticated user | 1. Login as valid user<br>2. Navigate to / | Dashboard page loads with all components |
| TC-DASH-002 | Stats cards display correct data | 1. Navigate to dashboard | See stats cards: Active Work Orders, Machines Down, Completed Today, System Status |
| TC-DASH-003 | Weekly overview chart renders | 1. Navigate to dashboard | Bar chart showing weekly work order data |
| TC-DASH-004 | Machine status pie chart renders | 1. Navigate to dashboard | Pie chart showing machine status distribution |
| TC-DASH-005 | Real-time metrics display | 1. Navigate to dashboard | Operational metrics shown with current values |
| TC-DASH-006 | Dashboard responsive layout | 1. Test at various viewport sizes | Layout adapts appropriately (mobile, tablet, desktop) |

---

### 2. Stats Cards Interaction
**File:** `dashboard-stats.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DASH-010 | Active work orders stat accuracy | 1. Create known number of OPEN/IN_PROGRESS work orders<br>2. Check dashboard stat | Count matches actual open work orders |
| TC-DASH-011 | Machines down stat accuracy | 1. Set known machines to DOWN status<br>2. Check dashboard stat | Count matches machines with DOWN status |
| TC-DASH-012 | Completed today stat accuracy | 1. Close work orders today<br>2. Check dashboard stat | Count matches work orders closed today |
| TC-DASH-013 | Click stats card navigation | 1. Click on a stats card (if clickable) | Navigates to relevant filtered view |

---

### 3. Charts & Data Visualization
**File:** `dashboard-charts.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DASH-020 | Weekly chart data accuracy | 1. Create work orders across the week<br>2. View weekly chart | Chart reflects actual work order data |
| TC-DASH-021 | Machine status chart accuracy | 1. Set machines to various statuses<br>2. View pie chart | Chart segments match actual status distribution |
| TC-DASH-022 | Chart tooltips display | 1. Hover over chart segments/bars | Tooltip shows detailed information |
| TC-DASH-023 | Chart legend interaction | 1. Click chart legend items | Chart filters/highlights based on selection |
| TC-DASH-024 | Empty state handling | 1. View dashboard with no data | Appropriate empty states shown |

---

### 4. Dashboard Navigation
**File:** `dashboard-navigation.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DASH-030 | Navigate to work orders | 1. From dashboard, click work orders link/card | Redirect to /work-orders |
| TC-DASH-031 | Navigate to machines | 1. From dashboard, click machines link/card | Redirect to /machines |
| TC-DASH-032 | Quick action buttons | 1. Test any quick action buttons on dashboard | Appropriate action triggered |

---

### 5. Dashboard Data Refresh
**File:** `dashboard-refresh.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DASH-040 | Auto-refresh functionality | 1. Stay on dashboard<br>2. Change data in another tab<br>3. Wait for refresh interval | Dashboard updates with new data |
| TC-DASH-041 | Manual refresh | 1. Click refresh button (if present) | Data reloads |
| TC-DASH-042 | Loading states | 1. Observe dashboard during data fetch | Appropriate loading indicators shown |

---

## Test Data Requirements

```typescript
// fixtures/dashboard-data.ts
export const dashboardTestData = {
  workOrders: {
    open: 5,
    inProgress: 3,
    completedToday: 2
  },
  machines: {
    running: 10,
    down: 3,
    maintenance: 2,
    retired: 1
  }
};
```

---

## Page Objects

```typescript
// pages/DashboardPage.ts
class DashboardPage {
  readonly activeWorkOrdersCard: Locator;
  readonly machinesDownCard: Locator;
  readonly completedTodayCard: Locator;
  readonly systemStatusCard: Locator;
  readonly weeklyChart: Locator;
  readonly machineStatusChart: Locator;

  async getStatValue(statName: string): Promise<number>;
  async waitForChartsLoaded(): Promise<void>;
  async navigateToWorkOrders(): Promise<void>;
  async navigateToMachines(): Promise<void>;
}
```

---

## Visual Testing

- Capture baseline screenshots of dashboard
- Compare charts rendering across browsers
- Test dark/light mode if applicable
