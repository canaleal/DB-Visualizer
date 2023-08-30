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

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), [setEdges]);
  const codeText = useSelector((state: RootState) => state.codeText.codeText);

  useEffect(() => {
    if (!codeText) return;
    const { nodes: newNodes, edges: newEdges } = parseSQLToNodesAndEdges(codeText);
    const updatedNodes = newNodes.map((newNode) => {
      const existingNode = nodes.find((n: { id: string; }) => n.id === newNode.id);
      return existingNode ? { ...newNode, position: existingNode.position } : newNode;
    });
    const updatedEdges = [...edges, ...newEdges.filter((newEdge) => !edges.some((edge: { id: string; }) => edge.id === newEdge.id))];

    setNodes(updatedNodes);
    setEdges(updatedEdges);
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
      </ReactFlow>
    </div>
  );
}