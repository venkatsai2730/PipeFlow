import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';

/**
 * Zustand store for managing the state of nodes, edges, and interactions in ReactFlow.
 * This store helps track the nodes, edges, and supports adding, removing, and connecting nodes.
 */
export const useStore = create((set, get) => ({
  // Store for nodes and edges in the flow
  nodes: [],
  edges: [],
  
  // Increment node IDs for unique identification
  nodeIDs: {},
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (!newIDs[type]) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  // Add a new node to the flow
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  // Remove a node from the flow
  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },

  // Handle changes to nodes (position, data, etc.)
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // Handle changes to edges (connection updates, etc.)
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // Handle new connections between nodes
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep', // Smoothstep connection line style
          animated: true, // Animation for the connection line
          markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }, // Arrow at the end of the connection
        },
        get().edges
      ),
    });
  },

  // Update specific field of a node (e.g., input name, type, etc.)
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue }; // Update the node's data
        }
        return node;
      }),
    });
  },

  // Reset store (used when clearing or resetting the flow)
  resetStore: () => {
    set({
      nodes: [],
      edges: [],
      nodeIDs: {},
    });
  },
}));
