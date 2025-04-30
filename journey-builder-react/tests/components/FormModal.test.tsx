import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import FormModal from "../../src/components/modal/FormModal";
import {
	DynamicFieldConfigEntry,
	FieldProperties,
	FieldSchema,
	Form,
	UiSchema,
	UISchemaElement,
} from "../../src/types/form";
import "@testing-library/jest-dom/vitest";
import { GlobalProperties } from "../../src/types/prefillOptions/dataSource";
//props
const globalPropsMock: GlobalProperties[] = [
	{ name: "GlobalSource", properties: { fieldA: {}, fieldB: {} } },
];

const prereqNodeDataMock = [];

const FieldPropertiesMock: FieldProperties = {
	avantos_type: "button",
	type: "object",
};
const FieldPropertiesMock2: FieldProperties = {
	avantos_type: "name",
	type: "text",
};
const propertiesMock: Record<string, FieldProperties> = {
	button: FieldPropertiesMock,
	name: FieldPropertiesMock2,
};

const fieldSchemaMock: FieldSchema = {
	type: "object",
	required: [],
	properties: propertiesMock,
};
const uiSchemaElementMock: UISchemaElement = {
	type: "Button",
	scope: "#/properties/button",
};

const uISchemaElementMock: UISchemaElement[] = [uiSchemaElementMock];
const uiSchema: UiSchema = {
	elements: uISchemaElementMock,
	type: "VerticalLayout",
};
const dynamicFieldConFigMock: Record<string, DynamicFieldConfigEntry> = {};

const selectedFormMock: Form = {
	id: "FormA",
	name: "Form A",
	description: "",
	is_reusable: false,
	field_schema: fieldSchemaMock,
	ui_schema: uiSchema,
	dynamic_field_config: dynamicFieldConFigMock,
};

const handleOnFormSubmitMock = vi.fn();
const onCloseModalMock = vi.fn();
const initialInputMappingMock = {};

const updatedInputMappingMock = {
	button: {
		prefilled: true,
		value: "value",
	},
	name: {
		prefilled: false,
		value: "value",
	},
};
//components
vi.mock("../../src/components/fieldrows/InputRow.tsx", () => ({
	default: (props: {
		keyName: string;
		value: string;
		onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		type: string;
	}) => (
		<input
			data-testid={`input-${props.keyName}`}
			name={props.keyName}
			value={props.value}
			onChange={props.onInputChange}
			placeholder={props.type}
		/>
	),
}));

vi.mock("../../src/components/fieldrows/UnPrefilledRow", () => ({
	UnPrefilledRow: (props: {
		keyName: string;
		type: string;
		selected: boolean;
		onUnprefilledClick: (key: string) => void;
	}) => (
		<div
			data-testid={`unprefill-${props.keyName}`}
			onClick={() => props.onUnprefilledClick(props.keyName)}
		>
			Mocked UnPrefilledRow: {props.keyName}
		</div>
	),
}));

vi.mock("../../src/components/fieldrows/PrefilledRow", () => ({
	PrefilledRow: (props: {
		keyName: string;
		value: string;
		onRemovePrefilled: () => void;
	}) => (
		<div data-testid={`prefilled-${props.keyName}`}>
			<span>Mocked PrefilledRow: {props.keyName}</span>
			<button
				data-testid={`mock-remove-${props.keyName}`}
				onClick={props.onRemovePrefilled}
			>
				Remove
			</button>
		</div>
	),
}));

vi.mock("../../src/components/buttons/ToggleBtn.tsx", () => ({
	default: ({ onClick }: { onClick: () => void }) => (
		<button data-testid="mock-toggle-btn" onClick={onClick}>
			Mock ToggleBtn
		</button>
	),
}));

vi.mock("../../src/components/modal/preFillOptionList.tsx", () => ({
	default: ({
		onCancel,
		onSelectPrefill,
	}: {
		onCancel: () => void;
		onSelectPrefill: (source: string) => void;
	}) => (
		<div data-testid="mock-prefill-options-list">
			<button
				data-testid="mock-select"
				onClick={() => onSelectPrefill("mockSource")}
			>
				Select Prefill
			</button>
			<button data-testid="mock-cancel" onClick={onCancel}>
				Cancel
			</button>
		</div>
	),
}));

describe("FormModal Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	//Tests
	it("should render initial modal with fields with input rows", () => {
		render(
			<FormModal
				onCloseModal={onCloseModalMock}
				initialInputMapping={initialInputMappingMock}
				selectedForm={selectedFormMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				handleOnFormSubmit={handleOnFormSubmitMock}
			/>
		);
		Object.keys(selectedFormMock.field_schema.properties).map((key) => {
			const input = screen.getByTestId(`input-${key}`);
			expect(input).toBeInTheDocument();
		});
	});

	it("should render unprefilledRows when toggle button is pressed and should show side menu when clicked", async () => {
		render(
			<FormModal
				onCloseModal={onCloseModalMock}
				initialInputMapping={initialInputMappingMock}
				selectedForm={selectedFormMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				handleOnFormSubmit={handleOnFormSubmitMock}
			/>
		);
		const toggleBtn = screen.getByTestId("mock-toggle-btn");
		const user = userEvent.setup();
		await user.click(toggleBtn);
		Object.keys(selectedFormMock.field_schema.properties).forEach((key) => {
			const input = screen.getByTestId(`unprefill-${key}`);
			expect(input).toBeInTheDocument();
		});

		const row = screen.getByText("Mocked UnPrefilledRow: button");
		await user.click(row);

		expect(screen.getByTestId("mock-prefill-options-list")).toBeInTheDocument();
	});

	it("should set selected field to a prefilled row and prefill option list should be gone", async () => {
		render(
			<FormModal
				onCloseModal={onCloseModalMock}
				initialInputMapping={initialInputMappingMock}
				selectedForm={selectedFormMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				handleOnFormSubmit={handleOnFormSubmitMock}
			/>
		);
		const toggleBtn = screen.getByTestId("mock-toggle-btn");
		const user = userEvent.setup();
		await user.click(toggleBtn);

		const row = screen.getByText("Mocked UnPrefilledRow: button");
		await user.click(row);

		const sideMenu = screen.getByTestId("mock-prefill-options-list");
		expect(sideMenu).toBeInTheDocument();

		const selectBtn = screen.getByTestId("mock-select");
		await user.click(selectBtn);

		const newRow = screen.getByText("Mocked PrefilledRow: button");
		await user.click(newRow);
		expect(newRow).toBeInTheDocument();
		expect(sideMenu).not.toBeInTheDocument();
	});

	it("should call handleObFormSubmit with new prefilled value", async () => {
		render(
			<FormModal
				onCloseModal={onCloseModalMock}
				initialInputMapping={initialInputMappingMock}
				selectedForm={selectedFormMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				handleOnFormSubmit={handleOnFormSubmitMock}
			/>
		);
		const toggleBtn = screen.getByTestId("mock-toggle-btn");
		const user = userEvent.setup();
		await user.click(toggleBtn);
		await user.click(screen.getByText("Mocked UnPrefilledRow: button"));
		await user.click(screen.getByTestId("mock-select"));
		await user.click(screen.getByRole("button", { name: "Save" }));
		expect(handleOnFormSubmitMock).toHaveBeenCalledWith(expect.anything(), {
			button: { prefilled: true, value: "mockSource.button" },
		});
	});

	it("should load in prefilled fields if inputMapping has prefilled: true", async () => {
		render(
			<FormModal
				onCloseModal={onCloseModalMock}
				initialInputMapping={updatedInputMappingMock}
				selectedForm={selectedFormMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				handleOnFormSubmit={handleOnFormSubmitMock}
			/>
		);
		const toggleBtn = screen.getByTestId("mock-toggle-btn");
		const user = userEvent.setup();
		await user.click(toggleBtn);
		const input = screen.getByText("Mocked PrefilledRow: button");
		expect(input).toBeInTheDocument();
	});

	it("should remove prefilled field when remove button clicked", async () => {
		render(
			<FormModal
				onCloseModal={onCloseModalMock}
				initialInputMapping={updatedInputMappingMock}
				selectedForm={selectedFormMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				handleOnFormSubmit={handleOnFormSubmitMock}
			/>
		);
		const toggleBtn = screen.getByTestId("mock-toggle-btn");
		const user = userEvent.setup();
		await user.click(toggleBtn);
		const remove = screen.getByTestId("mock-remove-button");
		await user.click(remove);
		expect(remove).not.toBeInTheDocument();
		expect(screen.getByText("Mocked UnPrefilledRow: button"));
	});

	it("should call onCloseModal when cancel button is clicked", async () => {
		render(
			<FormModal
				onCloseModal={onCloseModalMock}
				initialInputMapping={updatedInputMappingMock}
				selectedForm={selectedFormMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				handleOnFormSubmit={handleOnFormSubmitMock}
			/>
		);

		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: "Cancel" }));
		expect(onCloseModalMock).toHaveBeenCalledOnce();
	});

	it("should call handleOnFormSubmit when save button clicked", async () => {
		render(
			<FormModal
				onCloseModal={onCloseModalMock}
				initialInputMapping={updatedInputMappingMock}
				selectedForm={selectedFormMock}
				globalProps={globalPropsMock}
				prereqNodeData={prereqNodeDataMock}
				handleOnFormSubmit={handleOnFormSubmitMock}
			/>
		);

		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: "Save" }));
		expect(handleOnFormSubmitMock).toHaveBeenCalledOnce();
	});
});
