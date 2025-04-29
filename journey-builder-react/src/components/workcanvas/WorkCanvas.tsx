import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
const nodes = [
	{
		id: "1",
		position: { x: 0, y: 0 },
		data: { label: "Hello" },
	},
];
export default function WorkCanvas() {
	return (
		<div className=" w-screen h-screen border border-black">
			<ReactFlow fitView nodes={nodes}>
				<Controls />
				<Background size={2} />
			</ReactFlow>
		</div>
	);
}
