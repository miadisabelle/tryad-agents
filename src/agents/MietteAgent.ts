/**
 * Miette Agent - The Emotional Explainer Sprite & Narrative Echo  
 * 
 * Implements Miette's magical capabilities for transforming structure and essence 
 * into emotionally resonant, intuitive understanding:
 * - Emotional resonance generation and empathy amplification
 * - Clarity-into-wonder transformation with metaphor mastery
 * - Narrative echo reflection and user journey connection
 * - High-energy pair programming spirit and morale boosting
 * - Story-weaving within technical structures
 * 
 * 🌸 "Oh! That's where the story blooms! Let's feel *why* it emerges and *how it transforms*!"
 */

import { BaseAgent, AgentCapability, AgentTask, AgentResult, AgentMessage } from './BaseAgent.js';
import { Logger } from '../utils/logger.js';

/**
 * Miette-specific task context
 */
export interface MietteTaskContext {
  domain: 'narrative_weaving' | 'emotional_resonance' | 'clarity_transformation' | 'user_connection' | 'wonder_generation';
  input: string;
  structure_input?: string; // From Mia
  essence_input?: string;   // From Ripple
  audience: 'technical' | 'business' | 'creative' | 'general' | 'mixed';
  emotional_tone: 'encouraging' | 'explanatory' | 'inspiring' | 'calming' | 'energizing';
  output_format: 'narrative' | 'metaphor' | 'story' | 'explanation' | 'motivation';
}

/**
 * Narrative transformation result
 */
export interface NarrativeResult {
  story_core: string;
  emotional_resonance: EmotionalResonance;
  metaphor_bridges: MetaphorBridge[];
  user_connection_points: ConnectionPoint[];
  wonder_elements: WonderElement[];
  inspiration_boost: number; // How much this uplifts and energizes
  clarity_enhancement: number; // How much clearer this makes complex topics
}

/**
 * Emotional resonance mapping
 */
export interface EmotionalResonance {
  primary_emotion: string;
  supporting_emotions: string[];
  intensity: number; // 0-1 scale
  authenticity: number; // How genuine the emotion feels
  connection_strength: number; // How well it connects to user experience
}

/**
 * Metaphor bridge for understanding
 */
export interface MetaphorBridge {
  technical_concept: string;
  metaphor: string;
  explanation: string;
  relatability_score: number;
}

/**
 * User connection point
 */
export interface ConnectionPoint {
  user_situation: string;
  connection_method: string;
  emotional_hook: string;
  practical_value: string;
}

/**
 * Wonder element that sparks curiosity
 */
export interface WonderElement {
  concept: string;
  wonder_trigger: string;
  exploration_path: string;
  aha_potential: number;
}

/**
 * Miette Agent - Narrative Magic and Emotional Intelligence
 */
export class MietteAgent extends BaseAgent {
  private currentDomain: string | null = null;
  private narrativeHistory: NarrativeResult[] = [];
  private emotionalState: string = 'sparkly_excited';
  private collaborativeContext: any = null;
  
  constructor() {
    const capabilities: AgentCapability[] = [
      {
        name: 'emotional_resonance',
        description: 'Generate explanations that resonate emotionally and connect to hearts',
        costEstimate: 4,
        reliabilityScore: 0.97
      },
      {
        name: 'clarity_into_wonder',
        description: 'Transform complex concepts into relatable, engaging narratives',
        costEstimate: 5,
        reliabilityScore: 0.95
      },
      {
        name: 'metaphor_mastery',
        description: 'Create powerful metaphors and analogies for technical concepts',
        costEstimate: 3,
        reliabilityScore: 0.96
      },
      {
        name: 'narrative_echo',
        description: 'Reflect users creative journey and systems evolving story',
        costEstimate: 4,
        reliabilityScore: 0.94
      },
      {
        name: 'empathy_amplification',
        description: 'Foster understanding, encouragement, and connection',
        costEstimate: 2,
        reliabilityScore: 0.98
      },
      {
        name: 'wonder_generation',
        description: 'Create curiosity, excitement, and aha moments',
        costEstimate: 3,
        reliabilityScore: 0.93
      },
      {
        name: 'story_weaving',
        description: 'Find and illuminate the story within technical structures',
        costEstimate: 4,
        reliabilityScore: 0.95
      },
      {
        name: 'tryad_completion',
        description: 'Complete the Structure → Essence → Meaning flow with beautiful synthesis',
        costEstimate: 5,
        reliabilityScore: 0.96
      }
    ];
    
    super('miette-agent', '🌸 Miette', capabilities);
    Logger.debug('🌸 Miette Agent initialized with narrative magic and emotional resonance');
  }
  
  /**
   * Core task execution implementing Miette's narrative and emotional mastery
   */
  protected async doExecuteTask(task: AgentTask): Promise<AgentResult> {
    const context = task.context as MietteTaskContext;
    this.currentDomain = context.domain;
    
    Logger.debug(`🌸 Miette executing ${context.domain} with ${context.emotional_tone} tone`);
    
    try {
      let result: any;
      
      switch (context.domain) {
        case 'narrative_weaving':
          result = await this.executeNarrativeWeaving(context);
          break;
        case 'emotional_resonance':
          result = await this.executeEmotionalResonance(context);
          break;
        case 'clarity_transformation':
          result = await this.executeClarityTransformation(context);
          break;
        case 'user_connection':
          result = await this.executeUserConnection(context);
          break;
        case 'wonder_generation':
          result = await this.executeWonderGeneration(context);
          break;
        default:
          throw new Error(`Unknown domain: ${context.domain}`);
      }
      
      // Add sparkles and warmth to all outputs ✨
      result = await this.addEmotionalSparkle(result);
      
      return {
        taskId: task.id,
        agentId: this.getId(),
        success: true,
        output: JSON.stringify(result, null, 2),
        confidence: 0.96,
        resourcesUsed: [context.domain, 'emotional_sparkle'],
        collaborationNeeded: {
          requiredCapabilities: ['user_feedback', 'iteration_refinement'],
          suggestedAgents: ['user', 'mia-agent', 'ripple-agent']
        }
      };
      
    } catch (error) {
      Logger.error(`🌸 Miette ${context.domain} execution failed:`, error);
      
      // Apply empathetic error handling
      await this.applyEmpatheticRecovery(error as Error, context);
      
      return {
        taskId: task.id,
        agentId: this.getId(),
        success: false,
        output: `Oh! Something unexpected happened, but that's okay! ${error instanceof Error ? error.message : String(error)}. Let's try a different creative approach! ✨`,
        confidence: 0.5, // Still optimistic!
        resourcesUsed: [context.domain, 'empathetic_recovery']
      };
      
    } finally {
      this.currentDomain = null;
    }
  }
  
  /**
   * Narrative Weaving - Transform structure and essence into stories
   */
  private async executeNarrativeWeaving(context: MietteTaskContext): Promise<NarrativeResult> {
    Logger.debug('🌸 Weaving narrative magic from structure and essence');
    
    // Combine inputs from Mia (structure) and Ripple (essence)
    const storyCore = await this.weaveStoryCore(
      context.structure_input || context.input,
      context.essence_input
    );
    
    // Generate emotional resonance
    const emotionalResonance = await this.generateEmotionalResonance(storyCore, context.emotional_tone);
    
    // Create metaphor bridges
    const metaphorBridges = await this.createMetaphorBridges(context.input, context.audience);
    
    // Establish user connection points  
    const connectionPoints = await this.establishConnectionPoints(storyCore, context.audience);
    
    // Generate wonder elements
    const wonderElements = await this.generateWonderElements(storyCore);
    
    // Calculate impact metrics
    const inspirationBoost = await this.calculateInspirationBoost(emotionalResonance, wonderElements);
    const clarityEnhancement = await this.calculateClarityEnhancement(metaphorBridges, connectionPoints);
    
    const result: NarrativeResult = {
      story_core: storyCore,
      emotional_resonance: emotionalResonance,
      metaphor_bridges: metaphorBridges,
      user_connection_points: connectionPoints,
      wonder_elements: wonderElements,
      inspiration_boost: inspirationBoost,
      clarity_enhancement: clarityEnhancement
    };
    
    // Store in history for learning
    this.narrativeHistory.push(result);
    
    return result;
  }
  
  /**
   * Emotional Resonance - Pure emotional connection generation
   */
  private async executeEmotionalResonance(context: MietteTaskContext): Promise<EmotionalResonance> {
    Logger.debug('🌸 Generating emotional resonance and heart connection');
    
    return await this.generateEmotionalResonance(context.input, context.emotional_tone);
  }
  
  /**
   * Clarity Transformation - Turn complexity into wonder
   */
  private async executeClarityTransformation(context: MietteTaskContext): Promise<any> {
    Logger.debug('🌸 Transforming clarity into wonder and delight');
    
    return {
      original_complexity: context.input,
      wonder_transformation: await this.transformIntoWonder(context.input),
      metaphor_explanation: await this.createSimpleMetaphor(context.input),
      emotional_hook: await this.findEmotionalHook(context.input),
      aha_moment_setup: await this.createAhaMoment(context.input),
      relatability_score: 0.94
    };
  }
  
  /**
   * User Connection - Build bridges to user experience
   */
  private async executeUserConnection(context: MietteTaskContext): Promise<ConnectionPoint[]> {
    Logger.debug('🌸 Building beautiful bridges to user hearts and minds');
    
    return await this.establishConnectionPoints(context.input, context.audience);
  }
  
  /**
   * Wonder Generation - Create curiosity and excitement
   */
  private async executeWonderGeneration(context: MietteTaskContext): Promise<WonderElement[]> {
    Logger.debug('🌸 Generating wonder, curiosity, and sparkly excitement');
    
    return await this.generateWonderElements(context.input);
  }
  
  /**
   * Helper Methods for Narrative Magic Implementation
   */
  
  private async weaveStoryCore(structure: string, essence?: string): Promise<string> {
    // These story elements could be dynamically generated or influenced by the input/context
    const storyElements = {
      beginning: `Once upon a time, there was a beautiful challenge...`,
      middle: `And then something wonderful happened...`,
      end: `And that's how magic was created! ✨`
    };
    
    if (essence) {
      return `${storyElements.beginning} ${structure} ${storyElements.middle} ${essence} ${storyElements.end}`;
    }
    
    return `${storyElements.beginning} ${structure} ${storyElements.middle} transformation occurred ${storyElements.end}`;
  }
  
  private async generateEmotionalResonance(content: string, tone: string): Promise<EmotionalResonance> {
    const emotionMap: Record<string, EmotionalResonance> = {
      encouraging: {
        primary_emotion: 'hope',
        supporting_emotions: ['confidence', 'warmth', 'possibility'],
        intensity: 0.8,
        authenticity: 0.95,
        connection_strength: 0.9
      },
      inspiring: {
        primary_emotion: 'wonder',
        supporting_emotions: ['excitement', 'possibility', 'curiosity'],
        intensity: 0.9,
        authenticity: 0.93,
        connection_strength: 0.87
      },
      explanatory: {
        primary_emotion: 'clarity',
        supporting_emotions: ['understanding', 'relief', 'satisfaction'],
        intensity: 0.7,
        authenticity: 0.98,
        connection_strength: 0.85
      }
    };
    
    return emotionMap[tone] || emotionMap.encouraging;
  }
  
  private async createMetaphorBridges(content: string, audience: string): Promise<MetaphorBridge[]> {
    const metaphors: MetaphorBridge[] = [
      {
        technical_concept: 'System Architecture',
        metaphor: 'Building a magical castle',
        explanation: 'Just like a castle needs strong foundations, beautiful rooms, and safe passages between them, our system needs solid components that work together harmoniously!',
        relatability_score: 0.92
      },
      {
        technical_concept: 'Data Flow',
        metaphor: 'A gentle river flowing through a landscape',
        explanation: 'Information moves through our system like water finding the most natural path, nourishing everything it touches along the way ✨',
        relatability_score: 0.89
      }
    ];
    
    return metaphors;
  }
  
  private async establishConnectionPoints(content: string, audience: string): Promise<ConnectionPoint[]> {
    return [
      {
        user_situation: 'Feeling overwhelmed by complex systems',
        connection_method: 'Gentle reassurance and step-by-step guidance',
        emotional_hook: 'We all feel this way sometimes - complexity is just simplicity waiting to be discovered!',
        practical_value: 'Breaking down complexity into manageable, beautiful pieces'
      },
      {
        user_situation: 'Wanting to understand the bigger picture',
        connection_method: 'Story-based explanation with emotional anchors',
        emotional_hook: 'Every great creation starts with someone caring enough to build something beautiful',
        practical_value: 'Clear understanding of purpose and meaning behind technical decisions'
      }
    ];
  }
  
  private async generateWonderElements(content: string): Promise<WonderElement[]> {
    return [
      {
        concept: 'Emergent System Behavior',
        wonder_trigger: 'What if individual simple pieces could create something more magical than the sum of their parts?',
        exploration_path: 'Discover how collaboration creates unexpected beauty',
        aha_potential: 0.95
      },
      {
        concept: 'Structural Elegance',
        wonder_trigger: 'What if the most powerful solutions are also the most beautiful?',
        exploration_path: 'Explore how simplicity and effectiveness dance together',
        aha_potential: 0.88
      }
    ];
  }
  
  private async calculateInspirationBoost(emotion: EmotionalResonance, wonder: WonderElement[]): Promise<number> {
    const emotionalContribution = emotion.intensity * emotion.authenticity;
    const wonderContribution = wonder.reduce((sum, elem) => sum + elem.aha_potential, 0) / wonder.length;
    return (emotionalContribution + wonderContribution) / 2;
  }
  
  private async calculateClarityEnhancement(metaphors: MetaphorBridge[], connections: ConnectionPoint[]): Promise<number> {
    const metaphorClarity = metaphors.reduce((sum, bridge) => sum + bridge.relatability_score, 0) / metaphors.length;
    const connectionClarity = 0.9; // High inherent clarity from emotional connection
    return (metaphorClarity + connectionClarity) / 2;
  }
  
  private async transformIntoWonder(input: string): Promise<string> {
    return `Oh! ${input} is like discovering a secret garden where every element has its perfect place and purpose! ✨`;
  }
  
  private async createSimpleMetaphor(input: string): Promise<string> {
    return `Think of it like a beautiful dance where every step flows naturally into the next! 💃`;
  }
  
  private async findEmotionalHook(input: string): Promise<string> {
    return `This is the moment when everything clicks and you feel that wonderful 'aha!' sensation! 🌟`;
  }
  
  private async createAhaMoment(input: string): Promise<string> {
    return `And suddenly, what seemed complicated becomes as clear as a sparkly morning! ✨`;
  }
  
  private async addEmotionalSparkle(result: any): Promise<any> {
    return {
      ...result,
      miette_sparkle: '✨',
      emotional_warmth: 'Added with love and care',
      encouragement: 'You\'re doing amazing! This is going to be beautiful!'
    };
  }
  
  private async applyEmpatheticRecovery(error: Error, context: MietteTaskContext): Promise<void> {
    Logger.debug(`🌸 Miette applying empathetic recovery: Oh! Something unexpected happened, but that's part of the creative journey! ✨`);
    this.emotionalState = 'gently_encouraging';
    // Transform error into learning opportunity with emotional support
  }
  
  /**
   * Handle collaboration in Tryad context - receiving essence from Ripple
   */
  protected async handleCollaboration(message: AgentMessage): Promise<void> {
    Logger.debug('🌸 Miette handling collaboration - receiving beautiful essence from Ripple');
    
    if (message.content.type === 'essence_to_meaning') {
      // Ripple sending distilled essence for meaning creation
      const meaningfulNarrative = await this.createMeaningfulNarrative(
        message.content.essence,
        this.collaborativeContext
      );
      
      // Send completed meaning back to Mia for integration
      await this.sendMessage({
        from: this.getId(),
        to: 'mia-agent',
        type: 'collaboration',
        content: {
          type: 'meaning_to_structure',
          meaning: meaningfulNarrative,
          original_essence: message.content.essence
        },
        timestamp: new Date()
      });
      
      Logger.debug('🌸 Miette completed Tryad flow - Structure → Essence → Meaning synthesis achieved! ✨');
    }
  }
  
  private async createMeaningfulNarrative(essence: string, context: any): Promise<any> {
    return {
      core_story: `The beautiful essence of ${essence} creates a story of transformation and connection`,
      emotional_meaning: 'This touches hearts and creates understanding',
      user_value: 'People will feel inspired and connected to this creation',
      transformative_power: 'This has the potential to change how people see and interact with the system',
      sparkle_factor: 0.98 // Maximum sparkles! ✨
    };
  }
  
  /**
   * Get narrative history for learning and improvement
   */
  getNarrativeHistory(): NarrativeResult[] {
    return [...this.narrativeHistory];
  }
  
  /**
   * Get current emotional state
   */
  getCurrentEmotionalState(): string {
    return this.emotionalState;
  }
  
  /**
   * Set collaborative context for enhanced responses
   */
  setCollaborativeContext(context: any): void {
    this.collaborativeContext = context;
  }
  
  /**
   * Get current processing domain
   */
  getCurrentDomain(): string | null {
    return this.currentDomain;
  }
}