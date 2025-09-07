// Tool Registry Index - Registers all tools
import { toolRegistry } from './registry.js';
import { askGeminiTool } from './ask-gemini.tool.js';
import { pingTool, helpTool } from './simple-tools.js';
import { createTool } from './create.tool.js';
import { fetchChunkTool } from './fetch-chunk.tool.js';
import { timeoutTestTool } from './timeout-test.tool.js';
import { constitutionalAnalysisTool } from './constitutional-analysis.tool.js';
import { agenticAnalysisTool } from './agentic-analysis.tool.js';
import { resilientCoordinationTool } from './resilient-coordination.tool.js';
import { systemIntegrationTool } from './system-integration.tool.js';
import { tryadCollaborationTool } from './tryad-collaboration.tool.js';
import { systemDemoTool } from './system-demo.tool.js';

toolRegistry.push(
  askGeminiTool,
  pingTool,
  helpTool,
  createTool,
  fetchChunkTool,
  timeoutTestTool,
  constitutionalAnalysisTool,
  agenticAnalysisTool,
  resilientCoordinationTool,
  systemIntegrationTool,
  tryadCollaborationTool,
  systemDemoTool
);

export * from './registry.js';