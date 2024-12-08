import axios from 'axios';

/**
 * Helper functions for API calls between the frontend and backend.
 * - Sends the pipeline data to the backend for processing.
 * - Handles the response for displaying the pipeline details (number of nodes, edges, DAG status).
 */

/**
 * Sends pipeline data (nodes and edges) to the backend for processing.
 * @param {Array} nodes - Array of node objects.
 * @param {Array} edges - Array of edge objects.
 * @returns {Promise<Object>} - Returns a promise with the server response containing nodes, edges, and DAG status.
 */
export const submitPipeline = async (nodes, edges) => {
  try {
    const response = await axios.post('/api/pipelines/parse', {
      nodes: nodes,
      edges: edges,
    });

    // Return the response from the backend (number of nodes, edges, and DAG status)
    return response.data;
  } catch (error) {
    console.error("Error submitting pipeline:", error);
    throw new Error('Failed to submit pipeline.');
  }
};

/**
 * Utility function to check if the pipeline is valid before submitting it to the backend.
 * Validates whether nodes and edges are non-empty.
 * @param {Array} nodes - Array of node objects.
 * @param {Array} edges - Array of edge objects.
 * @returns {Boolean} - Returns true if valid, false if invalid.
 */
export const validatePipeline = (nodes, edges) => {
  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    return false;
  }

  if (nodes.length === 0 || edges.length === 0) {
    return false;
  }

  // Further validations can be added here as needed (e.g., checking for proper node IDs, edge connections)
  return true;
};
