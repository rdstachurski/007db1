import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type FormNode } from "./types";

export function FormNode({ data }: NodeProps<FormNode>) {
	return (
		<div className="react-flow__node-default">
			{data.name && <div>{data.name}</div>}
			<Handle type="source" position={Position.Right} />
			<Handle type="target" position={Position.Left} />
		</div>
	);
}
