# CMMS Data Layer

# CMMS Data Layer

## 1. Purpose

This CMMS is a **real product**, not just a hidden data store.

It must:

- function as a **full, standalone maintenance system** that users can browse, query, and operate (like ServiceNow, Oracle, etc.)
- simultaneously serve as the **AI substrate** for the Maintenance Co-Pilot

So:

- Humans can use the UI to see machines, work orders, history, reports.
- AI uses the same data to diagnose issues and help users log better records.

If the CMMS sucks, people won’t use it.  
If they don’t use it, the AI starves.

---

## 2. Design Principles

1. **First-class CMMS**  
   Must stand on its own vs. legacy CMMS tools: clean UI, clear workflows, basic reporting.

2. **AI-first schema**  
   Every important field is there because it helps:
   - humans understand machines
   - AI reason about failures and fixes

3. **Dual-interface**  
   - Direct UI (tables, forms, dashboards)  
   - AI assistant (chat + guides)  
   Both read/write the same underlying data.

4. **Low-friction data entry**  
   - Direct form entry must be usable.  
   - AI-assisted entry must be faster and easier.

5. **Per-machine longitudinal memory**  
   Any user (with or without AI) should be able to open a machine and see its full medical history.

---

## 3. Core Modules (User-Facing)

The CMMS must look and feel like a normal system to end users:

1. **Machines / Assets**
2. **Work Orders / Tickets**
3. **Maintenance History**
4. **Parts / Inventory** (even if simplified at first)
5. **Documents (Manuals / SOPs)**
6. **Dashboards / Reports** (basic at MVP)

Each module has:

- List view (tables with filters)
- Detail view (per record)
- Create / Edit flows
- Integration points with AI Co-Pilot

---

## 4. Key Entities & Fields

### 4.1 Machines (Assets)

**UI:**

- Machines list (sortable, filterable)
- Machine detail page with history

**Core fields:**

- `id`
- `name`
- `code` (human-friendly ID / tag)
- `category` (pump, filler, conveyor, etc.)
- `line` / `area` / `plant`
- `manufacturer`
- `model`
- `serial_number`
- `commissioned_at`
- `status` (running, down, maintenance, retired)
- `criticality` (low, medium, high)

**Purpose:**

- Users can browse machines, filter by line / status / criticality.
- AI uses this context to tailor diagnostics and comparisons.

---

### 4.2 Work Orders / Maintenance Events

**UI:**

- Work order list (like ServiceNow/Oracle ticket tables)
- Detail view with fields & activity log
- Create / Edit from:
  - “New Work Order” form
  - AI Co-Pilot chat

**Core fields:**

- `id`
- `machine_id`
- `title` (short summary)
- `description_raw` (user-entered text)
- `status` (open, in-progress, waiting, closed)
- `type` (corrective, preventive, inspection)
- `priority` (low, medium, high, critical)
- `reported_at`
- `reported_by`
- `assigned_to` (optional)

**Analysis / AI-oriented fields:**

- `symptoms` (normalized list)
- `suspected_cause` (pre-fix, optional)
- `root_cause` (post-fix)
- `failure_mode`
- `environment_context` (optional)

**Timing:**

- `started_at`
- `completed_at`
- `time_to_respond`
- `time_to_repair`

**Purpose:**

- UI: users can track work, assign, and close tasks.
- AI: pulls patterns, suggests causes, and helps fill structured fields.

---

### 4.3 Repair Actions

**UI:**

- Part of the work order detail page:
  - “What we did”
  - “What we replaced”
  - “How we verified fix”

**Core fields:**

- `work_order_id`
- `performed_by`
- `actions` (free text, plus structured categories)
- `parts_used` (references parts)
- `adjustments` (alignment, lubrication, cleaning)
- `verification_steps`
- `success` (yes/no, plus note if no)

**Purpose:**

- UI: record what actually happened in a human-readable way.
- AI: builds cause → action → outcome links.

---

### 4.4 Parts / Inventory (Basic for MVP)

**UI:**

- Parts list
- Part detail (where used, cost)
- Used-part selection in work orders

**Core fields:**

- `id`
- `name`
- `category`
- `part_number`
- `manufacturer`
- `cost` (even rough)
- `stock_qty` (optional in MVP)
- `location` (optional)

**Link table:**

- `work_order_id`
- `part_id`
- `quantity`

**Purpose:**

- UI: track commonly used parts and cost impact.
- AI: detect patterns like “this coupling fails constantly on Line 2.”

---

### 4.5 Documents (Manuals / SOPs)

**UI:**

- Document list
- Per-document view (metadata + link/file)
- Machine detail: “Linked documents”

**Core fields:**

- `id`
- `title`
- `type` (manual, SOP, troubleshooting guide)
- `machine_type` / `machine_id` / `component_type`
- `file_reference` (path / blob / URL)
- `language`
- `version`

**Linking:**

- `machine_id` or `machine_type`
- tags for `symptom`, `error_code`, `procedure_type`

**Purpose:**

- UI: users can manually open PDFs or SOPs.
- AI: uses chunked/embedded versions to map symptoms → relevant sections.

---

## 5. Direct UI Workflows (No AI Involved)

This has to be usable even if AI is off.

### 5.1 Create a Work Order

1. User clicks “New Work Order”.
2. Selects machine.
3. Fills:
   - title
   - description
   - priority
   - type
4. Saves.

System:

- Creates work order.
- Shows in list and on machine detail page.

### 5.2 Update / Close a Work Order

1. User opens an existing work order.
2. Enters:
   - actions taken
   - parts used
   - root cause
   - completion time
3. Changes status to `closed`.

System:

- Records repair details.
- Adds to machine history.

### 5.3 Browse Machine History

1. User opens a machine.
2. Sees:
   - list of work orders
   - filters by time, type, status
3. Can click through to each event.

System:

- Provides a chronological view of everything that happened to that machine.

This is the baseline expectation from any serious CMMS.

---

## 6. AI Integration: Reading From the CMMS

When AI diagnoses issues, it uses CMMS data like a human would, but at scale.

For a given machine and symptom:

- Pulls all past work orders with:
  - same machine
  - similar symptoms / root causes
- Pulls all repair actions and parts used.
- Checks how recent and how successful those fixes were.
- Pulls linked manual sections and SOPs.

The AI then:

- Suggests likely causes (“this was bearing misalignment last 3 times”).
- Suggests tests based on what worked historically.
- References manual/SOP procedures where relevant.

This is exactly what a senior technician with perfect memory would do, but automated.

---

## 7. AI Integration: Writing to the CMMS

The AI also acts as a **smart front-end for data entry**.

### 7.1 AI-Assisted Work Order Creation

Interaction:

- Tech: “Create a ticket for Line 2 filler. It’s leaking product from the left side, and we’re getting occasional overload alarms.”
- AI:
  - Asks targeted follow-ups only if needed.
  - Maps this into:
    - machine_id (Line 2 filler)
    - title (“Product leak and overload alarms on left side”)
    - description_raw (full text)
    - symptoms: [leak, alarm_overload]
    - priority: high (if production blocked)
  - Creates work order via API.

User sees:

- Pre-filled work order form.
- Can adjust and save.

### 7.2 AI-Assisted Closure

Interaction:

- Tech: “We found a loose clamp on the left manifold, tightened it, cleaned the area, and monitored for 30 minutes. No more leaks.”
- AI:
  - Sets:
    - root_cause: “Loose clamp”
    - failure_mode: “Mechanical fastening failure”
    - actions: “Tightened clamp, cleaned area, monitored 30 min”
    - success: true
  - If parts used: proposes parts from text or asks.

User:

- Reviews the structured fields.
- Confirms and closes.

Result:

- Good structured data.
- Minimal friction.

---

## 8. Reporting & Analytics (Baseline)

Even without advanced analytics, the CMMS layer should provide:

- Work orders by:
  - status
  - machine
  - type
  - priority
- Top machines by:
  - number of failures
  - downtime (if tracked)
- Most common failure modes and root causes
- Parts usage (frequency, cost)

These views:

- help humans reason about reliability
- validate the AI’s suggestions by surfacing patterns
- justify ROI to management

---

## 9. Minimal MVP vs. Future Expansion

### MVP Requirements

- Machines list + detail
- Work order list + detail
- Creation + closure flows
- Basic parts linking
- Document listing + linking
- Simple filters and search
- AI chat that:
  - can create work orders
  - can help close them with structured fields

### Future Enhancements

- Preventive maintenance schedules
- Calendars
- Detailed inventory management
- Multi-plant support
- Permissions and roles
- Advanced reporting and exports

---

## 10. Positioning vs Legacy CMMS

Compared to ServiceNow / Oracle / legacy CMMS:

- We are **simpler** on bureaucracy (fewer pointless fields).
- We are **stronger** on intelligence:
  - the CMMS is directly wired into an AI diagnostic layer
  - AI both reads and writes the data
- We aim to be:
  - “Good enough CMMS”  
  - “Best-in-class AI for maintenance”

The CMMS is **one side of the product**.  
The AI co-pilot is the other.  
They must reinforce each other.

---

