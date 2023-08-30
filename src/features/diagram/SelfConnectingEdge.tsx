import { BaseEdge, BezierEdge, EdgeProps } from 'reactflow';

export default function SelfConnecting(props: EdgeProps) {
  // we are using the default bezier edge when source and target ids are different
  if (props.source !== props.target) {
    return <BezierEdge {...props} />;
  }

  const { sourceX, sourceY, targetX, targetY, markerEnd } = props;
  const radiusX = (sourceY - targetY) * 0.6;
  const radiusY = 50;
  const edgePath = `M ${sourceX} ${sourceY - 5} A ${radiusX + 10} ${radiusY + 25} 0 1 0 ${
    targetX + 2
  } ${targetY}`;

  return <BaseEdge path={edgePath} markerEnd={markerEnd} />;
}