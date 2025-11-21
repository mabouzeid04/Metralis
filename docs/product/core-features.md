# Core Features

# Core Features

## Overview

These are the foundational features of the platform.  
They define what the product *is* at an operational level and what users can do without the AI, with the AI, and alongside the AI.

The core philosophy:

- The system must function as a **standalone CMMS** (for visibility and control).  
- The **AI co-pilot** must enhance every workflow, not replace it.  
- All features must contribute to building the **Factory Intelligence Layer** — the long-term memory and reasoning substrate for autonomous manufacturing.

This document describes every core feature, its purpose, and how it integrates with the AI diagnostics engine.

---

# 1. Machine & Asset Management

## Description
Centralized registry of all machines, lines, and equipment in the factory.

## User-Facing Features
- Machine list with filters (line, status, model, manufacturer)
- Machine detail view with:
  - full maintenance history
  - linked documents
  - criticality
  - attributes (model, serial, OEM, commissioning date)
- Status tracking (running, down, maintenance, retired)

## AI Integration
- AI uses machine metadata to contextualize diagnoses.
- Machine history is the primary input for similarity-based reasoning.
- AI helps fill missing machine metadata during setup (“Looks like this is a Krones Variopac 56 based on the manual you uploaded.”).

---

# 2. Work Orders (Maintenance Events)

## Description
Structured representation of issues, inspections, and repairs.

## User-Facing Features
- Create, edit, assign, close work orders
- Work order table with:
  - status
  - priority
  - machine
  - type (corrective / preventive / inspection)
  - due dates
- Timeline and activity log
- Attachments (photos, videos)

## AI Integration
- AI can **create** work orders via chat (“Open a ticket for Line 2 Filler: vibration on gearbox.”).  
- AI can **update** or **close** work orders with structured fields based on conversation.  
- AI reads historical work orders to detect root cause patterns.  
- AI synthesizes detailed summaries and compresses noisy technician notes.

---

# 3. Issue & Symptom Logging

## Description
Capture symptoms, alarms, noises, leaks, vibrations, etc. in a structured form.

## User-Facing Features
- Clean UI for manual input
- Categorized symptom selection
- Free-text descriptions
- Timestamping
- Attachments

## AI Integration
- AI converts messy descriptions (“weird grinding noise”) into structured tags.  
- Maps symptoms → relevant manual sections.  
- Suggests additional context to collect (“Any temperature changes? Any leaks near the pump?”).  
- Populates symptom fields automatically.

This is a major source of AI reasoning accuracy.

---

# 4. Repair Logging & Root Cause Documentation

## Description
Record what was actually done, what parts were used, and what solved the problem.

## User-Facing Features
- Add repair actions step-by-step
- Select or add parts used
- Mark resolution success
- Log final root cause
- Attach post-repair notes

## AI Integration
- AI helps users describe actions (“Sounds like you realigned the coupling — should I log that?”).  
- AI infers root cause from text and asks for confirmation.  
- AI turns free-text repair logs into structured data fields (failure mode, cause, component).  
- AI flags low-quality or ambiguous closure entries.

Structured closure data feeds future predictions.

---

# 5. Manuals, SOPs, & Documentation Ingestion

## Description
Central storage for OEM manuals, SOPs, troubleshooting guides, and plant-specific documents.

## User-Facing Features
- Upload PDFs
- View documents in browser
- Link documents to machines or components
- Search within documents (basic MVP)

## AI Integration
- AI chunks and embeds manual content for retrieval.  
- AI references specific manual pages when giving troubleshooting steps.  
- AI explains manual procedures in simpler language.  
- AI links symptoms → manual instructions automatically.

This is essential for the AI’s **grounded** reasoning.

---

# 6. AI Maintenance Co-Pilot (Chat + Guided Mode)

## Description
Conversational interface for diagnostics, guidance, documentation, and planning.

## User-Facing Features
- Chat-like assistant for troubleshooting
- Links to relevant machine history
- Suggested diagnostic steps
- Auto-filled work order creation
- Guided workflows for logging repairs
- Alerts on recurring failures

## AI Integration
Deep integration across the system:

- Diagnoses issues using:
  - machine history
  - symptom data
  - manuals
  - repair outcomes

- Helps technicians:
  - report problems
  - close work orders
  - understand root causes
  - learn procedures

- Experimental features:
  - “What’s going wrong on Line 3 this week?”
  - “Summarize all recurring issues across the plant.”

The AI co-pilot is **the core differentiation** of the product.

---

# 7. Machine History & Timeline View

## Description
Per-machine chronological log of every event, repair, symptom, and document reference.

## User-Facing Features
- Timeline UI
- Filters by failure mode, technician, parts used, severity
- Jump links to relevant work orders

## AI Integration
- AI uses this as the primary data source when diagnosing issues.  
- AI highlights suspicious patterns (“This bearing fails every 4 months; may indicate deeper misalignment.”).  
- AI can generate a “machine health summary.”

---

# 8. Parts & Inventory Management (Lightweight MVP)

## Description
Track commonly used parts and link them to work orders for cost and pattern analysis.

## User-Facing Features
- Parts list
- Used-in-machine relationships
- Cost metadata
- In-work-order part selection

## AI Integration
- AI recommends parts based on description (“Probably a seal or coupling — should I add these as candidate parts?”).  
- AI detects recurring part usage patterns.

---

# 9. Dashboards & Reporting (Basic MVP)

## Description
Essential views for maintenance performance and factory reliability.

## User-Facing Metrics
- Work orders by:
  - type
  - status
  - line
  - machine
- Most frequently failing machines
- Time-to-repair statistics
- Most-used parts
- Breakdown frequency by shift

## AI Integration
- AI generates human-readable summaries:
  - “Top 3 causes of downtime this month.”
  - “Line 4 shows a new pattern: increasing overheating issues.”
- AI flags anomalies automatically.

---

# 10. Search (Global Quick Search)

## Description
Search for machines, parts, work orders, and documents.

## User-Facing Features
- Global search bar
- Auto-suggestion
- Filters by type

## AI Integration
- AI uses embedded search to find:
  - semantically similar symptoms
  - related incidents
  - relevant manual pages

Behind the scenes, this drives better reasoning.

---

# 11. Notifications & Alerts

## Description
Inform users about new failures, assignments, overdue tasks, and recurring issues.

## User-Facing Features
- Email/SMS/in-app alerts
- Escalation rules (MVP optional)
- Reminders for overdue work

## AI Integration
- AI proactively flags patterns:
  - “The last three leaks on Machine X involved the same fitting.”
- AI generates plain-language explanations for alerts.

---

# 12. User Permissions & Roles

## Description
Basic permission system to control access.

Roles:
- Technician
- Engineer
- Manager
- Admin

## Purpose
- Ensure safety
- Control write access
- Enable plant-level governance

---

# 13. Optional: Preventive Maintenance (Future Expansion)

## Description
Schedules, calendars, tasks, and reminders.

## AI Integration
- AI auto-generates preventive tasks based on failure patterns.
- AI suggests adjustments (“Increase lubrication checks to every 500 hours.”).

---

# Summary Table

| Feature | Human UI | AI Role | Criticality |
|--------|----------|---------|-------------|
| Machines | Browse machines | Context for reasoning | Essential |
| Work Orders | Create/manage tickets | Create/close via AI | Essential |
| Symptom Logging | Forms + attachments | Structure messy text | Essential |
| Repair Logging | Record actions and parts | Extract root cause | Essential |
| Manuals | Upload/view | Retrieval ground truth | Essential |
| AI Co-Pilot | Chat + guided | Diagnostics + data entry | Differentiator |
| History View | Timeline browsing | Pattern detection | Essential |
| Parts | Basic inventory | Pattern analysis | MVP |
| Reporting | Basic dashboards | Summaries + insights | MVP |
| Search | Quick lookup | Semantic reasoning | Essential |
| Notifications | Alerts | Pattern-based alerts | Optional MVP |
| Permissions | Roles | Safety/limits | MVP |

---

# Final Note

These features do **two jobs** simultaneously:

1. Provide a usable maintenance system that replaces outdated spreadsheets and WhatsApp logs.  
2. Build the **Factory Intelligence Layer** — a structured, longitudinal asset history that the AI uses to diagnose and eventually automate maintenance.

Every feature must contribute to both humans *and* AI.

This is the core product architecture.
