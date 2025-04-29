import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import PrefillOptionsList from "../../src/components/modal/preFillOptionList";

describe("PrefillOptionsList Component", () => {
	const globalPropsMock = [
		{ name: "GlobalSource", properties: { fieldA: {}, fieldB: {} } },
	];

	const prereqNodeDataMock = [
		{
			name: "PrereqSource",
			input_mapping: { preA: { foo: "bar" }, preB: { baz: 123 } },
		},
	];

	const onCancelMock = vi.fn();
	const onSelectPrefillMock = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders globalProps and prereqNodeData lists", () => {
		render(
			<PrefillOptionsList
				onCancel={onCancelMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				onSelectPrefill={onSelectPrefillMock}
			/>
		);

		expect(screen.getByText("GlobalSource")).toBeInTheDocument();
		expect(screen.getByText("PrereqSource")).toBeInTheDocument();
	});

	it("selects a global prefill key and calls onSelectPrefill with correct source", async () => {
		render(
			<PrefillOptionsList
				onCancel={onCancelMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				onSelectPrefill={onSelectPrefillMock}
			/>
		);

		// Expand global section
		fireEvent.click(screen.getByText("GlobalSource"));

		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: "fieldA" }));
		await user.click(screen.getByRole("button", { name: "Select" }));

		expect(onSelectPrefillMock).toHaveBeenCalledWith("GlobalSource");
	});

	it("selects a prerequisite prefill key and calls onSelectPrefill with correct source", async () => {
		render(
			<PrefillOptionsList
				onCancel={onCancelMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				onSelectPrefill={onSelectPrefillMock}
			/>
		);

		// Expand prerequisites section
		fireEvent.click(screen.getByText("PrereqSource"));

		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: "preA" }));
		await user.click(screen.getByRole("button", { name: "Select" }));

		expect(onSelectPrefillMock).toHaveBeenCalledWith("PrereqSource");
	});

	it("calls onCancel when Cancel button is clicked", () => {
		render(
			<PrefillOptionsList
				onCancel={onCancelMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				onSelectPrefill={onSelectPrefillMock}
			/>
		);

		fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
		expect(onCancelMock).toHaveBeenCalled();
	});

	it("does not crash when prereqNodeData is undefined", () => {
		render(
			<PrefillOptionsList
				onCancel={onCancelMock}
				globalProps={globalPropsMock}
				prereqNodeData={undefined}
				onSelectPrefill={onSelectPrefillMock}
			/>
		);

		expect(screen.getByText("GlobalSource")).toBeInTheDocument();
		expect(screen.queryByText("PrereqSource")).not.toBeInTheDocument();
	});
});
