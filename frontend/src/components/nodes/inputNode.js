import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import PropTypes from 'prop-types';

/**
 * InputNode component for DAG pipelines.
 * - Allows dynamic configuration of input name and type.
 * - Provides output handles for connecting to downstream nodes.
 */
export const InputNode = ({ id, data }) => {
  const [inputName, setInputName] = useState(data?.inputName || `input_${id.replace('customInput-', '')}`);
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (event) => {
    setInputName(event.target.value);
    if (data?.onChange) {
      data.onChange(id, 'inputName', event.target.value);
    }
  };

  const handleTypeChange = (event) => {
    setInputType(event.target.value);
    if (data?.onChange) {
      data.onChange(id, 'inputType', event.target.value);
    }
  };

  return (
    <div
      style={{
        width: 240,
        minHeight: 140,
        border: '1px solid #d1d5db',
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'Arial, sans-serif',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1f2937', textAlign: 'center' }}>
        Input Node
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
        <label style={{ fontSize: 14, color: '#4b5563', display: 'flex', flexDirection: 'column' }}>
          Name:
          <input
            type="text"
            value={inputName}
            onChange={handleNameChange}
            style={{
              marginTop: 5,
              padding: 8,
              fontSize: 14,
              borderRadius: 6,
              border: '1px solid #d1d5db',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
          />
        </label>
        <label style={{ fontSize: 14, color: '#4b5563', display: 'flex', flexDirection: 'column' }}>
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            style={{
              marginTop: 5,
              padding: 8,
              fontSize: 14,
              borderRadius: 6,
              border: '1px solid #d1d5db',
              outline: 'none',
              backgroundColor: '#f9fafb',
              transition: 'border-color 0.2s ease',
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        style={{
          background: '#2563eb',
          borderRadius: '50%',
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
};

InputNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    inputName: PropTypes.string,
    inputType: PropTypes.string,
    onChange: PropTypes.func,
  }),
};
