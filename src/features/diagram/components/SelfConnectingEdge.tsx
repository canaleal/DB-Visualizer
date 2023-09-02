import { BaseEdge, BezierEdge, EdgeProps } from 'reactflow';

const SelfConnecting = (props: EdgeProps) => {
  if (props.source !== props.target) {
    return <BezierEdge {...props} />;
  }

  const { sourceX, sourceY, targetX, targetY, markerEnd } = props;

  const midX = sourceX + 200;  // Adjust the offset as needed
  const midY = sourceY - 230;  // Adjust the offset as needed

  const edgePath = `
    M ${sourceX} ${sourceY}
    L ${midX} ${sourceY}
    L ${midX} ${midY}
    L ${targetX} ${midY}
    L ${targetX} ${targetY}
  `;

  return <BaseEdge path={edgePath} markerEnd={markerEnd} />;
};

export default SelfConnecting;
