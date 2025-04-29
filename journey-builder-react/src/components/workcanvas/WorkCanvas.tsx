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
import { Form } from "../../types/form";
import { AppNode } from "../nodes/types";
import { createPrerequisites } from "../../utils/createPrerequisiteLists";

export default function WorkCanvas() {
	const [nodes, setNodes] = useNodesState<AppNode>([]);
	const [edges, setEdges] = useEdgesState<Edge>([]);
	const [forms, setForms] = useState<Form[]>([]);
	const [prerequisites, setPrerequisites] = useState<
		Map<string, string[]> | undefined
	>(undefined);
	const createEdges = (apiEdges: Connection[]) => {
		let processedEdges: Edge[] = [];

		apiEdges.forEach((conn) => {
			processedEdges = addEdge(conn, processedEdges);
		});
		return processedEdges;
	};

	//Mimic getting Api Response
	useEffect(() => {
		const castedData = apiCallData as unknown as BluePrintDesc;
		setNodes(castedData.nodes);
		setEdges(createEdges(castedData.edges));
		setForms(castedData.forms);
		const prereqs = createPrerequisites(castedData.nodes);
		setPrerequisites(prereqs);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [showModal, setShowModal] = useState(false);
	const [selectedNode, setSelectedNode] = useState<AppNode | undefined>(
		undefined
	);
	const [selectedForm, setSelectedForm] = useState<Form | undefined>(undefined);
	const handleOnNodeClick = (e: React.MouseEvent, node: AppNode) => {
		setShowModal(true);
		if (node.type === "form") {
			setSelectedNode(node);
			const form = forms.find((form) => form.id === node.data.component_id);
			setSelectedForm(form);
		}
	};
	return (
		<div className=" w-screen h-screen border border-black">
			{showModal && selectedForm && (
				<FormModal
					onCloseModal={() => setShowModal(false)}
					selectedForm={selectedForm}
				/>
			)}
			<ReactFlow
				fitView
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodeClick={handleOnNodeClick}
			>
				<Controls />
				<Background size={2} />
			</ReactFlow>
		</div>
	);
}
