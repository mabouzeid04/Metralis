# Design Document: Metralis CMMS Frontend
**Version:** 1.0
**Date:** November 2024
**Status:** Recommended

---

## 1. Executive Summary
This document outlines the design strategy for the Metralis CMMS (Computerized Maintenance Management System). The goal is to create a **utilitarian, high-performance, and modern interface** that dignifies the work of factory technicians and managers.

**Core Design Philosophy:** "Industrial Clarity."
The design must be robust enough for the factory floor (high contrast, clear touch targets) but refined enough for modern management (clean typography, thoughtful whitespace). We avoid "dribbble-style" distinctiveness in favor of clarity, speed, and familiarity.

---

## 2. Design Principles

1.  **Function over Flair:** Every pixel must serve a purpose. Avoid decorative elements that distract from data.
2.  **Mobile-First & Field-Ready:** The primary user is often standing, wearing gloves, or in poor lighting. Buttons must be accessible, and text must be legible on small screens.
3.  **Data Density with Breathing Room:** Managers need to scan lists quickly. Use compact table rows but separate distinct sections (like timelines) with adequate whitespace.
4.  **Instant Feedback:** Every action (save, delete, status change) provides immediate visual feedback (toasts, optimistic UI updates).
5.  **Universal Access (i18n/RTL):** The interface is designed from the ground up to look native in both LTR (English) and RTL (Arabic) layouts.

---

## 3. Color Palette
*Rationale: Avoids the generic "SaaS Purple" and "Startup Blue" clichés. We opt for a sophisticated, industrial palette that feels grounded and professional.*

### Primary Brand Colors
*   **Industrial Slate (Primary):** `#334155` (Slate-700) - Used for primary buttons, active states, and key navigation elements. Solid, reliable, not distracting.
*   **Safety Orange (Accent/Action):** `#F97316` (Orange-500) - Used sparingly for "Call to Action" buttons (e.g., "New Work Order") and critical alerts. Mimics high-visibility safety gear in factories.

### Neutral Tones (The Backbone)
*   **Canvas White:** `#FFFFFF` - Main background.
*   **Off-White/Surface:** `#F8FAFC` (Slate-50) - Secondary backgrounds (sidebars, card headers).
*   **Border/Divider:** `#E2E8F0` (Slate-200) - Subtle separation.
*   **Text Primary:** `#0F172A` (Slate-900) - High contrast for readability.
*   **Text Secondary:** `#64748B` (Slate-500) - Metadata, labels.

### Semantic Status Colors (Crucial for CMMS)
*   **Success/Running:** `#10B981` (Emerald-500) - Machine running, task complete.
*   **Warning/Maintenance:** `#F59E0B` (Amber-500) - Scheduled maintenance, priority medium.
*   **Error/Down:** `#EF4444` (Red-500) - Machine down, critical priority.
*   **Neutral/Idle:** `#94A3B8` (Slate-400) - Machine retired, work order draft.

---

## 4. Typography
*Rationale: Clean, sans-serif, and highly legible. optimized for UI, not editorial.*

**Font Family:** `Inter` (Google Fonts) or system stack (`-apple-system`, `Segoe UI`).
*   **Headings:** `Font-weight: 600` (SemiBold). Tight letter-spacing (`-0.025em`).
*   **Body:** `Font-weight: 400` (Regular). Standard tracking.
*   **Data/Numbers:** `Font-feature-settings: "tnum"` (Tabular Numbers). **Critical** for tables to ensure numbers align vertically.

**Hierarchy Scale:**
*   **Page Title:** 24px (1.5rem) / SemiBold
*   **Section Header:** 18px (1.125rem) / Medium
*   **Body Text:** 14px (0.875rem) / Regular
*   **Small/Metadata:** 12px (0.75rem) / Regular (Color: Slate-500)

---

## 5. Layout Structure

### The "Shell" (AppLayout)
A responsive shell that adapts from desktop to mobile seamlessly.

1.  **Desktop Sidebar (Left):**
    *   Fixed width (e.g., 250px).
    *   Dark or Light theme (Light recommended for cleaner look).
    *   Navigation items: Dashboard, Machines, Work Orders, Parts, Documents.
    *   Bottom section: User Profile snippet (Avatar + Name).

2.  **Mobile Navigation:**
    *   Top Header bar (sticky).
    *   Hamburger menu (left/right depending on locale) opens a slide-out drawer.
    *   "Quick Action" Floating Action Button (FAB) in bottom right for "New Work Order" (Mobile only).

3.  **Main Content Area:**
    *   Max-width container (e.g., `max-w-7xl`) centered.
    *   Padding: `p-4` (mobile) to `p-8` (desktop).
    *   **Page Header:** Title on left, Primary Actions on right (e.g., "Edit Machine").

### RTL Considerations
*   Use CSS Logical Properties (`margin-inline-start` instead of `margin-left`).
*   In Arabic mode, the Sidebar moves to the right, and the entire layout mirrors instantly.

---

## 6. Core Components & Interaction Design

### A. Data Tables (The Workhorse)
*   **Density:** "Comfortable" by default, but "Compact" option for power users.
*   **Striping:** Zebra striping (`even:bg-slate-50`) helps eye-tracking across long rows on wide screens.
*   **Columns:**
    *   **Status:** Always the first or second column, using a "Badge" component.
    *   **Actions:** Always the last column (Edit/View/Delete icons).
    *   **Click Behavior:** Entire row is clickable -> navigates to Detail View.
*   **Mobile View:** Tables transform into "Card Lists" on mobile. Instead of a horizontal scroll (which is painful), hide less important columns and stack the key data (Name, Status, ID) into a vertical card.

### B. Cards & Containers
*   **Style:** Flat white background, 1px border (`slate-200`), subtle shadow (`shadow-sm`).
*   **Header:** Distinct header area with title and optional "Edit" action.
*   **Content:** padded area (`p-4` or `p-6`).

### C. Forms & Inputs
*   **Field Layout:** Stacked labels (label above input) are best for mobile and translation (variable text lengths).
*   **Validation:** Inline error messages appear *below* the input in Red-600.
*   **States:** Distinct Focus ring (Ring-2, Slate-400) for accessibility.
*   **Buttons:**
    *   **Primary:** Slate-900 background, White text.
    *   **Secondary:** White background, Slate-300 border, Slate-700 text.
    *   **Destructive:** White background, Red-500 border, Red-600 text.

### D. Status Badges
*   **Design:** Pill shape, full rounded corners.
*   **Color:** Subtle background with strong text color.
    *   *Example (Running):* Bg-Emerald-50, Text-Emerald-700, Border-Emerald-200.
    *   *Rationale:* Solid color badges can look too heavy when repeated in a table.

---

## 7. User Flow Highlights

### Scenario: Technician Logging a Repair (Mobile Focus)
1.  **Discovery:** Technician scans QR code (future) or searches Machine Name in Global Search.
2.  **Landing:** Arrives at "Machine Detail".
3.  **Action:** Taps large "Report Issue" or "New Work Order" button.
4.  **Input:**
    *   Selects "Priority" (Segmented Control: Low | Med | High).
    *   Types Description (Textarea auto-expands).
    *   Takes photo (Native file input `capture="environment"`).
5.  **Submission:** Taps "Create". Button shows spinner.
6.  **Feedback:** Toast appears: "Work Order #1023 Created". Redirects to the new Work Order detail page.

---

## 8. Accessibility (a11y) Strategy

1.  **Color Contrast:** All text must meet WCAG AA standards (4.5:1 ratio). Light gray text on white backgrounds is strictly forbidden for core content.
2.  **Keyboard Navigation:**
    *   All interactive elements (buttons, inputs, table rows) must be focusable.
    *   Focus states must be clearly visible (thick outline).
3.  **Screen Readers:**
    *   Status icons must have `aria-label` (e.g., generic red dot is invisible to screen readers; use `<span class="sr-only">Status: Down</span>`).
    *   Forms use explicit `<label for="id">` association.

---

## 9. Responsiveness Strategy

*   **0px - 640px (Mobile):**
    *   Sidebar becomes Hamburger Menu/Drawer.
    *   Tables become Stacked Cards.
    *   Modals become full-screen Bottom Sheets.
    *   Font sizes slight bump for readability (16px base).
*   **640px - 1024px (Tablet):**
    *   Sidebar can be "collapsed" (icons only) to save space.
    *   Grid layouts: 2 columns.
*   **1024px+ (Desktop):**
    *   Sidebar fully expanded.
    *   Grid layouts: 3 or 4 columns.
    *   Tables show full column set.

---

## 10. Implementation Recommendations

### Technology Specifics
*   **Framework:** Next.js or React (Vite).
*   **UI Library:** **shadcn/ui** is the perfect match. It uses Tailwind, is accessible by default, and is easily customizable (so it doesn't look "generic" if we tweak the radius and typography).
*   **Icons:** **Lucide React**. Clean, consistent line weight, industrial feel.
*   **Charts:** **Recharts**. Simple, composable, lightweight.

### Best Practices for Dev
*   **Componentize Early:** Create a `<StatusBadge variant="success|warning|error" />` early. Don't hardcode classes.
*   **Mock Data:** Build with realistic, messy data (long names, Arabic text) to test layout durability.
*   **Loading States:** Use "Skeleton" loaders (gray shimmering bars) instead of spinning circles for initial page loads. It feels faster.

