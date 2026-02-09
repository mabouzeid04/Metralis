DONE

# Navigation & Layout E2E Testing Goals

## Overview
Test the overall application navigation, sidebar, header, layout responsiveness, and cross-cutting UI concerns.

---

## Test Scenarios

### 1. Sidebar Navigation
**File:** `sidebar.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-001 | Sidebar visible on desktop | 1. View app at desktop width | Sidebar displayed |
| TC-NAV-002 | Sidebar collapsed on mobile | 1. View app at mobile width | Sidebar collapsed or hidden |
| TC-NAV-003 | Hamburger menu on mobile | 1. View at mobile width | Hamburger button visible |
| TC-NAV-004 | Open sidebar on mobile | 1. Click hamburger menu | Sidebar opens/slides in |
| TC-NAV-005 | Close sidebar on mobile | 1. Open sidebar<br>2. Click close or outside | Sidebar closes |
| TC-NAV-006 | Dashboard link works | 1. Click Dashboard in sidebar | Navigate to / |
| TC-NAV-007 | Machines link works | 1. Click Machines | Navigate to /machines |
| TC-NAV-008 | Assets link works | 1. Click Assets | Navigate to /assets |
| TC-NAV-009 | Work Orders link works | 1. Click Work Orders | Navigate to /work-orders |
| TC-NAV-010 | Parts link works | 1. Click Parts | Navigate to /parts |
| TC-NAV-011 | Documents link works | 1. Click Documents | Navigate to /documents |
| TC-NAV-012 | AI Chat link works | 1. Click AI Chat | Navigate to /ai |
| TC-NAV-013 | Analytics link (admin only) | 1. As admin<br>2. Click Analytics | Navigate to /admin/analytics |
| TC-NAV-014 | Users link (admin only) | 1. As admin<br>2. Click Users | Navigate to /users |
| TC-NAV-015 | Active link highlight | 1. Navigate to a page | Current page link highlighted |
| TC-NAV-016 | Sidebar link icons | 1. View sidebar | Icons displayed for each link |
| TC-NAV-017 | Sidebar collapse/expand (if applicable) | 1. Click collapse button | Sidebar collapses to icons only |

---

### 2. Header/Topbar
**File:** `header.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-020 | Header visible | 1. View any page | Header displayed at top |
| TC-NAV-021 | Logo/brand visible | 1. View header | Metralis logo shown |
| TC-NAV-022 | Logo click navigates home | 1. Click logo | Navigate to dashboard |
| TC-NAV-023 | User menu visible | 1. View header | User menu/avatar shown |
| TC-NAV-024 | User menu dropdown | 1. Click user menu | Dropdown opens |
| TC-NAV-025 | Settings in user menu | 1. Open user menu | Settings option visible |
| TC-NAV-026 | Logout in user menu | 1. Open user menu | Logout option visible |
| TC-NAV-027 | User name displayed | 1. View header | Current user's name shown |
| TC-NAV-028 | Notifications icon (if applicable) | 1. View header | Notification bell visible |
| TC-NAV-029 | Header sticky on scroll | 1. Scroll down | Header stays at top |

---

### 3. Breadcrumbs
**File:** `breadcrumbs.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-030 | Breadcrumbs on detail pages | 1. Navigate to machine detail | Breadcrumb trail shown |
| TC-NAV-031 | Breadcrumb structure | 1. View breadcrumbs | Shows: Home > Section > Item |
| TC-NAV-032 | Breadcrumb links work | 1. Click breadcrumb link | Navigate to that page |
| TC-NAV-033 | Breadcrumb home link | 1. Click Home/Dashboard | Navigate to dashboard |
| TC-NAV-034 | Current page not linked | 1. View breadcrumbs | Current page is text, not link |
| TC-NAV-035 | Nested breadcrumbs | 1. View nested asset | Full hierarchy in breadcrumb |

---

### 4. Layout Responsiveness
**File:** `responsive-layout.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-040 | Desktop layout (1920px) | 1. View at 1920px width | Full layout with sidebar |
| TC-NAV-041 | Laptop layout (1366px) | 1. View at 1366px | Layout adapts appropriately |
| TC-NAV-042 | Tablet layout (768px) | 1. View at 768px | Sidebar collapses or toggleable |
| TC-NAV-043 | Mobile layout (375px) | 1. View at 375px | Mobile-optimized layout |
| TC-NAV-044 | Tables responsive | 1. View tables at mobile | Tables scroll or stack |
| TC-NAV-045 | Forms responsive | 1. View forms at mobile | Forms adapt to screen size |
| TC-NAV-046 | Cards responsive | 1. View cards at mobile | Cards stack vertically |
| TC-NAV-047 | Charts responsive | 1. View charts at mobile | Charts resize appropriately |
| TC-NAV-048 | No horizontal scroll | 1. View at various widths | No unwanted horizontal scroll |
| TC-NAV-049 | Touch targets adequate | 1. View at mobile | Buttons/links easily tappable |

---

### 5. Page Transitions
**File:** `page-transitions.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-050 | Smooth page transitions | 1. Navigate between pages | No jarring transitions |
| TC-NAV-051 | Loading states during navigation | 1. Navigate to data-heavy page | Loading indicator shown |
| TC-NAV-052 | Browser back button works | 1. Navigate forward<br>2. Click back | Returns to previous page |
| TC-NAV-053 | Browser forward button works | 1. Go back<br>2. Click forward | Returns to next page |
| TC-NAV-054 | Deep linking works | 1. Navigate directly to /machines/123 | Page loads correctly |
| TC-NAV-055 | Scroll position reset | 1. Scroll down<br>2. Navigate<br>3. Return | Appropriate scroll behavior |
| TC-NAV-056 | URL updates on navigation | 1. Click sidebar link | URL changes in address bar |

---

### 6. Footer (if applicable)
**File:** `footer.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-060 | Footer visible | 1. Scroll to bottom | Footer displayed |
| TC-NAV-061 | Copyright information | 1. View footer | Copyright text shown |
| TC-NAV-062 | Footer links work | 1. Click footer links | Navigate appropriately |
| TC-NAV-063 | Footer responsive | 1. View at mobile | Footer adapts |

---

### 7. Global Search (if applicable)
**File:** `global-search.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-070 | Search bar visible | 1. View header | Search input shown |
| TC-NAV-071 | Search input focus | 1. Click search bar | Input focused, ready for typing |
| TC-NAV-072 | Search results dropdown | 1. Type search query | Results appear in dropdown |
| TC-NAV-073 | Search finds machines | 1. Search for machine name | Machine results shown |
| TC-NAV-074 | Search finds work orders | 1. Search for WO ID | Work order results shown |
| TC-NAV-075 | Search finds parts | 1. Search for part name | Part results shown |
| TC-NAV-076 | Click search result | 1. Click result | Navigate to that item |
| TC-NAV-077 | Clear search | 1. Type<br>2. Clear | Input cleared, results dismissed |
| TC-NAV-078 | Keyboard navigation | 1. Use arrow keys in results | Navigate results with keyboard |
| TC-NAV-079 | Enter to navigate | 1. Highlight result<br>2. Press Enter | Navigate to result |

---

### 8. Role-Based Navigation Visibility
**File:** `role-navigation.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-080 | Admin sees all nav items | 1. Login as admin | All navigation items visible |
| TC-NAV-081 | Technician sees limited nav | 1. Login as technician | Admin-only items hidden |
| TC-NAV-082 | Analytics hidden for technician | 1. As technician<br>2. Check sidebar | Analytics link not visible |
| TC-NAV-083 | Users hidden for technician | 1. As technician<br>2. Check sidebar | Users link not visible |
| TC-NAV-084 | Navigation updates on role change | 1. Admin changes user role<br>2. User refreshes | Navigation updates |

---

### 9. Keyboard Navigation
**File:** `keyboard-navigation.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-090 | Tab through navigation | 1. Press Tab repeatedly | Navigate through all links |
| TC-NAV-091 | Focus indicators visible | 1. Tab through elements | Clear focus outline shown |
| TC-NAV-092 | Enter activates links | 1. Focus on link<br>2. Press Enter | Link activated |
| TC-NAV-093 | Escape closes menus | 1. Open dropdown<br>2. Press Escape | Dropdown closes |
| TC-NAV-094 | Skip to main content | 1. Press Tab first time | Skip link appears |
| TC-NAV-095 | Skip link works | 1. Activate skip link | Focus moves to main content |

---

### 10. Loading & Error States
**File:** `loading-states.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-NAV-100 | Initial page load indicator | 1. Navigate to app | Loading spinner shown initially |
| TC-NAV-101 | Page transition loading | 1. Navigate between pages | Loading indicator during load |
| TC-NAV-102 | Skeleton loaders (if used) | 1. Load data-heavy page | Skeleton placeholders shown |
| TC-NAV-103 | Error page displayed | 1. Navigate to invalid URL | 404 page shown |
| TC-NAV-104 | Network error handling | 1. Disconnect network | Error message displayed |
| TC-NAV-105 | Retry on error | 1. Error occurs<br>2. Click retry | Data reloads |

---

## Page Objects

```typescript
// components/Sidebar.ts
class Sidebar {
  readonly container: Locator;
  readonly dashboardLink: Locator;
  readonly machinesLink: Locator;
  readonly assetsLink: Locator;
  readonly workOrdersLink: Locator;
  readonly partsLink: Locator;
  readonly documentsLink: Locator;
  readonly aiChatLink: Locator;
  readonly analyticsLink: Locator;
  readonly usersLink: Locator;
  readonly collapseButton: Locator;
  readonly mobileToggle: Locator;

  async navigateTo(page: string): Promise<void>;
  async isLinkVisible(linkName: string): Promise<boolean>;
  async toggleCollapse(): Promise<void>;
  async openMobileMenu(): Promise<void>;
  async closeMobileMenu(): Promise<void>;
  async getActiveLink(): Promise<string>;
}

// components/Header.ts
class Header {
  readonly container: Locator;
  readonly logo: Locator;
  readonly userMenu: Locator;
  readonly userMenuDropdown: Locator;
  readonly settingsLink: Locator;
  readonly logoutButton: Locator;
  readonly userName: Locator;
  readonly searchInput: Locator;
  readonly notificationIcon: Locator;

  async clickLogo(): Promise<void>;
  async openUserMenu(): Promise<void>;
  async logout(): Promise<void>;
  async goToSettings(): Promise<void>;
  async search(query: string): Promise<void>;
  async getUserName(): Promise<string>;
}

// components/Breadcrumb.ts
class Breadcrumb {
  readonly container: Locator;
  readonly items: Locator;
  readonly homeLink: Locator;

  async clickItem(index: number): Promise<void>;
  async getItems(): Promise<string[]>;
  async getCurrentPage(): Promise<string>;
}

// components/GlobalSearch.ts (if applicable)
class GlobalSearch {
  readonly input: Locator;
  readonly resultsDropdown: Locator;
  readonly resultItems: Locator;
  readonly clearButton: Locator;

  async search(query: string): Promise<void>;
  async selectResult(index: number): Promise<void>;
  async clear(): Promise<void>;
  async getResultCount(): Promise<number>;
}
```

---

## Viewport Testing Matrix

| Viewport | Width | Height | Device Type |
|----------|-------|--------|-------------|
| Mobile S | 320px | 568px | Small phone |
| Mobile M | 375px | 667px | iPhone |
| Mobile L | 425px | 812px | Large phone |
| Tablet | 768px | 1024px | iPad |
| Laptop | 1024px | 768px | Small laptop |
| Laptop L | 1440px | 900px | Large laptop |
| Desktop | 1920px | 1080px | Desktop monitor |
| 4K | 2560px | 1440px | Large monitor |
