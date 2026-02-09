DONE

# Assets (Hierarchical) E2E Testing Goals

## Overview
Test the hierarchical asset management system including creating asset trees, navigating the hierarchy, and managing assets at different levels (Factory → Lines → Areas → Equipment Groups → Machines).

---

## Test Scenarios

### 1. Asset List View
**File:** `asset-list.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ASST-001 | View assets list | 1. Navigate to /assets | Hierarchical asset browser displayed |
| TC-ASST-002 | Hierarchy structure displayed | 1. View assets list | Tree structure shows parent-child relationships |
| TC-ASST-003 | Expand/collapse hierarchy nodes | 1. Click expand on parent asset | Children assets revealed |
| TC-ASST-004 | Search assets by name | 1. Enter asset name in search | Matching assets shown |
| TC-ASST-005 | Search assets by code | 1. Enter asset code in search | Matching assets shown |
| TC-ASST-006 | Filter by status | 1. Select status filter | Only assets with that status shown |
| TC-ASST-007 | Filter by criticality | 1. Select criticality filter | Only assets with that criticality shown |
| TC-ASST-008 | Status badges display | 1. View asset list | Correct color-coded status badges |
| TC-ASST-009 | Criticality indicators | 1. View asset list | Criticality levels visually indicated |
| TC-ASST-010 | Admin sees create button | 1. Login as admin<br>2. View assets | Create asset button visible |
| TC-ASST-011 | Technician cannot create | 1. Login as technician<br>2. View assets | Create button hidden/disabled |

---

### 2. Create Asset (Admin Only)
**File:** `asset-create.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ASST-020 | Navigate to create form | 1. As admin, click create | Navigate to /assets/new |
| TC-ASST-021 | Create top-level asset (Line) | 1. Fill asset details without parent<br>2. Submit | Top-level asset created |
| TC-ASST-022 | Create child asset (Area under Line) | 1. Select parent line<br>2. Fill area details<br>3. Submit | Area created under selected line |
| TC-ASST-023 | Create equipment group | 1. Select parent area<br>2. Fill equipment group details<br>3. Submit | Equipment group created in hierarchy |
| TC-ASST-024 | Create asset - all fields | 1. Fill all fields (name, code, status, criticality)<br>2. Submit | Asset created with all data |
| TC-ASST-025 | Create asset - validation errors | 1. Leave required fields empty<br>2. Submit | Validation errors displayed |
| TC-ASST-026 | Create asset - duplicate code | 1. Enter existing asset code<br>2. Submit | Error: code already exists |
| TC-ASST-027 | Parent selection dropdown | 1. Open parent selector | Shows valid parent options based on hierarchy level |
| TC-ASST-028 | Cancel create | 1. Fill some fields<br>2. Cancel | Return to list, no asset created |

**Asset Hierarchy Levels:**
- Factory (Level 0) - Usually one per installation
- Lines (Level 1) - Production lines
- Areas (Level 2) - Areas within lines
- Equipment Groups (Level 3) - Groups of related equipment
- Individual Equipment (Level 4) - Specific machines

---

### 3. Asset Detail View
**File:** `asset-detail.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ASST-030 | View asset details | 1. Click asset in list | Navigate to /assets/:id with details |
| TC-ASST-031 | All metadata displayed | 1. View asset detail | See name, code, status, criticality, parent |
| TC-ASST-032 | Child assets listed | 1. View parent asset detail | List of child assets shown |
| TC-ASST-033 | Navigate to child asset | 1. Click child asset link | Navigate to child asset detail |
| TC-ASST-034 | Breadcrumb navigation | 1. View nested asset | Breadcrumb shows hierarchy path |
| TC-ASST-035 | Navigate up hierarchy | 1. Click parent in breadcrumb | Navigate to parent asset |
| TC-ASST-036 | Related work orders shown | 1. View asset detail | Work orders for this asset displayed |
| TC-ASST-037 | Related documents shown | 1. View asset detail | Documents assigned to this asset shown |
| TC-ASST-038 | Edit button visible (admin) | 1. Login as admin<br>2. View asset detail | Edit button visible |
| TC-ASST-039 | Edit button hidden (technician) | 1. Login as technician<br>2. View asset detail | Edit button not visible |

---

### 4. Edit Asset (Admin Only)
**File:** `asset-edit.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ASST-040 | Navigate to edit form | 1. As admin, click edit | Navigate to /assets/:id/edit |
| TC-ASST-041 | Form pre-populated | 1. Open edit form | All current values displayed |
| TC-ASST-042 | Update asset name | 1. Change name<br>2. Save | Name updated successfully |
| TC-ASST-043 | Update asset status | 1. Change status<br>2. Save | Status updated |
| TC-ASST-044 | Update criticality | 1. Change criticality<br>2. Save | Criticality updated |
| TC-ASST-045 | Change parent asset | 1. Select different parent<br>2. Save | Asset moved in hierarchy |
| TC-ASST-046 | Prevent circular hierarchy | 1. Try to set child as parent | Error: circular reference prevented |
| TC-ASST-047 | Edit validation errors | 1. Clear required field<br>2. Save | Validation error shown |
| TC-ASST-048 | Cancel edit | 1. Make changes<br>2. Cancel | Return to detail, no changes |
| TC-ASST-049 | Technician cannot access edit URL | 1. As technician, navigate to /assets/:id/edit | Redirected or access denied |

---

### 5. Asset Picker Component
**File:** `asset-picker.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ASST-050 | Asset picker opens | 1. Click asset picker field | Dropdown/modal with hierarchy shown |
| TC-ASST-051 | Navigate hierarchy in picker | 1. Open picker<br>2. Expand/collapse nodes | Hierarchy navigation works |
| TC-ASST-052 | Search in asset picker | 1. Open picker<br>2. Type search query | Filtered results shown |
| TC-ASST-053 | Select asset from picker | 1. Open picker<br>2. Click asset | Asset selected, picker closes |
| TC-ASST-054 | Clear asset selection | 1. With asset selected<br>2. Clear selection | Field cleared |
| TC-ASST-055 | Picker shows current selection | 1. Open form with pre-selected asset | Current asset highlighted |

---

### 6. Asset Hierarchy Navigation
**File:** `asset-navigation.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-ASST-060 | Drill down through hierarchy | 1. Click line<br>2. Click area<br>3. Click equipment | Navigate through levels successfully |
| TC-ASST-061 | View all descendants | 1. View parent asset | Option to see all nested children |
| TC-ASST-062 | Asset count per level | 1. View parent asset | Shows count of children at each level |
| TC-ASST-063 | Deep linking to nested asset | 1. Navigate directly to /assets/:nestedId | Asset loads with correct context |

---

## Test Data Requirements

```typescript
// fixtures/assets.ts
export const assetTestData = {
  hierarchy: {
    factory: {
      name: 'Test Factory',
      code: 'FACT-001'
    },
    line: {
      name: 'Production Line A',
      code: 'LINE-A',
      parent: 'FACT-001'
    },
    area: {
      name: 'Assembly Area',
      code: 'AREA-ASM',
      parent: 'LINE-A'
    },
    equipmentGroup: {
      name: 'CNC Machines',
      code: 'EQ-CNC',
      parent: 'AREA-ASM'
    }
  },
  newAsset: {
    name: 'New Production Line',
    code: 'LINE-NEW',
    status: 'RUNNING',
    criticality: 'HIGH'
  }
};
```

---

## Page Objects

```typescript
// pages/AssetListPage.ts
class AssetListPage {
  readonly hierarchyTree: Locator;
  readonly searchInput: Locator;
  readonly createButton: Locator;
  readonly statusFilter: Locator;

  async expandNode(assetCode: string): Promise<void>;
  async collapseNode(assetCode: string): Promise<void>;
  async selectAsset(assetCode: string): Promise<void>;
  async searchAssets(query: string): Promise<void>;
}

// pages/AssetDetailPage.ts
class AssetDetailPage {
  readonly assetName: Locator;
  readonly breadcrumb: Locator;
  readonly childrenList: Locator;
  readonly editButton: Locator;
  readonly workOrdersSection: Locator;

  async navigateToParent(): Promise<void>;
  async navigateToChild(childCode: string): Promise<void>;
  async getChildCount(): Promise<number>;
}

// components/AssetPicker.ts
class AssetPicker {
  readonly trigger: Locator;
  readonly dropdown: Locator;
  readonly searchInput: Locator;
  readonly hierarchyTree: Locator;

  async open(): Promise<void>;
  async search(query: string): Promise<void>;
  async selectAsset(assetCode: string): Promise<void>;
  async clear(): Promise<void>;
}
```
