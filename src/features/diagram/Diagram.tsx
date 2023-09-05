/* eslint-disable @typescript-eslint/no-explicit-any */

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
import RelationEdge from './components/RelationEdge';
import SelfConnectingEdge from './components/SelfConnectingEdge';
import TableNode from './components/TableNode';
import { parseSQLToNodesAndEdges } from './helpers/sqlHelpers';
import { initialEdges, initialNodes } from './helpers/initialElements';
import { getLayoutedElements } from './helpers/layoutElements';
import DiagramStyleOption from './components/DiagramStyleOption';


const edgeTypes = {
  selfconnecting: SelfConnectingEdge,
  relation: RelationEdge,
};

const nodeTypes = {
  tableNode: TableNode,
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
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges,
      'TB'
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [codeText]);

  return (
    <div className='h-full w-full'>
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
        <DiagramStyleOption />
      </ReactFlow>
      <svg width="0" height="0">
        <defs>
          <marker
            id="sql-one"
            markerWidth="12.5"
            markerHeight="12.5"
            viewBox="-10 -10 20 20"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              className="text-gray-400 stroke-current"
              strokeWidth="3"
              strokeLinecap="square"
              fill="none"
              points="-10,-8 -10,8"
            />
          </marker>

          <marker
            id="sql-many"
            markerWidth="12.5"
            markerHeight="12.5"
            viewBox="-10 -10 20 20"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              className="text-gray-400 stroke-current"
              strokeLinejoin="round"
              strokeLinecap="square"
              strokeWidth="1.5"
              fill="none"
              points="0,-8 -10,0 0,8"
            />
          </marker>
        </defs>
      </svg>
    </div>
  );
}