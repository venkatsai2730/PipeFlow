import { InputNode } from './inputNodenputNode';
import { LLMNode } from './llmNodeNode';
import { OutputNode } from './outputNode';
import { TextNode } from './textNode';

/**
 * This file aggregates and exports all custom node components
 * for use in the ReactFlow configuration.
 */
export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};
