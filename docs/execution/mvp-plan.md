# MVP Plan

## QA Checklist (Current Build)

1. **Work order creation with attachments**
   - Create a corrective work order through the UI.
   - Upload at least two attachments (photo + PDF) before submission.
   - Confirm the order is created and attachments appear in the detail view with metadata (filename, uploader, timestamp).

2. **Repair logging experience**
   - From the work order detail page, add a repair entry that includes:
     - Actions text
     - Root cause
     - At least one part with quantity
     - Verification notes
     - Attachments (photo/video)
   - Verify the repair timeline renders the new entry, root cause, and attachments, and that the machine history timeline now shows the repair event.

3. **Machine timeline**
   - Visit the machine profile used above.
   - Ensure the history panel lists both the work order creation event and the subsequent repair action in chronological order.

4. **AI copilot structured response**
   - Open Metralis AI, select the same machine, and ask for diagnostic help.
   - Confirm the assistant response shows summary, likely causes with confidence badges, recommended steps, references, and the quick-action buttons.
   - Use the quick action to open “Create Work Order” and verify the machine context is preserved.

5. **AI feedback telemetry**
   - On the same AI response, click “Helpful”, “Needs work”, and “Correct cause” (each should register only once).
   - Refresh the conversation and validate that your feedback persists and the buttons remain highlighted/disabled accordingly.

6. **Attachment download paths**
   - Download any work order and repair attachment; confirm the file name and type match what was uploaded.

7. **Regression checks**
   - Work order list filters still function.
   - Parts inventory CRUD remains intact.
   - AI chat history sidebar loads with conversation previews.

Document results (pass/fail + notes) in the QA tracker before promoting a build to demo/pilot factories.

