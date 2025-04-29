import { BuiltInNode, Node } from "@xyflow/react";
export type FormNodeData = {
	id: string;
	component_key: string;
	component_type: string;
	component_id: string;
	name: string;
	prerequisites: string[] | null;
	permitted_roles: string[] | null;
	input_mapping: Record<string, Record<string, unknown>>;
	sla_duration: {
		number: number;
		unit: string;
	};
	approval_required: boolean;
	approval_roles: string[] | null;
};
export type FormNode = Node<FormNodeData, "form">;

export type AppNode = BuiltInNode | FormNode;
