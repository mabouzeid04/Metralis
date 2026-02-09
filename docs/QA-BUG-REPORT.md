# Metralis QA Bug Report

**Date:** January 30, 2026
**Tester:** Automated Testing via Playwright
**Environment:** localhost:5175 (Frontend) / localhost:4000 (Backend)

---

## Critical Bugs

### 1. AI Chat Returns 500 Internal Server Error
- **Location:** `/ai` - Metralis AI page
- **Steps to Reproduce:**
  1. Navigate to Metralis AI
  2. Select a machine (e.g., Freeze Dryer)
  3. Type a message and click Send
- **Expected:** AI responds with helpful maintenance information
- **Actual:** Server returns 500 Internal Server Error
- **Console Error:** `Failed to load resource: the server responded with a status of 500 (Internal Server Error) @ http://localhost:4000/api/v1/ai/chat`
- **Impact:** Core AI functionality is completely broken

### 2. Forgot Password Feature Not Implemented
- **Location:** `/login` - Login page
- **Steps to Reproduce:**
  1. Navigate to login page
  2. Click "Forgot password?" link
- **Expected:** Password reset page or flow
- **Actual:** 404 page displayed ("The page you are looking for does not exist")
- **Impact:** Users cannot recover forgotten passwords

---

## Medium Priority Bugs

### 3. Dashboard Chart Dimension Warnings
- **Location:** `/` - Dashboard
- **Issue:** Multiple console warnings about chart dimensions being -1
- **Console Warning:** `The width(-1) and height(-1) of chart should be greater than 0`
- **Impact:** Charts may not render properly in certain viewport sizes; indicates improper initialization

### 4. Parts List Cache/Refresh Issue
- **Location:** `/parts` - Parts Inventory
- **Steps to Reproduce:**
  1. Navigate to Parts page
  2. Click "Add Part" and fill in details
  3. Click "Save Part"
  4. Observe the parts list immediately after redirect
- **Expected:** New part appears in list immediately
- **Actual:** List momentarily shows "No parts found" before data appears (requires manual refresh or wait)
- **Impact:** Confusing UX; user may think part wasn't saved

### 5. Work Order Form Title Field Mislabeled
- **Location:** `/work-orders/new` - Create Work Order
- **Issue:** The title input field is labeled "Work Orders" instead of "Title" or "Work Order Title"
- **Expected Label:** "Title" or "Work Order Title"
- **Actual Label:** "Work Orders"
- **Impact:** Confusing for users filling out the form

### 6. Role Assignment Dropdowns Slow to Load
- **Location:** `/work-orders/new` - Create Work Order (Section 8: Role Assignments)
- **Issue:** Multiple dropdowns (Machine Receiver, Responsible Engineer, Maintenance Engineer, Maintenance Manager) show "loading" state for 2-3+ seconds
- **Impact:** Slow UX; users may think the form is broken

---

## Low Priority / UX Improvements

### 7. Duplicate Pending User Display
- **Location:** `/users` - Access Management
- **Issue:** Pending users appear in both the "Pending Technician Requests" section AND the "Team Members" table with status "Pending"
- **Suggestion:** Consider showing pending users only in the dedicated "Pending Technician Requests" section until approved, or clearly differentiate the two views

### 8. Admin Analytics Metrics Show "..." for Extended Period
- **Location:** `/admin/analytics` - Admin Analytics
- **Issue:** Several metrics (AI Queries, Mean Time to Diagnose, Mean Time to Repair, Knowledge Base Coverage) show "..." placeholder text, which could be loading states or null values
- **Suggestion:** Show "0" or "N/A" instead of "..." for clearer communication

### 9. Console Autocompletion Warnings
- **Location:** Multiple pages (Login, Signup, Users)
- **Console Warning:** `[DOM] Input elements should have autocomplete attributes`
- **Impact:** Minor accessibility/UX issue; forms could benefit from proper autocomplete attributes

---

## Features Working Correctly

- Login/Logout flow
- User registration with validation (password mismatch, email validation)
- Dashboard loads with stats and charts
- Asset hierarchy displays correctly with expand/collapse
- Work order creation and listing
- Parts creation (after refresh)
- Settings page profile display
- Access Management user listing and pending requests
- Navigation between all pages
- Admin Analytics insights generation

---

## Test Coverage Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Authentication | Pass | Login/logout working |
| Registration | Pass | Form validation working |
| Forgot Password | Fail | 404 page |
| Dashboard | Pass | Minor chart warnings |
| Assets | Pass | Hierarchy working |
| Work Orders | Pass | Minor label issue |
| Parts | Pass | Cache timing issue |
| Documents | Pass | Empty state working |
| AI Chat | Fail | 500 server error |
| Admin Analytics | Pass | Insights loading |
| Settings | Pass | Profile displayed |
| Access Management | Pass | Users listed |

---

## Recommendations

1. **Immediate:** Fix AI Chat 500 error - this is a core feature
2. **High:** Implement Forgot Password functionality or remove the link
3. **Medium:** Fix React Query cache invalidation for Parts list
4. **Medium:** Fix chart dimension initialization on Dashboard
5. **Low:** Review and fix form labels and autocomplete attributes

---

## Additional Findings from E2E Testing (2026-01-30)

### Additional Bugs Found

#### 10. [object Object] Legend Icons
- **Location:** Dashboard - Machine Status pie chart
- **Issue:** Chart legend displays `[object Object] legend icon` instead of actual color icons
- **Impact:** Poor visual appearance, confusing for users

#### 11. HTML Nesting Errors
- **Location:** Asset detail pages
- **Console Error:** `In HTML, cannot be a descendant of <...>` and `<...> cannot contain a nested ...`
- **Impact:** May affect accessibility and screen readers

#### 12. Technical Validation Error Message
- **Location:** Work Order creation form - Asset field
- **Issue:** Shows `"Invalid input: expected string, received undefined"` instead of user-friendly message
- **Expected:** "Please select an asset"

---

### UX Improvement Suggestions

1. **Make Dashboard Stats Cards Clickable** - Navigate to filtered lists when clicked
2. **Add Work Order History to Asset Pages** - Quick access to maintenance history
3. **Make Metralis Logo Clickable** - Navigate to dashboard (standard web pattern)
4. **Add Error Icons to Validation Messages** - Visual indicator for fields with errors

---

### Positive Observations

- **Excellent inline repair form** for work orders
- **Comprehensive help section** with FAQs and feature guides
- **Clean 404 pages** with navigation back to app
- **Responsive layout** works on mobile (375px) and desktop (1440px)
- **Role-based UI** properly shows/hides admin features
- **Breadcrumb navigation** on detail pages
- **Active link highlighting** in sidebar

---

### E2E Test Execution Summary

| Module | Status |
|--------|--------|
| 01-Authentication | DONE |
| 02-Dashboard | DONE |
| 03-Machines | DONE |
| 04-Assets | DONE |
| 05-Work Orders | DONE |
| 06-Parts Inventory | DONE |
| 07-Documents | DONE |
| 08-AI Chat | DONE |
| 09-Admin Analytics | DONE |
| 10-User Management | DONE |
| 11-Settings | DONE |
| 12-Navigation & Layout | DONE |
| 13-Error Handling | DONE |
| 14-Role-Based Access | DONE |
