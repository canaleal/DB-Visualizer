/* eslint-disable @typescript-eslint/no-explicit-any */
import dagre from 'dagre';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { RootState } from '../../store/store';
import DownloadButton from './components/DownloadButton';
import SelfConnectingEdge from './components/SelfConnectingEdge';
import TableNode from './components/TableNode';
import { parseSQLToNodesAndEdges } from './helpers/helpers';
import { initialEdges, initialNodes } from './initial';

const edgeTypes = {
  selfconnecting: SelfConnectingEdge,
};

const nodeTypes = {
  tableNode: TableNode,
};


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));


const nodeWidth = 200;
const nodeHeight = 200;

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), [setEdges]);
  const codeText = useSelector((state: RootState) => state.codeText.codeText);

  useEffect(() => {
    if (!codeText) return;
    const { nodes: newNodes, edges: newEdges } = parseSQLToNodesAndEdges(codeText);
    // const updatedNodes = newNodes.map((newNode) => {
    //   const existingNode = nodes.find((n: { id: string; }) => n.id === newNode.id);
    //   return existingNode ? { ...newNode, position: existingNode.position } : newNode;
    // });
    // const updatedEdges = [...edges, ...newEdges.filter((newEdge) => !edges.some((edge: { id: string; }) => edge.id === newEdge.id))];

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges,
      'TB'
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [codeText]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background  gap={12} size={1} />
        <DownloadButton />
      </ReactFlow>
    </div>
  );
}