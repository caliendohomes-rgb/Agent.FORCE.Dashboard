export type AgentOrigin = 'Codex' | 'Claude Code' | 'Hybrid' | 'Local' | 'Manual';

export type ProjectStatus = 'Ready' | 'Planning' | 'Building' | 'Needs QA' | 'Paused';

export type LaunchActionType = 'url' | 'path' | 'command';

export interface LaunchAction {
  id: string;
  label: string;
  type: LaunchActionType;
  target: string;
  description: string;
  safetyNote?: string;
}

export interface AgentUnit {
  id: string;
  name: string;
  callsign: string;
  origin: AgentOrigin;
  role: string;
  status: ProjectStatus;
  description: string;
  tags: string[];
  launchActions: LaunchAction[];
}

export interface AgentProject {
  id: string;
  name: string;
  callsign: string;
  category: string;
  status: ProjectStatus;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  objective: string;
  missionBrief: string;
  repoUrl?: string;
  localPath?: string;
  accent: string;
  telemetry: {
    readiness: number;
    automation: number;
    risk: number;
    coverage: number;
  };
  tags: string[];
  agents: AgentUnit[];
  launchActions: LaunchAction[];
  nextActions: string[];
}

declare global {
  interface Window {
    agentForce?: {
      openExternal: (target: string) => Promise<{ ok: boolean; error?: string }>;
      revealPath: (target: string) => Promise<{ ok: boolean; error?: string }>;
      runCommand: (command: string) => Promise<{ ok: boolean; output?: string; error?: string }>;
      getPlatform: () => Promise<string>;
    };
  }
}
