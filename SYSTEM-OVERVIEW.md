# Metralis: Factory Intelligence Layer

## Executive Summary

**Metralis** (formerly FactoryAI) is a comprehensive Factory Intelligence Layer platform that digitizes machine behavior, failures, manuals, and repairs to enable AI maintenance co-pilots today and autonomous, AI-run manufacturing in the future. This system serves as both a modern Computerized Maintenance Management System (CMMS) and the foundational data layer for future AI-driven factory operations.

The platform transforms chaotic, unstructured factory data into structured, machine-understandable intelligence, creating the prerequisite knowledge base that robotics and AI will rely on for autonomous manufacturing.

---

## Core Vision & Mission

### Long-Term Vision
A fully autonomous manufacturing stack requiring:
- **AI diagnostic agents** that understand machine behavior patterns
- **Robotics that perform maintenance** based on AI recommendations
- **Autonomous fault prediction** before failures occur
- **AI supervisors** for entire production lines

### Current Mission
Build the intelligence layer that enables the shift from:
- **Reactive** → **Predictive** maintenance
- **Manual** → **AI-guided** decision making
- **Human-dependent** → **Autonomous** operations

This repository serves as the canonical home for both the conceptual foundation and full implementation of autonomous manufacturing intelligence.

---

## System Architecture

### Technology Stack

**Backend:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js with custom middleware
- **Database:** PostgreSQL with UTF-8 encoding for Arabic/English support
- **ORM:** Prisma with type-safe database operations
- **Authentication:** JWT-based with HTTP-only cookies
- **File Storage:** AWS S3-compatible (MinIO for development)
- **AI Integration:** Google Gemini AI and OpenAI APIs
- **Vector Database:** pgvector for semantic search
- **Notifications:** WhatsApp Business API integration

**Frontend:**
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand for client state, TanStack Query for server state
- **UI Framework:** Tailwind CSS with shadcn/ui components
- **Routing:** React Router v7
- **Forms:** React Hook Form with Zod validation
- **Internationalization:** react-i18next with English/Arabic support
- **Charts:** Recharts for data visualization

**Infrastructure:**
- **Deployment:** Docker containers
- **Development:** Docker Compose for local development
- **Production:** Vercel (frontend), VPS/Docker (backend)
- **Database:** PostgreSQL with automated migrations

### Multi-Tenant Architecture (Future-Ready)

The system is designed for future multi-tenancy with separate databases per tenant:
- **Current:** Single database per deployment
- **Future:** Separate PostgreSQL database per tenant (subdomain-based routing)
- **Benefits:** Stronger data isolation, independent scaling, better compliance
- **Migration Path:** Schema already tenant-agnostic, no code changes needed

---

## Core Features

### 1. Authentication & User Management

**Self-Service Authentication:**
- User registration with email/password validation
- JWT-based session management with secure cookies
- Password hashing with bcrypt
- Automatic login after registration
- Session persistence across page refreshes

**User Roles & Permissions:**
- **Admin:** Full system access, user management, analytics
- **Technician:** Work order management, machine history access
- **Manager:** Work order assignment, dashboard oversight
- **Future:** Role-based permissions with granular access control

**User Profile Management:**
- Profile editing (name, email)
- Password change functionality
- User preferences storage
- Language preference (English/Arabic)

**Security Features:**
- Password requirements (minimum 8 characters)
- Email uniqueness validation
- Secure password storage
- Input sanitization and XSS prevention
- CORS configuration
- HTTPS enforcement in production

### 2. Machine/Asset Management

**Machine Registry:**
- Comprehensive machine metadata (name, code, category, line, area)
- Manufacturer and model information
- Serial number and commissioning date tracking
- Status management (running, down, maintenance, retired)
- Criticality classification (low, medium, high)

**Machine History Timeline:**
- Chronological view of all machine-related events
- Work order history with status progression
- Filter by date range, status, and type
- Link to detailed work order records
- Performance and reliability tracking

**Advanced Filtering:**
- Filter by status, category, line, area
- Search by name or manufacturer
- Real-time status updates
- Bulk operations support (planned)

### 3. Work Order Management

**Work Order Lifecycle:**
- **Open:** Initial creation and reporting
- **In Progress:** Active maintenance work
- **Waiting:** Awaiting parts or external assistance
- **Closed:** Completed with resolution

**Work Order Creation:**
- Required fields: machine, title, description
- Optional: priority, type, assigned technician
- Symptom tagging and categorization
- Automatic timestamping and reporter tracking

**Work Order Types:**
- **Corrective:** Fix existing problems
- **Preventive:** Scheduled maintenance
- **Inspection:** Quality and safety checks

**Priority Levels:**
- **Critical:** Immediate attention required
- **High:** Urgent but not immediately critical
- **Medium:** Standard priority
- **Low:** Can be scheduled

### 4. Repair Logging & Documentation

**Structured Repair Actions:**
- Step-by-step repair documentation
- Parts used tracking with quantities
- Success/failure recording
- Root cause analysis
- Performed by and timing tracking

**Evidence Collection:**
- Photo and video attachment support
- Document linking to repair actions
- Verification steps documentation
- Adjustment and calibration notes

**Knowledge Capture:**
- Permanent repair history storage
- Pattern recognition across similar repairs
- Technician knowledge institutionalization
- Future AI learning from repair patterns

### 5. Parts & Inventory Management

**Parts Catalog:**
- Comprehensive part information (name, category, part number)
- Manufacturer and cost tracking
- Usage history across all repairs
- Stock level monitoring (planned feature)

**Work Order Integration:**
- Parts linking during repair logging
- Quantity tracking per work order
- Cost calculation and reporting
- Usage analytics for predictive ordering

**Advanced Features (Planned):**
- Stock level alerts and reorder points
- Parts compatibility matrices
- Supplier management and procurement
- Inventory optimization recommendations

### 6. Document Management

**Document Upload & Storage:**
- PDF and document file support
- Secure S3-compatible storage
- File size and type validation
- Metadata tagging and organization

**Document Processing:**
- Automatic text extraction from PDFs
- Intelligent text chunking for AI processing
- Vector embeddings generation
- Semantic search capabilities

**Document Linking:**
- Machine-specific document association
- Work order attachment support
- Category-based organization (manuals, SOPs, troubleshooting)
- Language support (English/Arabic documents)

### 7. AI Maintenance Co-Pilot (Metralis AI)

**Conversational Interface:**
- Natural language interaction with factory knowledge
- Machine context awareness
- Conversation history and threading
- Real-time AI responses with structured output

**Intelligent Diagnostics:**
- Symptom analysis and pattern recognition
- Likely cause identification with confidence scoring
- Recommended repair steps with citations
- Evidence-based reasoning from historical data

**Knowledge Retrieval:**
- Semantic search across documents and repair history
- Vector similarity matching for relevant information
- Citation system with source verification
- Context-aware responses based on machine history

**Structured AI Responses:**
- **Summary:** Concise problem overview
- **Causes:** Ranked hypotheses with confidence levels
- **Steps:** Actionable repair recommendations
- **References:** Source document citations
- **Shortcuts:** Quick actions (create work order, view machine)

**Feedback System:**
- User feedback on AI responses (helpful/not helpful)
- Correct cause validation
- Continuous learning from technician input
- Response quality improvement over time

### 8. Analytics & Insights

**Operational Metrics:**
- **AI Queries:** Total diagnostic interactions
- **Mean Time to Diagnose:** Average diagnosis duration
- **Mean Time to Repair:** Average repair completion time
- **Knowledge Base Coverage:** Documentation completeness percentage

**System Insights Engine:**
- **Maintenance Insights:** Equipment reliability patterns
- **Inventory Insights:** Parts usage and stock optimization
- **Documentation Insights:** Knowledge gaps and coverage issues
- **Training Insights:** Technician performance and learning opportunities

**Automated Insight Generation:**
- Pattern detection across historical data
- Proactive recommendations for improvement
- Evidence-based insights with supporting data
- Priority-based insight ranking (high/medium/low)

**Dashboard Visualizations:**
- Interactive charts and graphs
- Real-time metrics updates
- Top failing machines identification
- Recent activity feeds and trends

### 9. WhatsApp Notifications

**Work Order Assignment Alerts:**
- Automatic WhatsApp notifications for assigned work orders
- Rich template messages with work order details
- Technician opt-in/opt-out control
- Multi-language support (English/Arabic)

**Message Template:**
```
New Work Order Assigned:
WO-1234: Vibration on gearbox
Machine: Production Line 1 - Pump Station
Priority: HIGH

Please check the system for details.
```

**Integration Features:**
- WhatsApp Business API integration
- Phone number normalization
- Template message compliance
- Delivery status tracking
- Fallback notification methods (planned)

### 10. Internationalization (i18n)

**Language Support:**
- **English:** Default language with full feature support
- **Arabic:** Complete RTL (Right-to-Left) layout support
- **Future:** Additional languages (French, Spanish, etc.)

**RTL Layout Features:**
- CSS logical properties for bidirectional support
- Icon mirroring for RTL languages
- Right-to-left text flow and alignment
- RTL-specific component adaptations

**Translation Infrastructure:**
- react-i18next integration
- Structured translation files (JSON format)
- Namespace organization (auth, dashboard, machines, etc.)
- Dynamic language switching
- Locale-aware date/time/number formatting

### 11. Search & Filtering

**Global Search:**
- Unified search across machines, work orders, parts, and documents
- Real-time results with type categorization
- Quick navigation to detail pages
- Search history and suggestions

**Advanced Filtering:**
- Multi-criteria filtering on all entity lists
- Date range and status filtering
- Category and priority-based filtering
- Saved filter presets (planned)

**AI-Powered Search:**
- Semantic understanding of search queries
- Context-aware result ranking
- Related entity suggestions
- Search within document content

---

## Data Architecture

### Core Data Model

**Users:**
- Authentication and profile information
- Role-based access control
- Language preferences and settings
- Activity tracking and audit trails

**Machines:**
- Comprehensive asset metadata
- Status and criticality tracking
- Relationship to work orders and documents
- Performance and reliability metrics

**Work Orders:**
- Complete maintenance request lifecycle
- Symptom and diagnosis tracking
- Repair action documentation
- Parts usage and cost tracking

**Repair Actions:**
- Detailed repair step documentation
- Parts consumption tracking
- Success/failure outcomes
- Technician attribution

**Parts:**
- Inventory and catalog management
- Usage tracking across repairs
- Cost and supplier information
- Compatibility relationships

**Documents:**
- File storage and metadata management
- Text extraction and processing
- Vector embeddings for AI search
- Machine and work order associations

**AI Conversations:**
- Chat history and context preservation
- Message threading and organization
- Feedback and quality tracking
- Machine-specific conversation context

**System Insights:**
- Automated insight generation
- Category and priority classification
- Evidence-based recommendations
- Status tracking and resolution

### Database Design Principles

**Structured Data for AI:**
- Every field designed for future AI reasoning
- Normalized schema preventing data duplication
- Rich entity relationships for knowledge graphs
- Extensible JSONB fields for future metadata

**Future-Ready Schema:**
- Reserved fields for vector embeddings
- Relationship fields for graph queries
- Temporal timestamps for time-series analysis
- Status fields for workflow automation

**Performance Optimizations:**
- Strategic database indexes on common query patterns
- Full-text search capabilities
- Efficient pagination and filtering
- Connection pooling and caching layers

---

## AI & Machine Learning Features

### Document Processing Pipeline

**Text Extraction:**
- PDF parsing and content extraction
- OCR capabilities for scanned documents
- Multi-language text recognition
- Structured content preservation

**Intelligent Chunking:**
- Semantic text segmentation
- Token-aware chunk sizing
- Overlap strategies for context preservation
- Metadata preservation across chunks

**Vector Embeddings:**
- Google Gemini AI integration for embeddings
- OpenAI API compatibility
- pgvector for efficient similarity search
- Batch processing for performance

### Retrieval-Augmented Generation (RAG)

**Context Retrieval:**
- Vector similarity search across document chunks
- Historical work order and repair data integration
- Machine-specific context filtering
- Multi-source information synthesis

**AI Reasoning:**
- Structured diagnostic outputs
- Confidence scoring for recommendations
- Citation system for source verification
- Evidence-based reasoning chains

**Continuous Learning:**
- User feedback integration
- Response quality improvement
- Pattern recognition from repair history
- Knowledge base expansion over time

### Automated Insights Engine

**Pattern Detection:**
- Failure pattern analysis across machines
- Parts usage optimization recommendations
- Documentation gap identification
- Training opportunity detection

**Predictive Analytics:**
- Equipment reliability forecasting
- Maintenance schedule optimization
- Inventory optimization suggestions
- Performance trend analysis

---

## API Architecture

### RESTful API Design

**Base Structure:**
```
API Base: /api/v1
Authentication: Bearer token required
Response Format: { data, meta, error }
Error Format: { error: { code, message, fields } }
```

**Core Endpoints:**

**Authentication:**
- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication
- `POST /auth/logout` - Session termination
- `GET /auth/me` - Current user profile

**Machines:**
- `GET /machines` - List machines with filtering
- `GET /machines/:id` - Machine details
- `POST /machines` - Create machine
- `PATCH /machines/:id` - Update machine
- `GET /machines/:id/history` - Machine timeline

**Work Orders:**
- `GET /work-orders` - List work orders with filtering
- `GET /work-orders/:id` - Work order details
- `POST /work-orders` - Create work order
- `PATCH /work-orders/:id` - Update work order
- `PATCH /work-orders/:id/status` - Status updates
- `POST /work-orders/:id/repair` - Add repair action

**AI Integration:**
- `POST /ai/chat` - Conversational AI interaction
- `GET /ai/conversations` - Chat history
- `GET /ai/conversations/:id` - Conversation details
- `POST /ai/messages/:id/feedback` - AI feedback

**Analytics:**
- `GET /analytics/stats` - System metrics
- `GET /analytics/insights` - System insights
- `POST /analytics/insights/generate` - Generate insights

**File Management:**
- `POST /documents` - Upload documents
- `GET /documents/:id/file` - Download files
- `GET /documents` - List documents

### API-First Architecture

**Future AI Integration:**
- API designed for seamless AI agent integration
- Read/write capabilities for AI systems
- Structured data contracts for automation
- Event-driven architecture hooks

**Extensibility:**
- Versioned API endpoints
- Backward compatibility guarantees
- Deprecation policies and migration guides
- Third-party integration support

---

## User Experience & Interface

### Responsive Design

**Mobile-First Approach:**
- Touch-friendly interfaces on all screen sizes
- Responsive navigation and layouts
- Optimized forms for mobile input
- Progressive enhancement for larger screens

**Cross-Platform Compatibility:**
- Modern browser support (Chrome, Firefox, Safari, Edge)
- Mobile browser optimization
- Tablet-specific layouts
- Desktop power-user features

### Accessibility Features

**WCAG Compliance:**
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management and indicators

**Inclusive Design:**
- Clear typography and spacing
- Intuitive iconography and labels
- Error prevention and clear messaging
- Multi-language accessibility

### Performance Optimization

**Frontend Performance:**
- Code splitting and lazy loading
- Optimized bundle sizes
- Efficient state management
- Caching strategies for API calls

**Backend Performance:**
- Database query optimization
- Connection pooling
- Caching layers for frequent data
- Background job processing for heavy operations

---

## Deployment & Infrastructure

### Development Environment

**Local Development:**
- Docker Compose for full-stack development
- Hot reloading for frontend and backend
- Database seeding and migration scripts
- Development-specific configurations

**Testing Infrastructure:**
- Vitest for unit testing
- Integration tests for API endpoints
- E2E testing setup (planned)
- Test database isolation

### Production Deployment

**Containerized Deployment:**
- Docker containers for all services
- Multi-stage builds for optimization
- Environment-specific configurations
- Health checks and monitoring

**Scalability Considerations:**
- Horizontal scaling capabilities
- Database connection pooling
- CDN integration for static assets
- Load balancing support

### Security & Compliance

**Data Protection:**
- Encrypted data transmission (HTTPS)
- Secure credential storage
- Input validation and sanitization
- SQL injection prevention

**Access Control:**
- Role-based access control (RBAC)
- API rate limiting
- Audit logging for sensitive operations
- Session management and timeout

---

## Roadmap & Future Features

### Phase 2: Advanced AI Features

**Predictive Maintenance:**
- Machine learning models for failure prediction
- Sensor data integration
- Real-time monitoring and alerting
- Automated maintenance scheduling

**Advanced Analytics:**
- Custom dashboard creation
- Advanced reporting and export capabilities
- Trend analysis and forecasting
- Performance benchmarking

### Phase 3: Autonomous Operations

**Robotics Integration:**
- API connections to robotic maintenance systems
- Automated work order execution
- Robotic part replacement capabilities
- Safety protocol integration

**Autonomous Factory Management:**
- AI supervisors for production lines
- Automated quality control
- Predictive production optimization
- Self-healing factory systems

### Phase 4: Ecosystem Expansion

**OEM Integrations:**
- Original Equipment Manufacturer API connections
- Automated manual and documentation syncing
- Warranty and service integration
- Predictive maintenance from OEM data

**Multi-Plant Operations:**
- Multi-tenant architecture implementation
- Cross-plant analytics and insights
- Centralized management capabilities
- Regional compliance and localization

---

## Business Impact & Value Proposition

### Operational Value (Immediate)

**Efficiency Gains:**
- **50% reduction** in time to diagnose issues through AI assistance
- **30% improvement** in mean time to repair through knowledge sharing
- **90% reduction** in paperwork through digital workflows
- **Structured data** replacing spreadsheets and WhatsApp logs

**Knowledge Management:**
- **Institutional memory** of technician expertise
- **Standardized processes** across all maintenance activities
- **Quality assurance** through documented procedures
- **Training acceleration** for new technicians

### Strategic Value (Long-term)

**AI Foundation:**
- **Structured dataset** for machine learning model training
- **Knowledge graph** for complex reasoning and automation
- **API ecosystem** enabling third-party AI integrations
- **Data moat** creating competitive advantage

**Autonomous Manufacturing:**
- **Prerequisite intelligence layer** for Industry 4.0
- **Bridge to robotics and automation** integration
- **Future-proof architecture** for autonomous operations
- **Path to factory digitization** and optimization

### Economic Impact

**Cost Reduction:**
- **Predictive maintenance** reducing unplanned downtime by 30-50%
- **Optimized inventory** through usage analytics and forecasting
- **Faster training** reducing onboarding time for technicians
- **Improved OEE** (Overall Equipment Effectiveness) through better maintenance

**Revenue Opportunities:**
- **SaaS model** for subscription-based maintenance intelligence
- **OEM partnerships** for integrated maintenance solutions
- **Data licensing** for industry benchmarking and insights
- **Consulting services** for factory digital transformation

---

## Recent Changes & Updates

### December 20, 2025 - Chat Interface Improvements

**AI Chat Auto-Scroll Enhancement:**
- **Feature**: Modified chat window auto-scroll behavior to position new messages with proper padding instead of scrolling to the very bottom
- **Implementation**: Added intelligent scroll positioning that places new messages with 20% viewport padding above them, preventing content cropping
- **Technical Details**:
  - Manual scroll calculation using `getBoundingClientRect()` and container positioning
  - Added `data-message-id` attributes for DOM targeting
  - Smooth scrolling with proper context preservation
- **Files Modified**: `code/frontend/src/pages/ai/MetralisAI.tsx`

---

## Conclusion

Metralis represents the convergence of traditional CMMS functionality with cutting-edge AI capabilities, creating a platform that not only solves immediate maintenance management needs but also builds the foundational intelligence layer required for autonomous manufacturing.

The system's architecture is deliberately designed to be **AI-first**, ensuring that every feature, data structure, and API endpoint serves the dual purpose of operational value today and autonomous capabilities tomorrow.

By digitizing machine behavior, failures, manuals, and repairs into structured, machine-understandable intelligence, Metralis creates the prerequisite knowledge base that will power the next generation of autonomous factories.

This is more than a maintenance system—it's the **intelligence layer** that will enable the future of manufacturing.

---

*Last Updated: December 19, 2025*
*System Version: 1.0 - Factory Intelligence Layer Foundation*