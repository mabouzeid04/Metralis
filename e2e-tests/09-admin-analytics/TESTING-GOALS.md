DONE

# Admin Analytics E2E Testing Goals

## Overview
Test the admin-only analytics dashboard including stats display, insights viewing, insight generation, and navigation to relevant sections.

---

## Test Scenarios

### 1. Analytics Access Control
**File:** `analytics-access.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-001 | Admin can access analytics | 1. Login as admin<br>2. Navigate to /admin/analytics | Analytics page loads |
| TC-ANLYT-002 | Technician cannot access | 1. Login as technician<br>2. Navigate to /admin/analytics | Redirected or access denied |
| TC-ANLYT-003 | Analytics link visible (admin) | 1. Login as admin<br>2. Check sidebar | Analytics link visible |
| TC-ANLYT-004 | Analytics link hidden (technician) | 1. Login as technician<br>2. Check sidebar | Analytics link not visible |
| TC-ANLYT-005 | Direct URL access blocked | 1. As technician, go to /admin/analytics directly | Access denied page |

---

### 2. Stats Cards Display
**File:** `analytics-stats.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-010 | Stats cards visible | 1. Navigate to analytics | Four stat cards displayed |
| TC-ANLYT-011 | Total AI queries stat | 1. View analytics | Total AI queries count shown |
| TC-ANLYT-012 | Mean time to diagnose | 1. View analytics | Average diagnosis time displayed |
| TC-ANLYT-013 | Mean time to repair | 1. View analytics | Average repair time displayed |
| TC-ANLYT-014 | Knowledge base coverage | 1. View analytics | Coverage percentage shown |
| TC-ANLYT-015 | Stats accuracy - AI queries | 1. Make known AI queries<br>2. Check stat | Count matches actual queries |
| TC-ANLYT-016 | Stats refresh | 1. Refresh page | Stats update to current values |
| TC-ANLYT-017 | Stats loading state | 1. Observe during load | Loading indicators shown |
| TC-ANLYT-018 | Stats error handling | 1. API error occurs | Error message displayed |

**Stats Card Details:**
- **Total AI Queries:** Count of all AI chat messages
- **Mean Time to Diagnose:** Average time from fault report to diagnosis
- **Mean Time to Repair:** Average time from maintenance start to end
- **Knowledge Base Coverage:** Percentage of assets with documentation

---

### 3. System Insights Display
**File:** `analytics-insights.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-020 | Insights section visible | 1. View analytics | System insights section shown |
| TC-ANLYT-021 | MAINTENANCE insights | 1. View insights | Maintenance-related insights displayed |
| TC-ANLYT-022 | INVENTORY insights | 1. View insights | Inventory/parts insights displayed |
| TC-ANLYT-023 | DOCUMENTATION insights | 1. View insights | Documentation gap insights shown |
| TC-ANLYT-024 | TRAINING insights | 1. View insights | Training/performance insights shown |
| TC-ANLYT-025 | Insight cards structure | 1. View insight card | Category, title, description visible |
| TC-ANLYT-026 | Insight confidence/priority | 1. View insight | Confidence or priority indicator shown |
| TC-ANLYT-027 | Empty insights state | 1. No insights available | Empty state message |
| TC-ANLYT-028 | Filter insights by category | 1. Select category filter | Only selected category shown |
| TC-ANLYT-029 | Insights sorted by relevance | 1. View insights | Most relevant/recent first |

---

### 4. Generate Insights
**File:** `analytics-generate.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-030 | Generate button visible | 1. View analytics | "Generate Insights" button shown |
| TC-ANLYT-031 | Click generate insights | 1. Click generate button | Insight generation starts |
| TC-ANLYT-032 | Generation loading state | 1. Click generate | Loading/processing indicator |
| TC-ANLYT-033 | Generation completes | 1. Wait for generation | New insights appear |
| TC-ANLYT-034 | Generation success message | 1. Generation completes | Success notification shown |
| TC-ANLYT-035 | New insights appear | 1. After generation | Insights list updated |
| TC-ANLYT-036 | Generation with sufficient data | 1. With historical data<br>2. Generate | Meaningful insights created |
| TC-ANLYT-037 | Generation with no data | 1. Empty system<br>2. Generate | Appropriate message or minimal insights |
| TC-ANLYT-038 | Generate button disabled during generation | 1. Click generate<br>2. Try to click again | Button disabled during process |
| TC-ANLYT-039 | Generation error handling | 1. AI service unavailable | Error message shown |

---

### 5. Insight Actions
**File:** `analytics-actions.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-040 | Insight has action buttons | 1. View insight card | Action buttons visible |
| TC-ANLYT-041 | Navigate to work orders | 1. Maintenance insight<br>2. Click action | Navigate to /work-orders with filter |
| TC-ANLYT-042 | Navigate to parts inventory | 1. Inventory insight<br>2. Click action | Navigate to /parts |
| TC-ANLYT-043 | Navigate to documents | 1. Documentation insight<br>2. Click action | Navigate to /documents |
| TC-ANLYT-044 | Navigate to specific machine | 1. Machine-specific insight<br>2. Click action | Navigate to machine detail |
| TC-ANLYT-045 | Navigate to asset | 1. Asset-related insight<br>2. Click action | Navigate to asset detail |
| TC-ANLYT-046 | Mark insight as reviewed | 1. Click "Mark as Reviewed" | Insight status changes |
| TC-ANLYT-047 | Mark insight as actioned | 1. Click "Mark as Actioned" | Insight status changes |
| TC-ANLYT-048 | Dismiss insight | 1. Click dismiss | Insight hidden or marked dismissed |
| TC-ANLYT-049 | Action persistence | 1. Take action<br>2. Refresh | Action state persisted |

---

### 6. Insight Categories Deep Dive
**File:** `analytics-categories.spec.ts`

#### MAINTENANCE Insights
| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-050 | Equipment reliability insight | 1. Machine with frequent failures<br>2. View insights | Insight highlights reliability issue |
| TC-ANLYT-051 | Recurring failure pattern | 1. Multiple similar WOs<br>2. View insights | Pattern identified |
| TC-ANLYT-052 | Overdue maintenance insight | 1. Long time since last PM<br>2. View insights | Preventive maintenance reminder |

#### INVENTORY Insights
| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-055 | Low stock alert | 1. Part below minimum<br>2. View insights | Low stock insight shown |
| TC-ANLYT-056 | High usage part insight | 1. Part frequently used<br>2. View insights | Usage pattern insight |
| TC-ANLYT-057 | Reorder recommendation | 1. Based on usage trends | Reorder suggestion insight |

#### DOCUMENTATION Insights
| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-060 | Missing documentation | 1. Machine without docs<br>2. View insights | Documentation gap identified |
| TC-ANLYT-061 | Outdated documentation | 1. Old documents<br>2. View insights | Update recommendation |
| TC-ANLYT-062 | Coverage improvement suggestion | 1. Area with low coverage | Coverage insight shown |

#### TRAINING Insights
| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-065 | Technician performance | 1. Compare repair times<br>2. View insights | Performance insight shown |
| TC-ANLYT-066 | Skill gap identification | 1. Pattern of failed repairs<br>2. View insights | Training need identified |
| TC-ANLYT-067 | AI usage patterns | 1. Low AI chat usage<br>2. View insights | Adoption recommendation |

---

### 7. Analytics Dashboard Layout
**File:** `analytics-layout.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ANLYT-070 | Dashboard responsive layout | 1. Test various viewports | Layout adapts appropriately |
| TC-ANLYT-071 | Stats cards grid | 1. View at desktop width | Cards in grid layout |
| TC-ANLYT-072 | Mobile stats stacking | 1. View at mobile width | Cards stack vertically |
| TC-ANLYT-073 | Insights list scrollable | 1. Many insights | List scrolls smoothly |
| TC-ANLYT-074 | Section headers visible | 1. View page | Clear section headers |

---

## Test Data Requirements

```typescript
// fixtures/analytics.ts
export const analyticsTestData = {
  expectedStats: {
    totalAIQueries: 150,
    meanTimeToDiagnose: '2.5 hours',
    meanTimeToRepair: '4.2 hours',
    knowledgeBaseCoverage: 78 // percentage
  },
  sampleInsights: {
    maintenance: {
      category: 'MAINTENANCE',
      title: 'Recurring pump failure pattern detected',
      description: 'PUMP-001 has failed 3 times in the past month with similar symptoms',
      actionUrl: '/machines/pump-001'
    },
    inventory: {
      category: 'INVENTORY',
      title: 'Low stock alert: Bearing SKF 6205',
      description: 'Stock level (3) is below minimum (10)',
      actionUrl: '/parts/skf-6205'
    },
    documentation: {
      category: 'DOCUMENTATION',
      title: 'Missing documentation for Line B equipment',
      description: '5 machines in Line B have no associated documentation',
      actionUrl: '/assets/line-b'
    },
    training: {
      category: 'TRAINING',
      title: 'AI chat adoption opportunity',
      description: 'Only 30% of technicians used AI diagnostics this month',
      actionUrl: '/ai'
    }
  }
};
```

---

## Page Objects

```typescript
// pages/AdminAnalyticsPage.ts
class AdminAnalyticsPage {
  // Stats Cards
  readonly totalQueriesCard: Locator;
  readonly meanDiagnoseTimeCard: Locator;
  readonly meanRepairTimeCard: Locator;
  readonly knowledgeCoverageCard: Locator;

  // Insights Section
  readonly insightsSection: Locator;
  readonly generateInsightsButton: Locator;
  readonly insightsList: Locator;
  readonly categoryFilter: Locator;

  // Loading States
  readonly statsLoading: Locator;
  readonly insightsLoading: Locator;

  async getStatValue(statName: string): Promise<string>;
  async generateInsights(): Promise<void>;
  async waitForInsightsGeneration(): Promise<void>;
  async filterByCategory(category: string): Promise<void>;
  async getInsightCount(): Promise<number>;
  async clickInsightAction(index: number): Promise<void>;
}

// components/InsightCard.ts
class InsightCard {
  readonly category: Locator;
  readonly title: Locator;
  readonly description: Locator;
  readonly actionButton: Locator;
  readonly reviewButton: Locator;
  readonly dismissButton: Locator;
  readonly statusBadge: Locator;

  async getCategory(): Promise<string>;
  async getTitle(): Promise<string>;
  async clickAction(): Promise<void>;
  async markAsReviewed(): Promise<void>;
  async markAsActioned(): Promise<void>;
  async dismiss(): Promise<void>;
}

// components/StatsCard.ts
class StatsCard {
  readonly title: Locator;
  readonly value: Locator;
  readonly trend: Locator;
  readonly icon: Locator;

  async getValue(): Promise<string>;
  async getTrend(): Promise<string>;
  async isLoading(): Promise<boolean>;
}
```

---

## Data Setup for Testing

To properly test analytics, seed the database with:

1. **AI Chat History:** Multiple conversations with various users
2. **Work Orders:** Mix of completed/open with timestamps
3. **Parts Usage:** Parts used in various repairs
4. **Documents:** Some machines with docs, some without
5. **User Activity:** Multiple technicians with varying performance

```typescript
// seed-analytics-data.ts
export async function seedAnalyticsData() {
  // Create 30 days of work order history
  // Create AI conversations
  // Create parts usage records
  // Create documents with varying coverage
  // Create user activity patterns
}
```
