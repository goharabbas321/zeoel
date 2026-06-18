# Agents

This project uses the **Zeoel AI Agency** — a multi-agent orchestration framework for SaaS development.

<HARD-GATE>
MANDATORY WORKFLOW — NO EXCEPTIONS:
1. When the user says "build X", "create X", or describes ANY project → Start with Phase 1 (Brainstorm). Do NOT write code.
2. You MUST follow the 4-phase pipeline: Brainstorm → Plan → Execute (Strict TDD) → Verify & Snapshot.
3. Code MUST live in `frontend/` or `backend/`. No other code directories.
4. You MUST dispatch sub-agents with their skill bindings loaded for ALL specialized work.
5. You MUST create ALL mandatory documents at each phase boundary.
</HARD-GATE>

## Framework

Read the full framework FIRST: [skills/zeoel/SKILL.md](skills/zeoel/SKILL.md)

## The Pipeline

| Phase | Skill to Read | Deliverables | CLI |
|-------|--------------|-------------|-----|
| 1. Brainstorm | [skills/zeoel-brainstorm/SKILL.md](skills/zeoel-brainstorm/SKILL.md) | `PROJECT_BRIEF.md`, `docs/brainstorm/summary.md` | `bash .zeoel/commands/start.sh` |
| 2. Sprint Plan | [skills/zeoel-sprint-planner/SKILL.md](skills/zeoel-sprint-planner/SKILL.md) | `docs/sprint-N/plan.md`, `docs/sprint-N/progress.md`, `run_all_tasks.sh` | `zeoel sprint design N` |
| 3. Execute | [skills/zeoel-dispatch/SKILL.md](skills/zeoel-dispatch/SKILL.md) | Working code via Red-Green-Refactor TDD | `zeoel sprint execute N` |
| 4. Verify & Snapshot| Dispatch QA + Security + SEO | `done.md`, and `.worktrees/sprint-N/` snapshot | — |

## Agents (33)

All agent definitions are in [agents/](agents):

| Agent | File | When to Dispatch | Primary Skills (⭐) |
|-------|------|-----------------|---------------------|
| **Gohar** (CEO - `gohar-ceo`) | [agent.yml](agents/gohar-ceo/agent.yml) | Sprint planning, snapshots | `zeoel`, `caveman`, `graphify` |
| **Mahdi** (Designer - `mahdi-designer`) | [agent.yml](agents/mahdi-designer/agent.yml) | UX flows, accessibility | `frontend-design`, `seo` |
| **Mustafa** (Visual - `mustafa-visual`) | [agent.yml](agents/mustafa-visual/agent.yml) | Three.js, GSAP, design tokens | `frontend-design`, `ui-ux-pro-max`, `threejs-webgl` |
| **Karar** (Frontend - `karar-frontend`) | [agent.yml](agents/karar-frontend/agent.yml) | Next.js, shadcn/ui, TDD | `nextjs-turbopack`, `test-driven-development` |
| **Hassan** (Bootstrap - `hassan-bootstrap`) | [agent.yml](agents/hassan-bootstrap/agent.yml) | Bootstrap 5, SCSS, dashboards | `bootstrap-patterns`, `frontend-design` |
| **Noor** (shadcn/UI - `noor-shadcn`) | [agent.yml](agents/noor-shadcn/agent.yml) | shadcn/ui components, Radix | `shadcn-ui-patterns`, `radix-ui-primitives` |
| **Anas** (React - `anas-react`) | [agent.yml](agents/anas-react/agent.yml) | Pure React/Vite SPAs, Zustand | `vite-patterns`, `frontend-design`, `caveman`, `graphify` |
| **Amina** (Vue/Nuxt - `amina-vue`) | [agent.yml](agents/amina-vue/agent.yml) | Vue 3, Nuxt 4, Pinia, SSR | `vue3-composition-patterns`, `nuxt4-patterns` |
| **Hasan** (CSS Craftsman - `hasan-css`) | [agent.yml](agents/hasan-css/agent.yml) | CSS Grid, Container queries | `css-container-queries`, `tailwindcss-v4` |
| **Tariq** (Backend - `tariq-backend`) | [agent.yml](agents/tariq-backend/agent.yml) | Laravel, PostgreSQL, APIs | `laravel-patterns`, `test-driven-development` |
| **Zara** (SEO - `zara-content`) | [agent.yml](agents/zara-content/agent.yml) | Technical SEO, JSON-LD | `seo`, `seo-growth` |
| **Abdullah** (Mobile - `abdullah-mobile`) | [agent.yml](agents/abdullah-mobile/agent.yml) | Flutter, Material 3 | `dart-flutter-patterns` |
| **Zayd** (React Native - `zayd-react-native`) | [agent.yml](agents/zayd-react-native/agent.yml) | React Native, Expo | `react-native-best-practices` |
| **Fatima** (Data - `fatima-data`) | [agent.yml](agents/fatima-data/agent.yml) | Postgres analytics, ML | `postgres-patterns`, `python-patterns` |
| **Abbas** (Python - `abbas-python`) | [agent.yml](agents/abbas-python/agent.yml) | Python, Django, FastAPI | `python-patterns`, `test-driven-development` |
| **Bilal** (Systems - `bilal-systems`) | [agent.yml](agents/bilal-systems/agent.yml) | Go, Rust, C++ | `go-patterns` |
| **Layla** (iOS - `layla-ios`) | [agent.yml](agents/layla-ios/agent.yml) | SwiftUI, Swift | `swift-patterns` |
| **Hamza** (Android - `hamza-android`) | [agent.yml](agents/hamza-android/agent.yml) | Kotlin, Jetpack Compose | `kotlin-patterns` |
| **Salman** (Web3 - `salman-web3`) | [agent.yml](agents/salman-web3/agent.yml) | Smart Contracts, DeFi | `solidity-patterns`, `trailofbits-auditing` |
| **Hamid** (Security - `hamid-security`) | [agent.yml](agents/hamid-security/agent.yml) | Red Team & Penetration Auditor | `claude-red`, `trailofbits-auditing` |
| **Farhan** (Growth - `farhan-marketing`) | [agent.yml](agents/farhan-marketing/agent.yml) | Funnel CRO & Performance Marketer | `growth-marketing`, `seo-growth` |
| **Taha** (Slides - `taha-presentation`) | [agent.yml](agents/taha-presentation/agent.yml) | McKinsey PPT & Pitch Designer | `ppt-mckinsey`, `ckm:slides` |
| **Sami** (Spatial - `sami-computational`) | [agent.yml](agents/sami-computational/agent.yml) | Parametric GIS Spatial Designer | `computational-architecture`, `postgres-patterns` |
| **Yahya** (PhD - `yahya-researcher`) | [agent.yml](agents/yahya-researcher/agent.yml) | Literature Synthesis & PhD Science | `empirical-research`, `deep-research` |
| **Sajjad** (Debugger - `sajjad-debugger`) | [agent.yml](agents/sajjad-debugger/agent.yml) | Root cause analysis | `systematic-debugging`, `error-handling` |
| **Baqir** (Docs - `baqir-docs`) | [agent.yml](agents/baqir-docs/agent.yml) | Technical writing, OpenAPI | `zeoel-codebase-knowledge`, `api-design` |
| **Muhammad** (QA - `muhammad-qa`) | [agent.yml](agents/muhammad-qa/agent.yml) | E2E testing, quality gates | `e2e-testing`, `test-driven-development` |
| **Ali** (DevOps - `ali-devops`) | [agent.yml](agents/ali-devops/agent.yml) | CI/CD, Docker, Security | `deployment-patterns` |
| **Ibrahim** (AI Architect - `ibrahim-ai`)| [agent.yml](agents/ibrahim-ai/agent.yml) | MCP, multi-agent frameworks | `mcp-patterns`, `self-evolution` |
| **Yusuf** (Java - `yusuf-java`) | [agent.yml](agents/yusuf-java/agent.yml) | Spring Boot, Quarkus | `java-patterns` |
| **Khadija** (Healthcare - `khadija-healthcare`)| [agent.yml](agents/khadija-healthcare/agent.yml)| HIPAA, FHIR | `healthcare-compliance` |
| **Maryam** (Business - `maryam-ops`) | [agent.yml](agents/maryam-ops/agent.yml) | SaaS Ops, Metrics | `saas-ops` |
| **Zainab** (Product Manager - `zainab-pm`) | [agent.yml](agents/zainab-pm/agent.yml) | Agile sprints, backlogs | `project-flow-ops`, `product-lens` |


## Sub-Agent Dispatch Protocol

When executing ANY specialized task, you MUST:
1. **Read** the agent's `agent.yml` and `SYSTEM.md` file from `agents/[agent-id]/`
2. **Load** their ⭐ skill `SKILL.md` files from `skills/`
3. **Announce** the dispatch: "I am now acting as [Name] ([Role]). Skills: [list]"
4. **Execute** using ONLY their bound skills. Enforce Strict TDD!
5. **Track** progress in `docs/sprint-N/progress.md` after every task.
6. **Verify** you actually ran the tests before completing the task.
7. **Drop** the persona: "Returning to Gohar (CEO)"


<claude-mem-context>
# Memory Context

# claude-mem status

This project has no memory yet. The current session will seed it; subsequent sessions will receive auto-injected context for relevant past work.

Memory injection starts on your second session in a project.

`/learn-codebase` is available if the user wants to front-load the entire repo into memory in a single pass (~5 minutes on a typical repo, optional). Otherwise memory builds passively as work happens.

Live activity: http://localhost:37701
How it works: `/how-it-works`

This message disappears once the first observation lands.
</claude-mem-context>