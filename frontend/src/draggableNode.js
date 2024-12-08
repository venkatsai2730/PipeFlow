import React from 'react';

/**
 * DraggableNode component renders a draggable node that can be dropped into the ReactFlow canvas.
 * - When dragged, it sets the node type to be dropped on the canvas.
 * - It supports drag-and-drop for creating new nodes in the flow.
 */
export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event) => {
    // Set custom data for the dragged element, containing the node type
    const appData = { nodeType: type };
    
    // Make the cursor appear as grabbing when dragging
    event.target.style.cursor = 'grabbing';
    
    // Store data that will be accessed during the drop event
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    // Reset cursor style when dragging ends
    event.target.style.cursor = 'grab';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
      style={{
        cursor: 'grab',
        minWidth: '80px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#1C2536',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
        padding: '5px',
      }}
    >
      <span>{label}</span>
    </div>
  );
};
