# Jobs to be Done

# Jobs To Be Done (JTBD)

## Overview
This document defines the core tasks, pains, and goals that users “hire” the product to solve.  
Each Job To Be Done captures **why** a user interacts with the system and **what outcome they need**, not the feature they click.

The JTBD framework clarifies:
- the user’s real motivations  
- where friction currently exists  
- what success looks like  
- how the AI co-pilot should behave to reduce cognitive load  

This shapes product design, UI, and AI reasoning.

---

# 1. When a machine breaks, a technician needs to diagnose the issue quickly.

## Job
**“Help me figure out what’s wrong as fast as possible so I can fix it and get production running again.”**

## Pains
- No access to past incidents
- Tribal knowledge held by senior technicians
- Manuals are too long and hard to search
- High pressure from downtime costs

## Desired Outcomes
- Clear ranked list of likely causes
- Step-by-step diagnostic checks
- References to similar past failures
- Quick access to relevant manual instructions

## How Our System Solves This
- AI Co-Pilot diagnoses based on history + manuals  
- Machine timeline + symptom patterns  
- Fast creation of work order with structured fields  

---

# 2. When logging an issue, a technician needs to document it without wasting time.

## Job
**“Help me record this problem accurately without stopping my work or filling long forms.”**

## Pains
- Technicians hate typing
- Forms break flow
- Poor documentation becomes useless later

## Desired Outcomes
- Quick, low-effort logging  
- Automatic structuring of details  
- Ability to speak, upload photos, or type casually  
- No need to think about CMMS fields  

## How Our System Solves This
- Conversational logging (“AI, open a ticket…”)  
- AI extracts symptoms, location, priority  
- Auto-fill of structured fields  
- Human simply confirms or edits  

---

# 3. When finishing a repair, the technician needs to record what was fixed.

## Job
**“Help me document what I did and why, without remembering technical categories.”**

## Pains
- Hard to choose correct failure mode/root cause
- People write vague notes
- Lack of consistency across technicians
- Poor data equals bad future diagnoses

## Desired Outcomes
- Easy to describe in plain language  
- System handles categorization  
- AI suggests actions and root causes  
- Clean, consistent logs  

## How Our System Solves This
- AI listens to natural language and structures it  
- Suggests root cause + failure mode  
- Tags parts used automatically  
- Technician only reviews and approves  

---

# 4. When reviewing a machine, an engineer needs to understand its entire history quickly.

## Job
**“Give me a clear picture of everything that has ever gone wrong with this machine.”**

## Pains
- Work orders scattered across spreadsheets/WhatsApp
- No pattern recognition
- Difficult to identify chronic issues

## Desired Outcomes
- Timeline view of all events
- Easy filtering by symptom, cause, part
- Auto-detected patterns and anomalies

## How Our System Solves This
- Machine history timeline  
- AI surface patterns (“bearing fails every 4 months”)  
- Searchable structured events  

---

# 5. When recurring problems appear, managers need to understand root causes.

## Job
**“Help me understand why this issue keeps happening and what we should fix permanently.”**

## Pains
- Hard to detect recurring patterns manually
- Root cause analysis is inconsistent
- Hard to retrieve old records for investigation

## Desired Outcomes
- Pattern detection across machines and shifts  
- Recommendations for preventive steps  
- Evidence-based insights  

## How Our System Solves This
- AI identifies repeated symptoms or failures  
- Suggests likely systemic causes  
- Links to past repairs and outcomes  

---

# 6. When planning maintenance, managers need to prioritize and allocate resources.

## Job
**“Help me decide which tasks are urgent, who should do them, and how to reduce downtime.”**

## Pains
- Too many open issues
- No clear indication of criticality
- Hard to see what blocks production
- Unbalanced workloads

## Desired Outcomes
- Sorted, prioritized work queues  
- Assignments matched to skill or availability  
- Clear criticality indicators  

## How Our System Solves This
- AI-prioritized lists (based on machine criticality + symptoms)  
- Workload balancing suggestions  
- Expected time-to-fix predictions  

---

# 7. When onboarding new staff, managers need a faster training path.

## Job
**“Help new technicians learn machines and procedures without relying on senior staff.”**

## Pains
- High turnover  
- Limited documentation  
- Senior technicians stretched thin  
- Inconsistent training quality  

## Desired Outcomes
- Access to machine-specific explanations  
- Summaries of common failure modes  
- Step-by-step instructions  

## How Our System Solves This
- AI provides training walkthroughs  
- Summarizes machine history  
- Answers “how do I fix X?” with grounded instructions  

---

# 8. When OEM technicians arrive, managers need to justify service decisions.

## Job
**“Help me show the machine’s history so I don’t get blamed or overcharged.”**

## Pains
- OEMs sometimes assume factory mismanagement  
- Hard to prove maintenance discipline  
- Difficult to retrieve evidence

## Desired Outcomes
- Clear record of all interventions  
- Documented pattern of failures  
- Historical context for OEM visits  

## How Our System Solves This
- Exportable machine history  
- Clean logs of symptoms + repairs  
- AI-generated summaries for external teams  

---

# 9. When justifying investment, plant owners need to show reliability improvements.

## Job
**“Help me demonstrate the financial impact of improved maintenance.”**

## Pains
- Hard to produce reliability reports  
- Data often inaccurate or incomplete  
- No clear before/after comparison

## Desired Outcomes
- MTTR/MTBF metrics  
- Downtime reduction  
- Cost-of-failure analysis  

## How Our System Solves This
- AI summarizes reliability trends  
- Dashboard of key KPIs  
- Automatically links issues → costs → improvements  

---

# 10. When using the system daily, everyone needs speed and simplicity.

## Job
**“Help me get what I need with minimal friction.”**

## Pains
- Legacy CMMS systems are bloated
- Too many fields
- Slow interfaces
- Poor mobile UX

## Desired Outcomes
- Fast, simple UI  
- Clean workflows  
- Mobile-first interactions  
- AI-assisted shortcuts  

## How Our System Solves This
- Minimal fields visible by default  
- AI handles the rest  
- Chat-first logging on mobile  
- Natural language interface  

---

# Summary Table

| Job | User | Outcome |
|------|--------|----------|
| Diagnose issues | Technician | Faster troubleshooting |
| Log issues | Technician | Less time entering data |
| Log repairs | Technician | Structured, accurate data |
| Review history | Engineer | Clear machine picture |
| Anomaly detection | Manager | Find root causes |
| Prioritize work | Manager | Better allocation |
| Train new staff | Manager | Faster onboarding |
| Collaborate with OEMs | Manager | Historical evidence |
| Justify investment | Owner | ROI clarity |
| Daily operation | Everyone | Speed + simplicity |

---

# Closing

These Jobs To Be Done (JTBD) clarify **why** users come to the system and how the AI + CMMS combination solves real, painful workflows.

The AI co-pilot is not a bolt-on – it directly addresses the highest-friction jobs in the factory maintenance lifecycle.

Every product decision should be validated against these jobs.

