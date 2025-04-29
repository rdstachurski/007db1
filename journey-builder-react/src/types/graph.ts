import { Connection } from "@xyflow/react";
import { Form } from "./form";
import { AppNode } from "../components/nodes/types";

export interface BluePrintDesc {
	$schema: string;
	id: string;
	tenant_id: string;
	name: string;
	description: string;
	category: string;
	nodes: AppNode[];
	edges: Connection[];
	forms: Form[];
	branches: unknown[];
	triggers: unknown[];
}
