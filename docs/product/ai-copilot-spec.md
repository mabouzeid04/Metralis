# AI Copilot Specification

# AI Maintenance Co-Pilot — Specification

## 1. Overview

The AI Maintenance Co-Pilot is the primary intelligence interface for technicians, maintenance managers, and engineers.

It:
- understands each machine’s configuration, manuals, history, and environment
- helps diagnose issues faster
- reduces downtime and repeat failures
- standardizes and improves the quality of maintenance documentation

The co-pilot is not a generic chatbot. It is a **factory-specific, machine-aware diagnostic assistant** backed by:
- structured CMMS data (events, failures, repairs, parts)
- ingested manuals and SOPs
- a knowledge graph linking symptoms ↔ causes ↔ fixes
- retrieval-augmented LLMs

---

## 2. Primary Goals

1. **Reduce mean time to diagnose (MTTD)**  
   Cut time spent figuring out “what’s wrong” before a wrench is used.

2. **Reduce repeat failures**  
   Surface relevant past incidents and root causes so the same problem is not solved from scratch each time.

3. **Capture and structure knowledge**  
   Turn technician experience and ad-hoc fixes into durable, machine-readable knowledge.

4. **Make manuals actually usable**  
   Map real-world symptoms and alarms to relevant procedures and instructions in OEM manuals and SOPs.

5. **Enable long-term autonomy**  
   Produce clean, labeled data that trains future autonomous diagnostics and control systems.

---

## 3. Users & Roles

- **Technician**
  - Frontline user
  - Logs incidents, asks for help diagnosing issues, follows suggested steps

- **Maintenance Engineer / Manager**
  - Reviews and improves diagnostic suggestions
  - Sets policies and links co-pilot suggestions to SOPs
  - Uses insights for planning and root cause analysis

- **Factory Owner / Operations Manager**
  - Consumes aggregated insights and metrics, not day-to-day interactions

- **OEM / Importer (future)**
  - Provides manuals and best-practice troubleshooting flows
  - Optionally sees anonymized failure patterns

The co-pilot’s UX must work primarily for **technicians under time pressure**.

---

## 4. Core Use Cases

### 4.1 Diagnose a Current Issue
User: Technician

Flow:
1. Technician selects a machine or scans its QR code.
2. Describes the issue via:
   - text (“loud grinding noise near the gearbox”)
   - structured fields (noise, leak, vibration, temperature, error code)
   - optional photo/video/voice note
3. Co-pilot:
   - pulls machine’s history and similar past incidents
   - cross-references manuals/SOPs
   - proposes likely causes ranked by probability/precedent
   - suggests tests or checks to narrow down the root cause
4. Technician follows steps and logs outcome.
5. Co-pilot learns from the completed repair (see Section 7).

Output:
- explanation of likely causes
- recommended checks/steps
- links to relevant manual sections/SOPs
- optional “short form” for mobile

---

### 4.2 Look Up Machine History / Patterns
User: Technician / Maintenance Engineer

Flow:
1. User selects a machine.
2. Asks questions, for example:
   - “What are the most common failures on this machine?”
   - “Why does this pump keep overheating?”
   - “Show all incidents involving bearing replacement on Line 3 in the last 12 months.”
3. Co-pilot:
   - queries structured maintenance data
   - aggregates incidents and repairs
   - highlights patterns and recurring problems

Output:
- incident summaries
- charts/pattern descriptions
- candidate root causes
- improvement suggestions (“consider alignment check schedule every X hours”)

---

### 4.3 Map Symptoms / Codes to Manuals
User: Technician

Flow:
1. Technician provides:
   - error code / alarm message
   - symptom description
2. Co-pilot:
   - finds relevant manual pages and SOPs
   - translates them into concise, stepwise guidance
   - adapts instructions to local context if possible (e.g., installed options, environment)

Output:
- “Do this now” steps
- original manual reference (doc + section)
- warnings/precautions from the OEM text

---

### 4.4 Assist in Logging a Repair
User: Technician

Flow:
1. Technician completes a repair (with or without co-pilot).
2. Co-pilot prompts:
   - “What was the root cause?”
   - “What part did you replace?”
   - “What did you adjust / clean / realign?”
3. Co-pilot:
   - suggests structured values based on conversation (“It sounds like bearing misalignment; choose from: misalignment, lubrication failure, contamination, unknown.”)
   - auto-fills parts and cause where possible
4. User confirms or corrects.

Output:
- clean, structured event in CMMS (failure, root cause, parts, resolution, time to repair)
- text narrative for context

---

### 4.5 Training / Onboarding Tool
User: New Technician

Flow:
1. New hire interacts with co-pilot:
   - “What are the critical failure modes on Line 1?”
   - “Walk me through replacing the X pump.”
2. Co-pilot:
   - explains with context from history and manuals
   - optionally generates quiz questions or checklists

Output:
- human-readable walkthroughs
- training-style reinforcement, grounded in real incidents

---

## 5. Functional Requirements

### 5.1 Inputs

The co-pilot must accept:

- Machine reference
  - via search (ID, name)
  - via scan (QR/RFID code)
- Issue description
  - free text
  - structured form fields (symptom categories, error codes, operating conditions)
  - file attachments (images/video) — processed if supported
- Context filters
  - time window
  - shift
  - line / section
- User role / permissions

### 5.2 Outputs

The co-pilot must output:

- Ranked list of likely causes with brief rationales
- Recommended diagnostic steps and checks
- References to manual/SOP sections
- Suggested parts and tools
- Prior incident examples with outcomes
- Clear indication of uncertainty (when confidence is low)
- Structured fields when possible (root cause, failure mode, affected component)

### 5.3 Context Retrieval

For every interaction, the co-pilot must retrieve:

- Machine metadata (type, OEM, criticality, age)
- Maintenance history:
  - past failures
  - symptoms
  - root causes
  - parts used
  - time-to-fix
- Manual/SOP chunks relevant to:
  - the machine
  - the symptom / code
- Plant-level context (environment, common issues, if available)

---

## 6. Data Sources

- **CMMS Data**
  - Machines/assets
  - Work orders
  - Failure logs
  - Repair actions
  - Used parts
  - Technicians and timestamps

- **Manuals / Documentation**
  - OEM manuals (PDF, images, text)
  - Troubleshooting trees
  - SOPs and checklists
  - Safety procedures

- **Plant Context (optional/advanced)**
  - Operational parameters
  - Environmental data
  - Known recurring issues by line

All sources must be traceable. The co-pilot should be able to say **where** a suggestion comes from (history vs manual vs heuristic).

---

## 7. Learning & Feedback Loop

### 7.1 Post-Repair Learning

After a work order is closed, the co-pilot should:

- ingest:
  - final root cause
  - actual fix
  - parts used
  - how long it took
  - technician notes
- link:
  - initial symptom → final root cause
  - initial suggestion → actual outcome (to evaluate accuracy)

This is used to:

- improve similarity search for future incidents
- adjust ranking of causes
- identify patterns (e.g., misdiagnosis or wrong initial assumptions)

### 7.2 Human Feedback

The co-pilot must support:

- “This was helpful / not helpful”
- “This was the correct root cause”
- “This suggestion was wrong”
- Optional short comment

Feedback is tied to:
- model prompts
- retrieved documents
- ranking logic

In the UI, these inputs sit directly under every assistant response as one-tap buttons (“Helpful”, “Needs work”, “Correct cause”). Each click is stored per-user/per-message so telemetry can tune prompts, retrieval weights, and safety rules.

---

## 8. Reasoning Behavior

### 8.1 General Principles

- **Grounded:** Always use machine-specific history and manuals when available.
- **Conservative:** Prefer safe, reversible checks before risky actions.
- **Transparent:** Explain why a cause is likely (“this has happened 3 times in the last month under similar load”).
- **Non-absolute:** Avoid false certainty; present ranked hypotheses, not single-point oracles.
- **Actionable:** Prioritize specific checks over vague advice.

### 8.2 Reasoning Steps (Internal)

For diagnosis queries, the co-pilot should conceptually:

1. Parse the symptom description into:
   - symptom type(s)
   - location
   - operating context
2. Retrieve:
   - similar incidents on this machine and similar machines
   - relevant manual/SOP troubleshooting sections
3. Identify candidate causes from:
   - history
   - manuals
   - inferred patterns (e.g., recurring bearing failures)
4. Rank causes using:
   - frequency in history
   - severity
   - plausibility given context
5. Propose:
   - 2–5 likely causes
   - stepwise checks to disambiguate
6. Update internal metrics after seeing the actual repair outcome.

The spec does not enforce implementation technique (prompt graphs, tools, etc.) but does enforce the **structure** of reasoning.

---

## 9. UX & Interaction Model

### 9.1 Interfaces

The co-pilot must support:

- **Chat-style interface**  
  For freeform questions and troubleshooting.
  - Responses render as structured cards (summary, ranked causes, recommended steps, references) instead of raw paragraphs.
  - Quick-action buttons (“Create Work Order”, “View Machine”, “Log Repair”) reuse the current machine context so dispatch is frictionless.

- **Guided forms/wizards**  
  For structured incident logging and stepwise workflows (especially on mobile).

- **Embedded panels**  
  Inside the main app (e.g., next to a work order or machine profile).

### 9.2 Response Formats

The co-pilot should support multiple response modes:

- **Summary mode (default)**
  - Short explanation
  - Top 2–3 likely causes
  - 3–7 recommended next steps

- **Detail mode**
  - Additional context
  - Links to relevant history and manual sections

- **Structured mode (for logging)**
  - Proposed values for root cause, failure type, affected component, etc.

- **JSON contract**
  - LLM responses must serialize to a single JSON object with fields:
    - `summary`
    - `likelyCauses[]` (title, confidence, rationale, citations)
    - `recommendedSteps[]` (title, action, citations)
    - `references[]` (id, source)
    - `needsMoreData`, `missingDataNotes`
  - The frontend parses this payload to render cards; fallback plain text is only used when parsing fails.

### 9.3 Constraints

- Must be usable on mobile devices in noisy environments.
- Text responses should be concise and scannable.
- Avoid long paragraphs when giving step-by-step instructions.

---

## 10. Safety, Risk, and Responsibility

### 10.1 Scope of Authority

- The co-pilot **advises**, it does not **command**.
- All actions must still be executed and confirmed by humans.
- For high-risk actions (e.g., opening panels under load), the co-pilot must explicitly warn and reference safety procedures.

### 10.2 Prohibited Behaviors

- No instructions that contradict known safety procedures.
- No recommendation to bypass interlocks or safety systems.
- No pretending to have access to real-time sensor data if not available.

### 10.3 Disclaimers

- Must clearly state that suggestions are **advisory** and depend on accurate input.
- Must encourage following factory safety protocols first.

---

## 11. Metrics and Evaluation

Key metrics:

- Reduction in **mean time to diagnose (MTTD)**
- Reduction in **repeat incidents** for the same root cause
- Adoption rate:
  - % of work orders where co-pilot was used
- Quality metrics:
  - % of suggestions marked helpful
  - % of top-1/top-3 causes matching final root cause
- Documentation quality:
  - decrease in “unknown” or empty root cause fields
  - increase in structured data completeness

These metrics are used to:

- validate product value
- guide model improvements
- justify pricing and ROI

---

## 12. Current Implementation

### 12.1 Chat flow & persistence
Every request routes through `code/backend/src/services/ai/chatService.ts`: it loads (or creates) the conversation, ties it to the selected machine, fetches the last 10 messages, asks `retrieveContext` for relevant documentation, builds the prompt, calls `generateLLMResponse`, and saves both the user message and the generated response along with the mapped citations/context chunks. The conversation record keeps `lastMessageAt`, a computed title, and the associated machine metadata so the UI can replay the full thread with traceable sources.

### 12.2 Retrieval + machine context
`retrieveContext` embeds the user question via `code/backend/src/services/embeddings.ts`, then searches `code/backend/src/services/vectorStore.ts` for similar `DocumentChunk` rows (machine filter, language, and document ID filters are supported). The returned chunks feed `buildPrompt` (`code/backend/src/services/ai/prompt.ts`), which prepends the machine name/model/manufacturer/line, lists the retrieved docs as numbered snippets, and warns the LLM when nothing was pulled so it asks clarifying questions.

### 12.3 Guardrails & citations
The provider-level `SYSTEM_PROMPT` in `code/backend/src/services/ai/providers/gemini.ts` defines the copilot persona, insists every answer stay grounded in manuals/SOPs/work orders, warns before safety-critical steps, cites retrieved document titles, states missing information explicitly, and keeps the tone confident and professional. The prompt builder enforces the output structure (short summary, ranked causes, stepwise actions referencing numbered documents, a “Citations” section, and a “more data needed” callout), so even if the LLM drifts it is reminded of the traceability rules.

### 12.4 Provider abstraction
`generateLLMResponse` now comes from `code/backend/src/services/ai/provider.ts`, which asks `getLLMProvider(env.ai.provider)` (`services/ai/providers/index.ts`) for the configured provider. That registry maps canonical names (e.g., `"gemini"`) to factories that instantiate the corresponding `LLMProvider` implementation (`GeminiProvider` for now) and caches the instance. Adding another provider only requires implementing `LLMProvider` in this folder and extending the factory map—no changes are needed elsewhere in the chat stack.

---

## 13. Future Extensions

Not required for v1, but guided by this spec:

- Integration with real-time sensor/SCADA data for earlier detection.
- Autonomous suggestion of preventive work orders based on patterns.
- Cross-factory learning (anonymized, privacy-preserving).
- APIs for OEMs to contribute official troubleshooting graphs.
- Simulation environments for “what if” scenarios.

---

## 14. Non-Goals (For Now)

The co-pilot is **not** responsible for:

- Full production planning and scheduling
- Energy optimization across lines
- Robotic control or direct actuation
- Financial forecasting

It is focused on **maintenance intelligence and machine-level diagnostics**, with clear expansion paths toward broader autonomy.

