# Spec 5: Analytics Dashboard

**Status**: Ready for Review
**Dependencies**: Spec 1 (Assets), Spec 2 (Work Orders)
**Blocked By**: Specs 1 and 2
**Blocks**: Nothing

---

## 1. High-Level Summary

### What We're Building

A comprehensive analytics dashboard for maintenance insights:
1. **KPIs** - MTTR, MTBF, downtime, work order counts
2. **Trends** - Charts showing metrics over time
3. **Breakdowns** - By asset, maintenance type, discipline, status
4. **Filtering** - Date range, asset hierarchy, type/discipline
5. **Export** - Download data as Excel/CSV

### Why This Matters

1. **Visibility** - Management sees maintenance performance at a glance
2. **Decisions** - Data-driven decisions on equipment replacement, staffing
3. **Compliance** - Track KPIs required for certifications (ISO, etc.)
4. **Patterns** - Identify recurring failures, problematic assets

---

## 2. Technical Decisions Requiring Attention

### ⚠️ Decision 1: Real-time vs Precomputed Analytics

**Options**:
1. **Real-time** - Calculate metrics on each page load
2. **Precomputed** - Background job aggregates data periodically
3. **Hybrid** - Precompute heavy aggregations, real-time for simple counts

**Chosen Approach**: (1) Real-time for initial implementation

**Why**:
- Simpler architecture
- Data always current
- Work order volume is manageable (< 10K records)
- Can optimize later if needed

**Future optimization**: Add materialized views or summary tables if queries become slow.

---

### ⚠️ Decision 2: MTBF Calculation

**MTBF** = Mean Time Between Failures

**Question**: How do we define "failure"?

**Options**:
1. Any work order = failure
2. Only work orders where `maintenanceType = 'corrective'` = failure
3. Only work orders where asset went DOWN = failure

**Chosen Approach**: (2) Corrective maintenance work orders

**Why**:
- Preventive/inspection work orders aren't failures
- Aligns with industry standard MTBF definition
- Clear and consistent

**Calculation**:
```
MTBF = Total operating time / Number of corrective work orders

For an asset over 30 days:
- Operating time = 30 days - total downtime
- Failures = count of corrective work orders
- MTBF = Operating time / Failures
```

---

### ⚠️ Decision 3: Asset Hierarchy in Analytics

**Question**: When viewing analytics for a machine, should we include work orders from its components?

**Chosen Approach**: Yes, with toggle

**Options in UI**:
- "This asset only" - just work orders directly on this asset
- "Include children" (default) - work orders on this asset and all descendants

**Why**:
- Machine-level view should show total maintenance burden
- Component-level drilldown shows specific problem areas

---

### ⚠️ Decision 4: Date Range Presets

**Chosen presets**:
- Last 7 days
- Last 30 days (default)
- Last 90 days
- Last 12 months
- Year to date
- Custom range

---

### ⚠️ Decision 5: Downtime Calculation Source

**Problem**: We have two downtime measures:
- `downtimeDurationMin` on WorkOrder (calculated when closed)
- Sum of time when `asset.status = DOWN`

**Chosen Approach**: Use `downtimeDurationMin` from work orders

**Why**:
- More accurate (based on actual repair timeline)
- Asset status might not be updated in real-time
- Work order data is the source of truth

**Edge case**: If `downtimeDurationMin` is null (timestamps not entered), exclude from average but count for totals.

---

## 3. Key Metrics

### 3.1 KPIs

| Metric | Definition | Query |
|--------|------------|-------|
| **Total Work Orders** | Count of work orders in period | `COUNT(*)` |
| **Open Work Orders** | Currently open | `COUNT(*) WHERE status != 'CLOSED'` |
| **Avg. MTTR** | Mean Time To Repair (minutes) | `AVG(maintenanceDurationMin)` |
| **Total Downtime** | Sum of downtime (hours) | `SUM(downtimeDurationMin) / 60` |
| **MTBF** | Mean Time Between Failures (hours) | `Total hours / COUNT(corrective WOs)` |
| **First-Time Fix Rate** | WOs closed without reopening | `COUNT(single-repair WOs) / COUNT(all WOs)` |

### 3.2 Breakdowns

| Breakdown | Visualization |
|-----------|---------------|
| By Status | Pie chart |
| By Priority | Bar chart |
| By Maintenance Type | Pie chart |
| By Discipline | Bar chart (multi-select means one WO can appear in multiple) |
| By Asset | Table with sortable columns |
| By Performer | Table |

### 3.3 Trends

| Trend | Visualization |
|-------|---------------|
| Work Orders Over Time | Line chart (by day/week/month) |
| MTTR Over Time | Line chart |
| Downtime Over Time | Area chart |
| Top Failing Assets | Bar chart (top 10) |

---

## 4. API Endpoints

### 4.1 GET /analytics/summary

**Main KPIs endpoint**

**Query Parameters**:
```typescript
interface AnalyticsSummaryQuery {
  from: string;           // ISO date
  to: string;             // ISO date
  assetId?: string;       // Filter by asset
  includeChildren?: boolean; // Include descendant assets (default: true)
  maintenanceType?: string;  // Filter by type
}
```

**Response**:
```typescript
interface AnalyticsSummaryResponse {
  totalWorkOrders: number;
  openWorkOrders: number;
  closedWorkOrders: number;
  avgMttrMinutes: number | null;
  totalDowntimeMinutes: number;
  mtbfHours: number | null;
  firstTimeFixRate: number | null;  // 0-1

  // Period comparison
  previousPeriod: {
    totalWorkOrders: number;
    avgMttrMinutes: number | null;
    // ... change percentages
  };
}
```

**Implementation**:
```typescript
async function getAnalyticsSummary(query: AnalyticsSummaryQuery) {
  const { from, to, assetId, includeChildren, maintenanceType } = query;

  // Build asset filter
  let assetIds: string[] | undefined;
  if (assetId) {
    assetIds = [assetId];
    if (includeChildren) {
      const descendants = await getDescendantIds(assetId);
      assetIds = [...assetIds, ...descendants];
    }
  }

  // Base query conditions
  const where: Prisma.WorkOrderWhereInput = {
    reportedAt: {
      gte: new Date(from),
      lte: new Date(to)
    },
    ...(assetIds && { assetId: { in: assetIds } }),
    ...(maintenanceType && { maintenanceType })
  };

  // Get counts
  const [total, open, closed] = await Promise.all([
    prisma.workOrder.count({ where }),
    prisma.workOrder.count({ where: { ...where, status: { not: 'CLOSED' } } }),
    prisma.workOrder.count({ where: { ...where, status: 'CLOSED' } })
  ]);

  // Get averages
  const avgResult = await prisma.workOrder.aggregate({
    where: { ...where, status: 'CLOSED' },
    _avg: {
      maintenanceDurationMin: true,
      downtimeDurationMin: true
    },
    _sum: {
      downtimeDurationMin: true
    }
  });

  // Calculate MTBF
  const correctiveCount = await prisma.workOrder.count({
    where: { ...where, maintenanceType: 'corrective' }
  });
  const periodHours = (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60);
  const downtimeHours = (avgResult._sum.downtimeDurationMin || 0) / 60;
  const operatingHours = periodHours - downtimeHours;
  const mtbfHours = correctiveCount > 0 ? operatingHours / correctiveCount : null;

  return {
    totalWorkOrders: total,
    openWorkOrders: open,
    closedWorkOrders: closed,
    avgMttrMinutes: avgResult._avg.maintenanceDurationMin,
    totalDowntimeMinutes: avgResult._sum.downtimeDurationMin || 0,
    mtbfHours,
    firstTimeFixRate: null // TODO: implement
  };
}
```

### 4.2 GET /analytics/by-status

**Breakdown by work order status**

**Response**:
```typescript
interface ByStatusResponse {
  data: Array<{
    status: WorkOrderStatus;
    count: number;
    percentage: number;
  }>;
}
```

### 4.3 GET /analytics/by-type

**Breakdown by maintenance type**

**Response**:
```typescript
interface ByTypeResponse {
  data: Array<{
    type: string;       // "corrective", "preventive", etc.
    typeLabel: string;  // Localized label
    count: number;
    percentage: number;
  }>;
}
```

### 4.4 GET /analytics/by-discipline

**Breakdown by maintenance discipline**

**Note**: One work order can have multiple disciplines (multi-select)

**Response**:
```typescript
interface ByDisciplineResponse {
  data: Array<{
    discipline: string;
    disciplineLabel: string;
    count: number;  // WOs that include this discipline
    // percentage doesn't make sense here (can exceed 100%)
  }>;
}
```

### 4.5 GET /analytics/by-asset

**Top assets by work order count**

**Query Parameters**:
```typescript
interface ByAssetQuery {
  from: string;
  to: string;
  limit?: number;  // Default 10
  orderBy?: 'count' | 'downtime' | 'mttr';
}
```

**Response**:
```typescript
interface ByAssetResponse {
  data: Array<{
    assetId: string;
    assetNameEn: string;
    assetNameAr: string | null;
    assetPath: string;
    workOrderCount: number;
    totalDowntimeMinutes: number;
    avgMttrMinutes: number | null;
  }>;
}
```

### 4.6 GET /analytics/trend

**Time-series data**

**Query Parameters**:
```typescript
interface TrendQuery {
  from: string;
  to: string;
  assetId?: string;
  includeChildren?: boolean;
  metric: 'count' | 'mttr' | 'downtime';
  granularity: 'day' | 'week' | 'month';
}
```

**Response**:
```typescript
interface TrendResponse {
  data: Array<{
    date: string;       // Start of period
    value: number;
  }>;
}
```

**Implementation** (PostgreSQL):
```sql
-- Count by day
SELECT
  DATE_TRUNC('day', "reportedAt") as date,
  COUNT(*) as value
FROM "WorkOrder"
WHERE "reportedAt" >= $1 AND "reportedAt" <= $2
GROUP BY DATE_TRUNC('day', "reportedAt")
ORDER BY date;

-- MTTR by week
SELECT
  DATE_TRUNC('week', "completedAt") as date,
  AVG("maintenanceDurationMin") as value
FROM "WorkOrder"
WHERE "completedAt" >= $1 AND "completedAt" <= $2
  AND status = 'CLOSED'
GROUP BY DATE_TRUNC('week', "completedAt")
ORDER BY date;
```

### 4.7 GET /analytics/export

**Export raw data as CSV/Excel**

**Query Parameters**:
```typescript
interface ExportQuery {
  from: string;
  to: string;
  assetId?: string;
  includeChildren?: boolean;
  format: 'csv' | 'xlsx';
}
```

**Response**: File download

**Columns**:
- Work Order ID
- Report Date
- Asset Name (En)
- Asset Name (Ar)
- Asset Path
- Title
- Status
- Priority
- Maintenance Type
- Disciplines
- Equipment Stop Time
- Repair Start Time
- Maintenance End Time
- Maintenance Duration (min)
- Downtime (min)
- Performer

---

## 5. Frontend Components

### 5.1 Analytics Page Layout

**Location**: `/src/pages/analytics/Analytics.tsx`

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ANALYTICS                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Filters:                                                           │
│  ┌──────────────┐ ┌──────────────────┐ ┌─────────────────────────┐ │
│  │ Date Range   │ │ Asset            │ │ Maintenance Type        │ │
│  │ [Last 30d ▼] │ │ [All assets ▼]   │ │ [All types ▼]          │ │
│  └──────────────┘ └──────────────────┘ └─────────────────────────┘ │
│                                         [ ] Include child assets   │
│                                                                     │
│  ───────────────────────────────────────────────────────────────── │
│                                                                     │
│  KPIs:                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │   152    │ │    8     │ │  45 min  │ │  12.5 h  │ │  156 h   │ │
│  │ Total WO │ │ Open WO  │ │ Avg MTTR │ │ Downtime │ │  MTBF    │ │
│  │ ↑ 12%    │ │ ↓ 25%    │ │ ↓ 8%     │ │ ↑ 15%    │ │ ↑ 5%     │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│                                                                     │
│  ───────────────────────────────────────────────────────────────── │
│                                                                     │
│  ┌─────────────────────────────┐ ┌─────────────────────────────┐   │
│  │     Work Orders Over Time   │ │      By Status              │   │
│  │                             │ │                             │   │
│  │    📈 [Line Chart]          │ │     🥧 [Pie Chart]          │   │
│  │                             │ │                             │   │
│  └─────────────────────────────┘ └─────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────┐ ┌─────────────────────────────┐   │
│  │     By Maintenance Type     │ │     Top Failing Assets      │   │
│  │                             │ │                             │   │
│  │     📊 [Bar Chart]          │ │     📊 [Bar Chart]          │   │
│  │                             │ │                             │   │
│  └─────────────────────────────┘ └─────────────────────────────┘   │
│                                                                     │
│  ───────────────────────────────────────────────────────────────── │
│                                                                     │
│  Assets Breakdown:                                    [Export CSV]  │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ Asset           │ Work Orders │ Downtime │ Avg MTTR │ ↕       │ │
│  ├───────────────────────────────────────────────────────────────┤ │
│  │ Vacuum Pump 1   │     23      │  4.5h    │  35 min  │         │ │
│  │ Booster Pump    │     18      │  3.2h    │  42 min  │         │ │
│  │ Heat Exchanger  │     12      │  2.1h    │  28 min  │         │ │
│  │ ...             │             │          │          │         │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Component Structure

```
Analytics
├── AnalyticsFilters
│   ├── DateRangePicker
│   ├── AssetPicker (from Spec 1)
│   ├── MaintenanceTypeSelect
│   └── IncludeChildrenCheckbox
├── KPICards
│   ├── KPICard (Total WO)
│   ├── KPICard (Open WO)
│   ├── KPICard (Avg MTTR)
│   ├── KPICard (Downtime)
│   └── KPICard (MTBF)
├── ChartsRow
│   ├── TrendChart (Line)
│   └── StatusPieChart
├── ChartsRow
│   ├── TypeBarChart
│   └── TopAssetsChart
├── AssetsTable
│   └── ExportButton
```

### 5.3 Chart Library

**Recommendation**: Use **Recharts** (already commonly used in React projects)

```typescript
// Example: Work Orders Trend Line Chart
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function WorkOrdersTrendChart({ data }: { data: TrendData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### 5.4 KPI Card Component

```typescript
interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;       // Percentage change from previous period
  changeLabel?: string;  // e.g., "vs last 30 days"
}

function KPICard({ title, value, unit, change, changeLabel }: KPICardProps) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold">
          {value}
          {unit && <span className="text-lg ml-1">{unit}</span>}
        </p>
        {change !== undefined && (
          <p className={cn(
            "text-sm",
            change > 0 ? "text-green-600" : "text-red-600"
          )}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
            {changeLabel && <span className="text-muted-foreground ml-1">{changeLabel}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

### 5.5 Date Range Picker

```typescript
function DateRangePicker({ value, onChange }: Props) {
  const presets = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Last 12 months', value: '12m' },
    { label: 'Year to date', value: 'ytd' },
    { label: 'Custom', value: 'custom' },
  ];

  return (
    <Select value={value.preset} onValueChange={handlePresetChange}>
      {presets.map(preset => (
        <SelectItem key={preset.value} value={preset.value}>
          {preset.label}
        </SelectItem>
      ))}
    </Select>
    // If custom, show date pickers
  );
}
```

---

## 6. Export Functionality

### 6.1 CSV Export

```typescript
// backend/src/routes/analytics.ts

app.get('/analytics/export', async (req, res) => {
  const { from, to, assetId, includeChildren, format } = req.query;

  // Build query
  let assetIds: string[] | undefined;
  if (assetId) {
    assetIds = [assetId as string];
    if (includeChildren === 'true') {
      const descendants = await getDescendantIds(assetId as string);
      assetIds = [...assetIds, ...descendants];
    }
  }

  const workOrders = await prisma.workOrder.findMany({
    where: {
      reportedAt: {
        gte: new Date(from as string),
        lte: new Date(to as string)
      },
      ...(assetIds && { assetId: { in: assetIds } })
    },
    include: {
      asset: true,
      performer: true
    },
    orderBy: { reportedAt: 'desc' }
  });

  if (format === 'csv') {
    const csv = generateCSV(workOrders);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=work-orders-${from}-${to}.csv`);
    return res.send(csv);
  }

  if (format === 'xlsx') {
    const buffer = await generateExcel(workOrders);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=work-orders-${from}-${to}.xlsx`);
    return res.send(buffer);
  }
});
```

### 6.2 Excel Generation

```typescript
// Using 'xlsx' package
import * as XLSX from 'xlsx';

function generateExcel(workOrders: WorkOrderWithRelations[]): Buffer {
  const data = workOrders.map(wo => ({
    'Work Order ID': wo.publicId,
    'Report Date': wo.reportedAt.toISOString(),
    'Asset (EN)': wo.asset.nameEn,
    'Asset (AR)': wo.asset.nameAr || '',
    'Asset Path': wo.asset.pathStringEn,
    'Title': wo.title,
    'Status': wo.status,
    'Priority': wo.priority,
    'Maintenance Type': wo.maintenanceType || '',
    'Disciplines': wo.maintenanceDisciplines?.join(', ') || '',
    'Equipment Stop Time': wo.equipmentStopTime?.toISOString() || '',
    'Repair Start Time': wo.repairStartTime?.toISOString() || '',
    'Maintenance End Time': wo.maintenanceEndTime?.toISOString() || '',
    'Maintenance Duration (min)': wo.maintenanceDurationMin || '',
    'Downtime (min)': wo.downtimeDurationMin || '',
    'Performer': wo.performer?.name || ''
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Work Orders');

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}
```

---

## 7. Localization

### 7.1 Translation Keys

```json
{
  "analytics": {
    "title": "Analytics",
    "filters": {
      "dateRange": "Date Range",
      "asset": "Asset",
      "maintenanceType": "Maintenance Type",
      "includeChildren": "Include child assets",
      "allAssets": "All assets",
      "allTypes": "All types"
    },
    "presets": {
      "7d": "Last 7 days",
      "30d": "Last 30 days",
      "90d": "Last 90 days",
      "12m": "Last 12 months",
      "ytd": "Year to date",
      "custom": "Custom range"
    },
    "kpis": {
      "totalWorkOrders": "Total Work Orders",
      "openWorkOrders": "Open Work Orders",
      "avgMttr": "Avg. MTTR",
      "totalDowntime": "Total Downtime",
      "mtbf": "MTBF"
    },
    "charts": {
      "workOrdersOverTime": "Work Orders Over Time",
      "byStatus": "By Status",
      "byType": "By Maintenance Type",
      "byDiscipline": "By Discipline",
      "topFailingAssets": "Top Failing Assets"
    },
    "table": {
      "asset": "Asset",
      "workOrders": "Work Orders",
      "downtime": "Downtime",
      "avgMttr": "Avg. MTTR"
    },
    "export": {
      "button": "Export",
      "csv": "Export CSV",
      "excel": "Export Excel"
    },
    "units": {
      "minutes": "min",
      "hours": "h"
    },
    "comparison": {
      "vsPrevious": "vs previous period"
    }
  }
}
```

---

## 8. Testing Checklist

### Unit Tests
- [ ] MTTR calculation handles null values
- [ ] MTBF calculation with zero failures returns null
- [ ] Date range calculations are correct
- [ ] Asset hierarchy filtering includes descendants

### Integration Tests
- [ ] Summary endpoint returns correct counts
- [ ] Trend endpoint returns data points for each period
- [ ] By-type breakdown percentages sum to 100
- [ ] Export generates valid CSV/Excel

### E2E Tests
- [ ] Dashboard loads with default filters
- [ ] Changing date range updates all charts
- [ ] Asset filter restricts data correctly
- [ ] Export downloads file

---

## 9. Implementation Order

1. **API endpoints** - Summary, breakdowns, trends
2. **Frontend layout** - Page structure, filters
3. **KPI cards** - Display summary metrics
4. **Charts** - Install Recharts, create chart components
5. **Assets table** - Sortable table with breakdown
6. **Export** - CSV and Excel generation
7. **Localization** - Add translation keys
8. **Testing** - Unit, integration, E2E

---

## 10. Future Enhancements (Out of Scope)

1. **Custom dashboards** - Let users create their own layouts
2. **Scheduled reports** - Email weekly summaries
3. **Alerts** - Notify when MTTR exceeds threshold
4. **Comparison mode** - Compare two time periods side by side
5. **Drill-down** - Click chart segment to see detailed list

---

*End of Spec 5*
