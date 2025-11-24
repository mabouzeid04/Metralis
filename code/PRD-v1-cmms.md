# Product Requirements Document: CMMS v1.0
## Factory Intelligence Layer - Foundation Release

**Version:** 1.0  
**Date:** 2024  
**Status:** Draft  
**Target Timeline:** 1 week development with AI assistance

---

## 1. Executive Summary

### 1.1 Purpose
This PRD defines the first version of the Factory Intelligence Layer platform: a **standalone, modern CMMS (Computerized Maintenance Management System)** that serves as the foundation for future AI capabilities.

### 1.2 Vision Alignment
While this version contains **no AI features**, every architectural decision is made with the long-term vision in mind:
- **Structured data** that AI can reason over
- **Extensible schema** for future AI integration points
- **Clean separation** between data layer and intelligence layer
- **API-first design** to enable AI agents to read/write seamlessly

### 1.3 Core Value Proposition
A modern, user-friendly CMMS that:
- Replaces spreadsheets, WhatsApp logs, and paper records
- Provides immediate operational value (visibility, organization, history)
- Builds the structured data foundation for future AI capabilities
- Works perfectly standalone, with clear extension points for AI

---

## 2. Scope

### 2.1 In Scope (v1.0)

#### Core Modules
1. **Machine/Asset Management**
   - Machine registry with metadata
   - Machine detail views with history
   - Status tracking
   - Basic categorization and filtering

2. **Work Order Management**
   - Create, edit, assign, close work orders
   - Work order list with filters
   - Work order detail view
   - Status workflow (open → in-progress → closed)
   - Priority and type classification

3. **Symptom & Issue Logging**
   - Structured symptom capture
   - Free-text descriptions
   - Attachment support (photos, videos)
   - Timestamping

4. **Repair Logging**
   - Record repair actions
   - Link parts used
   - Document root cause
   - Mark resolution success

5. **Parts Management (Basic)**
   - Parts catalog
   - Link parts to work orders
   - Basic cost tracking
   - Usage history

6. **Document Management (Basic)**
   - Upload PDFs/manuals
   - Link documents to machines
   - Basic document listing
   - File storage

7. **Machine History Timeline**
   - Chronological view of all events per machine
   - Filter by type, status, date range
   - Link to related work orders

8. **Basic Dashboards**
   - Work orders by status
   - Top failing machines
   - Recent activity
   - Basic metrics (counts, trends)

9. **Search & Filtering**
   - Global search (machines, work orders, parts)
   - Filter by multiple criteria
   - Quick filters

10. **User Management & Authentication**
    - User accounts
    - Basic roles (Admin, Manager, Technician)
    - Authentication (login, logout, session management)
    - Password management
    - User profile/settings
    - Basic permissions

11. **Application Infrastructure**
    - Navigation structure
    - Layout/shell components
    - Error pages (404, 500, unauthorized)
    - Loading states
    - Toast notifications
    - Form validation
    - Protected routes

12. **Internationalization (i18n)**
    - English and Arabic language support
    - RTL (Right-to-Left) layout for Arabic
    - Language switcher in UI
    - UTF-8 database encoding for Arabic characters
    - Translated UI strings

### 2.2 Out of Scope (v1.0)

- **AI Co-Pilot** (chat interface, AI diagnostics, AI-assisted logging)
- **Preventive Maintenance** (schedules, calendars, recurring tasks)
- **Advanced Analytics** (predictive insights, pattern detection, anomaly detection)
- **Multi-plant Support** (single factory/plant only)
- **Multi-Tenancy Implementation** (architecture designed for future separate databases per tenant, but not implemented in v1.0)
- **Advanced Inventory** (stock levels, reorder points, procurement)
- **Notifications/Alerts** (email, SMS, in-app)
- **Mobile App** (web-only, mobile-responsive)
- **OEM Integrations** (future)
- **API for External Systems** (internal API only, no public API yet)
- **Advanced Reporting** (exports, custom reports)

### 2.3 Future Extensibility Points

The architecture must support (but not implement):
- **AI Agent Integration**: API endpoints ready for AI to read/write
- **Embedding Generation**: Schema supports future vector embeddings
- **Knowledge Graph**: Relationships structured for future graph queries
- **Event Streaming**: Architecture supports future real-time updates
- **Multi-Tenancy**: Architecture designed for separate database per tenant (subdomain-based routing)
  - Schema designed without tenant_id columns (ready for separate databases)
  - Connection abstraction layer ready for future tenant routing
  - Database provisioning system can be added without schema changes

---

## 3. User Stories

### 3.1 Technician Stories

**US-1: Create Work Order**
> As a technician, I want to quickly create a work order when I notice a problem, so that the issue is tracked and I can get back to fixing it.

**Acceptance Criteria:**
- Can create work order from "New Work Order" button
- Required fields: machine, title, description
- Optional fields: priority, type, assigned to
- Work order appears in list immediately
- Work order linked to machine history

**US-2: View Machine History**
> As a technician, I want to see what has happened to a machine before, so I can understand recurring issues and past fixes.

**Acceptance Criteria:**
- Can navigate to machine detail page
- See timeline of all work orders for that machine
- Filter by date range, status, type
- Click through to work order details

**US-3: Log Repair**
> As a technician, I want to record what I did to fix a problem, so future technicians can learn from my work.

**Acceptance Criteria:**
- Can add repair actions to work order
- Can select parts used from catalog
- Can mark root cause
- Can mark resolution as successful/failed
- Repair appears in machine history

**US-4: Search for Information**
> As a technician, I want to quickly find machines, work orders, or parts, so I don't waste time navigating.

**Acceptance Criteria:**
- Global search bar accessible from any page
- Search returns machines, work orders, parts
- Results show type and basic info
- Can click through to detail

### 3.2 Manager Stories

**US-5: View Dashboard**
> As a maintenance manager, I want to see an overview of all work orders and machine status, so I can prioritize and allocate resources.

**Acceptance Criteria:**
- Dashboard shows open work orders count
- Shows work orders by status (pie/bar chart)
- Shows top failing machines
- Shows recent activity
- Can click through to filtered lists

**US-6: Assign Work Orders**
> As a maintenance manager, I want to assign work orders to technicians, so work is distributed and tracked.

**Acceptance Criteria:**
- Can assign work order to user
- Assigned work orders visible in user's list
- Can filter work orders by assignee
- Assignment history tracked

**US-7: Review Machine Reliability**
> As a maintenance manager, I want to see which machines fail most often, so I can focus improvement efforts.

**Acceptance Criteria:**
- Dashboard shows machines sorted by failure count
- Can see machine detail with full history
- Can filter by time period
- Can see patterns in failure types

### 3.3 Admin Stories

**US-8: Manage Machines**
> As an admin, I want to add and configure machines, so the system reflects our factory setup.

**Acceptance Criteria:**
- Can create new machine
- Required fields: name, category
- Optional fields: manufacturer, model, serial, line, criticality
- Can edit machine details
- Can mark machine as retired

**US-9: Manage Users**
> As an admin, I want to create user accounts and assign roles, so access is controlled.

**Acceptance Criteria:**
- Can create user account
- Can assign role (Admin, Manager, Technician)
- Can edit user details
- Can deactivate user

**US-10: Upload Documents**
> As an admin, I want to upload machine manuals and link them to machines, so technicians can access documentation.

**Acceptance Criteria:**
- Can upload PDF files
- Can add document metadata (title, type, machine)
- Documents appear in machine detail page
- Can view/download documents

### 3.4 Authentication & Account Stories

**US-11: Sign Up for Account**
> As a new user, I want to create an account, so I can access the system.

**Acceptance Criteria:**
- Signup page with: name, email, password, confirm password
- Validation for all required fields
- Email format validation
- Password requirements (min 8 characters)
- Password confirmation must match
- Error message if email already exists
- Success message and redirect to login (or auto-login)
- Option: Admin approval required before account is active (P1 - configurable)

**US-12: Login to System**
> As a user, I want to log in with my credentials, so I can access the system securely.

**Acceptance Criteria:**
- Login page with email and password fields
- "Sign up" link to registration page
- Validation for empty fields
- Error message for invalid credentials
- Success redirects to dashboard
- Session persists across page refreshes
- Can see current user info in UI

**US-13: Logout from System**
> As a user, I want to log out, so my session is ended and others can't access my account.

**Acceptance Criteria:**
- Logout button accessible from navigation
- Logout clears session/token
- Redirects to login page
- Cannot access protected routes after logout

**US-14: View and Edit Profile**
> As a user, I want to view and edit my profile information, so my account details are correct.

**Acceptance Criteria:**
- Profile page shows: name, email, role
- Can edit name and email
- Changes save successfully
- Validation prevents invalid email format
- Success message confirms changes

**US-15: Change Password**
> As a user, I want to change my password, so I can keep my account secure.

**Acceptance Criteria:**
- Change password form (current, new, confirm)
- Validates current password is correct
- Validates new password meets requirements (min length)
- Validates new password confirmation matches
- Success message on completion
- Can log in with new password

**US-16: Navigate the Application**
> As a user, I want clear navigation, so I can easily find and access different parts of the system.

**Acceptance Criteria:**
- Navigation menu/sidebar visible on all pages
- Menu items: Dashboard, Machines, Work Orders, Parts, Documents, Users (if admin)
- Current page highlighted in navigation
- User name/avatar visible in header
- Logout button accessible
- Mobile-responsive navigation (hamburger menu)

---

## 4. Technical Architecture

### 4.1 Architecture Principles

1. **API-First Design**
   - All UI interactions go through API
   - API ready for future AI agent integration
   - RESTful endpoints with clear contracts

2. **Structured Data Model**
   - Every field chosen for future AI reasoning
   - Normalized schema (no denormalization shortcuts)
   - Rich relationships between entities
   - Extensible fields (JSON columns for future metadata)

3. **Separation of Concerns**
   - Data layer (database, models)
   - Business logic layer (services)
   - API layer (controllers, routes)
   - UI layer (frontend)
   - Clear boundaries for future AI layer insertion

4. **Future-Ready Schema**
   - Fields for embeddings (reserved, not used)
   - Relationship fields for knowledge graph
   - Event timestamps for temporal queries
   - Status fields for workflow automation

5. **Multi-Tenancy Ready (Future)**
   - Schema designed for separate database per tenant (no tenant_id columns)
   - Connection abstraction layer can be added without schema changes
   - Database provisioning system can be implemented later
   - Subdomain-based routing architecture ready for future implementation

6. **Internationalization (i18n)**
   - UTF-8 database encoding (supports Arabic and all Unicode characters)
   - Frontend i18n infrastructure for multiple languages
   - RTL layout support for Arabic
   - Language preference stored per user

### 4.2 Technology Stack Recommendations

**Backend:**
- **Framework**: Node.js/Express or Python/FastAPI (choose based on team preference)
- **Database**: PostgreSQL (for structured data, JSON support, future extensions)
  - UTF-8 encoding (supports Arabic and all Unicode characters)
  - Database designed for future separate database per tenant
- **ORM**: Prisma (Node) or SQLAlchemy (Python) for type-safe models
- **Authentication**: JWT-based auth (simple, extensible)

**Frontend:**
- **Framework**: React with TypeScript
- **UI Library**: Tailwind CSS + shadcn/ui (or similar component library)
- **State Management**: React Query (for server state) + Zustand (for client state)
- **Forms**: React Hook Form + Zod validation
- **i18n**: react-i18next or next-intl (for internationalization)
- **RTL Support**: CSS logical properties or RTL-specific styling

**Infrastructure:**
- **File Storage**: Local filesystem (MVP) or S3-compatible (if cloud)
- **Deployment**: Docker containers (easy to deploy anywhere)

### 4.3 Database Schema

#### Database Configuration

**Encoding:**
- All databases use UTF-8 encoding
- Supports Arabic, English, and all Unicode characters
- Database creation: `CREATE DATABASE metralis_db WITH ENCODING 'UTF8'`

**Multi-Tenancy Design:**
- Schema designed for separate database per tenant (future)
- No `tenant_id` columns needed (each tenant gets own database)
- All tables are tenant-agnostic
- Connection abstraction layer can route to correct tenant database

#### Core Tables

**machines**
```sql
id: UUID (primary key)
name: VARCHAR(255) (required)
code: VARCHAR(100) (optional, human-friendly ID)
category: VARCHAR(100) (pump, filler, conveyor, etc.)
line: VARCHAR(100) (optional)
area: VARCHAR(100) (optional)
manufacturer: VARCHAR(255) (optional)
model: VARCHAR(255) (optional)
serial_number: VARCHAR(255) (optional)
commissioned_at: TIMESTAMP (optional)
status: ENUM('running', 'down', 'maintenance', 'retired') (default: 'running')
criticality: ENUM('low', 'medium', 'high') (default: 'medium')
metadata: JSONB (for future extensions)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

**work_orders**
```sql
id: UUID (primary key)
machine_id: UUID (foreign key → machines.id)
title: VARCHAR(255) (required)
description_raw: TEXT (required, free-text description)
status: ENUM('open', 'in_progress', 'waiting', 'closed') (default: 'open')
type: ENUM('corrective', 'preventive', 'inspection') (default: 'corrective')
priority: ENUM('low', 'medium', 'high', 'critical') (default: 'medium')
reported_at: TIMESTAMP (default: now())
reported_by: UUID (foreign key → users.id)
assigned_to: UUID (nullable, foreign key → users.id)
started_at: TIMESTAMP (nullable)
completed_at: TIMESTAMP (nullable)
symptoms: TEXT[] (array of symptom tags)
suspected_cause: TEXT (nullable, pre-fix)
root_cause: TEXT (nullable, post-fix)
failure_mode: VARCHAR(100) (nullable)
environment_context: JSONB (nullable, for future AI context)
metadata: JSONB (for future extensions)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

**repair_actions**
```sql
id: UUID (primary key)
work_order_id: UUID (foreign key → work_orders.id)
performed_by: UUID (foreign key → users.id)
actions: TEXT (required, what was done)
parts_used: UUID[] (array of part IDs, nullable)
adjustments: TEXT (nullable, alignment, lubrication, etc.)
verification_steps: TEXT (nullable)
success: BOOLEAN (required)
failure_note: TEXT (nullable, if success = false)
metadata: JSONB (for future extensions)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

**parts**
```sql
id: UUID (primary key)
name: VARCHAR(255) (required)
category: VARCHAR(100) (optional)
part_number: VARCHAR(255) (optional)
manufacturer: VARCHAR(255) (optional)
cost: DECIMAL(10,2) (nullable)
description: TEXT (nullable)
metadata: JSONB (for future extensions)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

**work_order_parts** (junction table)
```sql
id: UUID (primary key)
work_order_id: UUID (foreign key → work_orders.id)
part_id: UUID (foreign key → parts.id)
quantity: INTEGER (default: 1)
created_at: TIMESTAMP
```

**documents**
```sql
id: UUID (primary key)
title: VARCHAR(255) (required)
type: ENUM('manual', 'sop', 'troubleshooting', 'other') (default: 'manual')
file_path: VARCHAR(500) (required, path to stored file)
file_size: INTEGER (bytes)
mime_type: VARCHAR(100)
machine_id: UUID (nullable, foreign key → machines.id)
machine_type: VARCHAR(100) (nullable, for linking to machine categories)
language: VARCHAR(10) (default: 'en')
version: VARCHAR(50) (nullable)
metadata: JSONB (for future extensions, tags, etc.)
uploaded_by: UUID (foreign key → users.id)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

**users**
```sql
id: UUID (primary key)
email: VARCHAR(255) (unique, required)
password_hash: VARCHAR(255) (required)
name: VARCHAR(255) (required)
role: ENUM('admin', 'manager', 'technician') (default: 'technician')
active: BOOLEAN (default: true)
last_login_at: TIMESTAMP (nullable)
preferences: JSONB (nullable, for user preferences)
metadata: JSONB (for future extensions)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

**Note on Authentication:**
- JWT tokens stored in HTTP-only cookies (recommended) or localStorage
- Token expiration: 24 hours (configurable)
- Refresh token mechanism (P1 - can be simple for MVP)
- Password requirements: minimum 8 characters (enforced in validation)

**Indexes (for performance and future AI queries):**
- `machines.status`, `machines.category`, `machines.line`
- `work_orders.machine_id`, `work_orders.status`, `work_orders.reported_at`
- `work_orders.symptoms` (GIN index for array searches)
- `documents.machine_id`, `documents.type`
- Full-text search indexes on `work_orders.description_raw`, `machines.name`

### 4.4 API Design

**Base URL:** `/api/v1`

#### Machines
- `GET /machines` - List machines (with filters)
- `GET /machines/:id` - Get machine detail
- `POST /machines` - Create machine
- `PATCH /machines/:id` - Update machine
- `DELETE /machines/:id` - Soft delete (mark retired)
- `GET /machines/:id/history` - Get machine history timeline

#### Work Orders
- `GET /work-orders` - List work orders (with filters)
- `GET /work-orders/:id` - Get work order detail
- `POST /work-orders` - Create work order
- `PATCH /work-orders/:id` - Update work order
- `PATCH /work-orders/:id/assign` - Assign to user
- `PATCH /work-orders/:id/status` - Update status
- `POST /work-orders/:id/repair` - Add repair action

#### Parts
- `GET /parts` - List parts
- `GET /parts/:id` - Get part detail
- `POST /parts` - Create part
- `PATCH /parts/:id` - Update part

#### Documents
- `GET /documents` - List documents
- `GET /documents/:id` - Get document metadata
- `GET /documents/:id/file` - Download file
- `POST /documents` - Upload document (multipart/form-data)
- `DELETE /documents/:id` - Delete document

#### Search
- `GET /search?q=query` - Global search

#### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /dashboard/top-machines` - Get top failing machines

#### Auth
- `POST /auth/signup` - Register new user (name, email, password)
- `POST /auth/login` - Login (email + password)
- `POST /auth/logout` - Logout (invalidate session)
- `GET /auth/me` - Get current user profile
- `POST /auth/refresh` - Refresh JWT token (optional for MVP)
- `POST /auth/change-password` - Change user password
- `POST /auth/forgot-password` - Request password reset (P2 - defer if needed)
- `POST /auth/reset-password` - Reset password with token (P2 - defer if needed)

#### User Profile & Settings
- `GET /users/me` - Get current user details
- `PATCH /users/me` - Update current user profile (name, email)
- `PATCH /users/me/password` - Change password
- `GET /users/me/preferences` - Get user preferences (P1)
- `PATCH /users/me/preferences` - Update user preferences (P1)

**Response Format:**
```json
{
  "data": { ... },
  "meta": { "total", "page", "limit" },
  "error": null
}
```

**Error Format:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Machine name is required",
    "fields": { "name": "required" }
  }
}
```

### 4.5 File Storage

**Current Implementation:**
- S3-compatible storage (MinIO for dev, AWS/Supabase in prod)
- Object keys `documents/{uuid}-{filename}` stored in DB (metadata lives in `documents` table)
- API streams files directly from S3 (auth protected `/documents/:id/file`)

**Future Enhancements:**
- Virus scanning & file size quotas
- Lifecycle rules (archival/deletion)
- Document processing pipeline (chunking/embeddings)

---

## 5. UI/UX Requirements

### 5.1 Design Principles

1. **Mobile-First, Responsive**
   - Works on phone, tablet, desktop
   - Touch-friendly buttons and inputs
   - Readable on small screens

2. **Fast & Simple**
   - Minimal clicks to complete tasks
   - Clear visual hierarchy
   - No unnecessary fields visible by default

3. **Clean & Modern**
   - Modern UI library (shadcn/ui, Material, or similar)
   - Consistent spacing and typography
   - Clear status indicators (colors, badges)

4. **Data-Dense but Readable**
   - Tables with good information density
   - Filters and sorting easily accessible
   - Quick actions (buttons, dropdowns)

5. **Internationalization (i18n)**
   - Support for English and Arabic
   - Language switcher in navigation/header
   - RTL (Right-to-Left) layout for Arabic
   - Use CSS logical properties for RTL compatibility
   - Translated UI strings for all user-facing text
   - Locale-aware date/time and number formatting

### 5.2 Key Pages

#### Authentication Pages

**Signup (`/signup`)**
- Name input field
- Email input field
- Password input field
- Confirm password input field
- Submit button
- "Already have an account? Login" link
- Validation for all fields
- Error messages for validation failures
- Success message and redirect to login (or auto-login)
- Password requirements displayed (min 8 characters)

**Login (`/login`)**
- Email and password input fields
- "Remember me" checkbox (optional)
- "Don't have an account? Sign up" link
- "Forgot password?" link (P2 - can defer)
- Submit button
- Error message display for invalid credentials
- Redirects to dashboard on success
- Redirects to login if not authenticated

**Logout**
- Logout button in navigation/header
- Confirms logout (optional - can be direct)
- Clears session and redirects to login

#### Application Layout

**Main Layout (`/app/*`)**
- Sidebar navigation (desktop) or hamburger menu (mobile)
- Top header with:
  - User name/avatar
  - User dropdown menu (Profile, Settings, Logout)
  - Notifications icon (P2 - placeholder for future)
- Main content area
- Footer (optional - can be minimal)
- Responsive breakpoints

**Navigation Menu Items:**
- Dashboard (icon + text)
- Machines (icon + text)
- Work Orders (icon + text)
- Parts (icon + text)
- Documents (icon + text)
- Users (icon + text, Admin only)
- Profile/Settings (in user dropdown)

#### Core Application Pages

#### Dashboard (`/`)
- Stats cards (open work orders, machines, recent activity)
- Charts (work orders by status, top machines)
- Recent work orders list
- Quick actions (create work order, view machines)

#### Machines List (`/machines`)
- Table with: name, category, line, status, last activity
- Filters: status, category, line
- Search bar
- "New Machine" button
- Click row → machine detail

#### Machine Detail (`/machines/:id`)
- Machine info card (metadata)
- Status badge
- History timeline (chronological list of work orders)
- Linked documents section
- "Create Work Order" button

#### Work Orders List (`/work-orders`)
- Table with: ID, machine, title, status, priority, assigned to, reported date
- Filters: status, type, priority, machine, assignee
- Search bar
- "New Work Order" button
- Click row → work order detail

#### Work Order Detail (`/work-orders/:id`)
- Work order info (title, description, status, priority)
- Machine link
- Status workflow buttons
- Assign dropdown
- Symptoms section
- Repair actions section (add repair button)
- Parts used section
- Root cause section
- Activity timeline

#### Create/Edit Forms
- Clean, single-column forms
- Required fields clearly marked
- Validation errors inline
- Cancel/Save buttons

#### Search Results (`/search?q=...`)
- Grouped by type (Machines, Work Orders, Parts)
- Click through to detail pages

#### User Profile & Settings

**Profile (`/profile` or `/settings/profile`)**
- User info card: Name, Email, Role
- Edit button opens edit form
- Change password section
- Form validation
- Success/error messages

**Settings (`/settings` or `/settings/preferences`)**
- User preferences (P1 - can be basic for MVP)
- Theme preference (P2 - defer)
- Language preference (P2 - defer)
- Notification preferences (P2 - defer)

#### Error Pages

**404 Not Found (`/404`)**
- Friendly error message
- "Go to Dashboard" button
- Navigation back to main app

**500 Server Error (`/500`)**
- Error message
- "Try Again" button
- Contact support info (optional)

**401 Unauthorized (`/unauthorized`)**
- Message explaining access denied
- "Go to Dashboard" or "Login" button

**403 Forbidden**
- Message for insufficient permissions
- "Go Back" button

### 5.3 Components Needed

**Layout Components:**
- **AppLayout**: Main application shell with sidebar and header
- **Sidebar**: Navigation menu (collapsible on mobile)
- **Header**: Top bar with user menu and actions
- **UserMenu**: Dropdown with profile, settings, logout
- **ProtectedRoute**: Route wrapper that checks authentication
- **LoadingSpinner**: Loading indicator for async operations
- **ErrorBoundary**: React error boundary for error handling

**Data Display:**
- **DataTable**: Sortable, filterable table component
- **StatusBadge**: Color-coded status indicators
- **Timeline**: Chronological event display
- **Card**: For grouping related info
- **Chart**: Simple bar/pie charts (recharts or similar)

**Forms & Inputs:**
- **FormFields**: Text, select, textarea, file upload
- **FormValidation**: Inline validation messages
- **FormError**: Error message display
- **SearchBar**: Global search input
- **FilterBar**: Multi-select filters

**Feedback:**
- **Toast**: Toast notifications for success/error messages
- **Modal**: For confirmations, quick edits
- **ConfirmDialog**: Confirmation dialog for destructive actions
- **Alert**: Alert banners for important messages

**Authentication:**
- **LoginForm**: Login page form component
- **PasswordInput**: Password input with show/hide toggle
- **AuthGuard**: Component that redirects if not authenticated

### 5.4 Responsive Breakpoints

- Mobile: < 768px (single column, stacked)
- Tablet: 768px - 1024px (2 columns where appropriate)
- Desktop: > 1024px (full layout)

---

## 6. Implementation Plan

### 6.1 Week Breakdown

**Day 1: Setup & Database**
- Project setup (repo, dependencies)
- Database schema implementation
- Migration scripts
- Seed data (for development)

**Day 2: Backend API - Core Entities**
- Machine CRUD endpoints
- Work Order CRUD endpoints
- Basic auth endpoints
- Database models/ORM setup

**Day 3: Backend API - Supporting Features**
- Parts endpoints
- Documents endpoints (upload/download)
- Search endpoint
- Dashboard stats endpoint

**Day 4: Frontend - Core Pages**
- Dashboard page
- Machines list & detail
- Work Orders list & detail
- Basic navigation

**Day 5: Frontend - Forms & Interactions**
- Create/edit forms
- Status updates
- Assignment flows
- Search UI

**Day 6: Frontend - Polish & Integration**
- Repair logging UI
- Parts linking
- Document management UI
- Responsive design

**Day 7: Testing & Deployment**
- Manual testing of all flows
- Bug fixes
- Basic error handling
- Deployment setup (Docker, env config)
- Documentation

### 6.2 Development Priorities

**See Section 15 for complete prioritized feature list.**

**Quick Summary:**
- **P0 (Must Have)**: Auth, Machines CRUD, Work Orders CRUD, Machine History, Repair Logging
- **P1 (Should Have)**: Dashboard, Search, Parts, Documents, User Management
- **P2 (Nice to Have)**: Advanced filters, Charts, Exports, Polish

### 6.3 Technical Debt to Accept

For speed, accept these shortcuts (fix in v1.1):
- Basic file upload (no virus scanning, size limits only)
- Simple search (no full-text search, just LIKE queries)
- No pagination (load all records, max 1000)
- No caching (direct DB queries)
- Basic error messages (not user-friendly)
- No audit logs (just created_at/updated_at)

---

## 7. Success Criteria

### 7.1 Functional Criteria

- ✅ All core user stories implemented and testable
- ✅ Can create, view, edit, close work orders
- ✅ Can view machine history
- ✅ Can upload and view documents
- ✅ Can search for machines/work orders
- ✅ Dashboard shows meaningful stats

### 7.2 Technical Criteria

- ✅ API endpoints return correct data
- ✅ Database schema supports future AI extensions
- ✅ Code is organized and maintainable
- ✅ Basic error handling in place
- ✅ Authentication works
- ✅ File uploads work

### 7.3 Quality Criteria

- ✅ No critical bugs (data loss, security issues)
- ✅ UI is responsive and usable
- ✅ Forms validate input
- ✅ Navigation is intuitive
- ✅ Performance acceptable (< 2s page loads)

### 7.4 Future-Readiness Criteria

- ✅ Schema has fields for future AI (metadata JSONB, embedding fields reserved)
- ✅ API structure supports AI agent integration
- ✅ Data model supports knowledge graph relationships
- ✅ Clear separation allows AI layer insertion

---

## 8. Open Questions & Decisions Needed

### 8.1 Technical Decisions

1. **Backend Language**: Node.js/Express vs Python/FastAPI?
2. **Frontend Framework**: React confirmed, but which UI library?
3. **Database Hosting**: Local PostgreSQL vs managed service?
4. **File Storage**: Local filesystem vs cloud storage (S3)?
5. **Deployment**: Docker on VPS vs cloud platform (Railway, Render, etc.)?

### 8.2 Product Decisions

1. **User Roles**: Are 3 roles (Admin, Manager, Technician) sufficient for MVP?
2. **Signup Flow**: 
   - Option A: Self-service signup (users can register themselves) - Recommended for MVP
   - Option B: Admin-only user creation (no public signup) - More secure but requires admin to create all users
   - Option C: Self-service signup with admin approval (users sign up, admins approve) - P1 feature
   - **Recommendation**: Start with Option A (self-service) for MVP, can add approval workflow later
3. **Language Support**: English and Arabic for v1.0
   - **Recommendation**: Full i18n infrastructure (P0), Arabic translations (P1)
4. **RTL Layout**: Full RTL support for Arabic interface
   - **Recommendation**: Use CSS logical properties for RTL compatibility
5. **Work Order Types**: Are corrective/preventive/inspection enough?
6. **Priority Levels**: Are 4 levels (low/medium/high/critical) enough?
7. **Machine Status**: Are 4 statuses (running/down/maintenance/retired) enough?
8. **Multi-Tenancy**: Architecture ready for future, but not implemented in v1.0
   - **Recommendation**: Design schema for separate databases per tenant (no tenant_id columns)

### 8.3 Future Considerations

1. **Multi-tenancy**: Single-tenant for MVP, but schema should support multi-tenant?
2. **API Versioning**: Start with `/api/v1` for future compatibility?
3. **Event Logging**: Should we log all changes for audit trail (future feature)?

---

## 9. Dependencies & Assumptions

### 9.1 Dependencies

- PostgreSQL database (local or managed)
- Node.js/Python runtime
- File storage (local or cloud)
- Development environment setup

### 9.2 Assumptions

- Single factory/plant (no multi-tenant needed yet, but architecture ready for future)
- Small team (< 50 users initially)
- English and Arabic languages supported (i18n implemented)
- No real-time requirements (polling acceptable)
- No offline mode needed
- Single database per deployment (future: separate database per tenant)

---

## 10. Risk Mitigation

### 10.1 Technical Risks

**Risk**: Database schema changes needed for AI
**Mitigation**: Use JSONB fields for extensibility, reserve embedding columns

**Risk**: Performance issues with large datasets
**Mitigation**: Add indexes, accept pagination limitation in MVP

**Risk**: File storage issues
**Mitigation**: Abstract storage layer, easy to swap implementations

### 10.2 Scope Risks

**Risk**: Feature creep (adding AI features)
**Mitigation**: Strict scope control, AI features explicitly out of scope

**Risk**: Over-engineering for future
**Mitigation**: Balance - add extensibility points, but don't build unused features

---

## 11. Appendix

### 11.1 Data Model Diagram

```
users
  └─ work_orders (reported_by, assigned_to)
  └─ repair_actions (performed_by)
  └─ documents (uploaded_by)

machines
  └─ work_orders (machine_id)
  └─ documents (machine_id)

work_orders
  └─ repair_actions (work_order_id)
  └─ work_order_parts (work_order_id)

parts
  └─ work_order_parts (part_id)

documents
  └─ machines (via machine_id or machine_type)
```

### 11.2 API Examples

**Signup:**
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "confirmPassword": "securepassword123"
}

Response:
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "technician",
    "active": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Login:**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "technician"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Create Work Order:**
```http
POST /api/v1/work-orders
Content-Type: application/json
Authorization: Bearer {token}

{
  "machine_id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Vibration on gearbox",
  "description_raw": "Machine making loud grinding noise, vibration increasing",
  "type": "corrective",
  "priority": "high",
  "symptoms": ["vibration", "noise"]
}
```

**Get Machine History:**
```http
GET /api/v1/machines/123e4567-e89b-12d3-a456-426614174000/history?limit=50
Authorization: Bearer {token}
```

**Upload Document:**
```http
POST /api/v1/documents
Content-Type: multipart/form-data
Authorization: Bearer {token}

{
  "title": "Krones Variopac Manual",
  "type": "manual",
  "machine_id": "123e4567-e89b-12d3-a456-426614174000",
  "file": <binary>
}
```

### 11.3 Future AI Integration Points

**Reserved Fields:**
- `machines.metadata` → Future: machine embeddings, health scores
- `work_orders.metadata` → Future: AI confidence scores, reasoning traces
- `work_orders.environment_context` → Future: sensor data, conditions
- `documents.metadata` → Future: chunk IDs, embedding references

**Future API Endpoints:**
- `POST /api/v1/ai/diagnose` → AI diagnostic endpoint
- `POST /api/v1/ai/assist-logging` → AI-assisted data entry
- `GET /api/v1/ai/patterns` → Pattern detection

**Future Database Extensions:**
- `work_orders.embedding` → Vector embedding for semantic search
- `machines.health_score` → Computed health metric
- `work_orders.ai_suggestions` → AI-generated recommendations

---

## 12. Essential Basics Checklist

### 12.0 Critical Infrastructure (Often Forgotten)

This section ensures all foundational features are included. These are **non-negotiable** for a production-ready application.

#### Authentication Flow
- ✅ Signup page with name, email, password, confirm password
- ✅ Signup API endpoint with validation
- ✅ Email uniqueness check
- ✅ Password requirements validation
- ✅ Login page with email/password
- ✅ Login API endpoint with validation
- ✅ JWT token generation and storage
- ✅ Session persistence (token in localStorage/cookie)
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Logout functionality (clear token, redirect)
- ✅ Get current user endpoint
- ✅ Token expiration handling
- ✅ Auto-redirect to login on 401 errors
- ✅ "Remember me" functionality (optional for MVP)
- ✅ Link between login and signup pages

#### User Session Management
- ✅ Store user info in context/state after login
- ✅ Display user name/avatar in header
- ✅ User dropdown menu (Profile, Logout)
- ✅ Check authentication on app load
- ✅ Handle token expiration gracefully
- ✅ Refresh user data when needed

#### Application Layout
- ✅ Main application shell/layout component
- ✅ Sidebar navigation (desktop)
- ✅ Mobile hamburger menu
- ✅ Header with user menu
- ✅ Footer (minimal or none)
- ✅ Consistent spacing and styling
- ✅ Responsive breakpoints

#### Error Handling
- ✅ 404 Not Found page
- ✅ 500 Server Error page
- ✅ 401 Unauthorized page
- ✅ 403 Forbidden page
- ✅ Error boundary (React error boundary)
- ✅ API error handling (try/catch)
- ✅ Form validation errors
- ✅ Toast notifications for errors
- ✅ Loading states for async operations

#### Form Essentials
- ✅ Form validation (required fields, email format, etc.)
- ✅ Error messages display
- ✅ Success messages (toast)
- ✅ Loading states during submission
- ✅ Disable submit button while processing
- ✅ Clear form after successful submission
- ✅ Cancel/Back buttons

#### Navigation
- ✅ Navigation menu items
- ✅ Active page highlighting
- ✅ Breadcrumbs (optional for MVP)
- ✅ Back button functionality
- ✅ Mobile menu toggle

#### User Profile & Settings
- ✅ Profile page (view/edit name, email)
- ✅ Change password form
- ✅ Password validation (min length, confirmation match)
- ✅ Success confirmation messages
- ✅ Settings page structure (for future preferences)

#### Data Display
- ✅ Empty states (no data messages)
- ✅ Loading skeletons/spinners
- ✅ Error states (failed to load)
- ✅ Pagination or "load more" (if needed)
- ✅ Table sorting (if applicable)
- ✅ Table filtering (if applicable)

#### Security Basics
- ✅ Password hashing (bcrypt/argon2)
- ✅ Input sanitization
- ✅ SQL injection prevention (use ORM/parameterized queries)
- ✅ XSS prevention (sanitize user input)
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ HTTPS in production

#### Development Essentials
- ✅ Environment configuration (.env files)
- ✅ Database migrations
- ✅ Seed data for development
- ✅ Error logging (console for MVP, proper logging for production)
- ✅ API documentation (comments or README)

#### Internationalization (i18n)
- ✅ UTF-8 database encoding
- ✅ i18n library setup (react-i18next or similar)
- ✅ Translation files structure (en.json, ar.json)
- ✅ Language switcher component
- ✅ RTL layout support (CSS logical properties)
- ✅ User language preference storage
- ✅ Locale-aware date/time formatting
- ✅ Locale-aware number formatting

---

## 13. Internationalization (i18n) Requirements

### 13.0 Overview

The system supports multiple languages with full internationalization infrastructure. For v1.0, English and Arabic are supported.

### 13.1 Supported Languages

- **English (en)**: Default language
- **Arabic (ar)**: Full support with RTL layout

### 13.2 Database Requirements

**Encoding:**
- All PostgreSQL databases use UTF-8 encoding
- All VARCHAR/TEXT columns support Unicode characters (Arabic, etc.)
- Database creation: `CREATE DATABASE metralis_db WITH ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8'`

**Character Support:**
- No character encoding limitations
- All text fields support Arabic characters
- Search and filtering work with Arabic text

### 13.3 Frontend Requirements

**i18n Library:**
- Use react-i18next, next-intl, or similar
- Translation files: `locales/en/` and `locales/ar/`
- Language detection from browser or user preference
- Language switcher in navigation/header

**RTL (Right-to-Left) Layout:**
- Full RTL support for Arabic interface
- Use CSS logical properties (`margin-inline`, `padding-inline`, `text-align: start`)
- Or RTL-specific CSS classes with `[dir="rtl"]` selector
- Icons and arrows may need mirroring in RTL
- Test all UI components in RTL mode

**Translation Files Structure:**
```
locales/
  en/
    common.json       # Common strings (buttons, labels, etc.)
    machines.json     # Machine-related strings
    workOrders.json   # Work order strings
    auth.json         # Authentication strings
    dashboard.json    # Dashboard strings
    ...
  ar/
    common.json
    machines.json
    workOrders.json
    auth.json
    dashboard.json
    ...
```

**Example Translation File:**
```json
// locales/en/common.json
{
  "buttons": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "messages": {
    "success": "Operation completed successfully",
    "error": "An error occurred"
  }
}

// locales/ar/common.json
{
  "buttons": {
    "save": "حفظ",
    "cancel": "إلغاء",
    "delete": "حذف"
  },
  "messages": {
    "success": "تمت العملية بنجاح",
    "error": "حدث خطأ"
  }
}
```

### 13.4 Backend Requirements

**API Responses:**
- Can include language preference in user context
- Date/time formatting based on locale (optional for MVP)
- Validation messages can be localized (P2)

**User Language Preference:**
- Store user's language preference in user profile
- Default to browser language or English
- Update preference when user changes language

### 13.5 Implementation Details

**Database Connection:**
```javascript
// Ensure UTF-8 encoding
const connection = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    charset: 'utf8' // Explicit UTF-8
  }
};
```

**Frontend i18n Setup:**
```javascript
// Example with react-i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/common.json';
import arTranslations from './locales/ar/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations }
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
```

**RTL CSS Support:**
```css
/* Use logical properties for RTL support */
.container {
  margin-inline-start: 1rem; /* left in LTR, right in RTL */
  padding-inline-end: 1rem;  /* right in LTR, left in RTL */
  text-align: start;          /* left in LTR, right in RTL */
}

/* Or use RTL-specific classes */
[dir="rtl"] .sidebar {
  right: 0;
  left: auto;
}

[dir="rtl"] .icon-arrow {
  transform: scaleX(-1); /* Mirror icon */
}
```

**Language Switcher Component:**
- Dropdown or toggle in header/navigation
- Options: English, العربية (Arabic)
- Updates user preference and reloads translations
- Persists selection in localStorage

### 13.6 Testing Requirements

- Test all UI components in both LTR and RTL modes
- Verify Arabic text displays correctly
- Test form inputs with Arabic text
- Test search with Arabic characters
- Verify date/time formatting per locale
- Test navigation and layout in RTL

### 13.7 Future Extensions

- Additional languages (French, Spanish, etc.)
- Advanced locale-specific formatting
- Right-to-left table layouts
- Bi-directional text support

---

## 14. Multi-Tenancy Architecture (Future-Ready)

### 14.0 Overview

The architecture is designed to support multi-tenancy with separate databases per tenant in the future. This is **not implemented in v1.0**, but the design ensures easy migration when needed.

### 14.1 Architecture Design

**Current (v1.0):**
- Single database per deployment
- All users access the same database
- No tenant isolation needed

**Future (Multi-Tenant):**
- Separate PostgreSQL database per tenant
- Subdomain-based routing (e.g., `acme.metralis.com` → `acme_metralis_db`)
- Tenant registry database (shared) maps subdomains to databases
- Dynamic database connection routing based on subdomain

### 14.2 Schema Design

**No Tenant ID Columns:**
- Schema designed without `tenant_id` columns
- Each tenant gets their own database with identical schema
- No need to filter queries by tenant (automatic isolation)

**Benefits:**
- Stronger data isolation
- Better security (no cross-tenant data access risk)
- Easier compliance (GDPR, SOC 2)
- Independent backups per tenant
- Independent scaling per tenant

### 14.3 Future Implementation Components

**Tenant Registry Database (Shared):**
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  subdomain VARCHAR(100) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  database_name VARCHAR(100) NOT NULL,
  status ENUM('active', 'suspended', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Connection Management:**
- Dynamic database connection based on tenant subdomain
- Connection pooling per tenant
- Cached connections for performance

**Middleware:**
- Extract subdomain from request hostname
- Lookup tenant in registry database
- Route to tenant's database
- All queries automatically use tenant's database

### 14.4 Migration Path

When implementing multi-tenancy:
1. Create tenant registry database
2. Add connection management layer
3. Add tenant identification middleware
4. Provision separate databases for each tenant
5. Migrate existing data to tenant databases (if needed)
6. No schema changes required (already tenant-agnostic)

### 14.5 Current Implementation Notes

**For v1.0:**
- Single database connection
- No tenant routing needed
- Schema is already tenant-agnostic (ready for future)
- No special considerations needed

**Future Considerations:**
- Database provisioning automation
- Tenant management UI (super admin)
- Database migration system for multiple tenants
- Connection pooling and management
- Monitoring per tenant

---

## 15. Feature Prioritization

### 15.0 Quick Reference Table

| Feature Category | P0 (Must Build) | P1 (Should Build) | P2 (Nice to Have) |
|-----------------|------------------|-------------------|-------------------|
| **Auth** | Signup, Login, Logout, Session, Protected Routes | Profile, Change Password, Token Refresh | Password Reset, Advanced Permissions |
| **Machines** | Full CRUD, History | Filters, Search | Bulk operations |
| **Work Orders** | Full CRUD, Status | Assignment, Filters | Attachments, Export |
| **Repairs** | Add repair, Root cause | Link parts | Advanced tracking |
| **Parts** | - | Full CRUD, Link to WO | Usage history, Costs |
| **Documents** | - | Upload, View, Link | Search, Preview |
| **Dashboard** | Basic stats | Charts, Top machines | Advanced metrics |
| **Search** | - | Global search | Full-text search |
| **UI/UX** | Layout, Navigation, Error Pages, Forms, Validation | Responsive, Filters, Toast, Loading States | Dark Mode, Shortcuts, Advanced Polish |
| **Infrastructure** | Error Handling, Protected Routes, Layout | Toast System, Confirmation Dialogs | Advanced Error Recovery |

**Build Order:** P0 → P1 → P2 (if time)

### 15.1 Priority Definitions

- **P0 (Critical - Build First)**: Core functionality required for basic CMMS operation. System is unusable without these.
- **P1 (Important - Build Second)**: Essential for a complete product. Users expect these features.
- **P2 (Nice to Have - Build Last)**: Enhancements that improve UX but aren't blockers. Can be deferred to v1.1.

### 15.2 Complete Feature Priority List

#### P0 - Critical Features (Build First)

**Authentication & Session Management**
- ✅ User signup endpoint (P0)
- ✅ User login endpoint (P0)
- ✅ User logout endpoint (P0)
- ✅ JWT authentication (P0)
- ✅ Get current user endpoint (P0)
- ✅ Signup page UI (P0)
- ✅ Login page UI (P0)
- ✅ Session persistence (P0)
- ✅ Protected routes (P0)
- ✅ Redirect to login if not authenticated (P0)
- ✅ Basic user model (P0)
- ✅ Password hashing (bcrypt/argon2) (P0)
- ✅ Email uniqueness validation (P0)
- ✅ Password requirements validation (P0)
- ⚠️ Token refresh mechanism (P1)
- ⚠️ Password reset flow (P2)
- ⚠️ Admin approval for signups (P1 - optional, can be configurable)

**User Profile & Settings**
- ✅ Get user profile endpoint (P0)
- ✅ Update user profile endpoint (P0)
- ✅ Change password endpoint (P0)
- ✅ Profile page UI (P1)
- ✅ Change password form (P1)
- ✅ User preferences storage (P1)
- ⚠️ User preferences UI (P2)

**User Management (Admin)**
- ✅ Create user endpoint (P1)
- ✅ List users endpoint (P1)
- ✅ Update user endpoint (P1)
- ✅ User management UI (P1)
- ✅ Role assignment (P1)
- ⚠️ User deactivation (P2)

**Machines/Assets**
- ✅ Create machine (P0)
- ✅ List machines (P0)
- ✅ Get machine detail (P0)
- ✅ Update machine (P0)
- ✅ Machine list UI (P0)
- ✅ Machine detail UI (P0)
- ✅ Machine create/edit form (P0)
- ⚠️ Machine delete/retire (P1 - can mark as retired via update)

**Work Orders - Core**
- ✅ Create work order (P0)
- ✅ List work orders (P0)
- ✅ Get work order detail (P0)
- ✅ Update work order (P0)
- ✅ Update work order status (P0)
- ✅ Work order list UI (P0)
- ✅ Work order detail UI (P0)
- ✅ Work order create/edit form (P0)
- ✅ Work order status workflow (P0)

**Work Orders - Repair Logging**
- ✅ Add repair action to work order (P0)
- ✅ Repair actions UI (P0)
- ✅ Root cause field (P0)
- ✅ Success/failure tracking (P0)
- ⚠️ Parts linking in repair (P1 - can be text initially)

**Machine History**
- ✅ Machine history timeline endpoint (P0)
- ✅ Machine history UI (P0)
- ✅ Link work orders to machine history (P0)

**Application Infrastructure & Layout**
- ✅ Application layout/shell (P0)
- ✅ Navigation sidebar/menu (P0)
- ✅ Header with user menu (P0)
- ✅ User dropdown menu (Profile, Logout) (P0)
- ✅ Protected route wrapper (P0)
- ✅ Error boundary component (P0)
- ✅ Loading spinner component (P0)
- ✅ Toast notification system (P0)
- ✅ 404 error page (P0)
- ✅ 500 error page (P0)
- ✅ 401 unauthorized page (P0)
- ✅ Form validation (P0)
- ✅ Error message display (P0)

**Database & Infrastructure**
- ✅ Database schema (all core tables) (P0)
- ✅ Database migrations (P0)
- ✅ UTF-8 database encoding (P0)
- ✅ Basic error handling (P0)
- ✅ API response format (P0)
- ✅ Project setup (P0)
- ✅ Environment configuration (P0)
- ✅ CORS configuration (P0)

**Internationalization (i18n)**
- ✅ i18n library setup (P0)
- ✅ Translation file structure (P0)
- ✅ UTF-8 encoding for Arabic support (P0)
- ✅ Language switcher UI (P1)
- ✅ Arabic translations (P1)
- ✅ RTL layout support (P1)
- ✅ User language preference (P1)
- ⚠️ Locale-aware formatting (P2)

#### P1 - Important Features (Build Second)

**Dashboard**
- ✅ Dashboard stats endpoint (P1)
- ✅ Dashboard UI (P1)
- ✅ Work orders by status chart (P1)
- ✅ Top failing machines list (P1)
- ✅ Recent activity feed (P1)
- ⚠️ Advanced metrics (P2)

**Search**
- ✅ Global search endpoint (P1)
- ✅ Search UI (P1)
- ✅ Search results page (P1)
- ⚠️ Full-text search (P2 - simple LIKE queries for MVP)

**Parts Management**
- ✅ Create part (P1)
- ✅ List parts (P1)
- ✅ Get part detail (P1)
- ✅ Update part (P1)
- ✅ Parts list UI (P1)
- ✅ Parts create/edit form (P1)
- ✅ Link parts to work orders (P1)
- ✅ Parts used in work order UI (P1)
- ⚠️ Parts usage history (P2)
- ⚠️ Parts cost tracking (P2)

**Document Management**
- ✅ Upload document endpoint (P1)
- ✅ List documents (P1)
- ✅ Get document metadata (P1)
- ✅ Download document file (P1)
- ✅ Document list UI (P1)
- ✅ Document upload form (P1)
- ✅ Link documents to machines (P1)
- ✅ Documents section in machine detail (P1)
- ⚠️ Document search within files (P2)
- ⚠️ Document preview (P2)

**User Management**
- ✅ Create user endpoint (P1)
- ✅ List users (P1)
- ✅ Update user (P1)
- ✅ User management UI (P1)
- ✅ Role assignment (P1)
- ⚠️ User deactivation (P2)

**Work Orders - Advanced**
- ✅ Assign work order to user (P1)
- ✅ Assignment UI (P1)
- ✅ Filter work orders by assignee (P1)
- ✅ Work order filters (status, type, priority, machine) (P1)
- ⚠️ Work order attachments (P2)
- ⚠️ Work order comments/activity log (P2)

**Machines - Advanced**
- ✅ Machine filters (status, category, line) (P1)
- ✅ Machine search (P1)
- ⚠️ Machine status bulk update (P2)

**UI/UX Enhancements**
- ✅ Responsive design (mobile-friendly) (P1)
- ✅ Mobile navigation (hamburger menu) (P1)
- ✅ Status badges/indicators (P1)
- ✅ Loading states for async operations (P1)
- ✅ Success/error toast messages (P1)
- ✅ Confirmation dialogs for destructive actions (P1)
- ✅ Empty states (no data messages) (P1)
- ⚠️ Advanced filters UI (P2)
- ⚠️ Keyboard shortcuts (P2)


#### P2 - Nice to Have (Build Last / Defer)

**Advanced Features**
- ⚠️ Export work orders to CSV/PDF (P2)
- ⚠️ Export machine history (P2)
- ⚠️ Advanced charts (trends, comparisons) (P2)
- ⚠️ Work order templates (P2)
- ⚠️ Bulk operations (P2)
- ⚠️ Audit logs (P2)

**UI Polish**
- ⚠️ Better error messages (P2)
- ⚠️ Toast notifications (P2)
- ⚠️ Confirmation modals (P2)
- ⚠️ Drag-and-drop file uploads (P2)
- ⚠️ Image previews (P2)
- ⚠️ Dark mode (P2)

**Performance**
- ⚠️ Pagination (P2 - accept loading all for MVP)
- ⚠️ Caching (P2)
- ⚠️ Optimistic updates (P2)

### 15.3 API Endpoint Priority

#### P0 Endpoints (Build First)
```
# Authentication
POST   /api/v1/auth/signup
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me

# User Profile
GET    /api/v1/users/me
PATCH  /api/v1/users/me
PATCH  /api/v1/users/me/password

# Machines
GET    /api/v1/machines
GET    /api/v1/machines/:id
POST   /api/v1/machines
PATCH  /api/v1/machines/:id
GET    /api/v1/machines/:id/history

# Work Orders
GET    /api/v1/work-orders
GET    /api/v1/work-orders/:id
POST   /api/v1/work-orders
PATCH  /api/v1/work-orders/:id
PATCH  /api/v1/work-orders/:id/status
POST   /api/v1/work-orders/:id/repair
```

#### P1 Endpoints (Build Second)
```
GET    /api/v1/dashboard/stats
GET    /api/v1/dashboard/top-machines
GET    /api/v1/search?q=query
GET    /api/v1/parts
GET    /api/v1/parts/:id
POST   /api/v1/parts
PATCH  /api/v1/parts/:id
GET    /api/v1/documents
GET    /api/v1/documents/:id
GET    /api/v1/documents/:id/file
POST   /api/v1/documents
PATCH  /api/v1/work-orders/:id/assign
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PATCH  /api/v1/users/:id
```

#### P2 Endpoints (Defer)
```
DELETE /api/v1/machines/:id (soft delete)
DELETE /api/v1/documents/:id
POST   /api/v1/work-orders/:id/attachments
GET    /api/v1/work-orders/export
GET    /api/v1/machines/:id/export
```

### 15.4 UI Page Priority

#### P0 Pages (Build First)
- `/signup` - Signup/Registration page (P0 - CRITICAL)
- `/login` - Login page (P0 - CRITICAL)
- `/` - Dashboard (basic version)
- `/machines` - Machines list
- `/machines/:id` - Machine detail with history
- `/machines/new` - Create machine
- `/machines/:id/edit` - Edit machine
- `/work-orders` - Work orders list
- `/work-orders/:id` - Work order detail
- `/work-orders/new` - Create work order
- `/work-orders/:id/edit` - Edit work order
- `/404` - Not found page
- `/500` - Server error page
- `/unauthorized` - Unauthorized access page

#### P1 Pages (Build Second)
- `/dashboard` - Full dashboard with charts
- `/profile` - User profile page
- `/settings` - User settings page
- `/search` - Search results page
- `/parts` - Parts list
- `/parts/:id` - Part detail
- `/parts/new` - Create part
- `/parts/:id/edit` - Edit part
- `/documents` - Documents list
- `/documents/upload` - Upload document
- `/users` - User management (Admin only)
- `/users/:id` - User detail
- `/users/new` - Create user (Admin only)

#### P2 Pages (Defer)
- `/work-orders/:id/export` - Export work order
- `/machines/:id/export` - Export machine history
- `/settings/preferences` - Advanced preferences
- `/auth/forgot-password` - Password reset request
- `/auth/reset-password` - Password reset form

### 15.5 Database Schema Priority

#### P0 Tables (Build First)
- `users` - Required for auth
- `machines` - Core entity
- `work_orders` - Core entity
- `repair_actions` - Core for repair logging

#### P1 Tables (Build Second)
- `parts` - For parts management
- `work_order_parts` - Junction table for parts
- `documents` - For document management

#### P2 Tables (Defer)
- `audit_logs` - For audit trail
- `work_order_attachments` - For file attachments
- `notifications` - For future notifications

### 15.6 Build Order Recommendation

**Day 1-2: P0 Foundation**
1. Project setup & database schema (all P0 tables)
2. Authentication system (signup, login, logout, JWT, protected routes)
3. Application layout (sidebar, header, navigation)
4. Signup page UI
5. Login page UI
6. Error pages (404, 500, unauthorized)
7. Machine CRUD (API + UI)
8. Work Order CRUD (API + UI)
9. Machine history endpoint + UI

**Day 3: P0 Completion**
9. User profile endpoints (get, update, change password)
10. Repair logging (API + UI)
11. Work order status workflow
12. Basic dashboard (just stats, no charts)
13. Toast notifications & loading states
14. Form validation

**Day 4: P1 Core**
15. User profile page UI
16. Search (API + UI)
17. Parts management (API + UI)
18. Link parts to work orders

**Day 5: P1 Supporting**
19. Document upload/view (API + UI)
20. User management (API + UI) - Admin only
21. Work order assignment
22. Responsive design (mobile navigation)

**Day 6: P1 Polish**
23. Dashboard charts
24. Advanced filters
25. Empty states
26. Confirmation dialogs
27. User preferences (basic)

**Day 7: Testing & P2 (if time)**
28. Manual testing of all flows
29. Bug fixes
30. Error handling improvements
31. Any P2 features if time permits

---

## 16. Conclusion

This PRD defines a **minimal but complete CMMS** that:
1. Provides immediate value to factory maintenance teams
2. Builds the structured data foundation for future AI
3. Can be built in one week with AI coding assistance
4. Maintains architectural integrity for long-term vision
5. Includes all essential basics (authentication, navigation, error handling, etc.)

The key is **discipline**: build only what's needed for v1.0, but build it **right** so the foundation supports the Factory Intelligence Layer vision.

### Critical Reminders

**Before starting development, review Section 12 (Essential Basics Checklist)** to ensure no foundational features are missed:
- Authentication & session management
- Application layout & navigation
- Error handling & error pages
- Form validation & user feedback
- User profile & settings
- Security basics

These are often overlooked but are **non-negotiable** for a production-ready application.

**Next Steps:**
1. Review and approve this PRD
2. Review Section 12 (Essential Basics Checklist)
3. Make technical stack decisions
4. Set up development environment
5. Begin Day 1 implementation (start with authentication & layout)

---

**Document Status:** Ready for Review  
**Next Review:** After technical stack decisions