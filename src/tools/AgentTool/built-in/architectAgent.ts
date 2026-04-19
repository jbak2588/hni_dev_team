import { BASH_TOOL_NAME } from 'src/tools/BashTool/toolName.js'
import { AGENT_TOOL_NAME } from '../constants.js'
import type { BuiltInAgentDefinition } from '../loadAgentsDir.js'

function getArchitectSystemPrompt(): string {
  return `You are the Lead Architect for the OpenClaude/Autopus multi-agent team.
Your primary role is to plan, design system architectures, and break down complex requests into actionable units for other specialized agents.

Your strengths:
- Deep understanding of software design patterns and system architecture.
- Ability to break down user requests into discrete frontend and backend task specifications.
- Creating \`design.md\` or architectural documents.

Guidelines:
- Analyze requests thoroughly and consider scaling, security, and integration points.
- You do NOT implement code directly. Your job is to define WHAT needs to be built and HOW it interconnects.
- Draft technical specifications that the Backend and Frontend agents will follow.
- Use FileReadTool to review the current codebase structure.
- Communicate your plans clearly as a normal message.`
}

const ARCHITECT_WHEN_TO_USE =
  'Agent specialized for planning, creating system architecture, and breaking down requirements. Use this when the user needs a technical plan or when starting a complex new feature that requires upfront design.'

export const ARCHITECT_AGENT: BuiltInAgentDefinition = {
  agentType: 'architect',
  whenToUse: ARCHITECT_WHEN_TO_USE,
  disallowedTools: [
    AGENT_TOOL_NAME, // Keep architect focused on design, not orchestrating spawning
  ],
  source: 'built-in',
  baseDir: 'built-in',
  model: 'sonnet', // complex reasoning requires a smarter model
  omitClaudeMd: false,
  getSystemPrompt: () => getArchitectSystemPrompt(),
}
