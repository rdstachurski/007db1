import { AppNode } from "../components/nodes/types";

const collectAncestors = (
	nodeId: string,
	nodes: AppNode[],
	visited: Record<string, Set<string>>
): Set<string> => {
	if (visited[nodeId]) {
		return visited[nodeId];
	}

	const prerequisiteSet = new Set<string>();

	const targetNode = nodes.find((node) => node.id === nodeId);
	if (targetNode && targetNode.type === "form") {
		const prereq = targetNode.data.prerequisites;
		for (const p of prereq || []) {
			prerequisiteSet.add(p);
			const parentAncestor = collectAncestors(p, nodes, visited);
			for (const parent of parentAncestor) {
				prerequisiteSet.add(parent);
			}
		}
		visited[nodeId] = prerequisiteSet;
		return prerequisiteSet;
	}
	return new Set<string>();
};

export const createPrerequisites = (nodes: AppNode[]) => {
	const visited: Record<string, Set<string>> = {};
	const results: Record<string, string[]> = {};
	for (const n of nodes) {
		const ancestorsSet = collectAncestors(n.id, nodes, visited);
		results[n.id] = Array.from(ancestorsSet);
	}
	return results;
};
