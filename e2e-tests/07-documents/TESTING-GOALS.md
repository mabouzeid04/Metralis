DONE

# Documents E2E Testing Goals

## Overview
Test document management including uploading, listing, viewing, downloading, and deleting documents. Documents serve as the knowledge base for AI-powered diagnostics.

---

## Test Scenarios

### 1. Documents List View
**File:** `documents-list.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DOC-001 | View documents list | 1. Navigate to /documents | Document list displayed |
| TC-DOC-002 | Search by title | 1. Enter document title in search | Matching documents shown |
| TC-DOC-003 | Search by description | 1. Enter text from description | Matching documents shown |
| TC-DOC-004 | Filter by type (MANUAL) | 1. Select MANUAL type | Only manuals shown |
| TC-DOC-005 | Filter by type (SOP) | 1. Select SOP type | Only SOPs shown |
| TC-DOC-006 | Filter by type (TROUBLESHOOTING) | 1. Select TROUBLESHOOTING | Only troubleshooting guides shown |
| TC-DOC-007 | Filter by type (OTHER) | 1. Select OTHER | Other documents shown |
| TC-DOC-008 | Filter by language (EN) | 1. Select English | Only English documents shown |
| TC-DOC-009 | Filter by language (AR) | 1. Select Arabic | Only Arabic documents shown |
| TC-DOC-010 | Document list columns | 1. View list | See: Title, Type, Language, Asset, Date |
| TC-DOC-011 | Empty search results | 1. Search for non-existent document | Empty state message shown |
| TC-DOC-012 | Click to view details | 1. Click document row | Navigate to detail or open preview |

---

### 2. Upload Document
**File:** `document-upload.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DOC-020 | Upload form visible | 1. Navigate to /documents | Upload form/section visible |
| TC-DOC-021 | File picker accepts PDF | 1. Click file picker<br>2. Select PDF file | PDF file selected |
| TC-DOC-022 | File picker accepts DOC | 1. Select .doc file | DOC file selected |
| TC-DOC-023 | File picker accepts DOCX | 1. Select .docx file | DOCX file selected |
| TC-DOC-024 | File picker rejects invalid types | 1. Try to select .exe or .jpg | File rejected or filtered out |
| TC-DOC-025 | Enter document title | 1. Enter title in field | Title accepted |
| TC-DOC-026 | Select document type (MANUAL) | 1. Select MANUAL from dropdown | Type set |
| TC-DOC-027 | Select document type (SOP) | 1. Select SOP | Type set |
| TC-DOC-028 | Select document type (TROUBLESHOOTING) | 1. Select TROUBLESHOOTING | Type set |
| TC-DOC-029 | Select document type (OTHER) | 1. Select OTHER | Type set |
| TC-DOC-030 | Select language (EN) | 1. Select English | Language set |
| TC-DOC-031 | Select language (AR) | 1. Select Arabic | Language set |
| TC-DOC-032 | Select language (bilingual) | 1. Select Bilingual option | Language set as both |
| TC-DOC-033 | Assign to single asset | 1. Select specific machine/asset | Document linked to asset |
| TC-DOC-034 | Assign factory-wide | 1. Select factory-wide option | Document applies to all assets |
| TC-DOC-035 | Enter description | 1. Enter document description | Description saved |
| TC-DOC-036 | Upload with all fields | 1. Fill all fields<br>2. Upload | Document created with all metadata |
| TC-DOC-037 | Upload progress indicator | 1. Upload large file | Progress bar/spinner shown |
| TC-DOC-038 | Upload success message | 1. Complete upload | Success notification shown |
| TC-DOC-039 | Validation - missing file | 1. Submit without file | Validation error shown |
| TC-DOC-040 | Validation - missing title | 1. Submit without title | Validation error shown |
| TC-DOC-041 | Validation - missing type | 1. Submit without type | Validation error shown |
| TC-DOC-042 | File size limit | 1. Try to upload very large file | Size limit error shown |
| TC-DOC-043 | Document appears in list | 1. Upload document<br>2. View list | New document visible in list |

---

### 3. Document Processing
**File:** `document-processing.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DOC-050 | Text extraction occurs | 1. Upload PDF with text | Text extracted (visible in logs or searchable) |
| TC-DOC-051 | Document chunking occurs | 1. Upload document | Document split into chunks |
| TC-DOC-052 | Embeddings generated | 1. Upload document | Vector embeddings created for AI search |
| TC-DOC-053 | Processing status indicator | 1. Upload document | Processing status shown (if visible) |
| TC-DOC-054 | Processing completion | 1. Wait for processing | Processing completes without error |
| TC-DOC-055 | Searchable after processing | 1. Upload document<br>2. Wait for processing<br>3. Use AI chat | Document content searchable in AI |

---

### 4. View/Download Document
**File:** `document-view.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DOC-060 | View document metadata | 1. View document detail | Title, type, language, asset, description shown |
| TC-DOC-061 | Download document | 1. Click download button | File downloads to browser |
| TC-DOC-062 | Correct filename on download | 1. Download document | Filename matches original or title |
| TC-DOC-063 | Preview document (if supported) | 1. Click preview button | Document viewer opens |
| TC-DOC-064 | PDF renders in preview | 1. Preview PDF | PDF content visible |
| TC-DOC-065 | View document assigned asset | 1. View document detail | Linked asset(s) shown |
| TC-DOC-066 | Navigate to asset from document | 1. Click asset link | Navigate to asset detail |

---

### 5. Delete Document
**File:** `document-delete.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DOC-070 | Delete button visible | 1. View document list/detail | Delete button accessible |
| TC-DOC-071 | Delete shows confirmation | 1. Click delete | Confirmation dialog appears |
| TC-DOC-072 | Cancel delete | 1. Click delete<br>2. Cancel | Document not deleted |
| TC-DOC-073 | Confirm delete | 1. Click delete<br>2. Confirm | Document deleted |
| TC-DOC-074 | File removed from storage | 1. Delete document | File removed from S3/storage |
| TC-DOC-075 | Chunks removed | 1. Delete document | Document chunks removed |
| TC-DOC-076 | Embeddings cleaned up | 1. Delete document | Vector embeddings removed |
| TC-DOC-077 | Document removed from list | 1. Delete document<br>2. View list | Document no longer appears |
| TC-DOC-078 | No longer searchable in AI | 1. Delete document<br>2. Ask AI about content | Content no longer found |

---

### 6. Document-Asset Relationship
**File:** `document-asset-relation.spec.ts`

| Test Case | Description | Steps | Expected Result |
|-----------|-------------|-------|-----------------|
| TC-DOC-080 | Document linked to asset | 1. Upload with asset assignment | Document appears on asset detail |
| TC-DOC-081 | Factory-wide document | 1. Upload factory-wide | Document accessible for all assets |
| TC-DOC-082 | Asset hierarchy inheritance | 1. Assign to parent asset | Child assets can access document |
| TC-DOC-083 | View documents on machine page | 1. View machine detail | Related documents listed |
| TC-DOC-084 | View documents on asset page | 1. View asset detail | Related documents listed |
| TC-DOC-085 | AI uses asset-specific docs | 1. Select asset in AI chat<br>2. Ask question | Prioritizes docs for that asset |

---

## Test Data Requirements

```typescript
// fixtures/documents.ts
export const documentTestData = {
  pdfManual: {
    filePath: 'fixtures/files/pump-manual.pdf',
    title: 'Pump Operation Manual',
    type: 'MANUAL',
    language: 'EN',
    assetCode: 'PUMP-001',
    description: 'Complete operation and maintenance guide'
  },
  sopDocument: {
    filePath: 'fixtures/files/startup-procedure.pdf',
    title: 'Machine Startup SOP',
    type: 'SOP',
    language: 'EN',
    assetCode: null, // factory-wide
    description: 'Standard operating procedure for machine startup'
  },
  troubleshootingGuide: {
    filePath: 'fixtures/files/troubleshooting.docx',
    title: 'Vibration Troubleshooting Guide',
    type: 'TROUBLESHOOTING',
    language: 'EN',
    assetCode: 'LINE-A',
    description: 'Guide for diagnosing vibration issues'
  },
  arabicDocument: {
    filePath: 'fixtures/files/arabic-manual.pdf',
    title: 'دليل الصيانة',
    type: 'MANUAL',
    language: 'AR',
    description: 'دليل الصيانة الشامل'
  }
};

// Test files to include in fixtures/files/
// - pump-manual.pdf (multi-page PDF with text)
// - startup-procedure.pdf (single page SOP)
// - troubleshooting.docx (Word document)
// - arabic-manual.pdf (Arabic content)
// - large-file.pdf (for size limit testing)
// - invalid-file.exe (for rejection testing)
```

---

## Page Objects

```typescript
// pages/DocumentsPage.ts
class DocumentsPage {
  readonly documentList: Locator;
  readonly searchInput: Locator;
  readonly typeFilter: Locator;
  readonly languageFilter: Locator;

  // Upload form
  readonly fileInput: Locator;
  readonly titleInput: Locator;
  readonly typeSelect: Locator;
  readonly languageSelect: Locator;
  readonly assetPicker: Locator;
  readonly descriptionInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadProgress: Locator;

  async search(query: string): Promise<void>;
  async filterByType(type: string): Promise<void>;
  async filterByLanguage(language: string): Promise<void>;
  async uploadDocument(data: DocumentUploadData): Promise<void>;
  async clickDocument(title: string): Promise<void>;
  async getDocumentCount(): Promise<number>;
}

// pages/DocumentDetailPage.ts (if separate page exists)
class DocumentDetailPage {
  readonly title: Locator;
  readonly type: Locator;
  readonly language: Locator;
  readonly asset: Locator;
  readonly description: Locator;
  readonly downloadButton: Locator;
  readonly previewButton: Locator;
  readonly deleteButton: Locator;

  async download(): Promise<void>;
  async preview(): Promise<void>;
  async delete(): Promise<void>;
  async navigateToAsset(): Promise<void>;
}

// components/DocumentUploadForm.ts
class DocumentUploadForm {
  readonly dropzone: Locator;
  readonly fileInput: Locator;
  readonly titleInput: Locator;
  readonly typeSelect: Locator;
  readonly languageSelect: Locator;
  readonly assetPicker: Locator;
  readonly descriptionInput: Locator;
  readonly submitButton: Locator;
  readonly progressBar: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  async selectFile(filePath: string): Promise<void>;
  async fillMetadata(data: DocumentMetadata): Promise<void>;
  async submit(): Promise<void>;
  async waitForUploadComplete(): Promise<void>;
}
```

---

## Test File Setup

Create test fixture files for document upload testing:

```
e2e-tests/07-documents/fixtures/files/
├── pump-manual.pdf          # 5-page PDF with searchable text
├── startup-procedure.pdf    # 1-page simple SOP
├── troubleshooting.docx     # Word document
├── arabic-manual.pdf        # Arabic language PDF
├── large-file.pdf           # 50MB file for size limit test
├── empty.pdf                # Empty/minimal PDF
└── corrupted.pdf            # Corrupted file for error handling
```
