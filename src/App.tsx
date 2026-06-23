import { useMemo, useState } from 'react';
import {
  Activity,
  Bot,
  ChevronsRight,
  Command,
  ExternalLink,
  FolderOpen,
  Gauge,
  Home,
  Orbit,
  Play,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react';
import { seedProjects } from './data/seedProjects';
import type { AgentProject, LaunchAction } from './types';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [consoleLines, setConsoleLines] = useState<string[]>([
    'Agent FORCE systems online.',
    'Project Launch Bay loaded.',
    'Select an agent project to enter its cockpit.'
  ]);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return seedProjects;

    return seedProjects.filter((project) => {
      const haystack = [
        project.name,
        project.callsign,
        project.category,
        project.objective,
        project.status,
        project.priority,
        ...project.tags,
        ...project.agents.flatMap((agent) => [agent.name, agent.callsign, agent.origin, agent.role, ...agent.tags])
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [query]);

  const selectedProject = seedProjects.find((project) => project.id === selectedProjectId) ?? null;

  async function handleLaunch(action: LaunchAction) {
    setConsoleLines((lines) => [`Launch requested: ${action.label}`, ...lines].slice(0, 8));

    if (!window.agentForce) {
      window.open(action.target, '_blank', 'noopener,noreferrer');
      setConsoleLines((lines) => [`Browser fallback used for: ${action.label}`, ...lines].slice(0, 8));
      return;
    }

    const launcher = {
      url: window.agentForce.openExternal,
      path: window.agentForce.revealPath,
      command: window.agentForce.runCommand
    }[action.type];

    const result = await launcher(action.target);
    setConsoleLines((lines) => [
      result.ok ? `Launch success: ${action.label}` : `Launch blocked: ${result.error ?? action.label}`,
      ...lines
    ].slice(0, 8));
  }

  return (
    <main className="app-shell">
      <div className="stars" />
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
      <div className="grid-horizon" />

      <header className="top-command-bar glass-panel">
        <button className="brand-lockup" onClick={() => setSelectedProjectId(null)} aria-label="Return to Project Launch Bay">
          <span className="brand-mark"><Orbit size={26} /></span>
          <span>
            <strong>Agent FORCE</strong>
            <small>Multi-Project Agent Launch Station</small>
          </span>
        </button>

        <div className="status-strip">
          <span><Activity size={15} /> {seedProjects.length} Projects</span>
          <span><Bot size={15} /> {seedProjects.reduce((total, project) => total + project.agents.length, 0)} Agents</span>
          <span><ShieldCheck size={15} /> Command Gate Safe</span>
        </div>
      </header>

      {selectedProject ? (
        <ProjectCockpit
          project={selectedProject}
          onBack={() => setSelectedProjectId(null)}
          onSwitchProject={setSelectedProjectId}
          onLaunch={handleLaunch}
          consoleLines={consoleLines}
        />
      ) : (
        <ProjectLaunchBay
          query={query}
          setQuery={setQuery}
          projects={filteredProjects}
          onSelect={setSelectedProjectId}
        />
      )}
    </main>
  );
}

interface ProjectLaunchBayProps {
  query: string;
  setQuery: (query: string) => void;
  projects: AgentProject[];
  onSelect: (projectId: string) => void;
}

function ProjectLaunchBay({ query, setQuery, projects, onSelect }: ProjectLaunchBayProps) {
  return (
    <section className="launch-bay page-stage">
      <div className="hero-panel glass-panel holo-border">
        <div className="eyebrow"><Sparkles size={16} /> Project Launch Bay</div>
        <h1>Choose your agent project.</h1>
        <p>
          Operate every Codex, Claude Code, hybrid, and local agent from one desktop command hub. Each project gets its own cockpit, agents, launch actions, readiness telemetry, and mission plan.
        </p>
        <div className="search-console">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, agents, tags, missions..."
            aria-label="Search agent projects"
          />
        </div>
      </div>

      <div className="project-grid" aria-label="Agent projects">
        {projects.map((project) => (
          <button key={project.id} className={`project-card project-${project.accent}`} onClick={() => onSelect(project.id)}>
            <div className="project-card-inner">
              <div className="project-card-topline">
                <span className="callsign">{project.callsign}</span>
                <span className={`status-pill status-${project.status.toLowerCase().replaceAll(' ', '-')}`}>{project.status}</span>
              </div>
              <h2>{project.name}</h2>
              <p>{project.objective}</p>
              <div className="telemetry-row">
                <Metric label="Ready" value={project.telemetry.readiness} />
                <Metric label="Auto" value={project.telemetry.automation} />
                <Metric label="Cover" value={project.telemetry.coverage} />
              </div>
              <div className="tag-cloud">
                {project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="project-card-footer">
                <span>{project.agents.length} agent{project.agents.length === 1 ? '' : 's'}</span>
                <span className="enter-link">Enter cockpit <ChevronsRight size={16} /></span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

interface ProjectCockpitProps {
  project: AgentProject;
  onBack: () => void;
  onSwitchProject: (projectId: string) => void;
  onLaunch: (action: LaunchAction) => void;
  consoleLines: string[];
}

function ProjectCockpit({ project, onBack, onSwitchProject, onLaunch, consoleLines }: ProjectCockpitProps) {
  return (
    <section className="cockpit page-stage">
      <aside className="side-rail glass-panel">
        <button className="rail-home" onClick={onBack}><Home size={16} /> Launch Bay</button>
        <div className="rail-title">Project Fleet</div>
        {seedProjects.map((item) => (
          <button
            key={item.id}
            className={`rail-project ${item.id === project.id ? 'active' : ''}`}
            onClick={() => onSwitchProject(item.id)}
          >
            <span>{item.callsign}</span>
            <small>{item.name}</small>
          </button>
        ))}
      </aside>

      <div className="cockpit-main">
        <section className={`mission-hero glass-panel holo-border project-${project.accent}`}>
          <div>
            <div className="eyebrow"><Radar size={16} /> {project.category} / {project.priority} Priority</div>
            <h1>{project.name}</h1>
            <p>{project.missionBrief}</p>
          </div>
          <div className="orbital-meter" aria-label={`Readiness ${project.telemetry.readiness}%`}>
            <span>{project.telemetry.readiness}%</span>
            <small>Ready</small>
          </div>
        </section>

        <section className="cockpit-grid">
          <div className="glass-panel command-card">
            <h2><Zap size={18} /> Launch Actions</h2>
            {project.launchActions.length ? (
              <div className="launch-actions">
                {project.launchActions.map((action) => (
                  <button key={action.id} onClick={() => onLaunch(action)}>
                    {action.type === 'url' && <ExternalLink size={17} />}
                    {action.type === 'path' && <FolderOpen size={17} />}
                    {action.type === 'command' && <Terminal size={17} />}
                    <span>
                      <strong>{action.label}</strong>
                      <small>{action.description}</small>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="empty-state">No launch actions configured yet. Add URLs, local folders, or gated commands to this project registry.</p>
            )}
          </div>

          <div className="glass-panel command-card">
            <h2><Gauge size={18} /> Project Telemetry</h2>
            <Telemetry label="Readiness" value={project.telemetry.readiness} />
            <Telemetry label="Automation" value={project.telemetry.automation} />
            <Telemetry label="Risk" value={project.telemetry.risk} inverse />
            <Telemetry label="Coverage" value={project.telemetry.coverage} />
          </div>
        </section>

        <section className="agent-deck">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><Command size={15} /> Agent Deck</div>
              <h2>{project.callsign} units</h2>
            </div>
            <span>{project.agents.length} active definitions</span>
          </div>
          <div className="agent-grid">
            {project.agents.map((agent) => (
              <article key={agent.id} className="agent-card glass-panel">
                <div className="agent-card-topline">
                  <span className="callsign">{agent.callsign}</span>
                  <span>{agent.origin}</span>
                </div>
                <h3>{agent.name}</h3>
                <strong>{agent.role}</strong>
                <p>{agent.description}</p>
                <div className="tag-cloud">
                  {agent.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <button className="ghost-launch"><Play size={15} /> Configure launch actions</button>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="right-console glass-panel">
        <h2><Terminal size={18} /> Mission Console</h2>
        <div className="console-feed">
          {consoleLines.map((line, index) => <code key={`${line}-${index}`}>{line}</code>)}
        </div>
        <h3>Next Actions</h3>
        <ol>
          {project.nextActions.map((action) => <li key={action}>{action}</li>)}
        </ol>
      </aside>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <span className="metric-chip">
      <strong>{value}</strong>
      <small>{label}</small>
    </span>
  );
}

function Telemetry({ label, value, inverse = false }: { label: string; value: number; inverse?: boolean }) {
  const display = inverse ? 100 - value : value;
  return (
    <div className="telemetry-bar">
      <div className="telemetry-label"><span>{label}</span><strong>{value}%</strong></div>
      <div className="bar-track"><span style={{ width: `${display}%` }} /></div>
    </div>
  );
}

export default App;
