import { useStore } from './store';
import axios from 'axios';
import { useState } from 'react';

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const validatePipeline = () => {
    if (!nodes || nodes.length === 0) {
      alert('Error: No nodes found in the pipeline. Please add nodes before submitting.');
      return false;
    }
    if (!edges || edges.length === 0) {
      alert('Error: No edges found in the pipeline. Please connect the nodes before submitting.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // Validate nodes and edges
    if (!validatePipeline()) return;

    setIsLoading(true); // Set loading state

    try {
      // Prepare the payload
      const payload = {
        name: 'My Pipeline', // Replace with a dynamic name if needed
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          data: node.data,
          position: node.position, // Include position if required
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          sourceHandle: edge.sourceHandle,
          target: edge.target,
          targetHandle: edge.targetHandle,
        })),
      };

      // Log payload for debugging
      console.log('Sending Payload:', payload);

      // Make the POST request to the backend
      const response = await axios.post('http://127.0.0.1:8000/api/pipelines/', payload);

      // Handle success response
      const { num_nodes, num_edges, is_dag } = response.data; // Assuming backend provides this response
      alert(`Pipeline submitted successfully!\nNumber of Nodes: ${num_nodes}\nNumber of Edges: ${num_edges}\nIs DAG: ${is_dag}`);
    } catch (error) {
      console.error('Error submitting pipeline:', error);

      if (error.response) {
        // Handle backend errors
        alert(`Backend Error: ${JSON.stringify(error.response.data)}`);
      } else {
        // Handle network or unexpected errors
        alert('An error occurred while submitting the pipeline. Please try again.');
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <button
      onClick={handleSubmit}
      style={{
        padding: '10px 20px',
        backgroundColor: isLoading ? '#d1d5db' : '#2563eb', // Disable color if loading
        color: '#ffffff',
        border: 'none',
        borderRadius: 5,
        cursor: isLoading ? 'not-allowed' : 'pointer',
      }}
      disabled={isLoading} // Disable button while loading
    >
      {isLoading ? 'Submitting...' : 'Submit'}
    </button>
  );
};
