import { AppNode } from "../components/nodes/types";

export const createPrerequisites = (nodes: AppNode[]) => {
	const prerequisiteMap = new Map<string, string[]>();

	//dfs
	const find = (nodeId: string, visited = new Set<string>()): string[] => {
		if (prerequisiteMap.has(nodeId)) return prerequisiteMap.get(nodeId) ?? [];

		const prerequisiteArray: string[] = [];
		const node = nodes.find((n) => n.id === nodeId);

		if (node && node.type === "form" && node.data.prerequisites?.length) {
			for (const prereq of node.data.prerequisites) {
				if (!visited.has(prereq)) {
					visited.add(prereq);
					prerequisiteArray.push(prereq);
					prerequisiteArray.push(...find(prereq, visited));
				}
			}
		}
		prerequisiteMap.set(nodeId, prerequisiteArray);
		return prerequisiteArray;
	};

	nodes.forEach((node) => {
		if (prerequisiteMap.has(node.id)) {
			find(node.id);
		}
	});

	return prerequisiteMap;
};
