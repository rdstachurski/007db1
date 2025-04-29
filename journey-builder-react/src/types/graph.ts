import { Connection, Node } from "@xyflow/react";
import { Form } from "./form";

export interface BluePrintDesc {
	$schema: string;
	id: string;
	tenant_id: string;
	name: string;
	description: string;
	category: string;
	nodes: Node[];
	edges: Connection[];
	forms: Form[];
	branches: unknown[];
	triggers: unknown[];
}
