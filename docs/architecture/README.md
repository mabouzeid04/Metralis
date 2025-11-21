# Architecture

## Purpose

Define the technical system: data models, pipelines, AI components, ingestion logic, and system interactions.

## Files & Their Purpose

### system-architecture.md

High-level diagram of the system: frontend, backend, databases, AI layers, pipelines.

### data-model.md

Schemas for machines, failures, repairs, symptoms, parts, users, events, and causal links.

### ai-diagnostics-architecture.md

How the AI reasons: context inputs, retrieval, inference, similarity search, chain-of-thought patterns.

### manual-ingestion.md

How PDFs, manuals, SOPs, troubleshooting trees, and OEM documentation are extracted and structured.

### knowledge-graph.md

Architecture for linking machine events, repairs, symptoms, and manual content into a usable graph.

### rag-pipeline.md

Full specification for retrieval-augmented generation: embedding, chunking, vector stores, ranking.

### embedding-strategy.md

What gets embedded, with what granularity, and how embeddings are updated over time.

### api-design.md

Endpoints for logging issues, querying AI, viewing machine profiles, uploading manuals, etc.

