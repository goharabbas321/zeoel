# Zeoel AI Agency Framework

> Read this file at the start of every session. This is a multi-agent SaaS development framework.

<HARD-GATE>
MANDATORY RULES — ZERO EXCEPTIONS:
1. NEVER write code without an approved `PROJECT_BRIEF.md`.
2. ALWAYS follow the pipeline: Brainstorm → Plan → Execute (Strict TDD) → Verify & Snapshot.
3. ALWAYS read the relevant agent's `agent.yml` and `SYSTEM.md` AND load their ⭐ skill bindings before specialized work.
4. ALWAYS create ALL mandatory documents at each phase boundary.
5. Code MUST live in `frontend/` or `backend/`. No other code directories.
6. When the user says "build X" or "create X" → Start with Phase 1 (Brainstorm). Do NOT jump to code.
7. ALWAYS run graphify (`/graphify . --wiki`) for codebase context mapping and apply `caveman` rules to cut conversational filler, saving up to 71.5x input and 75% output tokens.
</HARD-GATE>

## Framework Location

The complete Zeoel framework is at [skills/zeoel/SKILL.md](skills/zeoel/SKILL.md). **Read it now.**

## The Pipeline

| Phase | What to Read | Mandatory Deliverables | CLI |
|-------|-------------|----------------------|-----|
| **1. Brainstorm** | [skills/zeoel-brainstorm/SKILL.md](skills/zeoel-brainstorm/SKILL.md) | `PROJECT_BRIEF.md` (user approved), `docs/brainstorm/summary.md` | `bash .zeoel/commands/start.sh` |
| **2. Sprint Plan** | [skills/zeoel-sprint-planner/SKILL.md](skills/zeoel-sprint-planner/SKILL.md) | `docs/sprint-N/plan.md`, `docs/sprint-N/progress.md`, `run_all_tasks.sh` | `zeoel sprint design N` |
| **3. Execute** | [skills/zeoel-dispatch/SKILL.md](skills/zeoel-dispatch/SKILL.md) | Working code (Red-Green-Refactor TDD), `progress.md` updated | `zeoel sprint execute N` |
| **4. Verify & Snapshot** | Dispatch QA + Security + SEO agents | `docs/qa/`, `docs/security/`, `docs/sprint-N/done.md`, `.worktrees/sprint-N/` | — |

**Phase Gates**: You CANNOT enter Phase N+1 without Phase N deliverables existing as files.

## Agent Roster (33 Agents)

| Agent | File | Dispatch For | Primary Skills (⭐) |
|-------|------|-------------|---------------------|
| **Gohar** (CEO - `gohar-ceo`) | [agent.yml](agents/gohar-ceo/agent.yml) | Sprint planning, snapshots | `zeoel`, `caveman`, `graphify` |
| **Mahdi** (Designer - `mahdi-designer`) | [agent.yml](agents/mahdi-designer/agent.yml) | UX flows, accessibility | `frontend-design`, `seo` |
| **Mustafa** (Visual - `mustafa-visual`) | [agent.yml](agents/mustafa-visual/agent.yml) | 3D, GSAP, design tokens | `frontend-design`, `ui-ux-pro-max` |
| **Karar** (Frontend - `karar-frontend`) | [agent.yml](agents/karar-frontend/agent.yml) | Next.js, shadcn, TDD | `nextjs-turbopack`, `test-driven-development` |
| **Hassan** (Bootstrap - `hassan-bootstrap`) | [agent.yml](agents/hassan-bootstrap/agent.yml) | Bootstrap 5, SCSS, Dashboards | `bootstrap-patterns`, `frontend-design` |
| **Noor** (shadcn/UI - `noor-shadcn`) | [agent.yml](agents/noor-shadcn/agent.yml) | Component Variant Architecture | `shadcn-ui-patterns`, `radix-ui-primitives` |
| **Anas** (React - `anas-react`) | [agent.yml](agents/anas-react/agent.yml) | Pure React/Vite SPAs, Zustand | `vite-patterns`, `frontend-design`, `caveman`, `graphify` |
| **Amina** (Vue/Nuxt - `amina-vue`) | [agent.yml](agents/amina-vue/agent.yml) | Vue 3, Nuxt 4, Pinia, SSR | `vue3-composition-patterns`, `nuxt4-patterns` |
| **Hasan** (CSS Craftsman - `hasan-css`) | [agent.yml](agents/hasan-css/agent.yml) | Container queries, Transitions | `css-container-queries`, `tailwindcss-v4` |
| **Tariq** (Backend - `tariq-backend`) | [agent.yml](agents/tariq-backend/agent.yml) | Laravel, PostgreSQL, APIs | `laravel-patterns`, `test-driven-development` |
| **Zara** (SEO - `zara-content`) | [agent.yml](agents/zara-content/agent.yml) | Technical SEO, JSON-LD | `seo`, `seo-growth` |
| **Abdullah** (Mobile - `abdullah-mobile`) | [agent.yml](agents/abdullah-mobile/agent.yml) | Flutter, Material 3 | `dart-flutter-patterns` |
| **Zayd** (React Native - `zayd-react-native`) | [agent.yml](agents/zayd-react-native/agent.yml) | React Native, Expo | `react-native-best-practices` |
| **Fatima** (Data - `fatima-data`) | [agent.yml](agents/fatima-data/agent.yml) | Analytics, ML | `postgres-patterns`, `python-patterns` |
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
| **Ibrahim** (AI Architect - `ibrahim-ai`)| [agent.yml](agents/ibrahim-ai/agent.yml) | MCP, Multi-agent | `mcp-patterns`, `self-evolution` |
| **Yusuf** (Java - `yusuf-java`) | [agent.yml](agents/yusuf-java/agent.yml) | Spring Boot, Quarkus | `java-patterns` |
| **Khadija** (Healthcare - `khadija-healthcare`)| [agent.yml](agents/khadija-healthcare/agent.yml)| HIPAA, FHIR | `healthcare-compliance` |
| **Maryam** (Business - `maryam-ops`) | [agent.yml](agents/maryam-ops/agent.yml) | SaaS Ops, Metrics | `saas-ops` |
| **Zainab** (Product Manager - `zainab-pm`) | [agent.yml](agents/zainab-pm/agent.yml) | Sprints, Agile Backlog | `project-flow-ops`, `product-lens` |

All agent files are in [agents/](agents/).

## Sub-Agent Dispatch Protocol (Mandatory)

When executing ANY specialized task, follow this EXACT protocol:

```
1. READ     → agents/[agent-id]/SYSTEM.md and agent.yml
2. LOAD     → Their ⭐ skill SKILL.md files from skills/ (including caveman & graphify)
3. QUERY    → Run '/graphify query "[domain]"' or check 'graphify-out/wiki/' for targeted context (71.5x input saving)
4. ANNOUNCE → "I am acting as [Name] ([Role]). Skills: [list ⭐ skills]. Task: [description]" (caveman concise style)
5. EXECUTE  → Using ONLY their bound skills via Strict TDD. Follow caveman output rules (~75% output saving).
6. TRACK    → Update docs/sprint-N/progress.md after the task
7. VERIFY   → Prove the tests pass.
8. DROP     → "Returning to Gohar (CEO)."
```

### Claude Code / Antigravity Sub-Agent Pattern

Claude Code and Antigravity support sub-agents natively. Dispatch using the Task tool:
```
Task: Read agents/karar-frontend/SYSTEM.md and agent.yml.
Load skills: nextjs-turbopack, test-driven-development.
Build the pricing page for Sprint 2 using Strict TDD.
Reference PROJECT_BRIEF.md for requirements.
Context: [provide relevant files and constraints]
```
