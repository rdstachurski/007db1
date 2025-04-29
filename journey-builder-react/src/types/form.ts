export interface Form {
	id: string;
	name: string;
	description: string;
	is_reusable: boolean;
	field_schema: FieldSchema;
	ui_schema: UiSchema;
	dynamic_field_config: Record<string, DynamicFieldConfigEntry>;
}
export interface FieldSchema {
	type: string;
	required: string[] | null;
	properties: Record<string, FieldProperties>;
}
interface FieldProperties {
	avantos_type: string;
	title?: string;
	type: string;
	items?: PropItems;
	uniqueItems?: boolean;
	enum?: string[] | null;
	format?: string;
}

interface PropItems {
	enum: string[];
	type: string;
}
interface UISchemaElement {
	type: string;
	scope: string;
	label?: string;
	options?: Record<string, string>;
	rule?: string;
}
export interface UiSchema {
	elements: UISchemaElement[];
	type: string;
}
export interface DynamicFieldConfigEntry {
	endpoint_id: string;
	selector_field: string;
	payload_fields: Record<string, { type: string; value: string }>;
}
