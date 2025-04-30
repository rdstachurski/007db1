// tests/components/WorkCanvas.test.tsx

import blueprintGraph from "../fixtures/graph.json";
import type { BluePrintDesc } from "../../src/types/graph";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import WorkCanvas from "../../src/components/workcanvas/WorkCanvas";
import { callApi } from "../../src/utils/callApi";
import { Edge } from "@xyflow/react";
import { AppNode } from "../../src/components/nodes/types";

import userEvent from "@testing-library/user-event";

vi.mock("../../src/utils/callApi", () => {
	const data = blueprintGraph as unknown as BluePrintDesc;
	return {
		callApi: vi.fn().mockResolvedValue(data),
	};
});

vi.mock("@xyflow/react", async (importOriginal) => {
	const actual = (await importOriginal()) as typeof import("@xyflow/react");
	return {
		...actual,
		ReactFlow: ({
			children,
			nodes,
			edges,
			onNodeClick,
		}: {
			children: React.ReactNode;
			nodes: AppNode[] | undefined;
			edges: Edge[] | undefined;
			onNodeClick: (_e: React.MouseEvent, node: AppNode) => void;
		}) => (
			<div data-testid="react-flow">
				{nodes?.map((node, index) => (
					<div
						key={index}
						data-testid={node.id}
						onClick={() => onNodeClick(expect.anything(), node)}
					>
						{node.type === "form" && <div>{node.data.name}</div>}
					</div>
				))}
				{edges?.map((edge, index) => (
					<div key={index} data-testid={`${edge.source}-${edge.target}`}>
						{edge.id}
					</div>
				))}
				{children}
			</div>
		),
		Controls: () => <div data-testid="controls" />,
		Background: () => <div data-testid="background" />,
	};
});

vi.mock("../../src/components/modal/FormModal", () => ({
	default: ({
		onCloseModal,
		handleOnFormSubmit,
	}: {
		onCloseModal: () => void;
		handleOnFormSubmit: (
			e: React.FormEvent<HTMLFormElement>,
			formValues: Record<string, Record<string, unknown>>
		) => void;
	}) => (
		<div data-testid="mock-form-modal">
			<p>Mocked FormModal</p>
			<button
				data-testid="mock-submit"
				onClick={() =>
					handleOnFormSubmit(
						// Use synthetic event-like object to simulate form event
						{
							preventDefault: () => {},
						} as unknown as React.FormEvent<HTMLFormElement>,
						{ mockField: { prefilled: false, value: "mockValue" } }
					)
				}
			>
				Submit
			</button>
			<button data-testid="mock-close" onClick={onCloseModal}>
				Close
			</button>
		</div>
	),
}));

describe("WorkCanvas Component", () => {
	const data = blueprintGraph as unknown as BluePrintDesc;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render ReactFlow components after fetching api response", async () => {
		render(<WorkCanvas />);

		await waitFor(() => {
			expect(callApi).toHaveBeenCalled();
		});

		expect(screen.getByTestId("react-flow")).toBeInTheDocument();
		expect(screen.getByTestId("controls")).toBeInTheDocument();
		expect(screen.getByTestId("background")).toBeInTheDocument();
		data.nodes.forEach((node) => {
			expect(screen.getByTestId(node.id)).toBeInTheDocument();
		});
		data.edges.forEach((edge) => {
			expect(
				screen.getByTestId(`${edge.source}-${edge.target}`)
			).toBeInTheDocument();
		});
	});

	it("should open modal when node is clicked and close when close button is clicked", async () => {
		render(<WorkCanvas />);

		await waitFor(() => {
			expect(callApi).toHaveBeenCalled();
		});
		const user = userEvent.setup();
		await user.click(screen.getByText("Form B"));
		const modal = screen.getByTestId("mock-form-modal");
		expect(modal).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Close" }));
		expect(modal).not.toBeInTheDocument();
	});

	it("should open modal when node is clicked and close when close button is clicked", async () => {
		render(<WorkCanvas />);

		await waitFor(() => {
			expect(callApi).toHaveBeenCalled();
		});
		const user = userEvent.setup();
		await user.click(screen.getByText("Form B"));
		const modal = screen.getByTestId("mock-form-modal");
		expect(modal).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Close" }));
	});

	it("should open modal when node is clicked and close when close button is clicked", async () => {
		render(<WorkCanvas />);

		await waitFor(() => {
			expect(callApi).toHaveBeenCalled();
		});
		const user = userEvent.setup();
		await user.click(screen.getByText("Form B"));
		const modal = screen.getByTestId("mock-form-modal");
		expect(modal).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Close" }));
	});

	it("should open modal when node is clicked and close when Submit button is clicked", async () => {
		render(<WorkCanvas />);

		await waitFor(() => {
			expect(callApi).toHaveBeenCalled();
		});
		const user = userEvent.setup();
		await user.click(screen.getByText("Form B"));
		const modal = screen.getByTestId("mock-form-modal");
		expect(modal).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Submit" }));
	});
});
