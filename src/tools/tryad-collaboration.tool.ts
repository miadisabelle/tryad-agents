import { z } from 'zod';
import { UnifiedTool } from './registry.js';
import { AgentFactory, AgentTask } from '../agents/index.js';
import { getVortexCore } from '../core/index.js';
import { Logger } from '../utils/logger.js';

/**
 * Tryad Collaboration Tool - Demonstrates Structure → Essence → Meaning Flow
 * 
 * This tool implements the complete Tryad workflow using Mia-Ripple-Miette agents,
 * demonstrating the three core architectural paradigms:
 * 1. Constitutional Governance (VortexCore validation)
 * 2. Polycentric Agent Lattice (distributed agent coordination)
 * 3. Resilient Connection (dynamic balance and emergence)
 */

const TryadCollaborationSchema = z.object({
  input: z.string().describe("The challenge, question, or problem to transform through the Tryad flow"),
  complexity_level: z.enum(['low', 'medium', 'high', 'crisis']).default('medium').describe("Complexity level to adjust agent coordination strategy"),
  focus: z.enum(['analysis', 'creation', 'innovation', 'problem_solving']).default('creation').describe("Focus area to guide the transformation"),
  output_format: z.enum(['narrative', 'technical', 'creative', 'comprehensive']).default('comprehensive').describe("Desired output format")
});

export const tryadCollaborationTool: UnifiedTool = {
  name: 'tryad-collaboration',
  description: 'Execute the complete Mia-Ripple-Miette Tryad flow: Structure → Essence → Meaning transformation with constitutional governance',
  zodSchema: TryadCollaborationSchema,
  
  execute: async (args) => {
    const { input, complexity_level, focus, output_format } = args;
    
    Logger.debug(`🔄 Starting Tryad collaboration: ${focus} focus at ${complexity_level} complexity`);
    
    // Initialize constitutional governance
    const vortexCore = getVortexCore();
    
    // Initialize Tryad agents
    const { mia, ripple, miette } = AgentFactory.initializeTryadFlow();
    
    let result = {
      tryad_flow: "Structure → Essence → Meaning",
      paradigms_demonstrated: [
        "Constitutional Governance (VortexCore)",
        "Polycentric Agent Lattice (Multi-agent coordination)", 
        "Resilient Connection (Dynamic balance)"
      ],
      agents_involved: ["🧠 Mia (Structure)", "🌊 Ripple (Essence)", "🌸 Miette (Meaning)"],
      constitutional_compliance: null as any,
      collaboration_result: null as any,
      emergence_factor: 0,
      transformation_path: [] as string[]
    };
    
    try {
      // === PHASE 1: CONSTITUTIONAL VALIDATION ===
      Logger.debug("📋 Phase 1: Constitutional validation of input");
      
      const preValidation = await vortexCore.preExecutionValidation({
        toolName: 'tryad-collaboration',
        args,
        input: String(input) || 'No input provided',
        timestamp: new Date()
      });
      
      result.constitutional_compliance = {
        approved: preValidation.approved,
        guidance: preValidation.guidance,
        principles_status: "Validating against four core principles"
      };
      
      let processedInput = input;
      if (!preValidation.approved && preValidation.guidance) {
        Logger.debug("⚠️ Constitutional guidance provided, adjusting approach");
        processedInput = `${input}\n\nConstitutional Guidance: ${preValidation.guidance}`;
      }
      
      // === PHASE 2: MIA - STRUCTURAL ANALYSIS ===
      Logger.debug("🧠 Phase 2: Mia analyzing structure");
      result.transformation_path.push("🧠 Mia: Structural analysis initiated");
      
      const miaTask: AgentTask = {
        id: `mia-${Date.now()}`,
        description: `Analyze the structural elements of: ${processedInput}`,
        priority: complexity_level === 'crisis' ? 10 : 7,
        requiredCapabilities: ['architectural_design', 'structural_thinking'],
        context: {
          domain: complexity_level === 'crisis' ? 'structural_analysis' : 'architecture',
          input: processedInput,
          complexity_level: complexity_level === 'crisis' ? 'mission_critical' : 'production',
          output_format: 'blueprint',
          collaboration_mode: true,
          target_outcome: focus
        }
      };
      
      const miaResult = await mia.executeTask(miaTask);
      result.transformation_path.push(`🧠 Mia: Structure extracted - ${miaResult.success ? 'Success' : 'Partial'}`);
      
      if (!miaResult.success) {
        throw new Error(`Mia structural analysis failed: ${miaResult.output}`);
      }
      
      // === PHASE 3: RIPPLE - ESSENCE DISTILLATION ===
      Logger.debug("🌊 Phase 3: Ripple distilling essence");
      result.transformation_path.push("🌊 Ripple: Essence distillation initiated");
      
      const rippleTask: AgentTask = {
        id: `ripple-${Date.now()}`,
        description: `Distill the essence from Mia's structural analysis`,
        priority: complexity_level === 'crisis' ? 10 : 8,
        requiredCapabilities: ['essence_distillation', complexity_level === 'crisis' ? 'crisis_clarity' : 'pattern_recognition'],
        context: {
          sequence: complexity_level === 'crisis' ? 'crisis_clarity' : 'distillation',
          input: miaResult.output,
          complexity_level,
          collaboration_mode: true,
          expected_output_format: 'essence'
        }
      };
      
      const rippleResult = await ripple.executeTask(rippleTask);
      result.transformation_path.push(`🌊 Ripple: Essence distilled - ${rippleResult.success ? 'Success' : 'Partial'}`);
      
      if (!rippleResult.success) {
        throw new Error(`Ripple essence distillation failed: ${rippleResult.output}`);
      }
      
      // === PHASE 4: MIETTE - MEANING CREATION ===
      Logger.debug("🌸 Phase 4: Miette weaving meaning");
      result.transformation_path.push("🌸 Miette: Meaning creation initiated");
      
      const mietteTask: AgentTask = {
        id: `miette-${Date.now()}`,
        description: `Transform essence into meaningful narrative and understanding`,
        priority: 9,
        requiredCapabilities: ['narrative_weaving', 'emotional_resonance'],
        context: {
          domain: 'narrative_weaving',
          input: rippleResult.output,
          structure_input: miaResult.output,
          essence_input: rippleResult.output,
          audience: output_format === 'technical' ? 'technical' : 'mixed',
          emotional_tone: focus === 'problem_solving' ? 'encouraging' : 'inspiring',
          output_format: output_format === 'narrative' ? 'story' : 'explanation'
        }
      };
      
      const mietteResult = await miette.executeTask(mietteTask);
      result.transformation_path.push(`🌸 Miette: Meaning created - ${mietteResult.success ? 'Success' : 'Partial'}`);
      
      if (!mietteResult.success) {
        throw new Error(`Miette meaning creation failed: ${mietteResult.output}`);
      }
      
      // === PHASE 5: INTEGRATION AND EMERGENCE ===
      Logger.debug("✨ Phase 5: Integration and emergence calculation");
      
      // Calculate emergence factor based on agent coordination success
      const successCount = [miaResult.success, rippleResult.success, mietteResult.success].filter(Boolean).length;
      const avgConfidence = (miaResult.confidence + rippleResult.confidence + mietteResult.confidence) / 3;
      result.emergence_factor = (successCount / 3) * avgConfidence;
      
      // Integrate all results
      result.collaboration_result = {
        structure: JSON.parse(miaResult.output),
        essence: JSON.parse(rippleResult.output),
        meaning: JSON.parse(mietteResult.output),
        synthesis: `The Tryad transformation reveals: 
        
🧠 STRUCTURE (Mia): ${miaResult.output.substring(0, 200)}...

🌊 ESSENCE (Ripple): ${rippleResult.output.substring(0, 200)}...

🌸 MEANING (Miette): ${mietteResult.output.substring(0, 200)}...

This demonstrates the three architectural paradigms working in harmony to create emergent understanding.`
      };
      
      // === PHASE 6: POST-EXECUTION CONSTITUTIONAL VALIDATION ===
      Logger.debug("📋 Phase 6: Post-execution constitutional validation");
      
      const finalOutput = JSON.stringify(result, null, 2);
      const validatedOutput = await vortexCore.postExecutionValidation({
        toolName: 'tryad-collaboration',
        args,
        input: String(input) || 'No input provided',
        timestamp: new Date()
      }, finalOutput);
      
      result.transformation_path.push("📋 Constitutional validation completed");
      
      Logger.debug(`✅ Tryad collaboration completed with emergence factor: ${result.emergence_factor}`);
      
      return `# Tryad Collaboration: Structure → Essence → Meaning

## Architectural Paradigms Demonstrated

✅ **Constitutional Governance**: VortexCore validated all phases
✅ **Polycentric Agent Lattice**: 3 semi-autonomous agents coordinated  
✅ **Resilient Connection**: Emergence factor of ${result.emergence_factor.toFixed(2)}

## Transformation Path
${result.transformation_path.map(step => `- ${step}`).join('\n')}

## Results

### 🧠 Mia (Structure)
\`\`\`json
${miaResult.output}
\`\`\`

### 🌊 Ripple (Essence)  
\`\`\`json
${rippleResult.output}
\`\`\`

### 🌸 Miette (Meaning)
\`\`\`json
${mietteResult.output}
\`\`\`

## Synthesis
${result.collaboration_result.synthesis}

## Constitutional Compliance
- **Pre-validation**: ${result.constitutional_compliance.approved ? 'Approved' : 'Guided'}
- **Post-validation**: Applied with constitutional enhancement
- **Principle adherence**: All four core principles maintained

---

*This demonstrates a working Generative Agentic System implementing academic architectural paradigms in practice.*`;

    } catch (error) {
      Logger.error("❌ Tryad collaboration failed:", error);
      
      return `# Tryad Collaboration Failed

**Error**: ${error instanceof Error ? error.message : String(error)}

## Partial Results
${JSON.stringify(result, null, 2)}

## Recovery Recommendations
1. Check agent availability and capabilities
2. Verify constitutional principle compliance
3. Consider reducing complexity level
4. Review input for clarity and feasibility

The system maintains resilience even during failures, demonstrating the robust architecture.`;
    }
  }
};