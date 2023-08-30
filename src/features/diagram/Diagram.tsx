import { useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { initialEdges, initialNodes } from './initial';
import { useSelector } from 'react-redux';
import { parseSQLToNodesAndEdges } from './helpers';
import SelfConnectingEdge from './SelfConnectingEdge';
import TableNode from './TableNode';

const edgeTypes = {
  
  selfconnecting: SelfConnectingEdge,

};

const nodeTypes = {
  tableNode: TableNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: unknown) => setEdges((eds: unknown) => addEdge(params, eds)), [setEdges]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const codeText = useSelector((state: any) => state.codeText.codeText);

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = parseSQLToNodesAndEdges(codeText, nodes, edges);

    // Merge new nodes with existing ones while keeping the existing positions
    const updatedNodes = newNodes.map((newNode) => {
      const existingNode = nodes.find((n) => n.id === newNode.id);
      return existingNode ? { ...newNode, position: existingNode.position } : newNode;
    });
  
    // Merge new edges with existing ones
    const updatedEdges = [...edges, ...newEdges.filter((newEdge) => !edges.some((edge) => edge.id === newEdge.id))];
  
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
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}