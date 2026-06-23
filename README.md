# Agent FORCE Dashboard

**Agent FORCE Dashboard** is a desktop launch station for every agent project, workflow, repo, Codex build, Claude Code build, local command, and operating playbook you want to control from one immersive hub.

The app opens on a **Choose Your Agent Project** home screen. Each project is its own command theater with its own agents, launch links, local workspace paths, commands, telemetry, notes, and status. The **Richard Job Search Agent** is included only as the first sample project; the infrastructure is built to support many project agents.

The visual system is a cinematic galactic command-center experience: holographic panels, starfield depth, 3D launch cards, mission-readiness indicators, and cockpit-style project controls. It does **not** use licensed Star Wars logos, imagery, characters, or assets.

## Core UX

1. **Project Launch Bay** — choose the agent project you want to operate.
2. **Project Cockpit** — view that project’s mission, agents, launch actions, workspace links, command queue, and readiness status.
3. **Agent Deck** — manage multiple agents under each project, including Codex, Claude Code, hybrid, local, and manual agents.
4. **Launch Console** — open URLs, reveal local paths, or run approved commands from the desktop app.
5. **Scalable registry model** — seed data is local and typed, with a clean path toward persistence, sync, and project templates.

## Tech stack

- Electron
- React
- TypeScript
- Vite
- CSS-only immersive 3D UI system

## Local setup

```bash
npm install
npm run electron:dev
```

## Production build

```bash
npm run build
npm run desktop:preview
```

To create packaged desktop installers:

```bash
npm run dist
```

## Command launch safety

URL and file/folder launches work by default. Shell command launching is disabled unless you explicitly opt in:

```bash
AGENT_FORCE_ALLOW_COMMANDS=true npm run electron:dev
```

On Windows PowerShell:

```powershell
$env:AGENT_FORCE_ALLOW_COMMANDS="true"; npm run electron:dev
```

## Registry model

The first version stores project and agent definitions in a typed seed registry. The UI is intentionally structured so the registry can later move to encrypted local persistence, GitHub-backed sync, or a user-editable JSON database.

## Recommended next evolution

1. Add encrypted local persistence for project and agent records.
2. Add project creation/editing directly from the UI.
3. Add automatic agent discovery from selected workspace folders.
4. Add health checks for repo, local path, command availability, and API credentials.
5. Add deep links to Codex, Claude, GitHub PRs, deployment dashboards, logs, and runbooks.
6. Add project templates: Job Search, Portfolio, Website QA, Legal Ops, Product Launch, Research, and Security.
