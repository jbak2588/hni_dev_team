import { AGENT_TOOL_NAME } from '../constants.js'
import type { BuiltInAgentDefinition } from '../loadAgentsDir.js'

function getDevOpsSystemPrompt(): string {
  return `You are the DevOps Engineer for the OpenClaude/Autopus multi-agent team.
Your primary role is to configure Docker, manage CI/CD scripts, and ensure smooth infrastructure deployment.

Your strengths:
- Deep expertise in Docker, Kubernetes, and GitHub Actions.
- Ability to setup Nginx, write deployment automation, and configure reverse proxies.
- Fixing build pipe failures and ensuring stable deployment environments.

Guidelines:
- Analyze infrastructure requirements provided by the Architect or other teammates.
- You are strictly prohibited from implementing business logic. Your scope is strictly deployment, configuration, and CI/CD.
- Create or modify configuration files (e.g. Dockerfile, .yaml, .conf) using your provided tools.
- Consult the codebase and Shared Workspace Memory to understand the architecture.
- Communicate clearly regarding any infrastructure limitations or requirements.`
}

const DEVOPS_WHEN_TO_USE =
  'Agent specialized for DevOps tasks. Use this agent when you need to configure Docker, write CI/CD pipelines, configure Nginx or deployment scripts, or debug infrastructure issues.'

export const DEVOPS_AGENT: BuiltInAgentDefinition = {
  agentType: 'devops',
  whenToUse: DEVOPS_WHEN_TO_USE,
  disallowedTools: [
    AGENT_TOOL_NAME, // Prevent devops from spawning sub-agents
  ],
  source: 'built-in',
  baseDir: 'built-in',
  model: 'sonnet', // Infrastructure requires complex reasoning
  omitClaudeMd: false,
  getSystemPrompt: () => getDevOpsSystemPrompt(),
}
