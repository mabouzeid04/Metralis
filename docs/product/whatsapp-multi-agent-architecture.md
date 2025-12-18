# WhatsApp Copilot: Multi-Agent Architecture

## Purpose
- Expose the maintenance copilot over WhatsApp without breaking the existing web/app experience.
- Route heterogeneous intents (technician troubleshooting, work-order intake, manager queries, FAQs) to specialized skills while sharing state.
- Keep responses grounded in plant data (machines, work orders, manuals, history) and enforce safety and structured outputs.

## Design Principles
- Single session state per WhatsApp user; router can change active skill mid-conversation but state is preserved.
- Strict schemas between components (router → skills → platform APIs).
- Prefer determinism for side effects (create/update work orders) and allow LLMs only where judgment is needed.
- Ask minimal clarifying questions; avoid ping-pong and long back-and-forth.
- Always surface uncertainty and cite data provenance; do not hallucinate metrics or live data.

## Core Roles / Use Cases
- Technician: troubleshoot a machine, ask for steps, log repairs, add media.
- Work-order intake: create/close/update tickets with structured fields.
- Manager/ops: ask for downtime drivers, recurring issues, open items, summaries.
- FAQ/help/fallback: handle generic questions, hand off to a human if needed.

## High-Level Flow
1) WhatsApp inbound webhook receives user message and user identifier.
2) Router LLM inspects message + session state → picks a skill (or asks one clarifying question if low confidence).
3) Selected skill runs:
   - Technician skill → calls diagnostic copilot (existing RAG) with machine context.
   - Work-order intake skill → guides slot-filling and then calls platform APIs to create/update work orders.
   - Manager skill → pulls reports/metrics (or states “data unavailable/stale”).
   - FAQ/fallback → short help or human handoff.
4) Response is rendered into WhatsApp-friendly text (compact bullets), with safety/uncertainty callouts.
5) Session state is updated (machineId, workOrderId, current skill, language, last intent, clarified fields).

## Session State (per WhatsApp user)
- userId (mapped to platform account)
- language preference (auto-detected, user-selectable)
- activeSkill (technician | intake | manager | faq)
- lastIntentSummary (short text)
- machineId? machineName?
- workOrderId? workOrderTitle?
- pendingSlots (for intake)
- lastMessages (N-turn buffer for context and safety checks)

## Router LLM
- Input: {message, session state snapshot}
- Output (strict JSON): {route, confidence, reason, needsClarification?, clarificationQuestion?, safetyFlag?}
- Routing rules (examples):
  - Contains fix/issue/symptom language → technician if machine known; intake if no work order exists and no machine known.
  - Mentions “open tickets”, “top downtime”, “summary”, “KPI” → manager.
  - Unclear → ask one targeted clarification; stay in current route unless high-confidence change.
- Hysteresis: require higher confidence to switch away from current skill to prevent ping-pong.
- Safety: if user asks for risky actions, set safetyFlag so downstream skill adds warnings.

## Skills

### 1) Technician Skill (Diagnostics)
- Goal: deliver grounded troubleshooting guidance.
- Inputs: machineId (required), user question/symptom, session language.
- Actions:
  - Call existing RAG pipeline (chatService → retrieveContext → prompt builder → LLM).
  - Enforce structured output contract: summary, likely causes (with confidence), recommended steps (with citations), references, missingData flags.
- Outputs: short WhatsApp-formatted text + optional quick actions (open work order, view history).
- Guardrails:
  - If machine missing → ask for machine or offer top 3 matches.
  - If no context retrieved → explicitly say so and ask for more detail.
  - Always include safety caveats when steps involve physical interventions.

### 2) Work-Order Intake Skill (Slot Filling + API Write)
- Goal: collect and normalize fields, then create/update a work order.
- Required slots: machine, title/summary, symptom/description, type (default corrective), priority (derived from blocking/safety), reporter.
- Optional slots: attachments, parts mentioned, due date/assignee, location/line.
- Flow:
  1) Extract candidates with a constrained extractor.
  2) If machine ambiguous → present 1–3 options; otherwise set machineId.
  3) Ask at most 1–2 clarifiers if critical slots missing.
  4) Generate a confirmation card (plain text): machine, title, symptoms/tags, priority, attachments count. Ask “Create?”.
  5) On “yes” → call platform API to create; return workOrderId. On “no” → restart or handoff.
- Guardrails:
  - Do not fabricate machine/work-order IDs.
  - If user sends media, store and link to the work order (include filenames).
  - Keep creation deterministic (API call, not LLM hallucination).

### 3) Manager Skill (Insights)
- Goal: answer operational questions.
- Data sources: reports/metrics endpoints; cached summaries; if unavailable, state that data is not available.
- Outputs: concise bullets with freshness labels. Never invent numbers.
- Examples:
  - “Top downtime causes this week”: list known items or say “data unavailable”.
  - “Open critical tickets”: list titles/ids if accessible.
- Guardrails: if metrics stale or missing → say so; avoid speculative advice.

### 4) FAQ / Fallback Skill
- Goal: give basic help, describe capabilities, or hand off to human.
- Should trigger when router confidence is low or intent is outside scope.

## Data and Schema Contracts
- Router output JSON schema (route, confidence, reason, needsClarification?, question).
- Technician output uses existing structured contract (summary, likelyCauses[], recommendedSteps[], references[], needsMoreData, missingDataNotes).
- Intake extractor schema: {machineId?, machineCandidates[], title?, description?, symptomTags[], priority?, type?, attachments[], missingSlots[]}.
- All side-effecting operations go through platform APIs with validated payloads.

## Safety and Compliance
- Technician and intake skills must:
  - Warn before any action that requires lockout/tagout or opening panels.
  - State when information is insufficient and ask for safer checks first.
  - Avoid pretending to have real-time telemetry unless provided.
- Router propagates safetyFlag to skills to prepend safety reminders.

## Language and Localization
- Detect language per message; store in session; respond in that language when possible.
- Keep WhatsApp responses compact, scannable, and RTL-aware if needed.

## Error Handling and Resilience
- If router JSON parse fails → fallback to current skill or ask a simple clarifier.
- If platform API fails (e.g., create work order) → apologize, show error, and do not claim success.
- Network/timeout: retry once; otherwise inform the user and keep state for reattempt.

## Telemetry and Evaluation
- Track per-skill metrics: helpful/not-helpful feedback, completion of slot filling, abandonment rate, routing confidence, reroutes per session.
- Technician skill: top1/top3 cause hit rate vs actual root cause; citation coverage.
- Intake skill: % of WOs created with required fields, duplicate-prevention rate.
- Manager skill: % answers with fresh data; % “data unavailable” responses.

## Duplicate and Quality Controls
- Intake skill checks for open work orders on the same machine with similar symptoms to avoid duplicates; if found, offers to append a note instead of creating a new ticket.
- Enforce required fields before closing tickets; prompt for root cause and parts used.
- Ask for confirmation when confidence is low on extracted machine/symptoms.

## Security and Access
- Map WhatsApp user → platform user with permissions.
- Restrict manager skill to users with manager/admin roles; otherwise return a permission notice.
- Do not expose internal IDs beyond what the role can view.

## Integration Points
- Inbound: WhatsApp Business API webhook → edge handler.
- Outbound: WhatsApp message API for text/media.
- Platform APIs: machines lookup, work orders CRUD, attachments upload, reports/metrics fetch.
- Existing AI stack: chatService.ts → retrieveContext → prompt → LLM provider.

## Message Formatting (WhatsApp)
- Keep replies short; prefer numbered lists for options.
- Technician responses: summary line, 2–3 causes with confidence labels, 3–5 steps, citations short (doc titles or WO titles).
- Intake confirmations: single block with key fields; “Reply yes to create”.
- Manager responses: bullets with freshness notes (e.g., “as of 2025-12-10”).

## State Transitions (Examples)
- Start → Router: no machine → Intake clarifies machine → sets machineId → Technician skill for diagnostics.
- Technician skill running → user asks “Top downtime this week” → Router switches to Manager skill; retains machineId for future turns.
- Intake skill mid-slot → user asks “How to fix vibration?” → Router can switch to Technician; pending slots remain in state for later resume.

## Phased Rollout
- Phase A: Single-skill (Technician) with explicit machine prompt; no routing.
- Phase B: Add Intake skill + lightweight router; confirm creation via API.
- Phase C: Add Manager skill; introduce hysteresis and safetyFlag.
- Phase D: Telemetry dashboards, duplicate detection, and permission-aware responses.

## Testing Checklist (WhatsApp E2E)
- Router picks Technician for symptom reports; Intake for “create ticket” without machine; Manager for summary requests.
- Technician skill returns structured response with citations; handles missing machine by asking once.
- Intake skill: collects machine, symptom, priority; shows confirmation; creates WO via API; returns id.
- Duplicate detection: reporting same issue suggests existing open WO.
- Manager skill: responds with data or “unavailable” without fabricating numbers.
- Safety: risky actions include warnings; missing data prompts for safe checks first.

## Open Questions / Future Work
- Should we cache small per-machine embeddings for low-latency WhatsApp responses?
- Add voice note transcription for intake and diagnostics?
- Allow handoff to human operator with transcript export?
- Add offline/queue mode if WhatsApp webhook retries fail?

