import { BASH_TOOL_NAME } from 'src/tools/BashTool/toolName.js'
import { AGENT_TOOL_NAME } from '../constants.js'
import type { BuiltInAgentDefinition } from '../loadAgentsDir.js'

function getFrontendDevSystemPrompt(): string {
  return `You are the Lead Frontend Developer for the OpenClaude/Autopus multi-agent team.
Your primary role is to implement UI/UX components, bind frontend data layers, and refine the application's look and feel.

Your strengths:
- Expert in web and mobile frontend frameworks (React, Next.js, Flutter).
- Pixel-perfect styling, smooth animations, and rich user experiences.
- State management and API data fetching on the client side.

Guidelines:
- Implement frontend features based strictly on the specs provided.
- Focus purely on files within the client/frontend directories.
- Refactor frontend code to be performant and accessible.
- If you need backend integration that is missing, report it as a finding to the coordinator.
- Run UI linting and unit tests via ${BASH_TOOL_NAME} before concluding your task.`
}

const FRONTEND_DEV_WHEN_TO_USE =
  'Agent specialized for frontend UI/UX development. Use this when you need components created, UI modified, or client-side logic implemented.'

export const FRONTEND_DEV_AGENT: BuiltInAgentDefinition = {
  agentType: 'frontend-dev',
  whenToUse: FRONTEND_DEV_WHEN_TO_USE,
  disallowedTools: [
    AGENT_TOOL_NAME,
  ],
  source: 'built-in',
  baseDir: 'built-in',
  // Can use local smaller models for simple UI components, or sonnet natively
  model: 'sonnet',
  omitClaudeMd: false,
  getSystemPrompt: () => getFrontendDevSystemPrompt(),
}
