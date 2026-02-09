# Metralis E2E Testing - Action Items

**Test Date:** January 30, 2026
**Tester:** Automated E2E via Playwright
**Environment:** localhost:5173 (Frontend) / localhost:4000 (Backend)

---

## Summary

| Priority | Bugs | UX Improvements |
|----------|------|-----------------|
| High | 2 | 3 |
| Medium | 2 | 5 |
| Low | 2 | 4 |

---

## 🐛 BUGS TO FIX

### HIGH PRIORITY

#### 1. [object Object] Legend Icons in Dashboard Chart
- **Location:** Dashboard → Machine Status pie chart
- **Issue:** Chart legend displays `[object Object] legend icon` instead of color indicators
- **Impact:** Broken visual appearance, confusing for users
- **Fix:** Check the legend icon rendering in recharts configuration

#### 2. Technical Validation Error Message
- **Location:** Work Order creation form → Asset field
- **Issue:** Shows `"Invalid input: expected string, received undefined"` when no asset selected
- **Expected:** User-friendly message like "Please select an asset"
- **Fix:** Add custom error message in Zod schema or form validation

---

### MEDIUM PRIORITY

#### 3. Chart Dimension Warnings
- **Location:** Dashboard charts
- **Console Warning:** `The width(-1) and height(-1) of chart should be greater than 0`
- **Impact:** Charts may not render correctly on initial load
- **Fix:** Ensure chart container has explicit dimensions before recharts renders

#### 4. HTML Nesting Errors
- **Location:** Asset detail pages, Machine detail pages
- **Console Errors:**
  - `In HTML, cannot be a descendant of <...>`
  - `<...> cannot contain a nested ...`
- **Impact:** Accessibility issues for screen readers
- **Fix:** Review component hierarchy for invalid HTML nesting (likely `<p>` inside `<p>` or similar)

---

### LOW PRIORITY

#### 5. Missing Autocomplete Attributes
- **Location:** Login form, Signup form, Settings forms
- **Console Warning:** `[DOM] Input elements should have autocomplete attributes`
- **Impact:** Reduced browser autofill support, accessibility warning
- **Fix:** Add autocomplete attributes:
  ```html
  <input autocomplete="email" />
  <input autocomplete="current-password" />
  <input autocomplete="new-password" />
  <input autocomplete="name" />
  <input autocomplete="tel" />
  ```

#### 6. Forgot Password Returns 404
- **Location:** Login page → "Forgot password?" link
- **Issue:** Clicking link shows 404 page
- **Fix:** Implement forgot password flow or remove the link

---

## 💡 UX IMPROVEMENTS

### HIGH PRIORITY

#### 1. Make Dashboard Stats Cards Clickable
- **Location:** Dashboard → Stats cards (Active Work Orders, Machines Down, etc.)
- **Current:** Cards are static, not clickable
- **Expected:**
  - Click "Active Work Orders" → Navigate to `/work-orders?status=open`
  - Click "Machines Down" → Navigate to `/assets?status=down`
  - Click "Completed Today" → Navigate to `/work-orders?status=closed&date=today`
- **Benefit:** Quick navigation, intuitive dashboard interaction

#### 2. Add Work Order History to Asset Pages
- **Location:** Asset detail page, Machine detail page
- **Current:** No work order history section visible
- **Expected:** Show recent/related work orders for the asset
- **Benefit:** Quick reference to maintenance history without navigation

#### 3. Add Repair/Maintenance Timeline to Asset Pages
- **Location:** Asset detail page
- **Current:** No timeline or history visible
- **Expected:** Timeline showing status changes, repairs, maintenance events
- **Benefit:** Complete asset lifecycle visibility

---

### MEDIUM PRIORITY

#### 4. Add Work Order Filters
- **Location:** Work Orders list page
- **Current:** Only search box visible
- **Expected:** Add filter dropdowns for:
  - Status (Open, In Progress, Waiting, Closed)
  - Priority (Low, Medium, High, Critical)
  - Date range picker
- **Benefit:** Faster work order triage

#### 5. Link Asset Name to Detail Page in Work Order
- **Location:** Work Order detail page → Asset field
- **Current:** "Freeze Dryer" shown as plain text
- **Expected:** Clickable link to navigate to asset detail
- **Benefit:** Quick navigation between related entities

#### 6. Add Status Timeline to Work Orders
- **Location:** Work Order detail page
- **Current:** No status change history visible
- **Expected:** Timeline showing when status changed and by whom
- **Benefit:** Audit trail for work order lifecycle

#### 7. Add Low Stock Visual Warnings
- **Location:** Parts list and detail pages
- **Current:** Stock level shown but no warning when low
- **Expected:** Visual indicator (red badge, warning icon) when stock < minimum level
- **Benefit:** Proactive inventory management

#### 8. Add Delete Button to Parts Detail Page
- **Location:** Parts detail page
- **Current:** Only "Edit Part" visible
- **Expected:** "Delete Part" button for admins
- **Benefit:** Complete CRUD operations from detail page

---

### LOW PRIORITY

#### 9. Make Metralis Logo Clickable
- **Location:** Sidebar logo
- **Current:** Logo is static
- **Expected:** Click logo → Navigate to dashboard
- **Benefit:** Standard web navigation pattern

#### 10. Add User Dropdown Menu
- **Location:** Header user section
- **Current:** User name, role badge, and logout button separately displayed
- **Expected:** Click username → Dropdown with Settings, Profile, Logout
- **Benefit:** Cleaner header, standard UX pattern

#### 11. Add Chart Legend Interactivity
- **Location:** Dashboard → Machine Status pie chart
- **Current:** Clicking legend items does nothing
- **Expected:** Click legend item → Highlight segment or filter view
- **Benefit:** Better data exploration

#### 12. Add Manual Refresh Button to Dashboard
- **Location:** Dashboard header
- **Current:** No visible refresh button
- **Expected:** Refresh icon to manually update dashboard data
- **Benefit:** User control over data freshness

---

## ✅ THINGS WORKING WELL

These features are well-implemented and should be preserved:

1. **Inline Repair Action Form** - Embedded directly on work order detail page
2. **Automatic Timestamp Recording** - Status changes auto-record times
3. **Dynamic Status Reasons** - Dropdown options change based on status
4. **Bilingual Support** - English/Arabic with RTL support
5. **Hierarchical Asset View** - Tree structure with expand/collapse
6. **Breadcrumb Navigation** - Available on all detail pages
7. **Active Link Highlighting** - Current page clearly indicated in sidebar
8. **Clean 404 Pages** - Consistent design with navigation back
9. **WhatsApp Integration** - Work order notifications
10. **Comprehensive Help Section** - Built-in documentation
11. **AI Disclaimer** - Responsible AI messaging
12. **Role-Based UI** - Admin features properly hidden for technicians

---

## 📋 QUICK REFERENCE

### Files to Check for Bugs

| Bug | Likely File Location |
|-----|---------------------|
| Legend icons | `src/components/Dashboard/MachineStatusChart.tsx` |
| Asset validation | `src/schemas/workOrder.ts` or form component |
| Chart dimensions | `src/components/Dashboard/*.tsx` |
| HTML nesting | `src/pages/Assets/AssetDetail.tsx` |
| Autocomplete | `src/components/Auth/*.tsx`, `src/pages/Settings/*.tsx` |

### Components to Add/Modify for UX

| Feature | Component |
|---------|-----------|
| Clickable stats | `src/components/Dashboard/StatsCard.tsx` |
| Work order history | `src/pages/Assets/AssetDetail.tsx` |
| WO filters | `src/pages/WorkOrders/WorkOrderList.tsx` |
| Status timeline | `src/pages/WorkOrders/WorkOrderDetail.tsx` |
