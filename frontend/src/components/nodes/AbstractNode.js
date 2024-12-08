import { Handle, Position } from 'reactflow';

export const AbstractNode = ({ id, data, type, handles = [] }) => {
  const renderHandles = () => {
    return handles.map((handle, index) => (
      <Handle
        key={index}
        type={handle.type}
        position={handle.position}
        id={`${id}-${handle.id}`}
        style={handle.style || {}}
      />
    ));
  };

  return (
    <div style={{ width: 200, height: 100, border: '1px solid black' }}>
      <div>
        <span>{type}</span>
      </div>
      {data?.content && <div><span>{data.content}</span></div>}
      {renderHandles()}
    </div>
  );
};
