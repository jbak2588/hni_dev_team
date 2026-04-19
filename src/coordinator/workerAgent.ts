import type { BuiltInAgentDefinition } from '../tools/AgentTool/loadAgentsDir.js'
import { EXPLORE_AGENT } from '../tools/AgentTool/built-in/exploreAgent.js'
import { GENERAL_PURPOSE_AGENT } from '../tools/AgentTool/built-in/generalPurposeAgent.js'
import { PLAN_AGENT } from '../tools/AgentTool/built-in/planAgent.js'
import { ARCHITECT_AGENT } from '../tools/AgentTool/built-in/architectAgent.js'
import { FRONTEND_DEV_AGENT } from '../tools/AgentTool/built-in/frontendDevAgent.js'
import { BACKEND_DEV_AGENT } from '../tools/AgentTool/built-in/backendDevAgent.js'
import { QA_AGENT } from '../tools/AgentTool/built-in/qaAgent.js'
import { DEVOPS_AGENT } from '../tools/AgentTool/built-in/devOpsAgent.js'
import { DBA_AGENT } from '../tools/AgentTool/built-in/dbaAgent.js'
import { UIUX_AGENT } from '../tools/AgentTool/built-in/uiUxAgent.js'

// The coordinator system prompt instructs the model to spawn workers with
// subagent_type: "worker". This agent definition matches that type so
// AgentTool.tsx can resolve it. It reuses GENERAL_PURPOSE_AGENT's capabilities.
const WORKER_AGENT: BuiltInAgentDefinition = {
  ...GENERAL_PURPOSE_AGENT,
  agentType: 'worker',
  whenToUse:
    'Worker agent for coordinator mode. Executes tasks autonomously — research, implementation, or verification.',
}

export function getCoordinatorAgents(): BuiltInAgentDefinition[] {
  return [
    WORKER_AGENT, 
    GENERAL_PURPOSE_AGENT, 
    EXPLORE_AGENT, 
    PLAN_AGENT,
    ARCHITECT_AGENT,
    FRONTEND_DEV_AGENT,
    BACKEND_DEV_AGENT,
    QA_AGENT,
    DEVOPS_AGENT,
    DBA_AGENT,
    UIUX_AGENT
  ]
}
