# Zeoel CLI Guide

A quick reference for all `zeoel` commands.

---

## Commands

### Framework

```bash
zeoel                     # Initialize/update framework globally
zeoel --version           # Print version
zeoel --help              # Print help
```

### Agent Commands

```bash
zeoel agent list                              # List all registered agents
zeoel agent inspect <id>                      # Show agent manifest + skills
zeoel agent run <id> "<task>"                 # Dry-run (build & preview prompt)
zeoel agent run <id> "<task>" --live          # Live execution via local CLI
zeoel agent run <id> "<task>" --live \
  --engine <claude|opencode|codex|agy> \
  -m <model> \
  --criteria "<acceptance criteria>" \
  --output <path>
```

### Sprint Commands

```bash
zeoel sprint design [N]     # Validate Sprint N planning docs exist (Phase 2 check)
zeoel sprint execute [N]    # Execute all Sprint N tasks (runs run_all_tasks.sh)
```

**Sprint N is auto-detected** from `PROJECT_BRIEF.md` → `docs/sprint-N/` if not provided.

---

## Typical Workflow

```
Phase 1 — Brainstorm
  bash .zeoel/commands/start.sh
  # fill .zeoel/answers/answers.md
  bash .zeoel/commands/submit_answers.sh

Phase 2 — Sprint Planning (AI generates files)
  # Ask AI: "Plan Sprint 1"
  zeoel sprint design 1     # ← validate all planning docs exist

Phase 3 — Execute
  zeoel sprint execute 1    # ← runs docs/sprint-1/run_all_tasks.sh

  # Or run individual tasks:
  bash docs/sprint-1/tasks/task_1.sh
  bash docs/sprint-1/tasks/task_2.sh
```

---

## How Agent Execution Works

```
Agent Registry (YAML + MD)
        │
        ▼
  Prompt Builder  →  Compiled Prompt (System + Skills + Memory)
                              │
                              ▼
                    Local CLI Tool (claude / opencode / codex / agy)
                              │
                              ▼
                    Captured Output → Session Log
```

1. **Prompt Compilation**: Resolves `agent.yml`, `SYSTEM.md`, skill `SKILL.md` files, and memory into a single Markdown prompt.
2. **Engine Selection**: Determined by `--engine` flag → `zeoel.config.json` → agent manifest preferences.
3. **Execution**: Spawns the CLI binary and pipes the prompt to `stdin`.
4. **Output Capture**: Stdout is captured and logged to `sessions/{timestamp}-{agent-id}/`.

---

## Supported Engines

| Engine     | CLI Binary    | Notes                              |
|------------|---------------|------------------------------------|
| `claude`   | `claude`      | Claude Code CLI                    |
| `opencode` | `opencode`    | OpenCode CLI                       |
| `codex`    | `codex`       | OpenAI Codex CLI                   |
| `agy`      | `agy`         | Antigravity CLI                    |
| `qwen`     | `qwen`        | QwenCode CLI                       |
| `mimo`     | `mimo`        | MimoCode CLI                       |
