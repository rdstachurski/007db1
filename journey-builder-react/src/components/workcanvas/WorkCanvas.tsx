import {
	addEdge,
	Background,
	Connection,
	Controls,
	Edge,
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
import actionProp from "../../dummydata/actionProperties.json";
import clientOrgProp from "../../dummydata/clientOrgProperties.json";
import { Form } from "../../types/form";
import { AppNode } from "../nodes/types";
import { createPrerequisites } from "../../utils/createPrerequisiteLists";
import { GlobalProperties } from "../../types/prefillOptions/dataSource";

export default function WorkCanvas() {
	const [nodes, setNodes] = useNodesState<AppNode>([]);
	const [edges, setEdges] = useEdgesState<Edge>([]);
	const [forms, setForms] = useState<Form[]>([]);
	const [prerequisites, setPrerequisites] = useState<
		Map<string, string[]> | undefined
	>(undefined);
	const [globalProps, setGlobalProps] = useState<GlobalProperties[]>([]);
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

		const global: GlobalProperties[] = [
			{ name: "Action Properties", properties: actionProp },
			{
				name: "Client Organization Properties",
				properties: clientOrgProp,
			},
		];
		setGlobalProps(global);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [showModal, setShowModal] = useState(false);
	const [selectedNode, setSelectedNode] = useState<AppNode | undefined>(
		undefined
	);
	const [selectedForm, setSelectedForm] = useState<Form | undefined>(undefined);
	const [prereqNodeData, setPrereqNodeData] = useState<
		Record<string, unknown>[] | undefined
	>();
	const handleOnNodeClick = (_e: React.MouseEvent, node: AppNode) => {
		setShowModal(true);
		if (node.type === "form") {
			setSelectedNode(node);
			const form = forms.find((form) => form.id === node.data.component_id);
			setSelectedForm(form);
			const prerequisiteId = prerequisites?.get(node.id);
			const filteredNodesData = nodes
				.filter((node) => prerequisiteId?.includes(node.id))
				.map((node) => node.data);
			setPrereqNodeData(filteredNodesData);
		}
	};
	return (
		<div className=" w-screen h-screen border border-black">
			{showModal && selectedForm && selectedNode && (
				<FormModal
					onCloseModal={() => setShowModal(false)}
					selectedForm={selectedForm}
					globalProps={globalProps}
					prereqNodeData={prereqNodeData}
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
