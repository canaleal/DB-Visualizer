import { BaseEdge, BezierEdge, EdgeProps } from 'reactflow';

const SelfConnecting = (props: EdgeProps) => {
    if (props.source !== props.target) {
        return <BezierEdge {...props} />;
    }

    const { sourceX, sourceY, targetX, targetY, markerEnd } = props;
    const radiusX = (sourceY - targetY) * 0.6;
    const radiusY = 50;
    const edgePath = `M ${sourceX} ${sourceY - 5} A ${radiusX + 10} ${radiusY + 25} 0 1 0 ${targetX + 2
        } ${targetY}`;

    return <BaseEdge path={edgePath} markerEnd={markerEnd} />;
}

export default SelfConnecting;