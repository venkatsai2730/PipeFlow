import { useState } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * OutputNode component renders an output node with configurable name and type.
 * - Allows users to dynamically change the output name and type.
 * - Features a clean, modern design with styled input fields and dropdowns.
 */
export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div
      style={{
        width: 220,
        minHeight: 140,
        border: '1px solid #d1d5db', // Light gray border
        borderRadius: 12, // Rounded corners
        backgroundColor: '#ffffff', // Clean white background
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        padding: 10,
        fontFamily: 'Arial, sans-serif', // Modern font
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'box-shadow 0.3s ease', // Smooth hover effect
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)')}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={{
          background: '#2563eb', // Vibrant blue for handles
          borderRadius: '50%',
          width: 10,
          height: 10,
        }}
      />
      <div
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: '#1f2937', // Dark gray for text
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        Output Node
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          width: '100%',
        }}
      >
        <label
          style={{
            fontSize: 14,
            color: '#374151', // Medium gray for labels
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={{
              padding: 6,
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: 14,
              width: '100%',
            }}
          />
        </label>
        <label
          style={{
            fontSize: 14,
            color: '#374151', // Medium gray for labels
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          Type:
          <select
            value={outputType}
            onChange={handleTypeChange}
            style={{
              padding: 6,
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: 14,
              width: '100%',
              backgroundColor: '#f9fafb', // Light gray background for dropdown
            }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
};
