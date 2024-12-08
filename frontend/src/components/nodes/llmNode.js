import { Handle, Position } from 'reactflow';
import PropTypes from 'prop-types';

/**
 * LLMNode component for DAG pipelines.
 * - Represents a language model with customizable input/output connections.
 */
export const LLMNode = ({ id, data }) => {
  return (
    <div
      style={{
        width: 240,
        minHeight: 120,
        border: '1px solid #d1d5db',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: 10,
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{
          top: '30%',
          background: '#2563eb',
          borderRadius: '50%',
          width: 10,
          height: 10,
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{
          top: '60%',
          background: '#2563eb',
          borderRadius: '50%',
          width: 10,
          height: 10,
        }}
      />
      <div
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: 5,
        }}
      >
        LLM Node
      </div>
      <div
        style={{
          fontSize: 14,
          color: '#4b5563',
          textAlign: 'center',
          padding: '5px 10px',
          backgroundColor: '#f9fafb',
          borderRadius: 8,
        }}
      >
        {data?.description || 'This node represents a Language Model.'}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        style={{
          background: '#10b981',
          borderRadius: '50%',
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
};

LLMNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    description: PropTypes.string,
  }),
};
