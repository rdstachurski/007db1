export interface ActionProperties {
	actionName: string;
	createdAt: string;
	createdBy: string;
	lastModified: string;
	status: string;
	priority: string;
}
export interface ClientOrgProperties {
	organizationName: string;
	organizationId: string;
	contactEmail: string;
	region: string;
	industry: string;
	numberOfEmployees: number;
}

export interface GlobalProperties {
	name: string;
	properties: Record<string, unknown>;
}
