# Spec 3: Document Association System

**Status**: Ready for Review
**Dependencies**: Spec 1 (Hierarchical Assets)
**Blocked By**: Spec 1
**Blocks**: Spec 4 (MetralisAI Arabic)

---

## 1. High-Level Summary

### What We're Building

Enhance the document system to support:
1. **Multi-asset linking** - One document can be assigned to multiple specific assets
2. **Inheritance** - Document on a machine can apply to all its groups/components
3. **Factory-wide documents** - SOPs that apply to everything

### Why This Matters

1. **Reduce duplication** - Same freeze dryer manual doesn't need to be uploaded 3 times
2. **Automatic context** - When viewing a component, see all relevant docs (own + inherited + factory)
3. **AI retrieval** - MetralisAI can find relevant documentation through inheritance chain

---

## 2. Technical Decisions Requiring Attention

### ⚠️ Decision 1: Many-to-Many via Join Table

**Chosen Approach**: Create `DocumentAsset` join table

```prisma
model DocumentAsset {
  documentId  String
  assetId     String
  // ...
}
```

**Why**:
- Simple, standard pattern
- Easy to query: "documents for asset X" or "assets with document Y"
- Supports adding metadata to the relationship later (e.g., "primary manual" flag)

**Alternative Considered**: Array of asset IDs on Document
- Harder to query inverse relationship
- Can't add relationship metadata
- PostgreSQL array queries are less performant

---

### ⚠️ Decision 2: Inheritance Flag Meaning
a
**Question**: When `appliesToChildren = true`, does it apply to:
- A) Direct children only
- B) All descendants (children, grandchildren, etc.)

**Chosen Approach**: (B) All descendants

**Why**:
- Machine manual should apply to groups AND components inside
- More useful in practice
- User explicitly opts in, so they understand the scope

**Implementation**: When retrieving docs for an asset, walk UP the ancestor chain and include docs where `appliesToChildren = true`

---

### ⚠️ Decision 3: Factory-Wide vs Assigned to All

**Question**: What's the difference between:
- A) `isFactoryWide = true`
- B) Assigning document to every root asset with `appliesToChildren = true`

**Answer**:
- (A) is simpler, doesn't require linking to any specific asset
- (A) automatically applies to NEW assets added later
- (B) would miss newly added machines

**Recommendation**: Use `isFactoryWide = true` for SOPs, safety docs, general procedures

---

### ⚠️ Decision 4: Vector Chunk Association

**Current State**: `DocumentChunk` has `machineId` field for filtering during vector search

**Change Needed**:
- Replace `machineId` with association to the document's linked assets
- When searching for an asset, include chunks from:
  - Documents directly linked to this asset
  - Documents inherited from ancestors
  - Factory-wide documents

**Implementation**: The `machineId` on `DocumentChunk` should become nullable, and we'll derive the applicable assets from the Document's relationships at query time.

---

### ⚠️ Decision 5: Document Upload UI - Multi-Select

**Question**: How do users select multiple assets when uploading a document?

**Options**:
1. Multi-select dropdown with checkboxes
2. Tree view with checkable nodes
3. Type-to-search with "add" button (like tagging)

**Chosen Approach**: (3) Type-to-search with tag-style display

**Why**:
- Scales better with many assets
- Clear visual of what's selected
- Users can search in both English and Arabic

---

## 3. Database Schema Changes

### 3.1 Document Model (Updated)

```prisma
model Document {
  id                String    @id @default(uuid())

  // File info (unchanged)
  title             String
  filePath          String    // S3 key
  mimeType          String?
  fileSize          Int?
  originalFilename  String?

  // Association - via join table
  assets            DocumentAsset[]

  // Factory-wide flag (no asset association needed)
  isFactoryWide     Boolean   @default(false)

  // Inheritance - when linked to an asset, also applies to descendants
  appliesToChildren Boolean   @default(false)

  // Metadata
  documentType      String?   // "manual", "datasheet", "sop", "procedure", etc.
  language          String?   // "en", "ar", "bilingual"
  description       String?   @db.Text

  // Ownership
  uploadedById      String?
  uploadedBy        User?     @relation(fields: [uploadedById], references: [id])

  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  // Vector chunks for AI retrieval
  chunks            DocumentChunk[]

  // Work order attachments
  workOrders        WorkOrder[]  @relation("WorkOrderAttachments")
  repairActions     RepairAction[] @relation("RepairActionAttachments")

  @@index([isFactoryWide])
  @@index([documentType])
}
```

### 3.2 DocumentAsset Join Table (New)

```prisma
model DocumentAsset {
  id          String    @id @default(uuid())

  documentId  String
  document    Document  @relation(fields: [documentId], references: [id], onDelete: Cascade)

  assetId     String
  asset       Asset     @relation(fields: [assetId], references: [id], onDelete: Cascade)

  // Optional: relationship metadata
  isPrimary   Boolean   @default(false)  // Mark as "primary" manual for this asset

  createdAt   DateTime  @default(now())

  @@unique([documentId, assetId])
  @@index([documentId])
  @@index([assetId])
}
```

### 3.3 DocumentChunk Model (Updated)

```prisma
model DocumentChunk {
  id          String    @id @default(uuid())

  documentId  String
  document    Document  @relation(fields: [documentId], references: [id], onDelete: Cascade)

  // Content
  content     String    @db.Text
  chunkIndex  Int       // Order within document

  // Vector embedding
  embedding   Unsupported("vector(1536)")?

  // Metadata for search filtering
  // NOTE: We no longer store machineId here - derive from Document.assets at query time
  metadata    Json?

  createdAt   DateTime  @default(now())

  @@index([documentId])
}
```

### 3.4 Migration

```sql
-- Create DocumentAsset join table
CREATE TABLE "DocumentAsset" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "documentId" UUID NOT NULL REFERENCES "Document"(id) ON DELETE CASCADE,
  "assetId" UUID NOT NULL REFERENCES "Asset"(id) ON DELETE CASCADE,
  "isPrimary" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  UNIQUE("documentId", "assetId")
);

CREATE INDEX idx_document_asset_document ON "DocumentAsset"("documentId");
CREATE INDEX idx_document_asset_asset ON "DocumentAsset"("assetId");

-- Migrate existing machineId associations to DocumentAsset
-- (Only if there's existing data to migrate)
INSERT INTO "DocumentAsset" ("documentId", "assetId")
SELECT id, "machineId" FROM "Document" WHERE "machineId" IS NOT NULL;

-- Drop machineId from Document (after migration)
ALTER TABLE "Document" DROP COLUMN "machineId";

-- Add new columns to Document
ALTER TABLE "Document" ADD COLUMN "isFactoryWide" BOOLEAN DEFAULT false;
ALTER TABLE "Document" ADD COLUMN "appliesToChildren" BOOLEAN DEFAULT false;
ALTER TABLE "Document" ADD COLUMN "documentType" TEXT;
ALTER TABLE "Document" ADD COLUMN "description" TEXT;
```

---

## 4. API Endpoints

### 4.1 GET /documents

**Query Parameters**:
```typescript
interface GetDocumentsQuery {
  assetId?: string;           // Filter by specific asset
  includeInherited?: boolean; // Include docs inherited from ancestors (default: true)
  includeFactoryWide?: boolean; // Include factory-wide docs (default: true)
  documentType?: string;      // Filter by type
  search?: string;            // Search in title, description
}
```

**Response**:
```typescript
interface GetDocumentsResponse {
  documents: Array<Document & {
    assets: Array<{ id: string; nameEn: string; nameAr: string | null }>;
    source: 'direct' | 'inherited' | 'factory-wide';  // How it's associated
  }>;
}
```

### 4.2 GET /documents/:id

**Response**:
```typescript
interface GetDocumentResponse {
  document: Document & {
    assets: Asset[];
    uploadedBy: User | null;
    chunksCount: number;
  };
}
```

### 4.3 POST /documents/upload

**Request** (multipart/form-data):
```typescript
interface UploadDocumentBody {
  file: File;                  // The actual file
  title: string;
  description?: string;
  documentType?: string;       // "manual", "datasheet", "sop", etc.
  language?: string;           // "en", "ar", "bilingual"
  assetIds?: string[];         // Assets to link to
  isFactoryWide?: boolean;     // If true, ignores assetIds
  appliesToChildren?: boolean; // Inheritance flag
}
```

**Implementation**:
```typescript
async function uploadDocument(req: Request) {
  const file = req.file;
  const body = req.body as UploadDocumentBody;

  // 1. Upload to S3
  const s3Key = await uploadToS3(file);

  // 2. Create document record
  const document = await prisma.document.create({
    data: {
      title: body.title,
      description: body.description,
      filePath: s3Key,
      mimeType: file.mimetype,
      fileSize: file.size,
      originalFilename: file.originalname,
      documentType: body.documentType,
      language: body.language,
      isFactoryWide: body.isFactoryWide || false,
      appliesToChildren: body.appliesToChildren || false,
      uploadedById: req.user.id,
    }
  });

  // 3. Create asset associations (if not factory-wide)
  if (!body.isFactoryWide && body.assetIds?.length) {
    await prisma.documentAsset.createMany({
      data: body.assetIds.map(assetId => ({
        documentId: document.id,
        assetId,
      }))
    });
  }

  // 4. Extract text and create chunks (async job)
  await queueDocumentProcessing(document.id);

  return document;
}
```

### 4.4 PATCH /documents/:id

**Request Body**:
```typescript
interface UpdateDocumentBody {
  title?: string;
  description?: string;
  documentType?: string;
  language?: string;
  isFactoryWide?: boolean;
  appliesToChildren?: boolean;
}
```

### 4.5 POST /documents/:id/assets

**Add assets to document**:
```typescript
interface AddDocumentAssetsBody {
  assetIds: string[];
}
```

### 4.6 DELETE /documents/:id/assets/:assetId

**Remove asset association from document**.

### 4.7 DELETE /documents/:id

**Delete document** (cascades to DocumentAsset and DocumentChunk).

---

## 5. Document Retrieval Logic

### 5.1 Get Applicable Documents for an Asset

```typescript
// services/documentRetrieval.ts

export async function getApplicableDocuments(
  assetId: string,
  options: {
    includeInherited?: boolean;
    includeFactoryWide?: boolean;
  } = {}
): Promise<DocumentWithSource[]> {
  const { includeInherited = true, includeFactoryWide = true } = options;

  const results: DocumentWithSource[] = [];

  // 1. Documents directly linked to this asset
  const directDocs = await prisma.document.findMany({
    where: {
      assets: { some: { assetId } }
    },
    include: { assets: { include: { asset: true } } }
  });

  for (const doc of directDocs) {
    results.push({ ...doc, source: 'direct' });
  }

  // 2. Inherited documents (from ancestors with appliesToChildren=true)
  if (includeInherited) {
    const ancestorIds = await getAncestorIds(assetId);

    if (ancestorIds.length > 0) {
      const inheritedDocs = await prisma.document.findMany({
        where: {
          appliesToChildren: true,
          assets: { some: { assetId: { in: ancestorIds } } }
        },
        include: { assets: { include: { asset: true } } }
      });

      for (const doc of inheritedDocs) {
        // Avoid duplicates (if doc is also directly linked)
        if (!results.find(r => r.id === doc.id)) {
          results.push({ ...doc, source: 'inherited' });
        }
      }
    }
  }

  // 3. Factory-wide documents
  if (includeFactoryWide) {
    const factoryDocs = await prisma.document.findMany({
      where: { isFactoryWide: true },
      include: { assets: { include: { asset: true } } }
    });

    for (const doc of factoryDocs) {
      if (!results.find(r => r.id === doc.id)) {
        results.push({ ...doc, source: 'factory-wide' });
      }
    }
  }

  return results;
}

// Helper to get ancestor IDs
async function getAncestorIds(assetId: string): Promise<string[]> {
  const ancestors: string[] = [];
  let currentId: string | null = assetId;

  while (currentId) {
    const asset = await prisma.asset.findUnique({
      where: { id: currentId },
      select: { parentId: true }
    });

    if (asset?.parentId) {
      ancestors.push(asset.parentId);
      currentId = asset.parentId;
    } else {
      break;
    }
  }

  return ancestors;
}
```

### 5.2 Vector Search with Inheritance

```typescript
// services/vectorSearch.ts

export async function searchDocumentsForAsset(
  query: string,
  assetId: string,
  options: { limit?: number } = {}
): Promise<DocumentChunk[]> {
  const { limit = 10 } = options;

  // 1. Get all applicable document IDs
  const applicableDocs = await getApplicableDocuments(assetId);
  const documentIds = applicableDocs.map(d => d.id);

  if (documentIds.length === 0) {
    return [];
  }

  // 2. Generate query embedding
  const queryEmbedding = await generateEmbedding(query);

  // 3. Vector search within applicable documents
  const chunks = await prisma.$queryRaw<DocumentChunk[]>`
    SELECT dc.*, 1 - (dc.embedding <=> ${queryEmbedding}::vector) as similarity
    FROM "DocumentChunk" dc
    WHERE dc."documentId" IN (${Prisma.join(documentIds)})
    AND dc.embedding IS NOT NULL
    ORDER BY dc.embedding <=> ${queryEmbedding}::vector
    LIMIT ${limit}
  `;

  return chunks;
}
```

---

## 6. Frontend Components

### 6.1 Document Upload Modal

**Location**: `/src/components/documents/DocumentUploadModal.tsx`

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Upload Document                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │         Drag & drop file here or click to browse            │   │
│  │                                                             │   │
│  │                    📄 Supported: PDF, DOC, DOCX             │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Title: [_______________________________________] *required         │
│                                                                     │
│  Description:                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Document Type: [Manual ▼]                                         │
│  Language: [English ▼]                                             │
│                                                                     │
│  ─────────────────────────────────────────────────────────────     │
│                                                                     │
│  [ ] This document applies to ALL assets (factory-wide)            │
│                                                                     │
│  OR link to specific assets:                                       │
│                                                                     │
│  Assets: [Type to search...]                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ✕ Freeze Dryer                                              │   │
│  │ ✕ Freeze Dryer / Vacuum System                              │   │
│  │ ✕ Freeze Dryer 2                                            │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [ ] Apply to all children of selected assets                      │
│                                                                     │
│                                    [Cancel]  [Upload]              │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Asset Search Picker Component

```typescript
// components/AssetSearchPicker.tsx

interface AssetSearchPickerProps {
  selectedAssets: Asset[];
  onChange: (assets: Asset[]) => void;
  disabled?: boolean;
}

function AssetSearchPicker({ selectedAssets, onChange, disabled }: Props) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Asset[]>([]);

  // Search API on input change
  useEffect(() => {
    if (search.length >= 2) {
      searchAssets(search).then(setResults);
    } else {
      setResults([]);
    }
  }, [search]);

  const addAsset = (asset: Asset) => {
    if (!selectedAssets.find(a => a.id === asset.id)) {
      onChange([...selectedAssets, asset]);
    }
    setSearch('');
    setResults([]);
  };

  const removeAsset = (assetId: string) => {
    onChange(selectedAssets.filter(a => a.id !== assetId));
  };

  return (
    <div>
      {/* Selected assets as tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedAssets.map(asset => (
          <Badge key={asset.id} variant="secondary">
            {getLocalizedPath(asset)}
            <button onClick={() => removeAsset(asset.id)}>✕</button>
          </Badge>
        ))}
      </div>

      {/* Search input */}
      <Input
        placeholder="Type to search assets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={disabled}
      />

      {/* Search results dropdown */}
      {results.length > 0 && (
        <div className="absolute bg-white border rounded shadow-lg">
          {results.map(asset => (
            <div
              key={asset.id}
              onClick={() => addAsset(asset)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {getLocalizedPath(asset)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 6.3 Document List with Source Indicator

```typescript
// components/documents/DocumentList.tsx

interface DocumentListProps {
  assetId?: string;  // If provided, shows docs for this asset
}

function DocumentList({ assetId }: Props) {
  const { data: documents } = useDocuments({ assetId });

  return (
    <div>
      {documents?.map(doc => (
        <DocumentCard key={doc.id} document={doc}>
          {/* Show source badge */}
          {doc.source === 'inherited' && (
            <Badge variant="outline">Inherited</Badge>
          )}
          {doc.source === 'factory-wide' && (
            <Badge variant="outline">Factory-wide</Badge>
          )}
        </DocumentCard>
      ))}
    </div>
  );
}
```

### 6.4 Document Management Page (Admin)

**Location**: `/src/pages/documents/DocumentsList.tsx`

**Features**:
- List all documents with filters
- Show linked assets count
- Bulk actions (delete, update type)
- Upload button

---

## 7. Localization

### 7.1 New Translation Keys

```json
{
  "documents": {
    "title": "Documents",
    "upload": "Upload Document",
    "uploadTitle": "Upload New Document",
    "fields": {
      "title": "Title",
      "description": "Description",
      "type": "Document Type",
      "language": "Language",
      "assets": "Linked Assets",
      "factoryWide": "Factory-wide",
      "appliesToChildren": "Applies to children"
    },
    "types": {
      "manual": "Manual",
      "datasheet": "Datasheet",
      "sop": "SOP",
      "procedure": "Procedure",
      "other": "Other"
    },
    "languages": {
      "en": "English",
      "ar": "Arabic",
      "bilingual": "Bilingual"
    },
    "source": {
      "direct": "Direct",
      "inherited": "Inherited from parent",
      "factoryWide": "Factory-wide"
    },
    "hints": {
      "factoryWide": "This document will be available to all assets",
      "appliesToChildren": "This document will also apply to all children of selected assets",
      "searchAssets": "Search by name or code"
    },
    "actions": {
      "download": "Download",
      "edit": "Edit",
      "delete": "Delete",
      "removeFromAsset": "Remove from this asset"
    }
  }
}
```

---

## 8. Testing Checklist

### Unit Tests
- [ ] `getApplicableDocuments` returns direct docs
- [ ] `getApplicableDocuments` returns inherited docs when flag is true
- [ ] `getApplicableDocuments` returns factory-wide docs
- [ ] `getApplicableDocuments` deduplicates results
- [ ] `getAncestorIds` returns correct order

### Integration Tests
- [ ] Upload document with single asset
- [ ] Upload document with multiple assets
- [ ] Upload factory-wide document
- [ ] Document with `appliesToChildren=true` appears for descendants
- [ ] Delete document cascades to DocumentAsset and DocumentChunk
- [ ] Vector search respects asset scoping

### E2E Tests
- [ ] Upload flow with asset selection
- [ ] Asset search picker finds by English and Arabic name
- [ ] Document list shows source badges
- [ ] Inherited documents appear on component page

---

## 9. Implementation Order

1. **Database migration** - Create DocumentAsset table, update Document
2. **Update Prisma schema** - Add models and relations
3. **Document retrieval service** - `getApplicableDocuments` function
4. **Update vector search** - Use document scoping
5. **API endpoints** - Upload, update, list with filters
6. **Frontend components** - Upload modal, asset picker, document list
7. **Localization** - Add translation keys
8. **Testing** - Unit, integration, E2E

---

*End of Spec 3*
