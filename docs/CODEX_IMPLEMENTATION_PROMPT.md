# Codex Implementation Prompt — Agent FORCE Dashboard

You are working in the repository `caliendohomes-rgb/Agent.FORCE.Dashboard`.

## Objective

Build and refine **Agent FORCE Dashboard**, a desktop app that acts as a multi-project launch station for all agent projects built with Codex, Claude Code, hybrid workflows, local scripts, and manual operating playbooks.

The app must open on a **Choose Your Agent Project** home screen. Do not design the product around one agent. The **Richard Job Search Agent** is only the first sample project. The infrastructure must support many project agents, each with its own cockpit, sub-agents, launch actions, telemetry, project notes, local paths, repo links, and operating status.

## Product architecture

### 1. Project Launch Bay

The default home screen must be a premium, immersive project selector with:

- Large heading: `Choose your agent project.`
- Search across projects, agents, tags, status, and mission text.
- 3D project cards.
- Visible status, priority, callsign, readiness, automation, coverage, and agent count.
- Clear entry action to open that project cockpit.

### 2. Project Cockpit

When a project is selected, show a project-specific command center with:

- Project mission brief.
- Project readiness meter.
- Launch actions for URLs, local paths, and gated commands.
- Agent cards for that project only.
- Project telemetry.
- Mission console activity feed.
- Next-action list.
- Side rail for switching projects.
- Return-to-launch-bay control.

### 3. Agent Deck

Each project can contain many agents. Each agent definition should support:

- Name.
- Callsign.
- Origin: Codex, Claude Code, Hybrid, Local, or Manual.
- Role.
- Status.
- Description.
- Tags.
- Launch actions.

### 4. Launch safety

Desktop launching must remain safe by default:

- URL launching may allow only `https`, `http`, and `mailto`.
- Path reveal should fail gracefully when no path is configured.
- Shell command launching must be disabled unless `AGENT_FORCE_ALLOW_COMMANDS=true` is set.
- Never silently enable external command execution.

## UX/UI direction

Create a cinematic sci-fi command-center experience inspired by galactic launch stations and holographic control rooms. Do not use licensed Star Wars imagery, logos, characters, names, or assets.

Design qualities:

- Premium and expert-level.
- Immersive but readable.
- 3D project cards.
- Holographic borders.
- Starfield depth.
- Cockpit/grid console feel.
- Strong typography hierarchy.
- High contrast.
- Responsive enough for common desktop widths.
- Desktop-first, not mobile-first.

## Current implementation

The initial scaffold uses:

- Electron
- React
- TypeScript
- Vite
- CSS-only immersive UI
- Typed seed project registry in `src/data/seedProjects.ts`

## Required next development steps

1. Run `npm install`.
2. Run `npm run typecheck` and fix all TypeScript issues.
3. Run `npm run electron:dev` and verify the app opens on Project Launch Bay.
4. Verify clicking each project opens the correct Project Cockpit.
5. Verify project switching from the side rail.
6. Verify URL launch actions.
7. Verify command launch actions are blocked by default.
8. Add an editable project registry UI:
   - create project
   - edit project
   - delete/archive project
   - add agent
   - edit agent
   - add launch action
   - import/export JSON
9. Add local persistence:
   - start with localStorage or local JSON
   - later upgrade to encrypted SQLite
10. Add project templates:
   - Job Search Agent Project
   - Portfolio/Resume QA Project
   - Website QA Project
   - SaaS Launch Project
   - Legal Ops Project
   - Research Agent Project
   - Security Review Project
11. Add automated tests once the UI structure stabilizes.

## Acceptance criteria

The project is acceptable when:

- The default app home is clearly `Choose your agent project`.
- Richard Job Search Agent is represented as one sample project, not the app itself.
- The registry model can support many project agents.
- UI feels like a polished immersive desktop command station.
- The app can be launched locally with `npm run electron:dev`.
- Build scripts are coherent and documented.
- Command launching remains explicitly gated.
