import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import PrefillOptionsList from "../../src/components/modal/PreFillOptionList";
import "@testing-library/jest-dom/vitest";

const globalPropsMock = [
	{
		name: "GlobalSource",
		properties: { region: "North America", statusbar: "active" },
	},
];

const prereqNodeDataMock = [
	{
		name: "PrereqSource",
		input_mapping: { preA: { foo: "bar" }, preB: { baz: 123 } },
	},
];

const onCancelMock = vi.fn();
const onSelectPrefillMock = vi.fn();

describe("PrefillOptionsList Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render globalProps and prereqNodeData lists", () => {
		render(
			<PrefillOptionsList
				onCancel={onCancelMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				onSelectPrefill={onSelectPrefillMock}
			/>
		);

		expect(screen.getByText(globalPropsMock[0].name)).toBeInTheDocument();
		expect(screen.getByText(prereqNodeDataMock[0].name)).toBeInTheDocument();
	});

	it("should select a global prefill key and calls onSelectPrefill with correct source", async () => {
		render(
			<PrefillOptionsList
				onCancel={onCancelMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				onSelectPrefill={onSelectPrefillMock}
			/>
		);

		fireEvent.click(screen.getByText("GlobalSource"));

		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: "region" }));
		await user.click(screen.getByRole("button", { name: "Select" }));

		expect(onSelectPrefillMock).toHaveBeenCalledWith("GlobalSource", "region");
	});

	it("should select a prerequisite prefill key and calls onSelectPrefill with correct source", async () => {
		render(
			<PrefillOptionsList
				onCancel={onCancelMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				onSelectPrefill={onSelectPrefillMock}
			/>
		);

		fireEvent.click(screen.getByText("PrereqSource"));

		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: "preA" }));
		await user.click(screen.getByRole("button", { name: "Select" }));

		expect(onSelectPrefillMock).toHaveBeenCalledWith("PrereqSource", "preA");
	});

	it("should call onCancel when Cancel button is clicked", () => {
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

	it("should not crash when prereqNodeData is undefined", () => {
		render(
			<PrefillOptionsList
				onCancel={onCancelMock}
				globalProps={globalPropsMock}
				prereqNodeData={undefined}
				onSelectPrefill={onSelectPrefillMock}
			/>
		);

		expect(screen.getByText(globalPropsMock[0].name)).toBeInTheDocument();
		expect(screen.queryByText("PrereqSource")).not.toBeInTheDocument();
	});
});
