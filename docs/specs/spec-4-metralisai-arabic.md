# Spec 4: MetralisAI Arabic Support

**Status**: Ready for Review
**Dependencies**: Spec 1 (Assets), Spec 3 (Documents)
**Blocked By**: Specs 1 and 3
**Blocks**: Nothing

---

## 1. High-Level Summary

### What We're Building

Enable technicians to interact with MetralisAI entirely in Arabic:
1. **Arabic input** - Technicians type questions in Arabic
2. **Asset name mapping** - System uses stored bilingual names to map Arabic → English for search
3. **Arabic output** - AI responds in Arabic, using Arabic asset names

### Why This Matters

1. **Accessibility** - Technicians who only know Arabic names can use the system
2. **Accuracy** - Direct mapping from stored names (not translation) means exact matches
3. **Natural interaction** - Users speak to AI the same way they speak to colleagues

### What We're NOT Building

- Real-time speech-to-text (future feature)
- Automatic translation of document content (documents stay in source language)
- Translation of work order descriptions (stored as-entered)

---

## 2. Technical Decisions Requiring Attention

### ⚠️ Decision 1: Translation Strategy for Vector Search

**Problem**: Documents/manuals are in English. User queries are in Arabic. Vector search needs to match.

**Options**:
1. **Translate Arabic query to English** → Search English embeddings
2. **Embed Arabic query directly** → Hope embedding model handles cross-lingual similarity
3. **Hybrid**: Use bilingual asset names for equipment terms, let LLM handle general terms

**Chosen Approach**: (3) Hybrid with bilingual asset names

**Why**:
- Equipment names are the most critical terms to match
- We have exact Arabic→English mappings stored in Asset table
- Modern embedding models (like OpenAI's) handle multilingual queries reasonably well
- LLM can understand Arabic query context even with English source documents

**Implementation**:
```
User query: "طلمبة الفاكيوم بتعمل صوت غريب"
Selected asset: طلمبة بوستر → Booster pump D1G02

Search strategy:
1. Extract asset context: "Booster pump D1G02" (English path)
2. Combine with original query for embedding
3. Search returns English document chunks
4. LLM sees: English docs + Arabic query + bilingual asset context
5. LLM responds in Arabic
```

---

### ⚠️ Decision 2: LLM Response Language

**Question**: How do we ensure LLM responds in the correct language?

**Chosen Approach**: Explicit language instruction in system prompt

```typescript
const systemPrompt = userLanguage === 'ar'
  ? "You MUST respond entirely in Arabic (العربية). Use Arabic asset names."
  : "Respond in English.";
```

**Why**:
- Simple and reliable
- Modern LLMs follow language instructions well
- No post-processing translation needed (which could introduce errors)

**Fallback**: If LLM responds in wrong language, we could add a translation step, but this shouldn't be needed with clear instructions.

---

### ⚠️ Decision 3: Asset Context in Prompt

**Question**: How much asset context to include in the LLM prompt?

**Chosen Approach**: Include full bilingual path + recent maintenance history

**Prompt structure**:
```
ASSET CONTEXT:
- English: Freeze Dryer / Vacuum System / Booster pump D1G02
- Arabic: خط التجفيد / خط الفاكيوم / طلمبة بوستر
- Code: D1G02
- Status: RUNNING (Operational)

MAINTENANCE HISTORY (Last 5):
- 2024-01-15: Corrective - Replaced bearing (CLOSED)
- 2024-01-02: Inspection - Routine check (CLOSED)
...

RETRIEVED DOCUMENTATION:
[1] Booster Pump Manual, p.23: "If unusual noise occurs, check..."
[2] Maintenance Procedure: "Bearing replacement procedure..."
```

**Why bilingual context matters**:
- LLM knows both names, can use appropriate one in response
- Arabic users see familiar names in response
- English technical terms from docs can be mapped to Arabic names

---

### ⚠️ Decision 4: Frontend Language Detection

**Question**: How do we know the user wants Arabic responses?

**Chosen Approach**: Use the app's current language setting (`i18n.language`)

**Why**:
- Already implemented and stored
- Consistent with rest of UI
- User explicitly chose their language preference

**Alternative Considered**: Auto-detect from message content
- More complex, could be wrong
- User might paste English text while wanting Arabic response
- Rejected for simplicity

---

### ⚠️ Decision 5: Citations in Bilingual Context

**Current State**: Citations link to document chunks with source references

**Challenge**: Document title might be in English, but user is viewing in Arabic

**Chosen Approach**: Show document title as-is (original language)

**Why**:
- Document titles are proper nouns (manual names)
- Translating could cause confusion about which document
- User can still click to view the source

**Enhancement for future**: Add Arabic description field to documents

---

## 3. System Architecture Changes

### 3.1 Chat Request Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                    │
│  User types Arabic query: "طلمبة الفاكيوم بتعمل صوت غريب"            │
│  Selected asset: [Booster pump / طلمبة بوستر]                       │
│  App language: ar                                                   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      POST /ai/chat                                  │
│  {                                                                  │
│    message: "طلمبة الفاكيوم بتعمل صوت غريب",                         │
│    assetId: "uuid-of-booster-pump",                                │
│    conversationId: "...",                                          │
│    language: "ar"   // NEW FIELD                                   │
│  }                                                                  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND: Chat Service                            │
│                                                                     │
│  1. Load asset with full bilingual context                          │
│  2. Get applicable documents for asset (Spec 3)                     │
│  3. Generate embedding for search query                             │
│  4. Vector search in applicable docs                                │
│  5. Build prompt with:                                              │
│     - Language instruction (respond in Arabic)                      │
│     - Bilingual asset context                                       │
│     - Retrieved doc chunks                                          │
│     - Conversation history                                          │
│  6. Call LLM                                                        │
│  7. Parse response, extract citations                               │
│  8. Save messages to database                                       │
│  9. Return response                                                 │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         RESPONSE                                    │
│  {                                                                  │
│    message: {                                                       │
│      content: "بناءً على الوثائق المتاحة، الصوت الغريب في طلمبة      │
│                البوستر قد يكون بسبب...",                             │
│      citations: [...],                                              │
│      structuredOutput: {...}                                        │
│    }                                                                │
│  }                                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Prompt Builder Updates

**Location**: `backend/src/services/ai/prompt.ts`

```typescript
interface PromptContext {
  userLanguage: 'en' | 'ar';
  asset: Asset;
  retrievedChunks: DocumentChunk[];
  conversationHistory: ChatMessage[];
  query: string;
}

export function buildChatPrompt(context: PromptContext): string {
  const { userLanguage, asset, retrievedChunks, conversationHistory, query } = context;

  // Language instruction
  const languageInstruction = userLanguage === 'ar'
    ? `IMPORTANT: You MUST respond entirely in Arabic (العربية).
       When referring to equipment, use the Arabic names provided below.
       Technical terms from documents can be explained in Arabic.`
    : `Respond in English. Use the English equipment names provided.`;

  // Asset context (bilingual)
  const assetContext = `
ASSET INFORMATION:
- English Name: ${asset.nameEn}
- Arabic Name: ${asset.nameAr || 'N/A'}
- Full Path (EN): ${asset.pathStringEn}
- Full Path (AR): ${asset.pathStringAr || 'N/A'}
- Code: ${asset.code || 'N/A'}
- Status: ${asset.status} ${asset.statusReason ? `(${asset.statusReason})` : ''}
- Criticality: ${asset.criticality || 'N/A'}
`;

  // Retrieved documentation
  const docsContext = retrievedChunks.length > 0
    ? `
RELEVANT DOCUMENTATION:
${retrievedChunks.map((chunk, i) => `
[${i + 1}] Source: ${chunk.document?.title || 'Unknown'}
Content: ${chunk.content}
`).join('\n')}
`
    : `
NO DOCUMENTATION FOUND for this specific query. Base your response on general knowledge
about this type of equipment, but clearly state when you're not referencing specific documentation.
`;

  // Conversation history (last 10 messages)
  const historyContext = conversationHistory.length > 0
    ? `
CONVERSATION HISTORY:
${conversationHistory.slice(-10).map(msg =>
  `${msg.role.toUpperCase()}: ${msg.content}`
).join('\n')}
`
    : '';

  // Combine into full prompt
  return `
You are MetralisAI, an expert maintenance assistant for industrial equipment.

${languageInstruction}

${assetContext}

${docsContext}

${historyContext}

USER QUERY: ${query}

INSTRUCTIONS:
1. Answer the user's question based on the documentation and asset context
2. If referencing documentation, cite the source number [1], [2], etc.
3. If no relevant documentation exists, use general knowledge but clearly indicate this
4. Provide practical, actionable guidance for maintenance technicians
5. For troubleshooting, suggest step-by-step diagnostic procedures
6. ${userLanguage === 'ar' ? 'Remember: Respond in Arabic!' : ''}
`;
}
```

---

## 4. API Changes

### 4.1 POST /ai/chat

**Updated Request Body**:
```typescript
interface ChatRequestBody {
  message: string;
  assetId?: string;         // Optional - can chat without asset context
  conversationId?: string;  // Continue existing conversation
  language: 'en' | 'ar';    // NEW - user's preferred response language
}
```

**Updated Handler**:
```typescript
async function handleChat(req: Request) {
  const { message, assetId, conversationId, language } = req.body;
  const userId = req.user.id;

  // 1. Load or create conversation
  let conversation = conversationId
    ? await prisma.chatConversation.findUnique({ where: { id: conversationId } })
    : null;

  if (!conversation) {
    conversation = await prisma.chatConversation.create({
      data: {
        userId,
        assetId,
        title: message.slice(0, 60),
      }
    });
  }

  // 2. Load asset with full context
  let asset = null;
  if (assetId) {
    asset = await prisma.asset.findUnique({
      where: { id: assetId },
      include: {
        parent: true,
        // Include recent work orders for context
        workOrders: {
          take: 5,
          orderBy: { reportedAt: 'desc' }
        }
      }
    });
  }

  // 3. Retrieve relevant documents
  let retrievedChunks: DocumentChunk[] = [];
  if (asset) {
    retrievedChunks = await searchDocumentsForAsset(message, asset.id, { limit: 5 });
  } else {
    // Search factory-wide documents only
    retrievedChunks = await searchFactoryWideDocs(message, { limit: 5 });
  }

  // 4. Load conversation history
  const history = await prisma.chatMessage.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: 'asc' },
    take: 20
  });

  // 5. Build prompt with language context
  const prompt = buildChatPrompt({
    userLanguage: language,
    asset,
    retrievedChunks,
    conversationHistory: history,
    query: message
  });

  // 6. Call LLM
  const llmResponse = await callLLM(prompt);

  // 7. Parse and save messages
  const userMessage = await prisma.chatMessage.create({
    data: {
      conversationId: conversation.id,
      role: 'USER',
      content: message
    }
  });

  const assistantMessage = await prisma.chatMessage.create({
    data: {
      conversationId: conversation.id,
      role: 'ASSISTANT',
      content: llmResponse.content,
      citations: buildCitations(retrievedChunks, llmResponse),
      structuredOutput: llmResponse.structuredOutput
    }
  });

  // 8. Update conversation
  await prisma.chatConversation.update({
    where: { id: conversation.id },
    data: { lastMessageAt: new Date() }
  });

  return {
    conversationId: conversation.id,
    message: assistantMessage
  };
}
```

---

## 5. Frontend Changes

### 5.1 Asset Selector in Chat

**Current**: Dropdown showing machine names

**Change**: Use `AssetPicker` component (cascading dropdowns from Spec 1)

**Location**: `/src/pages/ai/MetralisAI.tsx`

```typescript
// Replace machine selector with asset picker
<AssetPicker
  value={selectedAssetId}
  onChange={setSelectedAssetId}
  placeholder={t('ai.selectAsset')}
/>

// Display selected asset path
{selectedAsset && (
  <div className="text-sm text-muted-foreground">
    {i18n.language === 'ar'
      ? selectedAsset.pathStringAr
      : selectedAsset.pathStringEn}
  </div>
)}
```

### 5.2 Pass Language to API

```typescript
// In chat submission handler
const sendMessage = async (content: string) => {
  const response = await api.post('/ai/chat', {
    message: content,
    assetId: selectedAssetId,
    conversationId,
    language: i18n.language  // Pass current language
  });
  // ...
};
```

### 5.3 RTL Support for Arabic Responses

**Already implemented** via i18n direction switching, but verify:

```css
/* Ensure chat bubbles respect direction */
.chat-message {
  direction: inherit;  /* Inherits from parent based on language */
}

.chat-message[data-role="assistant"] {
  text-align: start;  /* Uses logical property for LTR/RTL */
}

/* Arabic text should have appropriate line-height */
[dir="rtl"] .chat-message {
  line-height: 1.8;
}
```

### 5.4 Citations Display

No changes needed - citations display document titles as-is.

---

## 6. Embedding Strategy

### 6.1 Query Embedding for Arabic

**Current approach**: Generate embedding for raw query text

**No change needed**: OpenAI's embedding models handle Arabic text and can find semantic similarity with English documents.

**If accuracy is poor**, consider:
1. Prepending English asset path to Arabic query before embedding
2. Using a multilingual-specific embedding model

```typescript
// Optional enhancement: combine asset context with query
async function generateSearchEmbedding(query: string, asset: Asset): Promise<number[]> {
  // Include English asset path to improve retrieval
  const enhancedQuery = asset
    ? `${asset.pathStringEn}: ${query}`
    : query;

  return generateEmbedding(enhancedQuery);
}
```

---

## 7. Testing Strategy

### 7.1 Test Cases

**Arabic Query → Arabic Response**:
```
Input:
  language: "ar"
  assetId: [booster pump]
  message: "الطلمبة بتعمل صوت غريب"

Expected:
  - Response is in Arabic
  - Response references "طلمبة بوستر" (Arabic name)
  - If docs found, citations are included
```

**Arabic Query → Finds English Docs**:
```
Input:
  language: "ar"
  assetId: [booster pump with English manual]
  message: "كيف أغير البيرنج؟"

Expected:
  - Vector search finds "bearing replacement" in English manual
  - Response explains procedure in Arabic
  - Citation links to English document
```

**No Asset Selected**:
```
Input:
  language: "ar"
  assetId: null
  message: "ما هي أفضل ممارسات الصيانة الوقائية؟"

Expected:
  - Searches factory-wide documents
  - Response in Arabic
  - General guidance (no specific asset context)
```

**Mixed Language Query**:
```
Input:
  language: "ar"
  message: "الـ booster pump بتاعي فيه مشكلة"

Expected:
  - LLM understands mixed input
  - Response in Arabic
  - Uses Arabic asset name in response
```

### 7.2 Manual Testing Checklist

- [ ] Arabic query returns Arabic response
- [ ] English query returns English response (when language=en)
- [ ] Asset picker shows Arabic names when app is in Arabic
- [ ] Chat history displays correctly in RTL mode
- [ ] Citations are clickable and link to correct documents
- [ ] Long Arabic responses don't break layout
- [ ] Response uses Arabic asset names from database

---

## 8. Localization

### 8.1 New Translation Keys

```json
{
  "ai": {
    "title": "MetralisAI",
    "selectAsset": "Select an asset to get specific help",
    "noAssetSelected": "No asset selected - showing general information",
    "placeholder": "Ask a question about this equipment...",
    "thinking": "Thinking...",
    "noDocuments": "No documentation found",
    "basedOnDocs": "Based on available documentation",
    "generalKnowledge": "Based on general knowledge",
    "citations": "Sources",
    "feedback": {
      "helpful": "This was helpful",
      "notHelpful": "This wasn't helpful"
    }
  }
}
```

---

## 9. Implementation Order

1. **Update API endpoint** - Add `language` parameter to chat request
2. **Update prompt builder** - Add language instruction and bilingual context
3. **Update frontend** - Pass language, use AssetPicker
4. **Test Arabic flow** - Manual testing with Arabic queries
5. **Verify RTL** - Ensure chat UI works in RTL mode
6. **Add translation keys** - Localize AI-related UI strings

---

## 10. Future Enhancements (Out of Scope)

1. **Voice input** - Speech-to-text for Arabic
2. **Document translation** - Translate English manuals to Arabic
3. **Auto-language detection** - Detect query language instead of relying on app setting
4. **Bilingual citations** - Show document description in user's language

---

*End of Spec 4*
