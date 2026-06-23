import type { AgentProject } from '../types';

export const seedProjects: AgentProject[] = [
  {
    id: 'richard-job-search',
    name: 'Richard Job Search Agent',
    callsign: 'JEDI CAREER OPS',
    category: 'Career Automation',
    status: 'Building',
    priority: 'Critical',
    objective:
      'Coordinate job-search intelligence, portfolio-based matching, application preparation, and outreach workflows for Richard.',
    missionBrief:
      'This is one project agent inside the broader Agent FORCE launch station. It should never define the app architecture by itself; it is a sample cockpit for career-focused agents and future job-application workflows.',
    repoUrl: 'https://github.com/caliendohomes-rgb/Agent.FORCE.Dashboard',
    localPath: '',
    accent: 'cyan',
    telemetry: {
      readiness: 68,
      automation: 62,
      risk: 34,
      coverage: 72
    },
    tags: ['Job Search', 'Portfolio', 'Resume', 'Remote Roles', 'Codex', 'Claude Code'],
    launchActions: [
      {
        id: 'portfolio',
        label: 'Open Portfolio',
        type: 'url',
        target: 'https://richardecaliendo.com/',
        description: 'Launch the portfolio used as the source of truth for career positioning.'
      },
      {
        id: 'repo',
        label: 'Open Dashboard Repo',
        type: 'url',
        target: 'https://github.com/caliendohomes-rgb/Agent.FORCE.Dashboard',
        description: 'Open the Agent FORCE Dashboard repository.'
      }
    ],
    nextActions: [
      'Add project-specific application queue schema.',
      'Add resume and portfolio source-of-truth validation panel.',
      'Add guardrails for compensation, remote status, location radius, and company exclusions.',
      'Add human-review checkpoint before any external job application submission.'
    ],
    agents: [
      {
        id: 'career-intel-scout',
        name: 'Career Intel Scout',
        callsign: 'SCOUT-180',
        origin: 'Hybrid',
        role: 'Role discovery, filtering, and fit scoring',
        status: 'Planning',
        description:
          'Identifies opportunities that appear aligned with portfolio, resume, compensation, location, and experience constraints.',
        tags: ['Discovery', 'Fit Score', 'Remote', '$180K+'],
        launchActions: []
      },
      {
        id: 'application-builder',
        name: 'Application Builder',
        callsign: 'APPLY-1',
        origin: 'Claude Code',
        role: 'Application packet preparation',
        status: 'Planning',
        description:
          'Prepares tailored summaries, role notes, outreach drafts, and application materials from approved source content.',
        tags: ['Resume', 'Portfolio', 'Cover Notes'],
        launchActions: []
      },
      {
        id: 'outreach-navigator',
        name: 'Outreach Navigator',
        callsign: 'LINK-OPS',
        origin: 'Codex',
        role: 'Networking and contact workflow support',
        status: 'Planning',
        description:
          'Maintains outreach prompts, contact notes, and follow-up workflows connected to target companies and roles.',
        tags: ['LinkedIn', 'Networking', 'Follow-up'],
        launchActions: []
      }
    ]
  },
  {
    id: 'portfolio-command-center',
    name: 'Portfolio Command Center',
    callsign: 'HOLO-PORTFOLIO',
    category: 'Personal Brand',
    status: 'Ready',
    priority: 'High',
    objective:
      'Operate portfolio website QA, content hierarchy, readability, resume alignment, and conversion optimization.',
    missionBrief:
      'Dedicated project cockpit for the portfolio website and resume experience, separate from the job-search application agents.',
    repoUrl: 'https://richardecaliendo.com/',
    accent: 'violet',
    telemetry: {
      readiness: 82,
      automation: 58,
      risk: 21,
      coverage: 76
    },
    tags: ['Portfolio', 'Resume', 'UX', 'Readability', 'SEO'],
    launchActions: [
      {
        id: 'site',
        label: 'Open Portfolio Site',
        type: 'url',
        target: 'https://richardecaliendo.com/',
        description: 'Open the live portfolio website.'
      }
    ],
    nextActions: [
      'Add resume two-page QA checklist.',
      'Add website readability and negative-space audit panel.',
      'Track before/after UX issues by route.'
    ],
    agents: [
      {
        id: 'ux-readability-sentinel',
        name: 'UX Readability Sentinel',
        callsign: 'READ-7',
        origin: 'Claude Code',
        role: 'Readability and layout QA',
        status: 'Ready',
        description:
          'Audits spacing, font scale, visual hierarchy, mobile responsiveness, and recruiter scanability.',
        tags: ['UX', 'Typography', 'QA'],
        launchActions: []
      }
    ]
  },
  {
    id: 'standardcraft-build-swarm',
    name: 'StandardCraft Build Swarm',
    callsign: 'EDU-FORGE',
    category: 'SaaS Product Build',
    status: 'Building',
    priority: 'High',
    objective:
      'Coordinate StandardCraft website, resource library, auth, credits, Stripe, QA, and launch-readiness agents.',
    missionBrief:
      'A scalable project cockpit for education-resource SaaS development and launch operations.',
    repoUrl: 'https://standardcraftny.com',
    accent: 'amber',
    telemetry: {
      readiness: 74,
      automation: 64,
      risk: 39,
      coverage: 71
    },
    tags: ['StandardCraft', 'NYS Standards', 'Stripe', 'Supabase', 'Netlify'],
    launchActions: [
      {
        id: 'standardcraft-site',
        label: 'Open StandardCraft',
        type: 'url',
        target: 'https://standardcraftny.com',
        description: 'Open the StandardCraft website.'
      }
    ],
    nextActions: [
      'Add launch readiness scoring.',
      'Add credit/download flow regression tests.',
      'Add Stripe and Supabase environment checklist.'
    ],
    agents: [
      {
        id: 'resource-library-architect',
        name: 'Resource Library Architect',
        callsign: 'LIB-90',
        origin: 'Codex',
        role: 'Resource library structure and QA',
        status: 'Building',
        description:
          'Maintains resource counts, subject coverage, grade-band spread, and functional preview/download flows.',
        tags: ['Resources', 'QA', 'Credits'],
        launchActions: []
      }
    ]
  },
  {
    id: 'legal-ops-console',
    name: 'Legal Ops Console',
    callsign: 'EVIDENCE-DECK',
    category: 'Document & Case Ops',
    status: 'Planning',
    priority: 'Medium',
    objective:
      'Organize legal document review, evidence timelines, issue trackers, and message-drafting workflows.',
    missionBrief:
      'Project cockpit for legal operations, document analysis, chronology building, and message positioning workflows.',
    accent: 'emerald',
    telemetry: {
      readiness: 51,
      automation: 38,
      risk: 57,
      coverage: 44
    },
    tags: ['Legal Ops', 'Documents', 'Timeline', 'Evidence'],
    launchActions: [],
    nextActions: [
      'Add document vault path configuration.',
      'Add timeline and exhibit indexing agent definitions.',
      'Add privilege and sensitive-data safety reminders.'
    ],
    agents: [
      {
        id: 'timeline-builder',
        name: 'Timeline Builder',
        callsign: 'CHRONO-1',
        origin: 'Manual',
        role: 'Chronology and issue mapping',
        status: 'Planning',
        description:
          'Structures events, evidence references, message history, and decision points into reviewable timelines.',
        tags: ['Timeline', 'Evidence', 'Review'],
        launchActions: []
      }
    ]
  }
];
