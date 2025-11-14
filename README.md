# MOD AI Platform UI

MOD is building one of the first AI–human working layers: a modular ecosystem that coordinates collaboration between artificial intelligence and people so anyone, anywhere, can learn, build, share, and monetize AI-driven work. This repository houses the React/Vite implementation of the MOD Platform user interface and interactive prototypes that back the experience described in the [official documentation](https://mod-2.gitbook.io/mod-docs/) and the [Figma source project](https://www.figma.com/design/Fhd99kd4PiK1RIFLzfb7hC/MOD-Platform-UI-Design).

## Current Focus

- **Builder experience** – Author reusable AI modules, configure workflows, publish updates, and trace provenance.
- **Creator studio** – Explore marketplace modules, assemble intelligent artifacts with live previews, and prepare them for distribution.
- **Intelligent Digital Artifacts Protocol (IDAP)** – Surface artifact metadata, permissions, and lifecycle states directly in the UI.

This codebase captures the design system, layouts, and interaction flows that will converge with the in-progress API, worker, and data services powering the broader MOD platform.

## Getting Started

- **Prerequisites** – Node.js 20+ and npm 10 (or a compatible package manager such as pnpm).
- **Install** – `npm install`
- **Develop** – `npm run dev` then open the printed local URL.
- **Build** – `npm run build`

## Project Structure

- `index.html` – Vite bootstrap entry point.
- `src/main.tsx` – React root and providers.
- `src/App.tsx` – Top-level layout wired to feature modules.
- `src/components/` – UI building blocks for Builder, Creator, and shared flows.
- `src/components/ui/` – Reusable primitives adapted from Radix UI.
- `src/styles/` – Global styles and tokens aligned with the design system.
- `src/guidelines/` – Design guidelines and usage notes for key components.

## Design & Collaboration

- **Figma source** – Track canonical visuals and handoff specs in the [MOD Platform UI Design file](https://www.figma.com/design/Fhd99kd4PiK1RIFLzfb7hC/MOD-Platform-UI-Design).
- **Design tokens** – Colors, typography, effects, and spacing are codified in `src/styles/globals.css` and mirrored in the Figma library.
- **Feedback** – File issues or start discussions in this repo to document design or interaction gaps as we integrate with backend services.

## Roadmap Snapshot

- Hook UI modules into the NestJS/Prisma API surface for live artifact data.
- Expand preview orchestration flows to connect with BullMQ worker jobs.
- Harden authentication, permissions, and remix/payment hooks for release.
- Publish documentation and integration samples through the MOD knowledge base.