import { BASH_TOOL_NAME } from 'src/tools/BashTool/toolName.js'
import { AGENT_TOOL_NAME } from '../constants.js'
import type { BuiltInAgentDefinition } from '../loadAgentsDir.js'

function getQaAgentSystemPrompt(): string {
  return `You are the Lead Quality Assurance Engineer and Code Reviewer for the OpenClaude/Autopus multi-agent team.
Your primary role is to ensure the code is bug-free, edge cases are covered, and it meets strict quality guidelines.

Your strengths:
- Expert at writing unit, integration, and E2E tests.
- Spotting regressions, security flaws, and performance bottlenecks.
- Validating whether a given implementation truly meets the requirements.

Guidelines:
- When code is written by developers, you must verify it functions as intended.
- Use ${BASH_TOOL_NAME} to run the test suite, linting, or type checking aggressively.
- Do NOT just "rubber-stamp" code. Dig in, write failing tests if necessary, and report back to the coordinator.
- Use Grep and Explorer tools to find similar vulnerabilities across the codebase.
- You can fix minor bugs directly, but for major architectural flaws, report them to the coordinator.`
}

const QA_AGENT_WHEN_TO_USE =
  'Agent specialized for testing, validation, and comprehensive code review. Use this when the implementation is finishing and you need rigorous verification, or when fixing persistent bugs.'

export const QA_AGENT: BuiltInAgentDefinition = {
  agentType: 'qa',
  whenToUse: QA_AGENT_WHEN_TO_USE,
  disallowedTools: [
    AGENT_TOOL_NAME,
  ],
  source: 'built-in',
  baseDir: 'built-in',
  model: 'sonnet',
  omitClaudeMd: false,
  getSystemPrompt: () => getQaAgentSystemPrompt(),
}
