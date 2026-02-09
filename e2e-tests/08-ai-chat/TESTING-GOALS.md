DONE

# AI Chat E2E Testing Goals

## Overview
Test the AI-powered diagnostic chat interface including conversation management, message sending/receiving, context selection, AI responses, feedback, and quick actions.

---

## Test Scenarios

### 1. Chat Interface Loading
**File:** `ai-chat-interface.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-001 | Navigate to AI chat | 1. Navigate to /ai | AI chat page loads |
| TC-AI-002 | Chat history sidebar visible | 1. View AI page | Sidebar with conversation history shown |
| TC-AI-003 | Message input visible | 1. View AI page | Text input field and send button visible |
| TC-AI-004 | Asset context selector visible | 1. View AI page | Machine/asset selector available |
| TC-AI-005 | New chat button visible | 1. View AI page | Button to start new conversation |
| TC-AI-006 | Empty state for new user | 1. First visit to /ai | Welcome message or instructions shown |
| TC-AI-007 | Responsive layout | 1. Test various viewport sizes | Layout adapts (sidebar may collapse on mobile) |

---

### 2. Conversation Management
**File:** `ai-conversations.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-010 | Start new conversation | 1. Click new chat button | New empty conversation started |
| TC-AI-011 | Conversation appears in history | 1. Send a message | Conversation added to sidebar |
| TC-AI-012 | Load existing conversation | 1. Click conversation in history | Full conversation loads |
| TC-AI-013 | Conversation list sorted by date | 1. View history sidebar | Most recent conversations first |
| TC-AI-014 | Conversation preview in list | 1. View history | Shows first message or title preview |
| TC-AI-015 | Multiple conversations | 1. Create several conversations | All appear in history |
| TC-AI-016 | Switch between conversations | 1. Click different conversations | Context switches correctly |
| TC-AI-017 | Persist conversation on refresh | 1. In conversation<br>2. Refresh page | Same conversation reloads |
| TC-AI-018 | Close history sidebar | 1. Click outside sidebar (mobile) | Sidebar closes |

---

### 3. Sending Messages
**File:** `ai-messaging.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-020 | Send basic message | 1. Type message<br>2. Click send | Message sent, appears in chat |
| TC-AI-021 | Send with Enter key | 1. Type message<br>2. Press Enter | Message sent |
| TC-AI-022 | Send with keyboard shortcut | 1. Type message<br>2. Use Cmd/Ctrl+Enter | Message sent |
| TC-AI-023 | Empty message prevented | 1. Click send with empty input | Nothing sent, or validation shown |
| TC-AI-024 | Whitespace-only prevented | 1. Enter only spaces<br>2. Submit | Nothing sent |
| TC-AI-025 | Long message handling | 1. Enter very long message | Message sent (with truncation if needed) |
| TC-AI-026 | Message appears in UI | 1. Send message | User message bubble appears |
| TC-AI-027 | Loading state during response | 1. Send message | Loading indicator while AI responds |
| TC-AI-028 | Input cleared after send | 1. Send message | Input field cleared |
| TC-AI-029 | Input disabled during loading | 1. Send message<br>2. Try to type | Input disabled until response |

---

### 4. AI Responses
**File:** `ai-responses.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-030 | AI response received | 1. Send question | AI assistant response appears |
| TC-AI-031 | Response summary displayed | 1. Receive response | Summary section visible |
| TC-AI-032 | Ranked causes displayed | 1. Ask diagnostic question | Causes listed with confidence |
| TC-AI-033 | Repair steps displayed | 1. Receive response | Recommended steps shown |
| TC-AI-034 | Document citations shown | 1. Ask question with document context | Citations with links |
| TC-AI-035 | Click citation link | 1. Click document citation | Navigate to document |
| TC-AI-036 | Confidence levels shown | 1. View causes | Confidence percentages visible |
| TC-AI-037 | Response markdown rendering | 1. Receive response | Markdown formatted correctly |
| TC-AI-038 | Code blocks rendered | 1. Response with code | Code blocks styled |
| TC-AI-039 | Response auto-scroll | 1. Receive long response | Chat auto-scrolls to bottom |
| TC-AI-040 | Error handling - AI failure | 1. AI service unavailable | Error message shown |

---

### 5. Asset Context Selection
**File:** `ai-context.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-050 | Open asset context selector | 1. Click context selector | Asset picker opens |
| TC-AI-051 | Search assets in selector | 1. Open selector<br>2. Type search | Matching assets shown |
| TC-AI-052 | Select specific machine | 1. Select machine from picker | Context set to that machine |
| TC-AI-053 | Context shown in chat | 1. Select machine | Machine context displayed in UI |
| TC-AI-054 | AI uses machine context | 1. Select machine<br>2. Ask question | Response references machine's data |
| TC-AI-055 | Clear asset context | 1. Clear selection | Context removed |
| TC-AI-056 | Ask without context | 1. No machine selected<br>2. Ask question | AI responds with general info |
| TC-AI-057 | Context persists in conversation | 1. Set context<br>2. Continue chatting | Context maintained |
| TC-AI-058 | Change context mid-conversation | 1. Change machine selection | New context used for subsequent messages |

---

### 6. Feedback Mechanism
**File:** `ai-feedback.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-060 | Feedback buttons visible | 1. Receive AI response | Helpful/Not helpful buttons shown |
| TC-AI-061 | Mark response as helpful | 1. Click "Helpful" button | Feedback recorded, button state changes |
| TC-AI-062 | Mark response as not helpful | 1. Click "Not helpful" | Feedback recorded |
| TC-AI-063 | Correct cause feedback | 1. Click "Correct cause" | Can indicate which cause was correct |
| TC-AI-064 | Feedback prevents duplicate | 1. Submit feedback<br>2. Try again | Cannot submit same feedback twice |
| TC-AI-065 | Feedback persists | 1. Submit feedback<br>2. Reload | Feedback state maintained |
| TC-AI-066 | Feedback improves future responses | 1. Submit feedback<br>2. Ask similar question | System learns (long-term test) |

---

### 7. Quick Actions / Shortcuts
**File:** `ai-shortcuts.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-070 | Create work order shortcut | 1. Receive diagnostic response<br>2. Click "Create Work Order" | Navigate to WO form with pre-filled data |
| TC-AI-071 | Work order pre-filled from AI | 1. Use create WO shortcut | Title, description, machine pre-filled |
| TC-AI-072 | Navigate to machine shortcut | 1. Response mentions machine<br>2. Click machine link | Navigate to machine detail |
| TC-AI-073 | Navigate to document shortcut | 1. Response cites document<br>2. Click document link | Navigate to document or download |
| TC-AI-074 | View related work orders | 1. Click related WO link | Navigate to work order list/detail |

---

### 8. RAG (Retrieval-Augmented Generation)
**File:** `ai-rag.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-080 | Document content in response | 1. Upload document<br>2. Ask related question | Response includes document info |
| TC-AI-081 | Work order history used | 1. Ask about machine with WO history | Response references past issues |
| TC-AI-082 | Repair history context | 1. Ask about recurring issue | Response mentions past repairs |
| TC-AI-083 | No hallucination when no docs | 1. Ask about undocumented topic | AI indicates lack of documentation |
| TC-AI-084 | Multiple document synthesis | 1. Question spans multiple docs | Response synthesizes information |
| TC-AI-085 | Machine-specific document priority | 1. Select machine<br>2. Ask question | Prioritizes machine's documents |

---

### 9. Chat History & Persistence
**File:** `ai-persistence.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-090 | Messages persist in conversation | 1. Send multiple messages | All messages saved |
| TC-AI-091 | Load conversation after logout | 1. Chat<br>2. Logout<br>3. Login | Conversation restored |
| TC-AI-092 | Conversation timestamp | 1. View conversation list | Timestamps shown |
| TC-AI-093 | Scroll through long conversation | 1. Load conversation with many messages | Scroll works, messages load |
| TC-AI-094 | Conversation isolation | 1. Multiple conversations | Each conversation independent |

---

### 10. Error Handling
**File:** `ai-errors.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-AI-100 | Network error handling | 1. Disconnect network<br>2. Send message | Error message shown |
| TC-AI-101 | AI service timeout | 1. AI takes too long | Timeout message shown |
| TC-AI-102 | Retry mechanism | 1. After error<br>2. Click retry | Message re-sent |
| TC-AI-103 | Rate limiting | 1. Send many messages quickly | Rate limit message or graceful handling |
| TC-AI-104 | Invalid context handling | 1. Select deleted machine<br>2. Ask question | Graceful error handling |

---

## Test Data Requirements

```typescript
// fixtures/ai-chat.ts
export const aiChatTestData = {
  diagnosticQuestions: [
    'Why is the pump vibrating excessively?',
    'The CNC machine is making unusual noise',
    'What should I check if the conveyor belt keeps stopping?',
    'How do I troubleshoot motor overheating?'
  ],
  machineContext: {
    code: 'PUMP-001',
    name: 'Main Cooling Pump'
  },
  expectedResponseStructure: {
    summary: true,      // Should have summary
    causes: true,       // Should list possible causes
    steps: true,        // Should provide repair steps
    citations: true     // Should cite documents
  },
  documentContent: {
    title: 'Pump Troubleshooting Guide',
    content: 'Vibration causes: 1. Bearing wear, 2. Misalignment, 3. Cavitation'
  }
};
```

---

## Page Objects

```typescript
// pages/AIChatPage.ts
class AIChatPage {
  readonly conversationHistory: Locator;
  readonly newChatButton: Locator;
  readonly assetSelector: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly messageList: Locator;
  readonly loadingIndicator: Locator;

  async startNewConversation(): Promise<void>;
  async selectAssetContext(assetCode: string): Promise<void>;
  async clearAssetContext(): Promise<void>;
  async sendMessage(text: string): Promise<void>;
  async waitForResponse(): Promise<void>;
  async loadConversation(index: number): Promise<void>;
  async getLastResponse(): Promise<AIResponse>;
  async getConversationCount(): Promise<number>;
}

// components/AIResponse.ts
class AIResponse {
  readonly summary: Locator;
  readonly causesList: Locator;
  readonly stepsList: Locator;
  readonly citationsList: Locator;
  readonly feedbackButtons: Locator;
  readonly createWorkOrderButton: Locator;

  async getSummaryText(): Promise<string>;
  async getCauses(): Promise<Cause[]>;
  async getSteps(): Promise<string[]>;
  async getCitations(): Promise<Citation[]>;
  async markHelpful(): Promise<void>;
  async markNotHelpful(): Promise<void>;
  async clickCreateWorkOrder(): Promise<void>;
}

// components/ConversationSidebar.ts
class ConversationSidebar {
  readonly conversationList: Locator;
  readonly newChatButton: Locator;
  readonly searchInput: Locator;

  async clickConversation(index: number): Promise<void>;
  async searchConversations(query: string): Promise<void>;
  async startNewChat(): Promise<void>;
  async getConversationTitles(): Promise<string[]>;
}

interface AIResponse {
  summary: string;
  causes: Array<{ text: string; confidence: number }>;
  steps: string[];
  citations: Array<{ title: string; url: string }>;
}
```

---

## Special Testing Considerations

### AI Response Testing
- Responses are non-deterministic; test for structure, not exact content
- Use assertions like "response contains causes" rather than exact matches
- Consider using mock AI service for predictable testing

### Performance Testing
- Measure time from message send to response receive
- Test with large document corpus
- Test with extensive conversation history

### Integration Points
- Document upload → AI searchability
- Work order history → AI context
- Repair actions → AI learning
