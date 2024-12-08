import { useState } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * TextNode component allows users to input dynamic text with variable extraction.
 * - Extracts variables defined within `{{}}` in the text.
 * - Displays dynamic output handles for each extracted variable.
 * - Features a modern and visually appealing design.
 */
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);

    // Extract variables within {{ }}
    const matches = newText.match(/{{\s*[\w]+\s*}}/g) || [];
    const uniqueVariables = [...new Set(matches.map((v) => v.replace(/[{}]/g, '').trim()))];
    setVariables(uniqueVariables);
  };

  return (
    <div
      style={{
        width: 240,
        minHeight: 140,
        border: '1px solid #d1d5db', // Light gray border
        borderRadius: 12, // Rounded corners
        backgroundColor: '#ffffff', // Clean white background
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        padding: 10,
        fontFamily: 'Arial, sans-serif', // Modern font
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        position: 'relative', // Required for dynamic handle positioning
        transition: 'box-shadow 0.3s ease', // Smooth hover effect
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)')}
    >
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: '#2563eb', // Vibrant blue for the main handle
          borderRadius: '50%',
          width: 10,
          height: 10,
        }}
      />
      <div
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: '#1f2937', // Dark gray
          textAlign: 'center',
        }}
      >
        Text Node
      </div>
      <textarea
        style={{
          width: '100%',
          resize: 'none',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          padding: 5,
          fontSize: 14,
          fontFamily: 'Arial, sans-serif',
          color: '#374151', // Medium gray for text
          backgroundColor: '#f9fafb', // Light gray background for input
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
        rows={Math.max(3, currText.split('\n').length)} // Dynamically adjust rows based on text length
        value={currText}
        onChange={handleTextChange}
        onFocus={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
        onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
      />
      {variables.map((variable, index) => (
        <Handle
          key={index}
          type="source"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${(index + 1) * 30}px`, // Dynamically position handles
            background: '#10b981', // Green for dynamic variable handles
            borderRadius: '50%',
            width: 10,
            height: 10,
          }}
        />
      ))}
    </div>
  );
};
