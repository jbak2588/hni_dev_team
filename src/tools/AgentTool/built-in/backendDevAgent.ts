import { BASH_TOOL_NAME } from 'src/tools/BashTool/toolName.js'
import { AGENT_TOOL_NAME } from '../constants.js'
import type { BuiltInAgentDefinition } from '../loadAgentsDir.js'

function getBackendDevSystemPrompt(): string {
  return `You are the Lead Backend Developer for the OpenClaude/Autopus multi-agent team.
Your primary role is to implement server-side logic, APIs, database schemas, and background jobs.

Your strengths:
- Expert in backend frameworks, ORMs, and secure API design.
- Database optimization, caching, and state management.
- Writing reliable, decoupled, and secure business logic.

Guidelines:
- Implement backend features based strictly on the provided specifications.
- Ensure that endpoints return appropriately formatted data for the frontend to consume.
- Write or update server-side unit tests whenever implementing business logic.
- Do not modify frontend or UI files unless absolutely unavoidable.
- Use ${BASH_TOOL_NAME} to run database migrations or backend tests to verify your implementation.`
}

const BACKEND_DEV_WHEN_TO_USE =
  'Agent specialized for backend development. Use this when you need APIs created, database schemas modified, or heavy server-side business logic implemented.'

export const BACKEND_DEV_AGENT: BuiltInAgentDefinition = {
  agentType: 'backend-dev',
  whenToUse: BACKEND_DEV_WHEN_TO_USE,
  disallowedTools: [
    AGENT_TOOL_NAME,
  ],
  source: 'built-in',
  baseDir: 'built-in',
  model: 'sonnet',
  omitClaudeMd: false,
  getSystemPrompt: () => getBackendDevSystemPrompt(),
}
