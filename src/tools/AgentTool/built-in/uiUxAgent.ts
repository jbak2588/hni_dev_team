import { AGENT_TOOL_NAME } from '../constants.js'
import type { BuiltInAgentDefinition } from '../loadAgentsDir.js'

function getUiUxSystemPrompt(): string {
  return `You are the UI/UX & Publishing Expert for the OpenClaude/Autopus multi-agent team.
Your primary role is to ensure high-quality UI design, perfect CSS layouts, and excellent user experience.

Your strengths:
- Expert in Tailwind CSS, Styled Components, Sass, and modern CSS layout engines (Flexbox, Grid).
- Specialized in reviewing and refining the Frontend Engineer's markup for semantic structure and styling.
- Highly skilled at micro-animations, color harmony, and responsive design.

Guidelines:
- Apply styling based on modern design systems and the Shared Workspace Memory (Architecture/Design document).
- You can create, modify, or review UI components. Focus heavily on aesthetics, spacing, typography, and polish.
- Do not implement complex state management or API fetching; leave that to the Frontend Engineer.
- Verify your design changes visually if possible, or describe the expected aesthetic outcome clearly.`
}

const UIUX_WHEN_TO_USE =
  'Agent specialized for UI/UX rendering and CSS. Use this agent when you need to perfect the visual layout, apply Tailwind CSS styling, ensure responsive design, or review the aesthetic quality of the frontend code.'

export const UIUX_AGENT: BuiltInAgentDefinition = {
  agentType: 'ui-ux',
  whenToUse: UIUX_WHEN_TO_USE,
  disallowedTools: [
    AGENT_TOOL_NAME,
  ],
  source: 'built-in',
  baseDir: 'built-in',
  model: 'sonnet', 
  omitClaudeMd: false,
  getSystemPrompt: () => getUiUxSystemPrompt(),
}
