# MOD AI Platform

MOD is building one of the first AI–human working layers: a modular ecosystem that coordinates collaboration between artificial intelligence and people so anyone, anywhere, can learn, build, share, and monetize AI-driven work. This repository contains the first release of the platform described in the [official documentation](https://mod-2.gitbook.io/mod-docs/).

## What we are building

- **AI Creation Platform** – A web application where Builders design reusable AI modules, Creators assemble intelligent digital artifacts with live previews, and (soon) Executors deploy or remix those artifacts. Every module and artifact carries authorship, version history, remix permissions, and optional on-chain anchoring to support interoperability.
- **AI Consulting Program** – A practice-based journey that helps teams and communities map their AI ambitions into concrete outputs, seeding new modules and artifacts for the ecosystem.
- **Intelligent Digital Artifacts Protocol (IDAP)** – An emerging specification that defines how artifacts, metadata, and permissions travel securely across modules, users, and third-party systems.

We are currently developing the platform MVP with emphasis on:

1. A Builder dashboard with module authoring, workflow editing, and publishing.
2. A Creator studio that exposes a module marketplace, live preview workspace, and artifact publish flow with remix/payment hooks.
3. A NestJS API, Prisma data layer, and BullMQ worker stubs to orchestrate previews and artifact lifecycle.

## Repository structure (under development)

- `apps/web` – Next.js front-end for Builder and Creator experiences.
- `apps/api` – NestJS backend exposing Builder, Creator, Executor and Marketplace endpoints plus Swagger docs.
- `apps/worker` – BullMQ worker that processes preview jobs (AI execution stub for the MVP).
- `packages/shared-config` – Shared TypeScript types and contracts for modules, artifacts, and preview events.
- `packages/database` – Prisma schema reflecting the Intelligent Digital Artifacts data model.
- `docs/` – Requirements, architecture, and API references synchronized with the GitBook documentation.