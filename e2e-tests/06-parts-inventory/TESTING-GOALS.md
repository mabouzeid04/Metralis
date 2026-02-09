DONE

# Parts/Inventory E2E Testing Goals

## Overview
Test parts catalog management including listing, creating, viewing, editing, deleting parts, and tracking usage in work orders.

---

## Test Scenarios

### 1. Parts List View
**File:** `parts-list.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-PART-001 | View parts list | 1. Navigate to /parts | Table displays with parts data |
| TC-PART-002 | Search by name | 1. Enter part name in search | Matching parts shown |
| TC-PART-003 | Search by part number | 1. Enter part number in search | Matching parts shown |
| TC-PART-004 | Search by category | 1. Enter category in search | Parts in that category shown |
| TC-PART-005 | Filter by category | 1. Select category filter | Only parts in category shown |
| TC-PART-006 | Table columns display | 1. View parts list | See: Name, Part Number, Category, Manufacturer, Cost |
| TC-PART-007 | Cost formatting | 1. View parts list | Costs formatted with 2 decimal places |
| TC-PART-008 | Empty search results | 1. Search for non-existent part | Empty state message shown |
| TC-PART-009 | Click to view details | 1. Click part row | Navigate to part detail page |
| TC-PART-010 | Create button visible | 1. View as approved user | Create part button visible |
| TC-PART-011 | Pagination | 1. With many parts<br>2. Navigate pages | Pagination works correctly |

---

### 2. Create Part
**File:** `part-create.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-PART-020 | Navigate to create form | 1. Click create button | Navigate to /parts/new |
| TC-PART-021 | Create part - all required fields | 1. Fill name, part number<br>2. Submit | Part created |
| TC-PART-022 | Create part - with category | 1. Fill name, part number, category<br>2. Submit | Part created with category |
| TC-PART-023 | Create part - with manufacturer | 1. Include manufacturer info<br>2. Submit | Part created with manufacturer |
| TC-PART-024 | Create part - with cost | 1. Enter cost as decimal<br>2. Submit | Cost saved with 2 decimal precision |
| TC-PART-025 | Create part - with description | 1. Include description<br>2. Submit | Part created with description |
| TC-PART-026 | Create part - with stock quantity | 1. Enter stock quantity<br>2. Submit | Stock level saved |
| TC-PART-027 | Create part - with minimum stock | 1. Enter minimum stock level<br>2. Submit | Minimum stock saved |
| TC-PART-028 | Create part - with storage location | 1. Enter storage location<br>2. Submit | Location saved |
| TC-PART-029 | Create part - all fields | 1. Fill all available fields<br>2. Submit | Part created with all data |
| TC-PART-030 | Validation - missing name | 1. Leave name empty<br>2. Submit | Validation error shown |
| TC-PART-031 | Validation - duplicate part number | 1. Enter existing part number<br>2. Submit | Error: part number exists |
| TC-PART-032 | Validation - invalid cost format | 1. Enter non-numeric cost<br>2. Submit | Validation error for cost |
| TC-PART-033 | Validation - negative cost | 1. Enter negative cost<br>2. Submit | Validation error or acceptance (per requirements) |
| TC-PART-034 | Cost decimal handling | 1. Enter cost with more than 2 decimals | Rounded/truncated to 2 decimals |
| TC-PART-035 | Cancel create | 1. Fill some fields<br>2. Cancel | Return to list, no part created |

**Part Form Fields:**
- Name (required)
- Part Number (required, unique)
- Category
- Manufacturer
- Cost (decimal, 2 places)
- Description
- Stock Quantity
- Minimum Stock Level
- Storage Location

---

### 3. Part Detail View
**File:** `part-detail.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-PART-040 | View part details | 1. Navigate to /parts/:id | Full part information displayed |
| TC-PART-041 | All metadata displayed | 1. View part detail | Name, number, category, manufacturer, cost shown |
| TC-PART-042 | Stock information displayed | 1. View part detail | Stock quantity and minimum stock shown |
| TC-PART-043 | Storage location displayed | 1. View part detail | Storage location shown |
| TC-PART-044 | Usage history displayed | 1. View part with usage | List of repairs where part was used |
| TC-PART-045 | Cost information displayed | 1. View part detail | Cost formatted correctly |
| TC-PART-046 | Edit button visible | 1. View part detail | Edit button accessible |
| TC-PART-047 | Delete button visible | 1. View part detail | Delete button accessible |
| TC-PART-048 | Navigate to work order from usage | 1. Click work order in usage history | Navigate to work order detail |

---

### 4. Edit Part
**File:** `part-edit.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-PART-050 | Navigate to edit form | 1. Click edit button | Navigate to /parts/:id/edit |
| TC-PART-051 | Form pre-populated | 1. Open edit form | All current values displayed |
| TC-PART-052 | Update part name | 1. Change name<br>2. Save | Name updated |
| TC-PART-053 | Update part number | 1. Change part number<br>2. Save | Part number updated |
| TC-PART-054 | Update category | 1. Change category<br>2. Save | Category updated |
| TC-PART-055 | Update manufacturer | 1. Change manufacturer<br>2. Save | Manufacturer updated |
| TC-PART-056 | Update cost | 1. Change cost<br>2. Save | Cost updated |
| TC-PART-057 | Update description | 1. Change description<br>2. Save | Description updated |
| TC-PART-058 | Update stock quantity | 1. Change stock quantity<br>2. Save | Stock updated |
| TC-PART-059 | Update minimum stock | 1. Change minimum stock<br>2. Save | Minimum stock updated |
| TC-PART-060 | Update storage location | 1. Change location<br>2. Save | Location updated |
| TC-PART-061 | Edit validation errors | 1. Clear required field<br>2. Save | Validation error shown |
| TC-PART-062 | Validation - duplicate part number on edit | 1. Change to existing part number<br>2. Save | Error: part number exists |
| TC-PART-063 | Cancel edit | 1. Make changes<br>2. Cancel | Return to detail, no changes |

---

### 5. Delete Part
**File:** `part-delete.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-PART-070 | Delete button shows confirmation | 1. Click delete button | Confirmation dialog appears |
| TC-PART-071 | Confirmation dialog content | 1. Click delete | Dialog shows part name and warning |
| TC-PART-072 | Cancel delete | 1. Click delete<br>2. Cancel confirmation | Part not deleted, modal closes |
| TC-PART-073 | Confirm delete | 1. Click delete<br>2. Confirm | Part deleted, redirected to list |
| TC-PART-074 | Delete part with no usage | 1. Delete part never used | Part deleted successfully |
| TC-PART-075 | Delete part with usage history | 1. Delete part that was used | Either prevented or historical data handled |
| TC-PART-076 | Verify part removed from list | 1. Delete part<br>2. Search for it | Part not found |

---

### 6. Parts in Work Orders
**File:** `parts-work-order-integration.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-PART-080 | Select part in repair action | 1. Add repair action<br>2. Select part | Part added to repair action |
| TC-PART-081 | Parts picker shows all parts | 1. Open parts picker | All available parts listed |
| TC-PART-082 | Search parts in picker | 1. Open picker<br>2. Search | Matching parts shown |
| TC-PART-083 | Set part quantity | 1. Select part<br>2. Enter quantity | Quantity saved |
| TC-PART-084 | Multiple parts in repair action | 1. Select multiple parts | All parts associated with action |
| TC-PART-085 | Parts cost in work order | 1. Add parts<br>2. View WO | Total parts cost calculated |
| TC-PART-086 | Part usage tracking | 1. Use part in WO<br>2. View part detail | WO appears in usage history |
| TC-PART-087 | Stock decrement (if applicable) | 1. Use part in WO<br>2. View part | Stock level decremented |

---

### 7. Stock Management
**File:** `parts-stock.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-PART-090 | View current stock level | 1. View part detail | Stock quantity shown |
| TC-PART-091 | Low stock indicator | 1. Part with stock < minimum | Visual indicator shown |
| TC-PART-092 | Out of stock indicator | 1. Part with stock = 0 | Out of stock warning |
| TC-PART-093 | Stock level in list view | 1. View parts list | Stock visible (if shown in list) |
| TC-PART-094 | Manual stock adjustment | 1. Edit part<br>2. Change stock quantity | Stock updated |

---

## Test Data Requirements

```typescript
// fixtures/parts.ts
export const partTestData = {
  newPart: {
    name: 'Bearing SKF 6205',
    partNumber: 'SKF-6205-2RS',
    category: 'Bearings',
    manufacturer: 'SKF',
    cost: 45.99,
    description: 'Deep groove ball bearing, sealed',
    stockQuantity: 25,
    minimumStock: 10,
    storageLocation: 'Warehouse A, Shelf 3'
  },
  existingParts: [
    {
      name: 'O-Ring Set',
      partNumber: 'OR-SET-001',
      category: 'Seals',
      cost: 12.50
    },
    {
      name: 'Motor Coupling',
      partNumber: 'MC-FLEX-001',
      category: 'Couplings',
      cost: 89.00
    }
  ],
  lowStockPart: {
    name: 'Critical Gasket',
    partNumber: 'GASK-CRIT-001',
    stockQuantity: 2,
    minimumStock: 5
  }
};
```

---

## Page Objects

```typescript
// pages/PartsListPage.ts
class PartsListPage {
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly createButton: Locator;
  readonly partsTable: Locator;

  async search(query: string): Promise<void>;
  async filterByCategory(category: string): Promise<void>;
  async clickPart(partNumber: string): Promise<void>;
  async getPartCount(): Promise<number>;
  async clickCreate(): Promise<void>;
}

// pages/PartDetailPage.ts
class PartDetailPage {
  readonly partName: Locator;
  readonly partNumber: Locator;
  readonly cost: Locator;
  readonly stockQuantity: Locator;
  readonly usageHistory: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;

  async clickEdit(): Promise<void>;
  async clickDelete(): Promise<void>;
  async getStockQuantity(): Promise<number>;
  async getCost(): Promise<number>;
}

// pages/PartFormPage.ts
class PartFormPage {
  readonly nameInput: Locator;
  readonly partNumberInput: Locator;
  readonly categoryInput: Locator;
  readonly manufacturerInput: Locator;
  readonly costInput: Locator;
  readonly descriptionInput: Locator;
  readonly stockQuantityInput: Locator;
  readonly minimumStockInput: Locator;
  readonly storageLocationInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly deleteButton: Locator;

  async fillForm(data: PartData): Promise<void>;
  async submit(): Promise<void>;
  async cancel(): Promise<void>;
  async delete(): Promise<void>;
}

// components/DeleteConfirmationDialog.ts
class DeleteConfirmationDialog {
  readonly dialog: Locator;
  readonly message: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;

  async confirm(): Promise<void>;
  async cancel(): Promise<void>;
  async isVisible(): Promise<boolean>;
}
```
