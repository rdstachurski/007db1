export const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
	blueprintGraph: (blueprintName: string) =>
		`${API_BASE_URL}/api/v1/demo/actions/blueprints/${blueprintName}/graph`,
};
