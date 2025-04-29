import {
	addEdge,
	Background,
	Connection,
	Controls,
	Edge,
	Node,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import apiCallData from "../../dummydata/graph.json";
import { BluePrintDesc } from "../../types/graph";
import { nodeTypes } from "../nodes";
import { useEffect, useState } from "react";
import FormModal from "../modal/formModal";

export default function WorkCanvas() {
	const [nodes, setNodes] = useNodesState<Node>([]);
	const [edges, setEdges] = useEdgesState<Edge>([]);

	const createEdges = (apiEdges: Connection[]) => {
		let processedEdges: Edge[] = [];

		apiEdges.forEach((conn) => {
			processedEdges = addEdge(conn, processedEdges);
		});
		return processedEdges;
	};
	useEffect(() => {
		const castedData = apiCallData as unknown as BluePrintDesc;
		setNodes(castedData.nodes);
		setEdges(createEdges(castedData.edges));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [showModal, setShowModal] = useState(false);

	return (
		<div className=" w-screen h-screen border border-black">
			{showModal && <FormModal onCloseModal={() => setShowModal(false)} />}
			<ReactFlow
				fitView
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodeClick={() => setShowModal(true)}
			>
				<Controls />
				<Background size={2} />
			</ReactFlow>
		</div>
	);
}
